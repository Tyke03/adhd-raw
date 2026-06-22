import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Unmanageable" },
      {
        name: "description",
        content:
          "About Unmanageable and Brent K. Hubert (Clearly Confused) — a personal archive of songs, research, and resources for adults with severe ADHD, written by someone with a documented Amen Clinic ADHD brain scan.",
      },
      { property: "og:title", content: "About — Unmanageable" },
      {
        property: "og:description",
        content: "Who built this site and why severe adult ADHD needs its own honest space.",
      },
    ],
  }),
  component: AboutPage,
});

function ArtistPhoto() {
  // If a real photo is uploaded to /assets/artist-photo.jpg it will be used;
  // otherwise the empty-state styled box renders below.
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          width: "100%",
          maxWidth: 320,
          aspectRatio: "4 / 5",
          borderRadius: 12,
          background: "#1a1a2e",
          border: "1px dashed color-mix(in oklab, var(--color-foreground) 22%, transparent)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="/assets/artist-photo.jpg"
          alt="Brent K. Hubert"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => {
            const img = e.currentTarget;
            img.style.display = "none";
            const fallback = img.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = "grid";
          }}
        />
        <span
          style={{
            display: "none",
            placeItems: "center",
            width: "100%",
            height: "100%",
            color: "var(--color-text-faint)",
            fontSize: "0.85rem",
            letterSpacing: "0.08em",
            textTransform: "lowercase",
          }}
        >
          photo coming
        </span>
      </div>
      <figcaption
        style={{
          fontSize: "0.75rem",
          opacity: 0.6,
          marginTop: 8,
        }}
      >
        Brent K. Hubert
      </figcaption>
    </figure>
  );
}

function AboutPage() {
  return (
    <section className="shell py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-[320px_1fr] items-start">
        <ArtistPhoto />
        <div className="max-w-2xl">
          <span className="eyebrow">About</span>
          <h1 className="mt-3 text-5xl md:text-6xl">I'm not your champion. You don't need one.</h1>
          <p className="mt-6 text-xl" style={{ color: "var(--color-text-muted)" }}>
            I'm not reaching back from the other side of this. There is no other side. I made this at
            2am because my brain brought me here again, like it does. I'll be running on no sleep and
            burnt out by early afternoon. I have 100 tabs open to build this and can't open one email.
          </p>
          <p className="mt-5 text-xl" style={{ color: "var(--color-text-muted)" }}>
            You've been the champion every single day — fighting an impossible thing that knows you
            intimately because it is you. And maybe you've never even been able to say that out loud. So I'm not going to call this a superpower. Traditional society's structure is built around linear brains. Neurodivergent brains are essentially fish out of water.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mt-10">
        <blockquote
          className="pl-5 text-2xl md:text-3xl"
          style={{
            borderLeft: "2px solid var(--color-primary)",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            color: "var(--color-foreground)",
          }}
        >
          I'm managing more chaos at any given moment than most people manage in a crisis week. And
          I'm doing it with a bad brain. So in my mind, I'm doing a better job than anyone I know.
        </blockquote>

        <p className="mt-6 text-lg" style={{ color: "var(--color-text-muted)" }}>
          That doesn't erase the wreckage. Both things are true. The output of a life like this may
          look chaotic, irresponsible, selfish, or broken from the outside. From the inside it's
          often a person fighting harder than anyone around them can see, with less usable machinery
          than anyone around them understands.
        </p>
        <p className="mt-5 text-lg" style={{ color: "var(--color-text-muted)" }}>
          I'm <strong style={{ color: "var(--color-foreground)" }}>Brent K. Hubert</strong>. I make
          music as <strong style={{ color: "var(--color-foreground)" }}>Clearly Confused</strong>. I
          have severe adult ADHD — not the "I lose my keys sometimes" version. I have a brain scan
          from the Amen Clinic for the days I need to point at something. I wrote and made every
          song on this album myself, from inside the loop. I know each one intimately because I'm
          still in it.
        </p>
        <p className="mt-5 text-lg" style={{ color: "var(--color-text-muted)" }}>
          I don't need you to stay. I don't need you to join anything. If these songs do the one
          thing they were built to do — make you feel known, for a minute, by someone who is also in
          it right now — that's enough. Put your email in while you feel it and drop it like it
          never mattered tomorrow if you choose. No judgment. That's how this works.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          {
            k: "The album",
            v: "ADHD: Clearly Confused. Twelve songs, twelve faces of one disorder. No blueprint, no answer, no neat ending.",
          },
          {
            k: "The artist",
            v: "Brent K. Hubert, releasing as Clearly Confused. Diagnosed severe, brain scan and all. Still in it.",
          },
          {
            k: "The point",
            v: "Recognition first. Explanation second. Resources last. Not a movement. A mirror.",
          },
        ].map((c) => (
          <article key={c.k} className="card-surface p-6">
            <div
              style={{
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--color-primary)",
              }}
            >
              {c.k}
            </div>
            <p className="mt-2 text-base">{c.v}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 card-surface p-7 max-w-3xl">
        <span className="eyebrow">If you want to say something back</span>
        <p className="mt-3 text-lg" style={{ color: "var(--color-text-muted)" }}>
          The community page is being built in real time.{" "}
          <Link to="/community" style={{ color: "var(--color-primary)" }}>
            Send a reflection
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
