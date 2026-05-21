import { createFileRoute, Link } from "@tanstack/react-router";
import { SONGS } from "@/data/songs";
import { FACTS } from "@/data/facts";
import { SongCard } from "@/components/SongCard";
import { FactCard } from "@/components/FactCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unmanageable — Severe Adult ADHD by Clearly Confused" },
      {
        name: "description",
        content:
          "An album, the research behind it, and resources for adults whose ADHD is debilitating — not a superpower. Songs, sourced facts, and a community for the people living it.",
      },
      { property: "og:title", content: "Unmanageable — Severe Adult ADHD" },
      {
        property: "og:description",
        content:
          "Twelve songs about severe adult ADHD, paired with the research and resources that explain why this isn't cute chaos.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = SONGS.filter((s) => s.available).slice(0, 3);
  const heroFacts = [FACTS[0], FACTS[3], FACTS[5]]; // prison, lifespan, suicide

  return (
    <>
      {/* Hero */}
      <section className="shell pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] items-end">
          <div>
            <span className="eyebrow mb-5 inline-flex">
              <span aria-hidden="true">●</span> Severe adult ADHD — the kind you don't post about
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl" style={{ maxWidth: "14ch" }}>
              ADHD isn't your superpower. For some of us it's the thing that breaks the day.
            </h1>
            <p className="mt-6 text-lg" style={{ color: "var(--color-text-muted)", maxWidth: "38ch" }}>
              An album, the research, and the resources — for the small percentage of adults whose
              ADHD is severe enough that life is genuinely unmanageable without help.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/songs"
                className="inline-flex items-center justify-center min-h-12 px-5 rounded-full text-sm font-bold"
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-primary-foreground)",
                }}
              >
                Listen to the album
              </Link>
              <Link
                to="/research"
                className="inline-flex items-center justify-center min-h-12 px-5 rounded-full text-sm font-bold"
                style={{
                  background: "var(--color-surface)",
                  color: "var(--color-foreground)",
                  border: "1px solid color-mix(in oklab, var(--color-foreground) 12%, transparent)",
                }}
              >
                See the research
              </Link>
            </div>
          </div>

          <aside
            className="card-surface p-6 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--color-primary) 12%, var(--color-surface)), var(--color-surface))",
            }}
          >
            <span className="eyebrow">The album</span>
            <p className="mt-3 text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              ADHD: Clearly Confused
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
              12 songs · by tyke0303 · 6 available now
            </p>
            <div className="mt-5 grid gap-3">
              {[
                { l: "Tracks", v: "12 perspectives on one disorder" },
                { l: "Theme", v: "No two ADHD brains present the same way" },
                { l: "Tone", v: "Honest. Not inspirational." },
              ].map((s, i, arr) => (
                <div
                  key={s.l}
                  className="pb-3"
                  style={i === arr.length - 1 ? undefined : { borderBottom: "1px solid var(--color-divider)" }}
                >
                  <div
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {s.l}
                  </div>
                  <div className="mt-1 text-base font-semibold">{s.v}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Manifesto strip */}
      <section className="shell pb-20">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <article className="card-surface p-7">
            <span className="eyebrow">Why this site exists</span>
            <h2 className="mt-3 text-3xl md:text-4xl">
              The "superpower" framing is a coping device for people who don't have it bad.
            </h2>
            <p className="mt-4" style={{ color: "var(--color-text-muted)" }}>
              ADHD has over 160,000 possible symptom combinations. For a small percentage of adults, those
              combinations stack into something genuinely disabling — affecting the most fundamental brain
              functions a person uses to manage their own life. Calling that a superpower isn't kindness.
              It's erasure.
            </p>
            <p className="mt-4" style={{ color: "var(--color-text-muted)" }}>
              This site is for the people inside that small percentage, and for the loved ones trying to
              understand why willpower keeps not being the answer.
            </p>
          </article>

          <ul className="grid gap-4 list-none">
            {[
              { k: "What this is", v: "Songs, sourced facts, and a directory of real resources." },
              { k: "What this isn't", v: "A productivity hack site. A diagnosis tool. Inspirational." },
              { k: "Who it's for", v: "Adults with severe ADHD — and the people in their lives." },
            ].map((c) => (
              <li
                key={c.k}
                className="card-surface p-5"
                style={{ background: "color-mix(in oklab, var(--color-surface-offset) 90%, transparent)" }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--color-primary)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {c.k}
                </div>
                <div>{c.v}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured songs */}
      <section className="shell pb-20">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
          <div>
            <span className="eyebrow">Songs available now</span>
            <h2 className="mt-2 text-4xl">Start with one. Stay for the rest.</h2>
          </div>
          <Link to="/songs" className="text-sm" style={{ color: "var(--color-primary)" }}>
            All 12 tracks →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <SongCard key={s.slug} song={s} />
          ))}
        </div>
      </section>

      {/* Did you know cards */}
      <section className="shell pb-20">
        <div className="mb-8">
          <span className="eyebrow">Did you know</span>
          <h2 className="mt-2 text-4xl">Three numbers that should change the conversation.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {heroFacts.map((f) => (
            <FactCard key={f.id} fact={f} />
          ))}
        </div>
        <div className="mt-6">
          <Link to="/research" className="text-sm" style={{ color: "var(--color-primary)" }}>
            See all the data →
          </Link>
        </div>
      </section>

      {/* CTA band */}
      <section className="shell pb-24">
        <div
          className="card-surface p-8 grid gap-4 md:grid-cols-[1fr_auto] items-center"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--color-primary) 16%, var(--color-surface)), color-mix(in oklab, var(--color-accent-blue) 10%, var(--color-surface)))",
          }}
        >
          <div>
            <h2 className="text-3xl">If your ADHD is making your life unmanageable, you are not alone in this.</h2>
            <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
              Real resources, real crisis lines, real research — all curated by someone who has needed them.
            </p>
          </div>
          <Link
            to="/resources"
            className="inline-flex items-center justify-center min-h-12 px-5 rounded-full text-sm font-bold"
            style={{ background: "var(--color-primary)", color: "var(--color-primary-foreground)" }}
          >
            Find help →
          </Link>
        </div>
      </section>
    </>
  );
}
