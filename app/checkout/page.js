'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { isAuthenticated, getSession } from '@/lib/auth';
import MyNav from '@/components/MyNav';
import Footer from '@/components/Footer';
import { Calendar, Clock } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/auth/login?redirect=/checkout');
      return;
    }

    setUser(getSession());

    // Load cart
    const savedCart = localStorage.getItem('temple_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      router.push('/cart');
    }

    setLoading(false);
  }, [router]);

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePayment = async () => {
    try {
      setProcessingPayment(true);

      // For services, we need date and time
      const hasServices = cart.some(item => item.type === 'service');
      if (hasServices && (!bookingDetails.date || !bookingDetails.time)) {
        alert(language === 'hi' 
          ? 'कृपया बुकिंग तिथि और समय चुनें' 
          : 'Please select booking date and time');
        setProcessingPayment(false);
        return;
      }

      // For services with booking, use the booking API
      if (hasServices) {
        const firstService = cart.find(item => item.type === 'service');
        
        const orderResponse = await fetch('/api/payments/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            serviceId: firstService.id,
            bookingDate: bookingDetails.date,
            bookingTime: bookingDetails.time,
            notes: bookingDetails.notes,
          }),
        });

        const orderData = await orderResponse.json();

        if (!orderData.success) {
          throw new Error(orderData.error || 'Failed to create order');
        }

        // Load Razorpay
        if (!window.Razorpay) {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          document.body.appendChild(script);
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
          });
        }

        const options = {
          key: orderData.razorpayKeyId,
          amount: orderData.order.amount,
          currency: orderData.order.currency,
          name: 'KuberJi Mandir',
          description: `${firstService.nameEn}`,
          image: '/icons/om-symbol.png',
          order_id: orderData.order.id,
          handler: async function (response) {
            try {
              const verifyResponse = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  bookingId: orderData.booking.id,
                }),
              });

              const verifyData = await verifyResponse.json();

              if (verifyData.success) {
                // Clear cart
                localStorage.removeItem('temple_cart');
                router.push(`/booking-success?receipt=${verifyData.payment.receiptNumber}`);
              }
            } catch (error) {
              console.error('Payment verification error:', error);
              alert('Payment verification failed. Please contact support.');
            }
          },
          theme: { color: '#8B4513' },
          modal: {
            ondismiss: function() {
              setProcessingPayment(false);
            }
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', function (response) {
          console.error('Payment failed:', response.error);
          alert(`Payment failed: ${response.error.description}`);
          setProcessingPayment(false);
        });
        razorpay.open();
        setProcessingPayment(false);

      } else {
        // For products only (contact-based for now)
        alert(language === 'hi'
          ? 'उत्पाद ऑर्डर के लिए कृपया संपर्क करें:\nफोन: +91-XXXXXXXXXX\nईमेल: temple@kuberji.org'
          : 'To order products, please contact:\nPhone: +91-XXXXXXXXXX\nEmail: temple@kuberji.org');
        setProcessingPayment(false);
      }

    } catch (error) {
      console.error('Payment error:', error);
      setProcessingPayment(false);
      alert(error.message || 'Payment failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-heritage-cream">
        <div className="text-center space-y-4">
          <div className="text-6xl text-sandalwood animate-pulse">ॐ</div>
          <p className="text-xl text-incense font-light">Loading...</p>
        </div>
      </div>
    );
  }

  const hasServices = cart.some(item => item.type === 'service');

  return (
    <div className="min-h-screen bg-heritage-cream">
      <MyNav />

      {/* Header */}
      <section className="relative py-16 px-4 bg-ivory border-b border-sandalwood/10">
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='30' y='35' text-anchor='middle' font-size='24' fill='%238B4513'%3Eॐ%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <div className="text-6xl text-sandalwood opacity-90 mb-4" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
            ॐ
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-deep-brown tracking-wide" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
            {language === 'hi' ? 'चेकआउट' : 'Checkout'}
          </h1>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Details Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-ivory rounded-sm p-6 border border-sandalwood/15">
              <h2 className="text-2xl font-light text-deep-brown mb-6 pb-4 border-b border-sandalwood/10" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                {language === 'hi' ? 'ऑर्डर आइटम' : 'Order Items'}
              </h2>

              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-white rounded-sm border border-sandalwood/10">
                    <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-sandalwood/20 to-heritage-cream rounded-sm flex items-center justify-center">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={language === 'hi' ? item.nameHi : item.nameEn}
                          width={80}
                          height={80}
                          className="object-cover rounded-sm"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      ) : (
                        <span className="text-2xl opacity-50">🕉️</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-light text-deep-brown" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                        {language === 'hi' ? item.nameHi : item.nameEn}
                      </h3>
                      <p className="text-sm text-incense capitalize">{item.type}</p>
                      <p className="text-lg text-sandalwood mt-2">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Date & Time (only for services) */}
            {hasServices && (
              <div className="bg-ivory rounded-sm p-6 border border-sandalwood/15">
                <h2 className="text-2xl font-light text-deep-brown mb-6 pb-4 border-b border-sandalwood/10" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                  {language === 'hi' ? 'बुकिंग विवरण' : 'Booking Details'}
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-deep-brown mb-2 flex items-center gap-2">
                      <Calendar size={16} className="text-sandalwood" />
                      {language === 'hi' ? 'तिथि चुनें' : 'Select Date'} *
                    </label>
                    <input
                      type="date"
                      value={bookingDetails.date}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-sandalwood/30 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-sm font-medium text-deep-brown mb-2 flex items-center gap-2">
                      <Clock size={16} className="text-sandalwood" />
                      {language === 'hi' ? 'समय चुनें' : 'Select Time'} *
                    </label>
                    <select
                      value={bookingDetails.time}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                      className="w-full px-4 py-3 border border-sandalwood/30 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
                      required
                    >
                      <option value="">{language === 'hi' ? 'समय चुनें' : 'Select time'}</option>
                      <option value="06:00">06:00 AM</option>
                      <option value="07:00">07:00 AM</option>
                      <option value="08:00">08:00 AM</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                      <option value="19:00">07:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    {language === 'hi' ? 'विशेष निर्देश (वैकल्पिक)' : 'Special Instructions (Optional)'}
                  </label>
                  <textarea
                    value={bookingDetails.notes}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-sandalwood/30 rounded-sm focus:ring-2 focus:ring-sandalwood focus:border-transparent"
                    placeholder={language === 'hi' ? 'कोई विशेष अनुरोध...' : 'Any special requests...'}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-ivory rounded-sm p-6 border border-sandalwood/15 shadow-sm sticky top-24"
            >
              <h3 className="text-xl font-light text-deep-brown mb-6 pb-4 border-b border-sandalwood/10" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                {language === 'hi' ? 'ऑर्डर सारांश' : 'Order Summary'}
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-incense">
                  <span>{language === 'hi' ? 'आइटम' : 'Items'}</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between text-incense">
                  <span>{language === 'hi' ? 'उप-योग' : 'Subtotal'}</span>
                  <span>{formatPrice(getTotalAmount())}</span>
                </div>

                {hasServices && (
                  <div className="pt-4 border-t border-sandalwood/10 space-y-2 text-sm">
                    <div className="flex justify-between text-incense">
                      <span>{language === 'hi' ? 'तिथि:' : 'Date:'}</span>
                      <span className="font-medium">
                        {bookingDetails.date || (language === 'hi' ? 'चयन करें' : 'Select')}
                      </span>
                    </div>
                    <div className="flex justify-between text-incense">
                      <span>{language === 'hi' ? 'समय:' : 'Time:'}</span>
                      <span className="font-medium">
                        {bookingDetails.time || (language === 'hi' ? 'चयन करें' : 'Select')}
                      </span>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-sandalwood/10">
                  <div className="flex justify-between text-lg font-medium text-deep-brown">
                    <span style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                      {language === 'hi' ? 'कुल' : 'Total'}
                    </span>
                    <span className="text-sandalwood text-2xl">{formatPrice(getTotalAmount())}</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={processingPayment}
                className="w-full px-6 py-4 bg-sandalwood text-ivory text-center rounded-sm font-light hover:bg-deep-brown transition-all duration-300 border border-sandalwood shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}
              >
                {processingPayment 
                  ? (language === 'hi' ? 'प्रोसेसिंग...' : 'Processing...') 
                  : (language === 'hi' ? 'भुगतान करें' : 'Proceed to Payment')}
              </button>

              <button
                onClick={() => router.push('/services')}
                className="w-full px-6 py-3 border border-sandalwood text-sandalwood text-center rounded-sm font-light hover:bg-sandalwood/5 transition-all duration-300"
                style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}
              >
                {language === 'hi' ? 'और खरीदारी करें' : 'Continue Shopping'}
              </button>

              <div className="mt-6 pt-6 border-t border-sandalwood/10">
                <p className="text-xs text-incense text-center">
                  🔒 {language === 'hi' 
                    ? 'सुरक्षित भुगतान Razorpay द्वारा' 
                    : 'Secure payment by Razorpay'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
