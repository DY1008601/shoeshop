<script lang="ts">
	import { page } from '$app/stores';

	let lang = $derived($page.params.lang || 'en');
	let orderID = $derived($page.url.searchParams.get('order') || '');
	let orderNumber = $derived('#' + orderID.replace(/^mock_order_/, '').slice(0, 8).toUpperCase());
</script>

<svelte:head>
	<title>Order Confirmed - ShoeShop</title>
	<meta name="description" content="Your order has been placed successfully." />
</svelte:head>

<div class="mx-auto max-w-2xl px-4 py-16 text-center">
	<div class="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
		</svg>
	</div>

	<h1 class="mb-2 text-3xl font-bold text-gray-900">Order Confirmed!</h1>
	<p class="mb-6 text-gray-500">Thank you for your purchase. Your order {orderNumber} has been placed.</p>

	<p class="mb-8 text-sm text-gray-400">
		A confirmation email will be sent shortly. You can track your order status from your account.
	</p>

	<div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
		<a
			href={`/${lang}/products`}
			class="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
		>
			Continue Shopping
		</a>
		<a
			href={`/${lang}/blog`}
			class="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
		>
			Read Our Blog
		</a>
	</div>
</div>
