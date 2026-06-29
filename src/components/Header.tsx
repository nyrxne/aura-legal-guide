import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "../assets/aura-logo.png.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/use-cases", label: "Use Cases" },
  { to: "/faqs", label: "FAQs" },
];

function quickExit() {
  try {
    // Clear any visible chat state
    sessionStorage.clear();
    localStorage.removeItem("aura-chat");
  } catch {
    /* ignore */
  }
  // Replace history so back button doesn't return here
  window.location.replace("https://www.google.com");
}

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
            alt="AURA logo"
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

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/emergency"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-red-500/40 text-red-200 hover:text-red-100 hover:border-red-500/70 px-3 py-1.5 text-xs transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            aria-label="In immediate danger? Get help now"
            title="In immediate danger? Get help now"
          >
            <span aria-hidden="true">●</span>
            <span>Get help now</span>
          </Link>

          <button
            type="button"
            onClick={quickExit}
            className="inline-flex items-center rounded-full border border-hairline text-muted-foreground hover:text-foreground hover:border-accent px-3 py-1.5 text-xs transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Quick exit: clear this page and leave to google.com"
            title="Leave this site instantly"
          >
            Quick exit ↗
          </button>

          <a
            href="#chat"
            className="aura-cta hidden sm:inline-flex items-center rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
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
            <Link
              to="/emergency"
              onClick={() => setOpen(false)}
              className="text-base text-red-200 hover:text-red-100 py-1"
            >
              In immediate danger? Get help now →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
