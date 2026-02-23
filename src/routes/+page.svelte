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
		const rotateX = (y - centerY) / 15;
		const rotateY = (centerX - x) / 15;
		cardEl.style.transition = 'transform 0.08s linear';
		cardEl.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
	}

	function handleCardMouseLeave(cardEl: HTMLElement) {
		cardEl.style.transition = 'transform 0.25s ease-out';
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

	// Row 1: Languages
	const techStackRow1 = [
		{ name: 'Go', icon: 'devicon-go-original-wordmark colored' },
		{ name: 'Rust', icon: 'devicon-rust-original' },
		{ name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
		{ name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
		{ name: 'Python', icon: 'devicon-python-plain colored' },
		{ name: 'C++', icon: 'devicon-cplusplus-plain colored' },
		{ name: 'C', icon: 'devicon-c-plain colored' },
		{ name: 'Dart', icon: 'devicon-dart-plain colored' },
		{ name: 'PHP', icon: 'devicon-php-plain colored' },
		{ name: 'Java', icon: 'devicon-java-plain colored' },
		{ name: 'Swift', icon: 'devicon-swift-plain colored' },
		{ name: 'Kotlin', icon: 'devicon-kotlin-plain colored' },
		{ name: 'Elixir', icon: 'devicon-elixir-plain colored' }
	];

	// Row 2: Frameworks & Frontend
	const techStackRow2 = [
		{ name: 'Svelte', icon: 'devicon-svelte-plain colored' },
		{ name: 'React', icon: 'devicon-react-original colored' },
		{ name: 'Next.js', icon: 'devicon-nextjs-plain' },
		{ name: 'Nuxt.js', icon: 'devicon-nuxt-plain colored' },
		{ name: 'Vue', icon: 'devicon-vuejs-plain colored' },
		{ name: 'Angular', icon: 'devicon-angular-plain colored' },
		{ name: 'Astro', icon: 'devicon-astro-plain' },
		{ name: 'Remix', icon: 'devicon-remix-original' },
		{ name: 'Flutter', icon: 'devicon-flutter-plain colored' },
		{ name: 'Tailwind', icon: 'devicon-tailwindcss-original colored' },
		{ name: 'Vite', icon: 'devicon-vitejs-plain colored' }
	];

	// Row 3: Backend & Frameworks
	const techStackRow3 = [
		{ name: 'Fiber', icon: 'devicon-fiber-plain colored' },
		{ name: 'Flask', icon: 'devicon-flask-original' },
		{ name: 'FastAPI', icon: 'devicon-fastapi-plain colored' },
		{ name: 'Django', icon: 'devicon-django-plain' },
		{ name: 'Express', icon: 'devicon-express-original' },
		{ name: 'Laravel', icon: 'devicon-laravel-original colored' },
		{ name: 'Bun', icon: 'devicon-bun-plain colored' },
		{ name: 'Deno', icon: 'devicon-denojs-original colored' },
		{ name: 'Kafka', icon: 'devicon-apachekafka-original' },
		{ name: 'RabbitMQ', icon: 'devicon-rabbitmq-original colored' },
		{ name: 'GraphQL', icon: 'devicon-graphql-plain colored' }
	];

	// Row 4: Databases & Storage
	const techStackRow4 = [
		{ name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
		{ name: 'MySQL', icon: 'devicon-mysql-plain colored' },
		{ name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
		{ name: 'Redis', icon: 'devicon-redis-plain colored' },
		{ name: 'SQLite', icon: 'devicon-sqlite-plain colored' },
		{ name: 'CockroachDB', icon: 'devicon-cockroachdb-plain colored' },
		{ name: 'Neo4j', icon: 'devicon-neo4j-plain colored' },
		{ name: 'Cassandra', icon: 'devicon-cassandra-plain colored' },
		{ name: 'Firebase', icon: 'devicon-firebase-plain colored' },
		{ name: 'Supabase', icon: 'devicon-supabase-plain colored' },
		{ name: 'Elasticsearch', icon: 'devicon-elasticsearch-plain colored' },
		{ name: 'Prisma', icon: 'devicon-prisma-original' },
		{ name: 'DynamoDB', icon: 'devicon-dynamodb-plain colored' }
	];

	// Row 5: DevOps & Cloud
	const techStackRow5 = [
		{ name: 'Docker', icon: 'devicon-docker-plain colored' },
		{ name: 'Kubernetes', icon: 'devicon-kubernetes-plain colored' },
		{ name: 'Helm', icon: 'devicon-helm-original colored' },
		{ name: 'ArgoCD', icon: 'devicon-argocd-plain colored' },
		{ name: 'Jenkins', icon: 'devicon-jenkins-plain colored' },
		{ name: 'Terraform', icon: 'devicon-terraform-plain colored' },
		{ name: 'Ansible', icon: 'devicon-ansible-plain colored' },
		{ name: 'Vault', icon: 'devicon-vault-original colored' },
		{ name: 'Nginx', icon: 'devicon-nginx-original colored' },
		{ name: 'Vercel', icon: 'devicon-vercel-original' },
		{ name: 'Cloudflare', icon: 'devicon-cloudflare-plain colored' },
		{ name: 'Netlify', icon: 'devicon-netlify-plain colored' }
	];

	// Row 6: Cloud, AI & Monitoring
	const techStackRow6 = [
		{ name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark colored' },
		{ name: 'GCP', icon: 'devicon-googlecloud-plain colored' },
		{ name: 'Azure', icon: 'devicon-azure-plain colored' },
		{ name: 'GitHub Actions', icon: 'devicon-githubactions-plain colored' },
		{ name: 'Linux', icon: 'devicon-linux-plain colored' },
		{ name: 'TensorFlow', icon: 'devicon-tensorflow-original colored' },
		{ name: 'PyTorch', icon: 'devicon-pytorch-original colored' },
		{ name: 'Grafana', icon: 'devicon-grafana-plain colored' },
		{ name: 'Prometheus', icon: 'devicon-prometheus-original colored' },
		{ name: 'Consul', icon: 'devicon-consul-original colored' }
	];

	const team = [
		{
			name: 'Swarnendu Ghosh',
			role: 'Founder & Lead Engineer',
			bio: 'Systems architect with a passion for building tools that developers love.'
		}
	];

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

<svelte:head>
	<!-- Additional SEO for Homepage -->
	<meta name="keywords" content="Lumos, Lumos Labs, software development, innovation studio, Flash ORM, AtomicDocs, wtop, pgnx, BestAuth, Go development, open source projects, custom software, developer tools, TypeScript, system programming, freelance engineering" />
	<link rel="canonical" href="https://lumoslab.tech/" />
	
	<!-- JSON-LD for Software Projects -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "ItemList",
		"name": "Lumos Open Source Projects",
		"description": "Open source software projects and tools developed by Lumos Labs",
		"itemListElement": [
			{
				"@type": "SoftwareApplication",
				"position": 1,
				"name": "Flash ORM",
				"applicationCategory": "DeveloperApplication",
				"operatingSystem": "Cross-platform",
				"description": "A powerful, database-agnostic ORM built in Go that provides Prisma-like functionality with multi-database support and type-safe code generation",
				"url": "https://github.com/Lumos-Labs-HQ/flash",
				"author": {
					"@type": "Organization",
					"name": "Lumos Labs"
				},
				"programmingLanguage": "Go"
			},
			{
				"@type": "SoftwareApplication",
				"position": 2,
				"name": "AtomicDocs",
				"applicationCategory": "DeveloperApplication",
				"operatingSystem": "Cross-platform",
				"description": "Lightweight, auto-generated API documentation for Express.js, Hono, and Go. Built with fasthttp for extreme performance",
				"url": "https://github.com/Lumos-Labs-HQ/atomicdocs",
				"author": {
					"@type": "Organization",
					"name": "Lumos Labs"
				},
				"programmingLanguage": "Go"
			},
			{
				"@type": "SoftwareApplication",
				"position": 3,
				"name": "wtop",
				"applicationCategory": "DeveloperApplication",
				"operatingSystem": "Windows",
				"description": "htop for Windows — a powerful system monitoring tool bringing Unix-style process monitoring to Windows",
				"url": "https://github.com/Lumos-Labs-HQ/wtop",
				"author": {
					"@type": "Organization",
					"name": "Lumos Labs"
				},
				"programmingLanguage": "Go"
			},
			{
				"@type": "SoftwareApplication",
				"position": 4,
				"name": "pgnx",
				"applicationCategory": "DeveloperApplication",
				"operatingSystem": "Cross-platform",
				"description": "Fastest PostgreSQL driver for the NodeJS ecosystem, built with C++ for maximum performance",
				"url": "https://github.com/Lumos-Labs-HQ/pgnx",
				"author": {
					"@type": "Organization",
					"name": "Lumos Labs"
				},
				"programmingLanguage": "C++"
			},
			{
				"@type": "SoftwareApplication",
				"position": 5,
				"name": "BestAuth",
				"applicationCategory": "DeveloperApplication",
				"operatingSystem": "Cross-platform",
				"description": "Modern authentication system built from scratch — secure, fast, and extensible",
				"url": "https://github.com/Lumos-Labs-HQ/BestAuth",
				"author": {
					"@type": "Organization",
					"name": "Lumos Labs"
				}
			}
		]
	}
	<\/script>`}
</svelte:head>

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
		<div class="hero-grain"></div>
		<div class="hero-glow"></div>
	</div>

	<div class="hero-content">
		<div class="hero-badge"><span class="badge-dot"></span>Innovation Studio</div>
		<h1 class="hero-title">
			<span class="hero-line"><span class="hero-line-inner">We build what</span></span>
			<span class="hero-line"><span class="hero-line-inner hero-accent">doesn't exist yet.</span></span>
		</h1>
		<p class="hero-subtitle">
			Lumos is an innovation studio building custom authentication systems, language migration engines, and cutting-edge open-source tools.
			Our team engineers the libraries and products that push boundaries.
			We also deliver world-class freelance software engineering for clients worldwide.
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
			<h2 class="section-title">Lumos Open Source Projects</h2>
			<p class="section-subtitle">
				Things we're building in-house — from systems-level tools to full applications.
				Each Lumos project is born from a real need we experienced firsthand.
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
			<h2 class="section-title">Lumos Software Development Services</h2>
			<p class="section-subtitle">
				Lumos works with international and Indian clients on projects of all scales.
				From startups to enterprises — precision engineering, delivered on time.
			</p>
		</div>

		<div class="services-grid">
			{#each services as service, i}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
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

<!-- Tech Stack Section -->
<section id="tech-stack" class="section section-compact" data-animate class:section-visible={isVisible('tech-stack')}>
	<div class="container">
		<div class="section-header section-header-center">
			<span class="section-tag">03</span>
			<h2 class="section-title">Our Tech Stack</h2>
			<p class="section-subtitle section-subtitle-center">
				The tools and technologies we use to build exceptional software.
			</p>
		</div>
	</div>

	<div class="marquee-wrapper">
		<div class="marquee-row">
			<div class="marquee-track marquee-left">
				{#each [...techStackRow1, ...techStackRow1] as tech}
					<div class="tech-pill">
						<i class={tech.icon}></i>
						<span>{tech.name}</span>
					</div>
				{/each}
			</div>
		</div>
		<div class="marquee-row">
			<div class="marquee-track marquee-right">
				{#each [...techStackRow2, ...techStackRow2] as tech}
					<div class="tech-pill">
						<i class={tech.icon}></i>
						<span>{tech.name}</span>
					</div>
				{/each}
			</div>
		</div>
		<div class="marquee-row">
			<div class="marquee-track marquee-left-slow">
				{#each [...techStackRow3, ...techStackRow3] as tech}
					<div class="tech-pill">
						<i class={tech.icon}></i>
						<span>{tech.name}</span>
					</div>
				{/each}
			</div>
		</div>
		<div class="marquee-row">
			<div class="marquee-track marquee-right-slow">
				{#each [...techStackRow4, ...techStackRow4] as tech}
					<div class="tech-pill">
						<i class={tech.icon}></i>
						<span>{tech.name}</span>
					</div>
				{/each}
			</div>
		</div>
		<div class="marquee-row">
			<div class="marquee-track marquee-left">
				{#each [...techStackRow5, ...techStackRow5] as tech}
					<div class="tech-pill">
						<i class={tech.icon}></i>
						<span>{tech.name}</span>
					</div>
				{/each}
			</div>
		</div>
		<div class="marquee-row">
			<div class="marquee-track marquee-right">
				{#each [...techStackRow6, ...techStackRow6] as tech}
					<div class="tech-pill">
						<i class={tech.icon}></i>
						<span>{tech.name}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="section section-alt" data-animate class:section-visible={isVisible('contact')}>
	<div class="container">
		<div class="contact-content">
			<div class="section-header">
				<span class="section-tag">04</span>
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
		--transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
		--transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
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
		font-size: clamp(3rem, 7.5vw, 6rem);
		font-weight: 700;
		line-height: 1.02;
		letter-spacing: -0.05em;
		color: var(--black);
		margin-bottom: 28px;
	}

	.hero-accent {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, var(--gray-900) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		background-size: 200% 200%;
		animation: gradientShift 5s ease-in-out infinite;
	}

	@keyframes gradientShift {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
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
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--black);
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

	.section-compact {
		padding: 80px 32px 40px;
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
		font-size: clamp(2.2rem, 4.5vw, 3.5rem);
		font-weight: 700;
		letter-spacing: -0.04em;
		color: var(--black);
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
	.projects-grid,
	.services-grid,
	.contact-content,
	.marquee-wrapper {
		opacity: 0;
		transform: translateY(40px);
		transition: all var(--transition-slow);
	}

	.section.section-visible .projects-grid,
	.section.section-visible .services-grid,
	.section.section-visible .contact-content,
	.section.section-visible .marquee-wrapper {
		opacity: 1;
		transform: translateY(0);
	}

	/* Section header slide-in */
	.section .section-header {
		opacity: 0;
		transform: translateY(25px);
		transition: opacity 0.6s ease, transform 0.6s ease;
	}

	.section.section-visible .section-header {
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
		font-size: 1.4rem;
		font-weight: 700;
		color: var(--black);
		margin-bottom: 12px;
		letter-spacing: -0.02em;
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
		transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.service-card:hover .service-icon {
		transform: scale(1.2) rotate(5deg);
	}

	.service-title {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--black);
		margin-bottom: 12px;
		letter-spacing: -0.02em;
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
		font-size: 1.7rem;
		font-weight: 700;
		color: var(--white);
		margin-bottom: 8px;
		letter-spacing: -0.03em;
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

	/* ===================== HERO ENHANCEMENTS ===================== */
	.hero-grain {
		position: absolute;
		inset: 0;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
		opacity: 0.5;
		pointer-events: none;
	}

	.hero-glow {
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%);
		border-radius: 50%;
		pointer-events: none;
		animation: glowPulse 6s ease-in-out infinite;
	}

	@keyframes glowPulse {
		0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
		50% { opacity: 1; transform: translateX(-50%) scale(1.15); }
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	.badge-dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		background: #3b9;
		border-radius: 50%;
		animation: dotPulse 2s ease-in-out infinite;
	}

	@keyframes dotPulse {
		0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(51, 187, 153, 0.4); }
		50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(51, 187, 153, 0); }
	}

	/* Text reveal animation */
	.hero-line {
		display: block;
		overflow: hidden;
	}

	.hero-line-inner {
		display: inline-block;
		transform: translateY(110%);
		transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-visible .hero-line-inner {
		transform: translateY(0);
	}

	.hero-visible .hero-line:nth-child(1) .hero-line-inner {
		transition-delay: 0.1s;
	}

	.hero-visible .hero-line:nth-child(3) .hero-line-inner {
		transition-delay: 0.25s;
	}

	/* ===================== TECH STACK SECTION ===================== */
	.section-header-center {
		text-align: center;
	}

	.section-subtitle-center {
		margin-left: auto;
		margin-right: auto;
	}

	.marquee-wrapper {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: 0;
		mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
		-webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
	}

	.marquee-row {
		overflow: hidden;
		padding: 6px 0;
	}

	.marquee-row:hover .marquee-track {
		animation-play-state: paused;
	}

	.marquee-track {
		display: flex;
		gap: 16px;
		width: max-content;
		will-change: transform;
	}

	.marquee-left {
		animation: marqueeLeft 35s linear infinite;
	}

	.marquee-right {
		animation: marqueeRight 32s linear infinite;
	}

	.marquee-left-slow {
		animation: marqueeLeft 42s linear infinite;
	}

	.marquee-right-slow {
		animation: marqueeRight 38s linear infinite;
	}

	@keyframes marqueeLeft {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}

	@keyframes marqueeRight {
		0% { transform: translateX(-50%); }
		100% { transform: translateX(0); }
	}

	.tech-pill {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 14px 28px;
		background: var(--white);
		border: 1px solid var(--gray-200);
		border-radius: 100px;
		white-space: nowrap;
		transition: all var(--transition);
		cursor: default;
		flex-shrink: 0;
	}

	.tech-pill:hover {
		border-color: var(--gray-400);
		/* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); */
		background: var(--gray-50);
	}

	.tech-pill i {
		font-size: 1.6rem;
		line-height: 1;
	}

	.tech-pill span {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--gray-800);
		letter-spacing: -0.01em;
	}

	/* ===================== STAGGERED CARD ANIMATIONS ===================== */
	.section.section-visible .project-card {
		opacity: 1;
		transform: translateY(0);
	}

	.project-card {
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.5s ease, transform 0.5s ease, box-shadow var(--transition), border-color var(--transition);
	}

	.section.section-visible .service-card {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	.service-card {
		opacity: 0;
		transform: translateY(20px) scale(0.97);
		transition: opacity 0.5s ease, transform 0.5s ease, background var(--transition), border-color var(--transition), box-shadow var(--transition);
	}

	/* Stagger delays for cards */
	.section.section-visible .project-card:nth-child(1),
	.section.section-visible .service-card:nth-child(1) { transition-delay: 0.05s; }
	.section.section-visible .project-card:nth-child(2),
	.section.section-visible .service-card:nth-child(2) { transition-delay: 0.12s; }
	.section.section-visible .project-card:nth-child(3),
	.section.section-visible .service-card:nth-child(3) { transition-delay: 0.19s; }
	.section.section-visible .project-card:nth-child(4),
	.section.section-visible .service-card:nth-child(4) { transition-delay: 0.26s; }
	.section.section-visible .project-card:nth-child(5),
	.section.section-visible .service-card:nth-child(5) { transition-delay: 0.33s; }
	.section.section-visible .project-card:nth-child(6) { transition-delay: 0.4s; }
	.section.section-visible .project-card:nth-child(7) { transition-delay: 0.47s; }
	.section.section-visible .project-card:nth-child(8) { transition-delay: 0.54s; }

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
		.section-compact {
			padding: 60px 24px 24px;
		}

		.marquee-wrapper {
			gap: 0;
		}

		.tech-pill {
			padding: 10px 20px;
			gap: 10px;
		}

		.tech-pill i {
			font-size: 1.3rem;
		}

		.tech-pill span {
			font-size: 0.85rem;
		}

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
