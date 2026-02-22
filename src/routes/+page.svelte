<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let scrollY = $state(0);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let showBackToTop = $state(false);

	// Intersection observer for scroll animations
	let visibleSections = $state<Set<string>>(new Set());

	onMount(() => {
		mounted = true;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visibleSections = new Set([...visibleSections, entry.target.id]);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

		// Cursor tracking
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			observer.disconnect();
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

	$effect(() => {
		showBackToTop = scrollY > 500;
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function isVisible(id: string): boolean {
		return visibleSections.has(id);
	}

	function handleCardMouseMove(e: MouseEvent, cardEl: HTMLElement) {
		const rect = cardEl.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateX = (y - centerY) / 20;
		const rotateY = (centerX - x) / 20;
		cardEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
	}

	function handleCardMouseLeave(cardEl: HTMLElement) {
		cardEl.style.transform = '';
	}

	const projects = [
		{
			title: 'Flash',
			description: 'A powerful, database-agnostic ORM built in Go that provides Prisma-like functionality with multi-database support and type-safe code generation.',
			tags: ['Go', 'ORM', 'PostgreSQL', 'MySQL'],
			status: 'Active',
			link: 'https://github.com/Lumos-Labs-HQ/flash'
		},
		{
			title: 'AtomicDocs',
			description: 'Lightweight, auto-generated API documentation for Express.js, Hono, and Go. Built with fasthttp for extreme performance.',
			tags: ['Go', 'API Docs', 'FastHTTP'],
			status: 'Active',
			link: 'https://github.com/Lumos-Labs-HQ/atomicdocs'
		},
		{
			title: 'wtop',
			description: 'htop for Windows — a powerful system monitoring tool bringing Unix-style process monitoring to Windows.',
			tags: ['Go', 'System Tools', 'Windows'],
			status: 'Active',
			link: 'https://github.com/Lumos-Labs-HQ/wtop'
		},
		{
			title: 'pgnx',
			description: 'Fastest PostgreSQL driver for the NodeJS ecosystem, built with C++ for maximum performance.',
			tags: ['C++', 'PostgreSQL', 'Node.js'],
			status: 'Active',
			link: 'https://github.com/Lumos-Labs-HQ/pgnx'
		},
		{
			title: 'BestAuth',
			description: 'Modern authentication system built from scratch — secure, fast, and extensible.',
			tags: ['Authentication', 'Security', 'OAuth2'],
			status: 'In Development',
			link: 'https://github.com/Lumos-Labs-HQ/bestauth'
		},
		{
			title: 'Flash Studio',
			description: 'Visual database management and schema designer for Flash ORM.',
			tags: ['Dart', 'Database', 'GUI'],
			status: 'In Development',
			link: 'https://github.com/Lumos-Labs-HQ/flash-studio'
		},
		{
			title: 'Windows Session Manager',
			description: 'Realtime Amazon Q session tracker for WSL, built with Rust for high performance.',
			tags: ['Rust', 'WSL', 'TCP'],
			status: 'Active',
			link: 'https://github.com/Lumos-Labs-HQ/windows-session-manager'
		},
		{
			title: 'VPM',
			description: 'Package manager and tooling built with modern C++.',
			tags: ['C++', 'Package Manager', 'DevTools'],
			status: 'In Development',
			link: 'https://github.com/Lumos-Labs-HQ/VPM'
		}
	];

	const techStack = [
		{ name: 'Go', icon: '⚡' },
		{ name: 'Rust', icon: '🦀' },
		{ name: 'TypeScript', icon: '📘' },
		{ name: 'Python', icon: '🐍' },
		{ name: 'C++', icon: '⚙️' },
		{ name: 'Svelte', icon: '🔥' },
		{ name: 'React', icon: '⚛️' },
		{ name: 'PostgreSQL', icon: '🐘' },
		{ name: 'Docker', icon: '🐳' },
		{ name: 'Kubernetes', icon: '☸️' }
	];

	const team = [
		{
			name: 'Swarnendu Ghosh',
			role: 'Founder & Lead Engineer',
			bio: 'Systems architect with a passion for building tools that developers love.'
		}
	];

	// Products data - TODO: Add real products later
	/*
	const products = [
		{
			name: 'lumos-ui',
			description: 'Minimalist, accessible component library with zero runtime overhead. Designed for modern frameworks.',
			downloads: '12k+',
			language: 'TypeScript'
		},
		{
			name: 'lumos-auth-sdk',
			description: 'Drop-in SDK for integrating Lumos Auth into any application. Supports React, Svelte, Vue, and vanilla JS.',
			downloads: '8k+',
			language: 'TypeScript'
		},
		{
			name: 'lumos-cli',
			description: 'Developer toolkit for scaffolding, building, and deploying Lumos-powered projects from the terminal.',
			downloads: '5k+',
			language: 'Rust'
		},
		{
			name: 'lumos-db',
			description: 'Lightweight, embedded database with a query builder that compiles to zero-cost abstractions.',
			downloads: '3k+',
			language: 'Go'
		}
	];
	*/

	const services = [
		{
			title: 'Full-Stack Development',
			description: 'End-to-end web and mobile applications using modern stacks — React, Svelte, Next.js, Go, Rust, and more.',
			icon: '◈',
			gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
		},
		{
			title: 'AI & Machine Learning',
			description: 'Custom AI solutions, LLM integration, computer vision, and intelligent automation powered by cutting-edge models.',
			icon: '◉',
			gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
		},
		{
			title: 'Systems Engineering',
			description: 'Low-level systems programming, performance optimization, and infrastructure tooling.',
			icon: '⬡',
			gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
		},
		{
			title: 'Cloud & DevOps',
			description: 'Architecture design, CI/CD pipelines, Kubernetes orchestration, and scalable cloud infrastructure.',
			icon: '△',
			gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
		},
		{
			title: 'Mobile Development',
			description: 'Native and cross-platform mobile apps for iOS and Android using Flutter, React Native, and Swift.',
			icon: '◇',
			gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
		}
	];

	let mobileMenuOpen = $state(false);
</script>

<svelte:window bind:scrollY />

{#if !mounted}
	<div class="loading-screen">
		<div class="loading-spinner">
			<span class="logo-mark">◉</span>
		</div>
	</div>
{/if}

<!-- Navigation -->
<nav class="nav" class:nav-scrolled={scrollY > 50}>
	<div class="nav-inner">
		<a href="/" class="logo">
			<span class="logo-mark">◉</span>
			<span class="logo-text">Lumos</span>
		</a>

		<div class="nav-links" class:nav-links-open={mobileMenuOpen}>
			<a href="#projects" onclick={() => (mobileMenuOpen = false)}>Projects</a>
			<a href="#services" onclick={() => (mobileMenuOpen = false)}>Services</a>
			<a href="/blog" onclick={() => (mobileMenuOpen = false)}>Blog</a>
			<a href="/about" onclick={() => (mobileMenuOpen = false)}>About</a>
			<a href="#contact" class="nav-cta" onclick={() => (mobileMenuOpen = false)}>Get in Touch</a>
		</div>

		<button class="mobile-toggle" onclick={() => (mobileMenuOpen = !mobileMenuOpen)} aria-label="Toggle menu">
			<span class="toggle-line" class:open={mobileMenuOpen}></span>
			<span class="toggle-line" class:open={mobileMenuOpen}></span>
		</button>
	</div>
</nav>

<!-- Hero Section -->
<header class="hero" class:hero-visible={mounted} style="--scroll: {scrollY}">
	<div class="hero-bg">
		<div class="grid-pattern"></div>
	</div>

	<div class="hero-content">
		<div class="hero-badge">Innovation Studio</div>
		<h1 class="hero-title">
			We build what<br />
			<span class="hero-accent">doesn't exist yet.</span>
		</h1>
		<p class="hero-subtitle">
			From custom authentication systems to language migration engines —
			Lumos engineers the tools, libraries, and products that push boundaries.
			We also deliver world-class freelance engineering for clients worldwide.
		</p>
		<div class="hero-actions">
			<a href="#projects" class="btn btn-primary">Explore Our Work</a>
			<a href="#services" class="btn btn-secondary">Hire Us</a>
		</div>

		<div class="hero-stats">
			<div class="stat" style="animation-delay: 0.2s">
				<span class="stat-value">50+</span>
				<span class="stat-label">Projects Shipped</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat" style="animation-delay: 0.4s">
				<span class="stat-value">Global</span>
				<span class="stat-label">Client Base</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat" style="animation-delay: 0.6s">
				<span class="stat-value">∞</span>
				<span class="stat-label">Curiosity</span>
			</div>
		</div>
	</div>
</header>

<!-- Projects Section -->
<section id="projects" class="section" data-animate class:section-visible={isVisible('projects')}>
	<div class="container">
		<div class="section-header">
			<span class="section-tag">01</span>
			<h2 class="section-title">Projects</h2>
			<p class="section-subtitle">
				Things we're building in-house — from systems-level tools to full applications.
				Each project is born from a real need we experienced firsthand.
				<br/><br/>
				<a href="https://github.com/orgs/Lumos-Labs-HQ/repositories" target="_blank" rel="noopener noreferrer" class="github-link">
					View all on GitHub →
				</a>
			</p>
		</div>

		<div class="projects-grid">
			{#each projects as project, i}
				<a 
					href={project.link} 
					target="_blank" 
					rel="noopener noreferrer" 
					class="project-card" 
					style="transition-delay: {i * 100}ms"
					onmousemove={(e) => handleCardMouseMove(e, e.currentTarget)}
					onmouseleave={(e) => handleCardMouseLeave(e.currentTarget)}
				>
					<div class="project-status">{project.status}</div>
					<h3 class="project-title">{project.title}</h3>
					<p class="project-description">{project.description}</p>
					<div class="project-tags">
						{#each project.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
					<div class="project-arrow">→</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Products Section - TODO: Add real products later -->
<!-- 
<section id="products" class="section section-alt" data-animate class:section-visible={isVisible('products')}>
	<div class="container">
		<div class="section-header">
			<span class="section-tag">02</span>
			<h2 class="section-title">Products & Libraries</h2>
			<p class="section-subtitle">
				Open-source packages and developer tools crafted with obsessive attention to detail.
				Built by us, for everyone.
			</p>
		</div>

		<div class="products-grid">
			{#each products as product, i}
				<div class="product-card" style="transition-delay: {i * 100}ms">
					<div class="product-header">
						<span class="product-icon">⬢</span>
						<span class="product-lang">{product.language}</span>
					</div>
					<h3 class="product-name">{product.name}</h3>
					<p class="product-description">{product.description}</p>
					<div class="product-footer">
						<span class="product-downloads">{product.downloads} downloads</span>
						<span class="product-link">View Docs →</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
-->

<!-- Freelancing / Services Section -->
<section id="services" class="section" data-animate class:section-visible={isVisible('services')}>
	<div class="container">
		<div class="section-header">
			<span class="section-tag">02</span>
			<h2 class="section-title">We create experiences</h2>
			<p class="section-subtitle">
				We work with international and Indian clients on projects of all scales.
				From startups to enterprises — precision engineering, delivered on time.
			</p>
		</div>

		<div class="services-grid">
			{#each services as service, i}
				<div 
					class="service-card" 
					style="transition-delay: {i * 100}ms; --gradient: {service.gradient}"
					onmousemove={(e) => handleCardMouseMove(e, e.currentTarget)}
					onmouseleave={(e) => handleCardMouseLeave(e.currentTarget)}
				>
					<span class="service-icon">{service.icon}</span>
					<h3 class="service-title">{service.title}</h3>
					<p class="service-description">{service.description}</p>
					<div class="service-gradient"></div>
				</div>
			{/each}
		</div>

		<div class="services-cta">
			<div class="cta-card">
				<div class="cta-content">
					<h3>Have a project in mind?</h3>
					<p>Whether it's a weekend prototype or a six-month enterprise build — we'd love to hear about it.</p>
				</div>
				<a href="#contact" class="btn btn-primary">Start a Conversation</a>
			</div>
		</div>
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="section section-alt" data-animate class:section-visible={isVisible('contact')}>
	<div class="container">
		<div class="contact-content">
			<div class="section-header">
				<span class="section-tag">03</span>
				<h2 class="section-title">Let's Talk</h2>
				<p class="section-subtitle">
					Drop us a line. We respond within 24 hours.
				</p>
			</div>

			<div class="contact-layout">
				<div class="contact-form-wrapper">
					<form class="contact-form" onsubmit={(e) => e.preventDefault()}>
						<div class="form-group">
							<label for="name">Name</label>
							<input type="text" id="name" placeholder="Your name" required />
						</div>
						<div class="form-group">
							<label for="email">Email</label>
							<input type="email" id="email" placeholder="your@email.com" required />
						</div>
						<div class="form-group">
							<label for="message">Message</label>
							<textarea id="message" rows="5" placeholder="Tell us about your project..." required></textarea>
						</div>
						<button type="submit" class="btn btn-primary">Send Message</button>
					</form>

					<div class="newsletter-box">
						<h3>Stay Updated</h3>
						<p>Get notified about new projects and updates.</p>
						<form class="newsletter-form" onsubmit={(e) => e.preventDefault()}>
							<input type="email" placeholder="your@email.com" required />
							<button type="submit" class="btn btn-secondary">Subscribe</button>
						</form>
					</div>
				</div>

				<div class="contact-info-wrapper">
					<div class="contact-info">
						<div class="contact-item">
							<span class="contact-label">Email</span>
							<a href="mailto:founders@lumoslab.tech" class="contact-value">founders@lumoslab.tech</a>
						</div>
						<div class="contact-item">
							<span class="contact-label">Based in</span>
							<span class="contact-value">India — Working Globally</span>
						</div>
						<div class="contact-item">
							<span class="contact-label">Availability</span>
							<span class="contact-value contact-available">● Open for projects</span>
						</div>
					</div>

					<div class="contact-links">
						<a href="https://github.com/Lumos-Labs-HQ" class="contact-social" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
						<a href="https://x.com" class="contact-social" target="_blank" rel="noopener noreferrer">Twitter ↗</a>
						<a href="https://linkedin.com" class="contact-social" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
						<a href="https://discord.gg/5ScEAsMT" class="contact-social" target="_blank" rel="noopener noreferrer">Discord ↗</a>
					</div>

					<a href="https://cal.com/swarnendug7/15min" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="margin-top: 32px; width: 100%;">
						Schedule a Call →
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="footer">
	<div class="container">
		<div class="footer-inner">
			<div class="footer-brand">
				<span class="logo-mark">◉</span>
				<span class="logo-text">Lumos</span>
			</div>
			<p class="footer-copy">© 2026 Lumos. Engineering the future, one commit at a time.</p>
		</div>
	</div>
</footer>

<!-- Back to Top Button -->
{#if showBackToTop}
	<button class="back-to-top" onclick={scrollToTop} aria-label="Back to top">
		↑
	</button>
{/if}

<style>
	/* ===================== VARIABLES ===================== */
	:root {
		--white: #ffffff;
		--gray-50: #fafafa;
		--gray-100: #f5f5f5;
		--gray-200: #e5e5e5;
		--gray-300: #d4d4d4;
		--gray-400: #a3a3a3;
		--gray-500: #737373;
		--gray-600: #525252;
		--gray-700: #404040;
		--gray-800: #262626;
		--gray-900: #171717;
		--black: #0a0a0a;
		--radius: 12px;
		--radius-sm: 8px;
		--transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		--transition-slow: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* ===================== LOADING SCREEN ===================== */
	.loading-screen {
		position: fixed;
		inset: 0;
		background: var(--gray-50);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		animation: fadeOut 0.5s ease 0.3s forwards;
	}

	.loading-spinner {
		font-size: 3rem;
		animation: pulse 1.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.5;
			transform: scale(0.95);
		}
	}

	@keyframes fadeOut {
		to {
			opacity: 0;
			pointer-events: none;
		}
	}

	/* ===================== NAVIGATION ===================== */
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 20px 0;
		transition: all var(--transition);
	}

	.nav-scrolled {
		background: rgba(250, 250, 250, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		padding: 14px 0;
		border-bottom: 1px solid var(--gray-200);
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
		color: var(--gray-900);
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
		color: var(--gray-600);
		font-size: 0.9rem;
		font-weight: 450;
		transition: color var(--transition);
		letter-spacing: 0.01em;
	}

	.nav-links a:hover {
		color: var(--gray-900);
	}

	.nav-cta {
		background: var(--gray-900) !important;
		color: var(--white) !important;
		padding: 10px 22px;
		border-radius: 100px;
		font-size: 0.85rem !important;
		font-weight: 500 !important;
		transition: all var(--transition) !important;
	}

	.nav-cta:hover {
		background: var(--black) !important;
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
		background: var(--gray-900);
		border-radius: 2px;
		transition: all var(--transition);
	}

	.toggle-line.open:first-child {
		transform: rotate(45deg) translate(2.5px, 2.5px);
	}

	.toggle-line.open:last-child {
		transform: rotate(-45deg) translate(2.5px, -2.5px);
	}

	/* ===================== HERO ===================== */
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		padding: 120px 32px 80px;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.grid-pattern {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(var(--gray-200) 1px, transparent 1px),
			linear-gradient(90deg, var(--gray-200) 1px, transparent 1px);
		background-size: 60px 60px;
		opacity: 0.4;
		mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%);
		-webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%);
		transform: translateY(calc(var(--scroll) * 0.3px));
		will-change: transform;
	}

	.hero-content {
		position: relative;
		max-width: 800px;
		text-align: center;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.hero-visible .hero-content {
		opacity: 1;
		transform: translateY(0);
	}

	.hero-badge {
		display: inline-block;
		padding: 6px 16px;
		border: 1px solid var(--gray-300);
		border-radius: 100px;
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--gray-600);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		margin-bottom: 32px;
	}

	.hero-title {
		font-family: 'Space Grotesk', sans-serif;
		font-size: clamp(2.8rem, 7vw, 5.5rem);
		font-weight: 700;
		line-height: 1.05;
		letter-spacing: -0.04em;
		color: var(--gray-900);
		margin-bottom: 28px;
	}

	.hero-accent {
		background: linear-gradient(135deg, var(--gray-600), var(--gray-900));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		font-size: clamp(1rem, 2vw, 1.15rem);
		line-height: 1.7;
		color: var(--gray-500);
		max-width: 600px;
		margin: 0 auto 40px;
		font-weight: 400;
	}

	.hero-actions {
		display: flex;
		gap: 16px;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 64px;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		padding: 14px 32px;
		border-radius: 100px;
		font-size: 0.95rem;
		font-weight: 500;
		text-decoration: none;
		transition: all var(--transition);
		cursor: pointer;
		border: none;
	}

	.btn-primary {
		background: var(--gray-900);
		color: var(--white);
	}

	.btn-primary:hover {
		background: var(--black);
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
	}

	.btn-secondary {
		background: var(--white);
		color: var(--gray-900);
		border: 1px solid var(--gray-300);
	}

	.btn-secondary:hover {
		border-color: var(--gray-400);
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
	}

	.hero-stats {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 40px;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		opacity: 0;
		animation: fadeInUp 0.6s ease forwards;
	}

	.hero-visible .stat {
		animation: fadeInUp 0.6s ease forwards;
	}

	.stat-value {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.6rem;
		font-weight: 600;
		color: var(--gray-900);
	}

	.stat-label {
		font-size: 0.8rem;
		color: var(--gray-500);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-weight: 450;
	}

	.stat-divider {
		width: 1px;
		height: 36px;
		background: var(--gray-300);
	}

	/* ===================== SECTIONS ===================== */
	.section {
		padding: 120px 32px;
	}

	.section-alt {
		background: var(--white);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.section-header {
		margin-bottom: 64px;
	}

	.section-tag {
		display: inline-block;
		font-family: 'Space Grotesk', monospace;
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--gray-400);
		margin-bottom: 16px;
		letter-spacing: 0.08em;
	}

	.section-title {
		font-family: 'Space Grotesk', sans-serif;
		font-size: clamp(2rem, 4vw, 3.2rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--gray-900);
		margin-bottom: 16px;
	}

	.section-subtitle {
		font-size: 1.05rem;
		line-height: 1.7;
		color: var(--gray-500);
		max-width: 560px;
	}

	.github-link {
		display: inline-flex;
		align-items: center;
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--gray-900);
		text-decoration: none;
		margin-top: 12px;
		transition: all var(--transition);
	}

	.github-link:hover {
		color: var(--accent);
		transform: translateX(4px);
	}

	/* Scroll animation */
	.section.section-visible .projects-grid,
	.section.section-visible .services-grid,
	.section.section-visible .contact-content {
		opacity: 1;
		transform: translateY(0);
	}

	.projects-grid,
	.services-grid,
	.contact-content {
		opacity: 0;
		transform: translateY(40px);
		transition: all var(--transition-slow);
	}

	.section.section-visible .projects-grid,
	.section.section-visible .services-grid,
	.section.section-visible .contact-content {
		opacity: 1;
		transform: translateY(0);
	}

	/* ===================== PROJECTS ===================== */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
	}

	.project-card {
		background: var(--white);
		border: 1px solid var(--gray-200);
		border-radius: var(--radius);
		padding: 36px;
		transition: all var(--transition);
		cursor: pointer;
		position: relative;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		display: block;
	}

	.project-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, transparent 60%, var(--gray-50));
		opacity: 0;
		transition: opacity var(--transition);
	}

	.project-card::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, #667eea, #764ba2);
		opacity: 0;
		transition: opacity var(--transition);
	}

	.project-card:hover {
		border-color: var(--gray-300);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
	}

	.project-card:hover::before,
	.project-card:hover::after {
		opacity: 1;
	}

	.project-status {
		display: inline-block;
		font-size: 0.72rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--gray-500);
		background: var(--gray-100);
		padding: 4px 12px;
		border-radius: 100px;
		margin-bottom: 20px;
		position: relative;
	}

	.project-title {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.35rem;
		font-weight: 600;
		color: var(--gray-900);
		margin-bottom: 12px;
		letter-spacing: -0.01em;
		position: relative;
	}

	.project-description {
		font-size: 0.92rem;
		line-height: 1.65;
		color: var(--gray-500);
		margin-bottom: 20px;
		position: relative;
	}

	.project-tags {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		position: relative;
	}

	.tag {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--gray-600);
		background: var(--gray-100);
		padding: 4px 12px;
		border-radius: 100px;
		border: 1px solid var(--gray-200);
	}

	.project-arrow {
		position: absolute;
		top: 36px;
		right: 36px;
		font-size: 1.2rem;
		color: var(--gray-300);
		transition: all var(--transition);
	}

	.project-card:hover .project-arrow {
		color: var(--gray-900);
		transform: translateX(4px);
	}

	/* ===================== PRODUCTS ===================== */
	/* TODO: Uncomment when adding real products
	.products-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
	}

	.product-card {
		background: var(--gray-50);
		border: 1px solid var(--gray-200);
		border-radius: var(--radius);
		padding: 36px;
		transition: all var(--transition);
		display: flex;
		flex-direction: column;
	}

	.product-card:hover {
		border-color: var(--gray-300);
		transform: translateY(-4px);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
	}

	.product-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.product-icon {
		font-size: 1.4rem;
		color: var(--gray-400);
	}

	.product-lang {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--gray-500);
		background: var(--white);
		padding: 4px 12px;
		border-radius: 100px;
		border: 1px solid var(--gray-200);
	}

	.product-name {
		font-family: 'Space Grotesk', monospace;
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--gray-900);
		margin-bottom: 10px;
		letter-spacing: -0.01em;
	}

	.product-description {
		font-size: 0.9rem;
		line-height: 1.65;
		color: var(--gray-500);
		margin-bottom: 24px;
		flex: 1;
	}

	.product-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20px;
		border-top: 1px solid var(--gray-200);
	}

	.product-downloads {
		font-size: 0.82rem;
		color: var(--gray-500);
		font-weight: 450;
	}

	.product-link {
		font-size: 0.82rem;
		color: var(--gray-900);
		font-weight: 500;
		cursor: pointer;
		transition: color var(--transition);
	}

	.product-link:hover {
		color: var(--gray-600);
	}
	*/

	/* ===================== SERVICES ===================== */
	.services-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 20px;
		margin-bottom: 64px;
	}

	.service-card {
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 16px;
		padding: 36px 28px;
		transition: all var(--transition);
		text-align: left;
		position: relative;
		overflow: hidden;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
	}

	.service-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
	}

	.service-gradient {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--gradient);
		opacity: 0;
		transition: opacity var(--transition);
	}

	.service-card:hover {
		background: rgba(255, 255, 255, 0.85);
		border-color: rgba(255, 255, 255, 0.5);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
	}

	.service-card:hover .service-gradient {
		opacity: 1;
	}

	.service-icon {
		display: inline-block;
		font-size: 2rem;
		margin-bottom: 24px;
		color: var(--gray-700);
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
		transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.service-card:hover .service-icon {
		transform: scale(1.2) rotate(5deg);
	}

	.service-title {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--gray-900);
		margin-bottom: 12px;
		letter-spacing: -0.01em;
	}

	.service-description {
		font-size: 0.88rem;
		line-height: 1.65;
		color: var(--gray-600);
	}

	.services-cta {
		max-width: 100%;
	}

	.cta-card {
		background: var(--gray-900);
		border-radius: var(--radius);
		padding: 48px 56px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 40px;
	}

	.cta-content h3 {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.6rem;
		font-weight: 600;
		color: var(--white);
		margin-bottom: 8px;
		letter-spacing: -0.02em;
	}

	.cta-content p {
		font-size: 0.95rem;
		color: var(--gray-400);
		line-height: 1.6;
	}

	.cta-card .btn-primary {
		background: var(--white);
		color: var(--gray-900);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.cta-card .btn-primary:hover {
		background: var(--gray-100);
	}

	/* ===================== CONTACT ===================== */
	.contact-layout {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 64px;
		margin-top: 48px;
	}

	.contact-form-wrapper {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.form-group label {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--gray-700);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.form-group input,
	.form-group textarea {
		padding: 14px 18px;
		border: 1px solid var(--gray-300);
		border-radius: 8px;
		font-size: 0.95rem;
		font-family: inherit;
		color: var(--gray-900);
		background: var(--white);
		transition: all var(--transition);
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--gray-900);
		box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
	}

	.form-group textarea {
		resize: vertical;
		min-height: 120px;
	}

	.newsletter-box {
		background: var(--gray-900);
		border-radius: var(--radius);
		padding: 32px;
		color: var(--white);
	}

	.newsletter-box h3 {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.3rem;
		font-weight: 600;
		margin-bottom: 8px;
	}

	.newsletter-box p {
		font-size: 0.9rem;
		color: var(--gray-400);
		margin-bottom: 20px;
	}

	.newsletter-form {
		display: flex;
		gap: 12px;
	}

	.newsletter-form input {
		flex: 1;
		padding: 12px 16px;
		border: 1px solid var(--gray-700);
		border-radius: 8px;
		font-size: 0.9rem;
		background: rgba(255, 255, 255, 0.1);
		color: var(--white);
		transition: all var(--transition);
	}

	.newsletter-form input::placeholder {
		color: var(--gray-500);
	}

	.newsletter-form input:focus {
		outline: none;
		border-color: var(--white);
		background: rgba(255, 255, 255, 0.15);
	}

	.newsletter-form .btn-secondary {
		background: var(--white);
		color: var(--gray-900);
		padding: 12px 24px;
		white-space: nowrap;
	}

	.newsletter-form .btn-secondary:hover {
		background: var(--gray-100);
	}

	.contact-info-wrapper {
		display: flex;
		flex-direction: column;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 32px;
		margin-bottom: 40px;
	}

	.contact-item {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.contact-label {
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--gray-400);
		font-weight: 500;
	}

	.contact-value {
		font-size: 1.05rem;
		color: var(--gray-900);
		text-decoration: none;
		font-weight: 450;
	}

	.contact-value:hover {
		color: var(--gray-600);
	}

	.contact-available {
		color: #3b9;
	}

	.contact-links {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.contact-social {
		display: block;
		padding: 20px 0;
		border-bottom: 1px solid var(--gray-200);
		text-decoration: none;
		font-size: 1.05rem;
		font-weight: 500;
		color: var(--gray-900);
		transition: all var(--transition);
	}

	.contact-social:first-child {
		border-top: 1px solid var(--gray-200);
	}

	.contact-social:hover {
		color: var(--gray-500);
		padding-left: 8px;
	}

	/* ===================== FOOTER ===================== */
	.footer {
		padding: 40px 32px;
		border-top: 1px solid var(--gray-200);
		background: var(--gray-50);
	}

	.footer-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.footer-brand {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.footer-copy {
		font-size: 0.82rem;
		color: var(--gray-400);
	}

	/* ===================== BACK TO TOP ===================== */
	.back-to-top {
		position: fixed;
		bottom: 32px;
		right: 32px;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--gray-900);
		color: var(--white);
		border: none;
		font-size: 1.2rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
		transition: all var(--transition);
		z-index: 50;
		animation: fadeInUp 0.3s ease;
	}

	.back-to-top:hover {
		background: var(--black);
		transform: translateY(-4px);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* ===================== RESPONSIVE ===================== */
	@media (max-width: 1024px) {
		.services-grid {
			grid-template-columns: repeat(2, 1fr);
		}
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

		.hero {
			padding: 100px 24px 60px;
		}

		.hero-title {
			font-size: clamp(2.2rem, 8vw, 3.5rem);
		}

		.hero-stats {
			gap: 24px;
		}

		.stat-value {
			font-size: 1.3rem;
		}

		.section {
			padding: 80px 24px;
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}

		.services-grid {
			grid-template-columns: 1fr;
		}

		.cta-card {
			flex-direction: column;
			padding: 36px 28px;
			text-align: center;
		}

		.contact-layout {
			grid-template-columns: 1fr;
			gap: 48px;
		}

		.newsletter-form {
			flex-direction: column;
		}

		.footer-inner {
			flex-direction: column;
			gap: 16px;
			text-align: center;
		}
	}

	@media (max-width: 480px) {
		.hero-actions {
			flex-direction: column;
			align-items: center;
		}

		.hero-stats {
			flex-direction: column;
			gap: 20px;
		}

		.stat-divider {
			width: 36px;
			height: 1px;
		}
	}
</style>
