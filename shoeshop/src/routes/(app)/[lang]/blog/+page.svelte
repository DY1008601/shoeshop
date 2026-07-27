<script lang="ts">
	import { page } from '$app/stores';

	let lang = $derived($page.params.lang || 'en');
</script>

<svelte:head>
	<title>Blog - ShoeShop</title>
	<meta name="description" content="Sneaker reviews, style guides, and size guides." />
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-12">
	<h1 class="mb-2 text-3xl font-bold text-gray-900">Blog</h1>
	<p class="mb-8 text-gray-600">Sneaker reviews, style guides, and size guides.</p>

	<div class="grid gap-8 md:grid-cols-2">
		<article class="rounded-xl border border-gray-200 p-6 transition hover:shadow-md">
			<div class="mb-3">
				<span class="text-xs font-medium text-gray-500 uppercase">Style Guide</span>
			</div>
			<h2 class="mb-2 text-lg font-semibold text-gray-900">
				<a href={`/${lang}/blog/how-to-style-white-sneakers`} class="hover:underline">
					How to Style White Sneakers for Any Occasion
				</a>
			</h2>
			<p class="mb-4 text-sm text-gray-600">
				White sneakers are the most versatile piece in your wardrobe. Here's how to wear them everywhere.
			</p>
			<time class="text-xs text-gray-400">2024-07-15</time>
		</article>
	</div>
</div>
