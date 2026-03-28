import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const bouquets = await prisma.bouquet.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(bouquets);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bouquets" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuth = verifyAuth(req);
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    
    const newBouquet = await prisma.bouquet.create({
      data: {
        name: data.name,
        description: data.description || "",
        price: Number(data.price),
        images: data.images || [],
        stock: Number(data.stock) || 0,
        isFeatured: Boolean(data.isFeatured),
        category: data.category || "Uncategorized"
      }
    });

    return NextResponse.json(newBouquet, { status: 201 });
  } catch (error) {
    console.error("Error creating bouquet:", error);
    return NextResponse.json({ error: 'Failed to add bouquet' }, { status: 500 });
  }
}
