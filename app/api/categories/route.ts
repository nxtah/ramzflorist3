import { NextResponse } from 'next/server';
import { readCategories, writeCategories } from '@/lib/json-db';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const categories = await readCategories();
  return NextResponse.json(categories);
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
  
  const { category } = await req.json();
  if (!category || typeof category !== 'string') {
    return NextResponse.json('Invalid category name', { status: 400 });
  }

  const categories = await readCategories();
  // Ensure it doesn't already exist
  if (!categories.includes(category.trim())) {
    categories.push(category.trim());
    await writeCategories(categories);
  }
  
  return NextResponse.json(categories, { status: 201 });
}
