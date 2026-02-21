<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Lumos — Innovation Studio</title>
	<meta name="description" content="Lumos builds cutting-edge projects, open-source libraries, and delivers world-class freelance engineering for global clients." />
</svelte:head>

{@render children()}

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		background: #fafafa;
		color: #1a1a1a;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		overflow-x: hidden;
	}

	:global(::selection) {
		background: #1a1a1a;
		color: #ffffff;
	}

	:global(::-webkit-scrollbar) {
		width: 6px;
	}

	:global(::-webkit-scrollbar-track) {
		background: #fafafa;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: #d4d4d4;
		border-radius: 3px;
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background: #a3a3a3;
	}
</style>
