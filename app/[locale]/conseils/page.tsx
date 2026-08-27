import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Instagram } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { site } from "@/lib/site";
import { articlesByDate } from "@/lib/content";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "conseils" });
  return {
    title: t("heading"),
    description: t("intro"),
    alternates: {
      canonical: `/${locale}/conseils`,
      languages: { fr: "/fr/conseils", ar: "/ar/conseils", "x-default": "/fr/conseils" },
    },
  };
}

export default async function ConseilsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("conseils");
  const list = articlesByDate();

  return (
    <div className="bg-[color:var(--color-paper)]">
      <PageHeader eyebrow={site.area[locale]} title={t("heading")} subtitle={t("intro")}>
        <a
          href={site.instagram.personal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-[length:var(--step--1)] font-semibold text-[color:var(--color-sky)] hover:text-[color:var(--color-lime)]"
        >
          <Instagram className="size-4" aria-hidden="true" />
          {site.instagram.personal.handle}
        </a>
      </PageHeader>

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => (
            <Reveal key={a.slug} delayMs={Math.min(i * 60, 240)}>
              <ArticleCard article={a} locale={locale} />
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-[length:var(--step--1)] text-[color:var(--color-muted)]">
          {t("note")}
        </p>
      </div>
    </div>
  );
}
