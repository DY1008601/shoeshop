import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const { email } = await request.json();

		if (!email || !email.includes('@')) {
			return json({ error: 'Invalid email' }, { status: 400 });
		}

		return json({ success: true });
	} catch {
		return json({ error: 'Failed to subscribe' }, { status: 500 });
	}
}
