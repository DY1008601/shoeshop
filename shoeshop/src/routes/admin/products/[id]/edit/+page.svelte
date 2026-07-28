<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import ProductForm from '../../ProductForm.svelte';

	let product = $state<any>(null);
	let loading = $state(true);

	onMount(async () => {
		const res = await fetch(`/api/admin/products/${$page.params.id}`);
		if (res.ok) {
			product = await res.json();
		}
		loading = false;
	});
</script>

<svelte:head>
	<title>{product?.title || 'Edit'} - Admin - ShoeShop</title>
</svelte:head>

<div>
	<h1 class="text-2xl font-bold text-gray-900">
		{#if loading}
			Loading...
		{:else if product}
			Edit: {product.title}
		{:else}
			Product not found
		{/if}
	</h1>
	{#if product}
		<ProductForm {product} />
	{/if}
</div>
