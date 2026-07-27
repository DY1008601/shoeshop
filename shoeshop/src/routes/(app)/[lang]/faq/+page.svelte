<script lang="ts">
	import { page } from '$app/stores';
	let lang = $derived($page.params.lang || 'en');

	const titles: Record<string, string> = {
		fr: 'FAQ',
		de: 'Haufige Fragen',
		it: 'Domande Frequenti',
		es: 'Preguntas Frecuentes',
		en: 'Frequently Asked Questions'
	};
</script>

<svelte:head>
	<title>FAQ - ShoeShop</title>
	<meta name="description" content="Frequently asked questions about ShoeShop orders, shipping, returns, and products." />
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "FAQPage",
			"mainEntity": [
				{ "@type": "Question", "name": "How long does shipping take?", "acceptedAnswer": { "@type": "Answer", "text": "Standard shipping takes 5-7 business days within the US. Express shipping takes 2-3 business days. International orders typically arrive within 7-14 business days." }},
				{ "@type": "Question", "name": "What is your return policy?", "acceptedAnswer": { "@type": "Answer", "text": "We offer a 30-day hassle-free return policy. Items must be unworn and in original packaging to qualify for a full refund." }},
				{ "@type": "Question", "name": "Are your sneakers authentic?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every pair we sell comes directly from authorized retailers. We never deal in counterfeits or unauthorized goods." }},
				{ "@type": "Question", "name": "Do you ship internationally?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we ship to over 50 countries worldwide. Customs fees may apply depending on your country." }},
				{ "@type": "Question", "name": "How can I track my order?", "acceptedAnswer": { "@type": "Answer", "text": "Once your order ships, you will receive a confirmation email with tracking information." }},
				{ "@type": "Question", "name": "What payment methods do you accept?", "acceptedAnswer": { "@type": "Answer", "text": "We accept PayPal, Visa, Mastercard, American Express, and Apple Pay." }}
			]
		})}
	</script>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-16">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">{titles[lang] || titles.en}</h1>

	<div class="space-y-6">
		<div class="rounded-xl border border-gray-200 p-6">
			<h2 class="mb-2 text-lg font-semibold text-gray-900">How long does shipping take?</h2>
			<p class="text-sm text-gray-600">Standard shipping takes 5-7 business days within the US. Express shipping takes 2-3 business days. International orders typically arrive within 7-14 business days.</p>
		</div>

		<div class="rounded-xl border border-gray-200 p-6">
			<h2 class="mb-2 text-lg font-semibold text-gray-900">What is your return policy?</h2>
			<p class="text-sm text-gray-600">We offer a 30-day hassle-free return policy. Items must be unworn and in original packaging with all tags attached to qualify for a full refund. See our <a href={`/${lang}/returns`} class="text-gray-900 underline">Returns page</a> for details.</p>
		</div>

		<div class="rounded-xl border border-gray-200 p-6">
			<h2 class="mb-2 text-lg font-semibold text-gray-900">Are your sneakers authentic?</h2>
			<p class="text-sm text-gray-600">Every pair we sell comes directly from authorized retailers and manufacturers. We never deal in counterfeits or unauthorized goods.</p>
		</div>

		<div class="rounded-xl border border-gray-200 p-6">
			<h2 class="mb-2 text-lg font-semibold text-gray-900">Do you ship internationally?</h2>
			<p class="text-sm text-gray-600">We ship to over 50 countries worldwide. International orders typically arrive within 7-14 business days. Customs fees may apply depending on your country's regulations.</p>
		</div>

		<div class="rounded-xl border border-gray-200 p-6">
			<h2 class="mb-2 text-lg font-semibold text-gray-900">How can I track my order?</h2>
			<p class="text-sm text-gray-600">Once your order ships, you will receive a confirmation email with a tracking number. You can track your package at any time through your account dashboard.</p>
		</div>

		<div class="rounded-xl border border-gray-200 p-6">
			<h2 class="mb-2 text-lg font-semibold text-gray-900">What payment methods do you accept?</h2>
			<p class="text-sm text-gray-600">We accept PayPal, Visa, Mastercard, American Express, and Apple Pay. All transactions are secured with 256-bit encryption.</p>
		</div>

		<div class="rounded-xl border border-gray-200 p-6">
			<h2 class="mb-2 text-lg font-semibold text-gray-900">How do I find the right size?</h2>
			<p class="text-sm text-gray-600">Check our <a href={`/${lang}/blog/ultimate-sneaker-size-guide`} class="text-gray-900 underline">Size Guide</a> for detailed measurement instructions and brand-specific sizing charts.</p>
		</div>
	</div>
</div>
