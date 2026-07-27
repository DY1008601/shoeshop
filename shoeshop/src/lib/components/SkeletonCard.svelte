<script lang="ts">
	interface Props {
		count?: number;
	}

	let { count = 6 }: Props = $props();
</script>

{#each Array(count) as _}
	<div class="animate-pulse">
		<div class="aspect-square rounded-xl bg-gray-200"></div>
		<div class="mt-3 space-y-2">
			<div class="h-4 w-3/4 rounded bg-gray-200"></div>
			<div class="h-4 w-1/3 rounded bg-gray-200"></div>
		</div>
	</div>
{/each}
