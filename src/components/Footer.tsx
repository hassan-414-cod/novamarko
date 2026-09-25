import React from 'react';
import { Logo } from './Logo';
import Link from 'next/link';
import { Instagram, Facebook, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A1428] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <div className="mb-8">
           <Link href="/" className="flex flex-col items-center opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm">
            <Logo variant="left" className="items-center" />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium text-white/70 mb-8">
          <Link href="/about" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm">About</Link>
          <Link href="/services" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm">Services</Link>
          <Link href="/work" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm">Work</Link>
          <Link href="/blog" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm">Blog</Link>
          <Link href="/contact" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm">Contact</Link>
        </div>

        <div className="flex items-center gap-3 mb-10">
          <a
            href="https://www.instagram.com/novamarkox/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nova Marko on Instagram"
            data-cursor-hover
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#036FDE] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.facebook.com/novamarkox"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nova Marko on Facebook"
            data-cursor-hover
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#036FDE] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Facebook size={18} />
          </a>
          <a
            href="mailto:novamarko72@gmail.com"
            aria-label="Email Nova Marko"
            data-cursor-hover
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#036FDE] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Mail size={18} />
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-white/40 mb-12">
          <Link href="/privacy" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm">Terms of Service</Link>
        </div>

        <div className="text-white/40 text-sm">
          © {new Date().getFullYear()} Novamarko. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
