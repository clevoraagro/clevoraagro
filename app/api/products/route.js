import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';
import { isAdminAuthenticated } from '../../lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where = {};
    if (category && category !== 'All') {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Fetch products error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, category, description, image, packaging, usage } = body;

    if (!name || !category) {
      return NextResponse.json({ success: false, error: 'Name and category are required' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        category,
        description,
        image: image || null,
        packaging: packaging || null,
        usage: usage || null,
      },
    });

    return NextResponse.json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
