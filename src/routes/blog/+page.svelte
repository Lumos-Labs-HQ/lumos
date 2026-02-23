<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let visibleSections = $state<Set<string>>(new Set());

	// Blog posts data
	let posts = $state([
		{
			id: 1,
			title: 'Building Flash ORM: A Journey into Database Abstraction',
			excerpt: 'How we built a Prisma-like ORM for Go with multi-database support and type-safe code generation.',
			author: 'Swarnendu Ghosh',
			date: '2026-02-20',
			readTime: '8 min read',
			image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
			tags: ['Go', 'ORM', 'Database']
		},
		{
			id: 2,
			title: 'The Future of AI in Developer Tools',
			excerpt: 'Exploring how AI and LLMs are transforming the way we build software and developer experiences.',
			author: 'Rana Dolui',
			date: '2026-02-18',
			readTime: '6 min read',
			image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
			tags: ['AI', 'LLM', 'DevTools']
		}
	]);

	onMount(() => {
		mounted = true;

		// Load posts from localStorage
		const savedPosts = localStorage.getItem('blog_posts');
		if (savedPosts) {
			const parsedPosts = JSON.parse(savedPosts);
			posts = [...parsedPosts, ...posts];
		}

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
</script>

<svelte:head>
	<title>Lumos Blog — Insights on Software Development, Open Source & Innovation</title>
	<meta name="description" content="Insights, tutorials, and stories from the Lumos team about building developer tools, open-source projects, and modern software. Learn about Go, TypeScript, AI/ML, and more." />
	<meta name="keywords" content="Lumos blog, software development blog, programming tutorials, Go programming, TypeScript tutorials, open source insights, developer tools, tech blog, engineering blog" />
	<link rel="canonical" href="https://lumoslab.tech/blog" />

	<!-- Open Graph -->
	<meta property="og:title" content="Lumos Blog — Software Development Insights" />
	<meta property="og:description" content="Insights, tutorials, and stories from the Lumos team about building developer tools and modern software." />
	<meta property="og:url" content="https://lumoslab.tech/blog" />
	<meta property="og:type" content="website" />

	<!-- Twitter -->
	<meta property="twitter:title" content="Lumos Blog — Software Development Insights" />
	<meta property="twitter:description" content="Insights, tutorials, and stories from the Lumos team about building developer tools and modern software." />
</svelte:head>

<!-- Hero -->
<section class="hero" class:hero-visible={mounted}>
	<div class="hero-bg">
		<div class="grid-pattern"></div>
	</div>
	<div class="container">
		<div class="hero-badge">Blog</div>
		<h1 class="hero-title">Insights & Stories</h1>
		<p class="hero-subtitle">
			Tutorials, deep dives, and stories about building the future of developer tools.
		</p>
	</div>
</section>

<!-- Blog Posts -->
<section id="posts" class="section" data-animate class:section-visible={isVisible('posts')}>
	<div class="container">
		<div class="posts-grid">
			{#each posts as post, i}
				<article class="post-card" style="transition-delay: {i * 100}ms">
					<div class="post-image" style="background-image: url({post.image})"></div>
					<div class="post-content">
						<div class="post-meta">
							<span class="post-date">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
							<span class="post-divider">·</span>
							<span class="post-read-time">{post.readTime}</span>
						</div>
						<h2 class="post-title">{post.title}</h2>
						<p class="post-excerpt">{post.excerpt}</p>
						<div class="post-tags">
							{#each post.tags as tag}
								<span class="tag">{tag}</span>
							{/each}
						</div>
						<div class="post-author">
							<div class="author-avatar">{post.author.charAt(0)}</div>
							<span class="author-name">{post.author}</span>
						</div>
					</div>
				</article>
			{/each}
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
		--gray-800: #262626;
		--gray-900: #171717;
		--black: #0a0a0a;
		--radius: 12px;
		--transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
		--transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 32px;
	}

	/* ===================== HERO ===================== */
	.hero {
		min-height: 50vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 140px 32px 80px;
		position: relative;
		overflow: hidden;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.hero-visible {
		opacity: 1;
		transform: translateY(0);
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
		margin-bottom: 24px;
		position: relative;
	}

	.hero-title {
		font-family: 'Space Grotesk', sans-serif;
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 700;
		letter-spacing: -0.04em;
		color: var(--black);
		margin-bottom: 20px;
		position: relative;
	}

	.hero-subtitle {
		font-size: clamp(1rem, 2vw, 1.15rem);
		line-height: 1.7;
		color: var(--gray-500);
		max-width: 560px;
		margin: 0 auto;
		position: relative;
	}

	/* ===================== POSTS ===================== */
	.section {
		padding: 40px 32px 120px;
	}

	.section.section-visible .posts-grid {
		opacity: 1;
		transform: translateY(0);
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 28px;
		opacity: 0;
		transform: translateY(40px);
		transition: all var(--transition-slow);
	}

	.post-card {
		background: var(--white);
		border: 1px solid var(--gray-200);
		border-radius: var(--radius);
		overflow: hidden;
		transition: all var(--transition);
		display: flex;
		flex-direction: column;
		cursor: pointer;
	}

	.post-card:hover {
		border-color: var(--gray-300);
		transform: translateY(-4px);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
	}

	.post-image {
		width: 100%;
		height: 220px;
		background-size: cover;
		background-position: center;
		background-color: var(--gray-100);
		transition: transform 0.4s ease;
	}

	.post-card:hover .post-image {
		transform: scale(1.03);
	}

	.post-content {
		padding: 28px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		flex: 1;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.8rem;
		color: var(--gray-500);
		font-weight: 450;
	}

	.post-divider {
		color: var(--gray-300);
	}

	.post-title {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.35rem;
		font-weight: 700;
		color: var(--black);
		line-height: 1.3;
		letter-spacing: -0.02em;
	}

	.post-excerpt {
		font-size: 0.92rem;
		line-height: 1.65;
		color: var(--gray-600);
		flex: 1;
	}

	.post-tags {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
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

	.post-author {
		display: flex;
		align-items: center;
		gap: 12px;
		padding-top: 16px;
		border-top: 1px solid var(--gray-200);
	}

	.author-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--gray-900);
		color: var(--white);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.85rem;
		font-weight: 600;
		font-family: 'Space Grotesk', sans-serif;
	}

	.author-name {
		font-size: 0.85rem;
		color: var(--gray-600);
		font-weight: 500;
	}

	/* Staggered card animation */
	.section.section-visible .post-card {
		opacity: 1;
		transform: translateY(0);
	}

	.post-card {
		opacity: 0;
		transform: translateY(25px);
		transition: opacity 0.5s ease, transform 0.5s ease, box-shadow var(--transition), border-color var(--transition);
	}

	.section.section-visible .post-card:nth-child(1) { transition-delay: 0.05s; }
	.section.section-visible .post-card:nth-child(2) { transition-delay: 0.15s; }
	.section.section-visible .post-card:nth-child(3) { transition-delay: 0.25s; }
	.section.section-visible .post-card:nth-child(4) { transition-delay: 0.35s; }

	/* ===================== FOOTER ===================== */
	.footer {
		padding: 40px 32px;
		border-top: 1px solid var(--gray-200);
		background: var(--gray-50);
	}

	.footer-inner {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.footer-brand {
		display: flex;
		align-items: center;
		gap: 10px;
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

	.footer-copy {
		font-size: 0.82rem;
		color: var(--gray-400);
	}

	/* ===================== RESPONSIVE ===================== */
	@media (max-width: 768px) {
		.hero {
			padding: 120px 24px 60px;
			min-height: 40vh;
		}

		.section {
			padding: 40px 24px 80px;
		}

		.posts-grid {
			grid-template-columns: 1fr;
		}

		.footer-inner {
			flex-direction: column;
			gap: 16px;
			text-align: center;
		}
	}
</style>
