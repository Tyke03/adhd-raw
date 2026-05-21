export function AudioPlayer({ src, title }: { src: string; title: string }) {
  return (
    <div
      className="card-surface p-5 flex flex-col gap-3"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--color-primary) 10%, var(--color-surface)), var(--color-surface))",
      }}
    >
      <span className="eyebrow">Now playing</span>
      <p className="text-lg" style={{ fontFamily: "var(--font-display)" }}>{title}</p>
      <audio controls preload="none" src={src} className="w-full" style={{ accentColor: "var(--color-primary)" }}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}