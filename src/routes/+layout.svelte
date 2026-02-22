<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { inject } from '@vercel/analytics';

	inject();

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Lumos — Innovation Studio | Open Source & Custom Software Development</title>
	<meta name="description" content="Lumos builds cutting-edge projects, open-source libraries, and delivers world-class freelance engineering for global clients. Specializing in Go, TypeScript, and high-performance software solutions." />
	<meta name="keywords" content="Lumos, Lumos Labs, software development, open source, Go development, TypeScript, ORM, Flash ORM, API documentation, system tools, freelance engineering, custom software, innovation studio, tech consulting" />
	<meta name="author" content="Lumos Labs" />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<link rel="canonical" href="https://lumoslab.tech/" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://lumoslab.tech/" />
	<meta property="og:title" content="Lumos — Innovation Studio | Open Source & Custom Software Development" />
	<meta property="og:description" content="We build what doesn't exist yet. From custom authentication systems to language migration engines. Lumos specializes in high-performance software, open-source tools, and enterprise solutions." />
	<meta property="og:image" content="https://lumoslab.tech/og-image.png" />
	<meta property="og:site_name" content="Lumos Labs" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://lumoslab.tech/" />
	<meta property="twitter:title" content="Lumos — Innovation Studio | Open Source & Custom Software Development" />
	<meta property="twitter:description" content="We build what doesn't exist yet. From custom authentication systems to language migration engines. Specializing in Go, TypeScript, and high-performance solutions." />
	<meta property="twitter:image" content="https://lumoslab.tech/og-image.png" />
	<meta property="twitter:creator" content="@LumosLabs" />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "Lumos Labs",
		"alternateName": "Lumos",
		"url": "https://lumoslab.tech",
		"logo": "https://lumoslab.tech/og-image.png",
		"description": "Lumos is an innovation studio building cutting-edge open-source projects and delivering world-class custom software engineering solutions.",
		"founder": {
			"@type": "Person",
			"name": "Lumos Labs Team"
		},
		"sameAs": [
			"https://github.com/Lumos-Labs-HQ"
		],
		"contactPoint": {
			"@type": "ContactPoint",
			"contactType": "Technical Support",
			"availableLanguage": ["English"]
		},
		"knowsAbout": [
			"Software Development",
			"Open Source",
			"Go Programming",
			"TypeScript",
			"Database ORM",
			"API Documentation",
			"System Tools",
			"Web Development",
			"Backend Engineering",
			"Performance Optimization"
		],
		"offers": {
			"@type": "Offer",
			"itemOffered": {
				"@type": "Service",
				"name": "Custom Software Development",
				"description": "Enterprise-grade software development, open-source tools, and technical consulting"
			}
		}
	}
	<\/script>`}
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
