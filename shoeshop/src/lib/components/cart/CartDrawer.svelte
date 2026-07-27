<script lang="ts">
	import { page } from '$app/stores';
	import { cart } from '$lib/stores/cart';
	import { formatPrice } from '$lib/utils/format';
	import { fly } from 'svelte/transition';

	interface Props {
		open: boolean;
		onclose: () => void;
	}

	let { open, onclose }: Props = $props();
	let lang = $derived($page.params.lang || 'en');

	function handleOverlayClick(e: MouseEvent) {
		if (e.target === e.currentTarget) onclose();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onclose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div
		onclick={handleOverlayClick}
		class="fixed inset-0 z-50 bg-black/40 transition-opacity"
		role="dialog"
		aria-modal="true"
		aria-label="Shopping cart"
	>
		<div
			class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
			transition:fly={{ x: 100, duration: 250 }}
		>
			<div class="flex h-full flex-col">
				<div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
					<h2 class="text-lg font-bold text-gray-900">
						Cart ({$cart.totalQuantity})
					</h2>
					<button onclick={onclose} class="text-gray-400 hover:text-gray-900" aria-label="Close cart">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div class="flex-1 overflow-y-auto px-6 py-4">
					{#if $cart.items.length === 0}
						<div class="py-12 text-center">
							<p class="text-gray-500">Your cart is empty</p>
						</div>
					{:else}
						<div class="space-y-4">
							{#each $cart.items as item (item.variantId)}
								<div class="flex gap-3">
									<div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
										{#if item.image}
											<img src={item.image.url} alt={item.title} class="h-full w-full object-cover" />
										{/if}
									</div>
									<div class="min-w-0 flex-1">
										<p class="text-sm font-medium text-gray-900 truncate">{item.title}</p>
										<p class="text-xs text-gray-500">{item.variantTitle}</p>
										<div class="mt-1 flex items-center gap-2">
											<button
												onclick={() => cart.updateQuantity(item.variantId, item.quantity - 1)}
												class="rounded border border-gray-300 px-1.5 py-0.5 text-xs text-gray-500 hover:text-gray-900"
											>
												&minus;
											</button>
											<span class="text-sm font-medium">{item.quantity}</span>
											<button
												onclick={() => cart.updateQuantity(item.variantId, item.quantity + 1)}
												class="rounded border border-gray-300 px-1.5 py-0.5 text-xs text-gray-500 hover:text-gray-900"
											>
												+
											</button>
										</div>
										<div class="flex items-center justify-between mt-1">
											<span class="text-sm font-semibold text-gray-900">
												{formatPrice((parseFloat(item.price.amount) * item.quantity).toString(), item.price.currencyCode)}
											</span>
											<button
												onclick={() => cart.removeItem(item.variantId)}
												class="text-xs text-red-500 hover:text-red-700"
											>
												Remove
											</button>
										</div>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>

				{#if $cart.items.length > 0}
					<div class="border-t border-gray-200 px-6 py-4">
						<div class="flex justify-between text-sm mb-3">
							<span class="text-gray-600">Subtotal</span>
							<span class="font-bold text-gray-900">{$cart.totalAmount} {$cart.currencyCode}</span>
						</div>
						<a
							href={`/${lang}/checkout`}
							onclick={onclose}
							class="block w-full rounded-lg bg-gray-900 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
						>
							Checkout &mdash; {$cart.totalAmount} {$cart.currencyCode}
						</a>
						<a
							href={`/${lang}/cart`}
							onclick={onclose}
							class="mt-2 block w-full text-center text-sm text-gray-500 underline hover:text-gray-900"
						>
							View Full Cart
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
