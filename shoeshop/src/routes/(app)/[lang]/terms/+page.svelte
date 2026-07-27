<script lang="ts">
	import { page } from '$app/stores';
	let lang = $derived($page.params.lang || 'en');
</script>

<svelte:head>
	<title>Terms of Service - ShoeShop</title>
	<meta name="description" content="ShoeShop terms of service. Read the terms and conditions for using our website and services." />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-16">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">Terms of Service</h1>

	<div class="prose prose-gray max-w-none text-sm">
		<p>Last updated: 2024</p>

		<h2>1. Acceptance of Terms</h2>
		<p>By accessing or using ShoeShop, you agree to be bound by these Terms of Service. If you do not agree, please do not use our site.</p>

		<h2>2. Products and Pricing</h2>
		<p>We strive to display accurate product information and pricing. We reserve the right to correct errors and cancel orders if a pricing mistake occurs. All prices are in USD.</p>

		<h2>3. Orders and Payment</h2>
		<p>By placing an order, you agree to pay the full amount. We accept PayPal and major credit cards. All orders are subject to availability.</p>

		<h2>4. Shipping and Delivery</h2>
		<p>Delivery times are estimates and not guaranteed. We are not responsible for delays caused by customs, weather, or carrier issues.</p>

		<h2>5. Returns and Refunds</h2>
		<p>Returns are accepted within 30 days of delivery for unworn items in original packaging. See our Returns page for full details.</p>

		<h2>6. Intellectual Property</h2>
		<p>All content on this site, including images, text, and logos, is owned by ShoeShop or its licensors. Reproduction without permission is prohibited.</p>

		<h2>7. Limitation of Liability</h2>
		<p>ShoeShop is not liable for indirect damages arising from use of our products or website. Our liability is limited to the purchase price of the product.</p>

		<h2>8. Contact</h2>
		<p>For questions about these terms, contact us at legal@shoeshop.com.</p>
	</div>
</div>
