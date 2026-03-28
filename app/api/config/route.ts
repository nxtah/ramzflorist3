import { readSiteConfig, writeSiteConfig } from '@/lib/json-db';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const config = await readSiteConfig();
  return NextResponse.json(config, { status: 200 });
}

export async function PUT(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }
  const token = auth.split(' ')[1];
  if (!verifyToken(token)) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }
  
  const body = await req.json();
  const currentConfig = await readSiteConfig();
  
  const newConfig = {
    ...currentConfig,
    ...body
  };
  
  await writeSiteConfig(newConfig);
  return NextResponse.json(newConfig, { status: 200 });
}
