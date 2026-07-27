<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { products } from '$lib/data/products';
	import { formatPrice } from '$lib/utils/format';

	let lang = $derived($page.params.lang || 'en');
	let query = $state('');
	let focused = $state(false);

	let results = $derived(
		query.length > 0
			? products
					.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
					.slice(0, 5)
			: []
	);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (query.trim()) {
			goto(`/${lang}/products?q=${encodeURIComponent(query.trim())}`);
			query = '';
		}
	}

	function handleSelect(handle: string) {
		goto(`/${lang}/products/${handle}`);
		query = '';
	}
</script>

<div class="relative">
	<form onsubmit={handleSubmit} class="flex">
		<input
			type="search"
			bind:value={query}
			onfocus={() => (focused = true)}
			onblur={() => setTimeout(() => (focused = false), 150)}
			placeholder="Search sneakers..."
			class="w-48 rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm placeholder:text-gray-400 focus:w-64 focus:border-gray-500 focus:bg-white focus:outline-none transition-all"
		/>
	</form>

	{#if focused && results.length > 0}
		<div class="absolute left-0 top-full mt-1 w-full min-w-[260px] rounded-lg border border-gray-200 bg-white shadow-lg">
			{#each results as product (product.id)}
				<button
					onclick={() => handleSelect(product.handle)}
					class="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
				>
					<div class="h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-gray-100">
						{#if product.featuredImage}
							<img src={product.featuredImage.url} alt={product.title} class="h-full w-full object-cover" />
						{/if}
					</div>
					<div class="min-w-0 flex-1">
						<p class="font-medium text-gray-900 truncate">{product.title}</p>
						<p class="text-xs text-gray-500">
							{product.collections.edges[0]?.node.title || ''}
						</p>
					</div>
					<span class="text-sm font-semibold text-gray-900">
						{formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
					</span>
				</button>
			{/each}
		</div>
	{/if}
</div>
