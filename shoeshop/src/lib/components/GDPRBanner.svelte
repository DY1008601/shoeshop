<script lang="ts">
	import { slide } from 'svelte/transition';

	let dismissed = $state(false);
	let visible = $state(false);

	$effect(() => {
		if (typeof localStorage !== 'undefined' && !localStorage.getItem('cookie-consent')) {
			visible = true;
		}
	});

	function accept() {
		localStorage.setItem('cookie-consent', 'accepted');
		dismissed = true;
	}

	function decline() {
		localStorage.setItem('cookie-consent', 'declined');
		dismissed = true;
	}
</script>

{#if visible && !dismissed}
	<div class="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg" transition:slide>
		<div class="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between">
			<div class="flex-1">
				<p class="text-sm text-gray-600">
					We use cookies to improve your experience. By continuing, you agree to our use of cookies.
					<a href="/en/privacy" class="text-gray-900 underline">Privacy Policy</a>
				</p>
			</div>
			<div class="flex gap-2">
				<button
					onclick={decline}
					class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
				>
					Decline
				</button>
				<button
					onclick={accept}
					class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
				>
					Accept
				</button>
			</div>
		</div>
	</div>
{/if}
