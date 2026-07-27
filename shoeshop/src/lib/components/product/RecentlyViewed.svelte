<script lang="ts">
	import { page } from '$app/stores';
	import { products } from '$lib/data/products';
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import { onMount } from 'svelte';

	let lang = $derived($page.params.lang || 'en');
	let handles = $state<string[]>([]);

	onMount(() => {
		try {
			const stored = localStorage.getItem('shoeshop-recent');
			if (stored) {
				const parsed: string[] = JSON.parse(stored);
				handles = parsed.filter((h) => products.some((p) => p.handle === h)).slice(0, 4);
			}
		} catch {
			//
		}
	});

	let recent = $derived(handles.map((h) => products.find((p) => p.handle === h)).filter(Boolean));

	export function trackView(handle: string) {
		try {
			const stored = localStorage.getItem('shoeshop-recent');
			const existing: string[] = stored ? JSON.parse(stored) : [];
			const updated = [handle, ...existing.filter((h) => h !== handle)].slice(0, 10);
			localStorage.setItem('shoeshop-recent', JSON.stringify(updated));
		} catch {
			//
		}
	}
</script>

{#if recent.length > 0}
	<section class="mt-16">
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-xl font-bold text-gray-900">Recently Viewed</h2>
		</div>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each recent as product (product!.id)}
				<ProductCard product={product!} />
			{/each}
		</div>
	</section>
{/if}
