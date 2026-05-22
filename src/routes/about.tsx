import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Unmanageable" },
      {
        name: "description",
        content:
          "About Unmanageable and Brent K. Hubert (Clearly Confused) — a personal archive of songs, research, and resources for adults with severe ADHD, written by someone with a documented Amen Clinic ADHD brain scan.",
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
        <h1 className="mt-3 text-5xl md:text-6xl">My name is Brent. This site is the inside of my head, organized.</h1>
        <p className="mt-6 text-xl" style={{ color: "var(--color-text-muted)" }}>
          I'm <strong style={{ color: "var(--color-foreground)" }}>Brent K. Hubert</strong>. I make music as{" "}
          <strong style={{ color: "var(--color-foreground)" }}>Clearly Confused</strong>. I have severe adult ADHD — not the "I lose my keys sometimes"
          version, the version with a <strong style={{ color: "var(--color-foreground)" }}>brain scan from the Amen Clinic</strong> (yeah, Dr. Amen)
          confirming what every day of my life already had.
        </p>
        <p className="mt-5 text-lg" style={{ color: "var(--color-text-muted)" }}>
          I wrote and made every song on this album myself. Not from a producer's chair pretending to know.
          From inside the loop. Each track is one face of this thing — the speed, the shame, the loop, the
          crash, the contradiction. I know each one intimately because I'm still in it.
        </p>
        <p className="mt-5 text-lg" style={{ color: "var(--color-text-muted)" }}>
          The research page exists because the data and my life kept saying the same sentence. The
          "superpower" framing is something I needed to push back on — kindly, but firmly. There's a
          small percentage of us for whom this disorder is genuinely disabling, and calling our hardest
          symptom our greatest strength is one of the loneliest things a stranger can do to us.
        </p>
        <p className="mt-5 text-lg" style={{ color: "var(--color-text-muted)" }}>
          This site is for that small percentage — and for the people in our lives trying to understand
          why willpower keeps not being the answer.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          {
            k: "The album",
            v: "ADHD: Clearly Confused — twelve songs I wrote and made about twelve faces of severe ADHD.",
          },
          {
            k: "The artist",
            v: "Brent K. Hubert, releasing as Clearly Confused. Diagnosed severe — brain scan and all.",
          },
          {
            k: "The home",
            v: "Started as adhd-hub.neocities.org. Now a fuller archive of the songs, research, and resources.",
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
            <p className="mt-2 text-base">{c.v}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 card-surface p-7 max-w-3xl">
        <span className="eyebrow">Get in touch / contribute</span>
        <p className="mt-3 text-lg" style={{ color: "var(--color-text-muted)" }}>
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