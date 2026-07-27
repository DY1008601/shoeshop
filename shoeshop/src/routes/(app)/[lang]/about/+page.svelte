<script lang="ts">
	import { page } from '$app/stores';
	let lang = $derived($page.params.lang || 'en');
</script>

<svelte:head>
	<title>About ShoeShop - Premium Sneakers</title>
	<meta name="description" content="Learn about ShoeShop - our mission to bring premium sneakers to everyone." />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-16">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">About ShoeShop</h1>

	<div class="prose prose-gray max-w-none">
		<p>We believe that great sneakers should be accessible to everyone. Founded in 2024, ShoeShop curates the finest running and lifestyle sneakers from the world's top brands.</p>

		<h2>Our Mission</h2>
		<p>To be the most trusted destination for sneaker enthusiasts. We do this through:</p>
		<ul>
			<li><strong>Curated selection</strong> - Every shoe in our collection is handpicked for quality and style</li>
			<li><strong>Expert guidance</strong> - Our blog and size guides help you find your perfect fit</li>
			<li><strong>Hassle-free experience</strong> - Free shipping, easy returns, and transparent pricing</li>
		</ul>

		<h2>What We Stand For</h2>

		<h3>Authenticity</h3>
		<p>Every pair we sell comes from authorized retailers. We never deal in counterfeits or unauthorized goods.</p>

		<h3>Quality</h3>
		<p>We only stock brands and models that meet our rigorous standards for materials, construction, and comfort.</p>

		<h3>Community</h3>
		<p>From casual walkers to marathon runners, our community shares a passion for great footwear. Join us on social media and be part of the conversation.</p>

		<h2>Our Brands</h2>
		<p>We partner with leading brands including Nike, Adidas, New Balance, ASICS, HOKA, On, Puma, and Saucony.</p>

		<h2>Contact</h2>
		<p>Questions or feedback? We'd love to hear from you at <a href={`/${lang}/contact`}>our contact page</a>.</p>
	</div>
</div>
