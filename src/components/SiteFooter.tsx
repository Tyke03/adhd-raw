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
            <strong style={{ color: "var(--color-foreground)", fontFamily: "var(--font-display)" }}>Unmanageable</strong>{" "}
            — songs and research about severe adult ADHD by Brent K. Hubert living all it so Clearly Confused.
          </p>
          <p className="mt-2" style={{ color: "var(--color-text-faint)" }}>
            Not a replacement for medical care. If you're in crisis, dial or text 988 (US).
          </p>
        </div>
        <nav className="flex flex-wrap gap-4">
          <Link to="/songs">Songs</Link>
          <Link to="/research">Research</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/community">Community</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </footer>
  );
}