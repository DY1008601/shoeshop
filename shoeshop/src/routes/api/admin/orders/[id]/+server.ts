import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateSession, SESSION_COOKIE } from '$lib/server/auth';
import { initDb, queryOne, queryAll, execRun, saveDb } from '$lib/server/db';

async function checkAuth(cookies: Parameters<RequestHandler>[0]['cookies']) {
	const token = cookies.get(SESSION_COOKIE);
	if (!token || !(await validateSession(token))) return false;
	return true;
}

export const GET: RequestHandler = async ({ params, cookies }) => {
	if (!(await checkAuth(cookies))) return json({ error: 'Unauthorized' }, { status: 401 });

	const db = await initDb();
	const order = queryOne(db, 'SELECT * FROM orders WHERE id = ?', [params.id]);
	if (!order) return json({ error: 'Not found' }, { status: 404 });

	const items = queryAll(db, 'SELECT * FROM order_items WHERE order_id = ?', [order.id]);

	return json({
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
	});
};

export const PUT: RequestHandler = async ({ params, request, cookies }) => {
	if (!(await checkAuth(cookies))) return json({ error: 'Unauthorized' }, { status: 401 });

	const data = await request.json();
	if (!data.status) return json({ error: 'Missing status' }, { status: 400 });

	const db = await initDb();
	const order = queryOne(db, 'SELECT * FROM orders WHERE id = ?', [params.id]);
	if (!order) return json({ error: 'Not found' }, { status: 404 });

	execRun(db, 'UPDATE orders SET status = ? WHERE id = ?', [data.status, params.id]);
	saveDb(db);

	const items = queryAll(db, 'SELECT * FROM order_items WHERE order_id = ?', [params.id]);

	return json({
		id: order.id,
		customer_name: order.customer_name,
		customer_email: order.customer_email,
		address: order.address,
		total: order.total,
		status: data.status,
		created_at: order.created_at,
		items: items.map((item: any) => ({
			id: item.id,
			product_id: item.product_id,
			product_title: item.product_title,
			size: item.size,
			quantity: item.quantity,
			price: item.price
		}))
	});
};
