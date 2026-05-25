export function StyleNotice({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className="card-surface p-5"
      style={{
        background: "color-mix(in oklab, var(--color-primary) 8%, var(--color-surface))",
        borderLeft: "3px solid var(--color-primary)",
      }}
    >
      <span className="eyebrow">Before you press play</span>
      <p className="mt-2" style={{ color: "var(--color-foreground)" }}>
        No two ADHD presentations are identical, so neither is this album. Some tracks are{" "}
        <strong>soft</strong> or <strong>raw</strong> — slow, plain, end-of-the-rope honest. Others
        have the "head-bob sob" feel: almost upbeat-sounding while the lyrics gut you. A few lean
        into fast <strong>rap</strong>, others are mostly <strong>sung</strong>.
      </p>
      {!compact && (
        <p className="mt-3" style={{ color: "var(--color-text-muted)" }}>
          If one song isn't for you because of the genre — fast rap isn't everyone's thing, and
          neither is a slow ballad — skip it and try a different one. The point isn't to like all
          twelve. It's to find the one that knows you.
        </p>
      )}
    </aside>
  );
}