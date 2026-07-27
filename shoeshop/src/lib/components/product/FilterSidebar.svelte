<script lang="ts">
	import { page } from '$app/stores';
	import { products } from '$lib/data/products';

	interface Props {
		onchange: (filters: Filters) => void;
	}

	export interface Filters {
		brands: string[];
		minPrice: string;
		maxPrice: string;
	}

	let { onchange }: Props = $props();

	let brands = $derived([...new Set(products.map((p) => p.title.split(' ')[0]))].sort());
	let selectedBrands = $state<string[]>([]);
	let minPrice = $state('');
	let maxPrice = $state('');

	function toggleBrand(brand: string) {
		if (selectedBrands.includes(brand)) {
			selectedBrands = selectedBrands.filter((b) => b !== brand);
		} else {
			selectedBrands = [...selectedBrands, brand];
		}
		emit();
	}

	function handlePriceChange() {
		emit();
	}

	function clearAll() {
		selectedBrands = [];
		minPrice = '';
		maxPrice = '';
		emit();
	}

	function emit() {
		onchange({ brands: selectedBrands, minPrice, maxPrice });
	}

	let hasFilters = $derived(selectedBrands.length > 0 || minPrice || maxPrice);
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h3 class="text-sm font-semibold text-gray-900">Filters</h3>
		{#if hasFilters}
			<button onclick={clearAll} class="text-xs text-gray-500 underline hover:text-gray-900">
				Clear all
			</button>
		{/if}
	</div>

	<div>
		<h4 class="mb-2 text-xs font-medium text-gray-500 uppercase">Brand</h4>
		<div class="space-y-1">
			{#each brands as brand}
				<label class="flex cursor-pointer items-center gap-2">
					<input
						type="checkbox"
						checked={selectedBrands.includes(brand)}
						onchange={() => toggleBrand(brand)}
						class="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
					/>
					<span class="text-sm text-gray-700">{brand}</span>
				</label>
			{/each}
		</div>
	</div>

	<div>
		<h4 class="mb-2 text-xs font-medium text-gray-500 uppercase">Price Range</h4>
		<div class="flex items-center gap-2">
			<input
				type="number"
				bind:value={minPrice}
				oninput={handlePriceChange}
				placeholder="Min"
				class="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-500 focus:outline-none"
			/>
			<span class="text-gray-400">&ndash;</span>
			<input
				type="number"
				bind:value={maxPrice}
				oninput={handlePriceChange}
				placeholder="Max"
				class="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-500 focus:outline-none"
			/>
		</div>
	</div>
</div>
