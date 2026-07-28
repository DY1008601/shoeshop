<script lang="ts">
	import { formatPrice } from '$lib/utils/format';
	import type { Product } from '$lib/shopify/types';
	import { page } from '$app/stores';
	import { cart } from '$lib/stores/cart';
	import { t, loadTranslations } from '$lib/i18n';
	import WishlistButton from '$lib/components/WishlistButton.svelte';
	import ImageGallery from '$lib/components/product/ImageGallery.svelte';
	import { onMount } from 'svelte';

	interface Props {
		product: Product;
		open: boolean;
		onclose: () => void;
	}

	let { product, open, onclose }: Props = $props();

	onMount(() => {
		cart.load();
	});

	let lang = $derived($page.params.lang || 'en');
	let translations = $derived(loadTranslations(lang));

	let selectedSize = $state('');
	let added = $state(false);

	let availableSizes = $derived(
		[...new Set(product.variants.edges
			.map((v) => v.node.selectedOptions.find((o) => o.name === 'Size')?.value)
			.filter(Boolean))]
	);

	let selectedVariant = $derived(
		product.variants.edges.find(
			(v) => v.node.selectedOptions.find((o) => o.name === 'Size')?.value === selectedSize
		)?.node ?? null
	);

	let images = $derived(
		product.images.edges.length > 0
			? product.images.edges.map((e) => ({ url: e.node.url, alt: e.node.altText || product.title }))
			: [{ url: product.featuredImage?.url || '', alt: product.title }]
	);

	function handleAdd() {
		if (!selectedVariant?.availableForSale) return;
		cart.addItem(selectedVariant.id, 1, product, selectedVariant);
		added = true;
		setTimeout(() => { added = false; }, 2000);
	}

	function handleBackdrop(e: MouseEvent) {
		if (e.target === e.currentTarget) onclose();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onclose();
	}
</script>

<svelte:window onkeydown={open ? handleKeydown : undefined} />

{#if open}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		onclick={handleBackdrop}
		onkeydown={(e) => { if (e.key === 'Escape') onclose(); }}
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		aria-label="Quick view: {product.title}"
		tabindex="0"
	>
		<div class="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
			<button
				onclick={onclose}
				aria-label="Close quick view"
				class="absolute right-4 top-4 z-10 rounded-full bg-white p-2 text-gray-500 shadow-sm hover:text-gray-900"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			<div class="grid md:grid-cols-2">
				<div class="bg-gray-50">
					<ImageGallery {images} />
				</div>

				<div class="p-6">
					{#if product.collections.edges[0]}
						<span class="text-xs font-medium text-gray-500 uppercase">
							{product.collections.edges[0].node.title}
						</span>
					{/if}

					<div class="mt-1 flex items-center gap-2">
						<h2 class="text-xl font-bold text-gray-900">
							<a href={`/${lang}/products/${product.handle}`} class="hover:underline">{product.title}</a>
						</h2>
						<WishlistButton handle={product.handle} size="sm" />
					</div>

					<div class="mt-2 flex items-baseline gap-2">
						<span class="text-lg font-bold text-gray-900">
							{formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
						</span>
						{#if product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount}
							<span class="text-sm text-gray-500">
								&ndash; {formatPrice(product.priceRange.maxVariantPrice.amount, product.priceRange.maxVariantPrice.currencyCode)}
							</span>
						{/if}
					</div>

					<div class="mt-4">
						<h3 class="text-sm font-medium text-gray-900">{t(translations, 'product.size')}</h3>
						<div class="mt-1 flex flex-wrap gap-2">
							{#each availableSizes as size}
								{@const variant = product.variants.edges.find((v) => v.node.selectedOptions.find((o) => o.name === 'Size')?.value === size)?.node}
								<button
									onclick={() => (selectedSize = size)}
									disabled={!variant?.availableForSale}
									class="rounded-lg border px-3 py-1.5 text-xs transition"
									class:border-gray-900={selectedSize === size}
									class:bg-gray-900={selectedSize === size}
									class:text-white={selectedSize === size}
									class:border-gray-300={selectedSize !== size && variant?.availableForSale}
									class:text-gray-700={selectedSize !== size && variant?.availableForSale}
									class:hover:border-gray-500={selectedSize !== size && variant?.availableForSale}
									class:cursor-not-allowed={!variant?.availableForSale}
									class:border-gray-200={!variant?.availableForSale}
									class:text-gray-300={!variant?.availableForSale}
									class:line-through={!variant?.availableForSale}
								>
									{size}
								</button>
							{/each}
						</div>
					</div>

					<button
						onclick={handleAdd}
						disabled={!selectedVariant?.availableForSale || added}
						class="mt-6 w-full rounded-lg py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed"
						class:bg-gray-900={!added}
						class:hover:bg-gray-800={!added}
						class:bg-green-600={added}
						class:bg-gray-300={!selectedVariant?.availableForSale && !added}
					>
						{#if added}
							Added!
						{:else if !selectedVariant}
							{t(translations, 'product.selectSize')}
						{:else if !selectedVariant.availableForSale}
							{t(translations, 'product.soldOut')}
						{:else}
							{t(translations, 'product.addToCart')} &mdash; {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
						{/if}
					</button>

					<a
						href={`/${lang}/products/${product.handle}`}
						class="mt-3 block text-center text-sm font-medium text-gray-500 underline hover:text-gray-900"
					>
						View full details
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}
