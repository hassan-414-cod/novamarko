import React from 'react';

export function Legal({ type }: { type: 'privacy' | 'terms' }) {
  const isPrivacy = type === 'privacy';
  
  return (
    <div className="w-full bg-[#F6F9FC] py-24 min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-6 bg-white p-12 rounded-3xl shadow-sm border border-[#0A1428]/5">
        <h1 className="font-display text-4xl font-bold text-[#0A1428] mb-8">
          {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
        </h1>
        
        <div className="prose prose-lg text-[#0A1428]/70">
          <p className="italic mb-8">Last updated: [Current Date]</p>
          
          {isPrivacy ? (
            <>
              <p>This is a placeholder for the Privacy Policy. Full text to be drafted once data flows for the platform are finalized — this affects what must legally be disclosed.</p>
              <h3>Information We Collect</h3>
              <p>[TBD]</p>
              <h3>How We Use It</h3>
              <p>[TBD]</p>
              <h3>Cookies & Tracking</h3>
              <p>[TBD]</p>
              <h3>Third-Party Services (Platform Integrations)</h3>
              <p>[TBD]</p>
              <h3>Data Retention</h3>
              <p>[TBD]</p>
              <h3>User Rights</h3>
              <p>[TBD]</p>
              <h3>Contact for Privacy Requests</h3>
              <p>[TBD]</p>
            </>
          ) : (
            <>
              <p>This is a placeholder for the Terms of Service. Full text to be drafted alongside pricing/platform terms.</p>
              <h3>Acceptable Use</h3>
              <p>[TBD]</p>
              <h3>Platform Subscription Terms</h3>
              <p>[TBD]</p>
              <h3>Payment & Refunds</h3>
              <p>[TBD]</p>
              <h3>Intellectual Property</h3>
              <p>[TBD]</p>
              <h3>Limitation of Liability</h3>
              <p>[TBD]</p>
              <h3>Termination</h3>
              <p>[TBD]</p>
              <h3>Governing Law</h3>
              <p>[TBD]</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
