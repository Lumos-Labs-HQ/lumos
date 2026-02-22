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
	<div class="container">
		<h1 class="hero-title">Blog</h1>
		<p class="hero-subtitle">
			Insights, tutorials, and stories about building the future of developer tools.
		</p>
		<a href="/blog/new" class="btn btn-primary">Write New Post</a>
	</div>
</section>

<!-- Blog Posts -->
<section id="posts" class="section" data-animate class:section-visible={isVisible('posts')}>
	<div class="container">
		<div class="posts-grid">
			{#each posts as post, i}
				<div class="post-card" style="transition-delay: {i * 100}ms">
					<div class="post-image" style="background-image: url({post.coverImage || post.image})"></div>
					<div class="post-content">
						<div class="post-meta">
							<span class="post-date">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
							<span class="post-divider">•</span>
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
		margin: 0 auto 32px;
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
		background: #0a0a0a;
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
	}

	.section {
		padding: 80px 32px;
	}

	.section.section-visible .posts-grid {
		opacity: 1;
		transform: translateY(0);
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 32px;
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
	}

	.post-content {
		padding: 28px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		flex: 1;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.8rem;
		color: var(--gray-500);
	}

	.post-divider {
		color: var(--gray-300);
	}

	.post-title {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--gray-900);
		line-height: 1.3;
		letter-spacing: -0.01em;
	}

	.post-excerpt {
		font-size: 0.95rem;
		line-height: 1.6;
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
		font-size: 0.9rem;
		font-weight: 600;
	}

	.author-name {
		font-size: 0.85rem;
		color: var(--gray-600);
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.hero {
			padding: 120px 24px 60px;
		}

		.section {
			padding: 60px 24px;
		}

		.posts-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
