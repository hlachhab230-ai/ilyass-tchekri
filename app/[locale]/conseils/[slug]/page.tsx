import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { arMA } from "date-fns/locale/ar-MA";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { articles, getArticle } from "@/lib/content";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    articles.map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title[locale],
    description: article.excerpt[locale],
    alternates: {
      canonical: `/${locale}/conseils/${slug}`,
      languages: {
        fr: `/fr/conseils/${slug}`,
        ar: `/ar/conseils/${slug}`,
        "x-default": `/fr/conseils/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: article.title[locale],
      description: article.excerpt[locale],
      url: `${site.url}/${locale}/conseils/${slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getArticle(slug);
  if (!article) notFound();

  const t = await getTranslations("common");
  const tc = await getTranslations("conseils");
  const nav = await getTranslations("nav");
  const dfLocale = locale === "ar" ? arMA : fr;
  const dateLabel = format(new Date(article.date + "T00:00:00"), "d MMMM yyyy", {
    locale: dfLocale,
  });
  const isRtl = locale === "ar";

  // Corps de l'article (MDX, rédigé en français).
  let Body: React.ComponentType;
  try {
    const mod = await import(`@/content/conseils/${slug}.mdx`);
    Body = mod.default;
  } catch {
    notFound();
  }

  return (
    <article className="bg-[color:var(--color-paper)]">
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 md:py-20">
        <Link
          href="/conseils"
          className="inline-flex items-center gap-1.5 font-mono text-[length:var(--step--1)] uppercase tracking-wide text-[color:var(--color-slate)] hover:text-[color:var(--color-ink)]"
        >
          <ArrowRight className={`size-4 ${isRtl ? "" : "rotate-180"}`} aria-hidden="true" />
          {tc("seeAll")}
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[length:var(--step--1)] uppercase tracking-wide text-[color:var(--color-slate)]">
          <span className="text-[color:var(--color-tape-ink)]">{article.tag[locale]}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.date} className="tabular-nums">{dateLabel}</time>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">
            {article.readingMinutes} {t("minRead")}
          </span>
        </div>

        <h1 className="mt-4 text-[length:var(--step-4)] font-extrabold text-[color:var(--color-ink)]">
          {article.title[locale]}
        </h1>
        <p className="mt-4 text-[length:var(--step-1)] text-[color:var(--color-slate)]">
          {article.excerpt[locale]}
        </p>

        {/* Le corps des articles est rédigé en français. */}
        {locale === "ar" && (
          <p className="mt-6 rounded-md border border-[color:var(--border-hair)] bg-white/50 px-4 py-3 text-[length:var(--step--1)] text-[color:var(--color-slate)]">
            المقال متوفر حالياً باللغة الفرنسية.
          </p>
        )}

        <div className="mt-8 border-t border-[color:var(--border-hair)] pt-4">
          <Body />
        </div>

        <div className="mt-10 rounded-lg border border-[color:var(--border-hair)] bg-white/50 p-4 text-[length:var(--step--1)] text-[color:var(--color-slate)]">
          {tc("note")}
        </div>

        <div className="mt-8">
          <Button asChild variant="ink" size="lg">
            <Link href="/rendez-vous">{nav("book")}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
