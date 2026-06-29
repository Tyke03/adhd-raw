import { createFileRoute } from "@tanstack/react-router";
import { RESOURCES } from "@/data/resources";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Severe Adult ADHD Help | Unmanageable" },
      {
        name: "description",
        content:
          "Crisis lines, advocacy groups, and trustworthy ADHD education — curated for adults dealing with severe, debilitating ADHD.",
      },
      { property: "og:title", content: "Resources for severe adult ADHD" },
      {
        property: "og:description",
        content: "Crisis help, advocacy, and evidence-based education for adults with severe ADHD.",
      },
      { property: "og:url", content: "https://unmanageable.lovable.app/resources" },
    ],
    links: [{ rel: "canonical", href: "https://unmanageable.lovable.app/resources" }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const crisis = RESOURCES.filter((r) => r.kind.toLowerCase().includes("crisis"));
  const rest = RESOURCES.filter((r) => !r.kind.toLowerCase().includes("crisis"));
  return (
    <section className="shell py-16 md:py-24">
      <div className="max-w-3xl">
        <span className="eyebrow">Resources</span>
        <h1 className="mt-3 text-5xl md:text-6xl">Footholds: Severe Adult ADHD Resources</h1>
        <p className="mt-5 text-xl" style={{ color: "var(--color-text-muted)" }}>
          These are not cures. There are no cures. These are places, people, and frameworks that
          take adult ADHD seriously enough to stop insulting it with lazy explanations. Crisis
          support first. Then the rest. Nothing here paid to be on the list.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl">Crisis support</h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {crisis.map((r) => (
            <li
              key={r.id}
              className="card-surface p-6"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in oklab, var(--color-primary) 10%, var(--color-surface)), var(--color-surface))",
              }}
            >
              <span className="badge-pill">{r.kind}</span>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-2xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {r.name} ↗
              </a>
              <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>{r.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl">Advocacy, education, and tools</h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((r) => (
            <li key={r.id} className="card-surface p-6">
              <span
                style={{
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--color-primary)",
                }}
              >
                {r.kind}
              </span>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {r.name} ↗
              </a>
              <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>{r.description}</p>
              <p className="mt-3 text-xs" style={{ color: "var(--color-text-faint)" }}>
                For: {r.audience}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}