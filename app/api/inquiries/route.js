import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';
import { isAdminAuthenticated } from '../../lib/auth';
import { applyRateLimit } from '../../lib/rateLimit';

import { inquirySchema } from '../../lib/validations';

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
    // Phase 2: Rate Limiting (Max 3 messages per 60 minutes per IP) to prevent spam
    const rateLimit = applyRateLimit(request, 3, 60 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json({ success: false, error: 'You have sent too many messages. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    
    // Phase 3: Zod Input Validation & Sanitization
    const validation = inquirySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ 
        success: false, 
        error: validation.error.errors[0].message 
      }, { status: 400 });
    }

    const { name, email, phone, subject, message } = validation.data;

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
