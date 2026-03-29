// Auth utility (placeholder)
import jwt from 'jsonwebtoken';

const USERNAME = 'rama';
const PASSWORD = 'R4M444';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export function generateToken(username: string) {
	return jwt.sign({ username }, JWT_SECRET, { expiresIn: '12h' });
}

export function verifyToken(token: string): { username: string } | null {
	try {
		return jwt.verify(token, JWT_SECRET) as { username: string };
	} catch {
		return null;
	}
}

export function validateCredentials(username: string, password: string) {
	return username === USERNAME && password === PASSWORD;
}

export function verifyAuth(req: Request): boolean {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
    }
    const token = authHeader.split(' ')[1];
    return verifyToken(token) !== null;
}
