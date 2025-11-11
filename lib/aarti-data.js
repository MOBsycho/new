// Aarti & Pooja Services Data - KuberJi Mandir

export const AARTI_SERVICES = [
  // ========================================
  // NITYA NIYAM POOJAN EVAM BHOG (Daily Rituals)
  // ========================================
  {
    id: 1,
    titleEn: 'Kuber Ji Ka Nitya Abhishek',
    titleHi: 'कुबेर जी का नित्य अभिषेक',
    descriptionEn: 'Daily sacred bath ritual of Lord Kuber with holy water, milk, and divine offerings for prosperity and wealth.',
    descriptionHi: 'भगवान कुबेर का पवित्र जल, दूध और दिव्य प्रसाद से दैनिक अभिषेक, समृद्धि और धन के लिए।',
    price: 1100,
    duration: '45 minutes',
    timing: 'Morning 6:00 AM - 7:00 AM',
    category: 'Daily Rituals',
    categoryKey: 'aarti.dailyRituals',
    image: '/images/milkbath.jpeg',
    videoUrl: '/pandukeshwar.mp4',
    benefits: [
      'Daily blessings of Lord Kuber',
      'Financial stability and growth',
      'Removal of financial obstacles',
      'Continuous prosperity flow'
    ]
  },
  {
    id: 2,
    titleEn: 'Kuber Ji Ki Mangala Aarti',
    titleHi: 'कुबेर जी की मंगला आरती',
    descriptionEn: 'Morning auspicious aarti to invoke Lord Kuber\'s blessings for a prosperous day ahead.',
    descriptionHi: 'भगवान कुबेर की प्रातःकालीन मंगल आरती, दिन भर की समृद्धि के लिए।',
    price: 501,
    duration: '30 minutes',
    timing: 'Morning 7:00 AM - 7:30 AM',
    category: 'Daily Rituals',
    image: '/images/temple/temple.jpg',
    videoUrl: '/about-video.mp4',
    benefits: [
      'Auspicious start to the day',
      'Divine protection',
      'Positive energy flow',
      'Success in daily activities'
    ]
  },
  {
    id: 3,
    titleEn: 'Kuber Baal Bhog',
    titleHi: 'कुबेर बाल भोग',
    descriptionEn: 'Morning meal offering to Lord Kuber with sacred prasad and traditional bhog items.',
    descriptionHi: 'भगवान कुबेर को प्रातःकालीन भोजन अर्पण, पवित्र प्रसाद के साथ।',
    price: 501,
    duration: '30 minutes',
    timing: 'Morning 8:00 AM - 8:30 AM',
    category: 'Daily Rituals',
    image: '/images/carrying.jpeg',
    videoUrl: '/pandukeshwar.mp4',
    benefits: [
      'Blessings of abundance',
      'Food security',
      'Health and nourishment',
      'Family prosperity'
    ]
  },
  {
    id: 4,
    titleEn: 'Kuber MahaPrasad',
    titleHi: 'कुबेर महाप्रसाद',
    descriptionEn: 'Special grand prasad offering to Lord Kuber with elaborate food items and sweets.',
    descriptionHi: 'भगवान कुबेर को विशेष महाप्रसाद भोग, विस्तृत भोजन और मिठाई के साथ।',
    price: 501,
    duration: '45 minutes',
    timing: 'Afternoon 12:00 PM - 12:45 PM',
    category: 'Daily Rituals',
    image: '/images/kalas.jpg',
    videoUrl: '/about-video.mp4',
    benefits: [
      'Complete satisfaction',
      'Fulfillment of desires',
      'Spiritual nourishment',
      'Divine grace'
    ]
  },
  {
    id: 5,
    titleEn: 'Kuber Sayan Kaaleen Aarti',
    titleHi: 'कुबेर शयन कालीन आरती',
    descriptionEn: 'Evening bedtime aarti performed as Lord Kuber retires for the night.',
    descriptionHi: 'भगवान कुबेर की शयन कालीन संध्या आरती।',
    price: 301,
    duration: '20 minutes',
    timing: 'Evening 8:00 PM - 8:20 PM',
    category: 'Daily Rituals',
    image: '/images/temple/temple-night.jpeg',
    videoUrl: '/pandukeshwar.mp4',
    benefits: [
      'Peaceful night',
      'Protection during sleep',
      'Positive dreams',
      'Next day blessings'
    ]
  },
  {
    id: 6,
    titleEn: 'Kuber Sayan Aarti',
    titleHi: 'कुबेर शयन आरती',
    descriptionEn: 'Final evening aarti with closing prayers and lamp offerings to Lord Kuber.',
    descriptionHi: 'भगवान कुबेर की अंतिम संध्या आरती, समापन प्रार्थना के साथ।',
    price: 301,
    duration: '20 minutes',
    timing: 'Evening 8:30 PM - 8:50 PM',
    category: 'Daily Rituals',
    image: '/images/temple/front-temple.jpg',
    videoUrl: '/about-video.mp4',
    benefits: [
      'Day completion',
      'Gratitude to Lord Kuber',
      'Night protection',
      'Tomorrow\'s prosperity'
    ]
  },

  // ========================================
  // KUBER JI KI VISHESH POOJA (Special Puja - 15 January)
  // ========================================
  {
    id: 7,
    titleEn: 'Kuber Ji Ka Mahabhishek Pooja',
    titleHi: 'कुबेर जी का महाअभिषेक पूजा',
    descriptionEn: 'Grand abhishek ceremony of Lord Kuber performed on 15th January with elaborate rituals and sacred offerings.',
    descriptionHi: '15 जनवरी को भगवान कुबेर का भव्य महाअभिषेक, विस्तृत अनुष्ठान के साथ।',
    price: 2100,
    duration: '1.5 hours',
    timing: '15 January - Morning',
    category: 'Special Pooja',
    image: '/images/milkbath2.jpeg',
    videoUrl: '/pandukeshwar.mp4',
    benefits: [
      'Annual special blessings',
      'Wealth multiplication',
      'Business prosperity',
      'Financial breakthrough'
    ],
    specialDate: '15 January',
    isSpecialPuja: true
  },
  {
    id: 8,
    titleEn: 'Kuber Ji Ka Havan Pooja',
    titleHi: 'कुबेर जी का हवन पूजा',
    descriptionEn: 'Sacred fire ritual performed on 15th January with vedic mantras and offerings to invoke Lord Kuber\'s blessings.',
    descriptionHi: '15 जनवरी को वैदिक मंत्रों के साथ पवित्र हवन अनुष्ठान।',
    price: 1100,
    duration: '1 hour',
    timing: '15 January - Morning',
    category: 'Special Pooja',
    image: '/images/kuberji/kuber-chowk-31.jpeg',
    videoUrl: '/about-video.mp4',
    benefits: [
      'Purification through fire',
      'Obstacle removal',
      'Divine intervention',
      'Prosperity activation'
    ],
    specialDate: '15 January',
    isSpecialPuja: true
  },
  {
    id: 9,
    titleEn: 'Kuber Ji Ka Vishesh Bhog',
    titleHi: 'कुबेर जी का विशेष भोग',
    descriptionEn: 'Special elaborate food offering to Lord Kuber on 15th January with traditional prasad items.',
    descriptionHi: '15 जनवरी को भगवान कुबेर को विशेष भोग, पारंपरिक प्रसाद के साथ।',
    price: 1100,
    duration: '45 minutes',
    timing: '15 January - Afternoon',
    category: 'Special Pooja',
    image: '/images/kalas.jpg',
    videoUrl: '/pandukeshwar.mp4',
    benefits: [
      'Special day blessings',
      'Abundant prasad',
      'Divine satisfaction',
      'Year-long prosperity'
    ],
    specialDate: '15 January',
    isSpecialPuja: true
  },
  {
    id: 10,
    titleEn: 'Kuber Vastr Bhet',
    titleHi: 'कुबेर वस्त्र भेंट',
    descriptionEn: 'Offering of new sacred clothes to Lord Kuber on 15th January as a symbol of devotion.',
    descriptionHi: '15 जनवरी को भगवान कुबेर को नए पवित्र वस्त्र भेंट।',
    price: 1100,
    duration: '30 minutes',
    timing: '15 January - Morning',
    category: 'Special Pooja',
    image: '/images/temple/temple.jpg',
    videoUrl: '/about-video.mp4',
    benefits: [
      'Divine adornment',
      'Respect and honor',
      'Blessings of luxury',
      'Material abundance'
    ],
    specialDate: '15 January',
    isSpecialPuja: true
  },
  {
    id: 11,
    titleEn: 'Kuber Havan Bhet',
    titleHi: 'कुबेर हवन भेंट',
    descriptionEn: 'Special offering for the havan ceremony to sponsor sacred fire ritual materials.',
    descriptionHi: 'हवन समारोह के लिए विशेष भेंट, पवित्र हवन सामग्री के लिए।',
    price: 1100,
    duration: '1 hour',
    timing: '15 January - Morning',
    category: 'Special Pooja',
    image: '/images/milkbath.jpeg',
    videoUrl: '/pandukeshwar.mp4',
    benefits: [
      'Havan sponsorship merit',
      'Sacred fire blessings',
      'Purification power',
      'Spiritual elevation'
    ],
    specialDate: '15 January',
    isSpecialPuja: true
  },

  // ========================================
  // BASANT PANCHAMI (Vishesh Pooja)
  // ========================================
  {
    id: 12,
    titleEn: 'Basant Panchami - Kuber Mahabhishek',
    titleHi: 'बसंत पंचमी - कुबेर महाअभिषेक',
    descriptionEn: 'Grand abhishek ceremony on Basant Panchami celebrating the arrival of spring with Lord Kuber\'s blessings.',
    descriptionHi: 'बसंत पंचमी पर भव्य महाअभिषेक, वसंत के आगमन के उत्सव के साथ।',
    price: 2100,
    duration: '1.5 hours',
    timing: 'Basant Panchami - Morning',
    category: 'Festival Pooja',
    image: '/images/milkbath2.jpeg',
    videoUrl: '/about-video.mp4',
    benefits: [
      'Spring season blessings',
      'New beginnings',
      'Knowledge and wisdom',
      'Prosperity activation'
    ],
    festival: 'Basant Panchami',
    isSpecialPuja: true
  },
  {
    id: 13,
    titleEn: 'Basant Panchami - Kuber Havan',
    titleHi: 'बसंत पंचमी - कुबेर हवन',
    descriptionEn: 'Sacred fire ceremony on Basant Panchami to invoke blessings for knowledge, wealth, and prosperity.',
    descriptionHi: 'बसंत पंचमी पर पवित्र हवन, ज्ञान, धन और समृद्धि के लिए।',
    price: 2100,
    duration: '1.5 hours',
    timing: 'Basant Panchami - Morning',
    category: 'Festival Pooja',
    image: '/images/kuberji/kuber-chowk-31.jpeg',
    videoUrl: '/pandukeshwar.mp4',
    benefits: [
      'Divine fire blessings',
      'Knowledge enhancement',
      'Financial growth',
      'Wisdom and wealth'
    ],
    festival: 'Basant Panchami',
    isSpecialPuja: true
  },
  {
    id: 14,
    titleEn: 'Basant Panchami - Kuber Bhandara',
    titleHi: 'बसंत पंचमी - कुबेर भंडारा',
    descriptionEn: 'Grand community feast (Bhandara) organized on Basant Panchami to celebrate Badrinath ji temple opening announcement.',
    descriptionHi: 'बसंत पंचमी पर भव्य भंडारा, बद्रीनाथ जी के कपाट खुलने की घोषणा के उपलक्ष्य में।',
    price: 21000,
    duration: 'Full Day',
    timing: 'Basant Panchami - All Day',
    category: 'Festival Pooja',
    image: '/images/carrying.jpeg',
    videoUrl: '/about-video.mp4',
    benefits: [
      'Community service merit',
      'Mass blessings',
      'Celebration of sacred occasion',
      'Divine grace multiplied'
    ],
    festival: 'Basant Panchami',
    specialNote: 'Organized to celebrate Badrinath ji kapaat khulne ki tithi ghoshit hone ke uplaksh mai',
    isSpecialPuja: true,
    isGrandEvent: true
  },
  {
    id: 15,
    titleEn: 'Basant Panchami - Kuber Vastr Bhet',
    titleHi: 'बसंत पंचमी - कुबेर वस्त्र भेंट',
    descriptionEn: 'Offering of new clothes to Lord Kuber on the auspicious occasion of Basant Panchami.',
    descriptionHi: 'बसंत पंचमी के शुभ अवसर पर भगवान कुबेर को नए वस्त्र भेंट।',
    price: 1100,
    duration: '30 minutes',
    timing: 'Basant Panchami - Morning',
    category: 'Festival Pooja',
    image: '/images/temple/temple.jpg',
    videoUrl: '/pandukeshwar.mp4',
    benefits: [
      'Festival blessings',
      'Honor and devotion',
      'Material prosperity',
      'Divine favor'
    ],
    festival: 'Basant Panchami',
    isSpecialPuja: true
  },
  {
    id: 16,
    titleEn: 'Basant Panchami - Kuber Dhwaj Bhet',
    titleHi: 'बसंत पंचमी - कुबेर ध्वज भेंट',
    descriptionEn: 'Offering of sacred flag to Lord Kuber on Basant Panchami as a symbol of victory and prosperity.',
    descriptionHi: 'बसंत पंचमी पर भगवान कुबेर को पवित्र ध्वज भेंट, विजय और समृद्धि के प्रतीक के रूप में।',
    price: 1100,
    duration: '30 minutes',
    timing: 'Basant Panchami - Morning',
    category: 'Festival Pooja',
    image: '/images/temple/front-temple.jpg',
    videoUrl: '/about-video.mp4',
    benefits: [
      'Victory flag blessings',
      'Success in ventures',
      'Prosperity symbol',
      'Divine protection'
    ],
    festival: 'Basant Panchami',
    isSpecialPuja: true
  },

  // ========================================
  // BAISAKHI PARV
  // ========================================
  {
    id: 17,
    titleEn: 'Baisakhi - Kuber Mahabhishek',
    titleHi: 'बैसाखी - कुबेर महाअभिषेक',
    descriptionEn: 'Grand abhishek ceremony on Baisakhi festival to celebrate harvest season and invoke Lord Kuber\'s blessings.',
    descriptionHi: 'बैसाखी पर्व पर भव्य महाअभिषेक, फसल के मौसम और समृद्धि के उत्सव के साथ।',
    price: 2100,
    duration: '1.5 hours',
    timing: 'Baisakhi - Morning',
    category: 'Festival Pooja',
    image: '/images/milkbath.jpeg',
    videoUrl: '/pandukeshwar.mp4',
    benefits: [
      'Harvest blessings',
      'Abundance celebration',
      'Prosperity for year ahead',
      'Agricultural success'
    ],
    festival: 'Baisakhi',
    isSpecialPuja: true
  },
  {
    id: 18,
    titleEn: 'Baisakhi - Kuber Basant Bhet',
    titleHi: 'बैसाखी - कुबेर बसंत भेंट',
    descriptionEn: 'Special spring offering to Lord Kuber on Baisakhi with flowers and seasonal items.',
    descriptionHi: 'बैसाखी पर भगवान कुबेर को विशेष बसंत भेंट, फूल और मौसमी वस्तुओं के साथ।',
    price: 1100,
    duration: '30 minutes',
    timing: 'Baisakhi - Morning',
    category: 'Festival Pooja',
    image: '/images/kalas.jpg',
    videoUrl: '/about-video.mp4',
    benefits: [
      'Spring season grace',
      'New growth blessings',
      'Seasonal prosperity',
      'Nature\'s abundance'
    ],
    festival: 'Baisakhi',
    isSpecialPuja: true
  },
  {
    id: 19,
    titleEn: 'Baisakhi - Kuber Dhwaj Bhet',
    titleHi: 'बैसाखी - कुबेर ध्वज भेंट',
    descriptionEn: 'Sacred flag offering to Lord Kuber on Baisakhi symbolizing victory and prosperity of harvest.',
    descriptionHi: 'बैसाखी पर भगवान कुबेर को पवित्र ध्वज भेंट, फसल की विजय और समृद्धि का प्रतीक।',
    price: 1100,
    duration: '30 minutes',
    timing: 'Baisakhi - Morning',
    category: 'Festival Pooja',
    image: '/images/temple/temple-night.jpeg',
    videoUrl: '/pandukeshwar.mp4',
    benefits: [
      'Victory celebration',
      'Harvest success',
      'Prosperity flag',
      'Year-round abundance'
    ],
    festival: 'Baisakhi',
    isSpecialPuja: true
  }
];

export const CATEGORIES = [
  'All Services',
  'Daily Rituals',
  'Special Pooja',
  'Festival Pooja'
];

// Shop Products - Kuber Prasadam
export const SHOP_PRODUCTS = [
  {
    id: 1,
    titleEn: 'Kuber Sikka',
    titleHi: 'कुबेर सिक्का',
    descriptionEn: 'Sacred Kuber coin blessed in the temple, believed to attract wealth and prosperity when kept in purse or temple.',
    descriptionHi: 'मंदिर में आशीर्वादित पवित्र कुबेर सिक्का, धन और समृद्धि को आकर्षित करने के लिए।',
    price: 101,
    category: 'Prasadam',
    image: '/images/products/kuber-sikka.jpg',
    benefits: [
      'Attracts wealth',
      'Removes financial obstacles',
      'Blessed in Kuber temple',
      'Portable prosperity symbol'
    ],
    inStock: true
  },
  {
    id: 2,
    titleEn: 'Kuber Potli',
    titleHi: 'कुबेर पोटली',
    descriptionEn: 'Blessed sacred potli containing powerful items, mantras, and blessings from Lord Kuber for wealth and prosperity.',
    descriptionHi: 'भगवान कुबेर से धन और समृद्धि के लिए शक्तिशाली वस्तुएं और मंत्र युक्त आशीर्वादित पोटली।',
    price: 1100,
    category: 'Prasadam',
    image: '/images/products/kuber-potli.jpg',
    benefits: [
      'Complete Kuber blessings',
      'Financial breakthrough',
      'Business prosperity',
      'Wealth preservation'
    ],
    inStock: true
  },
  {
    id: 3,
    titleEn: 'Kuber Photo Frame',
    titleHi: 'कुबेर फोटो फ्रेम',
    descriptionEn: 'Beautiful photo frame of Lord Kuber from Pandukeshwar temple, perfect for home or office worship.',
    descriptionHi: 'पांडुकेश्वर मंदिर से भगवान कुबेर का सुंदर फोटो फ्रेम, घर या ऑफिस पूजा के लिए।',
    price: 500,
    category: 'Prasadam',
    image: '/images/products/kuber-frame.jpg',
    benefits: [
      'Daily darshan',
      'Home/office blessing',
      'Prosperity reminder',
      'Sacred presence'
    ],
    inStock: true
  },
  {
    id: 4,
    titleEn: 'Kuber Photo Soft Copy',
    titleHi: 'कुबेर फोटो सॉफ्ट कॉपी',
    descriptionEn: 'High-resolution digital photo of Lord Kuber from the temple, perfect for phone wallpaper or digital display.',
    descriptionHi: 'मंदिर से भगवान कुबेर की उच्च गुणवत्ता डिजिटल फोटो, फोन या डिजिटल प्रदर्शन के लिए।',
    price: 101,
    category: 'Prasadam',
    image: '/images/products/kuber-digital.jpg',
    benefits: [
      'Instant digital darshan',
      'Phone wallpaper',
      'Always accessible',
      'HD quality'
    ],
    inStock: true,
    isDigital: true
  }
];

// Purchase management
export function savePurchase(userId, service) {
  if (typeof window !== 'undefined') {
    const purchases = localStorage.getItem('kuberji_purchases') || '[]';
    const purchaseList = JSON.parse(purchases);
    
    purchaseList.push({
      id: Date.now(),
      userId,
      serviceId: service.id,
      service,
      purchaseDate: new Date().toISOString()
    });
    
    localStorage.setItem('kuberji_purchases', JSON.stringify(purchaseList));
  }
}

export function getUserPurchases(userId) {
  if (typeof window !== 'undefined') {
    const purchases = localStorage.getItem('kuberji_purchases') || '[]';
    const purchaseList = JSON.parse(purchases);
    return purchaseList.filter(p => p.userId === userId);
  }
  return [];
}
