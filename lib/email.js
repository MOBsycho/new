// Email Utility using Resend
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Check if email is configured
export function isEmailConfigured() {
  return !!(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}

// Send email function
export async function sendEmail({ to, subject, html }) {
  try {
    if (!isEmailConfigured()) {
      console.log('⚠️  Email not configured. Skipping email send.');
      return { 
        success: false, 
        error: 'Email service not configured',
        skipped: true 
      };
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('❌ Email send error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Email sent successfully:', data?.id);
    return { success: true, id: data?.id };
  } catch (error) {
    console.error('❌ Email exception:', error);
    return { success: false, error: error.message };
  }
}

// Email Templates

export function welcomeEmailTemplate({ name, email }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; padding: 12px 30px; background: #8B4513; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          .om { font-size: 40px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="om">🕉️</div>
            <h1>Welcome to KuberJi Mandir</h1>
          </div>
          <div class="content">
            <h2>Namaste ${name}! 🙏</h2>
            <p>Welcome to the divine family of KuberJi Mandir, Pandukeshwar. We are blessed to have you join us on this spiritual journey.</p>
            
            <p><strong>Your Account Details:</strong></p>
            <ul>
              <li>Email: ${email}</li>
              <li>Account Status: Active</li>
            </ul>

            <p><strong>What's Next?</strong></p>
            <ul>
              <li>📿 Book temple services and poojas</li>
              <li>🎥 Watch live aarti streams</li>
              <li>🙏 Make online offerings</li>
              <li>📅 View temple events and festivals</li>
            </ul>

            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/services" class="button">Explore Services</a>

            <p style="margin-top: 30px;">May Lord Kuber bless you with prosperity and happiness!</p>
          </div>
          <div class="footer">
            <p>KuberJi Mandir, Pandukeshwar, Uttarakhand</p>
            <p>This is an automated email. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function bookingConfirmationTemplate({ name, booking, service }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .booking-card { background: white; padding: 20px; border-left: 4px solid #8B4513; margin: 20px 0; border-radius: 5px; }
          .booking-detail { margin: 10px 0; }
          .label { font-weight: bold; color: #8B4513; }
          .button { display: inline-block; padding: 12px 30px; background: #8B4513; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Booking Confirmed!</h1>
          </div>
          <div class="content">
            <p>Namaste ${name}! 🙏</p>
            <p>Your booking has been confirmed. We look forward to serving you at KuberJi Mandir.</p>
            
            <div class="booking-card">
              <h3>Booking Details</h3>
              <div class="booking-detail">
                <span class="label">Booking ID:</span> ${booking.id}
              </div>
              <div class="booking-detail">
                <span class="label">Service:</span> ${service.nameEn} (${service.nameHi})
              </div>
              <div class="booking-detail">
                <span class="label">Date:</span> ${new Date(booking.bookingDate).toLocaleDateString('en-IN')}
              </div>
              <div class="booking-detail">
                <span class="label">Time:</span> ${booking.bookingTime}
              </div>
              <div class="booking-detail">
                <span class="label">Amount Paid:</span> ₹${booking.amount}
              </div>
            </div>

            <p><strong>Important Information:</strong></p>
            <ul>
              <li>Please arrive 10 minutes before the scheduled time</li>
              <li>Bring a copy of this confirmation email or your booking ID</li>
              <li>For any changes, contact us at least 24 hours in advance</li>
            </ul>

            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/my-bookings" class="button">View My Bookings</a>

            <p style="margin-top: 30px;">🕉️ May Lord Kuber shower his blessings upon you!</p>
          </div>
          <div class="footer">
            <p>KuberJi Mandir, Pandukeshwar, Uttarakhand</p>
            <p>For support: support@kuberjitemple.org</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function paymentReceiptTemplate({ name, payment, booking, service }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .receipt { background: white; padding: 20px; border: 2px solid #8B4513; margin: 20px 0; border-radius: 5px; }
          .receipt-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .total-row { font-weight: bold; font-size: 18px; color: #8B4513; border-bottom: none; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💰 Payment Receipt</h1>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for your payment. Your transaction was successful.</p>
            
            <div class="receipt">
              <h3 style="text-align: center; color: #8B4513;">Payment Receipt</h3>
              <div class="receipt-row">
                <span>Receipt Number:</span>
                <span><strong>${payment.receiptNumber || payment.id}</strong></span>
              </div>
              <div class="receipt-row">
                <span>Payment ID:</span>
                <span>${payment.gatewayPaymentId}</span>
              </div>
              <div class="receipt-row">
                <span>Date:</span>
                <span>${new Date(payment.createdAt).toLocaleString('en-IN')}</span>
              </div>
              <div class="receipt-row">
                <span>Service:</span>
                <span>${service.nameEn}</span>
              </div>
              <div class="receipt-row">
                <span>Booking ID:</span>
                <span>${booking.id}</span>
              </div>
              <div class="receipt-row">
                <span>Payment Method:</span>
                <span>${payment.paymentMethod}</span>
              </div>
              <div class="receipt-row total-row">
                <span>Total Paid:</span>
                <span>₹${payment.amount}</span>
              </div>
            </div>

            <p><strong>Note:</strong> This is a system-generated receipt. Please keep this for your records.</p>
            
            <p style="margin-top: 30px;">🙏 Thank you for your generous contribution!</p>
          </div>
          <div class="footer">
            <p>KuberJi Mandir, Pandukeshwar, Uttarakhand</p>
            <p>For any queries, contact: support@kuberjitemple.org</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Send welcome email
export async function sendWelcomeEmail(user) {
  return sendEmail({
    to: user.email,
    subject: 'Welcome to KuberJi Mandir! 🕉️',
    html: welcomeEmailTemplate(user),
  });
}

// Send booking confirmation email
export async function sendBookingConfirmation(user, booking, service) {
  return sendEmail({
    to: user.email,
    subject: `Booking Confirmed - ${service.nameEn}`,
    html: bookingConfirmationTemplate({ name: user.name, booking, service }),
  });
}

// Send payment receipt email
export async function sendPaymentReceipt(user, payment, booking, service) {
  return sendEmail({
    to: user.email,
    subject: `Payment Receipt - ₹${payment.amount}`,
    html: paymentReceiptTemplate({ name: user.name, payment, booking, service }),
  });
}
