<script lang="ts">
	import { page } from '$app/stores';

	let lang = $derived($page.params.lang || 'en');
</script>

<svelte:head>
	<title>Page Not Found - ShoeShop</title>
	<meta name="description" content="The page you're looking for doesn't exist." />
</svelte:head>

<div class="flex min-h-[60vh] items-center justify-center px-4 py-16">
	<div class="text-center">
		<p class="text-8xl font-bold text-gray-200">404</p>
		<h1 class="mt-4 text-2xl font-bold text-gray-900">Page Not Found</h1>
		<p class="mt-2 text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
		<div class="mt-8 flex justify-center gap-4">
			<a href={`/${lang}`} class="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">
				Go Home
			</a>
			<a href={`/${lang}/products`} class="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
				Browse Products
			</a>
		</div>
	</div>
</div>
