import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(categories.map(c => c.name));
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuth = verifyAuth(req);
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const newCategory = await prisma.category.create({
      data: { name: body.name }
    });

    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(categories.map(c => c.name), { status: 201 });
  } catch (error) {
    console.error("Failed to add category", error);
    return NextResponse.json({ error: 'Failed to add category' }, { status: 500 });
  }
}
