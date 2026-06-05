import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';
import { hashPassword } from '../../lib/auth';

export async function GET(request) {
  try {
    console.log('Seeding database via API...');

    // 1. Create Admin
    const adminUsername = 'admin';
    const adminPassword = 'adminpassword123';
    const passwordHash = hashPassword(adminPassword);

    const existingAdmin = await prisma.admin.findUnique({
      where: { username: adminUsername },
    });

    let adminCreated = false;
    if (!existingAdmin) {
      await prisma.admin.create({
        data: {
          username: adminUsername,
          passwordHash: passwordHash,
        },
      });
      adminCreated = true;
      console.log(`Admin user created: username: ${adminUsername}, password: ${adminPassword}`);
    }

    // 2. Sample Products
    const sampleProducts = [
      {
        name: 'EverGrow Nitro-Mag',
        category: 'Secondary Nutrients',
        description: 'A premium secondary nutrient blend of nitrogen and magnesium, designed to boost chlorophyll synthesis and vegetative growth in all major crops.',
        packaging: '1 Kg, 5 Kg, 25 Kg bags',
        usage: 'Foliar spray: 2-3 g/L of water. Soil application: 5-10 Kg/Acre.',
      },
      {
        name: 'EverGrow Calcium Boron Premium',
        category: 'Secondary Nutrients',
        description: 'Optimized calcium and boron formulation that prevents blossom end rot, improves fruit set, and strengthens cell walls for better shelf life.',
        packaging: '500 g, 1 Kg bags',
        usage: '2 g/L of water during pre-flowering and fruit development stages.',
      },
      {
        name: 'EverGrow 19-19-19 Soluble',
        category: 'Water Soluble Fertilizers',
        description: 'Fully water-soluble balanced NPK fertilizer (19:19:19) for rapid vegetative growth and balanced crop nutrition. Ideal for drip irrigation.',
        packaging: '1 Kg, 25 Kg bags',
        usage: 'Drip irrigation: 3-5 Kg/Acre. Foliar: 5-10 g/L of water.',
      },
      {
        name: 'EverGrow 00-52-34 (MKP)',
        category: 'Water Soluble Fertilizers',
        description: 'Mono Potassium Phosphate fertilizer, rich in Phosphorus and Potassium. Promotes root development, flowering, and fruit size.',
        packaging: '1 Kg, 25 Kg bags',
        usage: 'Drip irrigation: 3-5 Kg/Acre. Apply during root development and flowering.',
      },
      {
        name: 'EverGrow Liquid Zinc-Booster',
        category: 'Liquid Fertilizers',
        description: 'Concentrated liquid zinc solution to overcome zinc deficiency, leading to better hormone production and leaf expansion.',
        packaging: '250 mL, 500 mL, 1 L bottles',
        usage: 'Foliar application: 1.5-2 mL/L of water during vegetative growth.',
      },
      {
        name: 'EverGrow Liquid NPK Gold',
        category: 'Liquid Fertilizers',
        description: 'Liquid formulation containing NPK along with trace elements, easily absorbed by crops through foliar application.',
        packaging: '500 mL, 1 L, 5 L bottles',
        usage: '3-4 mL/L of water as foliar spray.',
      },
      {
        name: 'EverGrow Bio-Stimulant Max',
        category: 'Bio-Stimulants',
        description: 'Natural seaweed extract enriched with amino acids and humic acids. Relieves environmental stress and increases crop yield and quality.',
        packaging: '250 mL, 500 mL, 1 L bottles',
        usage: '1-2 mL/L of water. Apply at flowering and fruit setting stages.',
      },
      {
        name: 'EverGrow Humic Gold Granules',
        category: 'Bio-Stimulants',
        description: 'High-grade humic acid granules designed to improve soil structure, increase nutrient holding capacity, and stimulate root growth.',
        packaging: '5 Kg, 10 Kg bags',
        usage: 'Soil application: 5-8 Kg/Acre during sowing or transplantation.',
      }
    ];

    let productsAddedCount = 0;
    for (const prod of sampleProducts) {
      const existing = await prisma.product.findFirst({
        where: { name: prod.name },
      });
      if (!existing) {
        await prisma.product.create({
          data: prod,
        });
        productsAddedCount++;
      }
    }

    // 3. Sample Gallery Items
    const sampleGallery = [
      { title: 'Quality Assurance Testing', url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800', type: 'image' },
      { title: 'State of the art Processing Unit', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800', type: 'image' },
      { title: 'Tomato Field Result', url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=800', type: 'image' },
      { title: 'Fertilizer Packaging Unit', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800', type: 'image' },
    ];

    let galleryAddedCount = 0;
    for (const item of sampleGallery) {
      const existing = await prisma.galleryItem.findFirst({
        where: { title: item.title },
      });
      if (!existing) {
        await prisma.galleryItem.create({
          data: item,
        });
        galleryAddedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        adminCreated,
        productsAddedCount,
        galleryAddedCount
      }
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
