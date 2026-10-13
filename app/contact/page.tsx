'use client';

import { Mail, MapPin, Calendar, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ProjectWizard } from '@/components/ProjectWizard';

const steps = [
  { num: '01', title: 'Discovery Call', desc: "A short call to understand your goals — no pitch, just questions." },
  { num: '02', title: 'A Clear Proposal', desc: 'What we\'d do, how long it takes, and what it costs. No jargon, no surprises.' },
  { num: '03', title: 'Kickoff', desc: "Once you're ready, we start within days, not months." },
];

export default function Contact() {
  return (
    <div className="w-full pb-24 bg-white relative overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[55vh] md:min-h-[62vh] flex items-center overflow-hidden bg-[#0A1428] mb-20">
        <div className="absolute inset-0">
          <img
            src="/images/contact_hero_banner_1790360306945.jpg"
            alt="A laptop showing a booking calendar and a phone with an incoming call, dusk city skyline through the window"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 55%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1428] via-[#0A1428]/75 to-[#0A1428]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-6 w-full py-16 relative z-10">
          <div className="flex items-center gap-4 text-[11px] font-bold tracking-[0.25em] text-[#4B9FFF] uppercase mb-6">
            <div className="w-8 h-[2px] bg-[#4B9FFF]" />
            Get In Touch
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black leading-tight tracking-tight text-white mb-6">
            Tell Us What <span className="text-[#4B9FFF]">You're Building.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
            No pitch decks, no pressure — just a straightforward conversation about where you are and where you want to go. Fill out the form or email us directly, whichever's easier.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <div>
          <div className="space-y-6 mb-12">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-5">
                <div className="text-2xl font-display font-black text-[#036FDE]/25 shrink-0">{step.num}</div>
                <div>
                  <h3 className="font-bold text-[#0A1428] mb-1">{step.title}</h3>
                  <p className="text-[#0A1428]/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#036FDE] shrink-0 shadow-sm">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#0A1428] mb-1">Email Us</h3>
                <a href="mailto:novamarko72@gmail.com" className="text-[#0A1428]/70 hover:text-[#036FDE]">novamarko72@gmail.com</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#036FDE] shrink-0 shadow-sm">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#0A1428] mb-1">Where We Work</h3>
                <p className="text-[#0A1428]/70">Based in Dubai, UAE — working with clients globally.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#036FDE] shrink-0 shadow-sm">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#0A1428] mb-1">Prefer a Call?</h3>
                <a href="mailto:novamarko72@gmail.com?subject=Strategy%20call%20request" className="text-[#0A1428]/70 hover:text-[#036FDE]">Email us to schedule a time</a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-10">
            <a
              href="https://www.instagram.com/novamarkox/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nova Marko on Instagram"
              data-cursor-hover
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#036FDE] shadow-sm hover:bg-[#036FDE] hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/novamarkox"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nova Marko on Facebook"
              data-cursor-hover
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#036FDE] shadow-sm hover:bg-[#036FDE] hover:text-white transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="mailto:novamarko72@gmail.com"
              aria-label="Email Nova Marko"
              data-cursor-hover
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#036FDE] shadow-sm hover:bg-[#036FDE] hover:text-white transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <ProjectWizard />
      </section>

      <Reveal className="pt-24 text-center relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-[#0A1428] mb-6">Prefer to talk it through first?</h2>
          <a href="mailto:novamarko72@gmail.com" className="min-h-[44px] bg-gradient-signature text-white px-8 py-4 rounded-full text-[14px] font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-lg" data-cursor-hover>
            Book a Free Strategy Call
            <ArrowRight size={18} strokeWidth={2.5} />
          </a>
        </div>
      </Reveal>
    </div>
  );
}
