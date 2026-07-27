<script lang="ts">
	import { page } from '$app/stores';
	import { getAllPosts, categoryLabels } from '$lib/data/blog';

	let lang = $derived($page.params.lang || 'en');
	let posts = $derived(getAllPosts(lang));
</script>

<svelte:head>
	<title>ShoeShop Blog - Sneaker Reviews, Style Guides & More</title>
	<meta name="description" content="Expert sneaker reviews, style guides, size guides, and brand stories. Your go-to resource for everything sneakers." />
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-12">
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900">Blog</h1>
		<p class="mt-2 text-gray-600">Sneaker reviews, style guides, and size guides to help you find your perfect pair.</p>
	</div>

	{#if posts.length === 0}
		<div class="py-16 text-center">
			<p class="text-gray-500">No posts found in this language yet.</p>
		</div>
	{:else}
		<div class="grid gap-8 md:grid-cols-2">
			{#each posts as post (post.slug + post.lang)}
				<article class="group rounded-xl border border-gray-200 transition hover:shadow-md">
					<a href={`/${lang}/blog/${post.slug}`} class="block p-6">
						<div class="mb-3">
							<span class="text-xs font-medium text-gray-500 uppercase">
								{categoryLabels[post.category] || post.category}
							</span>
						</div>
						<h2 class="mb-2 text-lg font-semibold text-gray-900 group-hover:underline">
							{post.title}
						</h2>
						<p class="mb-4 text-sm leading-relaxed text-gray-600">
							{post.excerpt}
						</p>
						<div class="flex items-center gap-4 text-xs text-gray-400">
							<time datetime={post.date}>{post.date}</time>
							<span>{post.author}</span>
						</div>
					</a>
				</article>
			{/each}
		</div>
	{/if}
</div>
