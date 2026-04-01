<script lang="ts">
  import { onMount } from "svelte";
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";

  let mounted = $state(false);
  let mouseX = $state(0);
  let mouseY = $state(0);

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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => observer.observe(el));

    // Normalized Cursor tracking for global 3D parallax (-1 to 1)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
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

    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;
    const rotateX = normalizedY * 4.5;
    const rotateY = -normalizedX * 4.5;

    cardEl.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    cardEl.style.setProperty("--my", `${(y / rect.height) * 100}%`);
    cardEl.style.transition = "transform 0.14s cubic-bezier(0.25, 1, 0.5, 1)";
    cardEl.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`;
  }

  function handleCardMouseLeave(cardEl: HTMLElement) {
    cardEl.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    cardEl.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    cardEl.style.setProperty("--mx", "50%");
    cardEl.style.setProperty("--my", "50%");
  }

  const team = [
    {
      name: "Swarnendu Ghosh",
      role: "Founder & Lead Engineer",
      pfp: "https://github.com/swarnenduG07.png?size=256",
      bio: "Systems architect with a passion for building tools that developers love. Specializes in Go, Rust, and high-performance systems.",
      github: "https://github.com/swarnenduG07",
      twitter: "https://x.com/swarnenduG07",
      gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    },
    {
      name: "Rana Dolui",
      role: "Co-Founder & Engineer",
      pfp: "https://github.com/Rana718.png?size=256",
      bio: "Full-stack engineer focused on creating seamless user experiences and scalable backend systems.",
      github: "https://github.com/Rana718",
      twitter: "https://x.com/jack718r",
      gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
    },
  ];
</script>

<svelte:head>
  <title>About Lumos Labs — Innovation Studio | Software Development Team</title>
  <meta
    name="description"
    content="Meet the Lumos Labs team. We are software engineers passionate about building cutting-edge open-source tools and custom solutions."
  />
  <link rel="canonical" href="https://lumoslab.tech/about" />
</svelte:head>

<svelte:window />

<!-- Hero Section -->
<header class="about-hero" class:hero-visible={mounted}>
  <ThreeBackground {mouseX} {mouseY} />
  <div class="hero-bg">
    <div class="grid-pattern"></div>
    <div class="hero-glow"></div>
    <div class="hero-glow hero-glow-2"></div>
  </div>

  <div class="hero-content container">
    <span class="hero-badge"><span class="badge-dot"></span> About Lumos Labs</span>
    <h1 class="hero-title">
      <span class="hero-line"><span class="hero-line-inner">Engineers Building</span></span>
      <span class="hero-line"><span class="hero-line-inner hero-accent">Useful Software</span></span>
    </h1>
    <p class="hero-subtitle">
      We are a small systems-focused studio creating open-source tools and production software with speed, clarity, and craftsmanship.
    </p>
  </div>
</header>

<!-- Team Section -->
<section
  id="team"
  class="section section-alt"
  data-animate
  class:section-visible={isVisible("team")}
>
  <div class="container">
    <div class="section-header">
      <span class="section-tag">01</span>
      <h2 class="section-title">The Engineers</h2>
      <p class="section-subtitle">
        The minds behind Lumos Labs, building the next generation of developer
        tooling.
      </p>
    </div>

    <div class="team-grid">
      {#each team as member, i}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          class="team-card"
        >
          <div class="team-card-inner">
            <div class="team-avatar-wrapper">
              <div class="team-avatar">
                {#if member.pfp}
                  <img src={member.pfp} alt={member.name} loading="lazy" />
                {:else}
                  {member.name.charAt(0)}
                {/if}
              </div>
            </div>
            <h3 class="team-name">{member.name}</h3>
            <p class="team-role">{member.role}</p>
            <p class="team-bio">{member.bio}</p>
            <div class="team-links">
              <a href={member.github} target="_blank" rel="noopener noreferrer"
                ><span class="social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.86-2.78.61-3.37-1.2-3.37-1.2-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.05A9.32 9.32 0 0 1 12 6.86c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.48.1 2.74.64.72 1.03 1.64 1.03 2.76 0 3.95-2.33 4.82-4.56 5.07.36.32.69.94.69 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.28 10.28 0 0 0 22 12.24C22 6.58 17.52 2 12 2z" />
                  </svg>
                </span>
                <span>GitHub</span></a
              >
              <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                ><span class="social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.27l-4.9-6.37L6.45 22H3.34l7.25-8.3L1 2h6.42l4.42 5.84L18.9 2zm-1.1 18h1.73L6.48 3.9H4.62L17.8 20z" />
                  </svg>
                </span>
                <span>Twitter</span></a
              >
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <img
          src="/lumios-logo.png"
          alt="Lumos Labs"
          class="logo-mark"
          style="width: 24px; height: 24px; border-radius: 50%;"
        />
        <span class="logo-text">Lumos</span>
      </div>
      <p class="footer-copy">
        © 2026 Lumos. Engineering the future, one commit at a time.
      </p>
    </div>
  </div>
</footer>

<style>
  :root {
    --white: #ffffff;
    --gray-50: #fafafa;
    --gray-100: #f4f4f5;
    --gray-200: #e4e4e7;
    --gray-300: #d4d4d8;
    --gray-400: #a1a1aa;
    --gray-500: #71717a;
    --gray-600: #52525b;
    --gray-700: #3f3f46;
    --gray-800: #27272a;
    --gray-900: #18181b;
    --black: #09090b;
    --radius-lg: 24px;
    --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 24px 48px rgba(0, 0, 0, 0.08);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .about-hero {
    min-height: 78vh;
    padding: 160px 32px 100px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
    background-size: 80px 80px;
    opacity: 0.28;
  }

  .hero-glow {
    position: absolute;
    top: 12%;
    left: 50%;
    transform: translateX(-50%);
    width: min(760px, 70vw);
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(20, 20, 20, 0.08) 0%, transparent 68%);
    filter: blur(8px);
    animation: glowPulse 7s ease-in-out infinite;
  }

  .hero-glow-2 {
    top: auto;
    bottom: -12%;
    left: 18%;
    width: min(500px, 50vw);
    background: radial-gradient(circle, rgba(140, 140, 140, 0.12) 0%, transparent 70%);
    animation-delay: 0.8s;
  }

  @keyframes glowPulse {
    0%, 100% {
      opacity: 0.5;
      transform: translateX(-50%) scale(1);
    }
    50% {
      opacity: 1;
      transform: translateX(-50%) scale(1.12);
    }
  }

  .hero-content {
    position: relative;
    z-index: 3;
    text-align: center;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border: 1px solid var(--gray-200);
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--gray-600);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 28px;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(10px);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s var(--ease-out-quart) 0.1s;
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
    animation: pulseDot 2s infinite;
  }

  @keyframes pulseDot {
    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
    70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
  }

  .hero-title {
    font-family: "Space Grotesk", sans-serif;
    font-size: clamp(3rem, 7.5vw, 6rem);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.04em;
    color: var(--black);
    margin-bottom: 24px;
  }

  .hero-line {
    display: block;
    overflow: hidden;
    padding-bottom: 4px;
  }

  .hero-line-inner {
    display: inline-block;
    transform: translateY(100%);
    opacity: 0;
    transition: transform 1s var(--ease-out-quart), opacity 0.8s var(--ease-out-quart);
  }

  .hero-accent {
    background: linear-gradient(135deg, #111 0%, #555 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: clamp(1rem, 1.8vw, 1.15rem);
    line-height: 1.7;
    color: var(--gray-500);
    max-width: 760px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s var(--ease-out-quart) 0.5s;
  }

  .hero-visible .hero-badge {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-visible .hero-line:nth-child(1) .hero-line-inner {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.18s;
  }

  .hero-visible .hero-line:nth-child(2) .hero-line-inner {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.32s;
  }

  .hero-visible .hero-subtitle {
    opacity: 1;
    transform: translateY(0);
  }

  .section {
    padding: 120px 32px;
    position: relative;
    z-index: 2;
  }

  .section-alt {
    background: rgba(250, 250, 250, 0.45);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid rgba(255, 255, 255, 0.6);
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  }

  .section-header {
    margin-bottom: 72px;
    max-width: 700px;
  }

  .section-tag {
    display: inline-block;
    font-family: "Space Grotesk", monospace;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--gray-400);
    margin-bottom: 20px;
    letter-spacing: 0.1em;
  }

  .section-title {
    font-family: "Space Grotesk", sans-serif;
    font-size: clamp(2.5rem, 4.5vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    color: var(--black);
    margin-bottom: 20px;
    line-height: 1.1;
  }

  .section-subtitle {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--gray-500);
    max-width: 640px;
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s var(--ease-out-quart), transform 0.8s var(--ease-out-quart);
  }

  .section-visible .team-grid {
    opacity: 1;
    transform: translateY(0);
  }

  .team-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.75s var(--ease-out-quart), transform 0.75s var(--ease-out-quart);
    transform-style: preserve-3d;
    will-change: transform;
  }

  .section-visible .team-card {
    opacity: 1;
    transform: translateY(0);
  }

  .team-card-inner {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.04);
    border-radius: var(--radius-lg);
    padding: 40px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    transition: all 0.4s var(--ease-out-quart);
    transform-style: preserve-3d;
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.02),
      inset 0 0 0 1px rgba(255, 255, 255, 0.8);
    position: relative;
    overflow: hidden;
  }

  .team-card-inner::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        220px 220px at var(--mx, 50%) var(--my, 50%),
        rgba(255, 255, 255, 0.45),
        rgba(255, 255, 255, 0.08) 38%,
        transparent 70%
      );
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
    z-index: 1;
  }

  .team-card-inner > * {
    position: relative;
    z-index: 3;
  }

  .team-card:hover .team-card-inner {
    border-color: rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.9);
    box-shadow:
      0 40px 80px -20px rgba(0, 0, 0, 0.08),
      inset 0 0 0 1px rgba(255, 255, 255, 1);
    transform: translateZ(6px);
  }

  .team-card:hover .team-card-inner::after {
    opacity: 1;
  }

  .team-avatar-wrapper {
    margin-bottom: 24px;
    transform: translateZ(40px);
  }

  .team-avatar {
    width: 104px;
    height: 104px;
    border-radius: 50%;
    background: var(--gray-900);
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.35rem;
    font-weight: 700;
    font-family: "Space Grotesk", sans-serif;
    box-shadow: var(--shadow-md);
    overflow: hidden;
    border: 3px solid rgba(255, 255, 255, 0.9);
  }

  .team-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .team-name {
    font-family: "Space Grotesk", sans-serif;
    font-size: 1.55rem;
    font-weight: 700;
    color: var(--black);
    margin-bottom: 12px;
    letter-spacing: -0.02em;
    transform: translateZ(50px);
  }

  .team-role {
    font-family: "Space Grotesk", monospace;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--gray-600);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid var(--gray-200);
    border-radius: 999px;
    padding: 7px 12px;
    display: inline-flex;
    align-items: center;
    transform: translateZ(30px);
  }

  .team-bio {
    font-size: 0.98rem;
    line-height: 1.72;
    color: var(--gray-700);
    margin-bottom: 30px;
    max-width: 60ch;
    transform: translateZ(20px);
  }

  .team-links {
    display: flex;
    gap: 10px;
    margin-top: auto;
    width: 100%;
    transform: translateZ(40px);
  }

  .team-links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex: 1;
    padding: 11px 14px;
    border-radius: 999px;
    border: 1px solid var(--gray-200);
    background: rgba(255, 255, 255, 0.9);
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--gray-900);
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: all 0.25s var(--ease-out-quart);
  }

  .team-links a:hover {
    color: var(--black);
    border-color: var(--gray-400);
    background: var(--white);
    transform: translateY(-2px);
  }

  .social-icon {
    width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    flex-shrink: 0;
  }

  .social-icon svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .footer {
    padding: 48px 32px;
    border-top: 1px solid var(--gray-200);
    background: var(--white);
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
    gap: 12px;
  }

  .logo-text {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--black);
  }

  .footer-copy {
    font-size: 0.9rem;
    color: var(--gray-500);
  }

  @media (max-width: 1024px) {
    .team-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .about-hero {
      min-height: auto;
      padding: 120px 24px 64px;
    }

    .hero-title {
      font-size: clamp(2.5rem, 10vw, 3.5rem);
    }

    .section {
      padding: 80px 24px;
    }

    .team-card-inner {
      padding: 38px 24px;
    }

    .footer-inner {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }
  }
</style>
