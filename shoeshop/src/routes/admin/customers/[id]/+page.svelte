<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { formatPrice } from '$lib/utils/format';

	let customer = $state<any>(null);
	let orders = $state<any[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			const res = await fetch(`/api/admin/customers/${$page.params.id}`);
			if (!res.ok) throw new Error();
			const data = await res.json();
			customer = data;
			orders = data.orders ?? [];
		} catch { /* not found */ }
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
	<title>{customer ? customer.name : 'Customer'} - Admin - ShoeShop</title>
</svelte:head>

<div>
	<a
		href="/admin/customers"
		class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
		Back to Customers
	</a>

	{#if loading}
		<p class="mt-8 text-sm text-gray-500">Loading...</p>
	{:else if !customer}
		<div class="mt-16 text-center">
			<p class="text-gray-500">Customer not found.</p>
		</div>
	{:else}
		<div class="mt-6 grid gap-6 lg:grid-cols-3">
			<div class="rounded-xl border border-gray-200 bg-white p-6">
				<h2 class="text-lg font-semibold text-gray-900">Customer Info</h2>
				<dl class="mt-4 space-y-3">
					<div>
						<dt class="text-xs font-medium text-gray-400">Name</dt>
						<dd class="mt-0.5 text-sm text-gray-900">{customer.name}</dd>
					</div>
					<div>
						<dt class="text-xs font-medium text-gray-400">Email</dt>
						<dd class="mt-0.5 text-sm text-gray-600">{customer.email}</dd>
					</div>
					{#if customer.phone}
						<div>
							<dt class="text-xs font-medium text-gray-400">Phone</dt>
							<dd class="mt-0.5 text-sm text-gray-900">{customer.phone}</dd>
						</div>
					{/if}
					<div>
						<dt class="text-xs font-medium text-gray-400">Joined</dt>
						<dd class="mt-0.5 text-sm text-gray-900">{formatDate(customer.created_at)}</dd>
					</div>
				</dl>
			</div>

			<div class="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6">
				<h2 class="text-lg font-semibold text-gray-900">Order History</h2>
				{#if orders.length === 0}
					<p class="mt-4 text-sm text-gray-500">No orders yet.</p>
				{:else}
					<div class="mt-4 overflow-x-auto">
						<table class="w-full text-left text-sm">
							<thead class="border-b border-gray-100">
								<tr>
									<th class="pb-2 font-medium text-gray-600">Order ID</th>
									<th class="pb-2 font-medium text-gray-600">Date</th>
									<th class="pb-2 font-medium text-gray-600">Total</th>
									<th class="pb-2 font-medium text-gray-600">Status</th>
								</tr>
							</thead>
							<tbody>
								{#each orders as order}
									<tr class="border-b border-gray-50">
										<td class="py-3 font-mono text-xs text-gray-500">{order.id.slice(0, 8)}</td>
										<td class="py-3 text-gray-500">{formatDate(order.created_at)}</td>
										<td class="py-3 text-gray-700">{formatPrice(String(order.total), 'USD')}</td>
										<td class="py-3">
											<span class="rounded-full px-2 py-0.5 text-xs font-medium {statusColor(order.status)}">
												{statusLabel(order.status)}
											</span>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
