import { derived } from 'svelte/store';
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

interface NamespaceTranslations {
	[key: string]: string;
}

interface Translations {
	[key: string]: NamespaceTranslations;
}

const translationModules = import.meta.glob<{ default: NamespaceTranslations }>(
	'../translations/*/*.json',
	{ eager: true }
);

const translationData: Record<string, Translations> = {};

for (const [path, mod] of Object.entries(translationModules)) {
	const match = path.match(/\/translations\/([^/]+)\/([^/]+)\.json$/);
	if (match) {
		const [, locale, namespace] = match;
		const ns = namespace.replace('.json', '');
		if (!translationData[locale]) translationData[locale] = {};
		translationData[locale][ns] = mod.default;
	}
}

export function loadTranslations(locale: string): Translations {
	return translationData[locale] || translationData.en || {};
}

export function t(translations: Translations, key: string): string {
	const [ns, ...rest] = key.split('.');
	const k = rest.join('.');
	return translations[ns]?.[k] ?? key;
}
