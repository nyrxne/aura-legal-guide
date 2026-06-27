import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "../components/Eyebrow";
import { ChatEmbed } from "../components/ChatEmbed";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — AURA" },
      {
        name: "description",
        content:
          "How AURA turns confusion into a clear next step — grounded in verified law, private by design.",
      },
      { property: "og:title", content: "How AURA works" },
      {
        property: "og:description",
        content:
          "Four calm steps, from question to action, with citations you can check.",
      },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  {
    n: "01",
    title: "Tell AURA what happened",
    body: "Type your situation in your own words. No legal terms required. AURA will ask short, gentle follow-ups only when they really matter.",
  },
  {
    n: "02",
    title: "Get a plain-language explanation",
    body: "AURA explains the law that applies and what it means for you — calmly, in everyday language, with citations to the source.",
  },
  {
    n: "03",
    title: "Get a clear next-step plan",
    body: "A short, ordered list of what to do, what to keep, and what to avoid. Each step is something you can actually take.",
  },
  {
    n: "04",
    title: "Reach the right human help",
    body: "When professional help is the right next step, AURA points you to legal aid clinics, helplines, and lawyers in your area.",
  },
];

function HowItWorks() {
  return (
    <>
      <section className="container-aura pt-24 pb-20 lg:pt-32">
        <Reveal>
          <Eyebrow number="01" label="How AURA works" />
          <h1 className="mt-8 font-display text-5xl sm:text-6xl lg:text-7xl max-w-3xl">
            From confusion
            <br />
            <span className="text-muted-foreground">to clear action.</span>
          </h1>
          <p className="mt-8 max-w-xl text-muted-foreground text-lg">
            AURA is built around one idea: legal knowledge should feel like a
            calm conversation, not a wall of jargon.
          </p>
        </Reveal>
      </section>

      <section className="container-aura pb-32">
        <div className="space-y-24 lg:space-y-32">
          {steps.map((s, i) => (
            <Reveal key={s.n}>
              <div
                className={`grid lg:grid-cols-12 gap-10 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-surface border border-hairline p-8 aspect-[4/3] flex items-center justify-center">
                    <div className="w-full space-y-3">
                      <div className="flex justify-end">
                        <div className="rounded-2xl rounded-br-md bg-surface-elevated border border-hairline px-4 py-3 text-xs max-w-[80%]">
                          {s.n === "01"
                            ? "Hi — my deposit hasn't been returned in 6 weeks."
                            : s.n === "02"
                            ? "What does the law say about this?"
                            : s.n === "03"
                            ? "Okay — what should I do first?"
                            : "Is there someone I can talk to?"}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="rounded-2xl rounded-bl-md bg-[#0B1220] border border-hairline px-4 py-3 text-xs max-w-[85%] text-foreground/90">
                          {s.n === "01"
                            ? "Got it. Was the deposit in writing, and do you have any messages about it?"
                            : s.n === "02"
                            ? "Most rental laws give you a clear right to your deposit back within a set window. I'll walk you through it."
                            : s.n === "03"
                            ? "Step 1: send a written request with a deadline. I can help you draft it now."
                            : "Yes — here are two legal aid clinics near you that handle tenant disputes for free."}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="font-display text-5xl text-accent">{s.n}</div>
                  <h2 className="mt-6 font-display text-3xl sm:text-4xl max-w-md">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-muted-foreground max-w-lg leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TRUST + LIMITS */}
      <section className="container-aura py-24">
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="rounded-2xl border border-hairline bg-surface p-10 h-full">
              <Eyebrow number="05" label="Trust & limits" />
              <h3 className="mt-6 font-display text-3xl">
                Grounded in verified law, with citations you can check.
              </h3>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                AURA cites the statutes, rules, or guidance behind every
                answer. It also tells you, plainly, what it can&rsquo;t do —
                including when your case needs a qualified lawyer.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-hairline bg-surface p-10 h-full">
              <Eyebrow number="06" label="Privacy & safety" />
              <h3 className="mt-6 font-display text-3xl">
                Your conversation belongs to you.
              </h3>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                We keep only what&rsquo;s needed to help you. You can delete
                your history at any time, and high-risk situations are routed
                to confidential, qualified support first.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DEMO VIDEO PLACEHOLDER */}
      <section className="container-aura py-20">
        <Reveal>
          <Eyebrow number="07" label="Product walkthrough" />
          <h3 className="mt-6 font-display text-3xl sm:text-4xl max-w-2xl">
            A short walkthrough — coming soon.
          </h3>
        </Reveal>
        <Reveal>
          <div
            className="mt-10 rounded-2xl aspect-video bg-surface border border-hairline relative overflow-hidden shadow-[0_0_60px_-30px_rgba(201,168,92,0.4)]"
            style={{ boxShadow: "0 0 0 1px rgba(201,168,92,0.18), 0 30px 80px -40px rgba(201,168,92,0.25)" }}
          >
            {/* AURA_DEMO_VIDEO_EMBED_START */}
            {/* Drop the demo video embed (mp4 / iframe) here when ready. */}
            {/* AURA_DEMO_VIDEO_EMBED_END */}
            <div className="absolute inset-0 flex items-center justify-center text-dim text-sm">
              Walkthrough video coming soon
            </div>
          </div>
        </Reveal>
      </section>

      {/* CHAT */}
      <section className="container-aura py-24">
        <Reveal>
          <Eyebrow number="08" label="Try it now" />
          <h3 className="mt-6 font-display text-3xl sm:text-4xl max-w-2xl">
            Ask AURA a question — see how it feels.
          </h3>
        </Reveal>
        <div className="mt-10 max-w-2xl">
          <ChatEmbed id="chat" />
        </div>
        <p className="mt-6 text-xs text-dim max-w-xl">
          AURA provides legal information and guidance, not legal advice. For
          complex situations, please consult a qualified lawyer.
        </p>
      </section>
    </>
  );
}
