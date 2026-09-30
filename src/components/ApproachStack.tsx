'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motionPrefs';

type ApproachItem = {
  title: string;
  desc: string;
  icon: (size: number, delay: number, reduceMotion: boolean) => React.ReactNode;
  image: string;
};

// Tuned so a typical wheel/trackpad pass moves through one card transition
// at a comfortable pace.
const PROGRESS_PER_PIXEL = 1 / 650;
const LINE_HEIGHT_PX = 16; // for the rare DOM_DELTA_LINE wheel mode
const TOUCH_PROGRESS_PER_PIXEL = 1 / 320;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ApproachStack({ items }: { items: ApproachItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maxProgress = items.length - 1;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const applyProgress = (p: number) => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i === 0) return; // base card never moves
        const reveal = clamp(p - (i - 1), 0, 1);
        el.style.transform = `translateY(${(1 - reveal) * 100}%)`;
      });
    };

    if (prefersReducedMotion()) {
      applyProgress(maxProgress);
      return;
    }

    let progress = 0;
    let locked = false;
    applyProgress(0);

    // A small buffer (rather than exactly 0) means engagement gets picked
    // up a beat earlier, before a fast wheel/trackpad gesture has had a
    // chance to carry the page much further past the edge.
    const BOUNDARY_BUFFER = 80;
    const isAtTopBoundary = () => section.getBoundingClientRect().top <= BOUNDARY_BUFFER;
    const isAtBottomBoundary = () => section.getBoundingClientRect().bottom >= window.innerHeight - BOUNDARY_BUFFER;

    const setBodyLocked = (value: boolean) => {
      if (value) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };

    // Hard-lock scrolling itself (not just wheel/touch) right where the
    // page already is — this is what makes each card genuinely hold in
    // place once it covers the last, instead of the page continuing to
    // scroll past it. Deliberately does NOT snap/reposition the scroll:
    // boundary detection can only fire after a little scroll has already
    // happened, and correcting that with scrollTo() is exactly what caused
    // the visible jump-then-snap glitch — locking in place, wherever that
    // is, keeps the transition smooth instead.
    const engage = () => {
      setBodyLocked(true);
      locked = true;
    };

    const release = () => {
      locked = false;
      setBodyLocked(false);
    };

    const applyDelta = (dt: number, direction: number) => {
      progress = clamp(progress + dt, 0, maxProgress);
      applyProgress(progress);
      if (direction < 0 && progress <= 0) release();
      else if (direction > 0 && progress >= maxProgress) release();
    };

    const wheelDelta = (e: WheelEvent) => {
      const px = e.deltaMode === 1 ? e.deltaY * LINE_HEIGHT_PX : e.deltaY;
      return px * PROGRESS_PER_PIXEL;
    };

    const onWheel = (e: WheelEvent) => {
      if (!locked) {
        if (e.deltaY > 0 && isAtTopBoundary() && progress < maxProgress) engage();
        else if (e.deltaY < 0 && isAtBottomBoundary() && progress > 0) engage();
        else return;
      }
      e.preventDefault();
      applyDelta(wheelDelta(e), e.deltaY);
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const deltaY = touchY - y;
      if (!locked) {
        if (deltaY > 0 && isAtTopBoundary() && progress < maxProgress) engage();
        else if (deltaY < 0 && isAtBottomBoundary() && progress > 0) engage();
        else { touchY = y; return; }
      }
      touchY = y;
      e.preventDefault();
      applyDelta(deltaY * TOUCH_PROGRESS_PER_PIXEL, deltaY);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!locked) return;
      const keys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', ' ', 'Home', 'End'];
      if (keys.includes(e.key)) e.preventDefault();
    };

    // Backup boundary detector — catches re-entry from any scroll source
    // (momentum, keyboard, scrollbar drag) a wheel/touch check might miss.
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const movingDown = y > lastScrollY;
      const movingUp = y < lastScrollY;
      lastScrollY = y;
      if (locked) return;
      if (movingDown && isAtTopBoundary() && progress < maxProgress) engage();
      else if (movingUp && isAtBottomBoundary() && progress > 0) engage();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll);
      setBodyLocked(false);
    };
  }, [maxProgress]);

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center px-6 py-16">
      <div className="relative w-full max-w-4xl h-[520px] md:h-[380px]">
        {items.map((item, i) => (
          <div
            key={item.title}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute inset-0"
            style={{ zIndex: i + 1, willChange: 'transform' }}
          >
            <div
              style={{ boxShadow: '0 30px 70px -20px rgba(10,20,40,0.55)' }}
              className="bg-[#0A1428] rounded-[2rem] overflow-hidden flex flex-col md:flex-row h-full"
            >
              <div className="relative h-48 md:h-full md:w-[42%] shrink-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0A1428] via-[#0A1428]/50 to-transparent" />
                <div className="absolute bottom-6 left-6 md:hidden">
                  <div className="w-14 h-14 rounded-2xl bg-[#036FDE] flex items-center justify-center text-white shadow-[0_8px_30px_rgba(3,111,222,0.4)]">
                    {item.icon(24, i * 0.1, false)}
                  </div>
                </div>
              </div>

              <div className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <div className="hidden md:flex w-14 h-14 rounded-2xl bg-[#036FDE] items-center justify-center text-white shadow-[0_8px_30px_rgba(3,111,222,0.4)] mb-6">
                  {item.icon(24, i * 0.1, false)}
                </div>
                <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-white/70 leading-relaxed font-medium text-lg max-w-md">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
