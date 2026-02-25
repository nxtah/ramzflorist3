
import { readBouquets, writeBouquets } from '@/lib/json-db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const bouquets = await readBouquets();
  const bouquet = bouquets.find((b: any) => b.id === Number(params.id));
  if (!bouquet) return new Response('Not found', { status: 404 });
  return Response.json(bouquet, { status: 200 });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return new Response('Unauthorized', { status: 401 });
  }
  const token = auth.split(' ')[1];
  if (!verifyToken(token)) {
    return new Response('Unauthorized', { status: 401 });
  }
  const bouquets = await readBouquets();
  const idx = bouquets.findIndex((b: any) => b.id === Number(params.id));
  if (idx === -1) return new Response('Not found', { status: 404 });
  const body = await req.json();
  bouquets[idx] = {
    ...bouquets[idx],
    ...body,
    id: bouquets[idx].id,
    createdAt: bouquets[idx].createdAt,
    updatedAt: new Date().toISOString(),
  };
  await writeBouquets(bouquets);
  return Response.json(bouquets[idx], { status: 200 });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return new Response('Unauthorized', { status: 401 });
  }
  const token = auth.split(' ')[1];
  if (!verifyToken(token)) {
    return new Response('Unauthorized', { status: 401 });
  }
  const bouquets = await readBouquets();
  const idx = bouquets.findIndex((b: any) => b.id === Number(params.id));
  if (idx === -1) return new Response('Not found', { status: 404 });
  bouquets.splice(idx, 1);
  await writeBouquets(bouquets);
  return Response.json({ message: 'Bouquet deleted' }, { status: 200 });
}
