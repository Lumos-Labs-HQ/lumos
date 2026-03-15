<script lang="ts">
	import { onMount } from 'svelte';
	import { defaultPosts, toBlogPost, type BlogPost } from '$lib/blog/posts';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
	let post = $state<BlogPost | null>(defaultPosts.find((item) => item.slug === data.slug) ?? null);
	let loaded = $state(false);

	onMount(() => {
		const savedPosts = localStorage.getItem('blog_posts');
		if (savedPosts) {
			const parsedPosts = JSON.parse(savedPosts) as Record<string, unknown>[];
			const normalized = parsedPosts.map((item) => toBlogPost(item));
			const matched = normalized.find((item) => item.slug === data.slug);
			if (matched) {
				post = matched;
			}
		}

		loaded = true;
	});

	function parseMarkdown(text: string): string {
		return text
			.replace(/^### (.*$)/gim, '<h3>$1</h3>')
			.replace(/^## (.*$)/gim, '<h2>$1</h2>')
			.replace(/^# (.*$)/gim, '<h1>$1</h1>')
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.*?)\*/g, '<em>$1</em>')
			.replace(/`(.*?)`/g, '<code>$1</code>')
			.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />')
			.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
			.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
			.replace(/\n/g, '<br />');
	}
</script>

<svelte:head>
	<title>{post ? `${post.title} - Lumos Blog` : 'Post Not Found - Lumos Blog'}</title>
	{#if post}
		<meta name="description" content={post.excerpt} />
	{/if}
</svelte:head>

<div class="page-shell">
	{#if post}
		<article class="article">
			<div class="article-meta">
				<a href="/blog" class="back-link">← Back to blog</a>
				<div class="meta-line">
					<span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
					<span>•</span>
					<span>{post.readTime}</span>
				</div>
			</div>

			<h1>{post.title}</h1>
			<p class="excerpt">{post.excerpt}</p>

			<div class="author-row">
				<div class="avatar">{post.author.charAt(0)}</div>
				<span>{post.author}</span>
			</div>

			<div class="cover" style="background-image: url({post.image})"></div>

			<div class="content">
				{@html parseMarkdown(post.content)}
			</div>

			<div class="tags">
				{#each post.tags as tag}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		</article>
	{:else if loaded}
		<section class="not-found">
			<h1>Post not found</h1>
			<p>The article you are looking for does not exist or was removed.</p>
			<a href="/blog">Go back to blog</a>
		</section>
	{:else}
		<section class="not-found">
			<h1>Loading post...</h1>
		</section>
	{/if}
</div>

<style>
	:root {
		--white: #ffffff;
		--gray-50: #fafafa;
		--gray-100: #f5f5f5;
		--gray-200: #e5e5e5;
		--gray-300: #d4d4d4;
		--gray-500: #737373;
		--gray-700: #404040;
		--gray-900: #171717;
		--radius: 14px;
	}

	.page-shell {
		padding: 120px 24px 80px;
	}

	.article,
	.not-found {
		max-width: 820px;
		margin: 0 auto;
	}

	.article-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		margin-bottom: 24px;
		flex-wrap: wrap;
	}

	.back-link {
		color: var(--gray-700);
		text-decoration: none;
		font-weight: 500;
	}

	.meta-line {
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--gray-500);
		font-size: 0.9rem;
	}

	h1 {
		font-family: 'Space Grotesk', sans-serif;
		font-size: clamp(2rem, 5vw, 3.3rem);
		line-height: 1.15;
		letter-spacing: -0.03em;
		margin-bottom: 12px;
	}

	.excerpt {
		font-size: 1.08rem;
		line-height: 1.65;
		color: var(--gray-700);
		margin-bottom: 24px;
	}

	.author-row {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 28px;
	}

	.avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: var(--gray-900);
		color: var(--white);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
	}

	.cover {
		height: clamp(220px, 45vw, 420px);
		border-radius: var(--radius);
		background-size: cover;
		background-position: center;
		margin-bottom: 28px;
		background-color: var(--gray-100);
	}

	.content {
		font-size: 1rem;
		line-height: 1.8;
		color: var(--gray-900);
	}

	:global(.content h2),
	:global(.content h3) {
		font-family: 'Space Grotesk', sans-serif;
		margin-top: 26px;
		margin-bottom: 12px;
	}

	:global(.content p) {
		margin-bottom: 14px;
	}

	:global(.content code) {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.92em;
		background: var(--gray-100);
		border: 1px solid var(--gray-200);
		padding: 2px 6px;
		border-radius: 6px;
	}

	:global(.content blockquote) {
		margin: 18px 0;
		padding: 12px 16px;
		border-left: 4px solid var(--gray-300);
		background: var(--gray-50);
	}

	:global(.content img) {
		width: 100%;
		height: auto;
		border-radius: 10px;
		margin: 14px 0;
	}

	.tags {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-top: 32px;
	}

	.tag {
		font-size: 0.75rem;
		padding: 4px 10px;
		border-radius: 100px;
		background: var(--gray-100);
		border: 1px solid var(--gray-200);
		color: var(--gray-700);
	}

	.not-found {
		text-align: center;
		padding: 80px 0;
	}

	.not-found p {
		color: var(--gray-700);
		margin: 12px 0 16px;
	}

	.not-found a {
		color: var(--gray-900);
		font-weight: 600;
	}
</style>
