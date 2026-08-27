import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { soins, getSoin } from "@/lib/content";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    soins.map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const soin = getSoin(slug);
  if (!soin) return {};
  return {
    title: soin.seoTitle[locale],
    description: soin.metaDescription[locale],
    alternates: {
      canonical: `/${locale}/soins/${slug}`,
      languages: { fr: `/fr/soins/${slug}`, ar: `/ar/soins/${slug}`, "x-default": `/fr/soins/${slug}` },
    },
    openGraph: {
      title: soin.seoTitle[locale],
      description: soin.metaDescription[locale],
      url: `${site.url}/${locale}/soins/${slug}`,
    },
  };
}

export default async function SoinPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const soin = getSoin(slug);
  if (!soin) notFound();

  const t = await getTranslations("soins");
  const nav = await getTranslations("nav");
  const isRtl = locale === "ar";

  return (
    <article className="bg-[color:var(--color-paper)]">
      {/* En-tête sombre */}
      <div className="bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 md:py-20">
          <Link
            href="/soins"
            className="inline-flex items-center gap-1.5 text-[length:var(--step--1)] uppercase tracking-wide text-[color:color-mix(in_srgb,var(--color-paper)_70%,transparent)] hover:text-[color:var(--color-sky)]"
          >
            <ArrowRight className={`size-4 ${isRtl ? "" : "rotate-180"}`} aria-hidden="true" />
            {t("allSoins")}
          </Link>
          <p className="mt-6 eyebrow text-[color:var(--color-sky)]">{site.area[locale]}</p>
          <h1 className="mt-3 text-[length:var(--step-4)]">{soin.title[locale]}</h1>
          <p className="mt-4 max-w-2xl text-[length:var(--step-1)] text-[color:color-mix(in_srgb,var(--color-paper)_80%,transparent)]">
            {soin.excerpt[locale]}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-4xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        {/* Motifs pris en charge */}
        <section>
          <h2 className="text-[length:var(--step--1)] uppercase tracking-widest text-[color:var(--color-muted)]">
            {t("conditionsTitle")}
          </h2>
          <ul className="mt-4 space-y-3">
            {soin.conditions.map((c) => (
              <li key={c.fr} className="flex items-start gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--color-blue)]" aria-hidden="true" />
                <span className="text-[color:var(--color-ink)]">{c[locale]}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Ma prise en charge */}
        <section>
          <h2 className="text-[length:var(--step--1)] uppercase tracking-widest text-[color:var(--color-muted)]">
            {t("approachTitle")}
          </h2>
          <ul className="mt-4 space-y-3">
            {soin.approach.map((a) => (
              <li key={a.fr} className="flex items-start gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--color-blue)]" aria-hidden="true" />
                <span className="text-[color:var(--color-ink)]">{a[locale]}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* CTA */}
      <div className="border-t border-[color:var(--hairline)]">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-[length:var(--step-1)] font-medium text-[color:var(--color-ink)]">
            {soin.excerpt[locale]}
          </p>
          <Button asChild variant="ink" size="lg">
            <Link href="/rendez-vous">{nav("book")}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
