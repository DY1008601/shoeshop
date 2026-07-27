import { shopifyFetch } from './client';
import type { Product, Collection } from './types';

export async function getProducts({
	first = 12,
	after,
	query,
	sortKey = 'CREATED'
}: {
	first?: number;
	after?: string;
	query?: string;
	sortKey?: string;
} = {}) {
	const gql = `
		query Products($first: Int!, $after: String, $query: String, $sortKey: ProductSortKeys) {
			products(first: $first, after: $after, query: $query, sortKey: $sortKey) {
				pageInfo { hasNextPage endCursor }
				edges {
					node {
						id handle title description
						featuredImage { url altText width height }
						priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
						variants(first: 10) { edges { node { id title availableForSale price { amount currencyCode } } } }
						seo { title description }
					}
				}
			}
		}
	`;
	return shopifyFetch<{ products: { pageInfo: { hasNextPage: boolean; endCursor: string }; edges: { node: Product }[] } }>({
		query: gql,
		variables: { first, after, query, sortKey }
	});
}

export async function getProduct(handle: string) {
	const gql = `
		query Product($handle: String!) {
			productByHandle(handle: $handle) {
				id handle title description descriptionHtml
				featuredImage { url altText width height }
				images(first: 10) { edges { node { url altText width height } } }
				options { name values }
				variants(first: 50) { edges {
					node {
						id title availableForSale
						selectedOptions { name value }
						price { amount currencyCode }
						compareAtPrice { amount currencyCode }
						image { url altText width height }
					}
				}}
				collections(first: 5) { edges { node { handle title } } }
				seo { title description }
				priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
			}
		}
	`;
	return shopifyFetch<{ productByHandle: Product }>({
		query: gql,
		variables: { handle }
	});
}

export async function getCollection(handle: string, first = 12, after?: string) {
	const gql = `
		query Collection($handle: String!, $first: Int!, $after: String) {
			collectionByHandle(handle: $handle) {
				id handle title description
				image { url altText width height }
				seo { title description }
				products(first: $first, after: $after) {
					pageInfo { hasNextPage endCursor }
					edges {
						node {
							id handle title
							featuredImage { url altText width height }
							priceRange { minVariantPrice { amount currencyCode } }
							variants(first: 1) { edges { node { id availableForSale } } }
						}
					}
				}
			}
		}
	`;
	return shopifyFetch<{ collectionByHandle: Collection & { products: { pageInfo: { hasNextPage: boolean; endCursor: string }; edges: { node: Product }[] } } }>({
		query: gql,
		variables: { handle, first, after }
	});
}
