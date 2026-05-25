import { createFileRoute } from "@tanstack/react-router";
import { FACTS } from "@/data/facts";
import { FactCard } from "@/components/FactCard";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — Severe Adult ADHD Statistics | Unmanageable" },
      {
        name: "description",
        content:
          "Sourced statistics on severe adult ADHD: prison overrepresentation, untreated rates, crash risk, suicide, substance use, and lifespan impact.",
      },
      { property: "og:title", content: "Research — Severe Adult ADHD" },
      {
        property: "og:description",
        content: "The numbers behind why ADHD isn't a superpower for a measurable percentage of adults.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <section className="shell py-16 md:py-24">
      <div className="max-w-3xl">
        <span className="eyebrow">The truth</span>
        <h1 className="mt-3 text-5xl md:text-6xl">
          The facts, said the way they actually feel from inside it.
        </h1>
        <p className="mt-5 text-xl" style={{ color: "var(--color-text-muted)" }}>
          These aren't campaign stats. They're the receipts behind the songs. Each one is a number
          plus a sentence we've spent a long time refusing to say out loud. None of them are here
          to shock you. They're here so the right person stops feeling crazy for noticing.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {FACTS.map((f) => (
          <FactCard key={f.id} fact={f} />
        ))}
      </div>

      <div className="mt-12 card-surface p-6 max-w-3xl">
        <span className="eyebrow">A note on sources</span>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          These summarize peer-reviewed literature, CDC/SAMHSA data, and the long-term ADHD outcome
          research from Russell Barkley and colleagues. Specific sources are on each card. Stats
          describe populations, not your individual case. The point isn't the percentage. The point
          is that the pattern is real, and you weren't imagining it.
        </p>
      </div>
    </section>
  );
}