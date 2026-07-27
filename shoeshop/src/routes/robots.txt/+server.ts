import { products } from '$lib/data/products';

const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://shoeshop.com';
const locales = (import.meta.env.PUBLIC_SUPPORTED_LOCALES || 'en').split(',');

const urls: string[] = [];
for (const lang of locales) {
	urls.push(`${siteUrl}/${lang}`);
	urls.push(`${siteUrl}/${lang}/products`);
	urls.push(`${siteUrl}/${lang}/blog`);
	for (const p of products) {
		urls.push(`${siteUrl}/${lang}/products/${p.handle}`);
	}
}

export async function GET() {
	const txt = `# https://www.robotstxt.org/
User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteUrl}/api/sitemap.xml

${urls.map((u) => `Allow: ${u}`).join('\n')}
`;

	return new Response(txt, {
		headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'max-age=3600' }
	});
}
