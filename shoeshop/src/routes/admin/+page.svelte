<script lang="ts">
	import { onMount } from 'svelte';
	import { formatPrice } from '$lib/utils/format';

	let stats = $state({ productCount: 0, orderCount: 0, customerCount: 0, recentOrders: [] as any[] });
	let loading = $state(true);

	onMount(async () => {
		try {
			const res = await fetch('/api/admin/dashboard');
			if (!res.ok) throw new Error();
			stats = await res.json();
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

	function formatDate(ts: number): string {
		return new Date(ts).toLocaleDateString();
	}
</script>

<svelte:head>
	<title>Dashboard - Admin - ShoeShop</title>
</svelte:head>

<div>
	<h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>

	{#if loading}
		<p class="mt-8 text-sm text-gray-500">Loading...</p>
	{:else}
		<div class="mt-6 grid gap-6 sm:grid-cols-3">
			<div class="rounded-xl border border-gray-200 bg-white p-6">
				<div class="flex items-center gap-4">
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
						</svg>
					</div>
					<div>
						<p class="text-2xl font-bold text-gray-900">{stats.productCount}</p>
						<p class="text-xs text-gray-500">Products</p>
					</div>
				</div>
			</div>

			<div class="rounded-xl border border-gray-200 bg-white p-6">
				<div class="flex items-center gap-4">
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
						</svg>
					</div>
					<div>
						<p class="text-2xl font-bold text-gray-900">{stats.orderCount}</p>
						<p class="text-xs text-gray-500">Orders</p>
					</div>
				</div>
			</div>

			<div class="rounded-xl border border-gray-200 bg-white p-6">
				<div class="flex items-center gap-4">
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</div>
					<div>
						<p class="text-2xl font-bold text-gray-900">{stats.customerCount}</p>
						<p class="text-xs text-gray-500">Customers</p>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-8">
			<div class="flex items-center justify-between">
				<h2 class="text-lg font-semibold text-gray-900">Recent Orders</h2>
				<a href="/admin/orders" class="text-sm font-medium text-gray-600 hover:text-gray-900">
					View all orders
				</a>
			</div>

			{#if stats.recentOrders.length === 0}
				<div class="mt-4 rounded-xl border border-gray-200 bg-white p-8 text-center">
					<p class="text-sm text-gray-500">No orders yet.</p>
				</div>
			{:else}
				<div class="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
					<table class="w-full text-left text-sm">
						<thead class="border-b border-gray-100 bg-gray-50">
							<tr>
								<th class="px-6 py-3 font-medium text-gray-600">Order ID</th>
								<th class="px-6 py-3 font-medium text-gray-600">Customer</th>
								<th class="px-6 py-3 font-medium text-gray-600">Status</th>
								<th class="px-6 py-3 font-medium text-gray-600">Total</th>
								<th class="px-6 py-3 font-medium text-gray-600">Date</th>
							</tr>
						</thead>
						<tbody>
							{#each stats.recentOrders as order}
								<tr class="border-b border-gray-50">
									<td class="px-6 py-4 font-mono text-xs text-gray-500">{order.id.slice(0, 8)}</td>
									<td class="px-6 py-4 text-gray-900">{order.customer_name}</td>
									<td class="px-6 py-4">
										<span class="rounded-full px-2 py-0.5 text-xs font-medium {statusColor(order.status)}">
											{statusLabel(order.status)}
										</span>
									</td>
									<td class="px-6 py-4 text-gray-700">{formatPrice(String(order.total), 'USD')}</td>
									<td class="px-6 py-4 text-gray-500">{formatDate(order.created_at)}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	{/if}
</div>
