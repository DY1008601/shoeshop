<script lang="ts">
	interface Props {
		src: string;
		alt: string;
	}

	let { src, alt }: Props = $props();

	let zoomed = $state(false);
	let x = $state(50);
	let y = $state(50);

	function openZoom() {
		zoomed = true;
		x = 50;
		y = 50;
		document.body.style.overflow = 'hidden';
	}

	function closeZoom() {
		zoomed = false;
		document.body.style.overflow = '';
	}

	function moveZoom(e: MouseEvent) {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		x = ((e.clientX - rect.left) / rect.width) * 100;
		y = ((e.clientY - rect.top) / rect.height) * 100;
	}
</script>

<button
	onclick={openZoom}
	class="group relative w-full cursor-zoom-in overflow-hidden rounded-xl bg-gray-100"
>
	<img src={src} alt={alt} class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
</button>

{#if zoomed}
	<button
		onclick={closeZoom}
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
	>
		<div
			onclick={(e) => e.stopPropagation()}
			onmousemove={moveZoom}
			onmouseleave={() => { x = 50; y = 50; }}
			class="relative h-[80vh] w-[80vw] max-w-2xl cursor-zoom-in overflow-hidden rounded-xl bg-gray-100"
			style="background-image: url({src}); background-size: 200%; background-position: {x}% {y}%; background-repeat: no-repeat;"
		>
			<img src={src} alt={alt} class="h-full w-full object-contain opacity-0" />
		</div>

		<span class="absolute right-6 top-6 rounded-lg bg-black/50 px-3 py-1 text-sm text-white">
			ESC
		</span>
	</button>
{/if}
