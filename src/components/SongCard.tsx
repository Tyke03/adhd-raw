import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { STYLE_LABEL, type Song } from "@/data/songs";
import { ShareButton } from "@/components/ShareButton";
import { HeadBobSob } from "@/components/HeadBobSob";

export function SongCard({ song }: { song: Song }) {
  const moodIsHBS = song.mood === "head-bob-sob";

  return (
    <article
      className="card-surface flex flex-col p-6"
      style={{ textDecoration: "none" }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="text-xs"
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "var(--color-text-faint)",
          }}
        >
          Track {String(song.number).padStart(2, "0")}
        </span>
        <ShareButton path={`/songs/${song.slug}`} />
      </div>

      {/* 1. Title — largest, top */}
      <h3
        className="mt-2 text-2xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <Link
          to="/songs/$slug"
          params={{ slug: song.slug }}
          style={{ color: "var(--color-foreground)", textDecoration: "none" }}
        >
          {song.title}
        </Link>
      </h3>

      {/* 2. Genre / mood tags */}
      <div className="mt-3 flex flex-wrap gap-2">
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
          {moodIsHBS ? <HeadBobSob /> : song.mood === "soft" ? "Soft" : "Raw"}
        </span>
      </div>

      {/* 3. Short descriptor + lyric snippet */}
      <p className="mt-3 text-base" style={{ color: "var(--color-text-muted)" }}>
        {song.tagline}
      </p>
      <blockquote
        className="mt-4 pl-4 text-lg"
        style={{
          borderLeft: "2px solid var(--color-primary)",
          color: "var(--color-foreground)",
          fontStyle: "italic",
        }}
      >
        “{song.pull}”
      </blockquote>

      {/* 4. Listen button anchored at bottom — full-width on mobile */}
      <div className="mt-auto pt-5">
        <Link
          to="/songs/$slug"
          params={{ slug: song.slug }}
          className="inline-flex items-center justify-center gap-2 min-h-12 px-5 rounded-full text-sm font-bold w-full sm:w-auto"
          style={{
            background: song.available
              ? "var(--color-primary)"
              : "var(--color-surface-offset)",
            color: song.available
              ? "var(--color-primary-foreground)"
              : "var(--color-text-faint)",
            textDecoration: "none",
          }}
          aria-label={`Listen to ${song.title}`}
        >
          <Play size={15} />
          {song.available ? "Listen" : "Coming soon"}
        </Link>
      </div>
    </article>
  );
}
