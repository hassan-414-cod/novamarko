import React from 'react';

interface LogoProps {
  className?: string;
  /**
   * 'stacked' | 'navbar' – the real logo artwork. It sits on an opaque white
   *                        backing, so only use these on white/light backgrounds.
   * 'left'                – text wordmark for dark backgrounds, since the
   *                        artwork's white backing would otherwise render as
   *                        a visible box on navy.
   */
  variant?: 'stacked' | 'left' | 'navbar';
}

export function Logo({ className = 'h-14 md:h-20', variant = 'stacked' }: LogoProps) {
  if (variant === 'left') {
    return (
      <div className={`flex flex-col ${className}`}>
        <span className="font-display font-black tracking-tight text-white leading-none whitespace-nowrap text-2xl md:text-3xl">
          NOVA<span className="text-[#4B9FFF]">MARKO</span>
        </span>
        <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 mt-1.5 whitespace-nowrap">
          BUILD • BRAND • SCALE
        </span>
      </div>
    );
  }

  return (
    <img
      src="/official-logo.png"
      alt="Novamarko Logo"
      className={`w-auto object-contain ${className}`}
    />
  );
}
