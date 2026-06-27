import { useEffect, useRef, useState } from "react";
import heroVideo from "../assets/hero-loop.mp4.asset.json";

export function HeroVideo() {
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) setPlaying(false);
    const onChange = (e: MediaQueryListEvent) => {
      setReduced(e.matches);
      if (e.matches) setPlaying(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handlePlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  };

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload={reduced ? "metadata" : "auto"}
        aria-hidden="true"
      >
        <source src={heroVideo.url} type="video/mp4" />
      </video>
      {reduced && !playing && (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-hairline bg-[#0B1220]/80 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          aria-label="Play background video"
        >
          <span className="inline-block h-0 w-0 border-y-[5px] border-y-transparent border-l-[7px] border-l-accent" />
          Play background
        </button>
      )}
    </>
  );
}
