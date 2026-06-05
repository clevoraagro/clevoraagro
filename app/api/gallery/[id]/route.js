import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { isAdminAuthenticated } from '../../../lib/auth';

export async function DELETE(request, { params }) {
  try {
    // 1. Verify admin session
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse and validate ID parameter
    const { id } = await params;
    const itemId = parseInt(id);

    if (isNaN(itemId)) {
      return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });
    }

    // 3. Delete from SQLite database
    await prisma.galleryItem.delete({
      where: { id: itemId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
