import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { isAdminAuthenticated } from '../../../lib/auth';

export async function DELETE(request, props) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const params = await props.params;
    const id = parseInt(params.id);
    
    await prisma.category.delete({ where: { id } });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, props) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const params = await props.params;
    const id = parseInt(params.id);
    
    const body = await request.json();
    const { name } = body;
    if (!name) return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name }
    });
    
    return NextResponse.json({ success: true, data: updatedCategory });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
