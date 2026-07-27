<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	interface Props {
		reviews: Review[];
		productHandle?: string;
	}

	interface Review {
		name: string;
		rating: number;
		date: string;
		title: string;
		body: string;
		verified?: boolean;
	}

	let { reviews, productHandle = '' }: Props = $props();

	let userReviews = $state<Review[]>([]);
	let showForm = $state(false);
	let newRating = $state(0);
	let newName = $state('');
	let newTitle = $state('');
	let newBody = $state('');
	let submitted = $state(false);

	onMount(() => {
		if (productHandle) {
			try {
				const stored = localStorage.getItem(`shoeshop-reviews-${productHandle}`);
				if (stored) userReviews = JSON.parse(stored);
			} catch { /* */ }
		}
	});

	let allReviews = $derived([...reviews, ...userReviews]);

	function stars(rating: number) {
		return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
	}

	function submitReview() {
		if (!newRating || !newName.trim() || !newTitle.trim() || !newBody.trim()) return;
		const review: Review = {
			name: newName.trim(),
			rating: newRating,
			date: new Date().toISOString().split('T')[0],
			title: newTitle.trim(),
			body: newBody.trim()
		};
		userReviews = [review, ...userReviews];
		try {
			localStorage.setItem(`shoeshop-reviews-${productHandle}`, JSON.stringify(userReviews));
		} catch { /* */ }
		newRating = 0;
		newName = '';
		newTitle = '';
		newBody = '';
		submitted = true;
		setTimeout(() => { submitted = false; }, 3000);
	}
</script>

<div class="mt-16 border-t border-gray-200 pt-16">
	<div class="flex items-center gap-4 mb-8">
		<h2 class="text-xl font-bold text-gray-900">Customer Reviews</h2>
		<div class="flex items-center gap-1">
			{#each stars(allReviews.length > 0 ? allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length : 0) as filled}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" class:text-yellow-400={filled} class:text-gray-300={!filled} viewBox="0 0 20 20" fill="currentColor">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			{/each}
		</div>
		<span class="text-sm text-gray-500">
			{allReviews.length} review{allReviews.length !== 1 ? 's' : ''}
		</span>
	</div>

	{#if !showForm}
		<button
			onclick={() => (showForm = true)}
			class="mb-8 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
		>
			Write a Review
		</button>

		{#if submitted}
			<p class="mb-4 text-sm text-green-600">Thank you! Your review has been submitted.</p>
		{/if}
	{:else}
		<div class="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
			<h3 class="mb-4 text-sm font-semibold text-gray-900">Write a Review</h3>

			<div class="mb-4">
				<label class="block mb-1 text-xs font-medium text-gray-700">Rating</label>
				<div class="flex gap-1">
					{#each [1, 2, 3, 4, 5] as star}
						<button onclick={() => (newRating = star)} aria-label="{star} star{star > 1 ? 's' : ''}">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors" class:fill-yellow-400={star <= newRating} class:fill-none={star > newRating} class:stroke-yellow-400 viewBox="0 0 20 20" stroke="currentColor">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						</button>
					{/each}
				</div>
			</div>

			<div class="mb-4 flex gap-4">
				<div class="flex-1">
					<label class="block mb-1 text-xs font-medium text-gray-700">Name</label>
					<input bind:value={newName} type="text" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none" placeholder="Your name" />
				</div>
			</div>

			<div class="mb-4">
				<label class="block mb-1 text-xs font-medium text-gray-700">Title</label>
				<input bind:value={newTitle} type="text" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none" placeholder="Summary of your review" />
			</div>

			<div class="mb-4">
				<label class="block mb-1 text-xs font-medium text-gray-700">Review</label>
				<textarea bind:value={newBody} rows={3} class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none" placeholder="What did you like or dislike?"></textarea>
			</div>

			<div class="flex gap-3">
				<button onclick={submitReview} disabled={!newRating || !newName.trim() || !newTitle.trim() || !newBody.trim()} class="rounded-lg bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition disabled:cursor-not-allowed disabled:bg-gray-300">
					Submit Review
				</button>
				<button onclick={() => { showForm = false; newRating = 0; }} class="rounded-lg border border-gray-300 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
					Cancel
				</button>
			</div>
		</div>
	{/if}

	<div class="space-y-8">
		{#each allReviews as review}
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
