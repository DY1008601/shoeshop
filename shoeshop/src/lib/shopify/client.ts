const SHOPIFY_STORE_DOMAIN = import.meta.env.PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_API_VERSION = import.meta.env.PUBLIC_SHOPIFY_API_VERSION || '2024-07';

const ENDPOINT = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

interface ShopifyResponse<T> {
	data: T;
	errors?: { message: string }[];
}

export async function shopifyFetch<T>({
	query,
	variables = {}
}: {
	query: string;
	variables?: Record<string, unknown>;
}): Promise<T> {
	const response = await fetch(ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
		},
		body: JSON.stringify({ query, variables })
	});

	if (!response.ok) {
		throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
	}

	const json: ShopifyResponse<T> = await response.json();

	if (json.errors) {
		throw new Error(`Shopify GraphQL errors: ${json.errors.map((e) => e.message).join(', ')}`);
	}

	return json.data;
}
