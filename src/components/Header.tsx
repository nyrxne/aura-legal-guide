import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "../assets/aura-logo.png.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/use-cases", label: "Use Cases" },
  { to: "/faqs", label: "FAQs" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1220]/90 backdrop-blur border-b border-hairline"
          : "bg-transparent"
      }`}
    >
      <div className="container-aura flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-xl tracking-tight text-foreground">
            AURA
          </span>
          <span className="text-[10px] text-dim tracking-[0.2em] uppercase mt-1">
            ®
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="hidden sm:inline-flex text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            aria-label="Language"
          >
            EN <span className="ml-1 text-dim">▾</span>
          </button>
          <a
            href="#chat"
            className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
          >
            Chat now
          </a>
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <div className="w-5 h-px bg-foreground mb-1.5" />
            <div className="w-5 h-px bg-foreground" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-hairline bg-[#0B1220]">
          <div className="container-aura py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-base text-muted-foreground hover:text-foreground py-1"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
