import { useEffect, useState } from "react";
import logoAsset from "../assets/aura-logo.png.asset.json";

const SESSION_KEY = "aura.intro.shown";

export function IntroSplash() {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const already = sessionStorage.getItem(SESSION_KEY);
    if (reduced || already) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    setMounted(true);

    const t1 = window.setTimeout(() => setLeaving(true), 1500);
    const t2 = window.setTimeout(() => setMounted(false), 2000);

    const skip = () => {
      setLeaving(true);
      window.setTimeout(() => setMounted(false), 250);
    };
    window.addEventListener("click", skip, { once: true });
    window.addEventListener("touchstart", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("click", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0B1220] transition-opacity duration-500 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4 text-center px-6">
        <div className="flex items-center gap-3 aura-intro-fade">
          <img
            src={logoAsset.url}
            alt=""
            className="h-9 w-auto select-none"
            draggable={false}
          />
          <span className="font-display text-3xl sm:text-4xl tracking-tight">
            AURA
          </span>
        </div>
        <p className="font-display text-lg sm:text-xl text-muted-foreground aura-intro-fade-delayed">
          Know your rights.
        </p>
      </div>
    </div>
  );
}
