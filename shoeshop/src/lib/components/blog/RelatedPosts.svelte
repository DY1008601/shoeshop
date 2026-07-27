<script lang="ts">
	import { page } from '$app/stores';
	import { getAllPosts, categoryLabels } from '$lib/data/blog';

	interface Props {
		currentSlug: string;
	}

	let { currentSlug }: Props = $props();
	let lang = $derived($page.params.lang || 'en');

	let related = $derived(
		getAllPosts(lang)
			.filter((p) => p.slug !== currentSlug)
			.slice(0, 3)
	);
</script>

{#if related.length > 0}
	<section class="mt-16 border-t border-gray-200 pt-12">
		<h2 class="mb-6 text-xl font-bold text-gray-900">Related Articles</h2>
		<div class="grid gap-6 sm:grid-cols-3">
			{#each related as post}
				<a href={`/${lang}/blog/${post.slug}`} class="group rounded-xl border border-gray-200 p-4 transition hover:border-gray-300">
					<p class="text-xs font-medium text-gray-500 uppercase mb-1">{categoryLabels[post.category] || post.category}</p>
					<h3 class="text-sm font-semibold text-gray-900 group-hover:underline">{post.title}</h3>
					<p class="mt-1 text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>
					<time class="mt-2 block text-xs text-gray-400">{post.date}</time>
				</a>
			{/each}
		</div>
	</section>
{/if}
