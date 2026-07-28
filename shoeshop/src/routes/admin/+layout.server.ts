import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { validateSession, SESSION_COOKIE } from '$lib/server/auth';

export const load: LayoutServerLoad = async ({ url, cookies }) => {
	if (url.pathname === '/admin/login') return {};

	const token = cookies.get(SESSION_COOKIE);
	if (!token || !validateSession(token)) {
		throw redirect(302, '/admin/login');
	}

	return {};
};
