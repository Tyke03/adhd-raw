import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { songBySlug, SONGS, nextInOrder, prevInOrder, STYLE_LABEL, MOOD_LABEL, type Song } from "@/data/songs";
import { factById } from "@/data/facts";
import { resourceById } from "@/data/resources";
import { FactCard } from "@/components/FactCard";
import { SongEmbed } from "@/components/SongEmbed";
import { ReactionChips } from "@/components/ReactionChips";
import { ShareButton } from "@/components/ShareButton";
import { HeadBobSob } from "@/components/HeadBobSob";

export const Route = createFileRoute("/songs/$slug")({
  loader: ({ params }) => {
    const song = songBySlug(params.slug);
    if (!song) throw notFound();
    return { song };
  },
  head: ({ loaderData }) => {
    const song = loaderData?.song;
    return {
      meta: song
        ? [
            { title: `${song.title} — Unmanageable` },
            { name: "description", content: song.tagline },
            { property: "og:title", content: `${song.title} — ADHD: Clearly Confused` },
            { property: "og:description", content: song.tagline },
          ]
        : [],
    };
  },
  notFoundComponent: () => (
    <div className="shell py-24">
      <h1 className="text-4xl">Song not found</h1>
      <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
        That track isn't on the album.
      </p>
      <Link to="/songs" className="mt-6 inline-block" style={{ color: "var(--color-primary)" }}>
        ← Back to all songs
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="shell py-24">
      <h1 className="text-2xl">Something broke on this track.</h1>
      <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>{error.message}</p>
      <button onClick={reset} className="mt-4 underline">Try again</button>
    </div>
  ),
  component: SongPage,
});

function SongPage() {
  const { song } = Route.useLoaderData() as { song: Song };
  const related = song.relatedSlugs
    .map((s: string) => SONGS.find((x) => x.slug === s))
    .filter(Boolean) as typeof SONGS;
  const facts = song.factIds.map(factById).filter(Boolean) as NonNullable<ReturnType<typeof factById>>[];
  const resources = song.resourceIds.map(resourceById).filter(Boolean) as NonNullable<ReturnType<typeof resourceById>>[];
  const next = nextInOrder(song.slug);
  const prev = prevInOrder(song.slug);

  return (
    <article className="shell py-16 md:py-20">
      <Link to="/songs" className="text-sm" style={{ color: "var(--color-text-muted)" }}>
        ← All songs
      </Link>

      <header className="mt-6 grid gap-10 md:grid-cols-[1.2fr_0.8fr] items-end">
        <div>
          <span className="eyebrow">Track {String(song.number).padStart(2, "0")} · {song.theme}</span>
          <h1 className="mt-3 text-5xl md:text-6xl">{song.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "color-mix(in oklab, var(--color-primary) 14%, transparent)",
                color: "var(--color-foreground)",
              }}
            >
              {STYLE_LABEL[song.style]}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "var(--color-surface-offset)",
                color: "var(--color-text-muted)",
              }}
            >
              {song.mood === "head-bob-sob" ? <HeadBobSob /> : MOOD_LABEL[song.mood]}
            </span>
            <ShareButton path={`/songs/${song.slug}`} label="Share this song" stop={false} />
          </div>
          <p className="mt-5 text-xl" style={{ color: "var(--color-text-muted)", maxWidth: "44ch" }}>
            {song.tagline}
          </p>
          <blockquote
            className="mt-6 pl-5 text-2xl"
            style={{
              borderLeft: "2px solid var(--color-primary)",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              maxWidth: "40ch",
            }}
          >
            “{song.pull}”
          </blockquote>
        </div>

        <div>
          <SongEmbed song={song} />
        </div>
      </header>

      <section className="mt-16 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="card-surface p-7">
          <span className="eyebrow">What this one is about</span>
          <p className="mt-4 text-lg">{song.description}</p>
        </div>
        <div className="card-surface p-7">
          <span className="eyebrow">React to this track</span>
          <p className="mt-3 mb-5 text-lg" style={{ color: "var(--color-text-muted)" }}>
            Plain "likes" don't fit this material. Tap whatever's true — they save locally for now.
          </p>
          <ReactionChips targetKey={`song:${song.slug}`} />
        </div>
      </section>

      {/* Related facts */}
      {facts.length > 0 && (
        <section className="mt-16">
          <div className="mb-6">
            <span className="eyebrow">The research behind this song</span>
            <h2 className="mt-2 text-3xl">Did you know</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {facts.map((f) => (
              <FactCard key={f.id} fact={f} compact />
            ))}
          </div>
        </section>
      )}

      {/* Sister songs (the interweb) */}
      <section className="mt-16">
        <div className="mb-6">
          <span className="eyebrow">Threads from this track</span>
          <h2 className="mt-2 text-3xl">
            If this one landed, these share a nerve with it.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              to="/songs/$slug"
              params={{ slug: r.slug }}
              className="card-surface p-5 transition-transform hover:-translate-y-0.5"
            >
              <div
                style={{
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--color-primary)",
                }}
              >
                Track {String(r.number).padStart(2, "0")} · {r.theme}
              </div>
              <h3 className="mt-2 text-xl" style={{ fontFamily: "var(--font-display)" }}>
                {r.title}
              </h3>
              <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                {r.tagline}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Resources for this song */}
      {resources.length > 0 && (
        <section className="mt-16">
          <div className="mb-6">
            <span className="eyebrow">If this song is too close to home</span>
            <h2 className="mt-2 text-3xl">Resources for what this track is actually about.</h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {resources.map((r) => (
              <li key={r.id} className="card-surface p-5">
                <div
                  style={{
                    fontSize: "0.72rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--color-primary)",
                  }}
                >
                  {r.kind}
                </div>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {r.name} ↗
                </a>
                <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {r.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Continue the journey */}
      {(next || prev) && (
        <section className="mt-20">
          <div className="mb-6">
            <span className="eyebrow">Keep the journey flowing</span>
            <h2 className="mt-2 text-3xl">Where to go next.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {prev && (
              <Link
                to="/songs/$slug"
                params={{ slug: prev.slug }}
                className="card-surface p-5 transition-transform hover:-translate-y-0.5"
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--color-text-muted)",
                  }}
                >
                  ← Previous in the journey
                </div>
                <h3 className="mt-2 text-xl" style={{ fontFamily: "var(--font-display)" }}>
                  {prev.title}
                </h3>
                <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {prev.tagline}
                </p>
              </Link>
            )}
            {next && (
              <Link
                to="/songs/$slug"
                params={{ slug: next.slug }}
                className="card-surface p-5 transition-transform hover:-translate-y-0.5"
                style={{
                  background: "color-mix(in oklab, var(--color-primary) 10%, var(--color-surface))",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--color-primary)",
                  }}
                >
                  Next in the journey →
                </div>
                <h3 className="mt-2 text-xl" style={{ fontFamily: "var(--font-display)" }}>
                  {next.title}
                </h3>
                <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {next.tagline}
                </p>
              </Link>
            )}
          </div>
        </section>
      )}
    </article>
  );
}