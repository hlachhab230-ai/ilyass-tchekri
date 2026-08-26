import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { arMA } from "date-fns/locale/ar-MA";
import { getTranslations } from "next-intl/server";
import type { Article } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { GlassCard } from "@/components/glass/GlassCard";

export async function ArticleCard({
  article,
  locale,
}: {
  article: Article;
  locale: Locale;
}) {
  const t = await getTranslations("common");
  const dfLocale = locale === "ar" ? arMA : fr;
  const dateLabel = format(new Date(article.date + "T00:00:00"), "d MMM yyyy", { locale: dfLocale });

  return (
    <GlassCard href={`/conseils/${article.slug}`}>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-[color:var(--color-ice)] px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-blue)]">
          {article.tag[locale]}
        </span>
        <time dateTime={article.date} className="text-[length:var(--step--1)] text-[color:var(--color-muted)] tabular-nums">
          {dateLabel}
        </time>
      </div>
      <h3 className="mt-3 text-[length:var(--step-1)]">{article.title[locale]}</h3>
      <p className="mt-2 flex-1 text-[length:var(--step--1)] text-[color:var(--color-muted)]">{article.excerpt[locale]}</p>
      <div className="mt-4 text-[length:var(--step--1)] text-[color:var(--color-muted)] tabular-nums">
        {article.readingMinutes} {t("minRead")}
      </div>
    </GlassCard>
  );
}
