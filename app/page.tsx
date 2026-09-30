'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { Marquee } from '@/components/Marquee';
import { BuildIcon, BrandIcon, ScaleIcon } from '@/components/AnimatedIcons';
import { HeroVideoLoop } from '@/components/HeroVideoLoop';
import { prefersReducedMotion } from '@/lib/motionPrefs';

function ServiceCard({ item, i, isLast }: { item: any; i: number; isLast: boolean }) {
  const reduceMotion = prefersReducedMotion();

  // Sticky stack (desktop only — needs a fixed card height to calibrate):
  // each non-last card sits in a tall wrapper that holds it pinned at
  // top-28 for a stretch of scroll. A negative top margin on every card
  // after the first pulls its wrapper up so that stretch overlaps the
  // *previous* card's own pinned stretch — without that overlap, sticky
  // elements just hand off to each other with a gap in between and never
  // actually cover one another. Higher z-index on later cards is what
  // makes each new one paint over the last during that overlap window.
  // Mobile keeps it simple: plain stacked cards, no pinning.
  const wrapperClasses = [
    'relative',
    i > 0 ? 'md:-mt-[430px]' : '',
    !isLast ? 'md:h-[150vh]' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses} style={{ zIndex: i + 1 }}>
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ boxShadow: '0 30px 70px -20px rgba(10,20,40,0.55)' }}
        data-cursor-hover
        className="mb-6 md:mb-0 md:sticky md:top-28 bg-[#0A1428] rounded-[2rem] overflow-hidden flex flex-col md:flex-row md:h-[380px]"
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
              {item.icon(24, i * 0.1, reduceMotion)}
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
          <div className="hidden md:flex w-14 h-14 rounded-2xl bg-[#036FDE] items-center justify-center text-white shadow-[0_8px_30px_rgba(3,111,222,0.4)] mb-6">
            {item.icon(24, i * 0.1, reduceMotion)}
          </div>
          <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            {item.title}
          </h3>
          <p className="text-white/70 leading-relaxed font-medium text-lg max-w-md">
            {item.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const reduceMotion = prefersReducedMotion();

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
      {/* Looping story video — sits above the hero, full width of the page card */}
      <HeroVideoLoop />

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
          <div className="max-w-4xl mx-auto">
            {approachItems.map((item, i) => (
              <ServiceCard key={i} item={item} i={i} isLast={i === approachItems.length - 1} />
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
