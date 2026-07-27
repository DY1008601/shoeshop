import { shopifyFetch } from '../client';
import type { Cart } from '../types';

export async function createCart(lines?: { merchandiseId: string; quantity: number }[]) {
	const gql = `
		mutation CartCreate($lines: [CartLineInput!]) {
			cartCreate(input: { lines: $lines }) {
				cart {
					id checkoutUrl totalQuantity
					lines(first: 20) { edges { node {
						id quantity
						merchandise {
							... on ProductVariant {
								id title
								price { amount currencyCode }
								image { url altText width height }
								product { handle title }
							}
						}
					}}}
					cost { totalAmount { amount currencyCode } subtotalAmount { amount currencyCode } }
				}
				userErrors { field message }
			}
		}
	`;
	return shopifyFetch<{ cartCreate: { cart: Cart; userErrors: { field: string; message: string }[] } }>({
		query: gql,
		variables: { lines: lines || [] }
	});
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
	const gql = `
		mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
			cartLinesAdd(cartId: $cartId, lines: $lines) {
				cart {
					id checkoutUrl totalQuantity
					lines(first: 20) { edges { node {
						id quantity
						merchandise {
							... on ProductVariant {
								id title
								price { amount currencyCode }
								image { url altText width height }
								product { handle title }
							}
						}
					}}}
					cost { totalAmount { amount currencyCode } subtotalAmount { amount currencyCode } }
				}
				userErrors { field message }
			}
		}
	`;
	return shopifyFetch<{ cartLinesAdd: { cart: Cart; userErrors: { field: string; message: string }[] } }>({
		query: gql,
		variables: { cartId, lines }
	});
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number) {
	const gql = `
		mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
			cartLinesUpdate(cartId: $cartId, lines: $lines) {
				cart {
					id checkoutUrl totalQuantity
					lines(first: 20) { edges { node {
						id quantity
						merchandise {
							... on ProductVariant {
								id title
								price { amount currencyCode }
								image { url altText width height }
								product { handle title }
							}
						}
					}}}
					cost { totalAmount { amount currencyCode } subtotalAmount { amount currencyCode } }
				}
				userErrors { field message }
			}
		}
	`;
	return shopifyFetch<{ cartLinesUpdate: { cart: Cart; userErrors: { field: string; message: string }[] } }>({
		query: gql,
		variables: { cartId, lines: [{ id: lineId, quantity }] }
	});
}

export async function removeCartLine(cartId: string, lineIds: string[]) {
	const gql = `
		mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
			cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
				cart {
					id checkoutUrl totalQuantity
					lines(first: 20) { edges { node {
						id quantity
						merchandise {
							... on ProductVariant {
								id title
								price { amount currencyCode }
								image { url altText width height }
								product { handle title }
							}
						}
					}}}
					cost { totalAmount { amount currencyCode } subtotalAmount { amount currencyCode } }
				}
				userErrors { field message }
			}
		}
	`;
	return shopifyFetch<{ cartLinesRemove: { cart: Cart; userErrors: { field: string; message: string }[] } }>({
		query: gql,
		variables: { cartId, lineIds }
	});
}
