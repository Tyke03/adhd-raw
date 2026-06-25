import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer
      className="mt-24"
      style={{
        padding: "2.5rem 0 4rem",
        borderTop: "1px solid color-mix(in oklab, var(--color-foreground) 10%, transparent)",
      }}
    >
      <div className="shell grid gap-4 md:grid-cols-[1fr_auto] text-sm" style={{ color: "var(--color-text-muted)" }}>
        <div>
          <p>
            Brent K. Hubert, releasing as Clearly Confused — living all of it, still in it.
          </p>
          <p className="mt-2" style={{ color: "var(--color-text-faint)" }}>
            Not a replacement for medical care. If you're in crisis, dial or text 988 (US).
          </p>
        </div>
        <nav className="flex flex-wrap gap-4">
          <Link to="/songs">Songs</Link>
          <Link to="/research">Research</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </footer>
  );
}
