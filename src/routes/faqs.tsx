import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "../components/Eyebrow";
import { ChatEmbed } from "../components/ChatEmbed";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — AURA" },
      {
        name: "description",
        content:
          "Honest answers about what AURA does, what it doesn't, how it handles privacy, and what to do in urgent situations.",
      },
      { property: "og:title", content: "AURA — FAQs" },
      {
        property: "og:description",
        content: "Clear answers before you ask.",
      },
    ],
  }),
  component: FAQs,
});

const faqs = [
  {
    q: "Is this legal advice?",
    a: "No. AURA provides legal information and guidance, not legal advice. For complex situations, please consult a qualified lawyer.",
  },
  {
    q: "How accurate is AURA?",
    a: "AURA is grounded in verified legal sources and cites them in its answers. Laws change, and every situation is different — so we encourage you to check the citations and, where needed, confirm with a professional.",
  },
  {
    q: "What if my situation is urgent or unsafe?",
    a: "For high-risk situations like domestic violence, stalking, or immediate danger, AURA leads with emergency contacts and confidential escalation to trusted services before anything else.",
  },
  {
    q: "Is my conversation private?",
    a: "Yes. We collect only what's needed to help you, and you can delete your history at any time. AURA is built to minimize data by default.",
  },
  {
    q: "What languages does AURA support?",
    a: "AURA is built for multilingual use. We're adding more languages with our legal aid and community partners. A visible language switcher appears in the header.",
  },
  {
    q: "Is AURA free to use?",
    a: "Yes — AURA is free for everyday people. We work with NGOs and legal aid partners to keep it that way.",
  },
  {
    q: "What happens if AURA can't help?",
    a: "AURA is transparent about its limits. When a question is outside what it can safely answer, it will say so clearly and point you to someone who can help.",
  },
  {
    q: "How do I talk to a real lawyer?",
    a: "AURA can suggest legal aid clinics, helplines, and qualified lawyers near you, including free options where available. You decide who to contact.",
  },
];

function FAQs() {
  return (
    <>
      <section className="container-aura pt-24 pb-16 lg:pt-32">
        <Reveal>
          <Eyebrow number="01" label="Frequently asked" />
          <h1 className="mt-8 font-display text-5xl sm:text-6xl lg:text-7xl max-w-3xl">
            Clear answers
            <br />
            <span className="text-muted-foreground">before you ask.</span>
          </h1>
        </Reveal>
      </section>

      <section className="container-aura pb-24">
        <div className="max-w-3xl border-y border-hairline divide-y divide-hairline">
          {faqs.map((f, i) => (
            <details key={f.q} className="aura-faq group py-7">
              <summary className="flex items-start justify-between cursor-pointer list-none gap-6">
                <span className="flex items-baseline gap-6">
                  <span className="font-display text-accent text-sm shrink-0 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl sm:text-2xl">
                    {f.q}
                  </span>
                </span>
                <span className="aura-faq-icon text-muted-foreground text-xl shrink-0">
                  +
                </span>
              </summary>
              <p className="mt-5 ml-14 text-muted-foreground leading-relaxed max-w-2xl">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="container-aura py-24">
        <Reveal>
          <div className="rounded-2xl bg-surface border border-hairline p-8 sm:p-10 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <Eyebrow number="09" label="Still have questions?" />
              <h2 className="mt-6 font-display text-3xl sm:text-4xl">
                Ask AURA directly.
              </h2>
              <p className="mt-4 text-muted-foreground text-sm max-w-sm">
                A calm, plain-language answer — and a clear next step, if you
                need one.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ChatEmbed id="chat" />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
