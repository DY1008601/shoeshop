import type { Product } from '$lib/shopify/types';

function variant(id: string, color: string, size: string, price: string, compareAt?: string) {
	return {
		node: {
			id,
			title: `${color} / ${size}`,
			availableForSale: true,
			selectedOptions: [
				{ name: 'Color', value: color },
				{ name: 'Size', value: size }
			],
			price: { amount: price, currencyCode: 'USD' },
			compareAtPrice: compareAt ? { amount: compareAt, currencyCode: 'USD' } : null,
			image: null
		}
	};
}

const sizes = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];

function variants(colors: string[], basePrice: string, saleColor?: string, salePrice?: string) {
	const edges: ReturnType<typeof variant>[] = [];
	for (const c of colors) {
		for (const s of sizes) {
			const price = (saleColor && c === saleColor && salePrice) ? salePrice : basePrice;
			const compareAt = (saleColor && c === saleColor) ? basePrice : undefined;
			edges.push(variant(`v-${c.replace(/\s+/g, '-')}-${s.replace(/\s+/g, '-')}`, c, s, price, compareAt));
		}
	}
	return { edges };
}

function priceRange(min: string, max?: string) {
	return { minVariantPrice: { amount: min, currencyCode: 'USD' }, maxVariantPrice: { amount: max || min, currencyCode: 'USD' } };
}

function collection(handle: string, title: string) {
	return { edges: [{ node: { handle, title } }] };
}

export const products: Product[] = [
	{
		id: 'gid://shopify/Product/1',
		handle: 'nike-air-max-pulse',
		title: 'Nike Air Max Pulse',
		description: 'Step into the future with the Air Max Pulse. A sleek design meets maximum comfort.',
		descriptionHtml: '<p>Step into the future with the Air Max Pulse. A sleek design meets maximum comfort with the iconic Air Max cushioning. The breathable mesh upper keeps your feet cool, while the rubber outsole provides durable traction.</p><p>Perfect for everyday wear or light training sessions.</p>',
		featuredImage: { url: '/images/shoes/nike-air-max-pulse.svg', altText: 'Nike Air Max Pulse', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: sizes },
			{ name: 'Color', values: ['Black', 'White', 'Grey'] }
		],
		variants: variants(['Black', 'White', 'Grey'], '150.00', 'Black', '120.00'),
		collections: collection('running', 'Running'),
		seo: { title: 'Nike Air Max Pulse - Premium Running Shoes', description: 'Experience ultimate comfort with the Nike Air Max Pulse. Breathable mesh upper and iconic Air Max cushioning.' },
		priceRange: priceRange('120.00', '150.00')
	},
	{
		id: 'gid://shopify/Product/2',
		handle: 'adidas-ultraboost-light',
		title: 'Adidas Ultraboost Light',
		description: 'Lightest Ultraboost ever. Responsive cushioning for your daily run.',
		descriptionHtml: '<p>The lightest Ultraboost ever created. Featuring Light BOOST technology for responsive cushioning with every stride. The Primeknit+ upper provides a sock-like fit that adapts to your foot.</p><p>Designed for everyday runs with sustainability in mind - made with Parley Ocean Plastic.</p>',
		featuredImage: { url: '/images/shoes/adidas-ultraboost.svg', altText: 'Adidas Ultraboost Light', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: sizes },
			{ name: 'Color', values: ['Core Black', 'Cloud White', 'Grey Two'] }
		],
		variants: variants(['Core Black', 'Cloud White', 'Grey Two'], '190.00', 'Cloud White', '160.00'),
		collections: collection('running', 'Running'),
		seo: { title: 'Adidas Ultraboost Light - Lightweight Running Shoes', description: 'The lightest Ultraboost ever. Light BOOST technology for responsive cushioning.' },
		priceRange: priceRange('160.00', '190.00')
	},
	{
		id: 'gid://shopify/Product/3',
		handle: 'new-balance-990v6',
		title: 'New Balance 990v6',
		description: 'American-made premium comfort. The legendary 990, reimagined.',
		descriptionHtml: '<p>The iconic 990v6 continues the legacy of premium craftsmanship. Made in the USA with a perfect blend of cushioning and stability. The FuelCell midsole delivers a propulsive feel while the ENCAP system offers support.</p><p>A timeless silhouette that never goes out of style.</p>',
		featuredImage: { url: '/images/shoes/new-balance-990v6.svg', altText: 'New Balance 990v6', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: sizes },
			{ name: 'Color', values: ['Grey', 'Navy', 'Black'] }
		],
		variants: variants(['Grey', 'Navy', 'Black'], '200.00'),
		collections: collection('lifestyle', 'Lifestyle'),
		seo: { title: 'New Balance 990v6 - Premium Made in USA Sneakers', description: 'The legendary 990v6, made in the USA. FuelCell midsole with ENCAP support for premium comfort.' },
		priceRange: priceRange('200.00')
	},
	{
		id: 'gid://shopify/Product/4',
		handle: 'asics-gel-kayano-30',
		title: 'ASICS Gel-Kayano 30',
		description: 'Maximum stability meets adaptive comfort. Built for overpronators.',
		descriptionHtml: '<p>The Gel-Kayano 30 introduces a revolutionary 4D GUIDANCE SYSTEM for adaptive stability. The PureGEL technology provides lightweight cushioning while FF BLAST PLUS ECO foam delivers cloud-like comfort.</p><p>Engineered for runners who need stability without compromise.</p>',
		featuredImage: { url: '/images/shoes/asics-gel-kayano.svg', altText: 'ASICS Gel-Kayano 30', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: sizes },
			{ name: 'Color', values: ['Black/Pure Silver', 'White/Midnight', 'Lite Show'] }
		],
		variants: variants(['Black/Pure Silver', 'White/Midnight', 'Lite Show'], '160.00', 'Lite Show', '135.00'),
		collections: collection('running', 'Running'),
		seo: { title: 'ASICS Gel-Kayano 30 - Premium Stability Running Shoes', description: 'Revolutionary 4D GUIDANCE SYSTEM with PureGEL technology for adaptive stability.' },
		priceRange: priceRange('135.00', '160.00')
	},
	{
		id: 'gid://shopify/Product/5',
		handle: 'on-cloudmonster',
		title: 'On Cloudmonster',
		description: 'Maximum CloudTec cushioning. Run on clouds.',
		descriptionHtml: '<p>The Cloudmonster features On\'s largest CloudTec elements ever for maximum cushioning and explosive energy return. The Speedboard propels you forward with every step.</p><p>Swiss engineering meets bold design for the ultimate running experience.</p>',
		featuredImage: { url: '/images/shoes/on-cloudmonster.svg', altText: 'On Cloudmonster', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: sizes },
			{ name: 'Color', values: ['Black/White', 'Alloy/Sand', 'Flame/Black'] }
		],
		variants: variants(['Black/White', 'Alloy/Sand', 'Flame/Black'], '170.00'),
		collections: collection('running', 'Running'),
		seo: { title: 'On Cloudmonster - Maximum Cushioned Running Shoes', description: 'On\'s largest CloudTec elements for maximum cushioning and explosive energy return.' },
		priceRange: priceRange('170.00')
	},
	{
		id: 'gid://shopify/Product/6',
		handle: 'puma-velocity-nitro-3',
		title: 'Puma Velocity NITRO 3',
		description: 'NITRO foam technology. Versatile daily trainer.',
		descriptionHtml: '<p>The Velocity NITRO 3 combines NITRO foam with PWRTAPE reinforcement for a perfect balance of cushioning and support. The engineered mesh upper provides targeted breathability.</p><p>A versatile daily trainer that handles everything from easy runs to tempo sessions.</p>',
		featuredImage: { url: '/images/shoes/puma-velocity-nitro.svg', altText: 'Puma Velocity NITRO 3', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: sizes },
			{ name: 'Color', values: ['Puma Black', 'Sun Stream', 'Parisian Night'] }
		],
		variants: variants(['Puma Black', 'Sun Stream', 'Parisian Night'], '130.00', 'Puma Black', '110.00'),
		collections: collection('running', 'Running'),
		seo: { title: 'Puma Velocity NITRO 3 - Versatile Running Shoes', description: 'NITRO foam technology with PWRTAPE reinforcement for cushioning and support.' },
		priceRange: priceRange('110.00', '130.00')
	},
	{
		id: 'gid://shopify/Product/7',
		handle: 'hoka-clifton-9',
		title: 'HOKA Clifton 9',
		description: 'Lightweight cushioning. The Clifton, perfected.',
		descriptionHtml: '<p>The Clifton 9 delivers HOKA\'s signature plush cushioning in a lighter, more responsive package. The compression-molded EVA midsole offers a smooth, balanced ride.</p><p>An early-stage Meta-Rocker encourages a natural running gait ideal for daily miles.</p>',
		featuredImage: { url: '/images/shoes/hoka-clifton-9.svg', altText: 'HOKA Clifton 9', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: sizes },
			{ name: 'Color', values: ['Black/White', 'Solar Flare', 'Coastal Sky'] }
		],
		variants: variants(['Black/White', 'Solar Flare', 'Coastal Sky'], '145.00', 'Solar Flare', '125.00'),
		collections: collection('running', 'Running'),
		seo: { title: 'HOKA Clifton 9 - Lightweight Cushioned Running Shoes', description: 'HOKA\'s signature plush cushioning in a lighter, more responsive package.' },
		priceRange: priceRange('125.00', '145.00')
	},
	{
		id: 'gid://shopify/Product/8',
		handle: 'saucony-endorphin-speed-4',
		title: 'Saucony Endorphin Speed 4',
		description: 'Race-day speed. Everyday comfort.',
		descriptionHtml: '<p>The Endorphin Speed 4 features SPEEDROLL technology and a nylon plate for propulsive speed during races and tempo runs. PWRRUN PB foam delivers lightweight, responsive cushioning.</p><p>Your go-to shoe for race day and fast training sessions.</p>',
		featuredImage: { url: '/images/shoes/saucony-endorphin-speed.svg', altText: 'Saucony Endorphin Speed 4', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: sizes },
			{ name: 'Color', values: ['Vizipro', 'Shadow/White', 'Electric'] }
		],
		variants: variants(['Vizipro', 'Shadow/White', 'Electric'], '170.00'),
		collections: collection('performance', 'Performance'),
		seo: { title: 'Saucony Endorphin Speed 4 - Performance Running Shoes', description: 'SPEEDROLL technology with nylon plate for race-day speed and everyday comfort.' },
		priceRange: priceRange('170.00')
	}
];
