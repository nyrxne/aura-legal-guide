import { useEffect, useRef, useState } from "react";
import heroVideo from "../assets/hero-loop.mp4.asset.json";
import posterUrl from "../assets/hero-poster.jpg";

export function HeroVideo() {
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lazy-load video after first paint so it doesn't block initial render
  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => setShouldLoad(true), 250);
    return () => window.clearTimeout(t);
  }, [reduced]);

  const handlePlay = () => {
    setShouldLoad(true);
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  };

  return (
    <>
      {/* poster always painted as background — prevents blank flash */}
      <img
        src={posterUrl}
        alt="Soft abstract navy and gold motion artwork — AURA's calm visual signature"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        width={1600}
        height={900}
      />

      {!reduced && shouldLoad && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterUrl}
          aria-hidden="true"
        >
          <source src={heroVideo.url} type="video/mp4" />
        </video>
      )}

      {reduced && !playing && (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-hairline bg-[#0B1220]/80 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Play background video"
        >
          <span className="inline-block h-0 w-0 border-y-[5px] border-y-transparent border-l-[7px] border-l-accent" />
          Play background
        </button>
      )}
    </>
  );
}
