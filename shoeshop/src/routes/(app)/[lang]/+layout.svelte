<script lang="ts">
	import GDPRBanner from '$lib/components/GDPRBanner.svelte';
	import BackToTop from '$lib/components/ui/BackToTop.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="sitemap" type="application/xml" href="/api/sitemap.xml" />
	<link rel="alternate" type="application/rss+xml" title="ShoeShop Blog" href="/api/feed.xml" />
	<link rel="manifest" href="/api/manifest.json" />
	<meta name="theme-color" content="#111827" />
</svelte:head>

{@render children()}

<GDPRBanner />
<BackToTop />
