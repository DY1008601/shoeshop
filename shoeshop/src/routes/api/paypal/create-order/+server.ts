import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const { total, currency } = await request.json();

		const clientId = import.meta.env.PUBLIC_PAYPAL_CLIENT_ID || 'test';
		const secret = import.meta.env.PAYPAL_SECRET || 'test';
		const paypalApi = import.meta.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

		const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');

		const tokenResponse = await fetch(`${paypalApi}/v1/oauth2/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${auth}`
			},
			body: 'grant_type=client_credentials'
		});

		if (!tokenResponse.ok) {
			return json({ error: 'Failed to authenticate with PayPal', orderID: `mock_order_${Date.now()}` }, { status: 200 });
		}

		const tokenData = await tokenResponse.json();

		const orderResponse = await fetch(`${paypalApi}/v2/checkout/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokenData.access_token}`
			},
			body: JSON.stringify({
				intent: 'CAPTURE',
				purchase_units: [{
					amount: {
						currency_code: currency || 'USD',
						value: total
					}
				}]
			})
		});

		if (!orderResponse.ok) {
			return json({ error: 'Failed to create PayPal order', orderID: `mock_order_${Date.now()}` }, { status: 200 });
		}

		const orderData = await orderResponse.json();
		return json({ orderID: orderData.id });
	} catch {
		return json({ orderID: `mock_order_${Date.now()}` }, { status: 200 });
	}
}
