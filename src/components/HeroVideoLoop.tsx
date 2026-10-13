'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Full-width autoplaying video banner at the top of the page's card — plays
// start to end and loops continuously, with its own audio audible.
//
// Browsers block autoplay-with-sound until the user has interacted with the
// page, so there's no way to guarantee sound from the very first frame. We
// try unmuted first; if the browser rejects that, we fall back to muted
// autoplay (so the loop still always plays) and show a small toggle the
// user can tap once to turn the sound on.
export function HeroVideoLoop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Autoplay-with-sound was blocked — fall back to muted so the loop
        // still plays, and surface a toggle so the user can opt into sound.
        video.muted = true;
        setMuted(true);
        setShowToggle(true);
        video.play().catch(() => {});
      });
    }
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
  };

  return (
    <div className="relative w-full">
      <video
        ref={videoRef}
        className="w-full h-auto block"
        src="/videos/hero-full.mp4"
        loop
        playsInline
        preload="auto"
      />
      {showToggle && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          data-cursor-hover
          className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-11 h-11 rounded-full bg-[#0A1428]/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#0A1428]/80 transition-colors"
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
    </div>
  );
}
