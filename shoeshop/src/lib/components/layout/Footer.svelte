<script lang="ts">
	import { page } from '$app/stores';

	let lang = $derived($page.params.lang || 'en');

	let links = $derived({
		shop: [
			{ label: 'All Sneakers', href: `/${lang}/products` },
			{ label: 'New Arrivals', href: `/${lang}/products?sort=newest` },
			{ label: 'Sale', href: `/${lang}/products?sort=price-low` }
		],
		help: [
			{ label: 'Size Guide', href: `/${lang}/blog/ultimate-sneaker-size-guide` },
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

	const socials = [
		{ name: 'Twitter', href: '#', path: 'M8.283 2.639h3.91L8.9 10.786l3.646 5.866H8.125L5.467 12.14l-3.014 4.512H.443l3.984-5.73L1.161 2.639h3.29l2.186 3.52 1.646-3.52z' },
		{ name: 'Instagram', href: '#', path: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m.2 2A3.6 3.6 0 004.4 7.6v8.8C4.4 18.39 6.01 20 8 20h8a3.6 3.6 0 003.6-3.6V7.6C19.6 5.61 17.99 4 16 4H8zm9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z' },
		{ name: 'Facebook', href: '#', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
		{ name: 'YouTube', href: '#', path: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29.94 29.94 0 001 11.75a29.94 29.94 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29.94 29.94 0 00.46-5.25 29.94 29.94 0 00-.46-5.33z' },
	];
</script>

<footer class="border-t border-gray-200 bg-gray-50">
	<div class="mx-auto max-w-7xl px-4 py-12">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-5">
			<div>
				<h3 class="text-lg font-bold text-gray-900">ShoeShop</h3>
				<p class="mt-2 text-sm text-gray-600">
					Premium sneakers for every step. Quality you can trust since 2024.
				</p>
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

		<div class="mt-8 border-t border-gray-200 pt-8">
			<div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
				<div class="flex items-center gap-3">
					{#each socials as social}
						<a
							href={social.href}
							class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400 transition hover:border-gray-900 hover:text-gray-900"
							aria-label={social.name}
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={social.path} />
							</svg>
						</a>
					{/each}
				</div>
				<p class="text-sm text-gray-500">
					&copy; {new Date().getFullYear()} ShoeShop. All rights reserved.
				</p>
			</div>
		</div>
	</div>
</footer>
