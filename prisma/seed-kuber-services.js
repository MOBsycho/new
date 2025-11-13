const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedKuberServices() {
  console.log('🕉️  Seeding Kuber Ji Temple Services and Products...');

  try {
    // Clear existing services
    console.log('🗑️  Clearing existing services...');
    await prisma.service.deleteMany({});
    console.log('✅ Existing services cleared');

    // Nitya Niyam Poojan Evam Bhog (Daily Services)
    const dailyServices = [
      {
        nameEn: 'Kuber Ji Ka Nitya Abhishek',
        nameHi: 'कुबेर जी का नित्य अभिषेक',
        descriptionEn: 'Daily sacred bathing ritual of Lord Kuber with milk, honey, ghee, and holy water. This Vedic ceremony brings prosperity and removes financial obstacles.',
        descriptionHi: 'भगवान कुबेर का दूध, शहद, घी और पवित्र जल से नित्य पवित्र स्नान अनुष्ठान। यह वैदिक समारोह समृद्धि लाता है और वित्तीय बाधाओं को दूर करता है।',
        price: 1100,
        duration: 45,
        category: 'DAILY_AARTI',
        benefitsEn: ['Daily prosperity blessings', 'Financial stability', 'Removes obstacles', 'Divine grace'],
        benefitsHi: ['दैनिक समृद्धि का आशीर्वाद', 'वित्तीय स्थिरता', 'बाधाओं को दूर करे', 'दिव्य कृपा'],
        availableSlots: ['06:00', '07:00', '08:00'],
        imageUrl: '/images/abhishek.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Ji Ki Mangala Aarti',
        nameHi: 'कुबेर जी की मंगला आरती',
        descriptionEn: 'Auspicious morning aarti to invoke Lord Kuber\'s blessings for the day ahead. Start your day with divine prosperity.',
        descriptionHi: 'आगामी दिन के लिए भगवान कुबेर का आशीर्वाद लेने के लिए शुभ प्रातः आरती। दिव्य समृद्धि के साथ अपने दिन की शुरुआत करें।',
        price: 501,
        duration: 30,
        category: 'DAILY_AARTI',
        benefitsEn: ['Auspicious start', 'Morning blessings', 'Positive energy', 'Mental peace'],
        benefitsHi: ['शुभ शुरुआत', 'प्रातः आशीर्वाद', 'सकारात्मक ऊर्जा', 'मानसिक शांति'],
        availableSlots: ['05:30', '06:00', '06:30'],
        imageUrl: '/images/mangala-aarti.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Baal Bhog',
        nameHi: 'कुबेर बाल भोग',
        descriptionEn: 'Morning food offering to young Lord Kuber. Participate in this sacred ritual to receive divine blessings and prosperity.',
        descriptionHi: 'युवा भगवान कुबेर को प्रातः भोजन अर्पण। दिव्य आशीर्वाद और समृद्धि प्राप्त करने के लिए इस पवित्र अनुष्ठान में भाग लें।',
        price: 501,
        duration: 20,
        category: 'DAILY_AARTI',
        benefitsEn: ['Divine blessings', 'Food security', 'Family prosperity', 'Health & wealth'],
        benefitsHi: ['दिव्य आशीर्वाद', 'खाद्य सुरक्षा', 'पारिवारिक समृद्धि', 'स्वास्थ्य और धन'],
        availableSlots: ['08:00', '08:30', '09:00'],
        imageUrl: '/images/baal-bhog.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber MahaPrasad',
        nameHi: 'कुबेर महाप्रसाद',
        descriptionEn: 'Sacred blessed food offering from Lord Kuber\'s temple. Receive divine prasad that brings abundance and prosperity to your home.',
        descriptionHi: 'भगवान कुबेर के मंदिर से पवित्र आशीर्वादित भोजन प्रसाद। दिव्य प्रसाद प्राप्त करें जो आपके घर में प्रचुरता और समृद्धि लाता है।',
        price: 501,
        duration: 15,
        category: 'DAILY_AARTI',
        benefitsEn: ['Blessed prasad', 'Abundance', 'Family harmony', 'Spiritual growth'],
        benefitsHi: ['आशीर्वादित प्रसाद', 'प्रचुरता', 'पारिवारिक सद्भाव', 'आध्यात्मिक विकास'],
        availableSlots: ['12:00', '12:30', '13:00'],
        imageUrl: '/images/mahaprasad.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Sayan Kaaleen Aarti',
        nameHi: 'कुबेर सयन कालीन आरती',
        descriptionEn: 'Evening aarti before Lord Kuber\'s rest time. Seek blessings for peaceful night and prosperous tomorrow.',
        descriptionHi: 'भगवान कुबेर के विश्राम समय से पहले संध्या आरती। शांतिपूर्ण रात्रि और समृद्ध कल के लिए आशीर्वाद मांगें।',
        price: 301,
        duration: 25,
        category: 'DAILY_AARTI',
        benefitsEn: ['Evening peace', 'Night protection', 'Next day prosperity', 'Family safety'],
        benefitsHi: ['संध्या शांति', 'रात्रि संरक्षण', 'अगले दिन की समृद्धि', 'परिवार की सुरक्षा'],
        availableSlots: ['19:00', '19:30', '20:00'],
        imageUrl: '/images/sayan-aarti.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Sayan Aarti',
        nameHi: 'कुबेर सयन आरती',
        descriptionEn: 'Final aarti of the day as Lord Kuber retires. Conclude your day with divine blessings and peaceful rest.',
        descriptionHi: 'दिन की अंतिम आरती जब भगवान कुबेर विश्राम करते हैं। दिव्य आशीर्वाद और शांतिपूर्ण विश्राम के साथ अपने दिन का समापन करें।',
        price: 301,
        duration: 20,
        category: 'DAILY_AARTI',
        benefitsEn: ['Day completion', 'Peaceful sleep', 'Divine protection', 'Gratitude blessings'],
        benefitsHi: ['दिन समापन', 'शांतिपूर्ण नींद', 'दिव्य सुरक्षा', 'कृतज्ञता आशीर्वाद'],
        availableSlots: ['20:00', '20:30', '21:00'],
        imageUrl: '/images/final-aarti.jpg',
        isActive: true
      },
    ];

    // Kuber Ji Ki Vishesh Pooja (15 January - Special Pooja)
    const visheshPooja15Jan = [
      {
        nameEn: 'Kuber Ji Ka Mahabhishek Pooja (15 Jan)',
        nameHi: 'कुबेर जी का महाभिषेक पूजा (15 जनवरी)',
        descriptionEn: 'Grand bathing ceremony on 15th January with elaborate Vedic rituals. Special day for invoking immense wealth and prosperity.',
        descriptionHi: '15 जनवरी को विस्तृत वैदिक अनुष्ठानों के साथ भव्य स्नान समारोह। अपार धन और समृद्धि का आह्वान करने के लिए विशेष दिन।',
        price: 2100,
        duration: 90,
        category: 'SPECIAL_POOJA',
        benefitsEn: ['Immense wealth', 'Business growth', 'Debt removal', 'Financial freedom', 'Divine prosperity'],
        benefitsHi: ['अपार धन', 'व्यापार वृद्धि', 'कर्ज मुक्ति', 'वित्तीय स्वतंत्रता', 'दिव्य समृद्धि'],
        availableSlots: ['09:00', '11:00'],
        imageUrl: '/images/mahabhishek.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Ji Ka Havan Pooja (15 Jan)',
        nameHi: 'कुबेर जी का हवन पूजा (15 जनवरी)',
        descriptionEn: 'Sacred fire ceremony on 15th January to invoke Lord Kuber. Perform havan for prosperity and removal of all obstacles.',
        descriptionHi: '15 जनवरी को भगवान कुबेर का आह्वान करने के लिए पवित्र अग्नि समारोह। समृद्धि और सभी बाधाओं को दूर करने के लिए हवन करें।',
        price: 1100,
        duration: 60,
        category: 'SPECIAL_POOJA',
        benefitsEn: ['Obstacle removal', 'Wealth creation', 'Success in ventures', 'Positive energy'],
        benefitsHi: ['बाधा निवारण', 'धन सृजन', 'उद्यमों में सफलता', 'सकारात्मक ऊर्जा'],
        availableSlots: ['10:00', '15:00'],
        imageUrl: '/images/havan.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Ji Ka Vishesh Bhog (15 Jan)',
        nameHi: 'कुबेर जी का विशेष भोग (15 जनवरी)',
        descriptionEn: 'Special food offering to Lord Kuber on 15th January. Grand bhog with elaborate preparations and divine blessings.',
        descriptionHi: '15 जनवरी को भगवान कुबेर को विशेष भोजन अर्पण। विस्तृत तैयारियों और दिव्य आशीर्वाद के साथ भव्य भोग।',
        price: 1100,
        duration: 45,
        category: 'SPECIAL_POOJA',
        benefitsEn: ['Divine blessings', 'Abundance', 'Health & prosperity', 'Family happiness'],
        benefitsHi: ['दिव्य आशीर्वाद', 'प्रचुरता', 'स्वास्थ्य और समृद्धि', 'पारिवारिक खुशी'],
        availableSlots: ['12:00', '13:00'],
        imageUrl: '/images/vishesh-bhog.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Vastr Bhaet (15 Jan)',
        nameHi: 'कुबेर वस्त्र भेंट (15 जनवरी)',
        descriptionEn: 'Sacred cloth offering to Lord Kuber on 15th January. Offer new clothes to receive prosperity and abundance.',
        descriptionHi: '15 जनवरी को भगवान कुबेर को पवित्र वस्त्र अर्पण। समृद्धि और प्रचुरता प्राप्त करने के लिए नए वस्त्र चढ़ाएं।',
        price: 1100,
        duration: 30,
        category: 'SEVA',
        benefitsEn: ['Material prosperity', 'Luxury gains', 'Status elevation', 'Divine favor'],
        benefitsHi: ['भौतिक समृद्धि', 'विलासिता लाभ', 'स्थिति उन्नति', 'दिव्य अनुग्रह'],
        availableSlots: ['09:00', '14:00'],
        imageUrl: '/images/vastr-bhaet.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Havan Bhaet (15 Jan)',
        nameHi: 'कुबेर हवन भेंट (15 जनवरी)',
        descriptionEn: 'Sacred offerings during havan ceremony on 15th January. Contribute to the sacred fire ritual for maximum blessings.',
        descriptionHi: '15 जनवरी को हवन समारोह के दौरान पवित्र भेंट। अधिकतम आशीर्वाद के लिए पवित्र अग्नि अनुष्ठान में योगदान करें।',
        price: 1100,
        duration: 30,
        category: 'SEVA',
        benefitsEn: ['Spiritual merit', 'Karmic cleansing', 'Divine connection', 'Prosperity boost'],
        benefitsHi: ['आध्यात्मिक पुण्य', 'कर्मिक शुद्धि', 'दिव्य संबंध', 'समृद्धि वृद्धि'],
        availableSlots: ['10:00', '15:00'],
        imageUrl: '/images/havan-bhaet.jpg',
        isActive: true
      },
    ];

    // Basant Panchami (Vishesh Pooja)
    const basantPanchamiPooja = [
      {
        nameEn: 'Kuber Ji Ka Mahabhishek Pooja (Basant Panchami)',
        nameHi: 'कुबेर जी का महाभिषेक पूजा (बसंत पंचमी)',
        descriptionEn: 'Grand abhishek on Basant Panchami - the auspicious beginning of spring. Special ceremony for wealth and knowledge blessings.',
        descriptionHi: 'बसंत पंचमी पर भव्य अभिषेक - वसंत की शुभ शुरुआत। धन और ज्ञान के आशीर्वाद के लिए विशेष समारोह।',
        price: 2100,
        duration: 90,
        category: 'GRAND_CEREMONY',
        benefitsEn: ['New beginnings', 'Knowledge & wealth', 'Creative success', 'Spring blessings'],
        benefitsHi: ['नई शुरुआत', 'ज्ञान और धन', 'रचनात्मक सफलता', 'वसंत आशीर्वाद'],
        availableSlots: ['09:00', '11:00'],
        imageUrl: '/images/basant-mahabhishek.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Ji Ka Havan (Basant Panchami)',
        nameHi: 'कुबेर जी का हवन (बसंत पंचमी)',
        descriptionEn: 'Elaborate fire ceremony on Basant Panchami. Invoke Goddess Saraswati and Lord Kuber together for complete prosperity.',
        descriptionHi: 'बसंत पंचमी पर विस्तृत अग्नि समारोह। संपूर्ण समृद्धि के लिए देवी सरस्वती और भगवान कुबेर का एक साथ आह्वान करें।',
        price: 2100,
        duration: 75,
        category: 'GRAND_CEREMONY',
        benefitsEn: ['Knowledge & wealth', 'Educational success', 'Business prosperity', 'Divine grace'],
        benefitsHi: ['ज्ञान और धन', 'शैक्षिक सफलता', 'व्यापार समृद्धि', 'दिव्य कृपा'],
        availableSlots: ['10:00', '15:00'],
        imageUrl: '/images/basant-havan.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Bhandara (Badrinath Opening)',
        nameHi: 'कुबेर भंडारा (बद्रीनाथ द्वार खुलने पर)',
        descriptionEn: 'Grand community feast celebrating the opening of Badrinath temple doors. Participate in this auspicious mass feeding ceremony.',
        descriptionHi: 'बद्रीनाथ मंदिर के द्वार खुलने का जश्न मनाने वाला भव्य सामुदायिक भोज। इस शुभ सामूहिक भोजन समारोह में भाग लें।',
        price: 21000,
        duration: 180,
        category: 'GRAND_CEREMONY',
        benefitsEn: ['Mass blessing', 'Community service', 'Spiritual merit', 'Divine connection', 'Himalayan blessings'],
        benefitsHi: ['सामूहिक आशीर्वाद', 'सामुदायिक सेवा', 'आध्यात्मिक पुण्य', 'दिव्य संबंध', 'हिमालयी आशीर्वाद'],
        availableSlots: ['11:00'],
        imageUrl: '/images/bhandara.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Vastr Bhaet (Basant Panchami)',
        nameHi: 'कुबेर वस्त्र भेंट (बसंत पंचमी)',
        descriptionEn: 'Sacred yellow cloth offering on Basant Panchami. Traditional vastra offering for prosperity and knowledge.',
        descriptionHi: 'बसंत पंचमी पर पवित्र पीले वस्त्र की भेंट। समृद्धि और ज्ञान के लिए पारंपरिक वस्त्र अर्पण।',
        price: 1100,
        duration: 30,
        category: 'SEVA',
        benefitsEn: ['Spring blessings', 'Knowledge gains', 'Material prosperity', 'Wisdom & wealth'],
        benefitsHi: ['वसंत आशीर्वाद', 'ज्ञान लाभ', 'भौतिक समृद्धि', 'बुद्धि और धन'],
        availableSlots: ['09:00', '14:00'],
        imageUrl: '/images/basant-vastr.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Dhwaj Bhaet (Basant Panchami)',
        nameHi: 'कुबेर ध्वज भेंट (बसंत पंचमी)',
        descriptionEn: 'Sacred flag offering to Lord Kuber on Basant Panchami. Hoist a flag in His honor for continuous blessings.',
        descriptionHi: 'बसंत पंचमी पर भगवान कुबेर को पवित्र ध्वज अर्पण। निरंतर आशीर्वाद के लिए उनके सम्मान में ध्वज फहराएं।',
        price: 1100,
        duration: 30,
        category: 'SEVA',
        benefitsEn: ['Victory blessings', 'Success flag', 'Status elevation', 'Divine recognition'],
        benefitsHi: ['विजय आशीर्वाद', 'सफलता ध्वज', 'स्थिति उन्नति', 'दिव्य मान्यता'],
        availableSlots: ['09:00', '14:00'],
        imageUrl: '/images/dhwaj-bhaet.jpg',
        isActive: true
      },
    ];

    // Baisakhi Parv
    const baisakhiPooja = [
      {
        nameEn: 'Kuber Ji Ka Mahabhishek Pooja (Baisakhi)',
        nameHi: 'कुबेर जी का महाभिषेक पूजा (बैसाखी)',
        descriptionEn: 'Grand abhishek ceremony on Baisakhi festival. Celebrate the harvest season with Lord Kuber\'s blessings for abundance.',
        descriptionHi: 'बैसाखी पर्व पर भव्य अभिषेक समारोह। प्रचुरता के लिए भगवान कुबेर के आशीर्वाद के साथ फसल के मौसम का जश्न मनाएं।',
        price: 2100,
        duration: 90,
        category: 'GRAND_CEREMONY',
        benefitsEn: ['Harvest blessings', 'Agricultural prosperity', 'Wealth abundance', 'Family growth'],
        benefitsHi: ['फसल आशीर्वाद', 'कृषि समृद्धि', 'धन प्रचुरता', 'परिवार वृद्धि'],
        availableSlots: ['09:00', '11:00'],
        imageUrl: '/images/baisakhi-mahabhishek.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Basant Bhaet (Baisakhi)',
        nameHi: 'कुबेर बसंत भेंट (बैसाखी)',
        descriptionEn: 'Spring offering to Lord Kuber during Baisakhi. Offer fresh harvest and spring flowers for prosperity.',
        descriptionHi: 'बैसाखी के दौरान भगवान कुबेर को वसंत भेंट। समृद्धि के लिए ताजी फसल और वसंत के फूल चढ़ाएं।',
        price: 1100,
        duration: 30,
        category: 'SEVA',
        benefitsEn: ['Harvest success', 'New ventures', 'Growth & prosperity', 'Seasonal blessings'],
        benefitsHi: ['फसल सफलता', 'नए उद्यम', 'वृद्धि और समृद्धि', 'मौसमी आशीर्वाद'],
        availableSlots: ['09:00', '14:00'],
        imageUrl: '/images/basant-bhaet.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Dhwaj Bhaet (Baisakhi)',
        nameHi: 'कुबेर ध्वज भेंट (बैसाखी)',
        descriptionEn: 'Sacred flag hoisting on Baisakhi. Mark the harvest festival by offering a victory flag to Lord Kuber.',
        descriptionHi: 'बैसाखी पर पवित्र ध्वज फहराना। भगवान कुबेर को विजय ध्वज चढ़ाकर फसल उत्सव मनाएं।',
        price: 1100,
        duration: 30,
        category: 'SEVA',
        benefitsEn: ['Festival blessings', 'Victory in endeavors', 'Community prosperity', 'Divine favor'],
        benefitsHi: ['त्योहार आशीर्वाद', 'प्रयासों में विजय', 'सामुदायिक समृद्धि', 'दिव्य अनुग्रह'],
        availableSlots: ['09:00', '14:00'],
        imageUrl: '/images/baisakhi-dhwaj.jpg',
        isActive: true
      },
    ];

    // Combine all services
    const allServices = [
      ...dailyServices,
      ...visheshPooja15Jan,
      ...basantPanchamiPooja,
      ...baisakhiPooja,
    ];

    // Create services
    console.log('📝 Creating Kuber Ji services...');
    for (const service of allServices) {
      await prisma.service.create({ data: service });
      console.log(`✅ Created: ${service.nameEn}`);
    }

    console.log('\n✨ Services Summary:');
    console.log(`  📿 Daily Aarti: ${dailyServices.length} services`);
    console.log(`  🙏 Special Pooja (15 Jan): ${visheshPooja15Jan.length} services`);
    console.log(`  🎊 Basant Panchami: ${basantPanchamiPooja.length} services`);
    console.log(`  🌾 Baisakhi: ${baisakhiPooja.length} services`);
    console.log(`  📊 Total: ${allServices.length} services`);

    // Now seed Kuber Prasadam products
    console.log('\n🛍️  Seeding Kuber Prasadam (Shop Products)...');
    
    // Check if Product model exists, if not skip
    try {
      // Clear existing products
      await prisma.product.deleteMany({});
      console.log('✅ Existing products cleared');

      const products = [
        {
          nameEn: 'Kuber Sikka',
          nameHi: 'कुबेर सिक्का',
          descriptionEn: 'Sacred Kuber coin blessed by temple priests. Keep in your wallet or cash box for continuous wealth flow and prosperity.',
          descriptionHi: 'मंदिर के पुजारियों द्वारा आशीर्वादित पवित्र कुबेर सिक्का। निरंतर धन प्रवाह और समृद्धि के लिए अपने बटुए या तिजोरी में रखें।',
          price: 101,
          category: 'PRASADAM',
          imageUrl: '/products/kuber-sikka.jpg',
          stock: 500,
          isActive: true,
        },
        {
          nameEn: 'Kuber Potli',
          nameHi: 'कुबेर पोटली',
          descriptionEn: 'Sacred cloth pouch containing blessed items from Lord Kuber\'s temple. Powerful for attracting wealth and removing financial obstacles.',
          descriptionHi: 'भगवान कुबेर के मंदिर से आशीर्वादित वस्तुओं वाली पवित्र कपड़े की थैली। धन आकर्षित करने और वित्तीय बाधाओं को दूर करने के लिए शक्तिशाली।',
          price: 1100,
          category: 'PRASADAM',
          imageUrl: '/products/kuber-potli.jpg',
          stock: 200,
          isActive: true,
        },
        {
          nameEn: 'Kuber Photo Frame',
          nameHi: 'कुबेर फोटो फ्रेम',
          descriptionEn: 'Beautiful framed photo of Lord Kuber from Pandukeshwar temple. Perfect for your home or office altar to invite prosperity.',
          descriptionHi: 'पांडुकेश्वर मंदिर से भगवान कुबेर की सुंदर फ़्रेम की गई तस्वीर। समृद्धि के लिए अपने घर या कार्यालय की वेदी के लिए एकदम सही।',
          price: 500,
          category: 'PRASADAM',
          imageUrl: '/products/kuber-photo-frame.jpg',
          stock: 100,
          isActive: true,
        },
        {
          nameEn: 'Kuber Photo Soft Copy',
          nameHi: 'कुबेर फोटो सॉफ्ट कॉपी',
          descriptionEn: 'High-resolution digital photo of Lord Kuber. Download and use as wallpaper or print for your worship space.',
          descriptionHi: 'भगवान कुबेर की उच्च-रिज़ॉल्यूशन डिजिटल तस्वीर। डाउनलोड करें और वॉलपेपर के रूप में उपयोग करें या अपने पूजा स्थान के लिए प्रिंट करें।',
          price: 101,
          category: 'PRASADAM',
          imageUrl: '/products/kuber-photo-digital.jpg',
          stock: 9999, // Unlimited for digital
          isActive: true,
        },
      ];

      for (const product of products) {
        await prisma.product.create({ data: product });
        console.log(`✅ Created: ${product.nameEn} - ₹${product.price}`);
      }

      console.log(`\n✅ Successfully created ${products.length} Kuber Prasadam products!`);
    } catch (error) {
      console.log('⚠️  Product model not found, skipping product seeding');
      console.log('   (Products can be added later when shop is implemented)');
    }

    console.log('\n🎉 All Kuber Ji temple data seeded successfully!');
    
  } catch (error) {
    console.error('❌ Seed error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedKuberServices()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
