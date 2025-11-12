'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { isAuthenticated, getSession } from '@/lib/auth';
import MyNav from '@/components/MyNav';
import Footer from '@/components/Footer';
import RazorpayButton from '@/components/payment/RazorpayButton';
import { Trash2, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/auth/login?redirect=/cart');
      return;
    }

    setUser(getSession());

    // Load cart from localStorage
    const savedCart = localStorage.getItem('temple_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setLoading(false);
  }, [router]);

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('temple_cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('temple_cart');
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-heritage-cream">
        <div className="text-center space-y-4">
          <div className="text-6xl text-sandalwood animate-pulse">ॐ</div>
          <p className="text-xl text-incense font-light">Loading cart...</p>
        </div>
      </div>
    );
  }

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
          <div className="text-6xl text-sandalwood opacity-90 mb-4">
            <ShoppingCart className="inline-block" size={64} />
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-deep-brown tracking-wide" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
            {language === 'hi' ? 'आपकी कार्ट' : 'Your Cart'}
          </h1>
          <p className="text-lg text-incense font-light max-w-2xl mx-auto">
            {language === 'hi' 
              ? 'अपनी चुनी हुई सेवाओं और उत्पादों की समीक्षा करें और बुकिंग पूर्ण करें' 
              : 'Review your selected services and products and complete booking'}
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-8xl mb-6 opacity-30">🛒</div>
            <h2 className="text-3xl font-light text-deep-brown mb-4" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
              {language === 'hi' ? 'आपकी कार्ट खाली है' : 'Your cart is empty'}
            </h2>
            <p className="text-incense mb-8">
              {language === 'hi' 
                ? 'सेवाएं देखने और कार्ट में जोड़ने के लिए ब्राउज़ करें' 
                : 'Browse services to add items to your cart'}
            </p>
            <button
              onClick={() => router.push('/services')}
              className="px-8 py-4 bg-sandalwood text-ivory rounded-sm font-light hover:bg-deep-brown transition-all duration-300"
              style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}
            >
              {language === 'hi' ? 'सेवाएं देखें' : 'Browse Services'}
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-deep-brown" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                  {language === 'hi' ? 'कार्ट आइटम' : 'Cart Items'} ({cart.length})
                </h2>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:text-red-800 font-light"
                  >
                    {language === 'hi' ? 'सभी हटाएं' : 'Clear All'}
                  </button>
                )}
              </div>

              {cart.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-ivory rounded-sm p-6 border border-sandalwood/15 shadow-sm"
                >
                  <div className="flex gap-4">
                    {/* Item Image */}
                    <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-sandalwood/20 to-heritage-cream rounded-sm flex items-center justify-center overflow-hidden">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={language === 'hi' ? item.nameHi : item.nameEn}
                          width={96}
                          height={96}
                          className="object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-3xl opacity-50">🕉️</span>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-light text-deep-brown" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                            {language === 'hi' ? item.nameHi : item.nameEn}
                          </h3>
                          <p className="text-sm text-incense capitalize">
                            {item.type === 'service' 
                              ? (language === 'hi' ? 'सेवा' : 'Service')
                              : (language === 'hi' ? 'उत्पाद' : 'Product')}
                            {item.category && ` • ${item.category.replace('_', ' ')}`}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-600 hover:text-red-800 p-2"
                          title={language === 'hi' ? 'हटाएं' : 'Remove'}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {item.duration && (
                        <p className="text-sm text-incense mb-2">
                          {language === 'hi' ? 'अवधि' : 'Duration'}: {item.duration} {language === 'hi' ? 'मिनट' : 'min'}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-light text-sandalwood">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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

                  <div className="pt-4 border-t border-sandalwood/10">
                    <div className="flex justify-between text-lg font-medium text-deep-brown">
                      <span style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                        {language === 'hi' ? 'कुल' : 'Total'}
                      </span>
                      <span className="text-sandalwood text-2xl">{formatPrice(getTotalAmount())}</span>
                    </div>
                  </div>
                </div>

                {/* Proceed to Checkout Button */}
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full px-6 py-4 bg-sandalwood text-ivory text-center rounded-sm font-light hover:bg-deep-brown transition-all duration-300 border border-sandalwood shadow-sm mb-4"
                  style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}
                >
                  {language === 'hi' ? 'चेकआउट के लिए आगे बढ़ें' : 'Proceed to Checkout'}
                </button>

                <button
                  onClick={() => router.push('/services')}
                  className="w-full px-6 py-4 border border-sandalwood text-sandalwood text-center rounded-sm font-light hover:bg-sandalwood/5 transition-all duration-300"
                  style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}
                >
                  {language === 'hi' ? 'और सेवाएं देखें' : 'Continue Shopping'}
                </button>

                <div className="mt-6 pt-6 border-t border-sandalwood/10">
                  <p className="text-xs text-incense text-center">
                    {language === 'hi' 
                      ? 'सुरक्षित भुगतान Razorpay द्वारा संचालित' 
                      : 'Secure payment powered by Razorpay'}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
