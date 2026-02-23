<script lang="ts">
	let scrollY = $state(0);
	let mobileMenuOpen = $state(false);
</script>

<svelte:window bind:scrollY />

<nav class="nav" class:nav-scrolled={scrollY > 50}>
	<div class="nav-inner">
		<a href="/" class="logo">
			<img src="/lumios-logo.png" alt="Lumos Labs" class="logo-mark" />
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

<style>
	:root {
		--white: #ffffff;
		--gray-50: #fafafa;
		--gray-200: #e5e5e5;
		--gray-600: #525252;
		--gray-900: #171717;
		--black: #0a0a0a;
		--transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

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
		width: 32px;
		height: 32px;
		object-fit: contain;
		border-radius: 50%;
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
