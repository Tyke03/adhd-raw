import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Unmanageable" },
      {
        name: "description",
        content:
          "A community space being built in real time for adults living with severe ADHD.",
      },
      { property: "og:title", content: "Community — Unmanageable" },
      {
        property: "og:description",
        content: "Send a reflection — this space is being built in real time.",
      },
    ],
  }),
  component: CommunityPage,
});

const EMAIL = "brent@clearlyconfused.com";

export default function CommunityPage() {
  return (
    <section className="shell py-24 md:py-32">
      <div
        className="max-w-2xl mx-auto"
        style={{ textAlign: "center" }}
      >
        <span className="eyebrow">Community</span>
        <h1 className="mt-4 text-4xl md:text-5xl">
          This space is being built in real time.
        </h1>
        <p
          className="mt-5 text-lg"
          style={{ color: "var(--color-text-muted)" }}
        >
          Send a reflection to {EMAIL} and you might find it here.
        </p>
        <div className="mt-8">
          <a
            href={`mailto:${EMAIL}?subject=Reflection%20for%20Unmanageable`}
            className="inline-flex items-center justify-center min-h-12 px-6 rounded-full text-sm font-bold"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
              textDecoration: "none",
            }}
          >
            Send a reflection
          </a>
        </div>
      </div>
    </section>
  );
}
