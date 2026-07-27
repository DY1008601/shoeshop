import { json } from '@sveltejs/kit';

export function GET() {
	return json({
		name: 'ShoeShop',
		short_name: 'ShoeShop',
		description: 'Premium sneakers for every step. Quality you can trust.',
		start_url: '/en',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#111827',
		icons: [
			{ src: '/icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
		]
	});
}
