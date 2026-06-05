import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { isAdminAuthenticated } from '../../../lib/auth';

export async function PUT(request, { params }) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: 'Invalid product ID' }, { status: 400 });
    }

    const body = await request.json();
    const { name, category, description, image, packaging, usage } = body;

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: name !== undefined ? name : existingProduct.name,
        category: category !== undefined ? category : existingProduct.category,
        description: description !== undefined ? description : existingProduct.description,
        image: image !== undefined ? image : existingProduct.image,
        packaging: packaging !== undefined ? packaging : existingProduct.packaging,
        usage: usage !== undefined ? usage : existingProduct.usage,
      },
    });

    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: 'Invalid product ID' }, { status: 400 });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
