<script lang="ts">
	import { page } from '$app/stores';
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import FilterSidebar from '$lib/components/product/FilterSidebar.svelte';
	import SkeletonCard from '$lib/components/SkeletonCard.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import type { Filters } from '$lib/components/product/FilterSidebar.svelte';
	import { products } from '$lib/data/products';
	import { onMount } from 'svelte';

	let lang = $derived($page.params.lang || 'en');
	let loading = $state(true);

	onMount(() => {
		loading = false;
	});

	let sortBy = $state('newest');
	let searchQuery = $state('');
	let activeFilters = $state<Filters>({ brands: [], minPrice: '', maxPrice: '' });
	let mobileFilterOpen = $state(false);

	let sorted = $derived.by(() => {
		let result = [...products];

		if (activeFilters.brands.length > 0) {
			result = result.filter((p) => activeFilters.brands.includes(p.title.split(' ')[0]));
		}
		if (activeFilters.minPrice) {
			result = result.filter((p) => parseFloat(p.priceRange.minVariantPrice.amount) >= parseFloat(activeFilters.minPrice));
		}
		if (activeFilters.maxPrice) {
			result = result.filter((p) => parseFloat(p.priceRange.minVariantPrice.amount) <= parseFloat(activeFilters.maxPrice));
		}

		if (searchQuery) {
			const q = searchQuery.toLowerCase();
			result = result.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
		}
		switch (sortBy) {
			case 'price-low':
				result.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
				break;
			case 'price-high':
				result.sort((a, b) => parseFloat(b.priceRange.maxVariantPrice.amount) - parseFloat(a.priceRange.maxVariantPrice.amount));
				break;
		}
		return result;
	});
</script>

<svelte:head>
	<title>All Sneakers - ShoeShop</title>
	<meta name="description" content="Browse our curated collection of premium sneakers from Nike, Adidas, New Balance, HOKA, and more." />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-12">
	<div class="mb-6">
		<Breadcrumb items={[{ label: 'Home', href: `/${lang}` }, { label: 'Products' }]} />
	</div>

	<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-3xl font-bold text-gray-900">All Sneakers</h1>
			<p class="mt-1 text-sm text-gray-500">{sorted.length} products</p>
		</div>

		<div class="flex items-center gap-3">
			<div class="relative">
				<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search sneakers..."
					class="rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-gray-500 focus:outline-none"
				/>
			</div>

			<select
				bind:value={sortBy}
				class="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none"
			>
				<option value="newest">Newest</option>
				<option value="price-low">Price: Low to High</option>
				<option value="price-high">Price: High to Low</option>
			</select>

			<button
				onclick={() => (mobileFilterOpen = !mobileFilterOpen)}
				class="rounded-lg border border-gray-300 px-4 py-2 text-sm lg:hidden"
			>
				Filters
			</button>
		</div>
	</div>

	<div class="flex gap-8">
		<div class="hidden w-48 flex-shrink-0 lg:block">
			<FilterSidebar onchange={(f) => (activeFilters = f)} />
		</div>

		<div class="flex-1">
			{#if loading}
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
					<SkeletonCard count={6} />
				</div>
			{:else if mobileFilterOpen}
				<div class="mb-6 rounded-xl border border-gray-200 p-4 lg:hidden">
					<FilterSidebar onchange={(f) => (activeFilters = f)} />
				</div>
			{/if}

			{#if sorted.length === 0}
				<div class="py-16 text-center">
					<p class="text-gray-500">No sneakers found. Try different filters or search terms.</p>
				</div>
			{:else}
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
					{#each sorted as product (product.id)}
						<ProductCard {product} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
