'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { isAuthenticated, getSession } from '@/lib/auth';
import { AARTI_SERVICES, CATEGORIES, savePurchase } from '@/lib/aarti-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function AartiPoojaPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }
    setUser(getSession());
  }, [router]);

  const filteredServices = selectedCategory === 'All Services'
    ? AARTI_SERVICES
    : AARTI_SERVICES.filter(service => service.category === selectedCategory);

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    if (user && selectedService) {
      savePurchase(user.id, selectedService);
      setShowModal(false);
      setShowConfirmation(true);
      
      // Hide confirmation after 3 seconds
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-heritage-cream">
        <div className="text-xl text-incense font-light">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-heritage-cream">
      {/* Header - Heritage Design */}
      <div className="bg-ivory border-b border-sandalwood/10 py-16 relative">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="text-6xl text-sandalwood opacity-90" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
              ॐ
            </div>
            <h1 className="text-5xl font-light text-deep-brown tracking-wide" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
              {t('aarti.title')}
            </h1>
            <p className="text-lg text-incense font-light max-w-2xl mx-auto">
              {t('aarti.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Success Confirmation - Heritage */}
      {showConfirmation && (
        <div className="fixed top-20 right-4 z-50">
          <div className="bg-ivory border border-sandalwood text-deep-brown px-6 py-4 rounded-sm shadow-lg flex items-center space-x-3">
            <svg className="w-6 h-6 text-sandalwood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-light">{t('aarti.bookingConfirmed')}</p>
              <p className="text-sm text-incense font-light">{t('aarti.checkMyAartis')}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters - Heritage */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-sm font-light transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-sandalwood text-ivory shadow-sm'
                    : 'bg-ivory text-deep-brown hover:bg-sandalwood/5 border border-sandalwood/20'
                }`}
                style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}
              >
                {t(`aarti.${category.toLowerCase().replace(/ /g, '')}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid - Heritage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-ivory rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-sandalwood/15"
            >
              <div className="relative h-64">
                <Image
                  src={service.image}
                  alt={language === 'hi' ? service.titleHi : service.titleEn}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.target.src = '/images/temple/default.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-sandalwood text-ivory px-4 py-2 rounded-sm font-light shadow-sm">
                  ₹{service.price}
                </div>
                {service.isSpecialPuja && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-sm text-xs font-medium">
                    Special Event
                  </div>
                )}
                {service.isGrandEvent && (
                  <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-sm text-xs font-medium">
                    Grand Bhandara
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-ivory/90 backdrop-blur-sm px-3 py-1 rounded-sm text-sm font-light text-incense mb-2">
                    {service.category}
                  </div>
                  {service.specialDate && (
                    <div className="bg-sandalwood/90 backdrop-blur-sm px-3 py-1 rounded-sm text-xs font-light text-ivory">
                      📅 {service.specialDate || service.festival}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-light text-deep-brown mb-2" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                  {language === 'hi' ? service.titleHi : service.titleEn}
                </h3>
                <p className="text-incense font-light mb-4 line-clamp-2 text-sm">
                  {language === 'hi' ? service.descriptionHi : service.descriptionEn}
                </p>
                
                <div className="flex items-center justify-between text-xs text-incense mb-4 font-light">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {service.duration}
                  </div>
                  <div className="text-sandalwood">
                    {service.timing}
                  </div>
                </div>

                <button
                  onClick={() => handleBookNow(service)}
                  className="w-full bg-sandalwood text-ivory py-3 rounded-sm font-light hover:bg-deep-brown transition-all duration-300 shadow-sm border border-sandalwood"
                  style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}
                >
                  {t('aarti.bookNow')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal - Heritage */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-deep-brown/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-ivory rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-sandalwood/20">
            <div className="relative h-64">
              <Image
                src={selectedService.image}
                alt={language === 'hi' ? selectedService.titleHi : selectedService.titleEn}
                fill
                className="object-cover"
                onError={(e) => {
                  e.target.src = '/images/temple/default.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/70 to-transparent" />
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-ivory/90 backdrop-blur-sm p-2 rounded-sm hover:bg-ivory transition-colors"
              >
                <svg className="w-6 h-6 text-deep-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-4 border-b border-sandalwood/10 pb-4">
                <h2 className="text-3xl font-light text-deep-brown" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                  {language === 'hi' ? selectedService.titleHi : selectedService.titleEn}
                </h2>
                <div className="text-2xl font-light text-sandalwood">
                  ₹{selectedService.price}
                </div>
              </div>

              <p className="text-incense font-light mb-6 leading-relaxed">
                {language === 'hi' ? selectedService.descriptionHi : selectedService.descriptionEn}
              </p>

              {selectedService.specialNote && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-sm mb-6">
                  <p className="text-sm text-amber-900 font-light">
                    <span className="font-medium">Note: </span>{selectedService.specialNote}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-sandalwood/5 p-4 rounded-sm border border-sandalwood/10">
                  <div className="text-xs text-incense mb-1 font-light">{t('aarti.duration')}</div>
                  <div className="font-light text-deep-brown">{selectedService.duration}</div>
                </div>
                <div className="bg-sandalwood/5 p-4 rounded-sm border border-sandalwood/10">
                  <div className="text-xs text-incense mb-1 font-light">{t('aarti.timing')}</div>
                  <div className="font-light text-deep-brown">{selectedService.timing}</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-light text-deep-brown mb-3" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                  {t('aarti.benefits')}
                </h3>
                <ul className="space-y-2">
                  {selectedService.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 text-sandalwood mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-incense font-light text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 border-t border-sandalwood/10 pt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-heritage-bg border border-sandalwood/20 text-deep-brown py-3 rounded-sm font-light hover:bg-sandalwood/5 transition-colors"
                  style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}
                >
                  {t('aarti.cancel')}
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-sandalwood text-ivory py-3 rounded-sm font-light hover:bg-deep-brown transition-all duration-300 shadow-sm border border-sandalwood"
                  style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}
                >
                  {t('aarti.confirmBooking')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
