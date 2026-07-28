<script lang="ts">
	import { goto } from '$app/navigation';

	interface Props {
		product?: any;
	}

	let { product }: Props = $props();

	let title = $state(product?.title || '');
	let description = $state(product?.description || '');
	let descriptionHtml = $state(product?.descriptionHtml || product?.description || '');
	let price = $state(product?.priceRange?.maxVariantPrice?.amount || '');
	let compareAtPrice = $state(product?.priceRange?.minVariantPrice?.amount !== product?.priceRange?.maxVariantPrice?.amount ? product?.priceRange?.minVariantPrice?.amount : '');
	let stock = $state(product?.variants?.edges?.[0]?.node?.availableForSale ? '10' : '0');
	let collection = $state(product?.collections?.edges?.[0]?.node?.handle || 'running');
	let sizesRaw = $state(product?.options?.find((o: any) => o.name === 'Size')?.values?.join(', ') || 'US 7, US 8, US 9, US 10, US 11, US 12');
	let imageUrl = $state(product?.images?.edges?.[0]?.node?.url || '');
	let saving = $state(false);
	let errorMsg = $state('');
	let success = $state(false);

	const isEdit = $derived(!!product);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		saving = true;
		errorMsg = '';

		const sizes = sizesRaw.split(',').map((s: string) => s.trim()).filter(Boolean);
		const images = imageUrl ? [{ url: imageUrl, alt_text: title }] : [];

		const body = {
			title,
			description,
			description_html: descriptionHtml,
			price: parseFloat(price),
			compare_at_price: compareAtPrice ? parseFloat(compareAtPrice) : undefined,
			stock: parseInt(stock),
			collection,
			sizes,
			images
		};

		const url = isEdit ? `/api/admin/products/${product.id}` : '/api/admin/products';
		const method = isEdit ? 'PUT' : 'POST';

		const res = await fetch(url, {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});

		if (res.ok) {
			success = true;
			setTimeout(() => goto('/admin/products'), 500);
		} else {
			const err = await res.json();
			errorMsg = err.error || 'Save failed';
		}
		saving = false;
	}
</script>

<form onsubmit={handleSubmit} class="mt-6 max-w-2xl space-y-6">
	<div>
		<label for="title" class="block text-sm font-medium text-gray-700">Title *</label>
		<input id="title" bind:value={title} type="text" required class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none" placeholder="Nike Air Max Pulse" />
	</div>

	<div class="grid gap-6 sm:grid-cols-2">
		<div>
			<label for="price" class="block text-sm font-medium text-gray-700">Price (USD) *</label>
			<input id="price" bind:value={price} type="number" step="0.01" min="0" required class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none" placeholder="150.00" />
		</div>
		<div>
			<label for="compare" class="block text-sm font-medium text-gray-700">Compare at Price</label>
			<input id="compare" bind:value={compareAtPrice} type="number" step="0.01" min="0" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none" placeholder="190.00" />
		</div>
		<div>
			<label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
			<input id="stock" bind:value={stock} type="number" min="0" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none" />
		</div>
		<div>
			<label for="collection" class="block text-sm font-medium text-gray-700">Collection</label>
			<select id="collection" bind:value={collection} class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none">
				<option value="running">Running</option>
				<option value="lifestyle">Lifestyle</option>
				<option value="performance">Performance</option>
			</select>
		</div>
	</div>

	<div>
		<label for="sizes" class="block text-sm font-medium text-gray-700">Sizes (comma separated)</label>
		<input id="sizes" bind:value={sizesRaw} type="text" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none" placeholder="US 7, US 8, US 9, US 10, US 11, US 12" />
	</div>

	<div>
		<label for="img" class="block text-sm font-medium text-gray-700">Main Image URL</label>
		<input id="img" bind:value={imageUrl} type="text" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none" placeholder="/images/shoes/nike-air-max-pulse.svg" />
		{#if imageUrl}
			<img src={imageUrl} alt="Preview" class="mt-2 h-20 w-20 rounded-lg bg-gray-100 object-cover" />
		{/if}
	</div>

	<div>
		<label for="desc" class="block text-sm font-medium text-gray-700">Description</label>
		<textarea id="desc" bind:value={description} rows={3} class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none" placeholder="Product description..."></textarea>
	</div>

	<div>
		<label for="descHtml" class="block text-sm font-medium text-gray-700">Description HTML</label>
		<textarea id="descHtml" bind:value={descriptionHtml} rows={4} class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none font-mono text-xs" placeholder="<p>HTML description...</p>"></textarea>
	</div>

	{#if errorMsg}
		<p class="text-sm text-red-500">{errorMsg}</p>
	{/if}
	{#if success}
		<p class="text-sm text-green-600">Saved successfully!</p>
	{/if}

	<div class="flex gap-3">
		<button type="submit" disabled={saving} class="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50">
			{saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
		</button>
		<a href="/admin/products" class="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
			Cancel
		</a>
	</div>
</form>
