import { writable, derived } from 'svelte/store';
import type { CartItem, Money, Image } from '$lib/shopify/types';

interface CartState {
	id: string | null;
	checkoutUrl: string | null;
	items: CartItem[];
	totalQuantity: number;
	totalAmount: string;
	currencyCode: string;
}

function generateId(): string {
	return 'cart_' + Math.random().toString(36).slice(2, 10);
}

function createCartStore() {
	const initialState: CartState = {
		id: generateId(),
		checkoutUrl: null,
		items: [],
		totalQuantity: 0,
		totalAmount: '0',
		currencyCode: 'USD'
	};

	const { subscribe, set, update } = writable<CartState>(initialState);

	const loadFromStorage = () => {
		if (typeof localStorage === 'undefined') return;
		const stored = localStorage.getItem('shoeshop-cart');
		if (stored) {
			try {
				const data = JSON.parse(stored);
				if (!data.id) data.id = generateId();
				set(data);
			} catch {
				//
			}
		}
	};

	const save = (data: CartState) => {
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem('shoeshop-cart', JSON.stringify(data));
	};

	const recalc = (items: CartItem[]): Pick<CartState, 'totalQuantity' | 'totalAmount'> => {
		const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
		const totalAmount = items.reduce((sum, i) => sum + parseFloat(i.price.amount) * i.quantity, 0).toFixed(2);
		return { totalQuantity, totalAmount };
	};

	return {
		subscribe,
		load: loadFromStorage,

		addItem(variantId: string, quantity: number, product: { handle: string; title: string }, variant: { title: string; price: Money; image: Image | null }) {
			update((state) => {
				const existing = state.items.find((i) => i.variantId === variantId);
				let newItems: CartItem[];
				if (existing) {
					newItems = state.items.map((i) =>
						i.variantId === variantId ? { ...i, quantity: i.quantity + quantity } : i
					);
				} else {
					newItems = [...state.items, {
						id: `line_${variantId}`,
						variantId,
						productHandle: product.handle,
						title: product.title,
						variantTitle: variant.title,
						price: variant.price,
						image: variant.image,
						quantity
					}];
				}
				const totals = recalc(newItems);
				const newState = { ...state, items: newItems, ...totals };
				save(newState);
				return newState;
			});
		},

		removeItem(variantId: string) {
			update((state) => {
				const newItems = state.items.filter((i) => i.variantId !== variantId);
				const totals = recalc(newItems);
				const newState = { ...state, items: newItems, ...totals };
				save(newState);
				return newState;
			});
		},

		updateQuantity(variantId: string, quantity: number) {
			if (quantity <= 0) {
				this.removeItem(variantId);
				return;
			}
			update((state) => {
				const newItems = state.items.map((i) =>
					i.variantId === variantId ? { ...i, quantity } : i
				);
				const totals = recalc(newItems);
				const newState = { ...state, items: newItems, ...totals };
				save(newState);
				return newState;
			});
		},

		clear() {
			const empty = { ...initialState, id: generateId() };
			set(empty);
			save(empty);
		}
	};
}

export const cart = createCartStore();
export const cartCount = derived(cart, ($cart) => $cart.totalQuantity);
