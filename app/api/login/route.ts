
import { generateToken, validateCredentials } from '@/lib/auth';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!validateCredentials(username, password)) {
    return new Response('Invalid credentials', { status: 401 });
  }
  const token = generateToken(username);
  return Response.json({ token }, { status: 200 });
}
