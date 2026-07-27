<script lang="ts">
	import { page } from '$app/stores';
	let lang = $derived($page.params.lang || 'en');
</script>

<svelte:head>
	<title>Privacy Policy - ShoeShop</title>
	<meta name="description" content="ShoeShop privacy policy. Learn how we collect, use, and protect your personal information." />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-16">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">Privacy Policy</h1>

	<div class="prose prose-gray max-w-none text-sm">
		<p>Last updated: 2024</p>

		<h2>1. Information We Collect</h2>
		<p>We collect information you provide directly when creating an account, placing an order, or contacting us: name, email address, shipping address, and payment information.</p>

		<h2>2. How We Use Information</h2>
		<p>We use your information to process orders, communicate about your purchases, send marketing communications (with your consent), and improve our services.</p>

		<h2>3. Data Sharing</h2>
		<p>We share information with service providers who help with payment processing, shipping, and email delivery. We do not sell your personal information to third parties.</p>

		<h2>4. Cookies</h2>
		<p>We use cookies to remember your preferences, keep items in your cart, and analyze site traffic. You can disable cookies in your browser settings.</p>

		<h2>5. Data Security</h2>
		<p>We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology.</p>

		<h2>6. Your Rights</h2>
		<p>You may request access to, correction, or deletion of your personal data at any time by contacting us at privacy@shoeshop.com.</p>

		<h2>7. Contact</h2>
		<p>For privacy-related questions, contact us at privacy@shoeshop.com.</p>
	</div>
</div>
