<script lang="ts">
	interface Item {
		label: string;
		href?: string;
	}

	interface Props {
		items: Item[];
	}

	let { items }: Props = $props();
</script>

<nav class="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
	<ol class="flex flex-wrap items-center gap-1">
		{#each items as item, i}
			{#if i > 0}
				<span class="mx-1">/</span>
			{/if}
			{#if i === items.length - 1 || !item.href}
				<li class="text-gray-900" aria-current="page">{item.label}</li>
			{:else}
				<li><a href={item.href} class="hover:text-gray-900">{item.label}</a></li>
			{/if}
		{/each}
	</ol>
</nav>
