import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { isAdminAuthenticated } from '../../../lib/auth';

export async function DELETE(request, { params }) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const inquiryId = parseInt(id, 10);
    if (isNaN(inquiryId)) {
      return NextResponse.json({ success: false, error: 'Invalid inquiry ID' }, { status: 400 });
    }

    const existingInquiry = await prisma.inquiry.findUnique({
      where: { id: inquiryId },
    });

    if (!existingInquiry) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }

    await prisma.inquiry.delete({
      where: { id: inquiryId },
    });

    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
