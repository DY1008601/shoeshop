<script lang="ts">
	import { formatPrice } from '$lib/utils/format';
	import type { Product } from '$lib/shopify/types';
	import { page } from '$app/stores';

	let { product }: { product: Product } = $props();
	let lang = $derived($page.params.lang || 'en');

	let firstVariant = $derived(product.variants.edges[0]?.node);
</script>

<a href={`/${lang}/products/${product.handle}`} class="group">
	<div class="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
		{#if product.featuredImage}
			<img
				src={product.featuredImage.url}
				alt={product.featuredImage.altText || product.title}
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center text-gray-400">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			</div>
		{/if}
		{#if product.collections.edges[0]}
			<span class="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
				{product.collections.edges[0].node.title}
			</span>
		{/if}
		{#if firstVariant?.compareAtPrice}
			<span class="absolute right-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
				Sale
			</span>
		{/if}
	</div>

	<div class="mt-3 space-y-1">
		<h3 class="text-sm font-medium text-gray-900 group-hover:underline">
			{product.title}
		</h3>
		<div class="flex items-center gap-2">
			<span class="text-sm font-semibold text-gray-900">
				{formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
			</span>
			{#if product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount}
				<span class="text-xs text-gray-500">
					&ndash; {formatPrice(product.priceRange.maxVariantPrice.amount, product.priceRange.maxVariantPrice.currencyCode)}
				</span>
			{/if}
		</div>
		{#if firstVariant?.compareAtPrice}
			<span class="text-xs text-red-500 line-through">
				{formatPrice(firstVariant.compareAtPrice.amount, firstVariant.compareAtPrice.currencyCode)}
			</span>
		{/if}
	</div>
</a>
