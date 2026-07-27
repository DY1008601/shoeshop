<script lang="ts">
	import { page } from '$app/stores';
	import NewsletterForm from '$lib/components/NewsletterForm.svelte';

	let lang = $derived($page.params.lang || 'en');

	let links = $derived({
		shop: [
			{ label: 'All Sneakers', href: `/${lang}/products` },
			{ label: 'New Arrivals', href: `/${lang}/products?sort=newest` },
			{ label: 'Sale', href: `/${lang}/products?sort=price-low` }
		],
		help: [
			{ label: 'Size Guide', href: `/${lang}/blog/size-guide` },
			{ label: 'Shipping Info', href: `/${lang}/shipping` },
			{ label: 'Returns', href: `/${lang}/returns` }
		],
		company: [
			{ label: 'About', href: `/${lang}/about` },
			{ label: 'Blog', href: `/${lang}/blog` },
			{ label: 'Contact', href: `/${lang}/contact` },
			{ label: 'FAQ', href: `/${lang}/faq` }
		],
		legal: [
			{ label: 'Privacy Policy', href: `/${lang}/privacy` },
			{ label: 'Terms of Service', href: `/${lang}/terms` }
		]
	});
</script>

<footer class="border-t border-gray-200 bg-gray-50">
	<div class="mx-auto max-w-7xl px-4 py-12">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-5">
			<div>
				<h3 class="text-lg font-bold text-gray-900">ShoeShop</h3>
				<p class="mt-2 text-sm text-gray-600">
					Premium sneakers for every step. Quality you can trust since 2024.
				</p>
				<div class="mt-4">
					<NewsletterForm />
				</div>
			</div>

			<div>
				<h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Shop</h4>
				<ul class="mt-3 space-y-2">
					{#each links.shop as link}
						<li>
							<a href={link.href} class="text-sm text-gray-600 hover:text-gray-900">{link.label}</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Help</h4>
				<ul class="mt-3 space-y-2">
					{#each links.help as link}
						<li>
							<a href={link.href} class="text-sm text-gray-600 hover:text-gray-900">{link.label}</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h4>
				<ul class="mt-3 space-y-2">
					{#each links.company as link}
						<li>
							<a href={link.href} class="text-sm text-gray-600 hover:text-gray-900">{link.label}</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h4>
				<ul class="mt-3 space-y-2">
					{#each links.legal as link}
						<li>
							<a href={link.href} class="text-sm text-gray-600 hover:text-gray-900">{link.label}</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
			&copy; {new Date().getFullYear()} ShoeShop. All rights reserved.
		</div>
	</div>
</footer>
