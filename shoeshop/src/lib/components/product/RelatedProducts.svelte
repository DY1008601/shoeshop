<script lang="ts">
	import { page } from '$app/stores';
	import { products } from '$lib/data/products';
	import ProductCard from '$lib/components/product/ProductCard.svelte';

	interface Props {
		currentHandle: string;
		category?: string;
	}

	let { currentHandle, category }: Props = $props();
	let lang = $derived($page.params.lang || 'en');

	let related = $derived(
		products
			.filter((p) => p.handle !== currentHandle)
			.filter((p) => !category || p.collections.edges.some((c) => c.node.handle === category))
			.slice(0, 4)
	);
</script>

{#if related.length > 0}
	<section class="mt-16">
		<h2 class="mb-6 text-xl font-bold text-gray-900">You May Also Like</h2>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each related as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>
	</section>
{/if}
