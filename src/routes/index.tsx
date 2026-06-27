import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow } from "../components/Eyebrow";
import { ChatEmbed } from "../components/ChatEmbed";
import { Reveal } from "../components/Reveal";
import { HeroVideo } from "../components/HeroVideo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURA — Know your rights. Take the next step." },
      {
        name: "description",
        content:
          "An empathetic AI legal-literacy assistant. Plain-language guidance and clear next steps for everyday people.",
      },
      { property: "og:title", content: "AURA — Know your rights." },
      {
        property: "og:description",
        content:
          "Calm, clear legal information and safe next steps — built with legal aid partners.",
      },
    ],
  }),
  component: Home,
});

const steps = [
  {
    n: "01",
    title: "Ask your question",
    body: "Tell AURA what happened, in your own words. No legal jargon required.",
  },
  {
    n: "02",
    title: "Get a plain-language explanation",
    body: "AURA explains your rights and the law that applies, with citations you can check.",
  },
  {
    n: "03",
    title: "Get a clear next-step plan",
    body: "A short, ordered list of what you can do — and where to find safe, qualified help.",
  },
];

const useCases = [
  { tag: "Campus", title: "Harassment & exam disputes", body: "What to do when a complaint is ignored or a result feels unfair." },
  { tag: "Housing", title: "Landlord & tenant disputes", body: "Deposits, repairs, eviction notices — your rights as a renter." },
  { tag: "Consumer", title: "Consumer complaints", body: "When a product, service, or refund goes wrong." },
  { tag: "Police", title: "Theft & filing an FIR", body: "How to file a report, what to ask for, and what to keep." },
  { tag: "Community", title: "Domestic & neighbourhood disputes", body: "Quiet, safe ways to resolve disputes close to home." },
];

const faqs = [
  { q: "Is this legal advice?", a: "No. AURA gives legal information and guidance. For complex situations, please consult a qualified lawyer." },
  { q: "Is my conversation private?", a: "Yes. Conversations are minimized by default, and you can delete your history at any time." },
  { q: "What if my situation is urgent or unsafe?", a: "AURA detects high-risk cases and surfaces emergency contacts and confidential escalation options first." },
  { q: "What languages does AURA support?", a: "AURA is built for multilingual use. More languages are being added with legal aid partners." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* AURA_HERO_VIDEO_EMBED_START */}
        <HeroVideo />
        {/* AURA_HERO_VIDEO_EMBED_END */}

        {/* fallback / gradient overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(27,42,64,0.9),#0B1220_70%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,32,0.65)_0%,rgba(11,18,32,0.85)_100%)]"
        />

        <div className="relative container-aura pt-28 pb-32 lg:pt-40 lg:pb-40">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Eyebrow number="01" label="Plain-language guidance" />
              <h1 className="mt-8 font-display text-5xl sm:text-6xl lg:text-7xl">
                Know your rights.
                <br />
                <span className="text-muted-foreground">Take the next step.</span>
                <br />
                Stay safe.
              </h1>
              <p className="mt-8 max-w-xl text-muted-foreground text-lg leading-relaxed">
                AURA is a calm, empathetic AI guide that explains the law in
                plain language — and helps you decide what to do next, with
                confidence.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#chat"
                  className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition"
                >
                  Ask AURA
                </a>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center rounded-full border border-hairline px-6 py-3 text-sm hover:border-accent transition"
                >
                  See how it works
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ChatEmbed id="chat" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-hairline bg-surface/40">
        <div className="container-aura py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {[
            "Built with legal aid partners",
            "Multilingual support",
            "Private by design",
            "Cites verified law",
          ].map((t) => (
            <div key={t} className="flex items-center gap-3 text-muted-foreground">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS PREVIEW */}
      <section className="container-aura py-32 lg:py-40">
        <Reveal>
          <Eyebrow number="02" label="How it works" />
          <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl max-w-3xl">
            Three quiet steps,
            <br />
            from question to clarity.
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <Link
                to="/how-it-works"
                className="block rounded-2xl bg-surface border border-hairline p-8 h-full hover:border-accent transition"
              >
                <div className="font-display text-3xl text-accent">{s.n}</div>
                <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                  {s.body}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* USE CASES PREVIEW */}
      <section className="container-aura py-32">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <Eyebrow number="03" label="Use cases" />
              <h2 className="mt-6 font-display text-4xl sm:text-5xl max-w-2xl">
                Real situations.
                <br />
                Real next steps.
              </h2>
            </div>
            <Link
              to="/use-cases"
              className="text-sm text-accent hover:underline underline-offset-4"
            >
              All use cases →
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((u, i) => (
            <Reveal key={u.title} delay={i * 80}>
              <div className="rounded-2xl bg-surface border border-hairline p-8 h-full flex flex-col">
                <div className="eyebrow-accent">{u.tag}</div>
                <h3 className="mt-5 font-display text-2xl">{u.title}</h3>
                <p className="mt-3 text-muted-foreground text-sm flex-1">{u.body}</p>
                <Link
                  to="/use-cases"
                  className="mt-6 text-sm text-foreground hover:text-accent transition"
                >
                  Learn more →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SAFETY-FIRST CALLOUT */}
      <section className="container-aura py-24">
        <Reveal>
          <div className="rounded-2xl border border-hairline bg-surface p-10 lg:p-14 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="h-14 w-14 rounded-full border border-accent/40 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                  <path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" />
                </svg>
              </div>
            </div>
            <div className="md:col-span-10">
              <Eyebrow number="04" label="Safety first" />
              <h3 className="mt-4 font-display text-3xl sm:text-4xl max-w-2xl">
                If something feels unsafe, AURA changes its tone first.
              </h3>
              <p className="mt-4 text-muted-foreground max-w-2xl">
                For high-risk situations — domestic violence, stalking,
                immediate danger — AURA leads with emergency contacts,
                confidential escalation, and trusted local services before
                anything else.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ TEASER */}
      <section className="container-aura py-32">
        <Reveal>
          <Eyebrow number="05" label="Questions" />
          <h2 className="mt-6 font-display text-4xl sm:text-5xl max-w-2xl">
            Clear answers,
            <br />
            before you ask.
          </h2>
        </Reveal>

        <div className="mt-14 max-w-3xl divide-y divide-hairline border-y border-hairline">
          {faqs.map((f, i) => (
            <details key={f.q} className="group py-6">
              <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
                <span className="flex items-center gap-6">
                  <span className="font-display text-accent text-sm">
                    0{i + 1}
                  </span>
                  <span className="font-display text-xl">{f.q}</span>
                </span>
                <span className="text-muted-foreground group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 ml-12 text-muted-foreground text-sm leading-relaxed max-w-xl">
                {f.a}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-10">
          <Link
            to="/faqs"
            className="text-sm text-accent hover:underline underline-offset-4"
          >
            View all FAQs →
          </Link>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="border-t border-hairline">
        <div className="container-aura py-32 lg:py-40 text-center">
          <Reveal>
            <Eyebrow number="06" label="Talk to AURA" className="justify-center" />
            <h2 className="mt-8 font-display text-5xl sm:text-6xl lg:text-7xl max-w-3xl mx-auto">
              Your rights shouldn&rsquo;t
              <br />
              be a mystery.
            </h2>
            <a
              href="#chat"
              className="mt-12 inline-flex items-center rounded-full bg-accent text-accent-foreground px-8 py-4 text-sm font-medium hover:opacity-90 transition"
            >
              Chat now
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
