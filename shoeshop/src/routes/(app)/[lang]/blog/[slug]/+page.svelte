<script lang="ts">
	import { page } from '$app/stores';
	import { getPost, categoryLabels } from '$lib/data/blog';

	let lang = $derived($page.params.lang || 'en');
	let slug = $derived($page.params.slug);
	let post = $derived(getPost(slug, lang));
</script>

<svelte:head>
	<title>{post?.title || 'Blog Post'} - ShoeShop Blog</title>
	<meta name="description" content={post?.excerpt || ''} />
	{#if post}
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "BlogPosting",
				headline: post.title,
				description: post.excerpt,
				datePublished: post.date,
				author: { "@type": "Person", name: post.author }
			})}
		</script>
	{/if}
</svelte:head>

{#if !post}
	<div class="mx-auto max-w-3xl px-4 py-16 text-center">
		<p class="text-gray-500">Post not found.</p>
		<a href={`/${lang}/blog`} class="mt-4 inline-block text-sm font-medium text-gray-900 underline">
			Back to Blog
		</a>
	</div>
{:else}
	<article class="mx-auto max-w-3xl px-4 py-12">
		<div class="mb-6">
			<a href={`/${lang}/blog`} class="text-sm text-gray-500 hover:text-gray-900 transition">
				&larr; Back to Blog
			</a>
		</div>

		<div class="mb-4">
			<span class="text-xs font-medium text-gray-500 uppercase">
				{categoryLabels[post.category] || post.category}
			</span>
		</div>

		<h1 class="mb-4 text-3xl font-bold text-gray-900">{post.title}</h1>

		<div class="mb-8 flex items-center gap-4 text-sm text-gray-500">
			<time datetime={post.date}>{post.date}</time>
			<span>by {post.author}</span>
		</div>

		{#if post.tags.length > 0}
			<div class="mb-8 flex flex-wrap gap-2">
				{#each post.tags as tag}
					<span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
						{tag}
					</span>
				{/each}
			</div>
		{/if}

		<div class="prose prose-gray max-w-none">
			{@html post.html}
		</div>
	</article>
{/if}
