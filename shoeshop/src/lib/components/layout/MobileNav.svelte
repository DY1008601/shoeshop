<script lang="ts">
	import { page } from '$app/stores';
	import { cart } from '$lib/stores/cart';
	import { wishlist, wishlistCount } from '$lib/stores/wishlist';
	import { onMount } from 'svelte';

	onMount(() => {
		cart.load();
		wishlist.load();
	});

	let lang = $derived($page.params.lang || 'en');
	let currentPath = $derived($page.url.pathname);
</script>

<nav class="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white lg:hidden" aria-label="Mobile navigation">
	<div class="flex items-center justify-around h-14">
		<a
			href={`/${lang}`}
			class={`flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${currentPath === `/${lang}` ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}`}
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
			</svg>
			<span>Home</span>
		</a>

		<a
			href={`/${lang}/products`}
			class={`flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${currentPath.startsWith(`/${lang}/products`) || currentPath.startsWith(`/${lang}/collection`) ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}`}
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
			<span>Search</span>
		</a>

		<a
			href={`/${lang}/wishlist`}
			class={`relative flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${currentPath === `/${lang}/wishlist` ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}`}
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
			</svg>
			<span>Wishlist</span>
			{#if $wishlistCount > 0}
				<span class="absolute -right-1 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[10px] text-white">
					{$wishlistCount}
				</span>
			{/if}
		</a>

		<a
			href={`/${lang}/cart`}
			class={`relative flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${currentPath === `/${lang}/cart` ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}`}
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
			</svg>
			<span>Cart</span>
			{#if $cart.totalQuantity > 0}
				<span class="absolute -right-1 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[10px] text-white">
					{$cart.totalQuantity}
				</span>
			{/if}
		</a>

		<a
			href={`/${lang}/account`}
			class={`flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${currentPath === `/${lang}/account` ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}`}
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
			</svg>
			<span>Account</span>
		</a>
	</div>
</nav>
