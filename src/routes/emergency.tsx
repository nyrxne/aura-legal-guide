import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "In immediate danger? — AURA" },
      {
        name: "description",
        content:
          "Emergency contacts and confidential helplines. If you or someone else is in immediate danger, call your local emergency number first.",
      },
      { property: "og:title", content: "AURA — Get help now" },
      {
        property: "og:description",
        content: "Emergency contacts and confidential helplines.",
      },
    ],
  }),
  component: EmergencyPage,
});

const contacts = [
  {
    region: "India — all-in-one emergency",
    name: "Emergency Response Support System",
    number: "112",
    note: "Single number for police, fire, and ambulance across India.",
  },
  {
    region: "India — police",
    name: "Police",
    number: "100",
  },
  {
    region: "India — women in distress",
    name: "Women Helpline (national)",
    number: "1091",
    note: "Confidential, 24/7. Also dial 181 for the Women Helpline in many states.",
  },
  {
    region: "India — domestic abuse",
    name: "National Commission for Women",
    number: "7827170170",
    note: "WhatsApp number for reporting domestic violence.",
  },
  {
    region: "India — children",
    name: "Childline",
    number: "1098",
    note: "Free, 24/7 help for children in distress.",
  },
  {
    region: "India — mental health",
    name: "iCall (TISS)",
    number: "9152987821",
    note: "Confidential psychosocial support, Mon–Sat, 8am–10pm.",
  },
];

function EmergencyPage() {
  return (
    <section className="container-aura pt-24 pb-32 lg:pt-32">
      <Reveal>
        <Eyebrow number="01" label="Get help now" />
        <h1 className="mt-8 font-display text-5xl sm:text-6xl lg:text-7xl max-w-3xl">
          In immediate danger?
        </h1>
        <p className="mt-8 max-w-2xl text-muted-foreground text-lg leading-relaxed">
          If you or someone else is in immediate danger, call your local
          emergency number first. The numbers below are confidential and free.
        </p>
      </Reveal>

      <div className="mt-12">
        <a
          href="tel:112"
          className="aura-cta inline-flex items-center rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-medium"
        >
          Call 112 (India — all-in-one emergency)
        </a>
      </div>

      <div className="mt-16 grid sm:grid-cols-2 gap-5 max-w-4xl">
        {contacts.map((c) => (
          <div
            key={c.name}
            className="aura-card-hover rounded-2xl border border-hairline bg-surface p-6"
          >
            <div className="eyebrow-accent">{c.region}</div>
            <div className="mt-3 font-display text-xl text-foreground">{c.name}</div>
            <a
              href={`tel:${c.number.replace(/\s+/g, "")}`}
              className="mt-2 inline-block font-display text-2xl text-accent hover:underline underline-offset-4"
            >
              {c.number}
            </a>
            {c.note && (
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {c.note}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 max-w-2xl text-sm text-muted-foreground leading-relaxed">
        <p>
          AURA currently covers Indian law and Indian emergency contacts. If
          you are outside India, please use your local emergency number.
        </p>
        <p className="mt-4">
          Worried someone might see this page on your device? Use the{" "}
          <span className="text-foreground">Quick exit</span> button in the
          header to leave instantly, or{" "}
          <Link to="/" className="text-accent hover:underline underline-offset-4">
            return home
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
