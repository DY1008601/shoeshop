const PAYPAL_CLIENT_ID = import.meta.env.PUBLIC_PAYPAL_CLIENT_ID || 'test';
const PAYPAL_CURRENCY = import.meta.env.PUBLIC_PAYPAL_CURRENCY || 'USD';

let scriptLoaded = false;
let scriptPromise: Promise<void> | null = null;

export function loadPayPalSDK(): Promise<void> {
	if (scriptLoaded) return Promise.resolve();
	if (scriptPromise) return scriptPromise;

	scriptPromise = new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${PAYPAL_CURRENCY}&intent=capture`;
		script.async = true;
		script.onload = () => {
			scriptLoaded = true;
			resolve();
		};
		script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
		document.head.appendChild(script);
	});

	return scriptPromise;
}

export function getPayPalCurrency(): string {
	return PAYPAL_CURRENCY;
}
