import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { initDb, queryOne } from '$lib/server/db';
import { verifyPassword, createSession, SESSION_COOKIE } from '$lib/server/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { username, password } = await request.json();

	if (!username || !password) {
		return json({ error: 'Username and password required' }, { status: 400 });
	}

	const db = await initDb();
	const admin = queryOne(db, 'SELECT username, password_hash FROM admins WHERE username = ?', [username]);

	if (!admin || !verifyPassword(password, admin.password_hash)) {
		return json({ error: 'Invalid credentials' }, { status: 401 });
	}

	const token = await createSession(admin.username);
	cookies.set(SESSION_COOKIE, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24
	});

	return json({ success: true });
};
