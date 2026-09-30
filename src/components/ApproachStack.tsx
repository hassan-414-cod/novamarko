'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motionPrefs';

type ApproachItem = {
  title: string;
  desc: string;
  icon: (size: number, delay: number, reduceMotion: boolean) => React.ReactNode;
  image: string;
};

// Time constant for easing the displayed state toward the scroll position.
// Time-based (not per-frame) so it catches up at the same speed on a slow
// or busy device as on a fast one. Smooths chunky wheel steps and flicks.
const SMOOTH_MS = 90;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

// The section is N viewports tall and its stage is sticky, so the stage
// stays pinned on screen while the user scrolls through it — the page
// looks locked, but native scrolling never stops, so there's nothing to
// overshoot or snap back. Scroll position drives which card is on top.
export function ApproachStack({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: ApproachItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maxProgress = items.length - 1;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const apply = (p: number) => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        // Waits a full viewport below the stage (clipped), then slides up.
        const reveal = i === 0 ? 1 : clamp(p - (i - 1), 0, 1);
        // Once covered by the next card, recede slightly for depth.
        const covered = clamp(p - i, 0, 1);
        const y = (1 - reveal) * 100;
        const scale = 1 - covered * 0.06;
        el.style.transform = `translate3d(0, ${y}vh, 0) scale(${scale})`;
      });
    };

    if (prefersReducedMotion()) {
      apply(maxProgress);
      return;
    }

    const readTarget = () => {
      const rect = section.getBoundingClientRect();
      const range = section.offsetHeight - window.innerHeight;
      if (range <= 0) return 0;
      return (clamp(-rect.top, 0, range) / range) * maxProgress;
    };

    let target = readTarget();
    let current = target;
    let raf = 0;
    let last = 0;
    apply(current);

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 200) : 16;
      last = now;
      const diff = target - current;
      if (Math.abs(diff) < 0.0005) {
        current = target;
        apply(current);
        raf = 0;
        last = 0;
        return;
      }
      current += diff * (1 - Math.exp(-dt / SMOOTH_MS));
      apply(current);
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readTarget();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [maxProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F7FAFC]"
      style={{ height: `${items.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center px-6 pt-24 pb-8">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#0A1428] mb-3">{title}</h2>
          <p className="text-base md:text-lg text-[#0A1428]/70 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Clipped at the card box's bottom edge (with room for the shadow
            on the other sides), so an incoming card is never visible
            waiting below the current one — it only appears as it slides
            over it. */}
        <div className="relative w-full max-w-4xl h-[440px] md:h-[380px] [clip-path:inset(-100px_-100px_0_-100px)]">
          {items.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute inset-0 origin-top"
              style={{ zIndex: i + 1, willChange: 'transform' }}
            >
              <div
                style={{ boxShadow: '0 30px 70px -20px rgba(10,20,40,0.55)' }}
                className="bg-[#0A1428] rounded-[2rem] overflow-hidden flex flex-col md:flex-row h-full"
              >
                <div className="relative h-40 md:h-full md:w-[42%] shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0A1428] via-[#0A1428]/50 to-transparent" />
                  <div className="absolute bottom-5 left-6 md:hidden">
                    <div className="w-12 h-12 rounded-2xl bg-[#036FDE] flex items-center justify-center text-white shadow-[0_8px_30px_rgba(3,111,222,0.4)]">
                      {item.icon(22, i * 0.1, false)}
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-center">
                  <div className="hidden md:flex w-14 h-14 rounded-2xl bg-[#036FDE] items-center justify-center text-white shadow-[0_8px_30px_rgba(3,111,222,0.4)] mb-6">
                    {item.icon(24, i * 0.1, false)}
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-4xl text-white mb-3 md:mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed font-medium md:text-lg max-w-md">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
