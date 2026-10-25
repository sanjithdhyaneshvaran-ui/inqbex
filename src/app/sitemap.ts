import type { MetadataRoute } from "next";
import { pages } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: new URL(p.href, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: p.href === "/" ? 1 : 0.8,
  }));
}
