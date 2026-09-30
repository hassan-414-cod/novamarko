// Full-width autoplaying video banner at the top of the page's card — plays
// start to end and loops continuously. No scroll-tied behavior.
export function HeroVideoLoop() {
  return (
    <video
      className="w-full h-auto block"
      src="/videos/hero-full.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
