<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Something went wrong - ShoeShop</title>
</svelte:head>

<div class="flex min-h-[60vh] items-center justify-center px-4 py-16">
	<div class="text-center">
		<p class="text-8xl font-bold text-gray-200">500</p>
		<h1 class="mt-4 text-2xl font-bold text-gray-900">Something Went Wrong</h1>
		<p class="mt-2 text-gray-500">We're sorry, but something unexpected happened. Please try again.</p>
		<div class="mt-8 flex justify-center gap-4">
			<a href="/en" class="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">
				Go Home
			</a>
			<button
				onclick={() => window.location.reload()}
				class="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
			>
				Retry
			</button>
		</div>
	</div>
</div>
