import { getTranslations, getLocale } from "next-intl/server";
import { Clock, GraduationCap } from "lucide-react";
import { site } from "@/lib/site";
import { PillButton } from "@/components/glass/PillButton";
import { ArchMask } from "@/components/glass/ArchMask";
import { AnatomyVisual } from "@/components/visuals/AnatomyVisual";
import { FloatingBadge } from "@/components/glass/FloatingBadge";
import type { Locale } from "@/i18n/routing";

export async function Hero() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("hero");

  const badges = (
    <>
      <FloatingBadge icon={<Clock className="size-5" />} value="3 ans" label={t("badgeYears")} />
      <FloatingBadge icon={<GraduationCap className="size-5" />} value="7" label={t("badgeTrainings")} delayMs={900} />
    </>
  );

  return (
    <section className="relative px-5 pt-10 sm:px-10 md:pt-16">
      <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
        {/* Texte */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--hairline)] bg-[color:var(--color-ice)] px-3.5 py-1.5">
            <span className="size-2 rounded-full bg-[color:var(--color-lime)]" aria-hidden="true" />
            <span className="eyebrow">{t("eyebrow")}</span>
          </span>

          <h1 className="mt-6 text-[length:var(--hero)]">
            <span className="block">{t("l1")}</span>
            <span className="flex items-center gap-3">
              {t("l2")}
              {/* icône au trait incrustée dans la ligne de titre */}
              <span aria-hidden="true" className="inline-grid size-[0.9em] place-items-center rounded-[0.25em] bg-[color:var(--color-ice)]">
                <svg viewBox="0 0 40 40" className="size-[0.7em]" fill="none">
                  <path d="M8 30 L20 10 L32 30" stroke="var(--color-blue)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 26 A 12 12 0 0 1 28 26" stroke="var(--color-aqua)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </span>
            <span className="block text-[color:var(--color-blue)]">{t("l3")}</span>
          </h1>

          <p className="mt-6 max-w-md text-[length:var(--step-0)] text-[color:var(--color-muted)]">
            {t("subtitle")}
          </p>

          <div className="mt-8">
            <PillButton href="/rendez-vous" label={t("primaryCta")} variant="ink" />
          </div>
        </div>

        {/* Portrait + visuel + badges */}
        <div className="relative">
          <div className="relative mx-auto max-w-[380px]">
            <ArchMask src={site.portrait} alt={site.name} initials="IT" />
            {/* visuel anatomique en halo, débordant en bas */}
            <div className="absolute -bottom-6 -start-8 hidden size-32 md:block">
              <AnatomyVisual name="knee" className="h-full w-full" />
            </div>
            {/* badges superposés (desktop) */}
            <div className="absolute -start-6 top-10 hidden md:block">
              <FloatingBadge icon={<Clock className="size-5" />} value="3 ans" label={t("badgeYears")} />
            </div>
            <div className="absolute -end-4 bottom-16 hidden md:block">
              <FloatingBadge icon={<GraduationCap className="size-5" />} value="7" label={t("badgeTrainings")} delayMs={900} />
            </div>
          </div>
          {/* badges en ligne (mobile) */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 md:hidden">{badges}</div>
        </div>
      </div>
    </section>
  );
}
