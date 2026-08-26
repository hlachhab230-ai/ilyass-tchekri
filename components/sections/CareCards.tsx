import { getTranslations, getLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { soins, getSoin } from "@/lib/content";
import { GlassCard } from "@/components/glass/GlassCard";
import { AnatomyVisual, type AnatomyName } from "@/components/visuals/AnatomyVisual";
import type { Locale } from "@/i18n/routing";

// 3 soins vedettes en cartes (la 3e en ink pour casser le rythme) + le reste en pills.
const FEATURED: { slug: string; anatomy: AnatomyName; ink?: boolean }[] = [
  { slug: "traumatologie-post-operatoire", anatomy: "knee" },
  { slug: "rhumatologie-douleurs-chroniques", anatomy: "spine" },
  { slug: "neurologie", anatomy: "shoulder", ink: true },
];

export async function CareCards() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("soins");
  const featuredSlugs = FEATURED.map((f) => f.slug);
  const others = soins.filter((s) => !featuredSlugs.includes(s.slug));

  return (
    // -mt négatif : les cartes débordent sur la limite hero / section.
    <section id="soins" className="relative z-10 -mt-2 scroll-mt-24 px-5 pt-14 sm:px-10">
      <div className="grid gap-4 md:grid-cols-3">
        {FEATURED.map(({ slug, anatomy, ink }) => {
          const soin = getSoin(slug)!;
          return (
            <GlassCard key={slug} href={`/soins/${slug}`} variant={ink ? "ink" : "glass"}>
              <AnatomyVisual name={anatomy} className="h-24 w-24" />
              <h3 className={`mt-5 text-[length:var(--step-1)] ${ink ? "text-white" : ""}`}>
                {soin.title[locale]}
              </h3>
              <p className={`mt-2 text-[length:var(--step--1)] ${ink ? "text-white/75" : "text-[color:var(--color-muted)]"}`}>
                {soin.excerpt[locale]}
              </p>
            </GlassCard>
          );
        })}
      </div>

      {/* Autres prises en charge — pills vers chaque page soin */}
      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        <span className="eyebrow me-1">{t("heading")} :</span>
        {others.map((s) => (
          <Link
            key={s.slug}
            href={`/soins/${s.slug}`}
            className="group inline-flex items-center gap-1.5 rounded-full border border-[color:var(--hairline)] bg-white px-3.5 py-1.5 text-[length:var(--step--1)] font-medium text-[color:var(--color-ink)] transition-colors hover:border-[color:var(--color-blue)]"
          >
            {s.title[locale]}
            <ArrowUpRight className="size-3.5 text-[color:var(--color-blue)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
          </Link>
        ))}
      </div>
    </section>
  );
}
