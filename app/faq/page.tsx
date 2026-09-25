'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FAQ() {
  const faqs = [
    {
      q: "What makes Novamarko different from a regular marketing agency?",
      a: "We don't just run campaigns — we build the brand, the marketing, and the software infrastructure together, so nothing is working against itself."
    },
    {
      q: "Do I need to use the Novamarko platform to work with you as an agency?",
      a: "No. You can work with us for services only, use the platform standalone, or combine both — whatever fits your business."
    },
    {
      q: "How long does a typical project take?",
      a: "Timelines vary by scope. Brand and website projects typically run 4–8 weeks; marketing engagements are ongoing with monthly optimization cycles."
    },
    {
      q: "Can Novamarko build custom software beyond the platform?",
      a: "Yes — our SaaS development team builds custom tools, dashboards, and MVPs for clients who need something the platform doesn't cover out of the box."
    },
    {
      q: "Do you work with businesses outside of [region/industry]?",
      a: "Yes, we work with brands and businesses across industries and locations, in-person and remote."
    },
    {
      q: "How do I get started?",
      a: "Book a free strategy call. We'll audit where you are and recommend the right starting point — whether that's brand, marketing, platform, or all three."
    }
  ];

  return (
    <div className="w-full pt-32">
      <section className="py-24 md:py-32 bg-[#F6F9FC] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#0A1428] mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-[#4A5568] text-lg leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about working with Novamarko.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[#0A1428]/10 pb-8 last:border-0 last:pb-0">
              <h3 className="text-xl font-bold text-[#0A1428] mb-4">{faq.q}</h3>
              <p className="text-[#0A1428]/70 text-lg leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-[#0A1428] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold mb-8">Still have questions?</h2>
          <Link href="/contact" className="bg-white text-[#0A1428] px-8 py-4 rounded-full text-[14px] font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform">
            Book a Strategy Call
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </div>
  );
}
