<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);
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
			{ threshold: 0.1 }
		);

		document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});

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

	const techStack = [
		{ name: 'Go', icon: '⚡', category: 'Backend' },
		{ name: 'Rust', icon: '🦀', category: 'Systems' },
		{ name: 'C', icon: '🔧', category: 'Systems' },
		{ name: 'C++', icon: '⚙️', category: 'Systems' },
		{ name: 'TypeScript', icon: '📘', category: 'Frontend' },
		{ name: 'Python', icon: '🐍', category: 'AI/ML' },
		{ name: 'JavaScript', icon: '💛', category: 'Frontend' },
		{ name: 'Dart', icon: '🎯', category: 'Mobile' },
		{ name: 'Svelte', icon: '🔥', category: 'Frontend' },
		{ name: 'React', icon: '⚛️', category: 'Frontend' },
		{ name: 'Next.js', icon: '▲', category: 'Frontend' },
		{ name: 'Vue', icon: '💚', category: 'Frontend' },
		{ name: 'TensorFlow', icon: '🧠', category: 'AI/ML' },
		{ name: 'PyTorch', icon: '🔥', category: 'AI/ML' },
		{ name: 'LangChain', icon: '🔗', category: 'AI/ML' },
		{ name: 'OpenAI', icon: '🤖', category: 'AI/ML' },
		{ name: 'Hugging Face', icon: '🤗', category: 'AI/ML' },
		{ name: 'PostgreSQL', icon: '🐘', category: 'Database' },
		{ name: 'MySQL', icon: '🐬', category: 'Database' },
		{ name: 'MongoDB', icon: '🍃', category: 'Database' },
		{ name: 'Redis', icon: '🔴', category: 'Database' },
		{ name: 'Docker', icon: '🐳', category: 'DevOps' },
		{ name: 'Kubernetes', icon: '☸️', category: 'DevOps' },
		{ name: 'AWS', icon: '☁️', category: 'Cloud' },
		{ name: 'GCP', icon: '☁️', category: 'Cloud' },
		{ name: 'Azure', icon: '☁️', category: 'Cloud' }
	];

	const team = [
		{
			name: 'Swarnendu Ghosh',
			role: 'Founder & Engineer',
			bio: 'Systems architect with a passion for building tools that developers love. Specializes in Go, Rust, and high-performance systems.',
			github: 'https://github.com/swarnendug7',
			twitter: 'https://x.com/swarnendug7'
		},
		{
			name: 'Rana Dolui',
			role: 'Co-Founder & Engineer',
			bio: 'Full-stack engineer focused on creating seamless user experiences and scalable backend systems.',
			github: 'https://github.com/ranadolui',
			twitter: 'https://x.com/ranadolui'
		}
	];
</script>

<svelte:head>
	<title>About — Lumos</title>
</svelte:head>

<!-- Hero -->
<section class="hero" class:hero-visible={mounted}>
	<div class="container">
		<h1 class="hero-title">About Lumos</h1>
		<p class="hero-subtitle">
			We're a team of engineers who believe in building tools that make developers' lives easier.
		</p>
	</div>
</section>

<!-- Team Section -->
<section id="team" class="section" data-animate class:section-visible={isVisible('team')}>
	<div class="container">
		<div class="section-header">
			<span class="section-tag">01</span>
			<h2 class="section-title">The Team</h2>
			<p class="section-subtitle">
				Meet the people building the future of developer tools.
			</p>
		</div>

		<div class="team-grid">
			{#each team as member, i}
				<div class="team-card" style="transition-delay: {i * 100}ms">
					<div class="team-avatar">{member.name.charAt(0)}</div>
					<h3 class="team-name">{member.name}</h3>
					<p class="team-role">{member.role}</p>
					<p class="team-bio">{member.bio}</p>
					<div class="team-links">
						<a href={member.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
						<a href={member.twitter} target="_blank" rel="noopener noreferrer">Twitter ↗</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Tech Stack Section -->
<section id="tech" class="section section-alt" data-animate class:section-visible={isVisible('tech')}>
	<div class="container">
		<div class="section-header">
			<span class="section-tag">02</span>
			<h2 class="section-title">Tech Stack</h2>
			<p class="section-subtitle">
				The tools and technologies we use to build exceptional products.
			</p>
		</div>

		<div class="tech-grid">
			{#each techStack as tech, i}
				<div 
					class="tech-card" 
					style="transition-delay: {i * 50}ms"
					onmousemove={(e) => handleCardMouseMove(e, e.currentTarget)}
					onmouseleave={(e) => handleCardMouseLeave(e.currentTarget)}
				>
					<span class="tech-icon">{tech.icon}</span>
					<div class="tech-info">
						<span class="tech-name">{tech.name}</span>
						<span class="tech-category">{tech.category}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	:root {
		--white: #ffffff;
		--gray-50: #fafafa;
		--gray-100: #f5f5f5;
		--gray-200: #e5e5e5;
		--gray-300: #d4d4d4;
		--gray-400: #a3a3a3;
		--gray-500: #737373;
		--gray-600: #525252;
		--gray-900: #171717;
		--radius: 12px;
		--transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		--transition-slow: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 32px;
	}

	/* Hero */
	.hero {
		padding: 160px 32px 80px;
		text-align: center;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.hero-visible {
		opacity: 1;
		transform: translateY(0);
	}

	.hero-title {
		font-family: 'Space Grotesk', sans-serif;
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--gray-900);
		margin-bottom: 20px;
	}

	.hero-subtitle {
		font-size: 1.15rem;
		line-height: 1.7;
		color: var(--gray-500);
		max-width: 600px;
		margin: 0 auto;
	}

	/* Sections */
	.section {
		padding: 100px 32px;
	}

	.section-alt {
		background: var(--white);
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

	.section.section-visible .team-grid,
	.section.section-visible .tech-grid {
		opacity: 1;
		transform: translateY(0);
	}

	.team-grid,
	.tech-grid {
		opacity: 0;
		transform: translateY(40px);
		transition: all var(--transition-slow);
	}

	/* Team */
	.team-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 32px;
	}

	.team-card {
		background: var(--white);
		border: 1px solid var(--gray-200);
		border-radius: var(--radius);
		padding: 40px;
		text-align: center;
		transition: all var(--transition);
	}

	.team-card:hover {
		border-color: var(--gray-300);
		transform: translateY(-4px);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
	}

	.team-avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: var(--gray-900);
		color: var(--white);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		font-weight: 600;
		margin: 0 auto 20px;
	}

	.team-name {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--gray-900);
		margin-bottom: 8px;
	}

	.team-role {
		font-size: 0.95rem;
		color: var(--gray-500);
		margin-bottom: 16px;
	}

	.team-bio {
		font-size: 0.9rem;
		line-height: 1.6;
		color: var(--gray-600);
		margin-bottom: 24px;
	}

	.team-links {
		display: flex;
		gap: 16px;
		justify-content: center;
	}

	.team-links a {
		font-size: 0.85rem;
		color: var(--gray-900);
		text-decoration: none;
		transition: color var(--transition);
	}

	.team-links a:hover {
		color: var(--gray-500);
	}

	/* Tech Stack */
	.tech-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 16px;
	}

	.tech-card {
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 12px;
		padding: 24px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		transition: all var(--transition);
		cursor: pointer;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
	}

	.tech-card:hover {
		background: rgba(255, 255, 255, 0.9);
		border-color: rgba(255, 255, 255, 0.5);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
	}

	.tech-icon {
		font-size: 2.5rem;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
	}

	.tech-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.tech-name {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--gray-900);
	}

	.tech-category {
		font-size: 0.75rem;
		color: var(--gray-500);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	@media (max-width: 768px) {
		.hero {
			padding: 120px 24px 60px;
		}

		.section {
			padding: 80px 24px;
		}

		.tech-grid {
			grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		}
	}
</style>
