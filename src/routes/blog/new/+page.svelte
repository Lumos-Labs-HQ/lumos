<script lang="ts">
	let title = $state('');
	let content = $state('');
	let excerpt = $state('');
	let tags = $state('');
	let coverImage = $state('');
	let uploading = $state(false);
	let showPreview = $state(false);
	let author = $state('Swarnendu Ghosh');

	async function uploadImage(file: File) {
		uploading = true;
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', 'lumos_blog');
		formData.append('cloud_name', 'dr2wux5qj');

		try {
			const response = await fetch(
				'https://api.cloudinary.com/v1_1/dr2wux5qj/image/upload',
				{
					method: 'POST',
					body: formData
				}
			);
			const data = await response.json();
			return data.secure_url;
		} catch (error) {
			console.error('Upload failed:', error);
			alert('Image upload failed. Please try again.');
			return null;
		} finally {
			uploading = false;
		}
	}

	async function handleCoverImageUpload(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const url = await uploadImage(input.files[0]);
			if (url) coverImage = url;
		}
	}

	async function handleInlineImageUpload(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const url = await uploadImage(input.files[0]);
			if (url) {
				content += `\n![Image](${url})\n`;
			}
		}
	}

	function applyFormat(format: string) {
		const textarea = document.getElementById('content') as HTMLTextAreaElement;
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selectedText = content.substring(start, end);

		let formattedText = '';
		switch (format) {
			case 'bold':
				formattedText = `**${selectedText}**`;
				break;
			case 'italic':
				formattedText = `*${selectedText}*`;
				break;
			case 'code':
				formattedText = `\`${selectedText}\``;
				break;
			case 'h1':
				formattedText = `# ${selectedText}`;
				break;
			case 'h2':
				formattedText = `## ${selectedText}`;
				break;
			case 'h3':
				formattedText = `### ${selectedText}`;
				break;
			case 'link':
				formattedText = `[${selectedText}](url)`;
				break;
			case 'quote':
				formattedText = `> ${selectedText}`;
				break;
		}

		content = content.substring(0, start) + formattedText + content.substring(end);
	}

	function parseMarkdown(text: string): string {
		return text
			.replace(/^### (.*$)/gim, '<h3>$1</h3>')
			.replace(/^## (.*$)/gim, '<h2>$1</h2>')
			.replace(/^# (.*$)/gim, '<h1>$1</h1>')
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.*?)\*/g, '<em>$1</em>')
			.replace(/`(.*?)`/g, '<code>$1</code>')
			.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />')
			.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
			.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
			.replace(/\n/g, '<br />');
	}

	function handleSubmit() {
		if (!title || !content) {
			alert('Please fill in title and content');
			return;
		}

		const post = {
			id: Date.now(),
			title,
			content,
			excerpt: excerpt || content.substring(0, 150) + '...',
			tags: tags.split(',').map(t => t.trim()).filter(t => t),
			coverImage: coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
			author,
			date: new Date().toISOString(),
			readTime: Math.ceil(content.split(' ').length / 200) + ' min read'
		};

		// Save to localStorage
		const posts = JSON.parse(localStorage.getItem('blog_posts') || '[]');
		posts.unshift(post);
		localStorage.setItem('blog_posts', JSON.stringify(posts));

		alert('Post published successfully!');
		window.location.href = '/blog';
	}
</script>

<svelte:head>
	<title>New Post — Lumos Blog</title>
</svelte:head>

<div class="editor-container">
	<div class="editor-header">
		<h1>Write New Post</h1>
		<div class="header-actions">
			<button class="btn btn-secondary" onclick={() => (showPreview = !showPreview)}>
				{showPreview ? '✏️ Edit' : '👁️ Preview'}
			</button>
			<a href="/blog" class="btn btn-secondary">Cancel</a>
			<button class="btn btn-primary" onclick={handleSubmit}>Publish</button>
		</div>
	</div>

	{#if showPreview}
		<div class="preview-container">
			{#if coverImage}
				<div class="preview-cover" style="background-image: url({coverImage})"></div>
			{/if}
			<div class="preview-content">
				<h1 class="preview-title">{title || 'Untitled Post'}</h1>
				<div class="preview-meta">
					<span>{author}</span>
					<span>•</span>
					<span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
				</div>
				{#if excerpt}
					<p class="preview-excerpt">{excerpt}</p>
				{/if}
				<div class="preview-body">
					{@html parseMarkdown(content || '*Start writing to see preview...*')}
				</div>
				{#if tags}
					<div class="preview-tags">
						{#each tags.split(',').map(t => t.trim()).filter(t => t) as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<div class="editor-content">
		<div class="form-group">
			<label for="title">Title</label>
			<input
				type="text"
				id="title"
				bind:value={title}
				placeholder="Enter post title..."
				class="title-input"
			/>
		</div>

		<div class="form-group">
			<label for="excerpt">Excerpt</label>
			<textarea
				id="excerpt"
				bind:value={excerpt}
				placeholder="Brief description of your post..."
				rows="2"
			></textarea>
		</div>

		<div class="form-group">
			<label for="cover">Cover Image</label>
			<div class="image-upload">
				{#if coverImage}
					<div class="image-preview" style="background-image: url({coverImage})">
						<button class="remove-image" onclick={() => (coverImage = '')}>×</button>
					</div>
				{:else}
					<label for="cover-upload" class="upload-label">
						{#if uploading}
							<span>Uploading...</span>
						{:else}
							<span>📷 Upload Cover Image</span>
						{/if}
					</label>
					<input
						type="file"
						id="cover-upload"
						accept="image/*"
						onchange={handleCoverImageUpload}
						style="display: none"
					/>
				{/if}
			</div>
		</div>

		<div class="form-group">
			<label for="tags">Tags (comma separated)</label>
			<input
				type="text"
				id="tags"
				bind:value={tags}
				placeholder="Go, ORM, Database"
			/>
		</div>

		<div class="form-group">
			<label for="content">Content</label>
			<div class="editor-toolbar">
				<button onclick={() => applyFormat('bold')} title="Bold"><strong>B</strong></button>
				<button onclick={() => applyFormat('italic')} title="Italic"><em>I</em></button>
				<button onclick={() => applyFormat('code')} title="Code">&lt;/&gt;</button>
				<span class="toolbar-divider"></span>
				<button onclick={() => applyFormat('h1')} title="Heading 1">H1</button>
				<button onclick={() => applyFormat('h2')} title="Heading 2">H2</button>
				<button onclick={() => applyFormat('h3')} title="Heading 3">H3</button>
				<span class="toolbar-divider"></span>
				<button onclick={() => applyFormat('link')} title="Link">🔗</button>
				<button onclick={() => applyFormat('quote')} title="Quote">"</button>
				<label for="inline-image" class="toolbar-button" title="Insert Image">
					🖼️
					<input
						type="file"
						id="inline-image"
						accept="image/*"
						onchange={handleInlineImageUpload}
						style="display: none"
					/>
				</label>
			</div>
			<textarea
				id="content"
				bind:value={content}
				placeholder="Write your post content in Markdown..."
				rows="20"
			></textarea>
			<p class="help-text">Supports Markdown formatting</p>
		</div>
	</div>
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
		--gray-600: #525252;
		--gray-700: #404040;
		--gray-900: #171717;
		--radius: 12px;
		--transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.editor-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 120px 32px 80px;
	}

	.editor-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 48px;
	}

	.editor-header h1 {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--gray-900);
	}

	.header-actions {
		display: flex;
		gap: 12px;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		padding: 12px 28px;
		border-radius: 100px;
		font-size: 0.9rem;
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
	}

	.btn-secondary {
		background: var(--white);
		color: var(--gray-900);
		border: 1px solid var(--gray-300);
	}

	.btn-secondary:hover {
		border-color: var(--gray-900);
	}

	.editor-content {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.form-group label {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--gray-700);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.title-input {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 2rem;
		font-weight: 600;
		padding: 16px 0;
		border: none;
		border-bottom: 2px solid var(--gray-200);
		color: var(--gray-900);
		transition: border-color var(--transition);
	}

	.title-input:focus {
		outline: none;
		border-bottom-color: var(--gray-900);
	}

	input[type="text"],
	textarea {
		padding: 14px 18px;
		border: 1px solid var(--gray-300);
		border-radius: 8px;
		font-size: 0.95rem;
		font-family: inherit;
		color: var(--gray-900);
		background: var(--white);
		transition: all var(--transition);
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--gray-900);
		box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
	}

	textarea {
		resize: vertical;
		font-family: 'Monaco', 'Courier New', monospace;
		line-height: 1.6;
	}

	.image-upload {
		min-height: 200px;
	}

	.upload-label {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 200px;
		border: 2px dashed var(--gray-300);
		border-radius: var(--radius);
		cursor: pointer;
		transition: all var(--transition);
		font-size: 1.1rem;
		color: var(--gray-500);
	}

	.upload-label:hover {
		border-color: var(--gray-900);
		background: var(--gray-50);
	}

	.image-preview {
		position: relative;
		height: 300px;
		background-size: cover;
		background-position: center;
		border-radius: var(--radius);
		overflow: hidden;
	}

	.remove-image {
		position: absolute;
		top: 12px;
		right: 12px;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.7);
		color: white;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition);
	}

	.remove-image:hover {
		background: rgba(0, 0, 0, 0.9);
	}

	.editor-toolbar {
		display: flex;
		gap: 4px;
		padding: 8px;
		background: var(--gray-50);
		border: 1px solid var(--gray-200);
		border-radius: 8px 8px 0 0;
		flex-wrap: wrap;
	}

	.editor-toolbar button,
	.toolbar-button {
		padding: 8px 12px;
		background: var(--white);
		border: 1px solid var(--gray-200);
		border-radius: 6px;
		cursor: pointer;
		transition: all var(--transition);
		font-size: 0.9rem;
		color: var(--gray-700);
	}

	.editor-toolbar button:hover,
	.toolbar-button:hover {
		background: var(--gray-100);
		border-color: var(--gray-300);
	}

	.toolbar-divider {
		width: 1px;
		background: var(--gray-300);
		margin: 0 8px;
	}

	.help-text {
		font-size: 0.8rem;
		color: var(--gray-500);
		margin-top: -8px;
	}

	/* ===================== PREVIEW ===================== */
	.preview-container {
		background: var(--white);
		border: 1px solid var(--gray-200);
		border-radius: var(--radius);
		overflow: hidden;
	}

	.preview-cover {
		width: 100%;
		height: 400px;
		background-size: cover;
		background-position: center;
	}

	.preview-content {
		padding: 48px;
		max-width: 800px;
		margin: 0 auto;
	}

	.preview-title {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--gray-900);
		line-height: 1.2;
		margin-bottom: 16px;
	}

	.preview-meta {
		display: flex;
		gap: 8px;
		font-size: 0.9rem;
		color: var(--gray-500);
		margin-bottom: 24px;
	}

	.preview-excerpt {
		font-size: 1.15rem;
		line-height: 1.7;
		color: var(--gray-600);
		margin-bottom: 32px;
		font-style: italic;
	}

	.preview-body {
		font-size: 1.05rem;
		line-height: 1.8;
		color: var(--gray-700);
	}

	.preview-body :global(h1) {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 2rem;
		font-weight: 700;
		margin: 32px 0 16px;
		color: var(--gray-900);
	}

	.preview-body :global(h2) {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.6rem;
		font-weight: 600;
		margin: 28px 0 14px;
		color: var(--gray-900);
	}

	.preview-body :global(h3) {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.3rem;
		font-weight: 600;
		margin: 24px 0 12px;
		color: var(--gray-900);
	}

	.preview-body :global(strong) {
		font-weight: 600;
		color: var(--gray-900);
	}

	.preview-body :global(em) {
		font-style: italic;
	}

	.preview-body :global(code) {
		background: var(--gray-100);
		padding: 2px 6px;
		border-radius: 4px;
		font-family: 'Monaco', monospace;
		font-size: 0.9em;
		color: var(--gray-900);
	}

	.preview-body :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: 8px;
		margin: 24px 0;
	}

	.preview-body :global(a) {
		color: var(--gray-900);
		text-decoration: underline;
	}

	.preview-body :global(blockquote) {
		border-left: 4px solid var(--gray-300);
		padding-left: 20px;
		margin: 20px 0;
		color: var(--gray-600);
		font-style: italic;
	}

	.preview-tags {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-top: 32px;
		padding-top: 32px;
		border-top: 1px solid var(--gray-200);
	}

	.tag {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--gray-600);
		background: var(--gray-100);
		padding: 6px 14px;
		border-radius: 100px;
		border: 1px solid var(--gray-200);
	}

	@media (max-width: 768px) {
		.editor-container {
			padding: 100px 24px 60px;
		}

		.editor-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
		}

		.title-input {
			font-size: 1.5rem;
		}
	}
</style>
