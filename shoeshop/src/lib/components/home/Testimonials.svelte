<script lang="ts">
	const testimonials = [
		{ name: 'Emily R.', text: 'Best online sneaker shopping experience I have had. Fast shipping and the shoes were exactly as described.', rating: 5 },
		{ name: 'James K.', text: 'The size guide was spot-on. I usually struggle finding the right fit, but my HOKAs fit perfectly.', rating: 5 },
		{ name: 'Sarah M.', text: 'Great selection and the returns process was super easy. Will definitely be ordering from ShoeShop again.', rating: 5 },
		{ name: 'Marcus T.', text: 'My go-to for running shoes now. The blog reviews helped me pick the right pair for marathon training.', rating: 5 }
	];

	let current = $state(0);

	$effect(() => {
		const timer = setInterval(() => {
			current = (current + 1) % testimonials.length;
		}, 6000);
		return () => clearInterval(timer);
	});

	function goTo(i: number) {
		current = i;
	}
</script>

<section class="bg-gray-900 py-16">
	<div class="mx-auto max-w-3xl px-4 text-center">
		<h2 class="mb-2 text-2xl font-bold text-white">What Our Customers Say</h2>
		<p class="mb-8 text-gray-400 text-sm">Trusted by thousands of sneaker lovers worldwide</p>

		<div class="relative min-h-[140px]">
			<blockquote class="text-lg text-gray-200 transition-opacity duration-500">
				"{testimonials[current].text}"
			</blockquote>
			<div class="mt-4 flex items-center justify-center gap-1">
				{#each Array.from({ length: testimonials[current].rating }) as _}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
					</svg>
				{/each}
			</div>
			<p class="mt-2 text-sm font-medium text-gray-400">&mdash; {testimonials[current].name}</p>
		</div>

		<div class="mt-6 flex justify-center gap-2">
			{#each testimonials as _, i}
				<button
					onclick={() => goTo(i)}
					class={`h-2 rounded-full transition-all ${current === i ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
					aria-label={`Testimonial ${i + 1}`}
				>
				</button>
			{/each}
		</div>
	</div>
</section>
