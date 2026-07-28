<script lang="ts">
	import { onMount } from 'svelte';

	let storeName = $state('');
	let storeDescription = $state('');
	let newPassword = $state('');
	let loading = $state(true);
	let saving = $state(false);
	let successMessage = $state('');

	onMount(async () => {
		try {
			const res = await fetch('/api/admin/settings');
			if (!res.ok) throw new Error();
			const data = await res.json();
			storeName = data.store_name ?? '';
			storeDescription = data.store_description ?? '';
		} catch { /* redirect to login handled by server */ }
		loading = false;
	});

	async function handleSave() {
		saving = true;
		successMessage = '';
		try {
			const body: Record<string, string> = {
				store_name: storeName,
				store_description: storeDescription
			};
			if (newPassword) {
				body.new_password = newPassword;
			}
			const res = await fetch('/api/admin/settings', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			});
			if (res.ok) {
				successMessage = 'Settings saved successfully.';
				newPassword = '';
			}
		} catch { /* handle error */ }
		saving = false;
	}
</script>

<svelte:head>
	<title>Settings - Admin - ShoeShop</title>
</svelte:head>

<div>
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Settings</h1>
	</div>

	{#if loading}
		<p class="mt-8 text-sm text-gray-500">Loading...</p>
	{:else}
		<div class="mt-6 max-w-2xl rounded-xl border border-gray-200 bg-white p-6">
			<div class="space-y-5">
				<div>
					<label for="storeName" class="block text-sm font-medium text-gray-700">Store Name</label>
					<input
						id="storeName"
						type="text"
						bind:value={storeName}
						class="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-gray-400 focus:outline-none"
					/>
				</div>

				<div>
					<label for="storeDescription" class="block text-sm font-medium text-gray-700">Store Description</label>
					<textarea
						id="storeDescription"
						bind:value={storeDescription}
						rows="3"
						class="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-gray-400 focus:outline-none"
					></textarea>
				</div>

				<div>
					<label for="newPassword" class="block text-sm font-medium text-gray-700">
						New Password
						<span class="text-xs font-normal text-gray-400">(optional)</span>
					</label>
					<input
						id="newPassword"
						type="password"
						bind:value={newPassword}
						placeholder="Leave blank to keep current"
						class="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-gray-400 focus:outline-none"
					/>
				</div>

				{#if successMessage}
					<p class="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">{successMessage}</p>
				{/if}

				<button
					onclick={handleSave}
					disabled={saving}
					class="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
				>
					{saving ? 'Saving...' : 'Save Changes'}
				</button>
			</div>
		</div>
	{/if}
</div>
