import { writable, derived } from 'svelte/store';
import type { CartItem } from '$lib/shopify/types';

function createCartStore() {
	const { subscribe, set, update } = writable<{
		id: string | null;
		checkoutUrl: string | null;
		items: CartItem[];
		totalQuantity: number;
		totalAmount: string;
		currencyCode: string;
	}>({
		id: null,
		checkoutUrl: null,
		items: [],
		totalQuantity: 0,
		totalAmount: '0',
		currencyCode: 'USD'
	});

	const loadFromStorage = () => {
		if (typeof localStorage === 'undefined') return;
		const stored = localStorage.getItem('shoeshop-cart');
		if (stored) {
			try {
				const data = JSON.parse(stored);
				set(data);
			} catch {
				//
			}
		}
	};

	const saveToStorage = (data: {
		id: string | null;
		checkoutUrl: string | null;
		items: CartItem[];
		totalQuantity: number;
		totalAmount: string;
		currencyCode: string;
	}) => {
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem('shoeshop-cart', JSON.stringify(data));
	};

	return {
		subscribe,
		load: loadFromStorage,
		setCart(cart: {
			id: string;
			checkoutUrl: string;
			totalQuantity: number;
			items: CartItem[];
			totalAmount: string;
			currencyCode: string;
		}) {
			const data = { ...cart };
			set(data);
			saveToStorage(data);
		},
		clear() {
			const empty = {
				id: null,
				checkoutUrl: null,
				items: [],
				totalQuantity: 0,
				totalAmount: '0',
				currencyCode: 'USD'
			};
			set(empty);
			saveToStorage(empty);
		}
	};
}

export const cart = createCartStore();
export const cartCount = derived(cart, ($cart) => $cart.totalQuantity);
