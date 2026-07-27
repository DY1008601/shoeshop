<script lang="ts">
	import { page } from '$app/stores';

	let lang = $derived($page.params.lang || 'en');
</script>

<svelte:head>
	<title>How to Style White Sneakers - ShoeShop Blog</title>
	<meta name="description" content="White sneakers are the most versatile piece in your wardrobe." />
</svelte:head>

<article class="prose prose-gray mx-auto max-w-3xl px-4 py-12">
	<div class="mb-8">
		<a href={`/${lang}/blog`} class="text-sm text-gray-500 hover:text-gray-900">&larr; Back to Blog</a>
	</div>

	<div class="mb-6">
		<span class="text-xs font-medium text-gray-500 uppercase">Style Guide</span>
	</div>

	<h1>How to Style White Sneakers for Any Occasion</h1>

	<div class="mb-8 flex items-center gap-4 text-sm text-gray-500">
		<time>2024-07-15</time>
		<span>by ShoeShop Team</span>
	</div>

	<p>White sneakers have become a wardrobe staple for good reason. Their clean, minimalist design works with virtually any outfit. Here's how to style them for different occasions.</p>

	<h2>Casual Everyday</h2>
	<p>Pair your white sneakers with:</p>
	<ul>
		<li>Slim-fit jeans and a plain white tee</li>
		<li>Chino shorts and a linen shirt for summer</li>
		<li>Joggers and a hoodie for a relaxed look</li>
	</ul>

	<h2>Smart Casual</h2>
	<p>White sneakers can elevate a smart casual outfit:</p>
	<ul>
		<li>Navy blazer, white Oxford shirt, and dark jeans</li>
		<li>Beige chinos with a tucked-in polo shirt</li>
		<li>A minimalist watch completes the look</li>
	</ul>

	<h2>Care Tips</h2>
	<p>Keep your white sneakers looking fresh:</p>
	<ol>
		<li>Clean weekly with a soft brush and mild soap</li>
		<li>Use a protective spray before first wear</li>
		<li>Store with shoe trees to maintain shape</li>
		<li>Rotate between pairs to extend lifespan</li>
	</ol>
</article>
