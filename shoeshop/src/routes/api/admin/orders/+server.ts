import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateSession, SESSION_COOKIE } from '$lib/server/auth';
import { initDb, queryAll } from '$lib/server/db';

async function checkAuth(cookies: Parameters<RequestHandler>[0]['cookies']) {
	const token = cookies.get(SESSION_COOKIE);
	if (!token || !(await validateSession(token))) return false;
	return true;
}

export const GET: RequestHandler = async ({ cookies }) => {
	if (!(await checkAuth(cookies))) return json({ error: 'Unauthorized' }, { status: 401 });

	const db = await initDb();
	const orders = queryAll(db, 'SELECT * FROM orders ORDER BY created_at DESC');

	const result = orders.map((order: any) => {
		const items = queryAll(db, 'SELECT * FROM order_items WHERE order_id = ?', [order.id]);
		return {
			id: order.id,
			customer_name: order.customer_name,
			customer_email: order.customer_email,
			address: order.address,
			total: order.total,
			status: order.status,
			created_at: order.created_at,
			items: items.map((item: any) => ({
				id: item.id,
				product_id: item.product_id,
				product_title: item.product_title,
				size: item.size,
				quantity: item.quantity,
				price: item.price
			}))
		};
	});

	return json(result);
};
