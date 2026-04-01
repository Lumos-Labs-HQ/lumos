<script lang="ts">
  import { onMount } from "svelte";
  import CanvasText from "$lib/components/CanvasText.svelte";
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";

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

  $effect(() => {
    showBackToTop = scrollY > 500;
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

    // Increased rotation intensity for dramatic 3D
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    cardEl.style.transition = "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)";
    cardEl.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  function handleCardMouseLeave(cardEl: HTMLElement) {
    cardEl.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    cardEl.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }

  const projects = [
    {
      title: "Flash",
      description:
        "A powerful, database-agnostic ORM built in Go that provides Prisma-like functionality with multi-database support and type-safe code generation.",
      tags: ["Go", "ORM", "PostgreSQL", "MySQL"],
      status: "Active",
      link: "https://github.com/Lumos-Labs-HQ/flash",
    },
    {
      title: "AtomicDocs",
      description:
        "Lightweight, auto-generated API documentation for Express.js, Hono, and Go. Built with fasthttp for extreme performance.",
      tags: ["Go", "API Docs", "FastHTTP"],
      status: "Active",
      link: "https://github.com/Lumos-Labs-HQ/atomicdocs",
    },
    {
      title: "wtop",
      description:
        "htop for Windows — a powerful system monitoring tool bringing Unix-style process monitoring to Windows.",
      tags: ["Go", "System Tools", "Windows"],
      status: "Active",
      link: "https://github.com/Lumos-Labs-HQ/wtop",
    },
    {
      title: "pgnx",
      description:
        "Fastest PostgreSQL driver for the NodeJS ecosystem, built with C++ for maximum performance.",
      tags: ["C++", "PostgreSQL", "Node.js"],
      status: "Active",
      link: "https://github.com/Lumos-Labs-HQ/pgnx",
    },
    {
      title: "BestAuth",
      description:
        "Modern authentication system built from scratch — secure, fast, and extensible.",
      tags: ["Authentication", "Security", "OAuth2"],
      status: "In Development",
      link: "https://github.com/Lumos-Labs-HQ/bestauth",
    },
    {
      title: "Flash Studio",
      description:
        "Visual database management and schema designer for Flash ORM.",
      tags: ["Dart", "Database", "GUI"],
      status: "In Development",
      link: "https://github.com/Lumos-Labs-HQ/flash-studio",
    },
    {
      title: "Windows Session Manager",
      description:
        "Realtime Amazon Q session tracker for WSL, built with Rust for high performance.",
      tags: ["Rust", "WSL", "TCP"],
      status: "Active",
      link: "https://github.com/Lumos-Labs-HQ/windows-session-manager",
    },
    {
      title: "VPM",
      description: "Package manager and tooling built with modern C++.",
      tags: ["C++", "Package Manager", "DevTools"],
      status: "In Development",
      link: "https://github.com/Lumos-Labs-HQ/VPM",
    },
  ];

  const techStack = {
    foundational: {
      title: "Foundational",
      subtitle: "Systems & Languages",
      techs: [
        { name: "Go", icon: "devicon-go-original-wordmark colored" },
        { name: "Rust", icon: "devicon-rust-original" },
        { name: "TypeScript", icon: "devicon-typescript-plain colored" },
        { name: "C++", icon: "devicon-cplusplus-plain colored" },
        { name: "Python", icon: "devicon-python-plain" },
        { name: "C", icon: "devicon-c-plain colored" },
        { name: "Zig", icon: "devicon-zig-original" },
      ],
    },
    core: {
      title: "Core",
      subtitle: "Backend & Frameworks",
      techs: [
        { name: "Fiber", icon: "devicon-fiber-plain colored" },
        { name: "FastAPI", icon: "devicon-fastapi-plain colored" },
        { name: "Express", icon: "devicon-express-original" },
        { name: "Bun", icon: "devicon-bun-plain" },
        { name: "Deno", icon: "devicon-denojs-original colored" },
        { name: "Kafka", icon: "devicon-apachekafka-original" },
        { name: "RabbitMQ", icon: "devicon-rabbitmq-original colored" },
      ],
    },
    interface: {
      title: "Interface",
      subtitle: "Frontend & UI",
      techs: [
        { name: "Svelte", icon: "devicon-svelte-plain colored" },
        { name: "React", icon: "devicon-react-original colored" },
        { name: "Next.js", icon: "devicon-nextjs-plain" },
        { name: "Flutter", icon: "devicon-flutter-plain colored" },
        { name: "Tailwind", icon: "devicon-tailwindcss-original colored" },
        { name: "Three.js", icon: "devicon-threejs-original" },
        { name: "Vite", icon: "devicon-vitejs-plain" },
        { name: "Astro", icon: "devicon-astro-plain colored" },
      ],
    },
    persistence: {
      title: "Persistence",
      subtitle: "Database & Storage",
      techs: [
        { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
        { name: "Redis", icon: "devicon-redis-plain colored" },
        { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
        { name: "Neo4j", icon: "devicon-neo4j-plain colored" },
        { name: "Supabase", icon: "devicon-supabase-plain colored" },
        { name: "Prisma", icon: "devicon-prisma-original" },
      ],
    },
    infrastructure: {
      title: "Scale",
      subtitle: "Cloud & DevOps",
      techs: [
        { name: "Docker", icon: "devicon-docker-plain colored" },
        { name: "K8s", icon: "devicon-kubernetes-plain colored" },
        { name: "Terraform", icon: "devicon-terraform-plain colored" },
        {
          name: "AWS",
          icon: "devicon-amazonwebservices-plain-wordmark colored",
        },
        { name: "Vercel", icon: "devicon-vercel-original" },
        { name: "Cloudflare", icon: "devicon-cloudflare-plain colored" },
      ],
    },
    intelligence: {
      title: "Intelligence",
      subtitle: "AI & Data",
      techs: [
        { name: "TensorFlow", icon: "devicon-tensorflow-original colored" },
        { name: "PyTorch", icon: "devicon-pytorch-original colored" },
        { name: "Pandas", icon: "devicon-pandas-plain colored" },
        { name: "Scikit-learn", icon: "devicon-scikitlearn-plain colored" },
        { name: "HuggingFace", icon: "devicon-huggingface-plain" },
      ],
    },
  };

  const team = [
    {
      name: "Swarnendu Ghosh",
      role: "Founder & Lead Engineer",
      bio: "Systems architect with a passion for building tools that developers love.",
    },
  ];

  const services = [
    {
      id: "01",
      title: "Full-Stack Systems",
      description:
        "Architecting end-to-end ecosystems using modern primitives. From high-performance Go backends to reactive Svelte/React interfaces.",
      tags: ["Svelte", "Go", "Rust", "TypeScript"],
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
      accent: "#3b82f6",
    },
    {
      id: "02",
      title: "AI & Intelligence",
      description:
        "Deep integration of large language models, computer vision, and custom neural architectures into production workflows.",
      tags: ["PyTorch", "OpenAI", "LangChain", "CUDA"],
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12L2.1 12.1"></path><path d="M12 12l9.9-0.1"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
      accent: "#10b981",
    },
    {
      id: "03",
      title: "Low-Level Engineering",
      description:
        "Performance-critical systems programming, custom memory management, and specialized infrastructure tooling.",
      tags: ["C++", "Rust", "WebAssembly", "Zig"],
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>`,
      accent: "#f59e0b",
    },
    {
      id: "04",
      title: "Cloud Orchestration",
      description:
        "Designing resilient, auto-scaling infrastructure using Kubernetes, Terraform, and advanced CI/CD patterns.",
      tags: ["K8s", "Docker", "AWS", "Terraform"],
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a5.5 5.5 0 0 0 2.5-10.5 8.5 8.5 0 1 0-14.5 4.5"></path><path d="M12 13v8"></path><path d="M8 17l4 4 4-4"></path></svg>`,
      accent: "#6366f1",
    },
    {
      id: "05",
      title: "Native Mobility",
      description:
        "High-fidelity mobile experiences built with performance-first frameworks like Flutter and Swift/Kotlin native.",
      tags: ["Flutter", "Swift", "Kotlin", "Dart"],
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
      accent: "#ec4899",
    },
    {
      id: "06",
      title: "Security & Auth",
      description:
        "End-to-end security audits and implementation of zero-trust authentication protocols from the ground up.",
      tags: ["OAuth2", "JWT", "Encryption", "OIDC"],
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
      accent: "#ef4444",
    },
  ];

  // mobileMenuOpen moved to layout
</script>

<svelte:head>
  <!-- Additional SEO for Homepage -->
  <meta
    name="keywords"
    content="Lumos, Lumos Labs, software development, innovation studio, Flash ORM, AtomicDocs, wtop, pgnx, BestAuth, Go development, open source projects, custom software, developer tools, TypeScript, system programming, freelance engineering"
  />
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
      <img
        src="/lumios-logo.png"
        alt="Lumos Labs"
        class="logo-mark"
        style="width: 48px; height: 48px; border-radius: 50%;"
      />
    </div>
  </div>
{/if}

<!-- Hero Section -->
<header class="hero" class:hero-visible={mounted} style="--scroll: {scrollY}">
  <!-- Parallax 3D Elements Background -->
  <ThreeBackground {mouseX} {mouseY} />

  <div class="hero-bg">
    <div class="grid-pattern"></div>
    <div class="hero-glow"></div>
    <div class="hero-glow hero-glow-2"></div>
  </div>

  <div class="hero-content">
    <div class="hero-badge">
      <span class="badge-dot"></span>Innovation Studio
    </div>
    <h1 class="hero-title">
      <span class="hero-line"
        ><span class="hero-line-inner">We build what</span></span
      >
      <span class="hero-line"
        ><span class="hero-line-inner hero-accent">doesn't exist yet.</span
        ></span
      >
    </h1>
    <p class="hero-subtitle">
      Lumos is an innovation studio building custom authentication systems,
      language migration engines, and cutting-edge open-source tools. Our team
      engineers the libraries and products that push boundaries. We also deliver
      world-class freelance software engineering for clients worldwide.
    </p>
    <div class="hero-actions">
      <a href="#projects" class="btn btn-primary">Explore Our Work</a>
      <a href="#services" class="btn btn-secondary">Hire Us</a>
    </div>

    <div class="hero-stats">
      <div class="stat" style="animation-delay: 0.3s">
        <span class="stat-value">50+</span>
        <span class="stat-label">Projects Shipped</span>
      </div>
      <div class="stat-divider" style="animation-delay: 0.4s"></div>
      <div class="stat" style="animation-delay: 0.5s">
        <span class="stat-value">Global</span>
        <span class="stat-label">Client Base</span>
      </div>
      <div class="stat-divider" style="animation-delay: 0.6s"></div>
      <div class="stat" style="animation-delay: 0.7s">
        <span class="stat-value">∞</span>
        <span class="stat-label">Curiosity</span>
      </div>
    </div>
  </div>
</header>

<!-- Projects Section -->
<section
  id="projects"
  class="section"
  data-animate
  class:section-visible={isVisible("projects")}
>
  <div class="container">
    <div class="section-header">
      <span class="section-tag">01</span>
      <h2 class="section-title">Open Source Projects</h2>
      <p class="section-subtitle">
        Building tools that solve real problems. Each project is crafted with
        precision and purpose.
      </p>
    </div>

    <div class="projects-grid">
      {#each projects as project, i}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          class="project-card"
          style="transition-delay: {i * 50}ms"
        >
          <div class="project-card-header">
            <span class="project-number">{String(i + 1).padStart(2, "0")}</span>
            <span class="project-status">{project.status}</span>
          </div>
          <h3 class="project-title">{project.title}</h3>
          <p class="project-description">{project.description}</p>
          <div class="project-tags">
            {#each project.tags as tag}
              <span class="project-tag">{tag}</span>
            {/each}
          </div>
          <div class="project-arrow">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </a>
      {/each}
    </div>

    <div class="projects-footer">
      <a
        href="https://github.com/orgs/Lumos-Labs-HQ/repositories"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-outline"
      >
        View All on GitHub
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </a>
    </div>
  </div>
</section>

<!-- Freelancing / Services Section -->
<section
  id="services"
  class="section section-alt"
  data-animate
  class:section-visible={isVisible("services")}
>
  <div class="container">
    <div class="section-header">
      <span class="section-tag">02</span>
      <h2 class="section-title">Software Development Services</h2>
      <p class="section-subtitle">
        Lumos works with international and Indian clients on projects of all
        scales. From startups to enterprises — precision engineering, delivered
        on time.
      </p>
    </div>

    <div class="services-grid">
      {#each services as service, i}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          class="service-item"
          style="transition-delay: {i * 100}ms; --accent: {service.accent}"
          onmousemove={(e) => handleCardMouseMove(e, e.currentTarget)}
          onmouseleave={(e) => handleCardMouseLeave(e.currentTarget)}
        >
          <div class="service-item-inner">
            <div class="service-item-bg"></div>
            <div class="service-item-content">
              <div class="service-top">
                <span class="service-id">{service.id}</span>
                <div class="service-icon-wrapper">
                  {@html service.icon}
                </div>
              </div>
              <h3 class="service-item-title">{service.title}</h3>
              <p class="service-item-description">{service.description}</p>
              <div class="service-item-tags">
                {#each service.tags as tag}
                  <span class="service-tag-pill">{tag}</span>
                {/each}
              </div>
            </div>
            <div class="service-item-footer">
              <span class="service-status">
                <span class="status-indicator"></span> Available
              </span>
              <span class="service-action"
                >Enquire <span class="arrow">→</span></span
              >
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="services-cta">
      <div class="cta-card">
        <div class="cta-content">
          <h3>Have a project in mind?</h3>
          <p>
            Whether it's a weekend prototype or a six-month enterprise build —
            we'd love to hear about it.
          </p>
        </div>
        <a href="#contact" class="btn btn-primary cta-btn"
          >Start a Conversation</a
        >
      </div>
    </div>
  </div>
</section>

<!-- Tech Stack Section -->
<section
  id="tech-stack"
  class="section ecosystem-section"
  data-animate
  class:section-visible={isVisible("tech-stack")}
>
  <div class="container">
    <div class="section-header">
      <span class="section-tag">03</span>
      <h2 class="section-title">The Ecosystem</h2>
      <p class="section-subtitle">
        Our production toolkit, organized by capability. Consistent primitives
        from systems-level performance to interface polish.
      </p>
    </div>

    <div class="ecosystem-grid">
      {#each Object.entries(techStack) as [key, category], i}
        <article class="ecosystem-card" style="--card-delay: {i * 0.08}s">
          <header class="ecosystem-card-head">
            <div>
              <p class="ecosystem-kicker">{category.title}</p>
              <h3>{category.subtitle}</h3>
            </div>
            <span class="ecosystem-count">{category.techs.length}</span>
          </header>

          <div class="ecosystem-tech-list">
            {#each category.techs as tech}
              <div class="ecosystem-tech-pill">
                <div class="ecosystem-tech-icon">
                  <i class={tech.icon}></i>
                </div>
                <span>{tech.name}</span>
              </div>
            {/each}
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- Contact Section -->
<section
  id="contact"
  class="section section-alt"
  data-animate
  class:section-visible={isVisible("contact")}
>
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
          <form
            class="contact-form"
            action="https://formsubmit.co/swarnendughosh05@gmail.com"
            method="POST"
          >
            <input
              type="hidden"
              name="_subject"
              value="New message from Lumos website"
            />
            <input type="hidden" name="_cc" value="ranadolui718@gmail.com" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input
              type="hidden"
              name="_next"
              value="https://lumoslab.tech/#contact"
            />
            <input
              type="text"
              name="_honey"
              style="display:none"
              tabindex="-1"
              autocomplete="off"
            />
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                required
              />
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell us about your project..."
                required
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>

          <div class="newsletter-box">
            <div class="newsletter-icon">✉</div>
            <div class="newsletter-content">
              <h3>Stay Updated</h3>
              <p>Get notified about new projects and updates.</p>
              <form
                class="newsletter-form"
                onsubmit={(e) => e.preventDefault()}
              >
                <input type="email" placeholder="your@email.com" required />
                <button type="submit" class="btn btn-secondary"
                  >Subscribe</button
                >
              </form>
            </div>
          </div>
        </div>

        <div class="contact-info-wrapper">
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-label">Email</span>
              <a href="mailto:founders@lumoslab.tech" class="contact-value"
                >founders@lumoslab.tech</a
              >
            </div>
            <div class="contact-item">
              <span class="contact-label">Based in</span>
              <span class="contact-value">India — Working Globally</span>
            </div>
            <div class="contact-item">
              <span class="contact-label">Availability</span>
              <span class="contact-value contact-available">
                <span class="pulse-dot"></span> Open for projects
              </span>
            </div>
          </div>

          <div class="contact-links">
            <a
              href="https://github.com/Lumos-Labs-HQ"
              class="contact-social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GitHub</span>
              <span class="arrow-icon">↗</span>
            </a>
            <a
              href="https://discord.gg/5ScEAsMT"
              class="contact-social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Discord</span>
              <span class="arrow-icon">↗</span>
            </a>
          </div>

          <a
            href="https://cal.com/swarnendug7/15min"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline"
            style="margin-top: 32px; width: 100%;"
          >
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
        <img
          src="/lumios-logo.png"
          alt="Lumos Labs"
          class="logo-mark"
          style="width: 24px; height: 24px; border-radius: 50%; object-fit: contain;"
        />
        <span class="logo-text">Lumos</span>
      </div>
      <p class="footer-copy">
        © 2026 Lumos. Engineering the future, one commit at a time.
      </p>
    </div>
  </div>
</footer>

<!-- Back to Top Button -->
<button
  class="back-to-top"
  class:visible={showBackToTop}
  onclick={scrollToTop}
  aria-label="Back to top"
>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
</button>

<style>
  /* ===================== VARIABLES ===================== */
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
    --radius: 16px;
    --radius-sm: 8px;

    --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
    --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
    --transition: 0.2s var(--ease-out-quart);
    --transition-slow: 0.6s var(--ease-out-quart);

    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 24px 48px rgba(0, 0, 0, 0.08);
  }

  /* ===================== LOADING SCREEN ===================== */
  .loading-screen {
    position: fixed;
    inset: 0;
    background: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeOut 0.6s var(--ease-out-quart) 0.2s forwards;
  }

  .loading-spinner {
    animation: scalePulse 1.5s var(--ease-out-quart) infinite alternate;
  }

  @keyframes scalePulse {
    0% {
      transform: scale(0.9);
      opacity: 0.7;
    }
    100% {
      transform: scale(1.1);
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }
  }

  /* ===================== HERO ===================== */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 140px 32px 80px;
    background: var(--white);
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  /* 3D Floating Elements */
  .hero-3d-elements {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
    perspective: 1200px;
  }

  .shape-wrapper {
    position: absolute;
    transition: transform 0.1s linear;
    transform-style: preserve-3d;
  }

  /* Parallax modifiers bound to mouse variables */
  .w-1 {
    top: 15%;
    left: 10%;
    transform: translate3d(
      calc(var(--mx) * -30px),
      calc(var(--my) * -30px),
      40px
    );
  }
  .w-2 {
    top: 65%;
    left: 5%;
    transform: translate3d(
      calc(var(--mx) * 50px),
      calc(var(--my) * 50px),
      80px
    );
  }
  .w-3 {
    top: 20%;
    right: 10%;
    transform: translate3d(
      calc(var(--mx) * 20px),
      calc(var(--my) * -40px),
      20px
    );
  }
  .w-4 {
    top: 75%;
    right: 15%;
    transform: translate3d(
      calc(var(--mx) * -60px),
      calc(var(--my) * 30px),
      100px
    );
  }
  .w-5 {
    top: 40%;
    left: 50%;
    transform: translate3d(
      calc(var(--mx) * 10px),
      calc(var(--my) * 10px),
      -40px
    );
  }

  .shape {
    background: var(--white);
    border: 1px solid rgba(0, 0, 0, 0.03);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 1);
    animation: floatShape 15s ease-in-out infinite alternate;
    transform-style: preserve-3d;
  }

  .s-1 {
    width: 140px;
    height: 140px;
    border-radius: 40px;
    rotate: 15deg;
    animation-duration: 18s;
  }
  .s-2 {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: transparent;
    border: 2px solid var(--gray-100);
    box-shadow: none;
    backdrop-filter: blur(4px);
    animation-duration: 25s;
    animation-delay: -5s;
  }
  .s-3 {
    width: 160px;
    height: 220px;
    border-radius: 50px;
    rotate: -20deg;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.95),
      rgba(244, 244, 245, 0.4)
    );
    backdrop-filter: blur(12px);
    animation-duration: 22s;
    animation-delay: -10s;
  }
  .s-4 {
    width: 80px;
    height: 80px;
    border-radius: 24px;
    rotate: 45deg;
    animation-duration: 15s;
    animation-delay: -2s;
  }
  .s-5 {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.9),
      rgba(240, 240, 240, 0.1)
    );
    border: none;
    box-shadow: none;
    filter: blur(20px);
    animation-duration: 30s;
    animation-delay: -15s;
  }

  @keyframes floatShape {
    0% {
      transform: translateY(0) rotateX(0) rotateY(0);
    }
    100% {
      transform: translateY(-40px) rotateX(10deg) rotateY(15deg);
    }
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(var(--gray-100) 1px, transparent 1px),
      linear-gradient(90deg, var(--gray-100) 1px, transparent 1px);
    background-size: 64px 64px;
    opacity: 0.6;
    mask-image: radial-gradient(
      ellipse 80% 80% at 50% 50%,
      black 10%,
      transparent 80%
    );
    -webkit-mask-image: radial-gradient(
      ellipse 80% 80% at 50% 50%,
      black 10%,
      transparent 80%
    );
    transform: translateY(calc(var(--scroll) * 0.4px));
    will-change: transform;
  }

  .hero-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-30%);
    width: 800px;
    height: 800px;
    background: radial-gradient(
      circle,
      rgba(161, 196, 253, 0.15) 0%,
      transparent 60%
    );
    border-radius: 50%;
    filter: blur(60px);
    animation: floatGlow 8s ease-in-out infinite alternate;
  }

  .hero-glow-2 {
    top: 20%;
    left: 70%;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(250, 208, 196, 0.12) 0%,
      transparent 60%
    );
    animation: floatGlow2 10s ease-in-out infinite alternate-reverse;
  }

  @keyframes floatGlow {
    0% {
      transform: translateX(-50%) translateY(-30%) scale(1);
    }
    100% {
      transform: translateX(-48%) translateY(-25%) scale(1.05);
    }
  }

  @keyframes floatGlow2 {
    0% {
      transform: translateX(-30%) translateY(0) scale(1);
    }
    100% {
      transform: translateX(-40%) translateY(-10%) scale(1.1);
    }
  }

  .hero-content {
    position: relative;
    max-width: 840px;
    text-align: center;
    z-index: 2;
  }

  .hero-content::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    height: 150%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.8) 25%,
      transparent 70%
    );
    z-index: -1;
    pointer-events: none;
    filter: blur(20px);
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
    margin-bottom: 32px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s var(--ease-out-quart) 0.1s;
  }

  .badge-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
    animation: pulseDot 2s infinite;
  }

  @keyframes pulseDot {
    0% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
    }
  }

  .hero-title {
    font-family: "Space Grotesk", sans-serif;
    font-size: clamp(3rem, 7.5vw, 6.5rem);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.04em;
    color: var(--black);
    margin-bottom: 28px;
  }

  .hero-line {
    display: block;
    overflow: hidden;
    padding-bottom: 4px; /* Prevent descender clipping */
  }

  .hero-line-inner {
    display: inline-block;
    transform: translateY(100%);
    opacity: 0;
    transition:
      transform 1s var(--ease-out-quart),
      opacity 0.8s var(--ease-out-quart);
  }

  .hero-accent {
    background: linear-gradient(135deg, #111 0%, #555 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: clamp(1rem, 2vw, 1.15rem);
    line-height: 1.7;
    color: var(--gray-500);
    max-width: 640px;
    margin: 0 auto 48px;
    font-weight: 400;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s var(--ease-out-quart) 0.5s;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 72px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s var(--ease-out-quart) 0.6s;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 32px;
    border-radius: 100px;
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.25s var(--ease-out-quart);
    cursor: pointer;
    border: none;
    position: relative;
    overflow: hidden;
  }

  .btn::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0;
    transition: opacity 0.25s;
  }

  .btn:hover::after {
    opacity: 1;
  }

  .btn:active {
    transform: scale(0.97);
  }

  .btn-primary {
    background: var(--gray-900);
    color: var(--white);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .btn-primary:hover {
    background: var(--black);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .btn-secondary {
    background: var(--white);
    color: var(--gray-900);
    border: 1px solid var(--gray-200);
    box-shadow: var(--shadow-sm);
  }

  .btn-secondary:hover {
    border-color: var(--gray-300);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .btn-outline {
    background: transparent;
    color: var(--gray-900);
    border: 1px solid var(--gray-300);
  }

  .btn-outline:hover {
    border-color: var(--gray-900);
    background: var(--gray-50);
  }

  .hero-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    opacity: 0;
    transform: translateY(20px);
  }

  .stat-value {
    font-family: "Space Grotesk", sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--black);
    line-height: 1;
  }

  .stat-label {
    font-size: 0.8rem;
    color: var(--gray-500);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 500;
  }

  .stat-divider {
    width: 1px;
    height: 40px;
    background: linear-gradient(
      to bottom,
      transparent,
      var(--gray-200),
      transparent
    );
    opacity: 0;
  }

  /* Hero Animations Trigger */
  .hero-visible .hero-badge {
    opacity: 1;
    transform: translateY(0);
  }
  .hero-visible .hero-line:nth-child(1) .hero-line-inner {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.2s;
  }
  .hero-visible .hero-line:nth-child(2) .hero-line-inner {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.35s;
  }
  .hero-visible .hero-subtitle {
    opacity: 1;
    transform: translateY(0);
  }
  .hero-visible .hero-actions {
    opacity: 1;
    transform: translateY(0);
  }
  .hero-visible .stat {
    animation: fadeUpSpring 0.8s var(--ease-out-quart) forwards;
  }
  .hero-visible .stat-divider {
    animation: fadeIn 0.8s ease forwards;
  }

  @keyframes fadeUpSpring {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  /* ===================== SECTIONS ===================== */
  .section {
    padding: 140px 32px;
    position: relative;
    z-index: 2; /* Keep above 3D background */
  }

  .section-alt {
    background: rgba(250, 250, 250, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }

  .section-compact {
    padding: 100px 32px 60px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
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

  .github-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--gray-900);
    text-decoration: none;
    transition: color 0.2s;
  }

  .arrow-icon {
    transition: transform 0.3s var(--ease-out-quart);
    display: inline-block;
  }

  .github-link:hover {
    color: #111;
  }

  .github-link:hover .arrow-icon {
    transform: translateX(4px);
  }

  /* Global Scroll Reveal */
  .section .section-header,
  .projects-grid,
  .services-grid,
  .contact-content,
  .marquee-wrapper,
  .ecosystem-grid {
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.8s var(--ease-out-quart),
      transform 0.8s var(--ease-out-quart);
  }

  .section.section-visible .section-header,
  .section.section-visible .projects-grid,
  .section.section-visible .services-grid,
  .section.section-visible .contact-content,
  .section.section-visible .marquee-wrapper,
  .section.section-visible .ecosystem-grid {
    opacity: 1;
    transform: translateY(0);
  }

  /* ===================== PROJECTS ===================== */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 24px;
  }

  .project-card {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 32px;
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius);
    text-decoration: none;
    transition: all 0.3s var(--ease-out-quart);
    opacity: 0;
    transform: translateY(20px);
    overflow: hidden;
  }

  .section.section-visible .project-card {
    opacity: 1;
    transform: translateY(0);
  }

  .project-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--gray-900), var(--gray-600));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s var(--ease-out-quart);
  }

  .project-card:hover::before {
    transform: scaleX(1);
  }

  .project-card:hover {
    border-color: var(--gray-300);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }

  .project-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .project-number {
    font-family: "Space Grotesk", monospace;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--gray-400);
    transition: color 0.3s;
  }

  .project-card:hover .project-number {
    color: var(--gray-900);
  }

  .project-status {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--gray-500);
    background: var(--gray-100);
    padding: 4px 10px;
    border-radius: 6px;
  }

  .project-title {
    font-family: "Space Grotesk", sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--black);
    margin-bottom: 12px;
    letter-spacing: -0.02em;
  }

  .project-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--gray-600);
    margin-bottom: 24px;
    flex: 1;
  }

  .project-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .project-tag {
    font-family: "Space Grotesk", monospace;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--gray-600);
    background: var(--gray-50);
    padding: 6px 12px;
    border-radius: 6px;
    border: 1px solid var(--gray-200);
    transition: all 0.2s;
  }

  .project-card:hover .project-tag {
    background: var(--gray-100);
    border-color: var(--gray-300);
  }

  .project-arrow {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: var(--gray-400);
    transition: all 0.3s var(--ease-out-quart);
  }

  .project-card:hover .project-arrow {
    color: var(--gray-900);
    transform: translate(4px, -4px);
  }

  .projects-footer {
    margin-top: 64px;
    display: flex;
    justify-content: center;
  }

  .btn-outline svg {
    margin-left: 8px;
    transition: transform 0.3s var(--ease-out-quart);
  }

  .btn-outline:hover svg {
    transform: translate(2px, -2px);
  }

  /* ===================== SERVICES (Grid Layout) ===================== */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 80px;
  }

  .service-item {
    position: relative;
    height: 440px;
    cursor: default;
    transform-style: preserve-3d;
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.8s var(--ease-out-quart),
      transform 0.8s var(--ease-out-quart);
  }

  .section.section-visible .service-item {
    opacity: 1;
    transform: translateY(0);
  }

  .service-item-inner {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.04);
    border-radius: var(--radius-lg);
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.5s var(--ease-out-quart);
    overflow: hidden;
    transform-style: preserve-3d;
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.02),
      inset 0 0 0 1px rgba(255, 255, 255, 0.8);
  }

  .service-item-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at top right,
      var(--accent),
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.5s var(--ease-out-quart);
    z-index: 0;
    filter: blur(40px);
  }

  .service-item:hover .service-item-bg {
    opacity: 0.1;
  }

  .service-item:hover .service-item-inner {
    border-color: rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.9);
    box-shadow:
      0 40px 80px -20px rgba(0, 0, 0, 0.08),
      inset 0 0 0 1px rgba(255, 255, 255, 1);
    transform: translateZ(20px);
  }

  .service-item-content {
    position: relative;
    z-index: 1;
    transform-style: preserve-3d;
  }

  .service-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    transform: translateZ(30px);
  }

  .service-id {
    font-family: "Space Grotesk", monospace;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--gray-300);
    letter-spacing: 0.1em;
  }

  .service-icon-wrapper {
    width: 48px;
    height: 48px;
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gray-50);
    border-radius: 12px;
    border: 1px solid var(--gray-100);
    transition: all 0.4s var(--ease-out-quart);
  }

  .service-item:hover .service-icon-wrapper {
    transform: scale(1.1) rotate(10deg);
    background: var(--white);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  }

  .service-icon-wrapper :global(svg) {
    width: 24px;
    height: 24px;
  }

  .service-item-title {
    font-family: "Space Grotesk", sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--black);
    margin-bottom: 16px;
    letter-spacing: -0.02em;
    transform: translateZ(40px);
  }

  .service-item-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--gray-500);
    margin-bottom: 24px;
    transform: translateZ(25px);
  }

  .service-item-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    transform: translateZ(20px);
  }

  .service-tag-pill {
    font-family: "Space Grotesk", monospace;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 4px 10px;
    background: var(--gray-50);
    color: var(--gray-600);
    border-radius: 6px;
    border: 1px solid var(--gray-100);
    text-transform: uppercase;
  }

  .service-item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--gray-100);
    padding-top: 24px;
    margin-top: auto;
    transform: translateZ(15px);
  }

  .service-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--gray-400);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .status-indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
  }

  .service-action {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--gray-900);
    display: flex;
    align-items: center;
    gap: 6px;
    transition: gap 0.2s;
  }

  .service-item:hover .service-action {
    gap: 10px;
  }

  .service-action .arrow {
    transition: transform 0.2s;
  }

  .service-item:hover .service-action .arrow {
    transform: translateX(2px);
  }

  .services-cta {
    max-width: 100%;
  }

  .cta-card {
    background: linear-gradient(135deg, var(--gray-900) 0%, var(--black) 100%);
    border: 1px solid var(--gray-800);
    border-radius: var(--radius-lg);
    padding: 56px 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
  }

  .cta-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981, #3b82f6, #6366f1);
  }

  .cta-content h3 {
    font-family: "Space Grotesk", sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 12px;
    letter-spacing: -0.03em;
  }

  .cta-content p {
    font-size: 1.05rem;
    color: var(--gray-400);
    line-height: 1.6;
    max-width: 500px;
  }

  .cta-btn {
    white-space: nowrap;
    flex-shrink: 0;
    padding: 16px 40px;
    font-size: 1.05rem;
    background: var(--white);
    color: var(--black);
    border: none;
  }

  .cta-btn:hover {
    background: var(--gray-200);
  }

  /* ===================== ECOSYSTEM ===================== */
  .ecosystem-section {
    padding-top: 140px;
    padding-bottom: 140px;
  }

  .ecosystem-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }

  .ecosystem-card {
    position: relative;
    padding: 28px;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    transition:
      transform 0.35s var(--ease-out-quart),
      box-shadow 0.35s var(--ease-out-quart),
      border-color 0.35s var(--ease-out-quart);
    opacity: 0;
    transform: translateY(24px);
  }

  .section.section-visible .ecosystem-card {
    animation: ecosystemCardIn 0.65s var(--ease-out-quart) forwards;
    animation-delay: var(--card-delay, 0s);
  }

  @keyframes ecosystemCardIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .ecosystem-card:hover {
    transform: translateY(-6px);
    border-color: var(--gray-200);
    box-shadow: var(--shadow-lg);
  }

  .ecosystem-card-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
  }

  .ecosystem-kicker {
    font-family: "Space Grotesk", monospace;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--gray-500);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    margin-bottom: 10px;
  }

  .ecosystem-card-head h3 {
    font-family: "Space Grotesk", sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--black);
    line-height: 1.2;
  }

  .ecosystem-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 34px;
    height: 34px;
    padding: 0 10px;
    border-radius: 999px;
    background: var(--gray-100);
    border: 1px solid var(--gray-200);
    font-family: "Space Grotesk", monospace;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--gray-600);
  }

  .ecosystem-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .ecosystem-tech-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 999px;
    background: var(--white);
    border: 1px solid var(--gray-200);
    color: var(--gray-700);
    font-weight: 600;
    font-size: 0.9rem;
    line-height: 1;
    transition:
      border-color 0.25s var(--ease-out-quart),
      transform 0.25s var(--ease-out-quart),
      color 0.25s var(--ease-out-quart);
  }

  .ecosystem-tech-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
  }

  .ecosystem-tech-pill:hover {
    border-color: var(--gray-400);
    transform: translateY(-2px);
    color: var(--gray-900);
  }

  /* ===================== CONTACT ===================== */
  .contact-layout {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 80px;
  }

  .contact-form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 48px;
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: var(--shadow-md);
    transition:
      transform 0.5s var(--ease-out-quart),
      box-shadow 0.5s var(--ease-out-quart);
    transform-style: preserve-3d;
    transform: perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0);
  }

  .contact-form:hover {
    transform: perspective(1200px) rotateX(2deg) rotateY(-2deg) translateZ(10px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
  }

  .contact-form > * {
    transform: translateZ(20px);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form-group label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--gray-600);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .form-group input,
  .form-group textarea {
    padding: 16px 20px;
    border: 1px solid var(--gray-200);
    border-radius: 12px;
    font-size: 1rem;
    font-family: inherit;
    color: var(--gray-900);
    background: var(--gray-50);
    transition: all 0.3s var(--ease-out-quart);
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--gray-400);
    background: var(--white);
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.03);
  }

  .form-group textarea {
    resize: vertical;
    min-height: 140px;
  }

  .newsletter-box {
    background: linear-gradient(135deg, var(--gray-900) 0%, var(--black) 100%);
    border: 1px solid var(--gray-800);
    border-radius: var(--radius-lg);
    padding: 36px 40px;
    display: flex;
    align-items: flex-start;
    gap: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: hidden;
  }

  .newsletter-box::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981, #3b82f6, #6366f1);
  }

  .newsletter-icon {
    font-size: 2rem;
    color: var(--gray-400);
    line-height: 1;
    z-index: 1;
  }

  .newsletter-content {
    z-index: 1;
  }

  .newsletter-content h3 {
    font-family: "Space Grotesk", sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--white);
  }

  .newsletter-content p {
    font-size: 0.95rem;
    color: var(--gray-400);
    margin-bottom: 24px;
  }

  .newsletter-form {
    display: flex;
    gap: 12px;
  }

  .newsletter-form input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid var(--gray-700);
    border-radius: 10px;
    font-size: 0.95rem;
    background: rgba(255, 255, 255, 0.05);
    color: var(--white);
    transition: all 0.2s;
  }

  .newsletter-form input:focus {
    outline: none;
    border-color: var(--gray-500);
    background: rgba(255, 255, 255, 0.1);
  }

  .newsletter-form .btn-secondary {
    background: var(--white);
    color: var(--black);
    border: none;
  }

  .newsletter-form .btn-secondary:hover {
    background: var(--gray-200);
  }

  .contact-info-wrapper {
    display: flex;
    flex-direction: column;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-bottom: 48px;
  }

  .contact-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .contact-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--gray-400);
    font-weight: 600;
  }

  .contact-value {
    font-size: 1.15rem;
    color: var(--gray-900);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .contact-value:hover {
    color: var(--gray-500);
  }

  .contact-available {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #10b981;
  }

  .pulse-dot {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 0 rgba(16, 185, 129, 0.4);
    animation: pulseDot 2s infinite;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
  }

  .contact-social {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    border-bottom: 1px solid var(--gray-200);
    text-decoration: none;
    font-size: 1.15rem;
    font-weight: 500;
    color: var(--gray-900);
    transition: all 0.3s var(--ease-out-quart);
  }

  .contact-social:first-child {
    border-top: 1px solid var(--gray-200);
  }

  .contact-social .arrow-icon {
    color: var(--gray-400);
    font-size: 1.2rem;
  }

  .contact-social:hover {
    padding-left: 12px;
    padding-right: 12px;
    background: var(--white);
    border-radius: 8px;
    border-bottom-color: transparent;
    box-shadow: var(--shadow-sm);
    transform: scale(1.02);
  }

  .contact-social:hover .arrow-icon {
    color: var(--gray-900);
    transform: translateX(4px) translateY(-4px);
  }

  /* ===================== FOOTER ===================== */
  .footer {
    padding: 48px 32px;
    border-top: 1px solid var(--gray-200);
    background: var(--white);
  }

  .footer-inner {
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

  /* ===================== BACK TO TOP ===================== */
  .back-to-top {
    position: fixed;
    bottom: 32px;
    right: 32px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--white);
    color: var(--gray-900);
    border: 1px solid var(--gray-200);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-md);
    transition: all 0.4s var(--ease-out-quart);
    z-index: 50;
    opacity: 0;
    transform: translateY(20px) scale(0.9);
    pointer-events: none;
  }

  .back-to-top.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .back-to-top:hover {
    border-color: var(--gray-300);
    transform: translateY(-4px) scale(1.05);
    box-shadow: var(--shadow-lg);
  }

  .back-to-top:active {
    transform: translateY(0) scale(0.95);
  }

  /* ===================== RESPONSIVE ===================== */
  @media (max-width: 1024px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .ecosystem-grid {
      grid-template-columns: 1fr;
    }

    .contact-layout {
      grid-template-columns: 1fr;
      gap: 64px;
    }
  }

  @media (max-width: 768px) {
    .hero {
      padding: 120px 24px 60px;
    }

    .hero-title {
      font-size: clamp(2.5rem, 10vw, 3.5rem);
    }

    .hero-stats {
      flex-direction: column;
      gap: 24px;
    }

    .stat-divider {
      width: 40px;
      height: 1px;
      background: linear-gradient(
        to right,
        transparent,
        var(--gray-200),
        transparent
      );
    }

    .section {
      padding: 80px 24px;
    }

    .section-compact {
      padding: 60px 24px 40px;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }

    .services-grid {
      grid-template-columns: 1fr;
    }

    .ecosystem-card {
      padding: 24px;
    }

    .ecosystem-tech-pill {
      font-size: 0.85rem;
      padding: 9px 12px;
    }

    .service-item {
      height: auto;
      min-height: 400px;
    }

    .cta-card {
      flex-direction: column;
      padding: 40px 32px;
      text-align: center;
    }

    .service-item-inner {
      padding: 32px 24px;
    }

    .contact-form {
      padding: 32px 24px;
    }

    .newsletter-box {
      flex-direction: column;
      padding: 32px 24px;
    }

    .newsletter-form {
      flex-direction: column;
    }

    .footer-inner {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }

    .hero-3d-elements {
      display: none;
    }
  }
</style>
