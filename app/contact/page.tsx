'use client';

import React, { useState } from 'react';
import { ArrowRight, Mail, MapPin, Calendar, CheckCircle2, Instagram, Facebook } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const steps = [
  { num: '01', title: 'Discovery Call', desc: "A short call to understand your goals — no pitch, just questions." },
  { num: '02', title: 'A Clear Proposal', desc: 'What we\'d do, how long it takes, and what it costs. No jargon, no surprises.' },
  { num: '03', title: 'Kickoff', desc: "Once you're ready, we start within days, not months." },
];

const budgetOptions = ['Under $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+', 'Not sure yet'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', budget: budgetOptions[0], message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentAutomatically, setSentAutomatically] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const openMailtoFallback = () => {
    const subject = encodeURIComponent(`New project inquiry from ${form.name || 'website'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nBudget range: ${form.budget}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:novamarko72@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSentAutomatically(true);
        setSubmitted(true);
      } else {
        // Backend not configured yet (or a transient failure) — fall back to
        // opening the visitor's own mail client, pre-addressed and pre-filled.
        openMailtoFallback();
        setSentAutomatically(false);
        setSubmitted(true);
      }
    } catch {
      openMailtoFallback();
      setSentAutomatically(false);
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full pt-32 pb-24 bg-white relative overflow-hidden">
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

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-[#0A1428]/5">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#EAF2FF] text-[#036FDE] flex items-center justify-center mb-6">
                <CheckCircle2 size={32} />
              </div>
              {sentAutomatically ? (
                <>
                  <h3 className="font-display text-2xl font-bold text-[#0A1428] mb-3">Message sent!</h3>
                  <p className="text-[#0A1428]/60 max-w-sm mb-6">
                    Your message just landed straight in our inbox — no extra step needed. We read every message personally and reply within 1 business day.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-bold text-[#0A1428] mb-3">Almost there!</h3>
                  <p className="text-[#0A1428]/60 max-w-sm mb-6">
                    Your email client should now be open with your message pre-filled. Just hit send — we read every message personally and reply within 1 business day.
                  </p>
                </>
              )}
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-[#036FDE] font-semibold hover:text-[#0057C6] transition-colors"
              >
                ← Edit message
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-[#0A1428] mb-2">Full Name</label>
                  <input required type="text" id="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#0A1428]/20 focus:border-[#036FDE] focus:ring-1 focus:ring-[#036FDE] outline-none transition-all" placeholder="Jane Doe" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-bold text-[#0A1428] mb-2">Company</label>
                  <input type="text" id="company" value={form.company} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#0A1428]/20 focus:border-[#036FDE] focus:ring-1 focus:ring-[#036FDE] outline-none transition-all" placeholder="Acme Corp" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#0A1428] mb-2">Email Address</label>
                <input required type="email" id="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#0A1428]/20 focus:border-[#036FDE] focus:ring-1 focus:ring-[#036FDE] outline-none transition-all" placeholder="jane@example.com" />
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-bold text-[#0A1428] mb-2">Budget Range</label>
                <select id="budget" value={form.budget} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#0A1428]/20 focus:border-[#036FDE] focus:ring-1 focus:ring-[#036FDE] outline-none transition-all bg-white">
                  {budgetOptions.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-[#0A1428] mb-2">Tell Us About Your Project</label>
                <textarea required id="message" rows={4} value={form.message} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#0A1428]/20 focus:border-[#036FDE] focus:ring-1 focus:ring-[#036FDE] outline-none transition-all" placeholder="What are you building, and what does success look like?"></textarea>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#036FDE] text-white py-4 rounded-xl font-bold hover:bg-[#0057C6] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending…' : 'Start the Conversation'}
                {!sending && <ArrowRight size={18} />}
              </button>

              <p className="text-center text-xs text-[#0A1428]/40">We read every message personally — expect a reply within 1 business day.</p>
            </form>
          )}
        </div>
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
