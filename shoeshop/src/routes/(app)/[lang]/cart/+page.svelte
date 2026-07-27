<script lang="ts">
	import { page } from '$app/stores';
	import { cart } from '$lib/stores/cart';
	import { formatPrice } from '$lib/utils/format';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		cart.load();
	});

	let lang = $derived($page.params.lang || 'en');
</script>

<svelte:head>
	<title>Shopping Cart - ShoeShop</title>
	<meta name="description" content="Review your shopping cart and checkout." />
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-12">
	<div class="mb-6">
		<Breadcrumb items={[{ label: 'Home', href: `/${lang}` }, { label: 'Cart' }]} />
	</div>
	<h1 class="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

	{#if $cart.totalQuantity === 0}
		<div class="py-16 text-center">
			<svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
			</svg>
			<p class="mb-4 text-lg text-gray-500">Your cart is empty</p>
			<a
				href={`/${lang}/products`}
				class="inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
			>
				Continue Shopping
			</a>
		</div>
	{:else}
		<div class="space-y-4">
			{#each $cart.items as item (item.variantId)}
				<div class="flex items-center gap-4 rounded-xl border border-gray-200 p-4">
					<div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
						{#if item.image}
							<img src={item.image.url} alt={item.title} class="h-full w-full object-cover" />
						{:else}
							<div class="flex h-full w-full items-center justify-center text-gray-400">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586 4.586a2 2 0 002.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</div>
						{/if}
					</div>

					<div class="min-w-0 flex-1">
						<a href={`/${lang}/products/${item.productHandle}`} class="font-medium text-gray-900 hover:underline">
							{item.title}
						</a>
						<p class="text-sm text-gray-500">{item.variantTitle}</p>
						<p class="mt-1 font-semibold text-gray-900">
							{formatPrice(item.price.amount, item.price.currencyCode)}
						</p>
					</div>

					<div class="flex items-center gap-1 rounded-lg border border-gray-300">
						<button
							onclick={() => cart.updateQuantity(item.variantId, item.quantity - 1)}
							class="px-2 py-1 text-gray-500 hover:text-gray-900 transition"
							aria-label="Decrease quantity"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
							</svg>
						</button>
						<span class="min-w-[2rem] text-center text-sm font-medium">{item.quantity}</span>
						<button
							onclick={() => cart.updateQuantity(item.variantId, item.quantity + 1)}
							class="px-2 py-1 text-gray-500 hover:text-gray-900 transition"
							aria-label="Increase quantity"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
							</svg>
						</button>
					</div>

					<div class="text-right">
						<p class="font-semibold text-gray-900">
							{formatPrice((parseFloat(item.price.amount) * item.quantity).toString(), item.price.currencyCode)}
						</p>
						<button
							onclick={() => cart.removeItem(item.variantId)}
							class="mt-1 text-xs text-red-500 hover:text-red-700 transition"
						>
							Remove
						</button>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-8 rounded-xl border border-gray-200 p-6">
			<div class="space-y-2 text-sm">
				<div class="flex justify-between text-gray-600">
					<span>Subtotal ({$cart.totalQuantity} items)</span>
					<span class="font-medium text-gray-900">{$cart.totalAmount} {$cart.currencyCode}</span>
				</div>
				<div class="flex justify-between text-gray-600">
					<span>Shipping</span>
					<span class="text-green-600">Free</span>
				</div>
				<div class="border-t border-gray-200 pt-2">
					<div class="flex justify-between text-lg font-bold text-gray-900">
						<span>Total</span>
						<span>{$cart.totalAmount} {$cart.currencyCode}</span>
					</div>
				</div>
			</div>

			<a
				href={`/${lang}/checkout`}
				class="mt-6 block w-full rounded-lg bg-gray-900 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
			>
				Proceed to Checkout
			</a>

			<div class="mt-4 text-center">
				<a href={`/${lang}/products`} class="text-sm text-gray-500 underline hover:text-gray-900">
					Continue Shopping
				</a>
			</div>
		</div>
	{/if}
</div>
