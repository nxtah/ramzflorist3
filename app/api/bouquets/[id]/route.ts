import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const isAuth = verifyAuth(req);
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await req.json();

    const updated = await prisma.bouquet.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        images: body.images,
        stock: Number(body.stock),
        isFeatured: Boolean(body.isFeatured),
        category: body.category
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update bouquet", error);
    return NextResponse.json({ error: 'Failed to update bouquet' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const isAuth = verifyAuth(req);
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    
    await prisma.bouquet.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete bouquet", error);
    return NextResponse.json({ error: 'Failed to delete bouquet' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
