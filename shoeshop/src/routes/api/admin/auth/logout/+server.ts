import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateSession, clearSession, SESSION_COOKIE } from '$lib/server/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { username } = await request.json();
	if (username) clearSession(username);

	cookies.delete(SESSION_COOKIE, { path: '/' });
	return json({ success: true });
};
