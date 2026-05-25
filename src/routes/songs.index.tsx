import { createFileRoute, Link } from "@tanstack/react-router";
import { SONGS, RECOMMENDED_ORDER, songBySlug, STYLE_LABEL, MOOD_LABEL } from "@/data/songs";
import { SongCard } from "@/components/SongCard";
import { StyleNotice } from "@/components/StyleNotice";

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
  const ordered = RECOMMENDED_ORDER.map((slug) => songBySlug(slug)!).filter(Boolean);
  return (
    <section className="shell py-16 md:py-24">
      <div className="max-w-3xl">
        <span className="eyebrow">The album</span>
        <h1 className="mt-3 text-5xl md:text-6xl">ADHD: Clearly Confused</h1>
        <p className="mt-5 text-xl" style={{ color: "var(--color-text-muted)" }}>
          Twelve songs from inside the thing. Each one carries a different face of severe ADHD —
          the loop, the shame, the speed, the crash, the contradiction. They're not a treatment
          plan. They're not a roadmap. They're the quiet part, said out loud, twelve different
          ways.
        </p>
      </div>

      <div className="mt-10 max-w-3xl">
        <StyleNotice />
      </div>

      {/* Recommended listening order */}
      <div className="mt-14">
        <span className="eyebrow">Recommended listening order</span>
        <h2 className="mt-2 text-3xl">If you want it the way it was actually built.</h2>
        <p className="mt-3 max-w-2xl text-lg" style={{ color: "var(--color-text-muted)" }}>
          The track numbers are one order. This is the one I'd actually play it in — recognition,
          mechanics, spirals, confession, and the Fast Life → Slow Death close. There is no happy
          ending built in. Both things can be true.
        </p>
        <ol className="mt-6 grid gap-2 list-none">
          {ordered.map((s, i) => (
            <li key={s.slug}>
              <Link
                to="/songs/$slug"
                params={{ slug: s.slug }}
                className="card-surface flex items-center gap-4 p-3 px-4 transition-transform hover:-translate-y-0.5"
              >
                <span
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-primary)",
                    minWidth: "2.25rem",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-semibold">{s.title}</span>
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {STYLE_LABEL[s.style]} · {MOOD_LABEL[s.mood]}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16">
        <span className="eyebrow">All tracks · by album number</span>
        <h2 className="mt-2 text-3xl">Or browse them as a grid.</h2>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SONGS.map((s) => (
          <SongCard key={s.slug} song={s} />
        ))}
      </div>
    </section>
  );
}