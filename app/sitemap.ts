import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";
import { soins, articles } from "@/lib/content";

const staticPaths = ["", "/parcours", "/conseils", "/rendez-vous", "/mentions-legales"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...soins.map((s) => `/soins/${s.slug}`),
    ...articles.map((a) => `/conseils/${a.slug}`),
  ];

  return paths.map((path) => ({
    url: `${site.url}/${routing.defaultLocale}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${site.url}/${loc}${path}`]),
      ),
    },
  }));
}
