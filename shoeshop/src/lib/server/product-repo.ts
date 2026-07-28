import { getDb } from './db';
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

export function listProducts(): Product[] {
	const db = getDb();
	const rows = db.prepare('SELECT * FROM products WHERE status = ? ORDER BY created_at DESC').all('active') as ProductRow[];

	return rows.map((row) => {
		const images = db.prepare('SELECT * FROM product_images WHERE product_id = ? ORDER BY position').all(row.id) as ProductImageRow[];
		const sizes = db.prepare('SELECT size FROM product_sizes WHERE product_id = ?').all(row.id) as { size: string }[];

		return rowToProduct(row, images, sizes);
	});
}

export function getProduct(id: string): Product | null {
	const db = getDb();
	const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as ProductRow | undefined;
	if (!row) return null;

	const images = db.prepare('SELECT * FROM product_images WHERE product_id = ? ORDER BY position').all(id) as ProductImageRow[];
	const sizes = db.prepare('SELECT size FROM product_sizes WHERE product_id = ?').all(id) as { size: string }[];

	return rowToProduct(row, images, sizes);
}

export function createProduct(data: {
	title: string;
	description: string;
	description_html: string;
	price: number;
	compare_at_price?: number;
	stock: number;
	collection: string;
	sizes: string[];
	images: { url: string; alt_text: string }[];
}): Product {
	const db = getDb();
	const id = 'gid://shopify/product/' + crypto.randomUUID().slice(0, 8);
	const handle = slugify(data.title);
	const now = Date.now();

	db.prepare(`INSERT INTO products (id, title, handle, description, description_html, price, compare_at_price, stock, collection, status, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?)`).run(
		id, data.title, handle, data.description, data.description_html,
		data.price, data.compare_at_price || null, data.stock, data.collection, now, now
	);

	for (const size of data.sizes) {
		db.prepare('INSERT INTO product_sizes (product_id, size) VALUES (?, ?)').run(id, size);
	}

	for (let i = 0; i < data.images.length; i++) {
		db.prepare('INSERT INTO product_images (product_id, url, alt_text, position) VALUES (?, ?, ?, ?)').run(
			id, data.images[i].url, data.images[i].alt_text, i
		);
	}

	return getProduct(id)!;
}

export function updateProduct(id: string, data: {
	title: string;
	description: string;
	description_html: string;
	price: number;
	compare_at_price?: number;
	stock: number;
	collection: string;
	sizes: string[];
	images: { url: string; alt_text: string }[];
}): Product | null {
	const db = getDb();
	const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as ProductRow | undefined;
	if (!existing) return null;

	const handle = slugify(data.title);
	const now = Date.now();

	db.prepare(`UPDATE products SET title=?, handle=?, description=?, description_html=?, price=?, compare_at_price=?, stock=?, collection=?, updated_at=?
		WHERE id=?`).run(
		data.title, handle, data.description, data.description_html,
		data.price, data.compare_at_price || null, data.stock, data.collection, now, id
	);

	db.prepare('DELETE FROM product_sizes WHERE product_id = ?').run(id);
	for (const size of data.sizes) {
		db.prepare('INSERT INTO product_sizes (product_id, size) VALUES (?, ?)').run(id, size);
	}

	db.prepare('DELETE FROM product_images WHERE product_id = ?').run(id);
	for (let i = 0; i < data.images.length; i++) {
		db.prepare('INSERT INTO product_images (product_id, url, alt_text, position) VALUES (?, ?, ?, ?)').run(
			id, data.images[i].url, data.images[i].alt_text, i
		);
	}

	return getProduct(id);
}

export function deleteProduct(id: string): boolean {
	const db = getDb();
	const result = db.prepare("UPDATE products SET status = 'archived', updated_at = ? WHERE id = ?").run(Date.now(), id);
	return result.changes > 0;
}

function rowToProduct(row: ProductRow, images: ProductImageRow[], sizes: { size: string }[]): Product {
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
			edges: images.map((img) => ({
				node: { url: img.url, altText: img.alt_text, width: 800, height: 800 }
			}))
		},
		options: [
			{ name: 'Size', values: sizes.map((s) => s.size) }
		],
		variants: {
			edges: sizes.map((s) => ({
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
		seo: { title: row.title, description: row.description.slice(0, 160) },
		priceRange: {
			minVariantPrice: { amount: String(row.compare_at_price || row.price), currencyCode: 'USD' },
			maxVariantPrice: { amount: String(row.price), currencyCode: 'USD' }
		}
	};
}
