import { readBouquets, writeBouquets } from '@/lib/json-db';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const bouquets = await readBouquets();
  const bouquet = bouquets.find((b: any) => b.id === Number(params.id));
  if (!bouquet) return NextResponse.json('Not found', { status: 404 });
  return NextResponse.json(bouquet, { status: 200 });
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }
  const token = auth.split(' ')[1];
  if (!verifyToken(token)) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }
  
  const bouquets = await readBouquets();
  const idx = bouquets.findIndex((b: any) => b.id === Number(params.id));
  
  if (idx === -1) return NextResponse.json('Not found', { status: 404 });
  
  const body = await req.json();
  bouquets[idx] = {
    ...bouquets[idx],
    ...body,
    id: bouquets[idx].id,
    createdAt: bouquets[idx].createdAt,
    updatedAt: new Date().toISOString(),
  };
  
  await writeBouquets(bouquets);
  return NextResponse.json(bouquets[idx], { status: 200 });
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }
  const token = auth.split(' ')[1];
  if (!verifyToken(token)) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }
  
  const bouquets = await readBouquets();
  const idx = bouquets.findIndex((b: any) => b.id === Number(params.id));
  
  if (idx === -1) return NextResponse.json('Not found', { status: 404 });
  
  bouquets.splice(idx, 1);
  await writeBouquets(bouquets);
  
  return NextResponse.json({ message: 'Bouquet deleted' }, { status: 200 });
}
