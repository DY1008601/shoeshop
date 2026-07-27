import { getAllPosts } from '$lib/data/blog';

export async function GET() {
	const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://shoeshop.com';
	const posts = getAllPosts('en');

	const items = posts.map((post) => `    <item>
      <title>${post.title}</title>
      <link>${siteUrl}/en/blog/${post.slug}</link>
      <description>${post.excerpt}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
      <category>${post.category}</category>
    </item>`).join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ShoeShop Blog</title>
    <link>${siteUrl}/en/blog</link>
    <description>Expert sneaker reviews, style guides, and size guides.</description>
    <language>en</language>
    <atom:link href="${siteUrl}/api/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}
