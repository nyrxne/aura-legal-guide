import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — AURA" },
      {
        name: "description",
        content:
          "The terms that apply when you use AURA. Plain language, no surprises.",
      },
      { property: "og:title", content: "AURA — Terms of Use" },
      {
        property: "og:description",
        content: "What you can expect from AURA, and what AURA expects of you.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <section className="container-aura pt-24 pb-32 lg:pt-32">
      <Reveal>
        <Eyebrow number="01" label="Terms" />
        <h1 className="mt-8 font-display text-5xl sm:text-6xl lg:text-7xl max-w-3xl">
          Terms of use
        </h1>
        <p className="mt-6 text-muted-foreground max-w-2xl text-sm">
          Last updated: June 2026
        </p>
      </Reveal>

      <div className="mt-16 max-w-3xl space-y-12 text-muted-foreground leading-relaxed">
        <Section title="What AURA is">
          <p>
            AURA is an AI legal-literacy assistant. It provides legal
            information and general guidance in plain language. AURA currently
            focuses on Indian law. Coverage of more regions is being added
            with legal aid and community partners.
          </p>
        </Section>

        <Section title="What AURA is not">
          <p>
            AURA is not a lawyer and does not provide legal advice. Nothing
            AURA tells you creates a lawyer-client relationship. For decisions
            with legal consequences, please consult a qualified lawyer.
          </p>
        </Section>

        <Section title="Using AURA responsibly">
          <p>
            Please use AURA for your own genuine questions. Do not use it to
            harass others, generate content that could harm a person, or to
            attempt to bypass safety guardrails. We may rate-limit or block
            access where misuse is detected.
          </p>
        </Section>

        <Section title="Availability and changes">
          <p>
            AURA is provided as-is, without warranty. We work to keep it
            available and accurate, but the service can change or be paused
            for maintenance. Laws change, and AURA's responses may not always
            reflect the very latest position.
          </p>
        </Section>

        <Section title="Limitation of liability">
          <p>
            To the extent permitted by law, AURA and its operators are not
            liable for any loss arising from reliance on its responses.
            Always verify with a qualified professional before acting on
            anything material.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about these terms? Email{" "}
            <a
              href="mailto:hello@aura.legal"
              className="text-accent hover:underline underline-offset-4"
            >
              hello@aura.legal
            </a>
            .
          </p>
        </Section>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-foreground">{title}</h2>
      <div className="mt-4 text-sm">{children}</div>
    </div>
  );
}
