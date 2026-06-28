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
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="AURA home">
          <img
            src={logoAsset.url}
            alt=""
            aria-hidden="true"
            className="h-7 w-auto sm:h-8 select-none"
            draggable={false}
          />
          <span className="font-display text-xl tracking-tight text-foreground leading-none">
            AURA
          </span>
          <span className="text-[10px] text-dim tracking-[0.2em] uppercase leading-none mt-1">
            ®
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="aura-nav-link text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span
            className="hidden sm:inline-flex items-center text-xs text-dim tracking-wide cursor-default select-none"
            title="More languages coming soon"
            aria-label="Language: English. More languages coming soon."
          >
            EN <span className="ml-1.5 text-[9px] uppercase tracking-widest text-dim/80">Soon</span>
          </span>
          <a
            href="#chat"
            className="aura-cta inline-flex items-center rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
          >
            Chat now
          </a>
          <button
            className="md:hidden text-foreground p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
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
