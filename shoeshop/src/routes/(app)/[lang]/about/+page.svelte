<script lang="ts">
	import { page } from '$app/stores';
	let lang = $derived($page.params.lang || 'en');
</script>

<svelte:head>
	<title>About ShoeShop - Premium Sneakers</title>
	<meta name="description" content="Learn about ShoeShop - our mission to bring premium sneakers to everyone." />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-16">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">
		{#if lang === 'fr'}A Propos{/if}
		{#if lang === 'de'}Uber Uns{/if}
		{#if lang === 'it'}Chi Siamo{/if}
		{#if lang === 'es'}Sobre Nosotros{/if}
		{#if lang === 'en'}About ShoeShop{/if}
	</h1>

	<div class="prose prose-gray max-w-none">
		<p>We believe that great sneakers should be accessible to everyone. Founded in 2024, ShoeShop curates the finest running and lifestyle sneakers from the world's top brands.</p>

		<h2>{lang === 'fr' ? 'Notre Mission' : lang === 'de' ? 'Unsere Mission' : lang === 'it' ? 'La Nostra Missione' : lang === 'es' ? 'Nuestra Mision' : 'Our Mission'}</h2>
		<p>To be the most trusted destination for sneaker enthusiasts through curated selection, expert guidance, and a hassle-free experience.</p>

		<h2>{lang === 'fr' ? 'Nos Marques' : lang === 'de' ? 'Unsere Marken' : lang === 'it' ? 'I Nostri Marchi' : lang === 'es' ? 'Nuestras Marcas' : 'Our Brands'}</h2>
		<p>We partner with leading brands including Nike, Adidas, New Balance, ASICS, HOKA, On, Puma, and Saucony.</p>
	</div>
</div>
