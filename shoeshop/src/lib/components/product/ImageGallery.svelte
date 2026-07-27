<script lang="ts">
	interface Props {
		images: { url: string; alt: string }[];
	}

	let { images }: Props = $props();

	let active = $state(0);

	function nextImage(e: MouseEvent) {
		e.stopPropagation();
		active = (active + 1) % images.length;
	}

	function prevImage(e: MouseEvent) {
		e.stopPropagation();
		active = (active - 1 + images.length) % images.length;
	}
</script>

<div class="space-y-4">
	<div class="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
		<img
			src={images[active].url}
			alt={images[active].alt}
			class="h-full w-full object-cover"
		/>

		{#if images.length > 1}
			<button
				onclick={prevImage}
				class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-700 shadow hover:bg-white transition"
				aria-label="Previous image"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<button
				onclick={nextImage}
				class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-700 shadow hover:bg-white transition"
				aria-label="Next image"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		{/if}
	</div>

	{#if images.length > 1}
		<div class="flex gap-2">
			{#each images as img, i}
				<button
					onclick={() => (active = i)}
					class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition"
					class:border-gray-900={active === i}
					class:border-transparent={active !== i}
				>
					<img src={img.url} alt={img.alt} class="h-full w-full object-cover" />
				</button>
			{/each}
		</div>
	{/if}
</div>
