export function buildMeta({
	title,
	description,
	url,
	image,
	type = 'website'
}: {
	title: string;
	description: string;
	url?: string;
	image?: string;
	type?: string;
}) {
	const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://shoeshop.com';
	const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

	return {
		title,
		description,
		og: {
			title,
			description,
			type,
			url: fullUrl,
			image,
			siteName: 'ShoeShop'
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			image
		}
	};
}

export function productSchema(product: {
	title: string;
	description: string;
	image?: string;
	price: string;
	currency: string;
	inStock: boolean;
	brand: string;
	url?: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.title,
		description: product.description,
		image: product.image,
		offers: {
			'@type': 'Offer',
			price: product.price,
			priceCurrency: product.currency,
			availability: product.inStock
				? 'https://schema.org/InStock'
				: 'https://schema.org/OutOfStock'
		},
		brand: { '@type': 'Brand', name: product.brand }
	};
}

export function articleSchema(post: {
	title: string;
	description: string;
	datePublished: string;
	author: string;
	url?: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.description,
		datePublished: post.datePublished,
		author: { '@type': 'Person', name: post.author }
	};
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: item.url
		}))
	};
}

export function organizationSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'ShoeShop',
		url: import.meta.env.PUBLIC_SITE_URL || 'https://shoeshop.com',
		description: 'Premium sneakers for every step. Quality you can trust.',
		sameAs: []
	};
}
