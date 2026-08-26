import { getTranslations, getLocale } from "next-intl/server";
import { Instagram } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { articlesByDate } from "@/lib/content";
import { site } from "@/lib/site";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { PillButton } from "@/components/glass/PillButton";
import type { Locale } from "@/i18n/routing";

export async function AdviceTeaser() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("conseils");
  const latest = articlesByDate().slice(0, 3);

  return (
    <section id="conseils" className="scroll-mt-24 px-5 py-16 sm:px-10 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-[length:var(--step-3)]">{t("heading")}</h2>
          <p className="mt-3 max-w-xl text-[color:var(--color-muted)]">{t("intro")}</p>
        </div>
        <a
          href={site.instagram.personal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[length:var(--step--1)] font-medium text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
        >
          <Instagram className="size-4" aria-hidden="true" />
          {t("followInsta")}
        </a>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((a) => (
          <ArticleCard key={a.slug} article={a} locale={locale} />
        ))}
      </div>

      <div className="mt-8">
        <PillButton href="/conseils" label={t("seeAll")} variant="white" />
      </div>
    </section>
  );
}
