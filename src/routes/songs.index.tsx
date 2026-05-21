import { createFileRoute } from "@tanstack/react-router";
import { SONGS } from "@/data/songs";
import { SongCard } from "@/components/SongCard";

export const Route = createFileRoute("/songs/")({
  head: () => ({
    meta: [
      { title: "Songs — ADHD: Clearly Confused | Unmanageable" },
      {
        name: "description",
        content:
          "Twelve songs about severe adult ADHD — each one a different symptom cluster. No two ADHD brains are the same, and neither is this album.",
      },
      { property: "og:title", content: "Songs — ADHD: Clearly Confused" },
      {
        property: "og:description",
        content: "An album about severe adult ADHD. Twelve perspectives on one disorder.",
      },
    ],
  }),
  component: SongsIndex,
});

function SongsIndex() {
  return (
    <section className="shell py-16 md:py-24">
      <div className="max-w-3xl">
        <span className="eyebrow">The album</span>
        <h1 className="mt-3 text-5xl md:text-6xl">ADHD: Clearly Confused</h1>
        <p className="mt-5 text-lg" style={{ color: "var(--color-text-muted)" }}>
          Twelve songs, twelve angles on the same disorder. Each one carries one face of severe ADHD —
          the loop, the shame, the speed, the crash, the contradiction. They're connected the way the
          symptoms are: not in a line, but in a web.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SONGS.map((s) => (
          <SongCard key={s.slug} song={s} />
        ))}
      </div>
    </section>
  );
}