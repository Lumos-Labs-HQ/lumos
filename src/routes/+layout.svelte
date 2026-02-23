<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { inject } from '@vercel/analytics';
	import Navbar from '$lib/components/Navbar.svelte';

	inject();

	let { children } = $props();
	let scrollY = $state(0);
	let mobileMenuOpen = $state(false);
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

<svelte:window bind:scrollY />

<!-- Navigation -->
<nav class="nav" class:nav-scrolled={scrollY > 50}>
	<div class="nav-inner">
		<a href="/" class="logo">
			<span class="logo-mark">◉</span>
			<span class="logo-text">Lumos</span>
		</a>

		<div class="nav-links" class:nav-links-open={mobileMenuOpen}>
			<a href="/#projects" onclick={() => (mobileMenuOpen = false)}>Projects</a>
			<a href="/#services" onclick={() => (mobileMenuOpen = false)}>Services</a>
			<a href="/blog" onclick={() => (mobileMenuOpen = false)}>Blog</a>
			<a href="/about" onclick={() => (mobileMenuOpen = false)}>About</a>
			<a href="/#contact" class="nav-cta" onclick={() => (mobileMenuOpen = false)}>Get in Touch</a>
		</div>

		<button class="mobile-toggle" onclick={() => (mobileMenuOpen = !mobileMenuOpen)} aria-label="Toggle menu">
			<span class="toggle-line" class:open={mobileMenuOpen}></span>
			<span class="toggle-line" class:open={mobileMenuOpen}></span>
		</button>
	</div>
</nav>

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

	/* ===================== NAVIGATION ===================== */
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 20px 0;
		transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.nav-scrolled {
		background: rgba(250, 250, 250, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		padding: 14px 0;
		border-bottom: 1px solid #e5e5e5;
	}

	.nav-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 32px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		color: #171717;
	}

	.logo-mark {
		font-size: 1.4rem;
		line-height: 1;
	}

	.logo-text {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.3rem;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 36px;
	}

	.nav-links a {
		text-decoration: none;
		color: #525252;
		font-size: 0.9rem;
		font-weight: 450;
		transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
		letter-spacing: 0.01em;
	}

	.nav-links a:hover {
		color: #171717;
	}

	.nav-cta {
		background: #171717 !important;
		color: #ffffff !important;
		padding: 10px 22px;
		border-radius: 100px;
		font-size: 0.85rem !important;
		font-weight: 500 !important;
		transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
	}

	.nav-cta:hover {
		background: #0a0a0a !important;
		transform: translateY(-1px);
	}

	.mobile-toggle {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
	}

	.toggle-line {
		display: block;
		width: 22px;
		height: 2px;
		background: #171717;
		border-radius: 2px;
		transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.toggle-line.open:first-child {
		transform: rotate(45deg) translate(2.5px, 2.5px);
	}

	.toggle-line.open:last-child {
		transform: rotate(-45deg) translate(2.5px, -2.5px);
	}

	@media (max-width: 768px) {
		.nav-links {
			display: none;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(250, 250, 250, 0.98);
			backdrop-filter: blur(20px);
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 32px;
			z-index: 90;
		}

		.nav-links-open {
			display: flex;
		}

		.nav-links a {
			font-size: 1.3rem;
		}

		.nav-cta {
			font-size: 1rem !important;
		}

		.mobile-toggle {
			display: flex;
			z-index: 95;
		}
	}
</style>
