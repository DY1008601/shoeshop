<script lang="ts">
	import { page } from '$app/stores';
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { products } from '$lib/data/products';

	let lang = $derived($page.params.lang || 'en');
	let slug = $derived($page.params.slug);

	const collectionNames: Record<string, string> = {
		running: 'Running',
		lifestyle: 'Lifestyle',
		performance: 'Performance'
	};

	let name = $derived(collectionNames[slug] || slug);
	let items = $derived(products.filter((p) => p.collections.edges[0]?.node.handle === slug));
</script>

<svelte:head>
	<title>{name} Sneakers - ShoeShop</title>
	<meta name="description" content={`Browse our ${name.toLowerCase()} sneaker collection. Premium footwear from top brands.`} />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-12">
	<div class="mb-6">
		<Breadcrumb items={[{ label: 'Home', href: `/${lang}` }, { label: 'Products', href: `/${lang}/products` }, { label: name }]} />
	</div>

	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900">{name} Sneakers</h1>
		<p class="mt-1 text-sm text-gray-500">{items.length} products</p>
	</div>

	{#if items.length === 0}
		<div class="py-16 text-center">
			<p class="text-gray-500">No sneakers found in this collection.</p>
			<a href={`/${lang}/products`} class="mt-4 inline-block text-sm font-medium text-gray-900 underline">
				Browse all products
			</a>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each items as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>
	{/if}
</div>
