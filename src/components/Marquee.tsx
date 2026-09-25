import React from 'react';

const DEFAULT_ITEMS = [
  '50+ Brands Built',
  '3x Average Client Growth',
  '100% Client Focused',
  'SaaS',
  'Healthtech',
  'Fitness & Wellness',
  'Infrastructure',
];

/** Horizontally auto-scrolling stat/industry strip. Pauses on hover, and
 * sits still (no motion) for prefers-reduced-motion via the CSS variant. */
export function Marquee({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  const loop = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-[#0A1428]/5 bg-white py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="flex w-max items-center gap-10 animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-10 shrink-0">
            <span className="text-sm font-bold uppercase tracking-widest text-[#0A1428]/40 whitespace-nowrap">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#036FDE]/40 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
