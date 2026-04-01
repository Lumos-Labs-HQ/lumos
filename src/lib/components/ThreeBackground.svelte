<script lang="ts">
  import { onMount } from "svelte";
  import * as THREE from "three";

  let canvas: HTMLCanvasElement;
  let { mouseX = 0, mouseY = 0 } = $props<{
    mouseX?: number;
    mouseY?: number;
  }>();

  onMount(() => {
    const scene = new THREE.Scene();
    const pageBg = new THREE.Color(
      getComputedStyle(document.body).backgroundColor || "#ffffff",
    );
    scene.fog = new THREE.Fog(pageBg, 70, 160);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 50;
    camera.position.y = 10;
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance

    // Group for easy parallax manipulation
    const group = new THREE.Group();
    scene.add(group);

    // Wavy Wireframe Plane
    const geometry = new THREE.PlaneGeometry(260, 260, 80, 80);

    // Use a material that looks premium and tech-oriented
    const material = new THREE.MeshBasicMaterial({
      color: "#888888",
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2; // Flat on the floor
    plane.position.y = -10;
    group.add(plane);

    // Particles floating around
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);
    const speedsArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 120; // x
      posArray[i * 3 + 1] = Math.random() * 40 - 15; // y
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 120; // z
      speedsArray[i] = 0.2 + Math.random() * 0.5;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: "#33bb99", // subtle accent color matching the dot
      transparent: true,
      opacity: 0.5,
    });
    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    group.add(particlesMesh);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Animate Plane Waves
      const positions = plane.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        // Create an undulating wave effect
        const z =
          Math.sin(x * 0.08 + elapsedTime * 0.8) * 2 +
          Math.cos(y * 0.08 + elapsedTime * 0.8) * 2;
        positions.setZ(i, z);
      }
      plane.geometry.attributes.position.needsUpdate = true;

      // Animate Particles
      const pPositions = particlesGeometry.attributes.position;
      for (let i = 0; i < particlesCount; i++) {
        let py = pPositions.getY(i);
        py += speedsArray[i] * 0.05;
        if (py > 25) py = -15; // Reset to bottom
        pPositions.setY(i, py);
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Mouse parallax interaction
      const targetX = mouseX * 5;
      const targetY = mouseY * 5;

      group.position.x += (targetX - group.position.x) * 0.05;
      group.position.y += (-targetY - group.position.y) * 0.05;
      group.rotation.y = mouseX * 0.1;
      group.rotation.x = mouseY * 0.1;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  });
</script>

<canvas bind:this={canvas} class="webgl-canvas"></canvas>

<style>
  .webgl-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none; /* Let clicks pass through to UI */
    z-index: 0; /* Behind content */
    /* Fade out the scene on all edges for a soft, clean boundary */
    -webkit-mask-image: radial-gradient(
      ellipse 115% 90% at 50% 50%,
      rgba(0, 0, 0, 1) 52%,
      rgba(0, 0, 0, 0.82) 68%,
      rgba(0, 0, 0, 0.45) 82%,
      rgba(0, 0, 0, 0) 100%
    );
    mask-image: radial-gradient(
      ellipse 115% 90% at 50% 50%,
      rgba(0, 0, 0, 1) 52%,
      rgba(0, 0, 0, 0.82) 68%,
      rgba(0, 0, 0, 0.45) 82%,
      rgba(0, 0, 0, 0) 100%
    );
  }
</style>
