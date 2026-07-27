export function formatPrice(amount: string, currency: string): string {
	const num = parseFloat(amount);
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 2
	}).format(num);
}

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_]+/g, '-')
		.replace(/-+/g, '-')
		.trim();
}

export function truncate(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
}
