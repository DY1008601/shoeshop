<script lang="ts">
	export interface BreadcrumbItem {
		label: string;
		href?: string;
	}

	interface Props {
		items: BreadcrumbItem[];
	}

	let { items }: Props = $props();
</script>

{#if items.length > 0}
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: items.map((item, i) => ({
				"@type": "ListItem",
				position: i + 1,
				item: {
					"@id": item.href ? new URL(item.href, typeof window !== 'undefined' ? window.location.origin : '').href : '',
					name: item.label
				}
			}))
		})}
	</script>
{/if}

<nav aria-label="Breadcrumb" class="text-sm text-gray-500">
	<ol class="flex flex-wrap items-center gap-x-2">
		{#each items as item, i}
			{#if i > 0}
				<span class="text-gray-300" aria-hidden="true">/</span>
			{/if}
			{#if item.href && i < items.length - 1}
				<li>
					<a href={item.href} class="hover:text-gray-900 transition-colors">{item.label}</a>
				</li>
			{:else}
				<li>
					<span class="text-gray-900">{item.label}</span>
				</li>
			{/if}
		{/each}
	</ol>
</nav>
