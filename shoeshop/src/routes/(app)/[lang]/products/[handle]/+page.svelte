<script lang="ts">
	import { page } from '$app/stores';
	import { products } from '$lib/data/products';
	import { formatPrice } from '$lib/utils/format';
	import { cart } from '$lib/stores/cart';
	import RelatedProducts from '$lib/components/product/RelatedProducts.svelte';
	import Reviews from '$lib/components/product/Reviews.svelte';
	import ImageZoom from '$lib/components/product/ImageZoom.svelte';
	import ImageGallery from '$lib/components/product/ImageGallery.svelte';
	import WishlistButton from '$lib/components/WishlistButton.svelte';
	import SkeletonProductDetail from '$lib/components/SkeletonProductDetail.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		cart.load();
		try {
			const handle = $page.params.handle;
			if (handle) {
				const stored = localStorage.getItem('shoeshop-recent');
				const existing: string[] = stored ? JSON.parse(stored) : [];
				const updated = [handle, ...existing.filter((h) => h !== handle)].slice(0, 10);
				localStorage.setItem('shoeshop-recent', JSON.stringify(updated));
			}
		} catch { /* */ }
	});

	let lang = $derived($page.params.lang || 'en');
	let loading = $state(true);

	onMount(() => {
		loading = false;
	});

	let product = $derived(products.find((p) => p.handle === $page.params.handle));

	let selectedSize = $state('');
	let selectedColor = $state('');
	let addedToCart = $state(false);

	const sampleReviews = [
		{ name: 'Michael R.', rating: 5, date: '2024-03-15', title: 'Best running shoes I have owned', body: 'Incredibly comfortable right out of the box. I have put about 50 miles on them and they still feel great. The cushioning is perfect for my daily runs.', verified: true },
		{ name: 'Sarah K.', rating: 4, date: '2024-03-10', title: 'Great shoes, runs slightly small', body: 'The quality is excellent and they look even better in person. I would recommend going half a size up from your normal size. Otherwise perfect.', verified: true },
		{ name: 'David L.', rating: 5, date: '2024-02-28', title: 'Game changer for my workouts', body: 'Switched from another brand and the difference is night and day. My feet feel supported during HIIT sessions and the grip is outstanding.', verified: true }
	];

	let availableSizes = $derived(
		product
			? [...new Set(product.variants.edges
				.filter((v) => !selectedColor || v.node.selectedOptions.find((o) => o.name === 'Color')?.value === selectedColor)
				.map((v) => v.node.selectedOptions.find((o) => o.name === 'Size')?.value)
				.filter(Boolean))]
			: []
	);

	let availableColors = $derived(
		product
			? [...new Set(product.variants.edges
				.map((v) => v.node.selectedOptions.find((o) => o.name === 'Color')?.value)
				.filter(Boolean))]
			: []
	);

	let selectedVariant = $derived(
		product?.variants.edges.find(
			(v) =>
				v.node.selectedOptions.find((o) => o.name === 'Size')?.value === selectedSize &&
				(!selectedColor || v.node.selectedOptions.find((o) => o.name === 'Color')?.value === selectedColor)
		)?.node ?? null
	);

	function handleAddToCart() {
		if (!selectedVariant || !selectedVariant.availableForSale || !product) return;
		cart.addItem(selectedVariant.id, 1, product, selectedVariant);
		addedToCart = true;
		setTimeout(() => { addedToCart = false; }, 2000);
	}
</script>

<svelte:head>
	<title>{product?.seo.title || 'Product'} - ShoeShop</title>
	<meta name="description" content={product?.seo.description || ''} />
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "Product",
			"name": product?.title,
			"description": product?.description,
			"image": product?.featuredImage?.url,
			"offers": product ? {
				"@type": "Offer",
				"price": product.priceRange.minVariantPrice.amount,
				"priceCurrency": product.priceRange.minVariantPrice.currencyCode,
				"availability": product.variants.edges.some(v => v.node.availableForSale) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
			} : undefined,
			"brand": product ? {
				"@type": "Brand",
				"name": product.title.split(' ')[0]
			} : undefined,
			"aggregateRating": {
				"@type": "AggregateRating",
				"ratingValue": "4.7",
				"reviewCount": sampleReviews.length.toString()
			}
		})}
	</script>
</svelte:head>

{#if loading}
	<div class="mx-auto max-w-7xl px-4 py-12">
		<SkeletonProductDetail />
	</div>
{:else if !product}
	<div class="mx-auto max-w-7xl px-4 py-16 text-center">
		<p class="text-gray-500">Product not found.</p>
		<a href={`/${lang}/products`} class="mt-4 inline-block text-sm font-medium text-gray-900 underline">
			Back to products
		</a>
	</div>
{:else}
	<div class="mx-auto max-w-7xl px-4 py-12">
		<div class="mb-8">
			<Breadcrumb items={[{ label: 'Home', href: `/${lang}` }, { label: 'Products', href: `/${lang}/products` }, { label: product.title }]} />
		</div>

		<div class="grid gap-8 md:grid-cols-2">
			<div class="relative">
				{#if product.images.edges.length > 0}
					{@const galleryImages = product.images.edges.map((e) => ({ url: e.node.url, alt: e.node.altText || product.title }))}
					<ImageGallery images={galleryImages} />
				{:else if product.featuredImage}
					<ImageZoom src={product.featuredImage.url} alt={product.featuredImage.altText || product.title} />
				{/if}
			</div>

			<div>
				{#if product.collections.edges[0]}
					<span class="text-xs font-medium text-gray-500 uppercase">
						{product.collections.edges[0].node.title}
					</span>
				{/if}

				<h1 class="mt-1 flex items-center gap-2 text-3xl font-bold text-gray-900">
					<span>{product.title}</span>
					<WishlistButton handle={product.handle} />
				</h1>

				<div class="mt-3 flex items-baseline gap-2">
					<span class="text-2xl font-bold text-gray-900">
						{formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
					</span>
					{#if product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount}
						<span class="text-lg text-gray-500">
							&ndash; {formatPrice(product.priceRange.maxVariantPrice.amount, product.priceRange.maxVariantPrice.currencyCode)}
						</span>
					{/if}
				</div>

				{#if availableColors.length > 0}
					<div class="mt-6">
						<h3 class="text-sm font-medium text-gray-900">Color</h3>
						<div class="mt-2 flex flex-wrap gap-2">
							{#each availableColors as color}
								<button
									onclick={() => { selectedColor = color; selectedSize = ''; }}
									class="rounded-lg border px-4 py-2 text-sm transition"
									class:border-gray-900={selectedColor === color}
									class:bg-gray-900={selectedColor === color}
									class:text-white={selectedColor === color}
									class:border-gray-300={selectedColor !== color}
									class:text-gray-700={selectedColor !== color}
									class:hover:border-gray-500={selectedColor !== color}
								>
									{color}
								</button>
							{/each}
						</div>
					</div>
				{/if}

				<div class="mt-6">
					<h3 class="text-sm font-medium text-gray-900">Size</h3>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each availableSizes as size}
							{@const variant = product.variants.edges.find((v) => v.node.selectedOptions.find((o) => o.name === 'Size')?.value === size && (!selectedColor || v.node.selectedOptions.find((o) => o.name === 'Color')?.value === selectedColor))?.node}
							<button
								onclick={() => (selectedSize = size)}
								disabled={!variant?.availableForSale}
								class="rounded-lg border px-4 py-2 text-sm transition"
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
					onclick={handleAddToCart}
					disabled={!selectedVariant?.availableForSale || addedToCart}
					class="mt-8 w-full rounded-lg py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed"
					class:bg-gray-900={!addedToCart}
					class:hover:bg-gray-800={!addedToCart}
					class:bg-green-600={addedToCart}
					class:bg-gray-300={!selectedVariant?.availableForSale && !addedToCart}
				>
					{#if addedToCart}
						Added! &mdash; View Cart
					{:else if !selectedVariant}
						Select size
					{:else if !selectedVariant.availableForSale}
						Sold Out
					{:else}
						Add to Cart &mdash; {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
					{/if}
				</button>

				<div class="mt-8 border-t border-gray-200 pt-8">
					<h3 class="mb-3 text-sm font-medium text-gray-900">Description</h3>
					<div class="prose prose-sm text-gray-600">
						{@html product.descriptionHtml}
					</div>
				</div>
			</div>
		</div>

		<Reviews reviews={sampleReviews} />

		<RelatedProducts currentHandle={product.handle} category={product.collections.edges[0]?.node.handle} />
	</div>
{/if}
