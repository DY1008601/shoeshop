import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db';
import { verifyPassword, createSession, SESSION_COOKIE } from '$lib/server/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { username, password } = await request.json();

	if (!username || !password) {
		return json({ error: 'Username and password required' }, { status: 400 });
	}

	const db = getDb();
	const admin = db.prepare('SELECT username, password_hash FROM admins WHERE username = ?').get(username) as { username: string; password_hash: string } | undefined;

	if (!admin || !verifyPassword(password, admin.password_hash)) {
		return json({ error: 'Invalid credentials' }, { status: 401 });
	}

	const token = createSession(admin.username);
	cookies.set(SESSION_COOKIE, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24
	});

	return json({ success: true });
};
