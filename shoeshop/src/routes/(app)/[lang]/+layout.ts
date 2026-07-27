import { loadTranslations } from '$lib/i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	const translations = await loadTranslations(params.lang);
	return { translations, lang: params.lang };
};
