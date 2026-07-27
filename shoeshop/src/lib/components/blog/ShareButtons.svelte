<script lang="ts">
	interface Props {
		title: string;
		url: string;
	}

	let { title, url }: Props = $props();

	let shareUrl = $derived(typeof window !== 'undefined' ? encodeURIComponent(url) : url);
	let shareTitle = $derived(typeof window !== 'undefined' ? encodeURIComponent(title) : title);

	const networks = [
		{ name: 'Twitter', href: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`, icon: 'M8.283 2.639h3.91L8.9 10.786l3.646 5.866H8.125L5.467 12.14l-3.014 4.512H.443l3.984-5.73L1.161 2.639h3.29l2.186 3.52 1.646-3.52z' },
		{ name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
		{ name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 110-4 2 2 0 010 4z' },
	];

	function copyLink() {
		navigator.clipboard?.writeText(url);
	}
</script>

<div class="flex items-center gap-3">
	<span class="text-sm font-medium text-gray-500">Share:</span>
	{#each networks as network}
		<a
			href={network.href}
			target="_blank"
			rel="noopener noreferrer"
			class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:bg-gray-900 hover:text-white hover:border-gray-900"
			aria-label={`Share on ${network.name}`}
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={network.icon} />
			</svg>
		</a>
	{/each}
	<button
		onclick={copyLink}
		class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:bg-gray-900 hover:text-white hover:border-gray-900"
		aria-label="Copy link"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
		</svg>
	</button>
</div>
