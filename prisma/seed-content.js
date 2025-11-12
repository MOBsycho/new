const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedContent() {
  console.log('🌱 Seeding sample content...');

  try {
    // Sample Service Cards
    const serviceCards = [
      {
        type: 'SERVICE_CARD',
        titleEn: 'Morning Aarti',
        titleHi: 'प्रातः आरती',
        descriptionEn: 'Begin your day with divine blessings through our morning aarti ceremony.',
        descriptionHi: 'हमारी प्रातः आरती के माध्यम से अपने दिन की शुरुआत दिव्य आशीर्वाद के साथ करें।',
        imageUrl: '/images/morning-aarti.jpg',
        price: 501,
        category: 'Daily Rituals',
        isActive: true,
        order: 1
      },
      {
        type: 'SERVICE_CARD',
        titleEn: 'Abhishekam',
        titleHi: 'अभिषेकम्',
        descriptionEn: 'Sacred bathing ritual of Lord Kuber with milk, honey, and holy water.',
        descriptionHi: 'भगवान कुबेर का दूध, शहद और पवित्र जल से पवित्र स्नान अनुष्ठान।',
        imageUrl: '/images/abhishekam.jpg',
        price: 1001,
        category: 'Special Pooja',
        isActive: true,
        order: 2
      }
    ];

    // Sample Donation Projects
    const donationProjects = [
      {
        type: 'DONATION_PROJECT',
        titleEn: 'Temple Maintenance',
        titleHi: 'मंदिर रखरखाव',
        descriptionEn: 'Support the beautification and maintenance of our sacred temple premises.',
        descriptionHi: 'हमारे पवित्र मंदिर परिसर के सौंदर्यीकरण और रखरखाव में सहायता करें।',
        imageUrl: '/images/temple/temple-top-2.jpeg',
        isActive: true,
        order: 1
      },
      {
        type: 'DONATION_PROJECT',
        titleEn: 'Religious Ceremonies',
        titleHi: 'धार्मिक समारोह',
        descriptionEn: 'Help us conduct regular pujas and special celebrations throughout the year.',
        descriptionHi: 'वर्ष भर नियमित पूजा और विशेष समारोह आयोजित करने में हमारी सहायता करें।',
        imageUrl: '/images/milkbath2.jpeg',
        isActive: true,
        order: 2
      },
      {
        type: 'DONATION_PROJECT',
        titleEn: 'Community Services',
        titleHi: 'सामुदायिक सेवाएं',
        descriptionEn: 'Support our food distribution and educational programs for the community.',
        descriptionHi: 'समुदाय के लिए हमारे भोजन वितरण और शैक्षिक कार्यक्रमों का समर्थन करें।',
        imageUrl: '/images/carryin2.jpeg',
        isActive: true,
        order: 3
      }
    ];

    // Sample Shop Products
    const shopProducts = [
      {
        type: 'SHOP_PRODUCT',
        titleEn: 'Kuber Yantra',
        titleHi: 'कुबेर यंत्र',
        descriptionEn: 'Sacred Kuber Yantra blessed at the temple for wealth and prosperity.',
        descriptionHi: 'धन और समृद्धि के लिए मंदिर में आशीर्वादित पवित्र कुबेर यंत्र।',
        imageUrl: '/images/yantra.jpg',
        price: 501,
        category: 'Spiritual Items',
        isActive: true,
        order: 1,
        metadata: {
          inStock: true,
          benefits: ['Attracts wealth', 'Removes financial obstacles', 'Brings prosperity']
        }
      },
      {
        type: 'SHOP_PRODUCT',
        titleEn: 'Rudraksha Mala',
        titleHi: 'रुद्राक्ष माला',
        descriptionEn: '108 beads blessed Rudraksha mala for meditation and spiritual growth.',
        descriptionHi: 'ध्यान और आध्यात्मिक विकास के लिए 108 मनकों वाली आशीर्वादित रुद्राक्ष माला।',
        imageUrl: '/images/rudraksha.jpg',
        price: 2501,
        category: 'Spiritual Items',
        isActive: true,
        order: 2,
        metadata: {
          inStock: true,
          benefits: ['Peace of mind', 'Spiritual awakening', 'Protection']
        }
      },
      {
        type: 'SHOP_PRODUCT',
        titleEn: 'Temple Prasadam',
        titleHi: 'मंदिर प्रसादम्',
        descriptionEn: 'Sacred prasadam blessed by Lord Kuber, prepared with devotion.',
        descriptionHi: 'भगवान कुबेर द्वारा आशीर्वादित पवित्र प्रसाद, भक्ति के साथ तैयार किया गया।',
        imageUrl: '/images/prasad.jpg',
        price: 251,
        category: 'Prasadam',
        isActive: true,
        order: 3,
        metadata: {
          inStock: true,
          benefits: ['Divine blessings', 'Spiritual energy', 'Good fortune']
        }
      }
    ];

    // Insert all content
    console.log('📝 Creating service cards...');
    for (const card of serviceCards) {
      await prisma.content.create({ data: card });
    }

    console.log('💝 Creating donation projects...');
    for (const project of donationProjects) {
      await prisma.content.create({ data: project });
    }

    console.log('🛍️ Creating shop products...');
    for (const product of shopProducts) {
      await prisma.content.create({ data: product });
    }

    console.log('✅ Sample content created successfully!');
    console.log(`
    Created:
    - ${serviceCards.length} Service Cards
    - ${donationProjects.length} Donation Projects
    - ${shopProducts.length} Shop Products
    
    Total: ${serviceCards.length + donationProjects.length + shopProducts.length} content items
    `);

  } catch (error) {
    console.error('❌ Error seeding content:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedContent()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
