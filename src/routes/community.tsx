import { createFileRoute } from "@tanstack/react-router";
import { ReactionChips } from "@/components/ReactionChips";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Unmanageable" },
      {
        name: "description",
        content:
          "Reader reflections and reaction chips for the people living with severe adult ADHD. A quiet, honest community space.",
      },
      { property: "og:title", content: "Community — Unmanageable" },
      {
        property: "og:description",
        content: "Reflections from readers and listeners with severe adult ADHD.",
      },
    ],
  }),
  component: CommunityPage,
});

const PROMPTS = [
  "What part of this album felt most familiar?",
  "What do people misunderstand most about your ADHD?",
  "What's one thing that finally helped — even a little?",
  "What's the loop you can't seem to get out of?",
];

const FEATURED_NOTES = [
  {
    name: "anonymous",
    tag: "after Shame Keeps Blooming",
    body: "I'm 34 and I've never heard anyone describe the layered apology I've been doing since I was a kid. I cried in a parking lot. Thank you.",
  },
  {
    name: "K., 41",
    tag: "after Slow Death (Part 2)",
    body: "My brother died from the slow version of this. Untreated, self-medicated, alone. People kept calling him irresponsible. He was sick. This song knows that.",
  },
  {
    name: "anonymous",
    tag: "after I Break Me",
    body: "The line 'nobody ruined this, I just got there first' has been in my head for three days. I'm finally calling someone.",
  },
  {
    name: "Devon",
    tag: "after Glitch Cycle",
    body: "Day six of starting over for the last time — I have this written on a sticky note above my desk now. Solidarity.",
  },
];

export default function CommunityPage() {
  return (
    <section className="shell py-16 md:py-24">
      <div className="max-w-3xl">
        <span className="eyebrow">Community</span>
        <h1 className="mt-3 text-5xl md:text-6xl">A quieter kind of community.</h1>
        <p className="mt-5 text-lg" style={{ color: "var(--color-text-muted)" }}>
          No likes. No engagement metrics. Just emotionally specific reactions, a few prompts, and a
          curated wall of notes from people who recognize themselves in the album.
        </p>
        <p className="mt-3 text-sm" style={{ color: "var(--color-text-faint)" }}>
          Full posting is opening in a future update. For now this page is a working draft of the tone.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <article className="card-surface p-7">
          <span className="eyebrow">React to the project as a whole</span>
          <p className="mt-3 mb-5" style={{ color: "var(--color-text-muted)" }}>
            Click what's true. (Saved locally — nothing leaves your device yet.)
          </p>
          <ReactionChips targetKey="site:overall" />
        </article>

        <article className="card-surface p-7">
          <span className="eyebrow">Prompts to sit with</span>
          <ul className="mt-4 grid gap-3 list-none">
            {PROMPTS.map((p) => (
              <li
                key={p}
                className="p-4 rounded-lg"
                style={{
                  background: "color-mix(in oklab, var(--color-surface-offset) 92%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--color-foreground) 8%, transparent)",
                }}
              >
                {p}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="mt-16">
        <div className="mb-6">
          <span className="eyebrow">Featured notes</span>
          <h2 className="mt-2 text-3xl">From readers and listeners.</h2>
        </div>
        <ul className="grid gap-5 md:grid-cols-2">
          {FEATURED_NOTES.map((n, i) => (
            <li key={i} className="card-surface p-6">
              <div
                style={{
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--color-primary)",
                }}
              >
                {n.tag}
              </div>
              <blockquote
                className="mt-3 text-lg"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                “{n.body}”
              </blockquote>
              <div className="mt-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
                — {n.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}