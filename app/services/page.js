'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import MyNav from '@/components/MyNav';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const { language } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const t = (key) => getTranslation(language, key);

  const categories = [
    { value: 'ALL', labelEn: 'All Services', labelHi: 'सभी सेवाएं', icon: '🕉️' },
    { value: 'DAILY_AARTI', labelEn: 'Daily Aarti', labelHi: 'दैनिक आरती', icon: '🪔' },
    { value: 'SPECIAL_POOJA', labelEn: 'Special Pooja', labelHi: 'विशेष पूजा', icon: '🙏' },
    { value: 'GRAND_CEREMONY', labelEn: 'Grand Ceremony', labelHi: 'भव्य समारोह', icon: '🎊' },
    { value: 'SEVA', labelEn: 'Seva', labelHi: 'सेवा', icon: '💐' },
  ];

  useEffect(() => {
    fetchServices();
  }, [selectedCategory]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'ALL' 
        ? '/api/services?active=true'
        : `/api/services?category=${selectedCategory}&active=true`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setServices(data.services);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-heritage-cream">
      <MyNav />

      {/* Hero Header - Heritage Design */}
      <section className="relative py-20 px-4 bg-ivory border-b border-sandalwood/10">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='30' y='35' text-anchor='middle' font-size='24' fill='%238B4513'%3Eॐ%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Language Switcher */}
        <div className="absolute top-6 right-6">
          <LanguageSwitcher />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          viewport={{ once: true }}
          className="relative max-w-7xl mx-auto text-center space-y-4"
        >
          <div className="text-6xl text-sandalwood opacity-90 mb-4" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
            ॐ
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-deep-brown tracking-wide" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
            {language === 'hi' ? 'मंदिर सेवाएं और आरती' : 'Temple Services & Aarti'}
          </h1>
          <p className="text-lg text-incense font-light max-w-2xl mx-auto" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
            {language === 'hi' 
              ? 'भगवान कुबेर के आशीर्वाद के लिए हमारी दिव्य सेवाओं और आरती में भाग लें' 
              : 'Participate in our divine services and aartis for Lord Kuber\'s blessings'}
          </p>
        </motion.div>
      </section>

      {/* Category Filter - Heritage Design */}
      <section className="sticky top-0 z-40 bg-white border-b border-sandalwood/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-5 py-3 rounded-sm font-light transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.value
                    ? 'bg-sandalwood text-ivory shadow-md'
                    : 'bg-ivory text-deep-brown border border-sandalwood/30 hover:bg-sandalwood/10'
                }`}
                style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{language === 'hi' ? category.labelHi : category.labelEn}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid - Heritage Design */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-sandalwood/30 border-t-sandalwood"></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                ॐ
              </div>
            </div>
            <p className="mt-6 text-incense font-light" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
              {language === 'hi' ? 'सेवाएं लोड हो रही हैं...' : 'Loading services...'}
            </p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-30">🕉️</div>
            <p className="text-2xl text-incense font-light" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
              {language === 'hi' ? 'इस श्रेणी में कोई सेवा नहीं मिली' : 'No services found in this category'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeInOut' }}
                viewport={{ once: true }}
                className="bg-ivory rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-sandalwood/15 group"
              >
                {/* Service Image */}
                <div className="relative h-56 bg-gradient-to-br from-sandalwood/20 via-heritage-cream to-ivory flex items-center justify-center overflow-hidden">
                  {service.imageUrl ? (
                    <Image
                      src={service.imageUrl}
                      alt={language === 'hi' ? service.nameHi : service.nameEn}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="text-7xl opacity-50">🕉️</span>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-sandalwood text-ivory text-xs font-medium rounded-sm">
                      {service.category.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6 space-y-4">
                  {/* Service Name */}
                  <h3 className="text-2xl font-light text-deep-brown" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                    {language === 'hi' ? service.nameHi : service.nameEn}
                  </h3>

                  {/* Description */}
                  <p className="text-incense text-sm font-light line-clamp-3 leading-relaxed">
                    {language === 'hi' ? service.descriptionHi : service.descriptionEn}
                  </p>

                  {/* Benefits */}
                  {service.benefitsEn && service.benefitsEn.length > 0 && (
                    <div className="pt-2 border-t border-sandalwood/10">
                      <p className="text-xs font-medium text-sandalwood mb-2" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                        {language === 'hi' ? 'लाभ:' : 'Benefits:'}
                      </p>
                      <ul className="text-xs text-incense space-y-1">
                        {(language === 'hi' ? service.benefitsHi : service.benefitsEn)
                          .slice(0, 2)
                          .map((benefit, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-sandalwood mr-2">✓</span>
                              <span className="font-light">{benefit}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {/* Duration and Price */}
                  <div className="flex justify-between items-center pt-4 border-t border-sandalwood/10">
                    <div>
                      <p className="text-xs text-incense font-light">
                        {language === 'hi' ? 'अवधि' : 'Duration'}
                      </p>
                      <p className="text-sm font-medium text-deep-brown">
                        {service.duration} {language === 'hi' ? 'मिनट' : 'min'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-incense font-light">
                        {language === 'hi' ? 'मूल्य' : 'Price'}
                      </p>
                      <p className="text-2xl font-light text-sandalwood" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {formatPrice(service.price)}
                      </p>
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <Link
                    href={`/book-service?serviceId=${service.id}`}
                    className="block w-full px-6 py-3 bg-sandalwood text-ivory text-center rounded-sm font-light hover:bg-deep-brown transition-all duration-300 border border-sandalwood shadow-sm"
                    style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}
                  >
                    {language === 'hi' ? 'अभी बुक करें' : 'Book Now'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Info Section - Heritage Design */}
      <section className="bg-ivory border-t border-sandalwood/10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-sm border border-sandalwood/10"
            >
              <div className="text-4xl mb-4">📿</div>
              <h3 className="text-xl font-light text-deep-brown mb-2" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                {language === 'hi' ? 'पारंपरिक अनुष्ठान' : 'Traditional Rituals'}
              </h3>
              <p className="text-sm text-incense font-light">
                {language === 'hi' 
                  ? 'प्राचीन वैदिक परंपराओं का पालन करते हुए आयोजित' 
                  : 'Conducted following ancient Vedic traditions'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-sm border border-sandalwood/10"
            >
              <div className="text-4xl mb-4">🙏</div>
              <h3 className="text-xl font-light text-deep-brown mb-2" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                {language === 'hi' ? 'अनुभवी पुजारी' : 'Experienced Priests'}
              </h3>
              <p className="text-sm text-incense font-light">
                {language === 'hi' 
                  ? 'योग्य और समर्पित पुजारियों द्वारा सेवा' 
                  : 'Services by qualified and devoted priests'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-sm border border-sandalwood/10"
            >
              <div className="text-4xl mb-4">📹</div>
              <h3 className="text-xl font-light text-deep-brown mb-2" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                {language === 'hi' ? 'लाइव स्ट्रीमिंग' : 'Live Streaming'}
              </h3>
              <p className="text-sm text-incense font-light">
                {language === 'hi' 
                  ? 'चयनित सेवाओं के लिए लाइव प्रसारण उपलब्ध' 
                  : 'Live broadcast available for selected services'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-br from-heritage-cream to-ivory">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="text-5xl text-sandalwood opacity-80 mb-4" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
            ॐ श्री कुबेराय नमः
          </div>
          <h2 className="text-3xl font-light text-deep-brown" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
            {language === 'hi' ? 'विशेष सेवा की आवश्यकता है?' : 'Need a Special Service?'}
          </h2>
          <p className="text-incense font-light max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
            {language === 'hi'
              ? 'यदि आपको कोई विशेष पूजा या सेवा चाहिए जो यहां सूचीबद्ध नहीं है, तो कृपया हमसे संपर्क करें। हम आपकी आवश्यकताओं के अनुसार व्यवस्था करने में प्रसन्न होंगे।'
              : 'If you need a special pooja or service not listed here, please contact us. We\'ll be happy to arrange according to your requirements.'}
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-sandalwood text-ivory rounded-sm font-light hover:bg-deep-brown transition-all duration-300 border border-sandalwood shadow-sm"
              style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}
            >
              {language === 'hi' ? 'संपर्क करें' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
