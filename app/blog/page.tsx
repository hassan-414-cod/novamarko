'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Blog() {
  const categories = ["Brand & Design", "Performance Marketing", "SaaS & Tech", "Growth Strategy"];

  return (
    <div className="w-full pt-32">
      <section className="py-24 bg-[#F6F9FC]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#0A1428] mb-6">
            Insights on Brand, Growth, and Building Businesses That Last.
          </h1>
          <p className="text-[#4A5568] text-lg leading-relaxed">
            Straight-talk articles on marketing, design, and scaling — no fluff, no recycled advice.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-[#0A1428]/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4 justify-center">
          {categories.map((cat, i) => (
            <button key={i} className="px-6 py-2 rounded-full border border-[#0A1428]/10 text-sm font-semibold text-[#0A1428]/70 hover:border-[#036FDE] hover:text-[#036FDE] transition-colors">
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <article className="prose prose-lg prose-headings:font-display prose-a:text-[#036FDE] max-w-none text-[#0A1428]/80">
            <div className="mb-12 border-b border-[#0A1428]/10 pb-12">
              <span className="text-sm font-bold uppercase tracking-wider text-[#036FDE] mb-4 block">Growth Strategy</span>
              <h2 className="text-4xl font-bold text-[#0A1428] mb-4 mt-0">Why Most Small Businesses Waste Their Marketing Budget (And How to Stop)</h2>
              <p className="text-xl text-[#0A1428]/60 leading-relaxed mb-8">Most small businesses don't have a marketing problem — they have a strategy problem. Here's what to fix first.</p>
              
              <div className="h-64 md:h-96 w-full rounded-2xl mb-12 flex items-center justify-center border border-[#0A1428]/5 overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group relative">
                <div className="absolute inset-0 bg-[#036FDE]/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" alt="Data and analytics" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>

              <p>Most small businesses don't lack effort. They lack a system.</p>
              <p>They run a few ads, post inconsistently on social, and hope something sticks. When it doesn't, they blame the channel — "Facebook ads don't work," "SEO is dead" — instead of the strategy behind it.</p>
              <p>Here's the truth: marketing budget gets wasted in three predictable ways.</p>

              <h3 className="text-2xl font-bold text-[#0A1428] mt-10 mb-4">1. No clear offer.</h3>
              <p>If your ad, landing page, and pitch aren't saying the same specific thing to the same specific person, you're paying for clicks that never convert.</p>

              <h3 className="text-2xl font-bold text-[#0A1428] mt-10 mb-4">2. No tracking.</h3>
              <p>If you can't say exactly what a customer costs to acquire, you can't tell what's actually working — you're guessing with real money.</p>

              <h3 className="text-2xl font-bold text-[#0A1428] mt-10 mb-4">3. No system to follow up.</h3>
              <p>Most leads don't buy on the first touch. Without email, retargeting, or a sales process to bring them back, you're paying to generate leads you then let go cold.</p>

              <p className="mt-8">The fix isn't a bigger budget. It's a tighter system — clear offer, real tracking, and a follow-up process that doesn't rely on someone remembering to send an email.</p>
              <p>That's the gap Novamarko was built to close.</p>
            </div>
            
            <div className="bg-[#F6F9FC] p-8 rounded-2xl border border-[#0A1428]/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold text-[#0A1428] m-0 mb-2">Want a marketing system that doesn't leak budget?</h4>
                <p className="m-0 text-[#0A1428]/70">Let's audit your current setup and find the leaks.</p>
              </div>
              <Link href="/contact" className="bg-[#036FDE] text-white px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap hover:bg-[#0057C6] transition-colors no-underline">
                Book a Strategy Call
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
