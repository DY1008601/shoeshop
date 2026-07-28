import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateSession, SESSION_COOKIE } from '$lib/server/auth';
import { initDb, queryOne, queryAll } from '$lib/server/db';

async function checkAuth(cookies: Parameters<RequestHandler>[0]['cookies']) {
	const token = cookies.get(SESSION_COOKIE);
	if (!token || !(await validateSession(token))) return false;
	return true;
}

export const GET: RequestHandler = async ({ params, cookies }) => {
	if (!(await checkAuth(cookies))) return json({ error: 'Unauthorized' }, { status: 401 });

	const db = await initDb();
	const customer = queryOne(db, 'SELECT * FROM customers WHERE id = ?', [params.id]);
	if (!customer) return json({ error: 'Not found' }, { status: 404 });

	const orders = queryAll(
		db,
		'SELECT * FROM orders WHERE customer_email = (SELECT email FROM customers WHERE id = ?) ORDER BY created_at DESC',
		[params.id]
	);

	return json({
		id: customer.id,
		name: customer.name,
		email: customer.email,
		phone: customer.phone,
		created_at: customer.created_at,
		orders: orders.map((o: any) => ({
			id: o.id,
			total: o.total,
			status: o.status,
			created_at: o.created_at
		}))
	});
};
