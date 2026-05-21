import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SONGS } from "@/data/songs";

const BASE_URL = "https://adhd-hub.neocities.org";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/songs", "/research", "/resources", "/community", "/about"];
        const songPaths = SONGS.map((s) => `/songs/${s.slug}`);
        const all = [...staticPaths, ...songPaths];
        const urls = all.map(
          (p) =>
            `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});