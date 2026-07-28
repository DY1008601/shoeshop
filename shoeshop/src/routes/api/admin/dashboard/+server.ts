import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateSession, SESSION_COOKIE } from '$lib/server/auth';
import { initDb, queryOne, queryAll } from '$lib/server/db';

async function checkAuth(cookies: Parameters<RequestHandler>[0]['cookies']) {
	const token = cookies.get(SESSION_COOKIE);
	if (!token || !(await validateSession(token))) return false;
	return true;
}

export const GET: RequestHandler = async ({ cookies }) => {
	if (!(await checkAuth(cookies))) return json({ error: 'Unauthorized' }, { status: 401 });

	const db = await initDb();

	const productCount = queryOne(db, "SELECT COUNT(*) as c FROM products WHERE status = 'active'");
	const orderCount = queryOne(db, 'SELECT COUNT(*) as c FROM orders');
	const customerCount = queryOne(db, 'SELECT COUNT(*) as c FROM customers');
	const recentOrders = queryAll(db, 'SELECT id, customer_name, customer_email, total, status, created_at FROM orders ORDER BY created_at DESC LIMIT 5');

	return json({
		productCount: productCount?.c ?? 0,
		orderCount: orderCount?.c ?? 0,
		customerCount: customerCount?.c ?? 0,
		recentOrders
	});
};
