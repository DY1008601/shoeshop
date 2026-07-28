<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { formatPrice } from '$lib/utils/format';

	let orders = $state<any[]>([]);
	let loading = $state(true);
	let statusFilter = $state('all');

	const statuses = ['all', 'pending', 'shipped', 'cancelled'] as const;

	const filteredOrders = $derived(
		statusFilter === 'all' ? orders : orders.filter((o) => o.status === statusFilter)
	);

	onMount(async () => {
		try {
			const res = await fetch('/api/admin/orders');
			if (!res.ok) throw new Error();
			orders = await res.json();
		} catch { /* redirect to login handled by server */ }
		loading = false;
	});

	function statusColor(status: string): string {
		switch (status) {
			case 'pending': return 'bg-yellow-50 text-yellow-700';
			case 'shipped': return 'bg-blue-50 text-blue-700';
			case 'cancelled': return 'bg-gray-100 text-gray-600';
			default: return 'bg-gray-100 text-gray-600';
		}
	}

	function statusLabel(s: string): string {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}
</script>

<svelte:head>
	<title>Orders - Admin - ShoeShop</title>
</svelte:head>

<div>
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Orders</h1>
	</div>

	<div class="mt-6 flex gap-2">
		{#each statuses as s}
			<button
				onclick={() => (statusFilter = s)}
				class="rounded-lg px-3 py-1.5 text-sm font-medium transition"
				class:bg-gray-900={statusFilter === s}
				class:text-white={statusFilter === s}
				class:bg-gray-100={statusFilter !== s}
				class:text-gray-600={statusFilter !== s}
				class:hover:bg-gray-200={statusFilter !== s}
			>
				{statusLabel(s)}
			</button>
		{/each}
	</div>

	{#if loading}
		<p class="mt-8 text-sm text-gray-500">Loading...</p>
	{:else if orders.length === 0}
		<div class="mt-16 text-center">
			<p class="text-gray-500">No orders yet.</p>
		</div>
	{:else if filteredOrders.length === 0}
		<div class="mt-16 text-center">
			<p class="text-gray-500">No {statusLabel(statusFilter)} orders.</p>
		</div>
	{:else}
		<div class="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
			<table class="w-full text-left text-sm">
				<thead class="border-b border-gray-100 bg-gray-50">
					<tr>
						<th class="px-6 py-3 font-medium text-gray-600">Order ID</th>
						<th class="px-6 py-3 font-medium text-gray-600">Customer Name</th>
						<th class="px-6 py-3 font-medium text-gray-600">Email</th>
						<th class="px-6 py-3 font-medium text-gray-600">Total</th>
						<th class="px-6 py-3 font-medium text-gray-600">Status</th>
						<th class="px-6 py-3 font-medium text-gray-600">Date</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredOrders as order}
						<tr
							class="cursor-pointer border-b border-gray-50 hover:bg-gray-50/50"
							onclick={() => goto(`/admin/orders/${order.id}`)}
							onkeydown={(e) => e.key === 'Enter' && goto(`/admin/orders/${order.id}`)}
							tabindex="0"
							role="link"
						>
							<td class="px-6 py-4 font-mono text-xs text-gray-500">{order.id.slice(0, 8)}</td>
							<td class="px-6 py-4 font-medium text-gray-900">{order.customer_name}</td>
							<td class="px-6 py-4 text-gray-600">{order.customer_email}</td>
							<td class="px-6 py-4 text-gray-700">{formatPrice(String(order.total), 'USD')}</td>
							<td class="px-6 py-4">
								<span class="rounded-full px-2 py-0.5 text-xs font-medium {statusColor(order.status)}">
									{statusLabel(order.status)}
								</span>
							</td>
							<td class="px-6 py-4 text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
