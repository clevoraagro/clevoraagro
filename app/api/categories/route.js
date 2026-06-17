import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';
import { isAdminAuthenticated } from '../../lib/auth';

export const revalidate = 60; // ISR Caching

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    // Seed default categories if the table is completely empty
    if (categories.length === 0) {
      const defaultCats = ['Secondary Nutrients', 'Water Soluble Fertilizers', 'Liquid Fertilizers', 'Bio-Stimulants'];
      for (const name of defaultCats) {
        await prisma.category.upsert({
          where: { name },
          update: {},
          create: { name }
        });
      }
      const newCats = await prisma.category.findMany({ orderBy: { createdAt: 'desc' } });
      return NextResponse.json({ success: true, data: newCats.map(c => c.name), raw: newCats });
    }

    return NextResponse.json({ success: true, data: categories.map(c => c.name), raw: categories });
  } catch (error) {
    console.error('Fetch categories error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name } = body;
    if (!name) return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });

    const newCategory = await prisma.category.create({ data: { name } });
    return NextResponse.json({ success: true, data: newCategory });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
