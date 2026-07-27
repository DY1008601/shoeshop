import { derived, writable } from 'svelte/store';
import { page } from '$app/stores';

const supportedLocales = (import.meta.env.PUBLIC_SUPPORTED_LOCALES || 'en').split(',');
const defaultLocale = import.meta.env.PUBLIC_DEFAULT_LOCALE || 'en';

export function getLocaleFromPath(pathname: string): string {
	const segment = pathname.split('/')[1];
	if (supportedLocales.includes(segment)) return segment;
	return defaultLocale;
}

export const locale = derived(page, ($page) => {
	return getLocaleFromPath($page.url.pathname);
});

interface Translations {
	[namespace: string]: Record<string, string>;
}

const translationCache: Record<string, Translations> = {};

export async function loadTranslations(locale: string): Promise<Translations> {
	if (translationCache[locale]) return translationCache[locale];

	const namespaces = ['common', 'product', 'checkout', 'blog'];
	const translations: Translations = {};

	for (const ns of namespaces) {
		try {
			const mod = await import(`../translations/${locale}/${ns}.json`);
			translations[ns] = mod.default;
		} catch {
			const fallback = await import(`../translations/en/${ns}.json`);
			translations[ns] = fallback.default;
		}
	}

	translationCache[locale] = translations;
	return translations;
}

export function t(translations: Translations, key: string): string {
	const [ns, ...rest] = key.split('.');
	const k = rest.join('.');
	return translations[ns]?.[k] ?? key;
}
