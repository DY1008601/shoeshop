<script lang="ts">
	let email = $state('');
	let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!email || status === 'submitting') return;

		status = 'submitting';

		try {
			const res = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});

			if (res.ok) {
				status = 'success';
			} else {
				throw new Error('Failed');
			}
		} catch {
			errorMessage = 'Something went wrong. Please try again.';
			status = 'error';
		}
	}
</script>

<div>
	{#if status === 'success'}
		<div class="rounded-lg bg-green-50 p-4 text-center">
			<p class="text-sm font-medium text-green-700">You&apos;re subscribed! Check your inbox for a confirmation.</p>
		</div>
	{:else}
		<form onsubmit={handleSubmit} class="flex flex-col items-center gap-3 sm:flex-row">
			<input
				type="email"
				bind:value={email}
				placeholder="your@email.com"
				required
				class="w-full min-w-[280px] rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none sm:w-72"
			/>
			<button
				type="submit"
				disabled={status === 'submitting'}
				class="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
			>
				{#if status === 'submitting'}
					Subscribing...
				{:else}
					Subscribe
				{/if}
			</button>
		</form>
		{#if status === 'error'}
			<p class="mt-2 text-xs text-red-500">{errorMessage}</p>
		{/if}
	{/if}
</div>
