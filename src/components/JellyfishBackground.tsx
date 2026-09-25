'use client';

import React from 'react';
import { motion } from 'motion/react';

const blobs = [
  { size: 780, color: '#036FDE', top: '-14%', left: '2%', duration: 28, delay: 0, path: { x: [0, 70, -30, 0], y: [0, -40, 50, 0] } },
  { size: 620, color: '#22D3EE', top: '52%', left: '68%', duration: 34, delay: 2, path: { x: [0, -60, 40, 0], y: [0, 50, -35, 0] } },
  { size: 560, color: '#0057C6', top: '72%', left: '6%', duration: 24, delay: 4, path: { x: [0, 50, -60, 0], y: [0, -45, 30, 0] } },
  { size: 700, color: '#3B82F6', top: '4%', left: '70%', duration: 32, delay: 1, path: { x: [0, -50, 30, 0], y: [0, 40, -50, 0] } },
  { size: 460, color: '#60A5FA', top: '35%', left: '32%', duration: 22, delay: 3, path: { x: [0, 40, -40, 0], y: [0, -30, 40, 0] } },
];

/**
 * Full-viewport animated backdrop: a deep-blue gradient with slow, softly
 * blurred blobs drifting and pulsing like bioluminescent jellyfish. Sits
 * fixed behind the page's card shell so it shows through the inset margins.
 */
export function JellyfishBackground() {
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#040B1E]" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-[#02184D] via-[#013C8C] to-[#020B1E]" />

      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[110px] mix-blend-screen"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: `radial-gradient(circle, ${b.color}99 0%, ${b.color}00 70%)`,
          }}
          animate={prefersReducedMotion ? undefined : { x: b.path.x, y: b.path.y, scale: [1, 1.15, 0.92, 1] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
      />
    </div>
  );
}
