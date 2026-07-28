import { initDb, queryOne, queryAll, execRun, saveDb } from './db';
import type { Product } from '$lib/shopify/types';

function slugify(text: string): string {
	return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export interface ProductRow {
	id: string;
	title: string;
	handle: string;
	description: string;
	description_html: string;
	price: number;
	compare_at_price: number | null;
	stock: number;
	collection: string;
	status: string;
	created_at: number;
	updated_at: number;
}

export interface ProductImageRow {
	id: number;
	product_id: string;
	url: string;
	alt_text: string;
	position: number;
}

export async function listProducts(): Promise<Product[]> {
	const db = await initDb();
	const rows = queryAll(db, "SELECT * FROM products WHERE status = 'active' ORDER BY created_at DESC");

	return rows.map((row: any) => {
		const images = queryAll(db, 'SELECT * FROM product_images WHERE product_id = ? ORDER BY position', [row.id]);
		const sizes = queryAll(db, 'SELECT size FROM product_sizes WHERE product_id = ?', [row.id]);
		return rowToProduct(row, images, sizes);
	});
}

export async function getProduct(id: string): Promise<Product | null> {
	const db = await initDb();
	const row = queryOne(db, 'SELECT * FROM products WHERE id = ?', [id]);
	if (!row) return null;

	const images = queryAll(db, 'SELECT * FROM product_images WHERE product_id = ? ORDER BY position', [id]);
	const sizes = queryAll(db, 'SELECT size FROM product_sizes WHERE product_id = ?', [id]);
	return rowToProduct(row, images, sizes);
}

export async function createProduct(data: {
	title: string;
	description: string;
	description_html: string;
	price: number;
	compare_at_price?: number;
	stock: number;
	collection: string;
	sizes: string[];
	images: { url: string; alt_text: string }[];
}): Promise<Product> {
	const db = await initDb();
	const id = 'gid://shopify/product/' + crypto.randomUUID().slice(0, 8);
	const handle = slugify(data.title);
	const now = Date.now();

	execRun(db, `INSERT INTO products (id, title, handle, description, description_html, price, compare_at_price, stock, collection, status, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?)`, [
		id, data.title, handle, data.description, data.description_html,
		data.price, data.compare_at_price || null, data.stock, data.collection, now, now
	]);

	for (const size of data.sizes) {
		execRun(db, 'INSERT INTO product_sizes (product_id, size) VALUES (?, ?)', [id, size]);
	}

	for (let i = 0; i < data.images.length; i++) {
		execRun(db, 'INSERT INTO product_images (product_id, url, alt_text, position) VALUES (?, ?, ?, ?)', [
			id, data.images[i].url, data.images[i].alt_text, i
		]);
	}

	saveDb(db);
	return (await getProduct(id))!;
}

export async function updateProduct(id: string, data: {
	title: string;
	description: string;
	description_html: string;
	price: number;
	compare_at_price?: number;
	stock: number;
	collection: string;
	sizes: string[];
	images: { url: string; alt_text: string }[];
}): Promise<Product | null> {
	const db = await initDb();
	const existing = queryOne(db, 'SELECT * FROM products WHERE id = ?', [id]);
	if (!existing) return null;

	const handle = slugify(data.title);
	const now = Date.now();

	execRun(db, `UPDATE products SET title=?, handle=?, description=?, description_html=?, price=?, compare_at_price=?, stock=?, collection=?, updated_at=?
		WHERE id=?`, [
		data.title, handle, data.description, data.description_html,
		data.price, data.compare_at_price || null, data.stock, data.collection, now, id
	]);

	execRun(db, 'DELETE FROM product_sizes WHERE product_id = ?', [id]);
	for (const size of data.sizes) {
		execRun(db, 'INSERT INTO product_sizes (product_id, size) VALUES (?, ?)', [id, size]);
	}

	execRun(db, 'DELETE FROM product_images WHERE product_id = ?', [id]);
	for (let i = 0; i < data.images.length; i++) {
		execRun(db, 'INSERT INTO product_images (product_id, url, alt_text, position) VALUES (?, ?, ?, ?)', [
			id, data.images[i].url, data.images[i].alt_text, i
		]);
	}

	saveDb(db);
	return getProduct(id);
}

export async function deleteProduct(id: string): Promise<boolean> {
	const db = await initDb();
	execRun(db, "UPDATE products SET status = 'archived', updated_at = ? WHERE id = ?", [Date.now(), id]);
	saveDb(db);
	return true;
}

function rowToProduct(row: any, images: any[], sizes: any[]): Product {
	return {
		id: row.id,
		handle: row.handle,
		title: row.title,
		description: row.description,
		descriptionHtml: row.description_html,
		featuredImage: images.length > 0
			? { url: images[0].url, altText: images[0].alt_text, width: 800, height: 800 }
			: { url: '', altText: row.title, width: 800, height: 800 },
		images: {
			edges: images.map((img: any) => ({
				node: { url: img.url, altText: img.alt_text, width: 800, height: 800 }
			}))
		},
		options: [
			{ name: 'Size', values: sizes.map((s: any) => s.size) }
		],
		variants: {
			edges: sizes.map((s: any) => ({
				node: {
					id: `v-${row.id}-${s.size.replace(/\s+/g, '-')}`,
					title: s.size,
					availableForSale: row.stock > 0,
					selectedOptions: [{ name: 'Size', value: s.size }],
					price: { amount: String(row.price), currencyCode: 'USD' },
					compareAtPrice: row.compare_at_price ? { amount: String(row.compare_at_price), currencyCode: 'USD' } : null,
					image: null
				}
			}))
		},
		collections: { edges: [{ node: { handle: row.collection, title: row.collection.charAt(0).toUpperCase() + row.collection.slice(1) } }] },
		seo: { title: row.title, description: (row.description || '').slice(0, 160) },
		priceRange: {
			minVariantPrice: { amount: String(row.compare_at_price || row.price), currencyCode: 'USD' },
			maxVariantPrice: { amount: String(row.price), currencyCode: 'USD' }
		}
	};
}
