<script lang="ts">
	interface Props {
		reviews: Review[];
	}

	interface Review {
		name: string;
		rating: number;
		date: string;
		title: string;
		body: string;
		verified?: boolean;
	}

	let { reviews }: Props = $props();

	function stars(rating: number) {
		return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
	}
</script>

<div class="mt-16 border-t border-gray-200 pt-16">
	<div class="flex items-center gap-4 mb-8">
		<h2 class="text-xl font-bold text-gray-900">Customer Reviews</h2>
		<div class="flex items-center gap-1">
			{#each stars(reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0) as filled}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" class:text-yellow-400={filled} class:text-gray-300={!filled} viewBox="0 0 20 20" fill="currentColor">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			{/each}
		</div>
		<span class="text-sm text-gray-500">
			{reviews.length} review{reviews.length !== 1 ? 's' : ''}
		</span>
	</div>

	<div class="space-y-8">
		{#each reviews as review}
			<div class="border-b border-gray-100 pb-6">
				<div class="flex items-center gap-2 mb-1">
					<div class="flex items-center gap-0.5">
						{#each stars(review.rating) as filled}
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" class:text-yellow-400={filled} class:text-gray-300={!filled} viewBox="0 0 20 20" fill="currentColor">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						{/each}
					</div>
					<span class="text-sm font-medium text-gray-900">{review.title}</span>
					{#if review.verified}
						<span class="text-xs text-green-600 font-medium">Verified Purchase</span>
					{/if}
				</div>
				<div class="flex items-center gap-2 mb-2 text-xs text-gray-400">
					<span>{review.name}</span>
					<span>&middot;</span>
					<span>{review.date}</span>
				</div>
				<p class="text-sm text-gray-600">{review.body}</p>
			</div>
		{/each}
	</div>
</div>
