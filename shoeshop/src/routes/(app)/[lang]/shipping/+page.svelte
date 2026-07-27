<script lang="ts">
	import { page } from '$app/stores';
	let lang = $derived($page.params.lang || 'en');
</script>

<svelte:head>
	<title>Shipping Info - ShoeShop</title>
	<meta name="description" content="Free worldwide shipping on orders over $100. Fast and reliable delivery." />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-16">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">Shipping Information</h1>

	<div class="prose prose-gray max-w-none">
		<h2>Free Shipping</h2>
		<p>We offer free standard shipping on all orders over $100 within the United States and to most international destinations.</p>

		<h2>Shipping Options</h2>
		<table class="w-full text-sm">
			<thead><tr><th class="text-left py-2">Method</th><th class="text-left py-2">Delivery Time</th><th class="text-left py-2">Cost</th></tr></thead>
			<tbody>
				<tr><td class="py-2">Standard</td><td class="py-2">5-7 business days</td><td class="py-2">$5.99 (free over $100)</td></tr>
				<tr><td class="py-2">Express</td><td class="py-2">2-3 business days</td><td class="py-2">$14.99</td></tr>
				<tr><td class="py-2">Overnight</td><td class="py-2">Next business day</td><td class="py-2">$29.99</td></tr>
			</tbody>
		</table>

		<h2>International Shipping</h2>
		<p>We ship to over 50 countries worldwide. International orders typically arrive within 7-14 business days. Customs fees may apply depending on your country.</p>

		<h2>Order Tracking</h2>
		<p>Once your order ships, you'll receive a confirmation email with tracking information. You can track your package at any time through your account.</p>
	</div>
</div>
