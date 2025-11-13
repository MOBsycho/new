// Verify Razorpay Payment API
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/middleware/auth';
import { verifyPaymentSignature, fetchPaymentDetails, generateReceiptNumber } from '@/lib/razorpay';
import { generateReceiptPDF } from '@/lib/pdf-generator';
import { sendBookingConfirmation, sendPaymentReceipt } from '@/lib/email';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

// Validation schema
const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  bookingId: z.string().min(1),
});

export async function POST(request) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult.authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = authResult.user.id;
    const body = await request.json();

    // Validate input
    const validation = verifyPaymentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = validation.data;

    // Verify signature
    const isValidSignature = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Fetch booking with payment to check for duplicates
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        service: true,
        user: true,
        payment: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Verify booking belongs to user
    if (booking.userId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized access to booking' },
        { status: 403 }
      );
    }

    // Check if payment already processed (prevent duplicate payments)
    if (booking.payment && booking.payment.status === 'SUCCESS') {
      return NextResponse.json({
        success: true,
        message: 'Payment already verified',
        payment: {
          id: booking.payment.id,
          receiptNumber: booking.payment.receiptNumber,
          receiptUrl: booking.payment.receiptUrl,
          amount: booking.payment.amount,
          status: booking.payment.status,
        },
        booking: {
          id: booking.id,
          status: booking.status,
          serviceName: booking.service.nameEn,
          bookingDate: booking.bookingDate,
          bookingTime: booking.bookingTime,
        },
      });
    }

    // Fetch payment details from Razorpay
    const paymentResult = await fetchPaymentDetails(razorpay_payment_id);
    
    if (!paymentResult.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch payment details' },
        { status: 500 }
      );
    }

    const paymentDetails = paymentResult.payment;

    // Generate receipt number
    const receiptNumber = generateReceiptNumber('RCP');

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        bookingId: booking.id,
        userId: userId,
        amount: booking.amount,
        currency: 'INR',
        paymentMethod: paymentDetails.method || 'card',
        paymentGateway: 'RAZORPAY',
        gatewayPaymentId: razorpay_payment_id,
        gatewayOrderId: razorpay_order_id,
        status: 'SUCCESS',
        receiptNumber,
      },
    });

    // Update booking status
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        paymentId: razorpay_payment_id,
      },
    });

    // Generate PDF receipt
    try {
      const receiptData = {
        receiptNumber: payment.receiptNumber,
        bookingId: booking.id,
        userName: booking.user.name,
        userEmail: booking.user.email,
        userPhone: booking.user.phone,
        serviceName: booking.service.nameEn,
        serviceNameHi: booking.service.nameHi,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        paymentId: razorpay_payment_id,
        bookingDate: booking.bookingDate,
        bookingTime: booking.bookingTime,
        createdAt: payment.createdAt,
      };

      const pdfBuffer = generateReceiptPDF(receiptData);

      // Save PDF to public folder
      const receiptsDir = path.join(process.cwd(), 'public', 'receipts');
      await fs.mkdir(receiptsDir, { recursive: true });
      
      const pdfFilename = `receipt-${receiptNumber}.pdf`;
      const pdfPath = path.join(receiptsDir, pdfFilename);
      await fs.writeFile(pdfPath, pdfBuffer);

      const receiptUrl = `/receipts/${pdfFilename}`;

      // Update payment with receipt URL
      await prisma.payment.update({
        where: { id: payment.id },
        data: { receiptUrl },
      });

      // Send confirmation emails (non-blocking)
      sendBookingConfirmation(booking.user, booking, booking.service).catch(err =>
        console.error('Failed to send booking confirmation:', err)
      );
      sendPaymentReceipt(booking.user, { ...payment, receiptUrl }, booking, booking.service).catch(err =>
        console.error('Failed to send payment receipt:', err)
      );

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        payment: {
          id: payment.id,
          receiptNumber: payment.receiptNumber,
          receiptUrl,
          amount: payment.amount,
          status: payment.status,
        },
        booking: {
          id: booking.id,
          status: 'CONFIRMED',
          serviceName: booking.service.nameEn,
          bookingDate: booking.bookingDate,
          bookingTime: booking.bookingTime,
        },
      });
    } catch (pdfError) {
      console.error('PDF generation error:', pdfError);
      
      // Payment is still successful even if PDF fails
      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully (receipt generation pending)',
        payment: {
          id: payment.id,
          receiptNumber: payment.receiptNumber,
          amount: payment.amount,
          status: payment.status,
        },
        booking: {
          id: booking.id,
          status: 'CONFIRMED',
          serviceName: booking.service.nameEn,
          bookingDate: booking.bookingDate,
          bookingTime: booking.bookingTime,
        },
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
