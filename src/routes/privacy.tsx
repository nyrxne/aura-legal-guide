import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AURA" },
      {
        name: "description",
        content:
          "How AURA collects, uses, retains, and deletes your information. Private by design.",
      },
      { property: "og:title", content: "AURA — Privacy Policy" },
      {
        property: "og:description",
        content: "How AURA handles your data — plainly explained.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <section className="container-aura pt-24 pb-32 lg:pt-32">
      <Reveal>
        <Eyebrow number="01" label="Privacy" />
        <h1 className="mt-8 font-display text-5xl sm:text-6xl lg:text-7xl max-w-3xl">
          Privacy policy
        </h1>
        <p className="mt-6 text-muted-foreground max-w-2xl text-sm">
          Last updated: June 2026
        </p>
      </Reveal>

      <div className="mt-16 max-w-3xl space-y-12 text-muted-foreground leading-relaxed">
        <Section title="What we collect">
          <p>
            AURA collects only what is needed to answer your question. That
            means the text of the questions you send, the responses AURA
            generates, and basic technical information your browser sends with
            any web request (such as approximate region and device type) for
            reliability and abuse prevention. AURA does not ask for your name,
            address, identity documents, or contact details.
          </p>
        </Section>

        <Section title="How we use it">
          <p>
            Your messages are sent to our backend to generate a response, and
            to improve the quality and safety of the assistant over time. We
            do not sell your data, run advertising, or share it with third
            parties for marketing.
          </p>
        </Section>

        <Section title="How long we keep it">
          <p>
            Conversations are minimized by default. Where logs are retained
            for safety review or model improvement, they are kept for no
            longer than 90 days and are aggregated or de-identified where
            possible.
          </p>
        </Section>

        <Section title="Deleting your data">
          <p>
            You can request deletion of any data associated with your
            conversations by emailing{" "}
            <a
              href="mailto:privacy@aura.legal"
              className="text-accent hover:underline underline-offset-4"
            >
              privacy@aura.legal
            </a>
            . We will respond within 30 days.
          </p>
        </Section>

        <Section title="Children">
          <p>
            AURA is intended for use by people aged 16 and over. If you
            believe a child has shared personal information with AURA, please
            contact us and we will delete it.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If we change this policy, we will update the date at the top of
            this page and, where appropriate, notify users from the homepage.
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
