<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { formatPrice } from '$lib/utils/format';

	let products = $state<any[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			const res = await fetch('/api/admin/products');
			if (!res.ok) throw new Error();
			products = await res.json();
		} catch { /* redirect to login handled by server */ }
		loading = false;
	});

	async function handleDelete(id: string) {
		if (!confirm('Archive this product?')) return;
		await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
		products = products.filter((p) => p.id !== id);
	}
</script>

<svelte:head>
	<title>Products - Admin - ShoeShop</title>
</svelte:head>

<div>
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Products</h1>
		<a
			href="/admin/products/new"
			class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
		>
			Add Product
		</a>
	</div>

	{#if loading}
		<p class="mt-8 text-sm text-gray-500">Loading...</p>
	{:else if products.length === 0}
		<div class="mt-16 text-center">
			<p class="text-gray-500">No products yet.</p>
			<a href="/admin/products/new" class="mt-2 inline-block text-sm font-medium text-gray-900 underline">
				Create your first product
			</a>
		</div>
	{:else}
		<div class="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
			<table class="w-full text-left text-sm">
				<thead class="border-b border-gray-100 bg-gray-50">
					<tr>
						<th class="px-6 py-3 font-medium text-gray-600">Product</th>
						<th class="px-6 py-3 font-medium text-gray-600">Price</th>
						<th class="px-6 py-3 font-medium text-gray-600">Stock</th>
						<th class="px-6 py-3 font-medium text-gray-600">Collection</th>
						<th class="px-6 py-3 font-medium text-gray-600"></th>
					</tr>
				</thead>
				<tbody>
					{#each products as product}
						<tr class="border-b border-gray-50 hover:bg-gray-50/50">
							<td class="px-6 py-4">
								<div class="flex items-center gap-3">
									{#if product.featuredImage?.url}
										<img src={product.featuredImage.url} alt={product.title} class="h-10 w-10 rounded-lg bg-gray-100 object-cover" />
									{/if}
									<div>
										<p class="font-medium text-gray-900">{product.title}</p>
										<p class="text-xs text-gray-400">{product.handle}</p>
									</div>
								</div>
							</td>
							<td class="px-6 py-4 text-gray-700">
								{formatPrice(product.priceRange.maxVariantPrice.amount, product.priceRange.maxVariantPrice.currencyCode)}
							</td>
							<td class="px-6 py-4">
								{#if product.variants.edges[0]?.node.availableForSale}
									<span class="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">In Stock</span>
								{:else}
									<span class="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">Sold Out</span>
								{/if}
							</td>
							<td class="px-6 py-4">
								<span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
									{product.collections.edges[0]?.node.title || '-'}
								</span>
							</td>
							<td class="px-6 py-4">
								<div class="flex items-center gap-2">
									<a
										href={`/admin/products/${product.id}/edit`}
										class="text-xs font-medium text-gray-600 hover:text-gray-900"
									>
										Edit
									</a>
									<button
										onclick={() => handleDelete(product.id)}
										class="text-xs font-medium text-red-500 hover:text-red-700"
									>
										Archive
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
