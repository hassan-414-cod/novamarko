'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { hasFinePointer, prefersReducedMotion } from '../lib/motionPrefs';

/**
 * A small cursor-follow dot, desktop/mouse-only. Grows and tints blue when
 * hovering any link, button, or element tagged data-cursor-hover.
 */
export function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    setEnabled(hasFinePointer() && !prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest('a, button, [data-cursor-hover]'));
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove);
    document.documentElement.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        backgroundColor: hovering ? 'rgba(3,111,222,0.35)' : 'rgba(3,111,222,0.85)',
        border: hovering ? '1px solid rgba(3,111,222,0.5)' : 'none',
      }}
      animate={{
        width: hovering ? 40 : 12,
        height: hovering ? 40 : 12,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
    />
  );
}
