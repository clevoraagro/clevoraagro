import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';
import { isAdminAuthenticated } from '../../lib/auth';

export async function GET(request) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    console.error('Fetch inquiries error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    const newInquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    });

    return NextResponse.json({ success: true, data: newInquiry });
  } catch (error) {
    console.error('Submit inquiry error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
