'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, MapPin, Calendar, Check, X as XIcon } from 'lucide-react';
import Link from 'next/link';
import { PageOrnament } from '@/components/PageOrnament';
import { Reveal } from '@/components/Reveal';
import { Logo } from '@/components/Logo';
import { BuildIcon, BrandIcon, ScaleIcon } from '@/components/AnimatedIcons';
import { prefersReducedMotion } from '@/lib/motionPrefs';

const DOT_COLORS = ['bg-[#036FDE]', 'bg-[#22D3EE]', 'bg-[#60A5FA]'];

const approach = [
  {
    num: '01',
    Icon: BuildIcon,
    title: 'Build',
    desc: "A brand without a working product or platform underneath it is just a promise. We build the foundation first — the thing you can actually point people to.",
    tags: ['Strategy', 'Design', 'Development'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600',
  },
  {
    num: '02',
    Icon: BrandIcon,
    title: 'Brand',
    desc: 'Once the foundation is real, positioning and story are what make people care. We shape how you look, sound, and stick in someone\'s memory.',
    tags: ['Content', 'Campaigns', 'Growth'],
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600',
  },
  {
    num: '03',
    Icon: ScaleIcon,
    title: 'Scale',
    desc: "Deliberately last. Pouring budget into something that isn't built or branded yet just helps you fail faster — so we scale what's already working.",
    tags: ['Marketing', 'Automation', 'Scale'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
  },
];

const proofStats = [
  { value: '50+', label: 'Brands Built' },
  { value: '3x', label: 'Average Client Growth' },
  { value: '100%', label: 'Client Focused' },
];

const comparison = [
  {
    title: 'A Freelancer',
    tone: 'muted',
    points: ['One skill, one deliverable', 'No one to build what they design', 'Disappears after the file is sent'],
  },
  {
    title: 'A Single-Service Agency',
    tone: 'muted',
    points: ['Great at one channel, blind to the rest', 'Ads pointed at a site that isn\'t ready', 'Success capped by what they don\'t own'],
  },
  {
    title: 'Nova Marko',
    tone: 'highlight',
    points: ['One accountable team, three disciplines', 'Every decision made with the other two in mind', 'Senior hands on it from kickoff to launch'],
  },
];

export default function About() {
  return (
    <div className="w-full pt-32">
      {/* Hero */}
      <section className="relative min-h-[68vh] md:min-h-[75vh] flex items-center overflow-hidden bg-[#0A1428]">
        <div className="absolute inset-0">
          <img
            src="/images/about_hero_banner_1790360270632.jpg"
            alt="The Nova Marko team collaborating around a table at dusk, Dubai skyline in the background"
            className="w-full h-full object-cover"
            style={{ objectPosition: '68% 40%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1428] via-[#0A1428]/80 to-[#0A1428]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-20 relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-6xl font-black leading-tight tracking-tight text-white mb-6">
              We're Not an Agency.<br />
              <span className="text-[#4B9FFF]">We're Your Growth Team.</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed">
              Most businesses end up hiring a designer, a marketer, and a developer separately — three different people, three different priorities, and nothing that adds up to one coherent brand. Nova Marko exists to close that gap: one team that owns strategy, build, and growth from day one.
            </p>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <Reveal className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-[#0A1428] mb-6">Why We Exist</h2>
              <div className="prose prose-lg text-[#0A1428]/70">
                <p className="mb-6">
                  Founders don't fail from lack of effort. They fail from disconnection — a logo that doesn't match the website, a website that doesn't support the marketing, a marketing plan with no technical backbone to scale on.
                </p>
                <p className="mb-6">
                  We started Nova Marko because we kept watching talented people burn budget and time stitching together vendors who'd never spoken to each other. A designer hands off a brand kit. A developer builds to spec without knowing the growth plan. A marketer runs campaigns for a product they didn't shape.
                </p>
                <p>
                  We built the team — and later the systems — to do all three under one roof, so nothing gets lost in the handoff.
                </p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-video relative group">
              <div className="absolute inset-0 bg-[#036FDE]/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" alt="Team collaborating" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Who's Behind It */}
      <Reveal className="py-24 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 rounded-3xl overflow-hidden shadow-xl aspect-video relative group">
              <div className="absolute inset-0 bg-[#036FDE]/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200" alt="Senior team working together" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 text-[11px] font-bold tracking-[0.25em] text-[#036FDE] uppercase mb-4">
                <div className="w-8 h-[2px] bg-[#036FDE]" />
                The Team
              </div>
              <h2 className="font-display text-3xl font-bold text-[#0A1428] mb-6">A Small, Senior Team — Not a Bench of Juniors</h2>
              <p className="text-[#0A1428]/70 text-lg leading-relaxed mb-4">
                Nova Marko is run by a small team based in Dubai, working hands-on with every client. There's no account-manager layer, no handing your project off to whoever's free that week.
              </p>
              <p className="text-[#0A1428]/70 text-lg leading-relaxed">
                The people who scope your strategy are the same people who sit in the build reviews, write the copy, and read the campaign numbers on a Monday morning. Senior from kickoff to launch — because a brand this important shouldn't be someone's training ground.
              </p>
            </div>
          </div>

          {/* Proof stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mt-16 pt-12 border-t border-[#0A1428]/10">
            {proofStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-black text-3xl md:text-4xl text-[#036FDE] mb-1">{stat.value}</div>
                <div className="text-[10px] md:text-xs font-bold tracking-widest text-[#0A1428]/50 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Our Approach — Build / Brand / Scale, staggered 150ms apart */}
      <section className="pt-24 pb-16 bg-white relative overflow-hidden">
        <PageOrnament words={["IDEAS", "SYSTEMS", "BRANDS", "RESULTS"]} words2={["A MORE", "AMBITIOUS", "TOMORROW"]} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="flex items-center gap-4 text-[11px] font-bold tracking-[0.25em] text-[#0A1428]/70 uppercase mb-6">
              <div className="w-8 h-[2px] bg-[#036FDE]" />
              Our Process
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-[#0A1428] mb-6">
              Build, Brand, Scale — <span className="text-[#036FDE]">In That Order</span>
            </h2>
            <p className="text-[#0A1428]/60 text-lg md:text-xl leading-relaxed max-w-2xl mb-6">
              We didn't pick this as a tagline. We picked it as an order of operations. Build first, because a promise needs something real underneath it. Brand second, because once the foundation is real, story is what makes people care. Scale last — deliberately last.
            </p>
            <p className="text-[#0A1428]/60 text-lg leading-relaxed max-w-2xl mb-16">
              Skip a step, and the other two eventually break under the weight of it.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approach.map((step, i) => {
              const reduceMotion = prefersReducedMotion();
              const Icon = step.Icon;
              return (
                <motion.div
                  key={step.num}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{
                    y: -4,
                    boxShadow: '0 20px 45px -10px rgba(3,111,222,0.3)',
                    transition: { type: 'spring', stiffness: 320, damping: 22 },
                  }}
                  style={{ boxShadow: '0 4px 16px -8px rgba(10,20,40,0.08)' }}
                  data-cursor-hover
                  className="bg-white rounded-3xl border border-[#0A1428]/5 p-6 flex flex-col"
                >
                  <div className="flex items-center gap-3 text-[#036FDE] text-sm font-bold mb-5">
                    {step.num}
                    <div className="w-6 h-px bg-[#036FDE]/40" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#036FDE] text-white flex items-center justify-center mb-5 shadow-[0_8px_20px_rgba(3,111,222,0.3)]">
                    <Icon size={22} delay={i * 0.15 + 0.2} reduceMotion={reduceMotion} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#0A1428] mb-2">{step.title}</h3>
                  <p className="text-[#0A1428]/60 leading-relaxed mb-5">{step.desc}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
                    {step.tags.map((tag, ti) => (
                      <span key={tag} className="inline-flex items-center gap-2 text-sm font-medium text-[#0A1428]/70">
                        <span className={`w-1.5 h-1.5 rounded-full ${DOT_COLORS[ti % DOT_COLORS.length]}`} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="rounded-2xl overflow-hidden mt-auto aspect-[4/3]">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Not Just Another Agency */}
      <Reveal className="py-24 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-4 text-[11px] font-bold tracking-[0.25em] text-[#036FDE] uppercase mb-4">
              <div className="w-8 h-[2px] bg-[#036FDE]" />
              Why It's Different
              <div className="w-8 h-[2px] bg-[#036FDE]" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0A1428] mb-6">Not a Freelancer. Not a Single-Service Shop.</h2>
            <p className="text-[#0A1428]/70 text-lg leading-relaxed">
              Hire a freelance designer, and you get a beautiful file with no one to build it. Hire a single-service agency, and you get great ads pointed at a site that isn't ready to convert them. Nova Marko is built differently — one accountable team across brand, build, and growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparison.map((col) => (
              <div
                key={col.title}
                className={`rounded-3xl p-8 border ${
                  col.tone === 'highlight'
                    ? 'bg-[#0A1428] border-[#0A1428] shadow-xl md:-translate-y-3'
                    : 'bg-white border-[#0A1428]/5'
                }`}
              >
                <h3 className={`font-display font-bold text-xl mb-6 ${col.tone === 'highlight' ? 'text-white' : 'text-[#0A1428]'}`}>
                  {col.title}
                </h3>
                <div className="space-y-4">
                  {col.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      {col.tone === 'highlight' ? (
                        <Check size={18} className="text-[#4B9FFF] shrink-0 mt-0.5" />
                      ) : (
                        <XIcon size={18} className="text-[#0A1428]/30 shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm leading-relaxed ${col.tone === 'highlight' ? 'text-white/80' : 'text-[#0A1428]/60'}`}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal className="pb-24 pt-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#0A1428] rounded-[2rem] p-10 md:p-16 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: "url('/hero-bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: '22% 40%',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1428] via-[#0A1428]/85 to-[#0A1428]/40" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
              <div>
                <div className="text-[11px] font-bold tracking-[0.25em] text-[#036FDE] uppercase mb-4">
                  Ready to create what's next?
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Let's build something <span className="text-[#4B9FFF]">remarkable.</span>
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
                  The fastest way to know if we're the right fit is a conversation — no deck, no pressure. Book a strategy call and tell us{' '}
                  <Link href="/contact" className="text-[#4B9FFF] underline underline-offset-4 hover:text-white transition-colors">
                    where you are and where you want to be
                  </Link>.
                </p>
                <div className="flex flex-wrap items-center gap-4 md:gap-8">
                  <Link href="/contact" className="group/cta min-h-[44px] bg-white text-[#0A1428] px-7 py-3.5 rounded-full text-[14px] font-bold hover:scale-105 transition-transform inline-flex items-center gap-1.5" data-cursor-hover>
                    Get in Touch
                    <span className="inline-block w-0 opacity-0 overflow-hidden group-hover/cta:w-4 group-hover/cta:opacity-100 transition-all duration-300 ease-out">
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </span>
                  </Link>
                  <div className="hidden md:block w-px h-6 bg-white/20" />
                  <a href="mailto:novamarko72@gmail.com" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium">
                    <Mail size={16} /> novamarko72@gmail.com
                  </a>
                  <div className="hidden md:block w-px h-6 bg-white/20" />
                  <span className="flex items-center gap-2 text-white/80 text-sm font-medium">
                    <MapPin size={16} /> Dubai, UAE
                  </span>
                  <div className="hidden md:block w-px h-6 bg-white/20" />
                  <Link href="/contact" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium">
                    <Calendar size={16} /> Book a Call
                  </Link>
                </div>
              </div>

              <div className="hidden lg:flex flex-col items-end gap-6 shrink-0">
                <div className="text-right text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase leading-loose">
                  <div>Strategy</div>
                  <div>Creativity</div>
                  <div>Technology</div>
                  <div>Real Growth</div>
                </div>
                <div className="flex flex-col items-end opacity-90">
                  <Logo variant="left" className="items-end" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
