<script lang="ts">
	import { page } from '$app/stores';
	let lang = $derived($page.params.lang || 'en');
</script>

<svelte:head>
	<title>Returns & Exchanges - ShoeShop</title>
	<meta name="description" content="30-day hassle-free returns. If it doesn't fit, send it back with no questions asked." />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-16">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">Returns & Exchanges</h1>

	<div class="prose prose-gray max-w-none">
		<h2>Our Return Policy</h2>
		<p>We want you to love your sneakers. If you're not completely satisfied, you can return unworn items within 30 days of delivery for a full refund.</p>

		<h2>How to Return</h2>
		<ol>
			<li>Log into your account and go to your orders</li>
			<li>Select the items you wish to return</li>
			<li>Print the prepaid return shipping label</li>
			<li>Pack the items in their original box with all tags attached</li>
			<li>Drop off at any authorized shipping location</li>
		</ol>

		<h2>Refund Timeline</h2>
		<p>Once we receive your return, refunds are processed within 5-7 business days. The refund will be credited to your original payment method.</p>

		<h2>Exchanges</h2>
		<p>Need a different size or color? The fastest way is to place a new order and return the original item. This ensures you get the right pair as quickly as possible.</p>

		<h2>Return Conditions</h2>
		<ul>
			<li>Items must be unworn and in original condition</li>
			<li>Original packaging and tags must be included</li>
			<li>Returns must be initiated within 30 days of delivery</li>
			<li>Final sale items cannot be returned</li>
		</ul>
	</div>
</div>
