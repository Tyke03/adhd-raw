import { useEffect, useState } from "react";

const REACTIONS = [
  { id: "felt-seen", label: "Felt seen" },
  { id: "too-real", label: "Too real" },
  { id: "sent-this", label: "Sent this to someone" },
  { id: "this-explains-me", label: "This explains me" },
  { id: "wish-they-understood", label: "Wish my family understood" },
] as const;

type Counts = Record<string, number>;

function loadCounts(key: string): Counts {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(`reactions:${key}`) ?? "{}");
  } catch {
    return {};
  }
}
function loadPicked(key: string): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(`reactions:${key}:picked`) ?? "{}");
  } catch {
    return {};
  }
}

export function ReactionChips({ targetKey }: { targetKey: string }) {
  const [counts, setCounts] = useState<Counts>({});
  const [picked, setPicked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Seed with small organic-looking counts deterministic per key
    const seed = Array.from(targetKey).reduce((a, c) => a + c.charCodeAt(0), 0);
    const seeded: Counts = {};
    REACTIONS.forEach((r, i) => {
      seeded[r.id] = ((seed * (i + 3)) % 47) + 4;
    });
    const stored = loadCounts(targetKey);
    setCounts({ ...seeded, ...stored });
    setPicked(loadPicked(targetKey));
  }, [targetKey]);

  function toggle(id: string) {
    setPicked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(`reactions:${targetKey}:picked`, JSON.stringify(next));
      return next;
    });
    setCounts((prev) => {
      const delta = picked[id] ? -1 : 1;
      const next = { ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) };
      localStorage.setItem(`reactions:${targetKey}`, JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {REACTIONS.map((r) => {
        const isPicked = !!picked[r.id];
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => toggle(r.id)}
            className="inline-flex items-center gap-2 rounded-full px-4 min-h-11 text-sm transition-colors cursor-pointer hover:-translate-y-0.5"
            style={{
              background: isPicked
                ? "var(--color-primary-highlight)"
                : "var(--color-surface)",
              border: `1px solid color-mix(in oklab, var(--color-primary) ${isPicked ? 55 : 22}%, transparent)`,
              color: "var(--color-foreground)",
              boxShadow: isPicked
                ? "0 0 0 2px color-mix(in oklab, var(--color-primary) 35%, transparent)"
                : "none",
              transition: "transform 120ms ease, background 120ms ease, box-shadow 120ms ease",
            }}
            aria-pressed={isPicked}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-grid",
                placeItems: "center",
                width: "1.1rem",
                height: "1.1rem",
                borderRadius: "999px",
                background: isPicked ? "var(--color-primary)" : "transparent",
                border: `1px solid color-mix(in oklab, var(--color-primary) ${isPicked ? 80 : 45}%, transparent)`,
                color: "var(--color-primary-foreground)",
                fontSize: "0.7rem",
                lineHeight: 1,
              }}
            >
              {isPicked ? "✓" : ""}
            </span>
            <span>{r.label}</span>
            <span style={{ color: "var(--color-text-muted)", fontVariantNumeric: "tabular-nums" }}>
              {counts[r.id] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}