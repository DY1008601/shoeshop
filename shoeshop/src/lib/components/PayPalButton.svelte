<script lang="ts">
	interface Props {
		total: string;
		currency: string;
		onSuccess: (orderID: string) => void;
		onError?: (error: Error) => void;
	}

	let { total, currency, onSuccess, onError }: Props = $props();

	let ready = $state(false);
	let error = $state('');

	async function initPayPal() {
		try {
			const { loadPayPalSDK } = await import('$lib/paypal');
			await loadPayPalSDK();

			const paypal = (window as any).paypal;
			if (!paypal) throw new Error('PayPal SDK not available');

			paypal.Buttons({
				style: {
					layout: 'vertical',
					color: 'black',
					shape: 'rect',
					label: 'pay'
				},
				createOrder: async () => {
					const response = await fetch('/api/paypal/create-order', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ total, currency })
					});
					const data = await response.json();
					if (!response.ok) throw new Error(data.error || 'Failed to create order');
					return data.orderID;
				},
				onApprove: async (data: { orderID: string }) => {
					const response = await fetch('/api/paypal/capture-order', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ orderID: data.orderID })
					});
					const result = await response.json();
					if (!response.ok) throw new Error(result.error || 'Payment failed');
					onSuccess(data.orderID);
				},
				onError: (err: any) => {
					error = err.message || 'Payment failed';
					onError?.(err);
				}
			}).render('#paypal-button-container');

			ready = true;
		} catch (e: any) {
			error = e.message || 'Failed to initialize PayPal';
		}
	}

	$effect(() => {
		initPayPal();
	});
</script>

<div>
	{#if error}
		<div class="rounded-lg bg-red-50 p-4 text-sm text-red-600">
			{error}
		</div>
	{/if}

	<div id="paypal-button-container" class:opacity-0={!ready} class="transition-opacity duration-300"></div>

	{#if !ready && !error}
		<div class="py-8 text-center text-sm text-gray-400">Loading payment options...</div>
	{/if}
</div>
