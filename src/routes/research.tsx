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
        <span className="eyebrow">Research</span>
        <h1 className="mt-3 text-5xl md:text-6xl">
          When you stack the numbers, "superpower" stops being a kindness.
        </h1>
        <p className="mt-5 text-lg" style={{ color: "var(--color-text-muted)" }}>
          Each card pairs one hard stat with one sharp reading of what it means. Treat them as
          interruptions, not background facts. They're the receipts behind every song on this album.
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
          Citations here summarize peer-reviewed literature, CDC/SAMHSA data, and the long-term ADHD
          outcome research from Russell Barkley and colleagues. Specific papers are listed on each card.
          When in doubt, talk to a clinician — these stats describe populations, not your individual case.
        </p>
      </div>
    </section>
  );
}