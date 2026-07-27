<script lang="ts">
	import { page } from '$app/stores';

	let lang = $derived($page.params.lang || 'en');
</script>

<svelte:head>
	<title>Product - ShoeShop</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-12">
	<div class="grid gap-8 md:grid-cols-2">
		<div class="aspect-square rounded-xl bg-gray-100"></div>
		<div>
			<h1 class="text-3xl font-bold text-gray-900">Product Name</h1>
			<p class="mt-2 text-2xl font-bold text-gray-900">$0.00</p>
			<p class="mt-4 text-gray-600">Product description will appear here when connected to Shopify.</p>
			<button
				class="mt-6 w-full rounded-lg bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
			>
				Add to Cart
			</button>
		</div>
	</div>
</div>
