import { useEffect, useRef, useState } from "react";
import { FACTS } from "@/data/facts";
import { ShareButton } from "@/components/ShareButton";

const ROTATE_MS = 5000;
const MAX_DOTS = 6;

export function DidYouKnowBubble() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
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

  // Auto-rotate facts every 5s while open
  useEffect(() => {
    if (!open || FACTS.length < 2) return;
    const id = window.setInterval(() => {
      setFading(true);
      window.setTimeout(() => {
        setIdx((i) => (i + 1) % FACTS.length);
        setFading(false);
      }, 400);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [open]);

  function handleToggle() {
    setOpen((o) => !o);
  }

  const fact = FACTS[idx];
  const dotCount = Math.min(FACTS.length, MAX_DOTS);
  const activeDot = idx % dotCount;

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
        aria-label="Did you know? Show rotating ADHD research findings"
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
          aria-label="Did you know — rotating ADHD research findings"
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
          <div
            style={{
              opacity: fading ? 0 : 1,
              transition: "opacity 400ms ease",
            }}
          >
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
          </div>

          {/* Dot pagination */}
          <div
            aria-hidden="true"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 6,
              marginBottom: "0.6rem",
            }}
          >
            {Array.from({ length: dotCount }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background:
                    i === activeDot
                      ? "var(--color-primary)"
                      : "color-mix(in oklab, var(--color-foreground) 22%, transparent)",
                  transition: "background 200ms ease",
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-end gap-2">
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
