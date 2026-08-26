import { getTranslations, getLocale } from "next-intl/server";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { PillButton } from "@/components/glass/PillButton";
import type { Locale } from "@/i18n/routing";

export async function About() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("about");

  return (
    <section className="px-5 py-16 sm:px-10 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        {/* Image cabinet (placeholder) + carte de verre verticale superposée */}
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-[var(--card-radius)] bg-gradient-to-br from-[color:var(--color-sky)] to-[color:color-mix(in_srgb,var(--color-blue)_40%,white)]">
            {/* Emplacement photo du cabinet — voir TODO-CLIENT */}
            <div className="flex h-full w-full items-center justify-center">
              <span className="eyebrow text-[color:var(--color-ink)]/70">Photo du cabinet</span>
            </div>
          </div>
          <div className="glass-solid absolute -bottom-6 end-4 w-40 rounded-[var(--card-radius)] p-4 shadow-[var(--shadow-card)]">
            <div className="eyebrow">{t("sinceLabel")}</div>
            <div className="font-display text-[length:var(--step-3)] text-[color:var(--color-ink)]">{t("sinceValue")}</div>
            <p className="mt-1 text-[length:var(--step--1)] text-[color:var(--color-muted)]">{t("sincePhrase")}</p>
          </div>
        </div>

        {/* Texte */}
        <div>
          {/* Badge lime : texte en marine (contraste AA élevé), pas de texte clair sur lime */}
          <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-lime)] px-3.5 py-1.5">
            <span className="size-1.5 rounded-full bg-[color:var(--color-ink)]" aria-hidden="true" />
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-ink)]">
              {t("badge")}
            </span>
          </span>

          <h2 className="mt-5 text-[length:var(--step-3)]">{t("heading")}</h2>
          <p className="mt-4 max-w-md text-[color:var(--color-muted)]">{t("body")}</p>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <PillButton href="/parcours" label={t("cta")} variant="ink" />
            <a href={`tel:${site.phone.tel}`} className="inline-flex items-center gap-2.5 font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-blue)]">
              <span className="grid size-9 place-items-center rounded-full bg-[color:var(--color-ice)]">
                <Phone className="size-4 text-[color:var(--color-blue)]" aria-hidden="true" />
              </span>
              <span dir="ltr" className="tabular-nums">{site.phone.display}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
