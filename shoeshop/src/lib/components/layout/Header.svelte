<script lang="ts">
	import { page } from '$app/stores';
	import { cart, cartCount } from '$lib/stores/cart';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import CartDrawer from '$lib/components/cart/CartDrawer.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	onMount(() => {
		cart.load();
	});

	let mobileMenuOpen = $state(false);
	let cartOpen = $state(false);
	let lang = $derived($page.params.lang || 'en');

	let navLinks = $derived([
		{ href: `/${lang}/products`, label: 'Products' },
		{ href: `/${lang}/blog`, label: 'Blog' }
	]);

	const languages = [
		{ code: 'en', label: 'EN' },
		{ code: 'fr', label: 'FR' },
		{ code: 'de', label: 'DE' },
		{ code: 'it', label: 'IT' },
		{ code: 'es', label: 'ES' }
	];
</script>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape') cartOpen = false; }} />

<header class="sticky top-0 z-40 border-b border-gray-200 bg-white">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
		<a href={`/${lang}`} class="text-xl font-bold tracking-tight text-gray-900">
			ShoeShop
		</a>

		<nav class="hidden items-center gap-6 md:flex">
			{#each navLinks as link}
				<a href={link.href} class="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="hidden md:block">
			<SearchBar />
		</div>

		<div class="flex items-center gap-4">
			<div class="hidden items-center gap-2 md:flex">
				{#each languages as l}
					<a
						href={`/${l.code}${$page.url.pathname.slice(3) || '/'}`}
						class="text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
						class:font-bold={lang === l.code}
						class:text-gray-900={lang === l.code}
					>
						{l.label}
					</a>
					{#if l !== languages[languages.length - 1]}
						<span class="text-gray-300">|</span>
					{/if}
				{/each}
			</div>

			<button onclick={() => (cartOpen = true)} class="relative text-gray-700 hover:text-gray-900" aria-label="Open cart">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
				</svg>
				{#if $cartCount > 0}
					<span class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
						{$cartCount}
					</span>
				{/if}
			</button>

			<button
				class="md:hidden"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label="Toggle menu"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>
	</div>

	{#if mobileMenuOpen}
		<div class="border-t border-gray-200 md:hidden" transition:fly={{ y: -10, duration: 200 }}>
			{#each navLinks as link}
				<a
					href={link.href}
					onclick={() => (mobileMenuOpen = false)}
					class="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					{link.label}
				</a>
			{/each}
			<div class="flex gap-2 px-4 py-3">
				{#each languages as l, i}
					<a
						href={`/${l.code}${$page.url.pathname.slice(3) || '/'}`}
						class="text-xs font-medium text-gray-500 hover:text-gray-900"
						class:font-bold={lang === l.code}
						class:text-gray-900={lang === l.code}
					>
						{l.label}
					</a>
					{#if i < languages.length - 1}
						<span class="text-gray-300">|</span>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</header>

<CartDrawer open={cartOpen} onclose={() => (cartOpen = false)} />
