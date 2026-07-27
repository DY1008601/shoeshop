import { getProducts as shopifyGetProducts, getProduct as shopifyGetProduct } from '$lib/shopify/queries/products';
import { products as mockProducts } from './products';
import type { Product } from '$lib/shopify/types';

const isConfigured = Boolean(
	import.meta.env.PUBLIC_SHOPIFY_STORE_DOMAIN &&
	import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN
);

export async function getAllProducts(): Promise<Product[]> {
	if (isConfigured) {
		try {
			const data = await shopifyGetProducts({ first: 50 });
			return data.products.edges.map((e) => e.node);
		} catch {
			console.warn('Shopify API unavailable, using mock data');
		}
	}
	return mockProducts;
}

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
	if (isConfigured) {
		try {
			const data = await shopifyGetProduct(handle);
			return data.productByHandle;
		} catch {
			console.warn('Shopify API unavailable, using mock data');
		}
	}
	return mockProducts.find((p) => p.handle === handle);
}
