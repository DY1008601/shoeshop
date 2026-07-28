import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateSession, SESSION_COOKIE } from '$lib/server/auth';
import { getProduct, updateProduct, deleteProduct } from '$lib/server/product-repo';

function checkAuth(cookies: Parameters<RequestHandler>[0]['cookies']) {
	const token = cookies.get(SESSION_COOKIE);
	if (!token || !validateSession(token)) return false;
	return true;
}

export const GET: RequestHandler = async ({ params, cookies }) => {
	if (!checkAuth(cookies)) return json({ error: 'Unauthorized' }, { status: 401 });
	const product = getProduct(params.id);
	if (!product) return json({ error: 'Not found' }, { status: 404 });
	return json(product);
};

export const PUT: RequestHandler = async ({ params, request, cookies }) => {
	if (!checkAuth(cookies)) return json({ error: 'Unauthorized' }, { status: 401 });
	const data = await request.json();
	const product = updateProduct(params.id, data);
	if (!product) return json({ error: 'Not found' }, { status: 404 });
	return json(product);
};

export const DELETE: RequestHandler = async ({ params, cookies }) => {
	if (!checkAuth(cookies)) return json({ error: 'Unauthorized' }, { status: 401 });
	const ok = deleteProduct(params.id);
	if (!ok) return json({ error: 'Not found' }, { status: 404 });
	return json({ success: true });
};
