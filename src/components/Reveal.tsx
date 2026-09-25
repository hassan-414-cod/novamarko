'use client';

import React from 'react';
import { motion } from 'motion/react';
import { prefersReducedMotion } from '../lib/motionPrefs';

/**
 * Section-level "fade + rise" reveal, triggered once as the whole block
 * enters the viewport — not per child. Distance/duration are kept small
 * (24px, 500ms) so it reads as refined rather than bouncy.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
