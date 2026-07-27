export interface Money {
	amount: string;
	currencyCode: string;
}

export interface Image {
	url: string;
	altText: string | null;
	width: number;
	height: number;
}

export interface SEO {
	title: string;
	description: string;
}

export interface ProductOption {
	name: string;
	values: string[];
}

export interface ProductVariant {
	id: string;
	title: string;
	availableForSale: boolean;
	selectedOptions: { name: string; value: string }[];
	price: Money;
	compareAtPrice: Money | null;
	image: Image | null;
}

export interface Product {
	id: string;
	handle: string;
	title: string;
	description: string;
	descriptionHtml: string;
	featuredImage: Image | null;
	images: { edges: { node: Image }[] };
	options: ProductOption[];
	variants: { edges: { node: ProductVariant }[] };
	collections: { edges: { node: { handle: string; title: string } }[] };
	seo: SEO;
	priceRange: {
		minVariantPrice: Money;
		maxVariantPrice: Money;
	};
}

export interface Collection {
	id: string;
	handle: string;
	title: string;
	description: string;
	image: Image | null;
	seo: SEO;
}

export interface CartLine {
	id: string;
	quantity: number;
	merchandise: {
		id: string;
		title: string;
		price: Money;
		image: Image | null;
		product: { handle: string; title: string };
	};
}

export interface Cart {
	id: string;
	checkoutUrl: string;
	totalQuantity: number;
	lines: { edges: { node: CartLine }[] };
	cost: {
		totalAmount: Money;
		subtotalAmount: Money;
	};
}

export interface CartItem {
	id: string;
	variantId: string;
	productHandle: string;
	title: string;
	variantTitle: string;
	price: Money;
	image: Image | null;
	quantity: number;
}
