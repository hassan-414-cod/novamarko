'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { hasFinePointer, prefersReducedMotion } from '../lib/motionPrefs';

/**
 * Wraps a nav Link so it shifts a few px toward the cursor on hover and
 * springs back on leave. No-ops on touch devices / reduced motion — it
 * just renders a plain Link.
 */
export function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [magnetic, setMagnetic] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 18, mass: 0.4 });

  useEffect(() => {
    setMagnetic(hasFinePointer() && !prefersReducedMotion());
  }, []);

  if (!magnetic) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex"
    >
      <Link ref={ref} href={href} className={className} data-cursor-hover>
        {children}
      </Link>
    </motion.span>
  );
}
