<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let { children }: { children: import('svelte').Snippet } = $props();

	let pathname = $derived($page.url.pathname);

	const navItems = [
		{ label: 'Products', href: '/admin/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
		{ label: 'Orders', href: '/admin/orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
		{ label: 'Customers', href: '/admin/customers', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
		{ label: 'Settings', href: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
	];

	async function handleLogout() {
		await fetch('/api/admin/auth/logout', { method: 'POST', body: JSON.stringify({ username: 'admin' }) });
		goto('/admin/login');
	}

	let sidebarOpen = $state(false);
</script>

<div class="flex min-h-screen bg-gray-50">
	<!-- Mobile sidebar toggle -->
	<button
		onclick={() => (sidebarOpen = !sidebarOpen)}
		class="fixed left-4 top-4 z-50 rounded-lg border border-gray-200 bg-white p-2 lg:hidden"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	</button>

	<!-- Sidebar -->
	<aside
		class="fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 bg-white transition-transform lg:translate-x-0"
		class:-translate-x-full={!sidebarOpen}
		class:translate-x-0={sidebarOpen}
	>
		<div class="flex h-16 items-center border-b border-gray-200 px-6">
			<a href="/admin/products" class="text-lg font-bold text-gray-900">ShoeShop Admin</a>
		</div>
		<nav class="mt-4 space-y-1 px-3">
			{#each navItems as item}
				<a
					href={item.href}
					class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition"
					class:bg-gray-100={pathname.startsWith(item.href)}
					class:text-gray-900={pathname.startsWith(item.href)}
					class:font-semibold={pathname.startsWith(item.href)}
					class:text-gray-600={!pathname.startsWith(item.href)}
					class:hover:bg-gray-50={!pathname.startsWith(item.href)}
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
					</svg>
					{item.label}
				</a>
			{/each}
		</nav>
		<div class="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
			<button
				onclick={handleLogout}
				class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
				</svg>
				Sign Out
			</button>
		</div>
	</aside>

	<!-- Overlay on mobile -->
	{#if sidebarOpen}
		<button
			onclick={() => (sidebarOpen = false)}
			class="fixed inset-0 z-30 bg-black/30 lg:hidden"
		></button>
	{/if}

	<!-- Main content -->
	<main class="flex-1 lg:ml-64">
		<div class="p-6">
			{@render children?.()}
		</div>
	</main>
</div>
