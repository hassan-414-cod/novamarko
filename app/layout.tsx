import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JellyfishBackground } from '@/components/JellyfishBackground';
import { CursorFollower } from '@/components/CursorFollower';

export const metadata: Metadata = {
  title: 'Nova Marko | Build. Brand. Scale.',
  description:
    'Nova Marko is a digital studio helping ambitious businesses design, build and scale through strategy, technology and performance marketing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen selection:bg-[#036FDE]/20 selection:text-[#0A1428]">
          <JellyfishBackground />
          <CursorFollower />
          <Navbar />

          {/* Card shell: every page sits inset from the viewport edges, the
              animated blue backdrop showing through the margin around it. */}
          <div className="relative z-10 px-3 sm:px-4 md:px-6 lg:px-10 xl:px-14 pb-3 sm:pb-4 md:pb-6 lg:pb-10 xl:pb-14 pt-2 sm:pt-2 md:pt-3 lg:pt-5 xl:pt-6">
            <div className="mx-auto max-w-[1680px] min-h-[calc(100dvh-1.25rem)] sm:min-h-[calc(100dvh-1.5rem)] md:min-h-[calc(100dvh-2.25rem)] lg:min-h-[calc(100dvh-3.75rem)] xl:min-h-[calc(100dvh-5rem)] flex flex-col rounded-[1.75rem] md:rounded-[2.5rem] overflow-hidden bg-[#F7FAFC] shadow-[0_40px_100px_-20px_rgba(2,20,60,0.55)]">
              <main className="flex-1 w-full">{children}</main>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
