import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { SONGS, type Song } from "@/data/songs";

/**
 * Brain-constellation view of all 12 songs.
 * Single click / tap on any neuron navigates to that song.
 * No instructional text. Each neuron pulses subtly to signal interactivity.
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

  return (
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
        {lines.map(({ a, b, key }) => (
          <line
            key={key}
            x1={toX(a.x)}
            y1={toY(a.y)}
            x2={toX(b.x)}
            y2={toY(b.y)}
            stroke="url(#synapse)"
            strokeWidth={0.22}
            opacity={0.55}
          />
        ))}
      </svg>

      {nodes.map((n) => {
        const depthScale = 0.78 + n.z * 0.32;
        const z = Math.round(n.z * 100);

        return (
          <div
            key={n.song.slug}
            className="neuron-wrap"
            style={{
              position: "absolute",
              left: `${toX(n.x)}%`,
              top: `${toY(n.y)}%`,
              transform: `translate(-50%, -50%)`,
              zIndex: z,
            }}
          >
            <Link
              to="/songs/$slug"
              params={{ slug: n.song.slug }}
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
                boxShadow: "0 6px 18px oklch(0 0 0 / 0.35)",
                transform: `scale(${depthScale})`,
                transformOrigin: "center",
                opacity: 0.65 + n.z * 0.35,
                animation: `neuron-pulse 2s ease-in-out ${(n.song.number * 0.13) % 2}s infinite`,
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
            </Link>
          </div>
        );
      })}

      <style>{`
        @keyframes neuron-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
        .neuron-pill:hover { filter: brightness(1.1); }
        @media (prefers-reduced-motion: reduce) {
          .neuron-pill { animation: none !important; }
        }
        @media (max-width: 720px) {
          .brain-stage { min-height: 560px !important; aspect-ratio: 4 / 5 !important; }
          .neuron-pill { font-size: 0.68rem !important; padding: 0.4rem 0.65rem !important; }
        }
      `}</style>
    </div>
  );
}
