import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SONGS, STYLE_LABEL, MOOD_LABEL, type Song } from "@/data/songs";

/**
 * Brain-constellation view of all 12 songs.
 * Pills are positioned on a tilted hemisphere (CSS perspective) so the field
 * reads as a dome of neurons. Lines between related songs form the synapses.
 * Hover a pill -> it scales up and 3 data points "fire" out around it.
 * Click -> navigates to the song page.
 */

// Spherical layout: 3 rings stacked on a dome.
// Each entry: phi (vertical angle from top, 0..π/2), and ring offset.
const RING_LAYOUT: Array<{ ring: number; count: number; phi: number }> = [
  { ring: 0, count: 3, phi: 0.55 }, // top crown
  { ring: 1, count: 4, phi: 1.05 }, // upper middle
  { ring: 2, count: 5, phi: 1.55 }, // wide base
];

type Placed = {
  song: Song;
  x: number; // -1..1 screen
  y: number; // -1..1 screen
  z: number; // 0..1 depth (1 = closest)
};

// Tilt the sphere forward so back nodes lift up on screen and don't collide
// with their front-row counterparts.
const TILT = 0.55; // ~31°
const COS_T = Math.cos(TILT);
const SIN_T = Math.sin(TILT);

function placeSongs(songs: Song[]): Placed[] {
  const placed: Placed[] = [];
  let i = 0;
  for (const ring of RING_LAYOUT) {
    for (let k = 0; k < ring.count && i < songs.length; k++, i++) {
      const thetaOffset = ring.ring % 2 === 0 ? 0 : Math.PI / ring.count;
      const theta = (k / ring.count) * Math.PI * 2 + thetaOffset;
      // True 3D unit-sphere coords.
      const sx = Math.sin(ring.phi) * Math.cos(theta);
      const sy = -Math.cos(ring.phi);
      const sz = Math.sin(ring.phi) * Math.sin(theta);
      // Rotate around X so the back of the sphere is visible above the front.
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
  const [hovered, setHovered] = useState<string | null>(null);

  // Build synapse lines from relatedSlugs (deduped).
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

  // Coordinate mapping: normalized [-1..1] -> percent inside the stage.
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
      {/* Ambient brain glow */}
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

      {/* Synapse lines */}
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
          const active =
            hovered === a.song.slug || hovered === b.song.slug;
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

      {/* Neuron pills */}
      {nodes.map((n) => {
        const isHovered = hovered === n.song.slug;
        // Depth-based scale + brightness
        const depthScale = 0.78 + n.z * 0.32; // back nodes smaller
        const scale = depthScale * (isHovered ? 1.18 : 1);
        const z = Math.round(n.z * 100);
        // Subtle floating animation, staggered.
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
              zIndex: isHovered ? 50 : z,
            }}
            onMouseEnter={() => setHovered(n.song.slug)}
            onMouseLeave={() => setHovered((prev) => (prev === n.song.slug ? null : prev))}
            onFocus={() => setHovered(n.song.slug)}
            onBlur={() => setHovered((prev) => (prev === n.song.slug ? null : prev))}
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
                boxShadow: isHovered
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
            </Link>

            {/* Data points that "fire" on hover */}
            {isHovered && (
              <div
                className="neuron-pops"
                aria-hidden
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                  width: 0,
                  height: 0,
                }}
              >
                {[
                  {
                    label: "Hook",
                    value: `“${n.song.pull}”`,
                    angle: -150,
                    dist: 190,
                  },
                  {
                    label: "Theme",
                    value: n.song.theme,
                    angle: -110,
                    dist: 175,
                  },
                  {
                    label: "Style",
                    value: `${STYLE_LABEL[n.song.style]} · ${MOOD_LABEL[n.song.mood]}`,
                    angle: -70,
                    dist: 175,
                  },
                  {
                    label: "Tagline",
                    value: n.song.tagline,
                    angle: -30,
                    dist: 190,
                  },
                ].map((p) => {
                  const rad = (p.angle * Math.PI) / 180;
                  const dx = Math.cos(rad) * p.dist;
                  const dy = Math.sin(rad) * p.dist;
                  return (
                    <div
                      key={p.label}
                      style={{
                        position: "absolute",
                        left: dx,
                        top: dy,
                        transform: "translate(-50%, -50%)",
                        maxWidth: 220,
                        padding: "0.5rem 0.7rem",
                        borderRadius: 12,
                        background:
                          "color-mix(in oklab, var(--color-surface-offset) 96%, transparent)",
                        border:
                          "1px solid color-mix(in oklab, var(--color-primary) 35%, transparent)",
                        boxShadow: "0 10px 24px oklch(0 0 0 / 0.45)",
                        animation: "neuron-pop 260ms cubic-bezier(.2,.7,.2,1) both",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.6rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.14em",
                          color: "var(--color-primary)",
                          marginBottom: 2,
                        }}
                      >
                        {p.label}
                      </div>
                      <div style={{ fontSize: "0.82rem", lineHeight: 1.35 }}>
                        {p.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes neuron-float {
          from { translate: 0 -3px; }
          to   { translate: 0 4px; }
        }
        @keyframes neuron-pop {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .neuron-pill { animation: none !important; }
        }
        @media (max-width: 720px) {
          .brain-stage { min-height: 520px !important; }
        }
      `}</style>
    </div>
  );
}
