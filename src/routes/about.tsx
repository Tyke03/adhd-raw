import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Unmanageable" },
      {
        name: "description",
        content:
          "About Unmanageable and Clearly Confused (tyke0303) — a personal archive of songs, research, and resources for adults with severe ADHD.",
      },
      { property: "og:title", content: "About — Unmanageable" },
      {
        property: "og:description",
        content: "Who built this site and why severe adult ADHD needs its own honest space.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="shell py-16 md:py-24">
      <div className="max-w-2xl">
        <span className="eyebrow">About</span>
        <h1 className="mt-3 text-5xl md:text-6xl">Built by someone inside it.</h1>
        <p className="mt-6 text-lg" style={{ color: "var(--color-text-muted)" }}>
          This site is a personal archive. The songs are by <strong style={{ color: "var(--color-foreground)" }}>Clearly Confused</strong> (tyke0303),
          and they're about what severe adult ADHD actually feels like from the inside — not the
          version that fits on a poster.
        </p>
        <p className="mt-4" style={{ color: "var(--color-text-muted)" }}>
          The research and resource pages exist because lived experience and data say the same thing
          when you let them. The "superpower" narrative was built by and for people who never had it
          bad enough to know better. There's a population for whom this disorder is genuinely
          disabling. This is for them.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          {
            k: "The album",
            v: "ADHD: Clearly Confused — twelve songs, each a different face of the disorder.",
          },
          {
            k: "The artist",
            v: "Clearly Confused (tyke0303). Writing from inside severe ADHD, not about it from a distance.",
          },
          {
            k: "The home",
            v: "Originally adhd-hub.neocities.org — rebuilt here as a fuller archive and resource site.",
          },
        ].map((c) => (
          <article key={c.k} className="card-surface p-6">
            <div
              style={{
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--color-primary)",
              }}
            >
              {c.k}
            </div>
            <p className="mt-2">{c.v}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 card-surface p-7 max-w-3xl">
        <span className="eyebrow">Get in touch / contribute</span>
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          The community page is still opening up. If you want to share a note, suggest a resource,
          or just tell me which song hit hardest — that channel is being built next. For now,{" "}
          <Link to="/community" style={{ color: "var(--color-primary)" }}>
            see the community draft
          </Link>{" "}
          for the tone.
        </p>
      </div>
    </section>
  );
}