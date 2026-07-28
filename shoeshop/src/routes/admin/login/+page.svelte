<script lang="ts">
	import { goto } from '$app/navigation';

	let username = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleLogin(e: SubmitEvent) {
		e.preventDefault();
		loading = true;
		error = '';

		const res = await fetch('/api/admin/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		if (res.ok) {
			goto('/admin/products');
		} else {
			error = 'Invalid credentials';
		}

		loading = false;
	}
</script>

<svelte:head>
	<title>Admin Login - ShoeShop</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-50">
	<div class="w-full max-w-sm">
		<div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
			<h1 class="text-center text-xl font-bold text-gray-900">ShoeShop Admin</h1>
			<p class="mt-1 text-center text-sm text-gray-500">Sign in to manage your store</p>

			<form onsubmit={handleLogin} class="mt-6 space-y-4">
				<div>
					<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
					<input
						id="username"
						bind:value={username}
						type="text"
						required
						class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
						placeholder="admin"
					/>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<input
						id="password"
						bind:value={password}
						type="password"
						required
						class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
						placeholder="Enter password"
					/>
				</div>

				{#if error}
					<p class="text-sm text-red-500">{error}</p>
				{/if}

				<button
					type="submit"
					disabled={loading}
					class="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
				>
					{loading ? 'Signing in...' : 'Sign In'}
				</button>
			</form>
		</div>

		<p class="mt-4 text-center text-xs text-gray-400">
			Default: admin / admin123
		</p>
	</div>
</div>
