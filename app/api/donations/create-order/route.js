import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { generateReceiptNumber } from '@/lib/razorpay';

export async function POST(request) {
  try {
    const { amount, donationProject, name, email, phone, notes } = await request.json();

    // Validate input
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid donation amount' },
        { status: 400 }
      );
    }

    if (!donationProject) {
      return NextResponse.json(
        { success: false, error: 'Donation project is required' },
        { status: 400 }
      );
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET
    });

    // Create Razorpay order
    const amountInPaise = Math.round(amount * 100);
    const receiptNumber = generateReceiptNumber();

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: receiptNumber,
      notes: {
        donationProject,
        name,
        email,
        notes: notes || ''
      }
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: receiptNumber
      },
      donation: {
        amount,
        donationProject,
        name,
        email,
        phone
      },
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Donation order creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create donation order' },
      { status: 500 }
    );
  }
}
