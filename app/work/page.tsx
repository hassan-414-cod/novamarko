'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Triangle, Plus, Hexagon, Sparkle, Anchor, Ship } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { prefersReducedMotion } from '@/lib/motionPrefs';

const cases = [
  {
    client: "Apex Fitness",
    industry: "Fitness & Wellness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
    headline: "Stronger People Happier Lives",
    subtitle: "A modern fitness brand built for real progress.",
    tags: ["Branding", "UI/UX", "Growth"],
    desc: "A complete brand and digital experience for a fast-growing fitness franchise, including brand strategy, website, and local marketing systems.",
    stats: [
      { value: "+245%", label: "Lead Growth" },
      { value: "3.2x", label: "Gym Sign-ups" },
      { value: "+180%", label: "Local Reach" },
    ],
    mark: <Triangle size={16} strokeWidth={2.5} />,
    markLabel: "APEX FITNESS",
    featured: true,
  },
  {
    client: "Lumina Health",
    industry: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
    headline: "Healthcare that puts people first.",
    subtitle: "Digital solutions for a healthier tomorrow.",
    tags: ["SaaS", "UI/UX", "Automation"],
    desc: "A custom SaaS platform to streamline patient engagement and operations, helping care teams deliver better outcomes with less friction.",
    stats: [
      { value: "+60%", label: "User Adoption" },
      { value: "-40%", label: "Manual Work" },
      { value: "+3.5x", label: "Patient Engagement" },
    ],
    mark: <Plus size={16} strokeWidth={3} />,
    markLabel: "Lumina Health",
  },
  {
    client: "Echo Systems",
    industry: "Logistics",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
    headline: "Smarter Operations Brighter Growth",
    subtitle: "Logistics infrastructure for what's next.",
    tags: ["ERP", "Automation", "System Design"],
    desc: "An end-to-end operations platform to unify fleets and warehouse teams, streamline dispatch workflows, and support rapid expansion across multiple hubs.",
    stats: [
      { value: "+70%", label: "Operational Efficiency" },
      { value: "-50%", label: "Process Time" },
      { value: "3x", label: "Location Scale" },
    ],
    mark: <Hexagon size={16} strokeWidth={2.5} />,
    markLabel: "ECHO SYSTEMS",
  },
  {
    client: "Aster & Co.",
    industry: "Fashion",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1000",
    headline: "A Brand People Actually Want to Wear",
    subtitle: "From capsule label to a brand with a waitlist.",
    tags: ["Branding", "E-Commerce", "Content"],
    desc: "A complete rebrand and storefront build for an independent fashion label, including a new visual identity and a content engine that turned seasonal drops into pre-launch waitlists.",
    stats: [
      { value: "+190%", label: "Online Revenue" },
      { value: "4.1x", label: "Repeat Purchases" },
      { value: "+65%", label: "Email List Growth" },
    ],
    mark: <Sparkle size={16} strokeWidth={2.5} />,
    markLabel: "ASTER & CO.",
  },
  {
    client: "Marisol Collective",
    industry: "Hospitality",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
    headline: "Fully Booked, Three Months Out",
    subtitle: "Turning a boutique hotel group into a destination.",
    tags: ["Brand Strategy", "Web Design", "Local SEO"],
    desc: "A refreshed brand and booking-first website for a boutique hospitality group, paired with local SEO across three properties to convert more direct bookings.",
    stats: [
      { value: "+85%", label: "Direct Bookings" },
      { value: "-30%", label: "OTA Commission Spend" },
      { value: "4.8★", label: "Average Rating" },
    ],
    mark: <Anchor size={16} strokeWidth={2.5} />,
    markLabel: "MARISOL COLLECTIVE",
  },
  {
    client: "Meridian Trading Co.",
    industry: "B2B Trading",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&q=80&w=1000",
    headline: "A B2B Buyer Journey That Finally Makes Sense",
    subtitle: "Modernizing how a trading company wins new accounts.",
    tags: ["Web Platform", "Lead Gen", "CRM"],
    desc: "A B2B-focused platform and lead pipeline for a regional trading company, with a self-serve catalog and quote workflows that gave sales qualified leads instead of cold inbound.",
    stats: [
      { value: "+120%", label: "Qualified Leads" },
      { value: "-45%", label: "Sales Cycle Time" },
      { value: "3x", label: "RFQ Volume" },
    ],
    mark: <Ship size={16} strokeWidth={2.5} />,
    markLabel: "MERIDIAN TRADING",
  },
];

const DOT_COLORS = ['bg-[#036FDE]', 'bg-[#22D3EE]', 'bg-[#60A5FA]'];

function TagDots({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
      {tags.map((tag, i) => (
        <span key={tag} className="inline-flex items-center gap-2 text-sm font-medium text-[#0A1428]/70">
          <span className={`w-1.5 h-1.5 rounded-full ${DOT_COLORS[i % DOT_COLORS.length]}`} />
          {tag}
        </span>
      ))}
    </div>
  );
}

function PortfolioCard({ c, i, featured }: { c: typeof cases[number]; i: number; featured?: boolean }) {
  const reduceMotion = prefersReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -4,
        boxShadow: '0 22px 50px -12px rgba(3,111,222,0.35)',
        transition: { type: 'spring', stiffness: 320, damping: 22 },
      }}
      style={{ boxShadow: '0 6px 20px -8px rgba(10,20,40,0.12)' }}
      data-cursor-hover
      className={`group flex flex-col bg-white rounded-3xl border border-[#0A1428]/5 overflow-hidden ${featured ? 'md:col-span-2 lg:col-span-3' : ''}`}
    >
      <div className={`relative overflow-hidden ${featured ? 'h-72 lg:h-96' : 'h-56'} shrink-0`}>
        <img
          src={c.image}
          alt={c.client}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-[#0A1428]/50 to-[#0A1428]/10" />
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div>
            <h3 className={`font-display font-bold text-white leading-tight mb-2 ${featured ? 'text-3xl' : 'text-2xl'}`}>{c.headline}</h3>
            <p className="text-white/70 text-sm">{c.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 self-end text-white/90 font-display font-bold tracking-wide text-sm">
            {c.mark}
            {c.markLabel}
          </div>
        </div>
      </div>

      <div className={`p-6 flex-1 flex flex-col ${featured ? 'md:p-8' : ''}`}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <h4 className="font-display text-2xl font-bold text-[#0A1428]">{c.client}</h4>
          <div className="text-right shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A1428]/40 block mb-0.5">Industry</span>
            <span className="text-sm font-semibold text-[#0A1428]/70">{c.industry}</span>
          </div>
        </div>

        {featured ? (
          <div className="md:grid md:grid-cols-[1.3fr_1fr] md:gap-10">
            <div>
              <TagDots tags={c.tags} />
              <p className="text-[#0A1428]/60 leading-relaxed">{c.desc}</p>
            </div>
            <div className="flex flex-col justify-end">
              <div className="grid grid-cols-3 gap-3 border-t border-[#0A1428]/5 pt-5 mt-6 mb-6 md:mt-0">
                {c.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display font-black text-xl text-[#0A1428]">{stat.value}</div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-[#0A1428]/40 leading-tight mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 text-[#036FDE] font-semibold text-sm group-hover:gap-3 transition-all min-h-[44px]">
                View Case Study
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <TagDots tags={c.tags} />
            <p className="text-[#0A1428]/60 leading-relaxed mb-6">{c.desc}</p>
            <div className="grid grid-cols-3 gap-3 border-t border-[#0A1428]/5 pt-5 mb-6 mt-auto">
              {c.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-black text-xl text-[#0A1428]">{stat.value}</div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-[#0A1428]/40 leading-tight mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 text-[#036FDE] font-semibold text-sm group-hover:gap-3 transition-all min-h-[44px]">
              View Case Study
              <ArrowRight size={16} />
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <div className="w-full pt-32 pb-24 bg-white relative overflow-hidden text-[#0A1428]">
      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden bg-[#0A1428] mb-16">
        <div className="absolute inset-0">
          <img
            src="/images/portfolio_hero_banner_1790360282676.jpg"
            alt="A designer's desk with analytics dashboards and a brand moodboard glowing on screen"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 60%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1428] via-[#0A1428]/75 to-[#0A1428]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-[#0A1428]/10 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-6 w-full py-16 relative z-10">
          <div className="flex items-center gap-4 text-[11px] font-bold tracking-[0.25em] text-[#4B9FFF] uppercase mb-6">
            <div className="w-8 h-[2px] bg-[#4B9FFF]" />
            Real Brands × Real Solutions × Real Growth
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white mb-6">
            Selected <span className="text-[#4B9FFF]">Work.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl">
            Build, Brand, Scale isn't just how we describe what we do — it's what's behind every project below. Here's the framework in action, across six industries.
          </p>
        </div>
      </section>

      {/* Bento grid: one featured case study on top, five more below */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cases.map((c, i) => (
            <PortfolioCard key={c.client} c={c} i={i} featured={c.featured} />
          ))}
        </div>
        <p className="text-center text-[#0A1428]/40 text-sm mt-10">
          Concept case studies showcasing our range — real client stories coming soon.
        </p>
      </section>

      {/* CTA */}
      <Reveal className="max-w-7xl mx-auto px-6 mt-24 md:mt-32 relative z-10">
        <div className="bg-[#036FDE] rounded-[2rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0A1428]/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 text-white/80 text-sm font-semibold mb-8 flex-wrap justify-center">
              <span>50+ Brands Built</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>3x Average Client Growth</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>This could be yours next.</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black mb-8 tracking-tight text-white">
              Let's build something <br className="hidden md:block" /> worth showing off.
            </h2>
            <Link href="/contact" className="min-h-[44px] inline-flex items-center gap-4 bg-white text-[#036FDE] px-8 py-4 rounded-full text-[16px] font-bold hover:bg-[#0A1428] hover:text-white transition-colors shadow-2xl" data-cursor-hover>
              Book a Strategy Call <ArrowRight size={20} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
