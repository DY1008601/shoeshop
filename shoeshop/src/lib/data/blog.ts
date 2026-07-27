export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	category: string;
	author: string;
	tags: string[];
	excerpt: string;
	lang: string;
	html: string;
}

export const categoryLabels: Record<string, string> = {
	'style-guide': 'Style Guide',
	'review': 'Review',
	'size-guide': 'Size Guide',
	'brand-story': 'Brand Story'
};

const modules = import.meta.glob('../../content/blog/*/*.md', { eager: true, query: '?raw', import: 'default' });

function parseFrontmatter(raw: string): { metadata: Record<string, unknown>; content: string } {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
	if (!match) return { metadata: {}, content: raw };

	const frontmatterStr = match[1];
	const content = match[2];
	const metadata: Record<string, unknown> = {};

	for (const line of frontmatterStr.split('\n')) {
		const kv = line.match(/^(\w+):\s*(.+)$/);
		if (!kv) continue;
		const key = kv[1];
		let value: string | string[] = kv[2].trim();

		if (value.startsWith('"') && value.endsWith('"')) {
			value = value.slice(1, -1);
		}

		if (value.startsWith('[') && value.endsWith(']')) {
			metadata[key] = value
				.slice(1, -1)
				.split(',')
				.map((s) => s.trim().replace(/^"(.*)"$/, '$1'))
				.filter(Boolean);
		} else {
			metadata[key] = value;
		}
	}

	return { metadata, content };
}

function markdownToHtml(md: string): string {
	let html = md
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

	html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
	html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
	html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

	html = html.replace(/^\- (.+)$/gm, '<li>$1</li>');
	html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

	html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
	html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

	html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
	html = html.replace(/<li>(.+?)<\/li>\n(?=<li>)/g, '<li>$1</li>');

	html = html.replace(/\n\n/g, '</p><p>');
	html = html.replace(/^(?!<[hul/])(.+)$/gm, '<p>$1</p>');

	html = html.replace(/<p><\/p>/g, '');
	html = html.replace(/<\/p>\n<p>/g, '</p><p>');
	html = html.replace(/<li>/g, '\n<li>');

	return '<p>' + html + '</p>';
}

const posts: BlogPost[] = [];

for (const [path, raw] of Object.entries(modules)) {
	const match = path.match(/\/blog\/([^/]+)\/(.+)\.md$/);
	if (!match) continue;

	const [, lang, slug] = match;
	const { metadata, content } = parseFrontmatter(raw as string);

	posts.push({
		slug,
		lang,
		title: (metadata.title as string) || slug,
		date: (metadata.date as string) || '',
		category: (metadata.category as string) || 'uncategorized',
		author: (metadata.author as string) || 'ShoeShop',
		tags: (metadata.tags as string[]) || [],
		excerpt: (metadata.excerpt as string) || '',
		html: markdownToHtml(content)
	});
}

posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getAllPosts(lang?: string): BlogPost[] {
	if (lang) return posts.filter((p) => p.lang === lang);
	return posts;
}

export function getPost(slug: string, lang?: string): BlogPost | undefined {
	if (lang) return posts.find((p) => p.slug === slug && p.lang === lang);
	return posts.find((p) => p.slug === slug);
}
