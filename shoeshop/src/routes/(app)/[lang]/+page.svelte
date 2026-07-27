<script lang="ts">
	import { page } from '$app/stores';
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import { products } from '$lib/data/products';

	let lang = $derived($page.params.lang || 'en');
	let featured = $derived(products.slice(0, 4));
</script>

<svelte:head>
	<title>ShoeShop - Premium Sneakers</title>
	<meta name="description" content="Discover premium sneakers at ShoeShop. Quality footwear for every style." />
</svelte:head>

<section class="relative bg-gray-900 text-white">
	<div class="mx-auto max-w-7xl px-4 py-24 text-center md:py-32">
		<h1 class="text-4xl font-bold tracking-tight md:text-6xl">
			Step Into Style
		</h1>
		<p class="mt-4 text-lg text-gray-300 md:text-xl">
			Discover our curated collection of premium sneakers. Built for comfort, designed for life.
		</p>
		<div class="mt-8 flex justify-center gap-4">
			<a
				href={`/${lang}/products`}
				class="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
			>
				Shop Now
			</a>
			<a
				href={`/${lang}/blog`}
				class="rounded-lg border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
			>
				Read Our Blog
			</a>
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 py-16">
	<h2 class="mb-8 text-center text-2xl font-bold text-gray-900">Why Shop With Us</h2>
	<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
		<div class="rounded-xl border border-gray-200 p-6 text-center">
			<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-semibold text-gray-900">Authentic Quality</h3>
			<p class="text-sm text-gray-600">Every pair is sourced from authorized retailers, guaranteed 100% authentic.</p>
		</div>

		<div class="rounded-xl border border-gray-200 p-6 text-center">
			<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-semibold text-gray-900">Free Shipping</h3>
			<p class="text-sm text-gray-600">Free worldwide shipping on all orders over $100. Fast and reliable delivery.</p>
		</div>

		<div class="rounded-xl border border-gray-200 p-6 text-center">
			<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-semibold text-gray-900">Easy Returns</h3>
			<p class="text-sm text-gray-600">30-day hassle-free returns. If it doesn't fit, send it back with no questions asked.</p>
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 py-16">
	<div class="mb-8 flex items-center justify-between">
		<h2 class="text-2xl font-bold text-gray-900">Featured Sneakers</h2>
		<a href={`/${lang}/products`} class="text-sm font-medium text-gray-900 underline">
			View All
		</a>
	</div>
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each featured as product (product.id)}
			<ProductCard {product} />
		{/each}
	</div>
</section>

<section class="bg-gray-50 py-16">
	<div class="mx-auto max-w-7xl px-4 text-center">
		<h2 class="mb-4 text-2xl font-bold text-gray-900">Join Our Newsletter</h2>
		<p class="mb-6 text-gray-600">Get the latest sneaker drops and exclusive offers straight to your inbox.</p>
		<form class="mx-auto flex max-w-md gap-2" onsubmit={(e) => e.preventDefault()}>
			<input
				type="email"
				placeholder="your@email.com"
				class="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none"
			/>
			<button
				type="submit"
				class="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
			>
				Subscribe
			</button>
		</form>
	</div>
</section>
