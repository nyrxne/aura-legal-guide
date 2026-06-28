import { useEffect, useState } from "react";

export function FloatingAsk() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <a
      href="#chat"
      className="aura-cta fixed bottom-5 right-5 z-40 md:hidden inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-3 text-sm font-medium shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
      aria-label="Ask AURA"
    >
      <span className="aura-pulse h-2 w-2 rounded-full bg-[#0B1220]" />
      Ask AURA
    </a>
  );
}
