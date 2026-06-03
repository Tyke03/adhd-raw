import { useEffect, useRef, useState } from "react";
import { FACTS } from "@/data/facts";
import { ShareButton } from "@/components/ShareButton";

function pickRandomIndex(prev: number, len: number) {
  if (len <= 1) return 0;
  let next = prev;
  while (next === prev) next = Math.floor(Math.random() * len);
  return next;
}

export function DidYouKnowBubble() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * FACTS.length));
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click / Esc
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function handleToggle() {
    setOpen((o) => {
      const next = !o;
      if (next) setIdx((p) => pickRandomIndex(p, FACTS.length));
      return next;
    });
  }

  function shuffle() {
    setIdx((p) => pickRandomIndex(p, FACTS.length));
  }

  const fact = FACTS[idx];

  return (
    <div
      ref={cardRef}
      style={{
        position: "fixed",
        top: "5.5rem",
        right: "1.25rem",
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.6rem",
        pointerEvents: "none",
      }}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        aria-label="Did you know? Show a random ADHD research finding"
        className="dyk-bubble"
        style={{
          pointerEvents: "auto",
          border: "none",
          cursor: "pointer",
          color: "var(--color-foreground)",
          padding: "0.7rem 1.1rem",
          borderRadius: 999,
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: "0.85rem",
          letterSpacing: "0.02em",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.55rem",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "currentColor",
            opacity: 0.85,
          }}
        />
        Did you know?
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Did you know — ADHD research finding"
          style={{
            pointerEvents: "auto",
            width: "min(22rem, calc(100vw - 2rem))",
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--color-primary) 10%, var(--color-surface)), var(--color-surface))",
            border: "1px solid color-mix(in oklab, var(--color-foreground) 14%, transparent)",
            borderRadius: 18,
            padding: "1.1rem 1.15rem 1rem",
            boxShadow:
              "0 18px 40px -18px color-mix(in oklab, var(--color-primary) 60%, transparent), 0 4px 14px -6px rgba(0,0,0,0.35)",
            animation: "fade-in 0.25s ease-out",
          }}
        >
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="eyebrow" style={{ fontSize: "0.7rem" }}>Did you know</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--color-text-faint)",
                cursor: "pointer",
                fontSize: "1.1rem",
                lineHeight: 1,
                padding: 2,
              }}
            >
              ×
            </button>
          </div>
          <strong
            style={{
              display: "block",
              fontFamily: "var(--font-display)",
              fontSize: "1.9rem",
              lineHeight: 1,
              color: "var(--color-foreground)",
              marginBottom: "0.55rem",
            }}
          >
            {fact.stat}
          </strong>
          <h3
            className="text-base font-bold leading-snug"
            style={{ fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}
          >
            {fact.headline}
          </h3>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--color-text-muted)",
              marginBottom: "0.75rem",
            }}
          >
            {fact.body}
          </p>
          <small
            style={{
              display: "block",
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--color-text-faint)",
              marginBottom: "0.75rem",
            }}
          >
            Source ·{" "}
            <a
              href={fact.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-primary)", textDecoration: "underline" }}
            >
              {fact.source} ↗
            </a>
          </small>
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={shuffle}
              style={{
                background: "var(--color-surface-offset)",
                border: "1px solid color-mix(in oklab, var(--color-foreground) 14%, transparent)",
                color: "var(--color-foreground)",
                padding: "0.35rem 0.7rem",
                fontSize: "0.78rem",
                borderRadius: 999,
                cursor: "pointer",
              }}
            >
              Another one
            </button>
            <ShareButton path={`/research#${fact.id}`} stop={false} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes dyk-pulse {
          0%, 100% {
            box-shadow:
              0 0 0 0 color-mix(in oklab, var(--color-primary) 55%, transparent),
              0 10px 28px -10px color-mix(in oklab, var(--color-primary) 70%, transparent);
            transform: translateY(0);
          }
          50% {
            box-shadow:
              0 0 0 14px color-mix(in oklab, var(--color-primary) 0%, transparent),
              0 14px 32px -10px color-mix(in oklab, var(--color-primary) 80%, transparent);
            transform: translateY(-2px);
          }
        }
        .dyk-bubble {
          background: linear-gradient(135deg,
            color-mix(in oklab, var(--color-primary) 92%, white),
            color-mix(in oklab, var(--color-primary) 70%, black));
          animation: dyk-pulse 2.4s ease-in-out infinite;
        }
        .dyk-bubble:hover { filter: brightness(1.08); }
        @media (prefers-reduced-motion: reduce) {
          .dyk-bubble { animation: none; }
        }
      `}</style>
    </div>
  );
}
