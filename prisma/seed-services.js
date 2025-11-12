const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedServices() {
  console.log('🌱 Seeding temple services...');

  try {
    const services = [
      {
        nameEn: 'Morning Aarti',
        nameHi: 'प्रातः आरती',
        descriptionEn: 'Begin your day with divine blessings through our sacred morning aarti ceremony. Experience the peaceful ambiance as the first rays of sun illuminate Lord Kuber\'s divine presence.',
        descriptionHi: 'हमारी पवित्र प्रातः आरती के माध्यम से अपने दिन की शुरुआत दिव्य आशीर्वाद के साथ करें। जब सूरज की पहली किरणें भगवान कुबेर की दिव्य उपस्थिति को रोशन करती हैं तो शांतिपूर्ण वातावरण का अनुभव करें।',
        price: 501,
        duration: 30,
        category: 'DAILY_AARTI',
        benefitsEn: ['Positive start to the day', 'Mental peace and clarity', 'Spiritual awakening', 'Divine blessings'],
        benefitsHi: ['दिन की सकारात्मक शुरुआत', 'मानसिक शांति और स्पष्टता', 'आध्यात्मिक जागृति', 'दिव्य आशीर्वाद'],
        availableSlots: ['06:00', '07:00', '08:00'],
        imageUrl: '/images/morning-aarti.jpg',
        isActive: true
      },
      {
        nameEn: 'Evening Aarti',
        nameHi: 'संध्या आरती',
        descriptionEn: 'Witness the mesmerizing evening aarti ceremony as the temple lights illuminate the sanctum. Join us in offering prayers and seeking Lord Kuber\'s blessings for prosperity.',
        descriptionHi: 'मंत्रमुग्ध करने वाली संध्या आरती समारोह को देखें जब मंदिर की रोशनी गर्भगृह को रोशन करती है। समृद्धि के लिए भगवान कुबेर का आशीर्वाद मांगने के लिए हमारे साथ प्रार्थना में शामिल हों।',
        price: 501,
        duration: 45,
        category: 'DAILY_AARTI',
        benefitsEn: ['Peace of mind', 'Positive energy', 'Removes obstacles', 'Wealth attraction'],
        benefitsHi: ['मन की शांति', 'सकारात्मक ऊर्जा', 'बाधाओं को दूर करता है', 'धन आकर्षण'],
        availableSlots: ['18:00', '19:00'],
        imageUrl: '/images/evening-aarti.jpg',
        isActive: true
      },
      {
        nameEn: 'Abhishekam',
        nameHi: 'अभिषेकम्',
        descriptionEn: 'Sacred bathing ritual of Lord Kuber with milk, honey, ghee, and holy water. This ancient Vedic ceremony brings immense prosperity and removes financial obstacles from your life.',
        descriptionHi: 'भगवान कुबेर का दूध, शहद, घी और पवित्र जल से पवित्र स्नान अनुष्ठान। यह प्राचीन वैदिक समारोह अपार समृद्धि लाता है और आपके जीवन से वित्तीय बाधाओं को दूर करता है।',
        price: 1001,
        duration: 60,
        category: 'SPECIAL_POOJA',
        benefitsEn: ['Attracts wealth', 'Removes debt', 'Business success', 'Financial stability', 'Divine blessings'],
        benefitsHi: ['धन आकर्षित करता है', 'कर्ज दूर करता है', 'व्यापार में सफलता', 'वित्तीय स्थिरता', 'दिव्य आशीर्वाद'],
        availableSlots: ['09:00', '11:00', '15:00'],
        imageUrl: '/images/abhishekam.jpg',
        isActive: true
      },
      {
        nameEn: 'Lakshmi Kuber Pooja',
        nameHi: 'लक्ष्मी कुबेर पूजा',
        descriptionEn: 'Combined worship of Goddess Lakshmi and Lord Kuber for ultimate prosperity. This powerful ceremony invokes the blessings of both the deities of wealth and abundance.',
        descriptionHi: 'परम समृद्धि के लिए देवी लक्ष्मी और भगवान कुबेर की संयुक्त पूजा। यह शक्तिशाली समारोह धन और प्रचुरता के दोनों देवताओं का आशीर्वाद प्राप्त करता है।',
        price: 2501,
        duration: 90,
        category: 'SPECIAL_POOJA',
        benefitsEn: ['Complete prosperity', 'Wealth multiplication', 'Success in all endeavors', 'Family harmony', 'Continuous cash flow'],
        benefitsHi: ['पूर्ण समृद्धि', 'धन वृद्धि', 'सभी प्रयासों में सफलता', 'पारिवारिक सद्भाव', 'निरंतर नकदी प्रवाह'],
        availableSlots: ['10:00', '14:00'],
        imageUrl: '/images/lakshmi-kuber.jpg',
        isActive: true
      },
      {
        nameEn: 'Kuber Yantra Puja',
        nameHi: 'कुबेर यंत्र पूजा',
        descriptionEn: 'Sacred energization of Kuber Yantra with Vedic mantras. This powerful yantra attracts wealth, prosperity, and success when installed with proper rituals in your home or business.',
        descriptionHi: 'वैदिक मंत्रों के साथ कुबेर यंत्र का पवित्र ऊर्जीकरण। यह शक्तिशाली यंत्र आपके घर या व्यवसाय में उचित अनुष्ठानों के साथ स्थापित होने पर धन, समृद्धि और सफलता को आकर्षित करता है।',
        price: 1501,
        duration: 75,
        category: 'SPECIAL_POOJA',
        benefitsEn: ['Wealth attraction', 'Business growth', 'Debt removal', 'Financial security', 'Continuous prosperity'],
        benefitsHi: ['धन आकर्षण', 'व्यापार वृद्धि', 'कर्ज निवारण', 'वित्तीय सुरक्षा', 'निरंतर समृद्धि'],
        availableSlots: ['11:00', '16:00'],
        imageUrl: '/images/yantra-puja.jpg',
        isActive: true
      },
      {
        nameEn: 'Dhanteras Special Ceremony',
        nameHi: 'धनतेरस विशेष समारोह',
        descriptionEn: 'Grand ceremony performed on Dhanteras, the most auspicious day to worship Lord Kuber. Includes special rituals, abhishekam, and distribution of blessed prasadam.',
        descriptionHi: 'धनतेरस पर आयोजित भव्य समारोह, भगवान कुबेर की पूजा का सबसे शुभ दिन। विशेष अनुष्ठान, अभिषेक और धन्य प्रसाद का वितरण शामिल है।',
        price: 5001,
        duration: 120,
        category: 'GRAND_CEREMONY',
        benefitsEn: ['Maximum prosperity', 'New beginnings', 'Business success', 'Wealth accumulation', 'Divine grace'],
        benefitsHi: ['अधिकतम समृद्धि', 'नई शुरुआत', 'व्यापार सफलता', 'धन संचय', 'दिव्य कृपा'],
        availableSlots: ['10:00'],
        imageUrl: '/images/dhanteras.jpg',
        isActive: true
      },
      {
        nameEn: 'Annadaan Seva',
        nameHi: 'अन्नदान सेवा',
        descriptionEn: 'Serve food to devotees and needy people in the name of Lord Kuber. This noble seva brings immense merit and prosperity. Feed 50, 100, or more people.',
        descriptionHi: 'भगवान कुबेर के नाम पर भक्तों और जरूरतमंद लोगों को भोजन परोसें। यह महान सेवा अपार पुण्य और समृद्धि लाती है। 50, 100 या अधिक लोगों को खिलाएं।',
        price: 2501,
        duration: 180,
        category: 'SEVA',
        benefitsEn: ['Good karma', 'Prosperity', 'Happiness', 'Blessings of the needy', 'Spiritual growth'],
        benefitsHi: ['अच्छा कर्म', 'समृद्धि', 'खुशी', 'जरूरतमंदों का आशीर्वाद', 'आध्यात्मिक विकास'],
        availableSlots: ['12:00', '13:00'],
        imageUrl: '/images/annadaan.jpg',
        isActive: true
      },
      {
        nameEn: 'Temple Decoration Seva',
        nameHi: 'मंदिर सजावट सेवा',
        descriptionEn: 'Sponsor the decoration of the temple with flowers, lights, and sacred items. Your contribution beautifies the divine abode and brings Lord Kuber\'s special blessings.',
        descriptionHi: 'फूलों, रोशनी और पवित्र वस्तुओं से मंदिर की सजावट को प्रायोजित करें। आपका योगदान दिव्य निवास को सुशोभित करता है और भगवान कुबेर का विशेष आशीर्वाद लाता है।',
        price: 1501,
        duration: 60,
        category: 'SEVA',
        benefitsEn: ['Aesthetic pleasure', 'Divine blessings', 'Good fortune', 'Spiritual merit', 'Prosperity'],
        benefitsHi: ['सौंदर्य आनंद', 'दिव्य आशीर्वाद', 'सौभाग्य', 'आध्यात्मिक पुण्य', 'समृद्धि'],
        availableSlots: ['08:00', '09:00', '10:00'],
        imageUrl: '/images/decoration.jpg',
        isActive: true
      }
    ];

    console.log('📝 Creating services...');
    let created = 0;
    
    for (const service of services) {
      await prisma.service.create({ data: service });
      created++;
      console.log(`✅ Created: ${service.nameEn}`);
    }

    console.log(`\n✅ Successfully created ${created} services!`);
    console.log('\nServices by category:');
    const categories = await prisma.service.groupBy({
      by: ['category'],
      _count: true
    });
    categories.forEach(cat => {
      console.log(`  ${cat.category}: ${cat._count} services`);
    });

  } catch (error) {
    console.error('❌ Error seeding services:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedServices()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
