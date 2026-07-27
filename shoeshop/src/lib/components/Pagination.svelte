<script lang="ts">
	interface Props {
		currentPage: number;
		totalPages: number;
		baseUrl: string;
	}

	let { currentPage, totalPages, baseUrl }: Props = $props();

	let visiblePages = $derived.by(() => {
		const pages: number[] = [];
		const start = Math.max(1, currentPage - 2);
		const end = Math.min(totalPages, currentPage + 2);
		for (let i = start; i <= end; i++) pages.push(i);
		return pages;
	});

	function pageUrl(page: number): string {
		if (page === 1) return baseUrl;
		const sep = baseUrl.includes('?') ? '&' : '?';
		return `${baseUrl}${sep}page=${page}`;
	}
</script>

{#if totalPages > 1}
	<nav class="mt-10 flex items-center justify-center gap-1" aria-label="Pagination">
		{#if currentPage > 1}
			<a href={pageUrl(currentPage - 1)} class="rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900">
				&larr; Prev
			</a>
		{/if}

		{#each visiblePages as page}
			<a
				href={pageUrl(page)}
				class="min-w-[2.5rem] rounded-lg px-3 py-2 text-center text-sm transition"
				class:bg-gray-900={page === currentPage}
				class:text-white={page === currentPage}
				class:text-gray-500={page !== currentPage}
				class:hover:bg-gray-100={page !== currentPage}
				class:hover:text-gray-900={page !== currentPage}
			>
				{page}
			</a>
		{/each}

		{#if currentPage < totalPages}
			<a href={pageUrl(currentPage + 1)} class="rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900">
				Next &rarr;
			</a>
		{/if}
	</nav>
{/if}
