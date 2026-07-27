<script lang="ts">
	import type { PageData } from './$types';

	let { data } = $props();
</script>

<svelte:head>
	<title>Products - ShoeShop</title>
	<meta name="description" content="Browse our collection of premium sneakers." />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-12">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">All Sneakers</h1>

	<div class="mb-8 flex flex-wrap items-center gap-4">
		<select class="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none">
			<option value="newest">Newest</option>
			<option value="best-selling">Best Selling</option>
			<option value="price-low">Price: Low to High</option>
			<option value="price-high">Price: High to Low</option>
		</select>
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		<p class="col-span-full py-16 text-center text-gray-500">
			Connect your Shopify store to display products here.
		</p>
	</div>
</div>
