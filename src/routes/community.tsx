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

const FEATURED_NOTES = [
  {
    name: "anon",
    tag: "after Shame Keeps Blooming",
    body: "i don't even know what to say. i had to pull over. you put words on the thing i've been apologizing for since like 8 years old.",
  },
  {
    name: "M.",
    tag: "after Slow Death (Part 2)",
    body: "my brother died like this. nobody called it adhd. everyone called him lazy and a screwup. i wish he could've heard this. thank you for not making it a tiktok moment.",
  },
  {
    name: "anon",
    tag: "after Brain On Shuffle",
    body: "lol the part where the brain just won't sit down. that's it. i'm 37 and i finally get it. i'm not broken im just THIS.",
  },
  {
    name: "Devon",
    tag: "after the album",
    body: "i listened all the way through twice. cried during one, head-bobbed during another, paused one bc it was too close. that's the point right? thanks man.",
  },
  {
    name: "anon (sister of)",
    tag: "from a family member",
    body: "i don't have adhd. my brother does. i finally understand why he keeps disappearing and reappearing apologizing. this site is the first thing that didn't make me feel stupid for not getting it.",
  },
  {
    name: "J., late dx",
    tag: "after You Know",
    body: "diagnosed at 42. listened to this last night. i'm not crazy, im not lazy, im not weak. i just needed someone to say it back to me.",
  },
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
            <span className="eyebrow">Notes from readers and listeners</span>
            <h2 className="mt-2 text-3xl">Other people in the same room.</h2>
          </div>
          <ShareButton path="/community" label="Share this page" size="md" stop={false} />
        </div>
        <ul className="grid gap-5 md:grid-cols-2">
          {FEATURED_NOTES.map((n, i) => (
            <li key={i} className="card-surface p-6 relative">
              <div
                style={{
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--color-primary)",
                }}
              >
                {n.tag}
              </div>
              <blockquote
                className="mt-3 text-xl"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                “{n.body}”
              </blockquote>
              <div className="mt-3 text-base" style={{ color: "var(--color-text-muted)" }}>
                — {n.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}