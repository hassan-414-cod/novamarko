'use client';

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { Marquee } from '@/components/Marquee';
import { BuildIcon, BrandIcon, ScaleIcon } from '@/components/AnimatedIcons';
import { prefersReducedMotion } from '@/lib/motionPrefs';

type Word = string | { text: string; blue?: true };
const HEADLINE_LINES: Word[][] = [
  ['We', 'Build', 'Brands,'],
  ['Products,', 'Systems'],
  ['and', { text: 'Growth.', blue: true }],
];

function AnimatedHeadline({ reduceMotion }: { reduceMotion: boolean }) {
  let wordIndex = 0;
  return (
    <h1
      className="font-display font-bold leading-[1.05] tracking-tight text-[#0A1428] mb-6"
      style={{ fontSize: 'clamp(2.5rem, 1rem + 6vw, 4.75rem)' }}
    >
      {HEADLINE_LINES.map((line, li) => (
        <span key={li} className="block">
          {line.map((word, wi) => {
            const isBlue = typeof word === 'object';
            const text = isBlue ? word.text : word;
            const idx = wordIndex++;
            return (
              <React.Fragment key={wi}>
                <motion.span
                  className={`inline-block ${isBlue ? 'text-[#036FDE]' : ''}`}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {text}
                </motion.span>
                {wi < line.length - 1 && ' '}
              </React.Fragment>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function ServiceCard({ item, i }: { item: any; i: number }) {
  const reduceMotion = prefersReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -4,
        boxShadow: '0 20px 45px -10px rgba(3,111,222,0.45)',
        transition: { type: 'spring', stiffness: 320, damping: 22 },
      }}
      style={{ boxShadow: '0 10px 30px -12px rgba(10,20,40,0.4)' }}
      data-cursor-hover
      className="bg-[#0A1428] rounded-[2rem] overflow-hidden group flex flex-col"
    >
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-[#0A1428]/40 to-transparent" />

        <div className="absolute bottom-6 left-8">
          <div className="w-14 h-14 rounded-2xl bg-[#036FDE] flex items-center justify-center text-white shadow-[0_8px_30px_rgba(3,111,222,0.4)] group-hover:-translate-y-1 transition-transform duration-300">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.1 }}
            >
              {item.icon(24, i * 0.15 + 0.2, reduceMotion)}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-10 pt-2 flex-1 flex flex-col relative z-10">
        <h3 className="font-display font-bold text-3xl text-white mb-4 flex items-center gap-3">
          {item.title}
        </h3>
        <p className="text-white/70 leading-relaxed font-medium">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const reduceMotion = prefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const approachItems = [
    {
      title: 'Build',
      desc: "Brand identity, websites, and product design that make you look like the market leader you're becoming.",
      icon: (size: number, delay: number, rm: boolean) => <BuildIcon size={size} delay={delay} reduceMotion={rm} className="text-white" />,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Brand',
      desc: 'Content, positioning, and campaigns that turn attention into demand and build lasting loyalty.',
      icon: (size: number, delay: number, rm: boolean) => <BrandIcon size={size} delay={delay} reduceMotion={rm} className="text-white" />,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Scale',
      desc: 'Performance marketing and custom SaaS solutions that automate the grind so growth compounds.',
      icon: (size: number, delay: number, rm: boolean) => <ScaleIcon size={size} delay={delay} reduceMotion={rm} className="text-white" />,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen overflow-hidden flex items-center justify-start bg-[#F4F7FB]"
      >
        {/* Gradient mesh: soft blue blobs in the brand palette, behind the product shot */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute -top-32 -left-20 w-[520px] h-[520px] rounded-full bg-[#036FDE]/15 blur-[110px]" />
          <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] rounded-full bg-[#60A5FA]/15 blur-[100px]" />
          <div className="absolute -bottom-24 left-1/3 w-[460px] h-[460px] rounded-full bg-[#0057C6]/10 blur-[120px]" />
        </div>

        <div
          className="absolute inset-0 z-0 bg-no-repeat w-full h-full"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "auto 100%",
            backgroundPosition: "right top"
          }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white/80 to-transparent w-full md:w-2/3"></div>
        {/* Subtle grain texture overlay */}
        <div className="absolute inset-0 z-[1] bg-grain opacity-[0.035] mix-blend-multiply pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-32 pb-20 relative z-10 flex flex-col justify-center h-full">
          <div className="max-w-2xl">

            <AnimatedHeadline reduceMotion={reduceMotion} />

            {/* Subheadline */}
            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.55 }}
              className="text-[#0A1428]/70 text-[16px] md:text-[20px] font-medium leading-relaxed max-w-[500px] mb-10"
            >
              Nova Marko is a digital studio helping ambitious businesses design, build and scale through strategy, technology and performance marketing.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap items-center gap-4 md:gap-6 mb-16"
            >
              <Link href="/contact" className="min-h-[44px] bg-[#036FDE] text-white px-8 py-4 rounded-full text-[14px] md:text-[15px] font-semibold hover:bg-[#0057C6] shadow-xl hover:-translate-y-1 transition-all focus:outline-none flex items-center gap-2" data-cursor-hover>
                Start Your Project
                <ArrowRight size={18} />
              </Link>
              <Link href="/work" className="min-h-[44px] px-8 py-4 rounded-full text-[14px] md:text-[15px] font-semibold border-2 border-gray-200 text-[#0A1428] hover:border-gray-300 hover:bg-gray-50 transition-all focus:outline-none flex items-center" data-cursor-hover>
                See Our Work
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.75 }}
              className="flex items-center gap-8 md:gap-12"
            >
              <div>
                <div className="font-bold text-2xl md:text-3xl text-[#0A1428] mb-1">50+</div>
                <div className="text-[9px] md:text-[10px] font-bold tracking-widest text-[#0A1428]/50 uppercase">BRANDS BUILT</div>
              </div>
              <div className="w-[1px] h-10 bg-gray-200"></div>
              <div>
                <div className="font-bold text-2xl md:text-3xl text-[#0A1428] mb-1">3x</div>
                <div className="text-[9px] md:text-[10px] font-bold tracking-widest text-[#0A1428]/50 uppercase">AVERAGE GROWTH</div>
              </div>
              <div className="w-[1px] h-10 bg-gray-200"></div>
              <div>
                <div className="font-bold text-2xl md:text-3xl text-[#0A1428] mb-1">100%</div>
                <div className="text-[9px] md:text-[10px] font-bold tracking-widest text-[#0A1428]/50 uppercase">CLIENT FOCUSED</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats / industry marquee */}
      <Marquee />

      {/* Trust Strip */}
      <section className="bg-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#0A1428]/50 font-bold text-[10px] uppercase tracking-widest mb-6">TRUSTED BY AMBITIOUS BRANDS</p>
          <div className="flex flex-wrap items-center gap-8 md:gap-16 opacity-50 grayscale">
            <div className="flex items-center gap-2 font-bold text-lg"><BuildIcon size={24} reduceMotion /> Apex Fitness</div>
            <div className="flex items-center gap-2 font-bold text-lg"><BrandIcon size={24} reduceMotion /> Lumina Health</div>
            <div className="flex items-center gap-2 font-bold text-lg"><ScaleIcon size={24} reduceMotion /> Echo Systems</div>
            <div className="flex items-center gap-2 text-sm font-medium">● ● ● More to Come</div>
          </div>
        </div>
      </section>

      {/* What We Do — Build / Brand / Scale, staggered 150ms apart */}
      <section className="py-24 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A1428] mb-4">Our Approach</h2>
            <p className="text-lg text-[#0A1428]/70 max-w-2xl mx-auto">A proven methodology to help you dominate your market.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approachItems.map((item, i) => (
              <ServiceCard key={i} item={item} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <Reveal className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex justify-between items-end">
            <div>
              <h2 className="font-display text-4xl font-bold text-[#0A1428] mb-4">Our Services</h2>
              <p className="text-lg text-[#0A1428]/70 max-w-2xl">Everything your brand needs to grow — under one roof.</p>
            </div>
            <Link href="/services" className="hidden md:flex items-center gap-2 text-[#036FDE] font-semibold hover:text-[#0057C6] transition-colors">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Brand & Design', desc: 'Logos, identity systems, websites, UI/UX' },
              { title: 'Performance Marketing', desc: 'Paid media, SEO, funnels that convert' },
              { title: 'IT & Technical Ops', desc: 'Infrastructure, integrations, and support that keeps you running' },
              { title: 'SaaS Development', desc: 'Custom tools and digital products' }
            ].map((service, i) => (
              <Link href="/services" key={i} className="group block p-8 rounded-2xl bg-[#F6F9FC] shadow-sm hover:shadow-xl hover:-translate-y-1 border border-[#0A1428]/5 hover:border-[#036FDE]/20 hover:bg-white transition-all duration-300">
                <h3 className="font-bold text-xl text-[#0A1428] mb-2 group-hover:text-[#036FDE] transition-colors">{service.title}</h3>
                <p className="text-[#0A1428]/70">{service.desc}</p>
              </Link>
            ))}
          </div>
          <Link href="/services" className="mt-8 flex md:hidden items-center justify-center gap-2 text-[#036FDE] font-semibold hover:text-[#0057C6] transition-colors">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </Reveal>

      {/* Social Proof */}
      <Reveal className="py-24 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-[#0A1428] mb-12">Don't just take our word for it</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="bg-[#F6F9FC] p-8 rounded-2xl text-left">
                <p className="text-[#0A1428]/80 text-lg italic mb-6">
                  "Novamarko fundamentally changed how we operate. They didn't just build us a new site, they built the entire engine that drives our growth today."
                </p>
                <div>
                  <p className="font-bold text-[#0A1428]">Jane Doe</p>
                  <p className="text-sm text-[#0A1428]/60">CEO, TechForward</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal className="py-24 bg-gradient-signature text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Ready to build something that actually scales?</h2>
          <p className="text-white/80 text-lg mb-10">Tell us where you are. We'll show you where you could be.</p>
          <Link href="/contact" className="min-h-[44px] bg-white text-[#036FDE] px-8 py-4 rounded-full text-[14px] font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform" data-cursor-hover>
            Book a Strategy Call
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
