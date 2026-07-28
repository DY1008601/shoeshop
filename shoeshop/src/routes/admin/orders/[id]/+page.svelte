<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { formatPrice } from '$lib/utils/format';

	let order = $state<any>(null);
	let loading = $state(true);
	let saving = $state(false);
	let selectedStatus = $state('');

	onMount(async () => {
		try {
			const res = await fetch(`/api/admin/orders/${$page.params.id}`);
			if (!res.ok) throw new Error();
			order = await res.json();
			selectedStatus = order.status;
		} catch { /* not found */ }
		loading = false;
	});

	async function handleStatusChange() {
		if (!order || selectedStatus === order.status) return;
		saving = true;
		const res = await fetch(`/api/admin/orders/${$page.params.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ status: selectedStatus })
		});
		if (res.ok) {
			const updated = await res.json();
			order = updated;
		}
		saving = false;
	}

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

	function parseAddress(addr: string): Record<string, string> {
		try {
			return JSON.parse(addr);
		} catch {
			return {};
		}
	}

	let itemsTotal = $derived(
		order?.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0) ?? 0
	);
</script>

<svelte:head>
	<title>{order ? `Order ${order.id.slice(0, 8)}` : 'Order'} - Admin - ShoeShop</title>
</svelte:head>

<div>
	<a
		href="/admin/orders"
		class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
		Back to Orders
	</a>

	{#if loading}
		<p class="mt-8 text-sm text-gray-500">Loading...</p>
	{:else if !order}
		<div class="mt-16 text-center">
			<p class="text-gray-500">Order not found.</p>
		</div>
	{:else}
		<div class="mt-6 grid gap-6 lg:grid-cols-3">
			<div class="lg:col-span-2 space-y-6">
				<div class="rounded-xl border border-gray-200 bg-white p-6">
					<h2 class="text-lg font-semibold text-gray-900">Order Items</h2>
					<div class="mt-4 overflow-x-auto">
						<table class="w-full text-left text-sm">
							<thead class="border-b border-gray-100">
								<tr>
									<th class="pb-2 font-medium text-gray-600">Product</th>
									<th class="pb-2 font-medium text-gray-600">Size</th>
									<th class="pb-2 font-medium text-gray-600">Qty</th>
									<th class="pb-2 font-medium text-gray-600">Price</th>
									<th class="pb-2 text-right font-medium text-gray-600">Subtotal</th>
								</tr>
							</thead>
							<tbody>
								{#each order.items as item}
									<tr class="border-b border-gray-50">
										<td class="py-3 text-gray-900">{item.product_title}</td>
										<td class="py-3 text-gray-500">{item.size}</td>
										<td class="py-3 text-gray-700">{item.quantity}</td>
										<td class="py-3 text-gray-700">{formatPrice(String(item.price), 'USD')}</td>
										<td class="py-3 text-right font-medium text-gray-900">
											{formatPrice(String(item.price * item.quantity), 'USD')}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
					<div class="mt-4 flex justify-end border-t border-gray-200 pt-4">
						<div class="text-right">
							<p class="text-sm text-gray-500">Total</p>
							<p class="text-xl font-semibold text-gray-900">{formatPrice(String(order.total), 'USD')}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="space-y-6">
				<div class="rounded-xl border border-gray-200 bg-white p-6">
					<h2 class="text-lg font-semibold text-gray-900">Order Info</h2>
					<dl class="mt-4 space-y-3">
						<div>
							<dt class="text-xs font-medium text-gray-400">Order ID</dt>
							<dd class="mt-0.5 font-mono text-sm text-gray-900">{order.id}</dd>
						</div>
						<div>
							<dt class="text-xs font-medium text-gray-400">Date</dt>
							<dd class="mt-0.5 text-sm text-gray-900">{new Date(order.created_at).toLocaleDateString()}</dd>
						</div>
						<div>
							<dt class="text-xs font-medium text-gray-400">Status</dt>
							<dd class="mt-1">
								<select
									bind:value={selectedStatus}
									onchange={handleStatusChange}
									disabled={saving}
									class="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-gray-400 focus:outline-none disabled:opacity-50"
								>
									<option value="pending">Pending</option>
									<option value="shipped">Shipped</option>
									<option value="cancelled">Cancelled</option>
								</select>
								{#if saving}
									<span class="ml-2 text-xs text-gray-400">Saving...</span>
								{/if}
							</dd>
						</div>
					</dl>
				</div>

				<div class="rounded-xl border border-gray-200 bg-white p-6">
					<h2 class="text-lg font-semibold text-gray-900">Customer</h2>
					<dl class="mt-4 space-y-3">
						<div>
							<dt class="text-xs font-medium text-gray-400">Name</dt>
							<dd class="mt-0.5 text-sm text-gray-900">{order.customer_name}</dd>
						</div>
						<div>
							<dt class="text-xs font-medium text-gray-400">Email</dt>
							<dd class="mt-0.5 text-sm text-gray-600">{order.customer_email}</dd>
						</div>
					</dl>
				</div>

				<div class="rounded-xl border border-gray-200 bg-white p-6">
					<h2 class="text-lg font-semibold text-gray-900">Shipping Address</h2>
					<dl class="mt-4 space-y-3">
						{#each Object.entries(parseAddress(order.address)) as [key, value]}
							<div>
								<dt class="text-xs font-medium text-gray-400 capitalize">{key}</dt>
								<dd class="mt-0.5 text-sm text-gray-900">{value}</dd>
							</div>
						{/each}
					</dl>
				</div>
			</div>
		</div>
	{/if}
</div>
