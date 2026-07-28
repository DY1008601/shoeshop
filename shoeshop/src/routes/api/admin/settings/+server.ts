import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateSession, SESSION_COOKIE, hashPassword } from '$lib/server/auth';
import { initDb, queryOne, queryAll, execRun, saveDb } from '$lib/server/db';

async function checkAuth(cookies: Parameters<RequestHandler>[0]['cookies']) {
	const token = cookies.get(SESSION_COOKIE);
	if (!token || !(await validateSession(token))) return false;
	return true;
}

export const GET: RequestHandler = async ({ cookies }) => {
	if (!(await checkAuth(cookies))) return json({ error: 'Unauthorized' }, { status: 401 });

	const db = await initDb();
	const rows = queryAll(db, "SELECT key, value FROM settings WHERE key IN ('store_name', 'store_description')");

	const result: Record<string, string> = {};
	for (const row of rows) {
		result[row.key] = row.value;
	}

	return json({
		store_name: result.store_name ?? '',
		store_description: result.store_description ?? ''
	});
};

export const PUT: RequestHandler = async ({ request, cookies }) => {
	if (!(await checkAuth(cookies))) return json({ error: 'Unauthorized' }, { status: 401 });

	const data = await request.json();
	const db = await initDb();

	if (data.store_name !== undefined) {
		execRun(db, 'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', ['store_name', data.store_name]);
	}

	if (data.store_description !== undefined) {
		execRun(db, 'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', ['store_description', data.store_description]);
	}

	if (data.new_password) {
		const hashed = hashPassword(data.new_password);
		execRun(db, 'UPDATE admins SET password_hash = ? WHERE username = ?', [hashed, 'admin']);
	}

	saveDb(db);

	return json({ success: true });
};
