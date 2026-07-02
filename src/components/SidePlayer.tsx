import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SONGS, RECOMMENDED_ORDER, songBySlug, type Song } from "@/data/songs";

const ORDERED: Song[] = RECOMMENDED_ORDER
  .map((s) => songBySlug(s))
  .filter((s): s is Song => !!s);

export function SidePlayer() {
  const [open, setOpen] = useState(false);
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const current = currentSlug ? songBySlug(currentSlug) : null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !current?.audioUrl) return;
    audio.src = current.audioUrl;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [current?.audioUrl]);

  function playSong(slug: string) {
    if (slug === currentSlug && audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
      }
      return;
    }
    setCurrentSlug(slug);
  }

  function onEnded() {
    if (!currentSlug) return;
    const i = ORDERED.findIndex((s) => s.slug === currentSlug);
    const next = ORDERED[i + 1];
    if (next) setCurrentSlug(next.slug);
    else setPlaying(false);
  }

  return (
    <>
      {/* Edge tab trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close song player" : "Open song player"}
        className="sp-tab"
        style={{
          position: "fixed",
          top: "50%",
          right: open ? "min(22rem, calc(100vw - 2rem))" : 0,
          transform: "translateY(-50%)",
          zIndex: 61,
          border: "none",
          cursor: "pointer",
          padding: "0.9rem 0.4rem",
          borderTopLeftRadius: 14,
          borderBottomLeftRadius: 14,
          color: "var(--color-foreground)",
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: "0.7rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          writingMode: "vertical-rl",
          transition: "right 260ms ease",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <span aria-hidden="true" style={{ fontSize: "0.85rem", transform: "rotate(180deg)" }}>
          {open ? "›" : "‹"}
        </span>
        {open ? "Hide" : "Songs"}
      </button>

      {/* Panel */}
      <aside
        aria-label="Song quick player"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100dvh",
          width: "min(22rem, 100vw)",
          zIndex: 60,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 280ms ease",
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--color-primary) 8%, var(--color-surface)), var(--color-surface))",
          borderLeft: "1px solid color-mix(in oklab, var(--color-foreground) 14%, transparent)",
          boxShadow: "-16px 0 40px -20px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "1rem 1.1rem 0.6rem" }}>
          <span className="eyebrow" style={{ fontSize: "0.7rem" }}>Quick player</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: 700,
              margin: "0.15rem 0 0.15rem",
            }}
          >
            All 12 songs
          </h2>
          <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", margin: 0 }}>
            Not every song is for every person. Tap any track to hear it here.
          </p>
        </div>

        <ol
          style={{
            flex: 1,
            overflowY: "auto",
            listStyle: "none",
            padding: "0.6rem 0.6rem 1rem",
            margin: 0,
          }}
        >
          {ORDERED.map((s, i) => {
            const isCurrent = s.slug === currentSlug;
            return (
              <li key={s.slug} style={{ marginBottom: 4 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.55rem 0.6rem",
                    borderRadius: 10,
                    background: isCurrent
                      ? "color-mix(in oklab, var(--color-primary) 22%, transparent)"
                      : "transparent",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => playSong(s.slug)}
                    aria-label={isCurrent && playing ? `Pause ${s.title}` : `Play ${s.title}`}
                    style={{
                      flexShrink: 0,
                      width: 34,
                      height: 34,
                      borderRadius: 999,
                      border: "none",
                      cursor: "pointer",
                      background: "var(--color-primary)",
                      color: "var(--color-primary-foreground, #fff)",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "0.9rem",
                    }}
                  >
                    {isCurrent && playing ? "❚❚" : "▶"}
                  </button>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <span style={{ color: "var(--color-text-faint)", marginRight: 6 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--color-text-muted)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {s.theme}
                    </div>
                  </div>
                  <Link
                    to="/songs/$slug"
                    params={{ slug: s.slug }}
                    onClick={() => setOpen(false)}
                    aria-label={`Open ${s.title} page`}
                    style={{
                      flexShrink: 0,
                      fontSize: "0.7rem",
                      color: "var(--color-text-muted)",
                      textDecoration: "none",
                      padding: "0.2rem 0.35rem",
                    }}
                  >
                    open ↗
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Now-playing bar */}
        <div
          style={{
            borderTop: "1px solid color-mix(in oklab, var(--color-foreground) 12%, transparent)",
            padding: "0.7rem 0.9rem 0.9rem",
            background: "color-mix(in oklab, var(--color-background) 60%, transparent)",
          }}
        >
          {current ? (
            <>
              <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>Now playing</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 6 }}>
                {current.title}
              </div>
            </>
          ) : (
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: 6 }}>
              Pick a track to start.
            </div>
          )}
          <audio
            ref={audioRef}
            controls
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={onEnded}
            style={{ width: "100%" }}
          />
        </div>
      </aside>

      <style>{`
        .sp-tab {
          background: linear-gradient(135deg,
            color-mix(in oklab, var(--color-primary) 92%, white),
            color-mix(in oklab, var(--color-primary) 70%, black));
          box-shadow: -4px 0 18px -6px color-mix(in oklab, var(--color-primary) 70%, transparent);
        }
        .sp-tab:hover { filter: brightness(1.08); }
      `}</style>
    </>
  );
}
