<script lang="ts">
	import { page } from '$app/stores';
	import { cart, cartCount } from '$lib/stores/cart';

	let lang = $derived($page.params.lang || 'en');
</script>

<svelte:head>
	<title>Cart - ShoeShop</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-12">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

	{#if $cartCount === 0}
		<div class="py-16 text-center">
			<p class="mb-4 text-gray-500">Your cart is empty.</p>
			<a href={`/${lang}/products`} class="text-sm font-medium text-gray-900 underline">
				Continue Shopping
			</a>
		</div>
	{:else}
		<div class="space-y-4">
			{#each $cart.items as item (item.id)}
				<div class="flex items-center gap-4 rounded-lg border border-gray-200 p-4">
					{#if item.image}
						<img src={item.image.url} alt={item.title} class="h-20 w-20 rounded-lg object-cover" />
					{/if}
					<div class="flex-1">
						<h3 class="font-medium text-gray-900">{item.title}</h3>
						<p class="text-sm text-gray-500">{item.variantTitle}</p>
						<p class="mt-1 font-medium text-gray-900">{item.price.amount} {item.price.currencyCode}</p>
					</div>
					<div class="flex items-center gap-2">
						<span class="text-sm text-gray-500">Qty: {item.quantity}</span>
					</div>
					<button class="text-sm text-red-500 hover:text-red-700">Remove</button>
				</div>
			{/each}
		</div>

		<div class="mt-8 border-t border-gray-200 pt-6">
			<div class="flex items-center justify-between text-lg font-bold text-gray-900">
				<span>Total</span>
				<span>{$cart.totalAmount} {$cart.currencyCode}</span>
			</div>
			<button
				class="mt-4 w-full rounded-lg bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
			>
				Checkout
			</button>
		</div>
	{/if}
</div>
