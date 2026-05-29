import { createFileRoute } from "@tanstack/react-router";
import { ReactionChips } from "@/components/ReactionChips";
import { ShareButton } from "@/components/ShareButton";

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


export default function CommunityPage() {
  return (
    <section className="shell py-16 md:py-24">
      <div className="max-w-3xl">
        <span className="eyebrow">Community</span>
        <h1 className="mt-3 text-5xl md:text-6xl">Other people in the same room.</h1>
        <p className="mt-5 text-xl" style={{ color: "var(--color-text-muted)" }}>
          No likes. No engagement metrics. No movement to join. Just a few reactions you can leave
          for yourself, a couple of prompts to sit with, and a wall of notes from people who already
          heard themselves in one of the songs.
        </p>
        <p className="mt-3 text-base" style={{ color: "var(--color-text-faint)" }}>
          Open posting is being built. For now this is the tone.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <article className="card-surface p-7">
          <span className="eyebrow">How did this impact you?</span>
          <p className="mt-3 mb-5 text-lg" style={{ color: "var(--color-text-muted)" }}>
            Tap any that are true. They actually count — saved on your device until full posting opens up.
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
        <div className="mb-6 flex items-end justify-between gap-3 flex-wrap">
          <div>
            <span className="eyebrow">Notes wall · under construction</span>
            <h2 className="mt-2 text-3xl">This wall is staying empty on purpose.</h2>
          </div>
          <ShareButton path="/community" label="Share this page" size="md" stop={false} />
        </div>
        <div className="card-surface p-7">
          <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
            I'd rather leave this blank than fake it. Real notes from real listeners will go here
            once open posting is wired up. If something on this site landed for you and you want
            it on the wall, the email signup below is the easiest way to send it in.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { tag: "placeholder", body: "Yeah — that one really hits the mark." },
              { tag: "placeholder", body: "This is actually good stuff." },
            ].map((n, i) => (
              <div
                key={i}
                className="p-5 rounded-lg"
                style={{
                  background:
                    "color-mix(in oklab, var(--color-surface-offset) 70%, transparent)",
                  border:
                    "1px dashed color-mix(in oklab, var(--color-foreground) 18%, transparent)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--color-text-faint)",
                  }}
                >
                  {n.tag}
                </div>
                <blockquote
                  className="mt-2 text-lg"
                  style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
                >
                  “{n.body}”
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}