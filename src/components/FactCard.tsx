import type { Fact } from "@/data/facts";

export function FactCard({ fact, compact = false }: { fact: Fact; compact?: boolean }) {
  return (
    <article
      className="card-surface flex flex-col gap-3 p-6 h-full"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--color-primary) 8%, var(--color-surface)), var(--color-surface))",
      }}
    >
      <span className="eyebrow">Did you know</span>
      <strong
        style={{
          fontFamily: "var(--font-display)",
          fontSize: compact ? "2.1rem" : "clamp(2rem, 1rem + 2vw, 3.25rem)",
          lineHeight: 1,
          color: "var(--color-foreground)",
        }}
      >
        {fact.stat}
      </strong>
      <h3 className="text-lg font-bold leading-snug" style={{ fontFamily: "var(--font-body)" }}>
        {fact.headline}
      </h3>
      {!compact && (
        <p style={{ color: "var(--color-text-muted)" }}>{fact.body}</p>
      )}
      <small
        className="mt-auto block"
        style={{
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--color-text-faint)",
        }}
      >
        Source · {fact.source}
      </small>
    </article>
  );
}