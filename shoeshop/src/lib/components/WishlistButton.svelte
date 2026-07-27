<script lang="ts">
	import { wishlist } from '$lib/stores/wishlist';
	import { onMount } from 'svelte';

	interface Props {
		handle: string;
		size?: 'sm' | 'default';
	}

	let { handle, size = 'default' }: Props = $props();

	let active = $state(false);

	onMount(() => {
		wishlist.load();
		const unsub = wishlist.subscribe((items) => {
			active = items.includes(handle);
		});
		return unsub;
	});

	function toggle(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		wishlist.toggle(handle);
	}

	const sizeClass = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
	const iconClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
</script>

<button
	onclick={toggle}
	class={`${sizeClass} flex items-center justify-center rounded-full border transition ${active ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 bg-white text-gray-400 hover:border-gray-400 hover:text-gray-600'}`}
	aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
>
	<svg xmlns="http://www.w3.org/2000/svg" class={iconClass} viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
		<path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
	</svg>
</button>
