import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { site } from "@/lib/site";
import { soins } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { GlassCard } from "@/components/glass/GlassCard";
import { AnatomyVisual, type AnatomyName } from "@/components/visuals/AnatomyVisual";

const ANATOMY: Record<string, AnatomyName> = {
  "traumatologie-post-operatoire": "knee",
  "rhumatologie-douleurs-chroniques": "spine",
  neurologie: "shoulder",
  perinatalite: "hand",
  "kinesitherapie-respiratoire": "spine",
  "orthopedie-pediatrique": "knee",
  "sport-performance": "knee",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "soins" });
  return {
    title: t("heading"),
    description: t("intro"),
    alternates: {
      canonical: `/${locale}/soins`,
      languages: { fr: "/fr/soins", ar: "/ar/soins", "x-default": "/fr/soins" },
    },
  };
}

export default async function SoinsIndex({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("soins");

  return (
    <div>
      <div className="bg-[color:var(--color-ink)] text-white">
        <div className="px-5 py-14 sm:px-10 md:py-20">
          <p className="eyebrow text-[color:var(--color-sky)]">{site.area[locale]}</p>
          <h1 className="mt-3 text-[length:var(--step-4)]">{t("heading")}</h1>
          <p className="mt-4 max-w-2xl text-[length:var(--step-1)] text-white/80">{t("intro")}</p>
        </div>
      </div>

      <div className="px-5 py-14 sm:px-10 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {soins.map((s) => (
            <GlassCard key={s.slug} href={`/soins/${s.slug}`}>
              <AnatomyVisual name={ANATOMY[s.slug] ?? "knee"} className="h-24 w-24" />
              <h2 className="mt-5 text-[length:var(--step-1)]">{s.title[locale]}</h2>
              <p className="mt-2 text-[length:var(--step--1)] text-[color:var(--color-muted)]">{s.excerpt[locale]}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
