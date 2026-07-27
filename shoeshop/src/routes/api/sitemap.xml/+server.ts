import { getAllPosts } from '$lib/data/blog';
import { products } from '$lib/data/products';

export async function GET() {
	const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://shoeshop.com';
	const supportedLocales = (import.meta.env.PUBLIC_SUPPORTED_LOCALES || 'en').split(',');

	const urls: string[] = [];

	for (const lang of supportedLocales) {
		urls.push(`${siteUrl}/${lang}`);

		urls.push(`${siteUrl}/${lang}/products`);
		urls.push(`${siteUrl}/${lang}/blog`);
		urls.push(`${siteUrl}/${lang}/cart`);

		for (const product of products) {
			urls.push(`${siteUrl}/${lang}/products/${product.handle}`);
		}

		const posts = getAllPosts(lang);
		for (const post of posts) {
			urls.push(`${siteUrl}/${lang}/blog/${post.slug}`);
		}
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
		xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((url) => `  <url>
	<loc>${url}</loc>
	<changefreq>weekly</changefreq>
	<priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}
