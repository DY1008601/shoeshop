<script lang="ts">
	import { page } from '$app/stores';

	let lang = $derived($page.params.lang || 'en');

	const slides = [
		{
			title: 'Step Into Style',
			subtitle: 'Discover our curated collection of premium sneakers. Built for comfort, designed for life.',
			cta: 'Shop Now',
			ctaHref: '/products',
			bg: 'bg-gray-900'
		},
		{
			title: 'New Season, New Kicks',
			subtitle: 'Fresh drops from Nike, Adidas, New Balance and more. Stay ahead of the curve.',
			cta: 'Explore New Arrivals',
			ctaHref: '/products?sort=newest',
			bg: 'bg-gray-800'
		},
		{
			title: 'Free Shipping Over $100',
			subtitle: 'Get your favorite sneakers delivered free worldwide. Fast and reliable shipping on every order.',
			cta: 'Start Shopping',
			ctaHref: '/products',
			bg: 'bg-gray-700'
		}
	];

	let current = $state(0);

	$effect(() => {
		const timer = setInterval(() => {
			current = (current + 1) % slides.length;
		}, 5000);
		return () => clearInterval(timer);
	});

	function goTo(i: number) {
		current = i;
	}
</script>

<section class="relative overflow-hidden {slides[current].bg} text-white">
	<div class="mx-auto max-w-7xl px-4 py-24 text-center transition-all duration-700 md:py-32">
		<h1 class="text-4xl font-bold tracking-tight md:text-6xl">
			{slides[current].title}
		</h1>
		<p class="mt-4 text-lg text-gray-300 md:text-xl">
			{slides[current].subtitle}
		</p>
		<div class="mt-8 flex justify-center gap-4">
			<a
				href={`/${lang}${slides[current].ctaHref}`}
				class="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
			>
				{slides[current].cta}
			</a>
			<a
				href={`/${lang}/blog`}
				class="rounded-lg border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
			>
				Read Our Blog
			</a>
		</div>
	</div>

	<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
		{#each slides as _, i}
			<button
				onclick={() => goTo(i)}
				class={`h-2 rounded-full transition-all ${current === i ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
				aria-label={`Go to slide ${i + 1}`}
			>
			</button>
		{/each}
	</div>
</section>
