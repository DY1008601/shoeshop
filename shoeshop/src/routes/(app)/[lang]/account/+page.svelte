<script lang="ts">
	import { page } from '$app/stores';
	let lang = $derived($page.params.lang || 'en');
</script>

<svelte:head>
	<title>My Account - ShoeShop</title>
	<meta name="description" content="Manage your ShoeShop account, orders, and preferences." />
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-16">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">My Account</h1>

	<div class="grid gap-8 md:grid-cols-2">
		<div class="rounded-xl border border-gray-200 p-6">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Sign In</h2>
			<form class="space-y-4" onsubmit={(e) => e.preventDefault()}>
				<div>
					<label for="login-email" class="block text-sm font-medium text-gray-700">Email</label>
					<input type="email" id="login-email" class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none" />
				</div>
				<div>
					<label for="login-password" class="block text-sm font-medium text-gray-700">Password</label>
					<input type="password" id="login-password" class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none" />
				</div>
				<button type="submit" class="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800">
					Sign In
				</button>
			</form>
		</div>

		<div class="rounded-xl border border-gray-200 p-6">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Create Account</h2>
			<p class="mb-4 text-sm text-gray-600">Create an account to enjoy faster checkout, order tracking, and exclusive offers.</p>
			<form class="space-y-4" onsubmit={(e) => e.preventDefault()}>
				<div>
					<label for="reg-name" class="block text-sm font-medium text-gray-700">Full Name</label>
					<input type="text" id="reg-name" class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none" />
				</div>
				<div>
					<label for="reg-email" class="block text-sm font-medium text-gray-700">Email</label>
					<input type="email" id="reg-email" class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none" />
				</div>
				<div>
					<label for="reg-password" class="block text-sm font-medium text-gray-700">Password</label>
					<input type="password" id="reg-password" class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none" />
				</div>
				<button type="submit" class="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800">
					Create Account
				</button>
			</form>
		</div>
	</div>

	<div class="mt-12 rounded-xl border border-gray-200 p-6">
		<h2 class="mb-4 text-lg font-semibold text-gray-900">Order Tracking</h2>
		<p class="mb-4 text-sm text-gray-600">Enter your order number to track its status.</p>
		<form class="flex gap-2" onsubmit={(e) => e.preventDefault()}>
			<input type="text" placeholder="Order number (e.g. #ABC12345)" class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none" />
			<button type="submit" class="rounded-lg bg-gray-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-gray-800">
				Track
			</button>
		</form>
	</div>
</div>
