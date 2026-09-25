'use client';

import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { MagneticLink } from './MagneticLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { prefersReducedMotion } from '../lib/motionPrefs';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Portfolio' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduceMotion = prefersReducedMotion();

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div className="fixed top-4 sm:top-4 md:top-5 lg:top-7 xl:top-8 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl">
        <nav className="bg-white/25 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 rounded-full px-4 py-2.5 md:px-6 md:py-3 flex items-center justify-between shadow-[0_8px_40px_rgba(2,20,60,0.35)]">
          <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#036FDE] rounded-sm flex-shrink-0 flex items-center">
            <motion.div
              initial={reduceMotion ? undefined : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 14, delay: 0.15 }}
            >
              <Logo variant="stacked" className="h-8 md:h-9" />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-1 lg:gap-2 font-medium text-[14px] text-[#0A1428]/80">
            {NAV_LINKS.map((link) => {
              const isActive = link.to === '/' ? pathname === '/' : pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  className={`px-4 py-2.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#036FDE] ${
                    isActive ? 'bg-white/60 backdrop-blur-sm text-[#036FDE] font-semibold' : 'hover:text-[#0A1428] hover:bg-white/20'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <MagneticLink
            href="/contact"
            className="group/cta hidden md:flex bg-[#036FDE] text-white pl-5 pr-4 py-2.5 rounded-full text-[14px] font-medium hover:bg-[#0057C6] transition-colors focus:outline-none items-center gap-1.5 flex-shrink-0 shadow-[0_4px_16px_rgba(3,111,222,0.5)]"
          >
            Get in Touch
            <span className="inline-block w-0 opacity-0 overflow-hidden group-hover/cta:w-4 group-hover/cta:opacity-100 transition-all duration-300 ease-out">
              <ArrowRight size={16} />
            </span>
          </MagneticLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu-drawer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white/30 border border-white/40 text-[#0A1428] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#036FDE] flex-shrink-0"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Slide-in mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="md:hidden fixed inset-0 z-40 bg-[#040B1E]/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              id="mobile-menu-drawer"
              role="dialog"
              aria-modal="true"
              className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-[82%] max-w-sm bg-white/90 backdrop-blur-2xl backdrop-saturate-150 border-l border-white/40 shadow-[-20px_0_60px_rgba(2,20,60,0.35)] p-6 pt-8 flex flex-col"
              initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={reduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between mb-10">
                <Logo variant="stacked" className="h-8" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-[#F6F9FC] text-[#0A1428] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#036FDE]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = link.to === '/' ? pathname === '/' : pathname.startsWith(link.to);
                  return (
                    <Link
                      key={link.to}
                      href={link.to}
                      className={`min-h-[44px] flex items-center px-5 py-3.5 rounded-2xl text-[16px] font-medium transition-colors focus:outline-none ${
                        isActive ? 'bg-[#EEF5FF] text-[#036FDE] font-semibold' : 'text-[#0A1428]/80 hover:bg-[#F6F9FC]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <Link
                href="/contact"
                className="mt-auto min-h-[48px] bg-[#036FDE] text-white px-5 py-3.5 rounded-full text-[15px] font-semibold hover:bg-[#0057C6] transition-colors focus:outline-none flex items-center justify-center gap-2"
              >
                Get in Touch
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
