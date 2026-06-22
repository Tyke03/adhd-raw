import { Play } from "lucide-react";
import type { Song } from "@/data/songs";

/**
 * Primary audio element for a song.
 * If a Spotify or SoundCloud embed URL is provided on the song, render the
 * official iframe player. Otherwise show a clearly styled "Stream opening
 * soon on Spotify" placeholder with a disabled play button — no broken
 * audio controls are ever shown.
 */
export function SongEmbed({ song, compact = false }: { song: Song; compact?: boolean }) {
  const height = compact ? 152 : 232;

  if (song.spotifyEmbedUrl) {
    return (
      <iframe
        title={`${song.title} — Spotify player`}
        src={song.spotifyEmbedUrl}
        width="100%"
        height={height}
        frameBorder={0}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: 12, display: "block", border: 0 }}
      />
    );
  }

  if (song.soundcloudEmbedUrl) {
    return (
      <iframe
        title={`${song.title} — SoundCloud player`}
        src={song.soundcloudEmbedUrl}
        width="100%"
        height={height}
        frameBorder={0}
        scrolling="no"
        allow="autoplay"
        loading="lazy"
        style={{ borderRadius: 12, display: "block", border: 0 }}
      />
    );
  }

  return (
    <div
      role="group"
      aria-label={`${song.title} — stream not yet available`}
      style={{
        width: "100%",
        height: 152,
        borderRadius: 12,
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--color-primary) 8%, var(--color-surface)), var(--color-surface-offset))",
        border:
          "1px dashed color-mix(in oklab, var(--color-foreground) 18%, transparent)",
        display: "flex",
        alignItems: "center",
        gap: "0.85rem",
        padding: "0 1rem",
      }}
    >
      <button
        type="button"
        disabled
        aria-disabled="true"
        aria-label="Stream not yet available"
        style={{
          width: 44,
          height: 44,
          borderRadius: 999,
          display: "grid",
          placeItems: "center",
          background: "#3a3a44",
          color: "#9a9aa6",
          border: "none",
          cursor: "not-allowed",
          flexShrink: 0,
        }}
      >
        <Play size={18} />
      </button>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            color: "var(--color-foreground)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {song.title}
        </div>
        <div
          style={{
            fontSize: "0.85rem",
            color: "var(--color-text-muted)",
            marginTop: 2,
          }}
        >
          Stream opening soon on Spotify
        </div>
      </div>
    </div>
  );
}
