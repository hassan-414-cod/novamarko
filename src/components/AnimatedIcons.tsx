'use client';

import React from 'react';
import { motion } from 'motion/react';

interface IconProps {
  size?: number;
  className?: string;
  /** Stagger delay in seconds before this icon starts drawing once it scrolls into view. */
  delay?: number;
  /** Skips the draw-in and renders the finished strokes immediately. */
  reduceMotion?: boolean;
}

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function pathAnim(delay: number, reduceMotion: boolean, extra = 0) {
  if (reduceMotion) {
    return { initial: { pathLength: 1, opacity: 1 }, whileInView: undefined, transition: { duration: 0 } };
  }
  return {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.7, delay: delay + extra, ease: [0.65, 0, 0.35, 1] as const },
  };
}

export function BuildIcon({ size = 24, className = '', delay = 0, reduceMotion = false }: IconProps) {
  const a = pathAnim(delay, reduceMotion);
  const b = pathAnim(delay, reduceMotion, 0.15);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <motion.path {...strokeProps} d="M12 3 L20 7.5 L20 16.5 L12 21 L4 16.5 L4 7.5 Z" {...a} />
      <motion.path {...strokeProps} d="M12 12 L12 21 M12 12 L4 7.5 M12 12 L20 7.5" {...b} />
    </svg>
  );
}

export function BrandIcon({ size = 24, className = '', delay = 0, reduceMotion = false }: IconProps) {
  const a = pathAnim(delay, reduceMotion);
  const b = pathAnim(delay, reduceMotion, 0.15);
  const c = pathAnim(delay, reduceMotion, 0.3);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <motion.path {...strokeProps} d="M12 2 L20 7 L12 12 L4 7 Z" {...a} />
      <motion.path {...strokeProps} d="M4 11 L12 16 L20 11" {...b} />
      <motion.path {...strokeProps} d="M4 15 L12 20 L20 15" {...c} />
    </svg>
  );
}

export function ScaleIcon({ size = 24, className = '', delay = 0, reduceMotion = false }: IconProps) {
  const a = pathAnim(delay, reduceMotion);
  const b = pathAnim(delay, reduceMotion, 0.12);
  const c = pathAnim(delay, reduceMotion, 0.24);
  const d = pathAnim(delay, reduceMotion, 0.36);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <motion.path {...strokeProps} d="M3 21 L21 21" {...a} />
      <motion.path {...strokeProps} d="M7 21 L7 14" {...b} />
      <motion.path {...strokeProps} d="M12 21 L12 9" {...c} />
      <motion.path {...strokeProps} d="M17 21 L17 4" {...d} />
    </svg>
  );
}
