<script lang="ts">
	import { page } from '$app/stores';
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import { products } from '$lib/data/products';
	import { wishlist } from '$lib/stores/wishlist';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { onMount } from 'svelte';

	onMount(() => { wishlist.load(); });

	let lang = $derived($page.params.lang || 'en');

	let handles = $derived.by(() => {
		let result: string[] = [];
		wishlist.subscribe((items) => { result = items; })();
		return result;
	});

	let items = $derived(handles.map((h) => products.find((p) => p.handle === h)).filter(Boolean));
</script>

<svelte:head>
	<title>Wishlist - ShoeShop</title>
	<meta name="description" content="Your saved sneakers. Save your favorites for later." />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-12">
	<div class="mb-6">
		<Breadcrumb items={[{ label: 'Home', href: `/${lang}` }, { label: 'Wishlist' }]} />
	</div>
	<h1 class="mb-8 text-3xl font-bold text-gray-900">Wishlist</h1>

	{#if items.length === 0}
		<div class="py-16 text-center">
			<p class="mb-4 text-lg text-gray-500">Your wishlist is empty</p>
			<a
				href={`/${lang}/products`}
				class="inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
			>
				Browse Products
			</a>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each items as product (product!.id)}
				<ProductCard product={product!} />
			{/each}
		</div>
	{/if}
</div>
