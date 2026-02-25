
import { uploadToCloudinary } from '@/lib/cloudinary';
import { verifyToken } from '@/lib/auth';

export async function POST(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return new Response('Unauthorized', { status: 401 });
  }
  const token = auth.split(' ')[1];
  if (!verifyToken(token)) {
    return new Response('Unauthorized', { status: 401 });
  }
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const category = formData.get('category') as string || 'uncategorized';
    if (!files.length) return new Response('No files uploaded', { status: 400 });
    const urls = await uploadToCloudinary(files, category);
    return Response.json({ urls }, { status: 200 });
  } catch (err: any) {
    return new Response('Upload failed', { status: 500 });
  }
}
