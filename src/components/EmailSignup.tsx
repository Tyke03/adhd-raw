import { useState } from "react";

export function EmailSignup({
  variant = "band",
}: {
  variant?: "band" | "compact";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saved" | "invalid">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setStatus("invalid");
      return;
    }
    try {
      const key = "emailSignups";
      const existing: string[] = JSON.parse(localStorage.getItem(key) ?? "[]");
      if (!existing.includes(email.trim())) existing.push(email.trim());
      localStorage.setItem(key, JSON.stringify(existing));
    } catch {
      /* ignore */
    }
    setStatus("saved");
    setEmail("");
  }

  const compact = variant === "compact";

  return (
    <aside
      className="card-surface"
      style={{
        padding: compact ? "1.25rem 1.4rem" : "1.75rem 1.9rem",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--color-primary) 14%, var(--color-surface)), color-mix(in oklab, var(--color-accent-blue) 10%, var(--color-surface)))",
      }}
    >
      <div className="grid gap-4 md:grid-cols-[1.1fr_1fr] items-center">
        <div>
          <span className="eyebrow">Stay in the loop</span>
          <h2
            className="mt-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: compact ? "1.45rem" : "1.85rem",
              lineHeight: 1.1,
            }}
          >
            {compact
              ? "Get new songs and writing as they drop."
              : "Hear it when the next song or piece lands."}
          </h2>
          <p
            className="mt-2"
            style={{ color: "var(--color-text-muted)", fontSize: "0.98rem" }}
          >
            No spam, no marketing speak. Just the next song, the next post, or a
            resource update — from me, Brent.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
          <label htmlFor={`email-${variant}`} className="sr-only">
            Email address
          </label>
          <input
            id={`email-${variant}`}
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            placeholder="you@somewhere.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            className="flex-1 min-w-[14rem] rounded-full px-4"
            style={{
              minHeight: "3rem",
              background: "color-mix(in oklab, var(--color-surface) 80%, transparent)",
              border: "1px solid color-mix(in oklab, var(--color-foreground) 18%, transparent)",
              color: "var(--color-foreground)",
              fontSize: "1rem",
            }}
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full font-bold cursor-pointer"
            style={{
              minHeight: "3rem",
              padding: "0 1.4rem",
              background: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
              fontSize: "0.95rem",
            }}
          >
            {status === "saved" ? "You're on the list" : "Sign me up"}
          </button>
        </form>
      </div>
      {status === "invalid" && (
        <p
          className="mt-3"
          style={{ color: "var(--color-warning)", fontSize: "0.9rem" }}
        >
          That email looks off — give it another try.
        </p>
      )}
      {status === "saved" && (
        <p
          className="mt-3"
          style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}
        >
          Saved locally for now — once the mailing list is wired up, you'll be on
          it first.
        </p>
      )}
    </aside>
  );
}