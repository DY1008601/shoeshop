<script lang="ts">
	import { page } from '$app/stores';
	let lang = $derived($page.params.lang || 'en');
	let submitted = $state(false);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		submitted = true;
	}
</script>

<svelte:head>
	<title>Contact Us - ShoeShop</title>
	<meta name="description" content="Get in touch with the ShoeShop team. We're here to help." />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-16">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">Contact Us</h1>

	<div class="grid gap-8 md:grid-cols-2">
		<div>
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Get in Touch</h2>
			<div class="space-y-4 text-sm text-gray-600">
				<div>
					<h3 class="font-medium text-gray-900">Email</h3>
					<p>support@shoeshop.com</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900">Phone</h3>
					<p>+1 (555) 123-4567</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900">Hours</h3>
					<p>Monday - Friday: 9am - 6pm EST</p>
					<p>Saturday: 10am - 4pm EST</p>
				</div>
				<div>
					<h3 class="font-medium text-gray-900">Address</h3>
					<p>123 Sneaker Street<br/>New York, NY 10001<br/>United States</p>
				</div>
			</div>
		</div>

		<div>
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Send a Message</h2>
			{#if submitted}
				<div class="rounded-lg bg-green-50 p-4 text-sm text-green-700">
					Thank you for your message! We'll get back to you within 24 hours.
				</div>
			{:else}
				<form onsubmit={handleSubmit} class="space-y-4">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
						<input type="text" id="name" required class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none" />
					</div>
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
						<input type="email" id="email" required class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none" />
					</div>
					<div>
						<label for="message" class="block text-sm font-medium text-gray-700">Message</label>
						<textarea id="message" rows="4" required class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none"></textarea>
					</div>
					<button type="submit" class="w-full rounded-lg bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">
						Send Message
					</button>
				</form>
			{/if}
		</div>
	</div>
</div>
