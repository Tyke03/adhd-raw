import { useState } from "react";

export function ShareButton({
  path,
  label = "Share",
  size = "sm",
  stop = true,
}: {
  path: string;
  label?: string;
  size?: "sm" | "md";
  stop?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function handleClick(e: React.MouseEvent) {
    if (stop) {
      e.preventDefault();
      e.stopPropagation();
    }
    const url =
      typeof window !== "undefined"
        ? new URL(path, window.location.origin).toString()
        : path;
    try {
      if (typeof navigator !== "undefined" && (navigator as any).share) {
        await (navigator as any).share({ url, title: document.title });
      } else {
        await navigator.clipboard.writeText(url);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // user cancelled or permission denied — silent
    }
  }

  const isMd = size === "md";
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Share — copy link`}
      className="inline-flex items-center gap-2 rounded-full transition-colors cursor-pointer"
      style={{
        padding: isMd ? "0.55rem 0.95rem" : "0.35rem 0.7rem",
        fontSize: isMd ? "0.9rem" : "0.78rem",
        background: copied
          ? "var(--color-primary-highlight)"
          : "var(--color-surface-offset)",
        color: "var(--color-foreground)",
        border: "1px solid color-mix(in oklab, var(--color-foreground) 14%, transparent)",
      }}
    >
      <svg width={isMd ? "16" : "14"} height={isMd ? "16" : "14"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      <span>{copied ? "Link copied" : label}</span>
    </button>
  );
}