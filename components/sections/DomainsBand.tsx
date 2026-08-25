import { getTranslations, getLocale } from "next-intl/server";
import { soins } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

/** Bandeau fin : domaines de prise en charge en mono, séparés par des filets. */
export async function DomainsBand() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("domains");

  return (
    <section aria-label={t("srLabel")} className="border-y border-[color:var(--border-hair)] bg-[color:var(--color-navy)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 font-mono text-[length:var(--step--1)] uppercase tracking-wide text-[color:color-mix(in_srgb,var(--color-paper)_82%,transparent)]">
          {soins.map((s, i) => (
            <li key={s.slug} className="flex items-center gap-6">
              {i > 0 && (
                <span aria-hidden="true" className="text-[color:var(--color-tape)]">
                  ·
                </span>
              )}
              {s.title[locale]}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
