<script lang="ts">
	let visible = $state(false);

	$effect(() => {
		function onScroll() {
			visible = window.scrollY > 400;
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	function scrollTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

{#if visible}
	<button
		onclick={scrollTop}
		class="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition hover:bg-gray-800"
		aria-label="Back to top"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
		</svg>
	</button>
{/if}
