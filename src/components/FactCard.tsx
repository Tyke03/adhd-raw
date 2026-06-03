import type { Fact } from "@/data/facts";
import { ShareButton } from "@/components/ShareButton";

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
        <p className="text-base" style={{ color: "var(--color-text-muted)" }}>{fact.body}</p>
      )}
      <div className="mt-auto flex items-end justify-between gap-3">
        <small
          className="block"
          style={{
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--color-text-faint)",
          }}
        >
          Source ·{" "}
          <a
            href={fact.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-primary)", textDecoration: "underline" }}
          >
            {fact.source}
          </a>
        </small>
        <ShareButton path={`/research#${fact.id}`} stop={false} />
      </div>
    </article>
  );
}