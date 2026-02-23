<script lang="ts">
	import { onMount } from 'svelte';

	let {
		text,
		colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9'],
		animationDuration = 5,
		lineWidth = 1.5,
		lineGap = 10,
		curveIntensity = 60
	}: {
		text: string;
		colors?: string[];
		animationDuration?: number;
		lineWidth?: number;
		lineGap?: number;
		curveIntensity?: number;
	} = $props();

	let canvasEl: HTMLCanvasElement;
	let textEl: HTMLSpanElement;
	let bgEl: HTMLSpanElement;
	let animationId = 0;
	let bgColor = $state('#fafafa');

	onMount(() => {
		if (bgEl) {
			bgColor = window.getComputedStyle(bgEl).backgroundColor;
		}

		const observer = new MutationObserver(() => {
			if (bgEl) bgColor = window.getComputedStyle(bgEl).backgroundColor;
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

		return () => {
			observer.disconnect();
			cancelAnimationFrame(animationId);
		};
	});

	$effect(() => {
		if (!canvasEl || !textEl || colors.length === 0) return;

		const ctx = canvasEl.getContext('2d', { alpha: false });
		if (!ctx) return;

		const rect = textEl.getBoundingClientRect();
		const w = Math.ceil(rect.width) || 400;
		const h = Math.ceil(rect.height) || 200;
		const dpr = window.devicePixelRatio || 1;

		canvasEl.width = w * dpr;
		canvasEl.height = h * dpr;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

		const numLines = Math.floor(h / lineGap) + 10;
		const start = performance.now();
		const bg = bgColor;
		const c = colors;

		function animate(now: number) {
			const phase = ((now - start) / 1000 / animationDuration) * Math.PI * 2;
			ctx!.fillStyle = bg;
			ctx!.fillRect(0, 0, w, h);

			for (let i = 0; i < numLines; i++) {
				const y = i * lineGap;
				ctx!.strokeStyle = c[i % c.length];
				ctx!.lineWidth = lineWidth;
				ctx!.beginPath();
				ctx!.moveTo(0, y);
				ctx!.bezierCurveTo(
					w * 0.33, y + Math.sin(phase) * curveIntensity,
					w * 0.66, y + Math.sin(phase + 0.5) * curveIntensity * 0.6,
					w, y
				);
				ctx!.stroke();
			}

			textEl.style.backgroundImage = `url(${canvasEl.toDataURL()})`;
			textEl.style.backgroundSize = `${w}px ${h}px`;
			animationId = requestAnimationFrame(animate);
		}

		animationId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationId);
	});
</script>

<span class="ct-wrap">
	<span bind:this={bgEl} class="ct-bg bg-blue-600" aria-hidden="true"></span>
	<canvas bind:this={canvasEl} class="ct-hide" aria-hidden="true"></canvas>
	<span bind:this={textEl} class="ct-text">{text}</span>
</span>

<style>
	.ct-wrap { position: relative; display: inline; }
	.ct-hide { pointer-events: none; position: absolute; height: 0; width: 0; opacity: 0; }
	.ct-bg { pointer-events: none; position: absolute; height: 0; width: 0; opacity: 0; }
	.ct-text {
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		display: inline;
	}
</style>
