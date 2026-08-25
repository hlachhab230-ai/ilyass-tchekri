import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { arMA } from "date-fns/locale/ar-MA";
import { Link } from "@/i18n/navigation";
import type { Article } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export async function ArticleCard({
  article,
  locale,
}: {
  article: Article;
  locale: Locale;
}) {
  const t = await getTranslations("common");
  const dfLocale = locale === "ar" ? arMA : fr;
  const dateLabel = format(new Date(article.date + "T00:00:00"), "d MMM yyyy", {
    locale: dfLocale,
  });

  return (
    <Link
      href={`/conseils/${article.slug}`}
      className="group flex h-full flex-col rounded-xl border border-[color:var(--border-hair)] bg-white/50 p-6 transition-colors hover:border-[color:var(--color-tape-ink)]"
    >
      <div className="flex items-center gap-3 font-mono text-[length:var(--step--1)] uppercase tracking-wide text-[color:var(--color-slate)]">
        <span className="text-[color:var(--color-tape-ink)]">{article.tag[locale]}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={article.date} className="tabular-nums">
          {dateLabel}
        </time>
      </div>
      <h3 className="mt-3 text-[length:var(--step-1)] font-bold text-[color:var(--color-ink)]">
        {article.title[locale]}
      </h3>
      <p className="mt-2 flex-1 text-[length:var(--step-0)] text-[color:var(--color-slate)]">
        {article.excerpt[locale]}
      </p>
      <div className="mt-5 font-mono text-[length:var(--step--1)] text-[color:var(--color-slate)] tabular-nums">
        {article.readingMinutes} {t("minRead")}
      </div>
    </Link>
  );
}
