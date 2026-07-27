<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { cart } from '$lib/stores/cart';
	import { formatPrice } from '$lib/utils/format';
	import PayPalButton from '$lib/components/PayPalButton.svelte';
	import TrustBadges from '$lib/components/checkout/TrustBadges.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		cart.load();
	});

	let lang = $derived($page.params.lang || 'en');

	function handlePayPalSuccess(orderID: string) {
		cart.clear();
		goto(`/${lang}/orders/success?order=${orderID}`);
	}
</script>

<svelte:head>
	<title>Checkout - ShoeShop</title>
	<meta name="description" content="Complete your purchase securely with PayPal." />
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-12">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

	{#if $cart.totalQuantity === 0}
		<div class="py-16 text-center">
			<p class="mb-4 text-lg text-gray-500">Your cart is empty</p>
			<a
				href={`/${lang}/products`}
				class="inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
			>
				Continue Shopping
			</a>
		</div>
	{:else}
		<div class="grid gap-8 lg:grid-cols-5">
			<div class="lg:col-span-3">
				<h2 class="mb-4 text-lg font-semibold text-gray-900">Order Summary</h2>
				<div class="space-y-3">
					{#each $cart.items as item (item.variantId)}
						<div class="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
							<div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
								{#if item.image}
									<img src={item.image.url} alt={item.title} class="h-full w-full object-cover" />
								{:else}
									<div class="flex h-full w-full items-center justify-center text-gray-300 text-xs">No img</div>
								{/if}
							</div>
							<div class="min-w-0 flex-1">
								<p class="text-sm font-medium text-gray-900 truncate">{item.title}</p>
								<p class="text-xs text-gray-500">{item.variantTitle} &times; {item.quantity}</p>
							</div>
							<p class="text-sm font-semibold text-gray-900">
								{formatPrice((parseFloat(item.price.amount) * item.quantity).toString(), item.price.currencyCode)}
							</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="lg:col-span-2">
				<div class="sticky top-8 rounded-xl border border-gray-200 p-6">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Payment</h2>

					<div class="mb-6 space-y-2 text-sm">
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

					<PayPalButton
						total={$cart.totalAmount}
						currency={$cart.currencyCode}
						onSuccess={handlePayPalSuccess}
					/>

					<TrustBadges />
				</div>
			</div>
		</div>

		<div class="mt-6 text-center">
			<a href={`/${lang}/cart`} class="text-sm text-gray-500 underline hover:text-gray-900">
				&larr; Back to Cart
			</a>
		</div>
	{/if}
</div>
