import { Link } from "@tanstack/react-router";
import logoAsset from "../assets/aura-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-hairline mt-32">
      <div className="container-aura py-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <img
                src={logoAsset.url}
                alt=""
                aria-hidden="true"
                className="h-6 w-auto sm:h-7 select-none"
                draggable={false}
              />
              <div className="font-display text-2xl leading-none">AURA</div>
            </div>
            <p className="mt-4 text-muted-foreground max-w-sm text-sm leading-relaxed">
              A calm, plain-language guide to your legal rights — built with
              legal aid partners, private by design.
            </p>
            <p className="mt-6 text-dim text-xs leading-relaxed max-w-md">
              AURA provides legal information and guidance, not legal advice.
              For complex situations, please consult a qualified lawyer.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-4">Quick links</div>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/how-it-works", label: "How It Works" },
                { to: "/use-cases", label: "Use Cases" },
                { to: "/faqs", label: "FAQs" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-4">Contact</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:hello@aura.legal" className="hover:text-foreground">
                  hello@aura.legal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Partner with us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-hairline flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-dim text-xs">
            © {new Date().getFullYear()} AURA. All rights reserved.
          </p>
          <a
            href="#top"
            className="text-xs text-muted-foreground hover:text-foreground tracking-wide uppercase"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
