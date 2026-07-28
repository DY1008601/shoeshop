import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateSession, SESSION_COOKIE } from '$lib/server/auth';
import { listProducts, createProduct } from '$lib/server/product-repo';

function checkAuth(cookies: Parameters<RequestHandler>[0]['cookies']) {
	const token = cookies.get(SESSION_COOKIE);
	if (!token || !validateSession(token)) {
		return false;
	}
	return true;
}

export const GET: RequestHandler = async ({ cookies }) => {
	if (!checkAuth(cookies)) return json({ error: 'Unauthorized' }, { status: 401 });
	const products = listProducts();
	return json(products);
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	if (!checkAuth(cookies)) return json({ error: 'Unauthorized' }, { status: 401 });

	const data = await request.json();

	if (!data.title || !data.description || !data.price) {
		return json({ error: 'Missing required fields' }, { status: 400 });
	}

	const product = createProduct({
		title: data.title,
		description: data.description,
		description_html: data.description_html || data.description,
		price: data.price,
		compare_at_price: data.compare_at_price,
		stock: data.stock || 0,
		collection: data.collection || 'running',
		sizes: data.sizes || [],
		images: data.images || []
	});

	return json(product, { status: 201 });
};
