import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight, Instagram } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { articlesByDate } from "@/lib/content";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { ArticleCard } from "@/components/sections/ArticleCard";
import type { Locale } from "@/i18n/routing";

export async function AdviceTeaser() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("conseils");
  const latest = articlesByDate().slice(0, 3);
  const isRtl = locale === "ar";

  return (
    <section id="conseils" className="scroll-mt-20 bg-[color:var(--color-paper)] border-t border-[color:var(--border-hair)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[length:var(--step-4)] font-bold text-[color:var(--color-ink)]">
              {t("heading")}
            </h2>
            <p className="mt-3 max-w-xl text-[color:var(--color-slate)]">{t("intro")}</p>
          </div>
          <a
            href={site.instagram.personal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[length:var(--step--1)] uppercase tracking-wide text-[color:var(--color-slate)] hover:text-[color:var(--color-ink)]"
          >
            <Instagram className="size-4" aria-hidden="true" />
            {t("followInsta")}
          </a>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((a, i) => (
            <Reveal key={a.slug} delayMs={Math.min(i * 70, 210)}>
              <ArticleCard article={a} locale={locale} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <Link
            href="/conseils"
            className="inline-flex items-center gap-1.5 font-mono text-[length:var(--step--1)] uppercase tracking-wide text-[color:var(--color-tape-ink)] hover:opacity-80"
          >
            {t("seeAll")}
            <ArrowRight className={`size-4 ${isRtl ? "rotate-180" : ""}`} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
