import { createFileRoute, Link } from "@tanstack/react-router";
import { SONGS } from "@/data/songs";
import { SongCard } from "@/components/SongCard";
import { StyleNotice } from "@/components/StyleNotice";
import { BrainConstellation } from "@/components/BrainConstellation";
import { FACTS } from "@/data/facts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "You know, don't you. — ADHD: Clearly Confused" },
      {
        name: "description",
        content:
          "Twelve songs built from inside severe adult ADHD — not looking back at it from a safe distance, because there is no safe distance. By Brent K. Hubert (Clearly Confused).",
      },
      { property: "og:title", content: "You know, don't you." },
      {
        property: "og:description",
        content:
          "From inside it, to inside it. An album, the research behind it, and a few footholds — not fixes — for severe adult ADHD.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = [
    SONGS.find((s) => s.slug === "you-know")!,
    SONGS.find((s) => s.slug === "i-break-me")!,
    SONGS.find((s) => s.slug === "slow-death-part-2")!,
  ];
  const truth = {
    prison: FACTS.find((f) => f.id === "prison")!,
    sud: FACTS.find((f) => f.id === "sud")!,
  };

  return (
    <>
      {/* Hero */}
      <section className="shell pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] items-end">
          <div>
            <span className="eyebrow mb-5 inline-flex">
              <span aria-hidden="true">●</span> From inside it, to inside it
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl" style={{ maxWidth: "14ch" }}>
              You know, don't you.
            </h1>
            <p className="mt-6 text-xl" style={{ color: "var(--color-text-muted)", maxWidth: "40ch" }}>
              Not "I lose my keys sometimes." Not "I get distracted when I'm bored." The other thing.
              The real one. The one you've never been able to explain to anyone, including yourself,
              even though you understand it better than any doctor ever has.
            </p>
            <blockquote
              className="mt-7 pl-5 text-2xl md:text-3xl"
              style={{
                borderLeft: "2px solid var(--color-primary)",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                maxWidth: "32ch",
                color: "var(--color-foreground)",
              }}
            >
              There is no getting out. I can cope. I can't fix or solve.
            </blockquote>
            <p className="mt-6 text-lg" style={{ color: "var(--color-text-muted)", maxWidth: "44ch" }}>
              This isn't a support group. It isn't a tidy resource hub. It's 12 songs built from
              inside the thing — not looking back at it from a safe distance, because there is no
              safe distance. If one of them lands, that's why.
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
                Hear the songs
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center min-h-12 px-5 rounded-full text-sm font-bold"
                style={{
                  background: "var(--color-surface)",
                  color: "var(--color-foreground)",
                  border: "1px solid color-mix(in oklab, var(--color-foreground) 12%, transparent)",
                }}
              >
                Why this exists
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
            <p className="mt-2 text-base" style={{ color: "var(--color-text-muted)" }}>
              12 songs · by Brent K. Hubert (Clearly Confused) · made at 2am, from inside it
            </p>
            <div className="mt-5 grid gap-3">
              {[
                { l: "Tracks", v: "12 angles on one disorder. No system. No blueprint." },
                { l: "Promise", v: "Recognition, not recovery. Accurate language for what happened to your life." },
                { l: "Voice", v: "Not your champion. Your mirror." },
              ].map((s, i, arr) => (
                <div
                  key={s.l}
                  className="pb-3"
                  style={i === arr.length - 1 ? undefined : { borderBottom: "1px solid var(--color-divider)" }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {s.l}
                  </div>
                  <div className="mt-1 text-lg font-semibold">{s.v}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Brain constellation — all 12 songs as neurons */}
      <section className="shell pb-16">
        <div className="mb-6 max-w-3xl">
          <span className="eyebrow">The album as a brain</span>
          <h2 className="mt-2 text-4xl md:text-5xl">All twelve, wired together.</h2>
          <p className="mt-3 text-lg" style={{ color: "var(--color-text-muted)" }}>
            Each pill is a song. The lines are the threads they share — recognition,
            shame, speed, crash. Hover a neuron to see what's inside it. Click to
            open the song.
          </p>
        </div>
        <BrainConstellation />
      </section>

      {/* Manifesto strip */}
      <section className="shell pb-20">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <article className="card-surface p-7">
            <span className="eyebrow">Why this exists</span>
            <h2 className="mt-3 text-3xl md:text-4xl">
              I'm not your champion. I'm your mirror.
            </h2>
            <p className="mt-4 text-lg" style={{ color: "var(--color-text-muted)" }}>
              I'm not reaching back from the other side of this. There is no other side. I made this
              at 2am because my brain brought me here again, like it does. I'll be running on no sleep
              and burnt out by early afternoon. I have 100 tabs open to build this and can't open one
              email.
            </p>
            <p className="mt-4 text-lg" style={{ color: "var(--color-text-muted)" }}>
              You've been the champion every single day — fighting an impossible thing that knows you
              intimately because it is you. And maybe you've never even been able to say that out loud. So
              I'm not going to call this a superpower. Traditional society's structure is built around linear brains. Neurodivergent brains are essentially fish out of water.
            </p>
          </article>

          <ul className="grid gap-4 list-none">
            {[
              { k: "What this is", v: "Twelve songs, attempting to name what normally eludes verbal description, in my personal \"Head Bob Sob\" (TM pending) genre." },
              { k: "WHAT THIS IS NOT", v: "A movement. A recovery story. A productivity hack. A pep talk." },
              { k: "Who it's for", v: "You! Or not. If you have ADHD or not, you may enjoy some, or all of these songs. But if you have Severe Adult ADHD \"YOU KNOW\" these songs." },
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
                <div className="text-lg">{c.v}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured songs */}
      <section className="shell pb-20">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
          <div>
            <span className="eyebrow">Song first. Explanation second.</span>
            <h2 className="mt-2 text-4xl">Start with one. See if it knows you.</h2>
            <p className="mt-3 text-lg" style={{ color: "var(--color-text-muted)", maxWidth: "52ch" }}>
              I made and love all twelve, each feeling like a piece of my truth, but these three are the ones I'd hand you first — the
              recognition song, the confession, and the closer. If one lands, the rest are waiting.
            </p>
          </div>
          <Link to="/songs" className="text-sm" style={{ color: "var(--color-primary)" }}>
            All 12 tracks →
          </Link>
        </div>
        <div className="mb-6">
          <StyleNotice />
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <SongCard key={s.slug} song={s} />
          ))}
        </div>
      </section>

      {/* The Truth */}
      <section className="shell pb-20">
        <div className="mb-8 max-w-3xl">
          <span className="eyebrow">The truth</span>
          <h2 className="mt-2 text-4xl md:text-5xl">Not shocking stats. Just the quiet part, said out loud.</h2>
          <p className="mt-4 text-lg" style={{ color: "var(--color-text-muted)" }}>
            Three pieces of the picture. The facts are real — but the point isn't the number.
            It's what we keep refusing to call by its name.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="card-surface p-6">
            <h3 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              1 in 4 people in prison.
            </h3>
            <p className="mt-3 text-lg" style={{ color: "var(--color-text-muted)" }}>
              That's where we send a huge number of people with untreated ADHD. Not to doctors. Not
              to support. A cage. Because "can't regulate impulse and emotion without proper brain
              chemistry" is easier for society to read as a moral failure than as a neurological
              impairment.
            </p>
            <p className="mt-3 text-base" style={{ color: "var(--color-foreground)" }}>
              We criminalize symptoms when we refuse to understand what caused them.
            </p>
            <small className="mt-4 block" style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-text-faint)" }}>
              Source · {truth.prison.source}
            </small>
          </article>

          <article className="card-surface p-6">
            <h3 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              Everyone "totally has ADD."
            </h3>
            <p className="mt-3 text-lg" style={{ color: "var(--color-text-muted)" }}>
              People joke they have it because they got bored in a meeting. That is not this. ADHD
              is failing the class you love. The professor telling you that you're one of the
              brightest students he has — while also explaining that you're failing because you
              cannot do the homework.
            </p>
            <p className="mt-3 text-base" style={{ color: "var(--color-foreground)" }}>
              ADHD is not just struggling to do things you hate. It is often failing in the exact
              direction of your greatest strengths.
            </p>
          </article>

          <article className="card-surface p-6">
            <h3 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              Not weak. Self-medicating.
            </h3>
            <p className="mt-3 text-lg" style={{ color: "var(--color-text-muted)" }}>
              Around <strong style={{ color: "var(--color-foreground)" }}>6×</strong> the risk of a
              substance use disorder. Many people with severe ADHD aren't bad-habit addicts. They've
              been managing a dopamine problem since childhood with whatever gave temporary relief:
              substances, chaos, sex, risk, novelty, speed, conflict, crisis, screens.
            </p>
            <p className="mt-3 text-base" style={{ color: "var(--color-foreground)" }}>
              What gets called moral failure is often untreated symptom management.
            </p>
            <small className="mt-4 block" style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-text-faint)" }}>
              Source · {truth.sud.source}
            </small>
          </article>
        </div>

        <div className="mt-6">
          <Link to="/research" className="text-sm" style={{ color: "var(--color-primary)" }}>
            More of the truth →
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
            <h2 className="text-3xl">Not fixes. Footholds.</h2>
            <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
              There are no cures. These are places, people, and frameworks that take adult ADHD
              seriously enough to stop insulting it with lazy explanations.
            </p>
          </div>
          <Link
            to="/resources"
            className="inline-flex items-center justify-center min-h-12 px-5 rounded-full text-sm font-bold"
            style={{ background: "var(--color-primary)", color: "var(--color-primary-foreground)" }}
          >
            See the footholds →
          </Link>
        </div>
      </section>
    </>
  );
}
