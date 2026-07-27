import type { Product } from '$lib/shopify/types';

export const products: Product[] = [
	{
		id: 'gid://shopify/Product/1',
		handle: 'nike-air-max-pulse',
		title: 'Nike Air Max Pulse',
		description: 'Step into the future with the Air Max Pulse. A sleek design meets maximum comfort.',
		descriptionHtml: '<p>Step into the future with the Air Max Pulse. A sleek design meets maximum comfort with the iconic Air Max cushioning. The breathable mesh upper keeps your feet cool, while the rubber outsole provides durable traction.</p><p>Perfect for everyday wear or light training sessions.</p>',
		featuredImage: { url: '/images/shoes/nike-air-max-pulse.jpg', altText: 'Nike Air Max Pulse', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'] },
			{ name: 'Color', values: ['Black', 'White', 'Grey'] }
		],
		variants: {
			edges: [
				{ node: { id: 'v1-black-9', title: 'Black / US 9', availableForSale: true, selectedOptions: [{ name: 'Color', value: 'Black' }, { name: 'Size', value: 'US 9' }], price: { amount: '150.00', currencyCode: 'USD' }, compareAtPrice: { amount: '180.00', currencyCode: 'USD' }, image: null } },
				{ node: { id: 'v1-white-10', title: 'White / US 10', availableForSale: true, selectedOptions: [{ name: 'Color', value: 'White' }, { name: 'Size', value: 'US 10' }], price: { amount: '150.00', currencyCode: 'USD' }, compareAtPrice: null, image: null } },
				{ node: { id: 'v1-black-10', title: 'Black / US 10', availableForSale: false, selectedOptions: [{ name: 'Color', value: 'Black' }, { name: 'Size', value: 'US 10' }], price: { amount: '150.00', currencyCode: 'USD' }, compareAtPrice: null, image: null } }
			]
		},
		collections: { edges: [{ node: { handle: 'running', title: 'Running' } }] },
		seo: { title: 'Nike Air Max Pulse - Premium Running Shoes', description: 'Experience ultimate comfort with the Nike Air Max Pulse. Breathable mesh upper and iconic Air Max cushioning.' },
		priceRange: { minVariantPrice: { amount: '150.00', currencyCode: 'USD' }, maxVariantPrice: { amount: '150.00', currencyCode: 'USD' } }
	},
	{
		id: 'gid://shopify/Product/2',
		handle: 'adidas-ultraboost-light',
		title: 'Adidas Ultraboost Light',
		description: 'Lightest Ultraboost ever. Responsive cushioning for your daily run.',
		descriptionHtml: '<p>The lightest Ultraboost ever created. Featuring Light BOOST technology for responsive cushioning with every stride. The Primeknit+ upper provides a sock-like fit that adapts to your foot.</p><p>Designed for everyday runs with sustainability in mind - made with Parley Ocean Plastic.</p>',
		featuredImage: { url: '/images/shoes/adidas-ultraboost.jpg', altText: 'Adidas Ultraboost Light', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'] },
			{ name: 'Color', values: ['Core Black', 'Cloud White', 'Grey Two'] }
		],
		variants: {
			edges: [
				{ node: { id: 'v2-black-9', title: 'Core Black / US 9', availableForSale: true, selectedOptions: [{ name: 'Color', value: 'Core Black' }, { name: 'Size', value: 'US 9' }], price: { amount: '190.00', currencyCode: 'USD' }, compareAtPrice: null, image: null } },
				{ node: { id: 'v2-white-10', title: 'Cloud White / US 10', availableForSale: true, selectedOptions: [{ name: 'Color', value: 'Cloud White' }, { name: 'Size', value: 'US 10' }], price: { amount: '180.00', currencyCode: 'USD' }, compareAtPrice: { amount: '190.00', currencyCode: 'USD' }, image: null } }
			]
		},
		collections: { edges: [{ node: { handle: 'running', title: 'Running' } }] },
		seo: { title: 'Adidas Ultraboost Light - Lightweight Running Shoes', description: 'The lightest Ultraboost ever. Light BOOST technology for responsive cushioning.' },
		priceRange: { minVariantPrice: { amount: '180.00', currencyCode: 'USD' }, maxVariantPrice: { amount: '190.00', currencyCode: 'USD' } }
	},
	{
		id: 'gid://shopify/Product/3',
		handle: 'new-balance-990v6',
		title: 'New Balance 990v6',
		description: 'American-made premium comfort. The legendary 990, reimagined.',
		descriptionHtml: '<p>The iconic 990v6 continues the legacy of premium craftsmanship. Made in the USA with a perfect blend of cushioning and stability. The FuelCell midsole delivers a propulsive feel while the ENCAP system offers support.</p><p>A timeless silhouette that never goes out of style.</p>',
		featuredImage: { url: '/images/shoes/new-balance-990v6.jpg', altText: 'New Balance 990v6', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'] },
			{ name: 'Color', values: ['Grey', 'Navy', 'Black'] }
		],
		variants: {
			edges: [
				{ node: { id: 'v3-grey-10', title: 'Grey / US 10', availableForSale: true, selectedOptions: [{ name: 'Color', value: 'Grey' }, { name: 'Size', value: 'US 10' }], price: { amount: '200.00', currencyCode: 'USD' }, compareAtPrice: null, image: null } },
				{ node: { id: 'v3-navy-9', title: 'Navy / US 9', availableForSale: true, selectedOptions: [{ name: 'Color', value: 'Navy' }, { name: 'Size', value: 'US 9' }], price: { amount: '200.00', currencyCode: 'USD' }, compareAtPrice: { amount: '210.00', currencyCode: 'USD' }, image: null } }
			]
		},
		collections: { edges: [{ node: { handle: 'lifestyle', title: 'Lifestyle' } }] },
		seo: { title: 'New Balance 990v6 - Premium Made in USA Sneakers', description: 'The legendary 990v6, made in the USA. FuelCell midsole with ENCAP support for premium comfort.' },
		priceRange: { minVariantPrice: { amount: '200.00', currencyCode: 'USD' }, maxVariantPrice: { amount: '200.00', currencyCode: 'USD' } }
	},
	{
		id: 'gid://shopify/Product/4',
		handle: 'asics-gel-kayano-30',
		title: 'ASICS Gel-Kayano 30',
		description: 'Maximum stability meets adaptive comfort. Built for overpronators.',
		descriptionHtml: '<p>The Gel-Kayano 30 introduces a revolutionary 4D GUIDANCE SYSTEM for adaptive stability. The PureGEL technology provides lightweight cushioning while FF BLAST PLUS ECO foam delivers cloud-like comfort.</p><p>Engineered for runners who need stability without compromise.</p>',
		featuredImage: { url: '/images/shoes/asics-gel-kayano.jpg', altText: 'ASICS Gel-Kayano 30', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'] },
			{ name: 'Color', values: ['Black/Pure Silver', 'White/Midnight', 'Lite Show'] }
		],
		variants: {
			edges: [
				{ node: { id: 'v4-black-9', title: 'Black/Pure Silver / US 9', availableForSale: true, selectedOptions: [{ name: 'Color', value: 'Black/Pure Silver' }, { name: 'Size', value: 'US 9' }], price: { amount: '160.00', currencyCode: 'USD' }, compareAtPrice: null, image: null } }
			]
		},
		collections: { edges: [{ node: { handle: 'running', title: 'Running' } }] },
		seo: { title: 'ASICS Gel-Kayano 30 - Premium Stability Running Shoes', description: 'Revolutionary 4D GUIDANCE SYSTEM with PureGEL technology for adaptive stability.' },
		priceRange: { minVariantPrice: { amount: '160.00', currencyCode: 'USD' }, maxVariantPrice: { amount: '160.00', currencyCode: 'USD' } }
	},
	{
		id: 'gid://shopify/Product/5',
		handle: 'on-cloudmonster',
		title: 'On Cloudmonster',
		description: 'Maximum CloudTec cushioning. Run on clouds.',
		descriptionHtml: '<p>The Cloudmonster features On\'s largest CloudTec elements ever for maximum cushioning and explosive energy return. The Speedboard propels you forward with every step.</p><p>Swiss engineering meets bold design for the ultimate running experience.</p>',
		featuredImage: { url: '/images/shoes/on-cloudmonster.jpg', altText: 'On Cloudmonster', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: ['US 8', 'US 9', 'US 10', 'US 11'] },
			{ name: 'Color', values: ['Black/White', 'Alloy/Sand', 'Flame/Black'] }
		],
		variants: {
			edges: [
				{ node: { id: 'v5-black-10', title: 'Black/White / US 10', availableForSale: true, selectedOptions: [{ name: 'Color', value: 'Black/White' }, { name: 'Size', value: 'US 10' }], price: { amount: '170.00', currencyCode: 'USD' }, compareAtPrice: null, image: null } }
			]
		},
		collections: { edges: [{ node: { handle: 'running', title: 'Running' } }] },
		seo: { title: 'On Cloudmonster - Maximum Cushioned Running Shoes', description: 'On\'s largest CloudTec elements for maximum cushioning and explosive energy return.' },
		priceRange: { minVariantPrice: { amount: '170.00', currencyCode: 'USD' }, maxVariantPrice: { amount: '170.00', currencyCode: 'USD' } }
	},
	{
		id: 'gid://shopify/Product/6',
		handle: 'puma-velocity-nitro-3',
		title: 'Puma Velocity NITRO 3',
		description: 'NITRO foam technology. Versatile daily trainer.',
		descriptionHtml: '<p>The Velocity NITRO 3 combines NITRO foam with PWRTAPE reinforcement for a perfect balance of cushioning and support. The engineered mesh upper provides targeted breathability.</p><p>A versatile daily trainer that handles everything from easy runs to tempo sessions.</p>',
		featuredImage: { url: '/images/shoes/puma-velocity-nitro.jpg', altText: 'Puma Velocity NITRO 3', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'] },
			{ name: 'Color', values: ['Puma Black', 'Sun Stream', 'Parisian Night'] }
		],
		variants: {
			edges: [
				{ node: { id: 'v6-black-10', title: 'Puma Black / US 10', availableForSale: true, selectedOptions: [{ name: 'Color', value: 'Puma Black' }, { name: 'Size', value: 'US 10' }], price: { amount: '130.00', currencyCode: 'USD' }, compareAtPrice: { amount: '140.00', currencyCode: 'USD' }, image: null } }
			]
		},
		collections: { edges: [{ node: { handle: 'running', title: 'Running' } }] },
		seo: { title: 'Puma Velocity NITRO 3 - Versatile Running Shoes', description: 'NITRO foam technology with PWRTAPE reinforcement for cushioning and support.' },
		priceRange: { minVariantPrice: { amount: '130.00', currencyCode: 'USD' }, maxVariantPrice: { amount: '130.00', currencyCode: 'USD' } }
	},
	{
		id: 'gid://shopify/Product/7',
		handle: 'hoka-clifton-9',
		title: 'HOKA Clifton 9',
		description: 'Lightweight cushioning. The Clifton, perfected.',
		descriptionHtml: '<p>The Clifton 9 delivers HOKA\'s signature plush cushioning in a lighter, more responsive package. The compression-molded EVA midsole offers a smooth, balanced ride.</p><p>An early-stage Meta-Rocker encourages a natural running gait ideal for daily miles.</p>',
		featuredImage: { url: '/images/shoes/hoka-clifton-9.jpg', altText: 'HOKA Clifton 9', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'] },
			{ name: 'Color', values: ['Black/White', 'Solar Flare', 'Coastal Sky'] }
		],
		variants: {
			edges: [
				{ node: { id: 'v7-black-9', title: 'Black/White / US 9', availableForSale: true, selectedOptions: [{ name: 'Color', value: 'Black/White' }, { name: 'Size', value: 'US 9' }], price: { amount: '145.00', currencyCode: 'USD' }, compareAtPrice: null, image: null } }
			]
		},
		collections: { edges: [{ node: { handle: 'running', title: 'Running' } }] },
		seo: { title: 'HOKA Clifton 9 - Lightweight Cushioned Running Shoes', description: 'HOKA\'s signature plush cushioning in a lighter, more responsive package.' },
		priceRange: { minVariantPrice: { amount: '145.00', currencyCode: 'USD' }, maxVariantPrice: { amount: '145.00', currencyCode: 'USD' } }
	},
	{
		id: 'gid://shopify/Product/8',
		handle: 'saucony-endorphin-speed-4',
		title: 'Saucony Endorphin Speed 4',
		description: 'Race-day speed. Everyday comfort.',
		descriptionHtml: '<p>The Endorphin Speed 4 features SPEEDROLL technology and a nylon plate for propulsive speed during races and tempo runs. PWRRUN PB foam delivers lightweight, responsive cushioning.</p><p>Your go-to shoe for race day and fast training sessions.</p>',
		featuredImage: { url: '/images/shoes/saucony-endorphin-speed.jpg', altText: 'Saucony Endorphin Speed 4', width: 800, height: 800 },
		images: { edges: [] },
		options: [
			{ name: 'Size', values: ['US 8', 'US 9', 'US 10', 'US 11'] },
			{ name: 'Color', values: ['Vizipro', 'Shadow/White', 'Electric'] }
		],
		variants: {
			edges: [
				{ node: { id: 'v8-vizipro-10', title: 'Vizipro / US 10', availableForSale: true, selectedOptions: [{ name: 'Color', value: 'Vizipro' }, { name: 'Size', value: 'US 10' }], price: { amount: '170.00', currencyCode: 'USD' }, compareAtPrice: null, image: null } }
			]
		},
		collections: { edges: [{ node: { handle: 'performance', title: 'Performance' } }] },
		seo: { title: 'Saucony Endorphin Speed 4 - Performance Running Shoes', description: 'SPEEDROLL technology with nylon plate for race-day speed and everyday comfort.' },
		priceRange: { minVariantPrice: { amount: '170.00', currencyCode: 'USD' }, maxVariantPrice: { amount: '170.00', currencyCode: 'USD' } }
	}
];
