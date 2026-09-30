'use client';

import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motionPrefs';

/**
 * Home-hero-only decorative layer: soft, slowly-morphing gradient blobs in
 * the brand blues, drawn on a blurred <canvas> and additively blended
 * ('lighter') so overlaps brighten into a fluid glow. Purely cosmetic —
 * aria-hidden, pointer-events-none, and frozen on a single frame for
 * prefers-reduced-motion.
 */
const BLOBS = [
  { color: '#036FDE', rx: 0.30, ry: 0.32, freqX: 0.15, freqY: 0.11, phase: 0.0, baseR: 0.30, pulseFreq: 0.22, pulsePhase: 0.0 },
  { color: '#22D3EE', rx: 0.22, ry: 0.26, freqX: 0.10, freqY: 0.17, phase: 1.7, baseR: 0.22, pulseFreq: 0.18, pulsePhase: 1.0 },
  { color: '#0057C6', rx: 0.24, ry: 0.20, freqX: 0.13, freqY: 0.09, phase: 3.4, baseR: 0.27, pulseFreq: 0.25, pulsePhase: 2.0 },
  { color: '#60A5FA', rx: 0.18, ry: 0.24, freqX: 0.09, freqY: 0.14, phase: 5.0, baseR: 0.18, pulseFreq: 0.20, pulsePhase: 3.0 },
];

export function HeroFluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !parent || !ctx) return;

    const reduceMotion = prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let raf = 0;
    let start = performance.now();

    const drawFrame = (time: number) => {
      const t = (time - start) / 1000;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      const cx = width / 2;
      const cy = height / 2;
      const minDim = Math.min(width, height);

      for (const b of BLOBS) {
        const x = cx + Math.sin(t * b.freqX + b.phase) * b.rx * width;
        const y = cy + Math.cos(t * b.freqY + b.phase) * b.ry * height;
        const r = b.baseR * minDim * (1 + 0.15 * Math.sin(t * b.pulseFreq + b.pulsePhase));

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(r, 1));
        gradient.addColorStop(0, `${b.color}4d`);
        gradient.addColorStop(1, `${b.color}00`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(r, 1), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';

      if (!reduceMotion) raf = requestAnimationFrame(drawFrame);
    };

    raf = requestAnimationFrame(drawFrame);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduceMotion) {
        start = performance.now() - 0;
        raf = requestAnimationFrame(drawFrame);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-[1] w-full h-full pointer-events-none"
      style={{ filter: 'blur(60px)' }}
    />
  );
}
