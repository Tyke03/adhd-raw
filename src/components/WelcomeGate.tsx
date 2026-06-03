import { useEffect, useState } from "react";
import { Play, VolumeX } from "lucide-react";
import { usePlayer } from "@/components/player/PlayerProvider";

const SS_KEY = "welcome:dismissed";

export function WelcomeGate() {
  const player = usePlayer();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(SS_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(SS_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  const onContinue = () => {
    player.setMuted(false);
    dismiss();
    // Defer so the audio element mounts and is ready before play().
    setTimeout(() => player.play(), 50);
  };

  const onMute = () => {
    player.setMuted(true);
    dismiss();
    setTimeout(() => player.play(), 50);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome — audio playback notice"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background:
          "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--color-primary) 22%, var(--color-background)) 0%, var(--color-background) 65%)",
        display: "grid",
        placeItems: "center",
        padding: "1.5rem",
        animation: "fade-in 0.35s ease-out",
      }}
    >
      <div
        style={{
          maxWidth: "44rem",
          width: "100%",
          textAlign: "center",
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--color-primary) 10%, var(--color-surface)), var(--color-surface))",
          border: "1px solid color-mix(in oklab, var(--color-foreground) 14%, transparent)",
          borderRadius: 22,
          padding: "clamp(1.75rem, 4vw, 3rem)",
          boxShadow:
            "0 30px 80px -30px color-mix(in oklab, var(--color-primary) 70%, transparent)",
        }}
      >
        <span className="eyebrow">Heads up</span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 1rem + 3vw, 3.5rem)",
            lineHeight: 1.05,
            margin: "0.6rem 0 1rem",
          }}
        >
          The songs are about to play.
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--color-text-muted)",
            maxWidth: "34rem",
            margin: "0 auto 1.5rem",
          }}
        >
          Unmanageable is meant to be heard. Music will start automatically and follow you across the
          site. If you're somewhere you can't have sudden noise — a library, an office, a meeting —
          tap <strong>Mute</strong>. Otherwise hit <strong>Continue</strong> and start head-bobbin'
          and sobbin'.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.75rem",
          }}
        >
          <button
            type="button"
            onClick={onContinue}
            className="player-pulse"
            style={{
              border: "none",
              cursor: "pointer",
              color: "var(--color-primary-foreground)",
              padding: "0.95rem 1.6rem",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: "1rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              background: "var(--color-primary)",
            }}
          >
            <Play size={18} /> Continue — head bobbin' and sobbin'
          </button>
          <button
            type="button"
            onClick={onMute}
            style={{
              cursor: "pointer",
              color: "var(--color-foreground)",
              background: "var(--color-surface-offset, transparent)",
              border: "1px solid color-mix(in oklab, var(--color-foreground) 22%, transparent)",
              padding: "0.95rem 1.6rem",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: "1rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
            }}
          >
            <VolumeX size={18} /> Mute — I'm somewhere quiet
          </button>
        </div>

        <small
          style={{
            display: "block",
            marginTop: "1.25rem",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "var(--color-text-faint)",
          }}
        >
          You can pause or unmute anytime from the player up top.
        </small>
      </div>
    </div>
  );
}
