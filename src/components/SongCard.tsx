import { Link } from "@tanstack/react-router";
import { STYLE_LABEL, MOOD_LABEL, type Song } from "@/data/songs";

export function SongCard({ song }: { song: Song }) {
  return (
    <Link
      to="/songs/$slug"
      params={{ slug: song.slug }}
      className="card-surface block p-6 transition-transform hover:-translate-y-0.5"
      style={{ textDecoration: "none" }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="text-xs"
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "var(--color-text-muted)",
          }}
        >
          Track {String(song.number).padStart(2, "0")} · {song.theme}
        </span>
        <span className="badge-pill" style={song.available ? undefined : {
          background: "var(--color-surface-offset)",
          color: "var(--color-text-faint)",
          borderColor: "transparent",
        }}>
          {song.available ? "Listen" : "Coming soon"}
        </span>
      </div>
      <h3 className="mt-3 text-2xl" style={{ fontFamily: "var(--font-display)" }}>
        {song.title}
      </h3>
      <div className="mt-2 flex flex-wrap gap-2">
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
          {MOOD_LABEL[song.mood]}
        </span>
      </div>
      <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
        {song.tagline}
      </p>
      <blockquote
        className="mt-4 pl-4"
        style={{
          borderLeft: "2px solid var(--color-primary)",
          color: "var(--color-foreground)",
          fontStyle: "italic",
        }}
      >
        “{song.pull}”
      </blockquote>
    </Link>
  );
}