import { useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SONGS, STYLE_LABEL, MOOD_LABEL, type Song } from "@/data/songs";

/**
 * Brain-constellation view of all 12 songs.
 * Pills are positioned on a tilted hemisphere; lines between related songs
 * form the synapses. Selecting a pill (hover on desktop, tap on mobile)
 * shows a single detail panel anchored at the top of the stage so it
 * never overlaps other pills. A second tap on the same pill navigates.
 */

const RING_LAYOUT: Array<{ ring: number; count: number; phi: number }> = [
  { ring: 0, count: 3, phi: 0.55 },
  { ring: 1, count: 4, phi: 1.05 },
  { ring: 2, count: 5, phi: 1.55 },
];

type Placed = {
  song: Song;
  x: number;
  y: number;
  z: number;
};

const TILT = 0.55;
const COS_T = Math.cos(TILT);
const SIN_T = Math.sin(TILT);

function placeSongs(songs: Song[]): Placed[] {
  const placed: Placed[] = [];
  let i = 0;
  for (const ring of RING_LAYOUT) {
    for (let k = 0; k < ring.count && i < songs.length; k++, i++) {
      const thetaOffset = ring.ring % 2 === 0 ? 0 : Math.PI / ring.count;
      const theta = (k / ring.count) * Math.PI * 2 + thetaOffset;
      const sx = Math.sin(ring.phi) * Math.cos(theta);
      const sy = -Math.cos(ring.phi);
      const sz = Math.sin(ring.phi) * Math.sin(theta);
      const projY = sy * COS_T - sz * SIN_T;
      const projZ = sy * SIN_T + sz * COS_T;
      placed.push({
        song: songs[i],
        x: sx * 0.95,
        y: projY * 0.82,
        z: (projZ + 1) / 2,
      });
    }
  }
  return placed;
}

export function BrainConstellation() {
  const nodes = useMemo(() => placeSongs(SONGS), []);
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const lastTapRef = useRef<string | null>(null);

  const lines = useMemo(() => {
    const byId = new Map(nodes.map((n) => [n.song.slug, n]));
    const seen = new Set<string>();
    const out: Array<{ a: Placed; b: Placed; key: string }> = [];
    for (const n of nodes) {
      for (const rel of n.song.relatedSlugs) {
        const b = byId.get(rel);
        if (!b) continue;
        const key = [n.song.slug, rel].sort().join("|");
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ a: n, b, key });
      }
    }
    return out;
  }, [nodes]);

  const toX = (x: number) => 50 + x * 42;
  const toY = (y: number) => 50 + y * 42;

  const activeSong = selected ? SONGS.find((s) => s.slug === selected) : null;

  const handleSelect = (slug: string, e: React.MouseEvent) => {
    // If the same pill is selected, second click navigates.
    if (selected === slug || lastTapRef.current === slug) {
      lastTapRef.current = null;
      navigate({ to: "/songs/$slug", params: { slug } });
      return;
    }
    e.preventDefault();
    setSelected(slug);
    lastTapRef.current = slug;
  };

  return (
    <div>
      {/* Detail panel — fixed, above the stage. Never overlaps pills. */}
      <div
        aria-live="polite"
        className="constellation-detail"
        style={{
          minHeight: 120,
          marginBottom: 12,
          padding: "1rem 1.1rem",
          borderRadius: 16,
          background:
            "color-mix(in oklab, var(--color-surface-offset) 92%, transparent)",
          border:
            "1px solid color-mix(in oklab, var(--color-primary) 35%, transparent)",
          boxShadow: "0 10px 30px oklch(0 0 0 / 0.35)",
        }}
      >
        {activeSong ? (
          <div className="grid gap-3 md:grid-cols-4">
            <div>
              <div
                style={{
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--color-primary)",
                }}
              >
                Track {String(activeSong.number).padStart(2, "0")} · Hook
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", marginTop: 4 }}>
                {activeSong.title}
              </div>
              <div style={{ fontSize: "0.85rem", marginTop: 6, fontStyle: "italic" }}>
                “{activeSong.pull}”
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-primary)" }}>
                Theme
              </div>
              <div style={{ fontSize: "0.9rem", marginTop: 6 }}>{activeSong.theme}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-primary)" }}>
                Style
              </div>
              <div style={{ fontSize: "0.9rem", marginTop: 6 }}>
                {STYLE_LABEL[activeSong.style]} · {MOOD_LABEL[activeSong.mood]}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-primary)" }}>
                Tagline
              </div>
              <div style={{ fontSize: "0.9rem", marginTop: 6 }}>{activeSong.tagline}</div>
              <button
                type="button"
                onClick={() => navigate({ to: "/songs/$slug", params: { slug: activeSong.slug } })}
                className="mt-2 inline-flex items-center min-h-10 px-3 rounded-full"
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-primary-foreground)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                }}
              >
                Open song →
              </button>
            </div>
          </div>
        ) : (
          <div style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>
            Tap or hover a neuron to see what's inside it. Tap again — or use the button — to open the song.
          </div>
        )}
      </div>

      <div
        className="brain-stage"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          minHeight: 460,
          perspective: "1200px",
        }}
        aria-label="Album constellation — 12 songs arranged as a brain of neurons"
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 55%, color-mix(in oklab, var(--color-primary) 18%, transparent), transparent 62%), radial-gradient(ellipse at 70% 30%, color-mix(in oklab, var(--color-accent-blue) 14%, transparent), transparent 55%)",
            filter: "blur(2px)",
            pointerEvents: "none",
          }}
        />

        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        >
          <defs>
            <linearGradient id="synapse" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.72 0.09 30 / 0.05)" />
              <stop offset="50%" stopColor="oklch(0.72 0.09 30 / 0.55)" />
              <stop offset="100%" stopColor="oklch(0.7 0.06 230 / 0.1)" />
            </linearGradient>
          </defs>
          {lines.map(({ a, b, key }) => {
            const active = selected === a.song.slug || selected === b.song.slug;
            return (
              <line
                key={key}
                x1={toX(a.x)}
                y1={toY(a.y)}
                x2={toX(b.x)}
                y2={toY(b.y)}
                stroke="url(#synapse)"
                strokeWidth={active ? 0.35 : 0.18}
                opacity={active ? 0.95 : 0.5}
                style={{ transition: "opacity 220ms ease, stroke-width 220ms ease" }}
              />
            );
          })}
        </svg>

        {nodes.map((n) => {
          const isActive = selected === n.song.slug;
          const depthScale = 0.78 + n.z * 0.32;
          const scale = depthScale * (isActive ? 1.18 : 1);
          const z = Math.round(n.z * 100);
          const float = `neuron-float ${6 + (n.song.number % 5)}s ease-in-out ${
            (n.song.number * 0.4) % 3
          }s infinite alternate`;

          return (
            <div
              key={n.song.slug}
              className="neuron-wrap"
              style={{
                position: "absolute",
                left: `${toX(n.x)}%`,
                top: `${toY(n.y)}%`,
                transform: `translate(-50%, -50%)`,
                zIndex: isActive ? 50 : z,
              }}
              onMouseEnter={() => setSelected(n.song.slug)}
            >
              <a
                href={`/songs/${n.song.slug}`}
                onClick={(e) => handleSelect(n.song.slug, e)}
                onFocus={() => setSelected(n.song.slug)}
                className="neuron-pill"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.55rem 0.95rem",
                  borderRadius: 999,
                  background:
                    "linear-gradient(180deg, color-mix(in oklab, var(--color-primary) 24%, var(--color-surface)) , color-mix(in oklab, var(--color-surface) 92%, transparent))",
                  border: "1px solid color-mix(in oklab, var(--color-primary) 45%, transparent)",
                  color: "var(--color-foreground)",
                  fontFamily: "var(--font-display)",
                  fontSize: `${0.78 + n.z * 0.22}rem`,
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  boxShadow: isActive
                    ? "0 0 0 2px color-mix(in oklab, var(--color-primary) 40%, transparent), 0 12px 36px oklch(0 0 0 / 0.5)"
                    : "0 6px 18px oklch(0 0 0 / 0.35)",
                  transform: `scale(${scale})`,
                  transformOrigin: "center",
                  transition:
                    "transform 240ms cubic-bezier(.2,.7,.2,1), box-shadow 240ms ease",
                  animation: float,
                  opacity: 0.65 + n.z * 0.35,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "var(--color-primary)",
                    boxShadow: "0 0 10px var(--color-primary)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "0.62rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--color-primary)",
                  }}
                >
                  {String(n.song.number).padStart(2, "0")}
                </span>
                <span>{n.song.title}</span>
              </a>
            </div>
          );
        })}

        <style>{`
          @keyframes neuron-float {
            from { translate: 0 -3px; }
            to   { translate: 0 4px; }
          }
          @media (prefers-reduced-motion: reduce) {
            .neuron-pill { animation: none !important; }
          }
          @media (max-width: 720px) {
            .brain-stage { min-height: 560px !important; aspect-ratio: 4 / 5 !important; }
            .neuron-pill { font-size: 0.68rem !important; padding: 0.4rem 0.65rem !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
