


import { readBouquets, writeBouquets, getNextId } from '@/lib/json-db';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

type Bouquet = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
};


export async function GET() {
  const bouquets: Bouquet[] = await readBouquets();
  bouquets.sort((a: Bouquet, b: Bouquet) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });
  return NextResponse.json(bouquets, { status: 200 });
}

export async function POST(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }
  const token = auth.split(' ')[1];
  if (!verifyToken(token)) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }
  const body = await req.json();
  const required = ['name', 'price', 'stock', 'category', 'images'];
  for (const key of required) {
    if (!body[key] || (Array.isArray(body[key]) && !body[key].length)) {
      return NextResponse.json(`Missing field: ${key}`, { status: 400 });
    }
  }
  const bouquets = await readBouquets();
  const id = await getNextId();
  const now = new Date().toISOString();
  const bouquet = {
    id,
    name: body.name,
    price: body.price,
    stock: body.stock,
    category: body.category,
    images: body.images,
    createdAt: now,
    updatedAt: now,
  };
  bouquets.push(bouquet);
  await writeBouquets(bouquets);
  return NextResponse.json(bouquet, { status: 201 });
}
