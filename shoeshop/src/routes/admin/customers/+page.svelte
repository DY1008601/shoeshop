<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let customers = $state<any[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			const res = await fetch('/api/admin/customers');
			if (!res.ok) throw new Error();
			customers = await res.json();
		} catch { /* redirect to login handled by server */ }
		loading = false;
	});

	function formatDate(ts: number): string {
		return new Date(ts).toLocaleDateString();
	}
</script>

<svelte:head>
	<title>Customers - Admin - ShoeShop</title>
</svelte:head>

<div>
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Customers</h1>
	</div>

	{#if loading}
		<p class="mt-8 text-sm text-gray-500">Loading...</p>
	{:else if customers.length === 0}
		<div class="mt-16 text-center">
			<p class="text-gray-500">No customers yet.</p>
		</div>
	{:else}
		<div class="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
			<table class="w-full text-left text-sm">
				<thead class="border-b border-gray-100 bg-gray-50">
					<tr>
						<th class="px-6 py-3 font-medium text-gray-600">Name</th>
						<th class="px-6 py-3 font-medium text-gray-600">Email</th>
						<th class="px-6 py-3 font-medium text-gray-600">Phone</th>
						<th class="px-6 py-3 font-medium text-gray-600">Orders</th>
						<th class="px-6 py-3 font-medium text-gray-600">Joined</th>
					</tr>
				</thead>
				<tbody>
					{#each customers as customer}
						<tr
							class="cursor-pointer border-b border-gray-50 hover:bg-gray-50/50"
							onclick={() => goto(`/admin/customers/${customer.id}`)}
							onkeydown={(e) => e.key === 'Enter' && goto(`/admin/customers/${customer.id}`)}
							tabindex="0"
							role="link"
						>
							<td class="px-6 py-4 font-medium text-gray-900">{customer.name}</td>
							<td class="px-6 py-4 text-gray-600">{customer.email}</td>
							<td class="px-6 py-4 text-gray-600">{customer.phone || '-'}</td>
							<td class="px-6 py-4 text-gray-700">{customer.order_count}</td>
							<td class="px-6 py-4 text-gray-500">{formatDate(customer.created_at)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
