'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Link2, CreditCard, ShoppingBag, BarChart3, Check } from 'lucide-react';

const SERVICE_OPTIONS = [
  { id: 'Branding', icon: Link2 },
  { id: 'Web & Apps', icon: CreditCard },
  { id: 'E-commerce', icon: ShoppingBag },
  { id: 'Marketing', icon: BarChart3 },
];

const BUDGET_OPTIONS = ['Under $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+', 'Not sure yet'];

const CONFETTI_COLORS = ['#036FDE', '#22C55E', '#60A5FA', '#FFFFFF', '#0057C6'];

function Confetti() {
  const pieces = Array.from({ length: 26 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {pieces.map((i) => {
        const angle = (Math.PI * 2 * i) / pieces.length + (Math.random() - 0.5) * 0.6;
        const dist = 70 + Math.random() * 130;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist * 0.6 - 20;
        const w = 5 + Math.random() * 5;
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x, y: y + 140, opacity: 0, rotate: Math.random() * 300 - 150 }}
            transition={{ duration: 1 + Math.random() * 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: w,
              height: w * 0.6,
              background: color,
              borderRadius: 2,
            }}
          />
        );
      })}
    </div>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      data-cursor-hover
      className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-[#0A1428]/10 bg-[#F7FAFC]"
    >
      <span className="font-bold text-[#0A1428]">{label}</span>
      <span
        className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${checked ? 'bg-[#036FDE]' : 'bg-[#0A1428]/15'}`}
      >
        <motion.span
          className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm"
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </span>
    </button>
  );
}

type WizardData = {
  serviceTypes: string[];
  adCampaign: boolean;
  budget: string;
  company: string;
  name: string;
  email: string;
  message: string;
};

const INITIAL: WizardData = {
  serviceTypes: [],
  adCampaign: false,
  budget: BUDGET_OPTIONS[0],
  company: '',
  name: '',
  email: '',
  message: '',
};

const TOTAL_STEPS = 3;

export function ProjectWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [sentAutomatically, setSentAutomatically] = useState(false);
  const [direction, setDirection] = useState(1);

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const toggleService = (id: string) => {
    setData((d) => ({
      ...d,
      serviceTypes: d.serviceTypes.includes(id)
        ? d.serviceTypes.filter((s) => s !== id)
        : [...d.serviceTypes, id],
    }));
  };

  const openMailtoFallback = () => {
    const subject = encodeURIComponent(`New project inquiry from ${data.name || 'website'}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\n` +
      `Looking for: ${data.serviceTypes.join(', ') || 'N/A'}${data.adCampaign ? ' + ad campaign' : ''}\n` +
      `Budget range: ${data.budget}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:novamarko72@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async () => {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSentAutomatically(true);
      } else {
        openMailtoFallback();
        setSentAutomatically(false);
      }
    } catch {
      openMailtoFallback();
      setSentAutomatically(false);
    } finally {
      setStatus('sent');
    }
  };

  const reset = () => {
    setData(INITIAL);
    setStep(1);
    setStatus('idle');
  };

  const canContinueStep1 = data.serviceTypes.length > 0;
  const canContinueStep2 = Boolean(data.budget);
  const canSubmit = Boolean(data.name.trim() && data.email.trim() && data.message.trim());

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-[#0A1428]/5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <img src="/icon.png" alt="" className="w-10 h-10 rounded-xl shrink-0" />
          <div>
            <h3 className="font-display font-bold text-xl text-[#0A1428]">
              {status === 'sent' ? 'Request sent' : 'Start your project'}
            </h3>
            <p className="text-[#0A1428]/50 text-sm">
              {status === 'sent' ? "We'll be in touch shortly" : 'Tell us what you need'}
            </p>
          </div>
        </div>
        {status !== 'sent' && (
          <span className="shrink-0 bg-[#EAF2FF] text-[#036FDE] text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-full whitespace-nowrap">
            STEP {step} OF {TOTAL_STEPS}
          </span>
        )}
      </div>
      <div className="h-px bg-[#0A1428]/10 mb-6" />

      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative py-6 text-center"
          >
            <div className="relative inline-block mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white flex items-center justify-center mx-auto"
              >
                <Check size={30} strokeWidth={3} />
              </motion.div>
              <Confetti />
            </div>
            {sentAutomatically ? (
              <>
                <h4 className="font-display text-2xl font-bold text-[#0A1428] mb-3">Request sent!</h4>
                <p className="text-[#0A1428]/60 max-w-sm mx-auto mb-6">
                  Your project details just landed straight in our inbox. We read every message personally and reply within 1 business day.
                </p>
              </>
            ) : (
              <>
                <h4 className="font-display text-2xl font-bold text-[#0A1428] mb-3">Almost there!</h4>
                <p className="text-[#0A1428]/60 max-w-sm mx-auto mb-6">
                  Your email client should now be open with everything pre-filled. Just hit send — we reply within 1 business day.
                </p>
              </>
            )}
            <button type="button" onClick={reset} className="text-[#036FDE] font-semibold hover:text-[#0057C6] transition-colors">
              ← Start another request
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-[#0A1428] mb-3">What do you need?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {SERVICE_OPTIONS.map(({ id, icon: Icon }) => {
                      const selected = data.serviceTypes.includes(id);
                      return (
                        <button
                          key={id}
                          type="button"
                          data-cursor-hover
                          onClick={() => toggleService(id)}
                          className={`relative flex items-center gap-3 px-4 py-4 rounded-2xl border text-left transition-colors ${
                            selected
                              ? 'bg-gradient-to-r from-[#036FDE] to-[#0057C6] border-[#036FDE] text-white'
                              : 'bg-[#F7FAFC] border-[#0A1428]/10 text-[#0A1428] hover:border-[#036FDE]/30'
                          }`}
                        >
                          <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${selected ? 'bg-white/20' : 'bg-white text-[#036FDE] shadow-sm'}`}>
                            <Icon size={16} />
                          </span>
                          <span className="font-bold text-sm">{id}</span>
                          {selected && (
                            <span className="ml-auto w-5 h-5 rounded-full bg-white/25 flex items-center justify-center shrink-0">
                              <Check size={12} strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Toggle
                  label="Include ad campaign"
                  checked={data.adCampaign}
                  onChange={(v) => setData((d) => ({ ...d, adCampaign: v }))}
                />

                <button
                  type="button"
                  disabled={!canContinueStep1}
                  onClick={() => goTo(2)}
                  data-cursor-hover
                  className="w-full bg-gradient-to-r from-[#036FDE] to-[#0057C6] text-white py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-[#0A1428] mb-3">What&apos;s your budget?</p>
                  <div className="space-y-2">
                    {BUDGET_OPTIONS.map((opt) => {
                      const selected = data.budget === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          data-cursor-hover
                          onClick={() => setData((d) => ({ ...d, budget: opt }))}
                          className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border text-left font-semibold text-sm transition-colors ${
                            selected
                              ? 'bg-gradient-to-r from-[#036FDE] to-[#0057C6] border-[#036FDE] text-white'
                              : 'bg-[#F7FAFC] border-[#0A1428]/10 text-[#0A1428] hover:border-[#036FDE]/30'
                          }`}
                        >
                          {opt}
                          {selected && (
                            <span className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center shrink-0">
                              <Check size={12} strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-bold text-[#0A1428] mb-2">Company (optional)</label>
                  <input
                    type="text"
                    id="company"
                    value={data.company}
                    onChange={(e) => setData((d) => ({ ...d, company: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#0A1428]/20 focus:border-[#036FDE] focus:ring-1 focus:ring-[#036FDE] outline-none transition-all"
                    placeholder="Acme Corp"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => goTo(1)} data-cursor-hover className="shrink-0 w-12 h-12 rounded-xl border border-[#0A1428]/15 flex items-center justify-center text-[#0A1428] hover:bg-[#F7FAFC] transition-colors">
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    disabled={!canContinueStep2}
                    onClick={() => goTo(3)}
                    data-cursor-hover
                    className="flex-1 bg-gradient-to-r from-[#036FDE] to-[#0057C6] text-white py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <p className="text-sm font-bold text-[#0A1428] mb-1">How can we reach you?</p>
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-[#0A1428] mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#0A1428]/20 focus:border-[#036FDE] focus:ring-1 focus:ring-[#036FDE] outline-none transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-[#0A1428] mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#0A1428]/20 focus:border-[#036FDE] focus:ring-1 focus:ring-[#036FDE] outline-none transition-all"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-[#0A1428] mb-2">Tell Us About Your Project</label>
                  <textarea
                    required
                    id="message"
                    rows={4}
                    value={data.message}
                    onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#0A1428]/20 focus:border-[#036FDE] focus:ring-1 focus:ring-[#036FDE] outline-none transition-all"
                    placeholder="What are you building, and what does success look like?"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => goTo(2)} data-cursor-hover className="shrink-0 w-12 h-12 rounded-xl border border-[#0A1428]/15 flex items-center justify-center text-[#0A1428] hover:bg-[#F7FAFC] transition-colors">
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    disabled={!canSubmit || status === 'sending'}
                    onClick={handleSubmit}
                    data-cursor-hover
                    className="flex-1 bg-gradient-to-r from-[#036FDE] to-[#0057C6] text-white py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Sending…' : 'Start Your Project'}
                    {status !== 'sending' && <ArrowRight size={18} />}
                  </button>
                </div>
                <p className="text-center text-xs text-[#0A1428]/40">We read every message personally — expect a reply within 1 business day.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
