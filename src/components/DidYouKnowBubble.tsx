import { useEffect, useRef, useState } from "react";
import { FACTS } from "@/data/facts";
import { ShareButton } from "@/components/ShareButton";

const ROTATE_MS = 10000;
const MAX_DOTS = 6;

export function DidYouKnowBubble() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") goTo(idx + 1);
      if (e.key === "ArrowLeft") goTo(idx - 1);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, idx]);

  useEffect(() => {
    if (!open || paused || FACTS.length < 2) return;
    const id = window.setInterval(() => {
      setFading(true);
      window.setTimeout(() => {
        setIdx((i) => (i + 1) % FACTS.length);
        setFading(false);
      }, 400);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [open, paused]);

  function goTo(next: number) {
    const wrapped = ((next % FACTS.length) + FACTS.length) % FACTS.length;
    setFading(true);
    window.setTimeout(() => {
      setIdx(wrapped);
      setFading(false);
    }, 200);
  }

  const fact = FACTS[idx];
  const dotCount = Math.min(FACTS.length, MAX_DOTS);
  const activeDot = idx % dotCount;

  return (
    <>
      {/* Collapsed edge tab (used on mobile or after user hides it) */}
      {collapsed && (
        <button
          type="button"
          onClick={() => {
            setCollapsed(false);
            setOpen(true);
          }}
          aria-label="Show Did You Know facts"
          className="dyk-edge-tab"
          style={{
            position: "fixed",
            right: 0,
            bottom: "6rem",
            zIndex: 60,
            border: "none",
            cursor: "pointer",
            padding: "0.55rem 0.5rem",
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            color: "var(--color-foreground)",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          ? Facts
        </button>
      )}

      {!collapsed && (
        <div
          ref={cardRef}
          className="dyk-root"
          style={{
            position: "fixed",
            zIndex: 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.6rem",
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", gap: 6, pointerEvents: "auto" }}>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setCollapsed(true);
              }}
              aria-label="Hide Did You Know bubble"
              title="Hide"
              style={{
                border: "none",
                cursor: "pointer",
                background:
                  "color-mix(in oklab, var(--color-background) 70%, transparent)",
                color: "var(--color-text-muted)",
                width: 24,
                height: 24,
                borderRadius: 999,
                fontSize: "0.75rem",
                lineHeight: 1,
              }}
            >
              ×
            </button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label="Did you know? Show rotating ADHD research findings"
              className="dyk-bubble"
              style={{
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
          </div>

          {open && (
            <div
              role="dialog"
              aria-label="Did you know — rotating ADHD research findings"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              style={{
                pointerEvents: "auto",
                width: "min(22rem, calc(100vw - 2rem))",
                background:
                  "linear-gradient(180deg, color-mix(in oklab, var(--color-primary) 10%, var(--color-surface)), var(--color-surface))",
                border:
                  "1px solid color-mix(in oklab, var(--color-foreground) 14%, transparent)",
                borderRadius: 18,
                padding: "1.1rem 1.15rem 1rem",
                boxShadow:
                  "0 18px 40px -18px color-mix(in oklab, var(--color-primary) 60%, transparent), 0 4px 14px -6px rgba(0,0,0,0.35)",
              }}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="eyebrow" style={{ fontSize: "0.7rem" }}>
                  Did you know · {idx + 1} / {FACTS.length}
                </span>
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
                  transition: "opacity 300ms ease",
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
                    style={{
                      color: "var(--color-primary)",
                      textDecoration: "underline",
                    }}
                  >
                    {fact.source} ↗
                  </a>
                </small>
              </div>

              {/* Prev / dots / Next */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  marginBottom: "0.6rem",
                }}
              >
                <button
                  type="button"
                  onClick={() => goTo(idx - 1)}
                  aria-label="Previous fact"
                  style={navBtn}
                >
                  ‹
                </button>
                <div
                  aria-hidden="false"
                  style={{ display: "flex", gap: 6 }}
                >
                  {Array.from({ length: dotCount }).map((_, i) => {
                    // map dot i to the fact index in the current "page" window
                    const base = Math.floor(idx / dotCount) * dotCount;
                    const target = base + i;
                    if (target >= FACTS.length) return null;
                    const active = target === idx;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => goTo(target)}
                        aria-label={`Go to fact ${target + 1}`}
                        aria-current={active ? "true" : undefined}
                        style={{
                          width: 10,
                          height: 10,
                          padding: 0,
                          borderRadius: 999,
                          border: "none",
                          cursor: "pointer",
                          background: active
                            ? "var(--color-primary)"
                            : "color-mix(in oklab, var(--color-foreground) 22%, transparent)",
                          transition: "background 200ms ease",
                        }}
                      />
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => goTo(idx + 1)}
                  aria-label="Next fact"
                  style={navBtn}
                >
                  ›
                </button>
              </div>

              <div className="flex items-center justify-end gap-2">
                <ShareButton path={`/research#${fact.id}`} stop={false} />
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        .dyk-root {
          top: 5.5rem;
          right: 1.25rem;
        }
        @media (max-width: 767px) {
          .dyk-root {
            top: auto;
            bottom: 1rem;
            right: 1rem;
          }
        }
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
        .dyk-bubble, .dyk-edge-tab {
          background: linear-gradient(135deg,
            color-mix(in oklab, var(--color-primary) 92%, white),
            color-mix(in oklab, var(--color-primary) 70%, black));
        }
        .dyk-bubble { animation: dyk-pulse 2.4s ease-in-out infinite; }
        .dyk-bubble:hover, .dyk-edge-tab:hover { filter: brightness(1.08); }
        @media (prefers-reduced-motion: reduce) {
          .dyk-bubble { animation: none; }
        }
      `}</style>
    </>
  );
}

const navBtn: React.CSSProperties = {
  border: "1px solid color-mix(in oklab, var(--color-foreground) 18%, transparent)",
  background: "transparent",
  color: "var(--color-foreground)",
  cursor: "pointer",
  width: 30,
  height: 30,
  borderRadius: 999,
  fontSize: "1rem",
  lineHeight: 1,
  display: "grid",
  placeItems: "center",
};
