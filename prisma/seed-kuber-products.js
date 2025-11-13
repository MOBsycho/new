const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedKuberProducts() {
  console.log('🛍️  Seeding Kuber Prasadam (Shop Products)...');

  try {
    // Clear existing shop products
    console.log('🗑️  Clearing existing shop products...');
    await prisma.content.deleteMany({
      where: { type: 'SHOP_PRODUCT' }
    });
    console.log('✅ Existing products cleared');

    const products = [
      {
        type: 'SHOP_PRODUCT',
        titleEn: 'Kuber Sikka',
        titleHi: 'कुबेर सिक्का',
        descriptionEn: 'Sacred Kuber coin blessed by temple priests. Keep in your wallet or cash box for continuous wealth flow and prosperity. This divine coin attracts money and removes financial obstacles from your life.',
        descriptionHi: 'मंदिर के पुजारियों द्वारा आशीर्वादित पवित्र कुबेर सिक्का। निरंतर धन प्रवाह और समृद्धि के लिए अपने बटुए या तिजोरी में रखें। यह दिव्य सिक्का धन को आकर्षित करता है और आपके जीवन से वित्तीय बाधाओं को दूर करता है।',
        imageUrl: '/products/kuber-sikka.jpg',
        price: 101,
        category: 'PRASADAM',
        isActive: true,
        order: 1,
        metadata: {
          stock: 500,
          sku: 'KP-SIKKA-001',
          weight: '10g',
          material: 'Brass',
          benefits: [
            'Attracts wealth',
            'Removes financial obstacles',
            'Brings prosperity',
            'Enhances money flow'
          ]
        }
      },
      {
        type: 'SHOP_PRODUCT',
        titleEn: 'Kuber Potli',
        titleHi: 'कुबेर पोटली',
        descriptionEn: 'Sacred cloth pouch containing blessed items from Lord Kuber\'s temple. This powerful potli contains energized herbs, coins, and sacred ash for attracting wealth and removing financial obstacles. Place in your home or business.',
        descriptionHi: 'भगवान कुबेर के मंदिर से आशीर्वादित वस्तुओं वाली पवित्र कपड़े की थैली। इस शक्तिशाली पोटली में ऊर्जावान जड़ी-बूटियाँ, सिक्के और पवित्र राख हैं जो धन आकर्षित करने और वित्तीय बाधाओं को दूर करने के लिए है। अपने घर या व्यवसाय में रखें।',
        imageUrl: '/products/kuber-potli.jpg',
        price: 1100,
        category: 'PRASADAM',
        isActive: true,
        order: 2,
        metadata: {
          stock: 200,
          sku: 'KP-POTLI-001',
          contents: [
            'Sacred coins',
            'Energized herbs',
            'Temple ash',
            'Yantra',
            'Mantra scroll'
          ],
          benefits: [
            'Powerful wealth attraction',
            'Business prosperity',
            'Debt removal',
            'Financial stability'
          ]
        }
      },
      {
        type: 'SHOP_PRODUCT',
        titleEn: 'Kuber Photo Frame',
        titleHi: 'कुबेर फोटो फ्रेम',
        descriptionEn: 'Beautiful framed photo of Lord Kuber from the historic Pandukeshwar temple. This high-quality frame with divine imagery is perfect for your home or office altar to invite prosperity and wealth. Size: 8x10 inches with elegant wooden frame.',
        descriptionHi: 'ऐतिहासिक पांडुकेश्वर मंदिर से भगवान कुबेर की सुंदर फ़्रेम की गई तस्वीर। दिव्य चित्रण के साथ यह उच्च गुणवत्ता वाला फ्रेम समृद्धि और धन को आमंत्रित करने के लिए आपके घर या कार्यालय की वेदी के लिए एकदम सही है। आकार: 8x10 इंच सुरुचिपूर्ण लकड़ी के फ्रेम के साथ।',
        imageUrl: '/products/kuber-photo-frame.jpg',
        price: 500,
        category: 'PRASADAM',
        isActive: true,
        order: 3,
        metadata: {
          stock: 100,
          sku: 'KP-FRAME-001',
          dimensions: '8x10 inches',
          material: 'Wooden frame with glass',
          benefits: [
            'Divine presence at home',
            'Positive energy',
            'Wealth attraction',
            'Spiritual ambiance'
          ]
        }
      },
      {
        type: 'SHOP_PRODUCT',
        titleEn: 'Kuber Photo Soft Copy',
        titleHi: 'कुबेर फोटो सॉफ्ट कॉपी',
        descriptionEn: 'High-resolution digital photo of Lord Kuber from Pandukeshwar temple. Download instantly and use as wallpaper, print, or share. Perfect for digital worship and creating your sacred space anywhere. Format: JPG, Resolution: 4K (3840x2160).',
        descriptionHi: 'पांडुकेश्वर मंदिर से भगवान कुबेर की उच्च-रिज़ॉल्यूशन डिजिटल तस्वीर। तुरंत डाउनलोड करें और वॉलपेपर, प्रिंट या साझा करने के रूप में उपयोग करें। डिजिटल पूजा और कहीं भी अपना पवित्र स्थान बनाने के लिए एकदम सही। प्रारूप: JPG, रिज़ॉल्यूशन: 4K (3840x2160)।',
        imageUrl: '/products/kuber-photo-digital.jpg',
        price: 101,
        category: 'PRASADAM',
        isActive: true,
        order: 4,
        metadata: {
          stock: 9999, // Unlimited digital
          sku: 'KP-DIGITAL-001',
          format: 'JPG',
          resolution: '4K (3840x2160)',
          type: 'Digital Download',
          benefits: [
            'Instant download',
            'Multiple uses',
            'Print anywhere',
            'Digital worship'
          ]
        }
      },
    ];

    console.log('📦 Creating Kuber Prasadam products...');
    for (const product of products) {
      await prisma.content.create({ data: product });
      console.log(`✅ Created: ${product.titleEn} - ₹${product.price}`);
    }

    console.log(`\n✅ Successfully created ${products.length} Kuber Prasadam products!`);
    console.log('\n🛍️  Products Summary:');
    products.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.titleEn} → ₹${p.price}`);
    });

  } catch (error) {
    console.error('❌ Seed error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedKuberProducts()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
