<script lang="ts">
	import GDPRBanner from '$lib/components/GDPRBanner.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="sitemap" type="application/xml" href="/api/sitemap.xml" />
	<link rel="alternate" type="application/rss+xml" title="ShoeShop Blog" href="/api/feed.xml" />
</svelte:head>

{@render children()}

<GDPRBanner />
