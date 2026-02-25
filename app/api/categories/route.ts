import { NextResponse } from 'next/server';
import { readCategories } from '@/lib/json-db';

export async function GET() {
  const categories = await readCategories();
  return NextResponse.json(categories);
}