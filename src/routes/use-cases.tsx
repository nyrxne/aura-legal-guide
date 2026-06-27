import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/use-cases")({
  head: () => ({
    meta: [
      { title: "Use cases — AURA" },
      {
        name: "description",
        content:
          "Common situations where AURA helps: housing, harassment, consumer disputes, filing an FIR, and more.",
      },
      { property: "og:title", content: "Use cases — AURA" },
      {
        property: "og:description",
        content: "Real situations. Real next steps.",
      },
    ],
  }),
  component: UseCases,
});

const cases = [
  {
    n: "01",
    tag: "Campus",
    title: "Harassment & exam disputes",
    body: "When a complaint is ignored, a grade feels unfair, or you're being targeted — know what your institution owes you, and how to escalate safely.",
    sample: "My college isn't acting on my harassment complaint. What can I do?",
  },
  {
    n: "02",
    tag: "Housing",
    title: "Landlord & tenant issues",
    body: "Deposits, repairs, eviction notices, rent increases — your rights as a renter, explained without the jargon.",
    sample: "My landlord won't return my deposit — what can I do?",
  },
  {
    n: "03",
    tag: "Consumer",
    title: "Consumer complaints",
    body: "When a product is faulty, a service is denied, or a refund is refused — know which forum to use and what to bring.",
    sample: "The store refused to refund a defective phone. What are my options?",
  },
  {
    n: "04",
    tag: "Police",
    title: "Theft & filing an FIR",
    body: "How to file a First Information Report, what details to include, what to ask for in writing, and what to keep for your records.",
    sample: "My phone was stolen — how do I file an FIR and what should I write?",
  },
  {
    n: "05",
    tag: "Community",
    title: "Domestic & neighbourhood disputes",
    body: "Quiet, lawful ways to resolve disputes close to home — with a safety-first path if things feel unsafe.",
    sample: "My neighbour is harassing my family. What are our options?",
  },
  {
    n: "06",
    tag: "Workplace",
    title: "Workplace & harassment at work",
    body: "Internal complaints, retaliation, wage issues, and how to keep evidence — for employees and interns alike.",
    sample: "My manager is retaliating after I reported harassment. What now?",
  },
];

function UseCases() {
  return (
    <>
      <section className="container-aura pt-24 pb-20 lg:pt-32">
        <Reveal>
          <Eyebrow number="01" label="Use cases" />
          <h1 className="mt-8 font-display text-5xl sm:text-6xl lg:text-7xl max-w-3xl">
            Real situations.
            <br />
            <span className="text-muted-foreground">Real next steps.</span>
          </h1>
          <p className="mt-8 max-w-xl text-muted-foreground text-lg">
            A few of the everyday situations AURA is built to help with. Each
            one starts with a question, and ends with something you can
            actually do.
          </p>
        </Reveal>
      </section>

      <section className="container-aura pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <Reveal key={c.n} delay={i * 60}>
              <article className="rounded-2xl bg-surface border border-hairline p-8 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl text-accent">{c.n}</span>
                  <span className="eyebrow-accent">{c.tag}</span>
                </div>
                <h2 className="mt-6 font-display text-3xl">{c.title}</h2>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                  {c.body}
                </p>

                <div className="mt-6 rounded-2xl bg-[#0B1220] border border-hairline p-5">
                  <div className="text-[11px] uppercase tracking-widest text-dim mb-2">
                    Sample question
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-surface-elevated border border-hairline px-4 py-3 text-sm">
                    {c.sample}
                  </div>
                </div>

                <a
                  href={`/#chat`}
                  className="mt-6 inline-flex items-center self-start rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
                >
                  Try this with AURA →
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-16 text-xs text-dim max-w-xl">
          AURA provides legal information and guidance, not legal advice. For
          complex situations, please consult a qualified lawyer.
        </p>
      </section>
    </>
  );
}
