import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';
import { isAdminAuthenticated } from '../../lib/auth';

export async function GET(request) {
  try {
    const galleryItems = await prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: galleryItems });
  } catch (error) {
    console.error('Fetch gallery items error:', error);
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
    const { title, url, type } = body;

    if (!title || !url) {
      return NextResponse.json({ success: false, error: 'Title and URL are required' }, { status: 400 });
    }

    const newItem = await prisma.galleryItem.create({
      data: {
        title,
        url,
        type: type || 'image',
      },
    });

    return NextResponse.json({ success: true, data: newItem });
  } catch (error) {
    console.error('Create gallery item error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
