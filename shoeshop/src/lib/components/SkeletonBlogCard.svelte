<script lang="ts">
	interface Props {
		count?: number;
	}

	let { count = 4 }: Props = $props();
</script>

{#each Array(count) as _}
	<div class="animate-pulse rounded-xl border border-gray-200 p-6">
		<div class="mb-3 h-3 w-20 rounded bg-gray-200"></div>
		<div class="mb-2 h-6 w-4/5 rounded bg-gray-200"></div>
		<div class="mb-2 h-4 w-full rounded bg-gray-200"></div>
		<div class="mb-4 h-4 w-3/4 rounded bg-gray-200"></div>
		<div class="flex gap-4">
			<div class="h-3 w-24 rounded bg-gray-200"></div>
			<div class="h-3 w-16 rounded bg-gray-200"></div>
		</div>
	</div>
{/each}
