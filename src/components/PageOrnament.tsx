import React from 'react';

interface PageOrnamentProps {
  /** Primary vertical word stack, rendered muted/gray */
  words: string[];
  /** Optional secondary vertical word stack, rendered in brand blue */
  words2?: string[];
  className?: string;
}

/**
 * Soft decorative backdrop reused across interior pages: a faded crop of the
 * brand's blue ribbon artwork plus a vertical label stack, echoing the hero.
 * Hidden below lg since it's purely decorative and would just add noise on mobile.
 */
export function PageOrnament({ words, words2, className = '' }: PageOrnamentProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none hidden lg:block ${className}`} aria-hidden="true">
      <div
        className="absolute -top-16 -right-32 w-[850px] h-[850px] opacity-[0.35]"
        style={{
          maskImage: 'radial-gradient(circle at 58% 42%, black 0%, black 32%, transparent 66%)',
          WebkitMaskImage: 'radial-gradient(circle at 58% 42%, black 0%, black 32%, transparent 66%)',
        }}
      >
        <img
          src="/hero-bg.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: '20% 40%', transform: 'scale(1.7)' }}
        />
      </div>

      <div className="absolute top-36 right-14 xl:right-20 flex items-start gap-6 text-[11px] font-bold tracking-[0.25em] uppercase">
        <div className="flex flex-col gap-3 text-[#0A1428]/20">
          {words.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        {words2 && words2.length > 0 && (
          <>
            <div className="w-px self-stretch bg-[#0A1428]/10" />
            <div className="flex flex-col gap-3 text-[#036FDE]/70">
              {words2.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
