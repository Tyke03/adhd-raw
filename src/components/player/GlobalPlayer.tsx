import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Download,
  Pause,
  Play,
  Share2,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { usePlayer } from "./PlayerProvider";

function fmt(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function GlobalPlayer() {
  const p = usePlayer();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const share = async (slug: string, title: string) => {
    try {
      const url = `${window.location.origin}/songs/${slug}`;
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* user cancelled */
    }
  };

  const downloadOne = (src: string, filename: string) => {
    const a = document.createElement("a");
    a.href = src;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadAll = () => {
    p.playlist.forEach((s, i) => {
      if (!s.audio) return;
      window.setTimeout(() => {
        downloadOne(s.audio!, `${String(i + 1).padStart(2, "0")}-${s.slug}.mp3`);
      }, i * 500);
    });
  };

  return (
    <div
      ref={wrapRef}
      className="relative flex-1 min-w-[260px] max-w-[560px]"
    >
      <div
        className="player-pulse flex items-center gap-2 px-2 py-1.5 rounded-full"
      >
        <button
          onClick={p.prev}
          aria-label="Previous song"
          className="grid place-items-center w-8 h-8 rounded-full hover:bg-white/5"
        >
          <SkipBack size={15} />
        </button>
        <button
          onClick={p.toggle}
          aria-label={p.isPlaying ? "Pause" : "Play"}
          className="grid place-items-center w-9 h-9 rounded-full"
          style={{
            background: "var(--color-primary)",
            color: "var(--color-primary-foreground)",
          }}
        >
          {p.isPlaying ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button
          onClick={p.next}
          aria-label="Next song"
          className="grid place-items-center w-8 h-8 rounded-full hover:bg-white/5"
        >
          <SkipForward size={15} />
        </button>

        <div className="flex-1 flex items-center gap-2 min-w-0">
          <span
            className="text-[11px] tabular-nums hidden sm:inline"
            style={{ color: "var(--color-text-muted)" }}
          >
            {fmt(p.currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={p.duration || 0}
            step={0.1}
            value={Math.min(p.currentTime, p.duration || 0)}
            onChange={(e) => p.seek(parseFloat(e.target.value))}
            className="flex-1 h-1 cursor-pointer"
            style={{ accentColor: "var(--color-primary)" }}
            aria-label="Seek"
          />
          <span
            className="text-[11px] tabular-nums hidden sm:inline"
            style={{ color: "var(--color-text-muted)" }}
          >
            {fmt(p.duration)}
          </span>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Open playlist"
          aria-expanded={open}
          className="grid place-items-center w-8 h-8 rounded-full hover:bg-white/5"
        >
          <ChevronDown
            size={16}
            style={{
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform 150ms",
            }}
          />
        </button>
      </div>

      <div
        className="px-3 mt-1 truncate text-[11px]"
        style={{ color: "var(--color-text-muted)" }}
      >
        Now playing ·{" "}
        <span style={{ color: "var(--color-foreground)" }}>
          {p.current.title}
        </span>
      </div>

      {open && (
        <div
          className="absolute left-0 right-0 top-full mt-2 rounded-xl z-50 max-h-[70vh] overflow-auto"
          style={{
            background: "var(--color-surface)",
            border:
              "1px solid color-mix(in oklab, var(--color-foreground) 16%, transparent)",
            boxShadow: "0 20px 60px oklch(0 0 0 / 0.5)",
          }}
        >
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 sticky top-0"
            style={{
              background: "var(--color-surface)",
              borderBottom:
                "1px solid color-mix(in oklab, var(--color-foreground) 10%, transparent)",
            }}
          >
            <span className="eyebrow">Playlist · recommended order</span>
            <button
              onClick={downloadAll}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-primary-foreground)",
              }}
            >
              <Download size={12} /> Download all
            </button>
          </div>
          <ul className="py-1">
            {p.playlist.map((s, i) => {
              const active = i === p.currentIndex;
              return (
                <li
                  key={s.slug}
                  className="flex items-center gap-1 px-3 py-2"
                  style={
                    active
                      ? {
                          background:
                            "color-mix(in oklab, var(--color-primary) 12%, transparent)",
                        }
                      : undefined
                  }
                >
                  <button
                    onClick={() => p.selectIndex(i)}
                    className="flex-1 flex items-center gap-3 text-left min-w-0 py-1"
                    aria-label={`Play ${s.title}`}
                  >
                    <span
                      className="text-xs w-6 tabular-nums"
                      style={{
                        color: active
                          ? "var(--color-primary)"
                          : "var(--color-text-muted)",
                      }}
                    >
                      {active && p.isPlaying ? "▶" : String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">{s.title}</span>
                  </button>
                  <Link
                    to="/songs/$slug"
                    params={{ slug: s.slug }}
                    onClick={() => setOpen(false)}
                    className="text-xs px-2 py-1 rounded-md hover:bg-white/5"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Open
                  </Link>
                  <button
                    onClick={() => share(s.slug, s.title)}
                    aria-label={`Share ${s.title}`}
                    title="Share"
                    className="grid place-items-center w-8 h-8 rounded-md hover:bg-white/5"
                  >
                    <Share2 size={14} />
                  </button>
                  {s.audio && (
                    <button
                      onClick={() =>
                        downloadOne(
                          s.audio!,
                          `${String(i + 1).padStart(2, "0")}-${s.slug}.mp3`,
                        )
                      }
                      aria-label={`Download ${s.title}`}
                      title="Download"
                      className="grid place-items-center w-8 h-8 rounded-md hover:bg-white/5"
                    >
                      <Download size={14} />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}