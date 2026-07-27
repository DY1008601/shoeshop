<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import MobileNav from '$lib/components/layout/MobileNav.svelte';
	import GDPRBanner from '$lib/components/GDPRBanner.svelte';
	import BackToTop from '$lib/components/ui/BackToTop.svelte';
	import SkipLink from '$lib/components/ui/SkipLink.svelte';

	let { children, data } = $props();

	const locales = ['en', 'fr', 'de', 'it', 'es'];
	let lang = $derived($page.params.lang || 'en');
	let path = $derived($page.url.pathname.replace(/^\/[a-z]{2}/, '') || '/');
	let siteUrl = $derived(typeof window !== 'undefined' ? window.location.origin : '');
	let routeKey = $derived($page.url.pathname);
</script>

<svelte:head>
	<link rel="sitemap" type="application/xml" href="/api/sitemap.xml" />
	<link rel="alternate" type="application/rss+xml" title="ShoeShop Blog" href="/api/feed.xml" />
	<link rel="manifest" href="/api/manifest.json" />
	<meta name="theme-color" content="#111827" />
	<link rel="canonical" href={`${siteUrl}/${lang}${path}`} />
	{#each locales as loc}
		<link rel="alternate" hreflang={loc} href={`${siteUrl}/${loc}${path}`} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={`${siteUrl}/en${path}`} />
</svelte:head>

<SkipLink />
<div id="main-content">
	{#key routeKey}
		<div transition:fade={{ duration: 200 }}>
			{@render children()}
		</div>
	{/key}
</div>

<MobileNav />

<GDPRBanner />
<BackToTop />
