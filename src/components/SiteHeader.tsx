import { Link } from "@tanstack/react-router";

const NAV = [
  { to: "/songs", label: "Songs" },
  { to: "/research", label: "Research" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backdropFilter: "blur(16px)",
        background: "color-mix(in oklab, var(--color-background) 80%, transparent)",
        borderBottom: "1px solid color-mix(in oklab, var(--color-foreground) 10%, transparent)",
      }}
    >
      <div className="shell flex items-center justify-between gap-4 py-3 flex-wrap">
        <Link to="/" className="inline-flex items-center gap-3 min-h-11" aria-label="Unmanageable home">
          <span
            className="grid place-items-center"
            style={{
              width: "2.6rem",
              height: "2.6rem",
              borderRadius: "var(--radius-lg)",
              background: "color-mix(in oklab, var(--color-primary) 14%, var(--color-surface))",
              color: "var(--color-primary)",
              border: "1px solid color-mix(in oklab, var(--color-primary) 30%, transparent)",
            }}
          >
            <svg viewBox="0 0 64 64" width="22" height="22" fill="none" aria-hidden="true">
              <path d="M15 48V16h8v24l9-10 9 10V16h8v32h-8V38l-9 9-9-9v10h-8Z" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="leading-tight">
            <small
              className="block"
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--color-text-muted)",
              }}
            >
              Personal archive
            </small>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 700 }}>
              Unmanageable
            </strong>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex flex-wrap items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-4 min-h-11 inline-flex items-center rounded-full text-sm transition-colors"
              style={{ color: "var(--color-text-muted)" }}
              activeProps={{
                style: { color: "var(--color-foreground)", background: "var(--color-surface)" },
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
