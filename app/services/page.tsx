'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { BuildIcon, BrandIcon, ScaleIcon } from '@/components/AnimatedIcons';

const groups = [
  {
    key: 'build',
    Icon: BuildIcon,
    title: 'Build',
    intro: "The foundation everything else gets built on.",
    items: [
      {
        title: 'Brand Identity',
        desc: "Logo systems, color, typography, and visual guidelines built to hold up across every touchpoint. The foundation everything else gets built on.",
      },
      {
        title: 'UI/UX Design',
        desc: "Interfaces designed around how people actually use your product, not just how it looks in a deck. Wireframes through to polished, testable prototypes.",
      },
      {
        title: 'Website Design',
        desc: "Marketing sites and product sites designed to convert, not just impress. Built on a structure that's easy to grow and easy to maintain.",
      },
      {
        title: 'Product Design',
        desc: "End-to-end design for digital products and platforms, from first user flow to final interaction details. Built for real users, not just demo day.",
      },
    ],
  },
  {
    key: 'brand',
    Icon: BrandIcon,
    title: 'Brand',
    intro: "The story and positioning that make people care.",
    items: [
      {
        title: 'Content Creation',
        desc: "Copy, photography direction, and content systems that keep your brand voice consistent across every channel. Built to be reused, not rewritten every month.",
      },
      {
        title: 'Market Positioning',
        desc: "A clear answer to who you're for, what you do differently, and why it matters — the strategic backbone behind every design and campaign decision.",
      },
      {
        title: 'Campaign Strategy',
        desc: "Integrated campaign planning that ties creative, channels, and offers together around a single goal. No more disconnected one-off pushes.",
      },
    ],
  },
  {
    key: 'scale',
    Icon: ScaleIcon,
    title: 'Scale',
    intro: "Growth systems for what's already working.",
    items: [
      {
        title: 'Performance Marketing',
        desc: "Paid and organic growth programs built around targets, not vanity metrics. Continuously optimized against what's actually moving revenue.",
      },
      {
        title: 'SEO',
        desc: "Technical and content SEO that compounds over time, built to bring in demand you're not paying for on every click. Long-term equity, not a quick spike.",
      },
      {
        title: 'Paid Media',
        desc: "Search and social campaigns managed end to end, from targeting and creative testing to budget pacing and reporting you can actually read.",
      },
      {
        title: 'Funnel Building',
        desc: "Landing pages, email sequences, and conversion paths engineered to turn traffic into pipeline. Built and tested, not just launched and left.",
      },
      {
        title: 'IT & Technical Operations',
        desc: "Ongoing technical support, integrations, and infrastructure management so your stack stays reliable while you focus on growth.",
      },
      {
        title: 'Infrastructure Support',
        desc: "Hosting, cloud architecture, and uptime monitoring handled by people who understand both the tech and the business depending on it.",
      },
      {
        title: 'Custom SaaS & Digital Products',
        desc: "Bespoke software and tools built when off-the-shelf doesn't fit — from internal tools to full customer-facing products.",
      },
    ],
  },
];

const faqs = [
  {
    q: 'How does pricing work?',
    a: "Every engagement is scoped around what you actually need — a single service, a bundle across Build, Brand, and Scale, or an ongoing retainer. You'll get a clear proposal before anything starts, no hourly guesswork.",
  },
  {
    q: 'How long does a typical project take?',
    a: 'Brand and website projects typically run 4–8 weeks depending on scope. Marketing and scale engagements are ongoing, with results compounding over monthly optimization cycles.',
  },
  {
    q: 'Do you only work with established brands, or startups too?',
    a: "Both. We work with founders building from scratch and established brands rebuilding for their next stage — the process flexes to where you're starting from.",
  },
  {
    q: 'What actually happens on a strategy call?',
    a: 'No pitch deck. We ask about where your brand, product, and growth stand today, flag the gaps we see, and tell you honestly whether — and how — we can help.',
  },
];

export default function Services() {
  return (
    <div className="w-full pt-32 pb-24 bg-white relative overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[68vh] flex items-end overflow-hidden bg-[#0A1428] mb-20">
        <div className="absolute inset-0">
          <img
            src="/images/services_hero_banner_1790360293807.jpg"
            alt="Three laptops overhead showing UI design, brand guidelines, and marketing growth in progress"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-[#0A1428]/70 to-[#0A1428]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1428]/70 via-transparent to-[#0A1428]/40" />
        </div>
        <div className="max-w-7xl mx-auto px-6 w-full py-16 relative z-10">
          <div className="flex items-center gap-4 text-[11px] font-bold tracking-[0.25em] text-[#4B9FFF] uppercase mb-6">
            <div className="w-8 h-[2px] bg-[#4B9FFF]" />
            Our Services
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white mb-6">
            What We <span className="text-[#4B9FFF]">Do</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl">
            Everything below lives under one of three moves: Build, Brand, or Scale. Pick where you need help most — or let us map all three.
          </p>
        </div>
      </section>

      {/* Build / Brand / Scale menu */}
      <section className="max-w-7xl mx-auto px-6 relative z-10 space-y-20">
        {groups.map((group, gi) => {
          const Icon = group.Icon;
          return (
            <Reveal key={group.key}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#036FDE] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(3,111,222,0.3)] shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0A1428]">{group.title}</h2>
                  <p className="text-[#0A1428]/50 text-sm">{group.intro}</p>
                </div>
                <div className="hidden md:block flex-1 h-px bg-[#0A1428]/10 ml-4" />
                <div className="hidden md:block text-[10px] font-bold tracking-[0.2em] text-[#0A1428]/30 uppercase">0{gi + 1}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {group.items.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#0A1428]/5 bg-white p-6 hover:border-[#036FDE]/20 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="font-bold text-lg text-[#0A1428] mb-2">{item.title}</h3>
                    <p className="text-[#0A1428]/60 leading-relaxed text-[15px]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          );
        })}
      </section>

      <div className="max-w-7xl mx-auto px-6 relative z-10 mt-20 pt-8 border-t border-[#0A1428]/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold tracking-[0.2em] text-[#0A1428]/40 uppercase">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-[#0A1428]/20" />
          Technology × Creativity × Real Growth
        </div>
        <div className="flex items-center gap-3">
          Build • Brand • Scale
          <div className="w-6 h-px bg-[#0A1428]/20" />
        </div>
      </div>

      {/* FAQ */}
      <Reveal className="max-w-3xl mx-auto px-6 relative z-10 mt-28">
        <h2 className="font-display text-3xl font-bold text-[#0A1428] mb-12 text-center">Before You Reach Out</h2>
        <div className="space-y-8">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-[#0A1428]/10 pb-8 last:border-0 last:pb-0">
              <h3 className="text-lg font-bold text-[#0A1428] mb-3">{faq.q}</h3>
              <p className="text-[#0A1428]/60 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal className="max-w-7xl mx-auto px-6 mt-24 md:mt-32">
        <div className="bg-[#0A1428] rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url('/hero-bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: '25% 35%',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1428] via-[#0A1428]/90 to-[#0A1428]/50" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">
              Not sure which service you need?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">Most clients need more than one. Book a strategy call and let's map it out together.</p>
            <Link href="/contact" className="min-h-[44px] inline-flex items-center gap-2 bg-white text-[#036FDE] px-8 py-4 rounded-full text-[15px] font-bold hover:scale-105 transition-transform shadow-2xl" data-cursor-hover>
              Book a Free Consult
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
