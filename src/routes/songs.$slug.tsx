import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { songBySlug, SONGS } from "@/data/songs";
import { factById } from "@/data/facts";
import { resourceById } from "@/data/resources";
import { FactCard } from "@/components/FactCard";
import { AudioPlayer } from "@/components/AudioPlayer";
import { ReactionChips } from "@/components/ReactionChips";

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
  const { song } = Route.useLoaderData();
  const related = song.relatedSlugs.map((s) => SONGS.find((x) => x.slug === s)).filter(Boolean) as typeof SONGS;
  const facts = song.factIds.map(factById).filter(Boolean) as NonNullable<ReturnType<typeof factById>>[];
  const resources = song.resourceIds.map(resourceById).filter(Boolean) as NonNullable<ReturnType<typeof resourceById>>[];

  return (
    <article className="shell py-16 md:py-20">
      <Link to="/songs" className="text-sm" style={{ color: "var(--color-text-muted)" }}>
        ← All songs
      </Link>

      <header className="mt-6 grid gap-10 md:grid-cols-[1.2fr_0.8fr] items-end">
        <div>
          <span className="eyebrow">Track {String(song.number).padStart(2, "0")} · {song.theme}</span>
          <h1 className="mt-3 text-5xl md:text-6xl">{song.title}</h1>
          <p className="mt-5 text-lg" style={{ color: "var(--color-text-muted)", maxWidth: "44ch" }}>
            {song.tagline}
          </p>
          <blockquote
            className="mt-6 pl-5 text-xl"
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
          {song.available && song.audio ? (
            <AudioPlayer src={song.audio} title={song.title} />
          ) : (
            <div
              className="card-surface p-6"
              style={{ background: "color-mix(in oklab, var(--color-surface-offset) 92%, transparent)" }}
            >
              <span className="eyebrow">Coming soon</span>
              <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
                This track is part of the album but isn't published here yet. The write-up below is the
                full context it lands inside.
              </p>
            </div>
          )}
        </div>
      </header>

      <section className="mt-16 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="card-surface p-7">
          <span className="eyebrow">What this one is about</span>
          <p className="mt-4 text-lg">{song.description}</p>
        </div>
        <div className="card-surface p-7">
          <span className="eyebrow">React to this track</span>
          <p className="mt-3 mb-5" style={{ color: "var(--color-text-muted)" }}>
            Plain "likes" don't fit this material. Pick whatever's true:
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
    </article>
  );
}