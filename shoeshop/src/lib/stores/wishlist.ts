import { writable, derived } from 'svelte/store';

function createWishlist() {
	const { subscribe, set, update } = writable<string[]>([]);

	const load = () => {
		if (typeof localStorage === 'undefined') return;
		try {
			const stored = localStorage.getItem('shoeshop-wishlist');
			if (stored) set(JSON.parse(stored));
		} catch { /* */ }
	};

	const save = (items: string[]) => {
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem('shoeshop-wishlist', JSON.stringify(items));
	};

	return {
		subscribe,
		load,
		toggle(handle: string) {
			update((items) => {
				const next = items.includes(handle)
					? items.filter((h) => h !== handle)
					: [...items, handle];
				save(next);
				return next;
			});
		},
		isInWishlist(handle: string): boolean {
			let result = false;
			subscribe((items) => { result = items.includes(handle); })();
			return result;
		}
	};
}

export const wishlist = createWishlist();
export const wishlistCount = derived(wishlist, ($w) => $w.length);
