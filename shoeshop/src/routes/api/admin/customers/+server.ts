import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateSession, SESSION_COOKIE } from '$lib/server/auth';
import { initDb, queryAll, queryOne } from '$lib/server/db';

async function checkAuth(cookies: Parameters<RequestHandler>[0]['cookies']) {
	const token = cookies.get(SESSION_COOKIE);
	if (!token || !(await validateSession(token))) return false;
	return true;
}

export const GET: RequestHandler = async ({ cookies }) => {
	if (!(await checkAuth(cookies))) return json({ error: 'Unauthorized' }, { status: 401 });

	const db = await initDb();
	const customers = queryAll(db, 'SELECT * FROM customers ORDER BY created_at DESC');

	const result = customers.map((c: any) => {
		const countRow = queryOne(db, 'SELECT COUNT(*) as order_count FROM orders WHERE customer_email = ?', [c.email]);
		return {
			id: c.id,
			name: c.name,
			email: c.email,
			phone: c.phone,
			order_count: countRow?.order_count ?? 0,
			created_at: c.created_at
		};
	});

	return json(result);
};
