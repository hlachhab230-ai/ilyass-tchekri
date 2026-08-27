import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { site } from "@/lib/site";
import { bio, experiences, formations } from "@/lib/parcours";
import { techniques } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { ArchMask } from "@/components/glass/ArchMask";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "parcours" });
  return {
    title: t("heading"),
    description: t("intro"),
    alternates: {
      canonical: `/${locale}/parcours`,
      languages: { fr: "/fr/parcours", ar: "/ar/parcours", "x-default": "/fr/parcours" },
    },
  };
}

export default async function ParcoursPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("parcours");

  const languages = site.languages[locale];

  return (
    <div className="bg-[color:var(--color-paper)]">
      {/* En-tête */}
      <div className="bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
        <div className="mx-auto grid max-w-4xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr] md:py-20">
          <div>
            <p className="eyebrow text-[color:var(--color-sky)]">{site.area[locale]}</p>
            <h1 className="mt-3 text-[length:var(--step-4)]">{t("heading")}</h1>
            <p className="mt-4 text-[length:var(--step-1)] text-[color:color-mix(in_srgb,var(--color-paper)_80%,transparent)]">
              {bio[locale]}
            </p>
          </div>
          <div className="mx-auto w-full max-w-[300px]">
            <ArchMask src={site.portrait} alt={site.name} initials="IT" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 md:py-20">
        {/* Expériences */}
        <Reveal as="section">
          <h2 className="text-[length:var(--step-3)] font-bold text-[color:var(--color-ink)]">
            {t("experienceTitle")}
          </h2>
          <ul className="mt-6 divide-y divide-[color:var(--hairline)]">
            {experiences.map((exp) => (
              <li key={exp.place} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                <div>
                  <div className="text-[length:var(--step-1)] font-medium text-[color:var(--color-ink)]">
                    {exp.place}
                  </div>
                  <div className="mt-1 text-[color:var(--color-muted)]">{exp.role[locale]}</div>
                </div>
                <div className="text-[length:var(--step--1)] uppercase tracking-wide text-[color:var(--color-blue)]">
                  {exp.location[locale]}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Formations — années en mono */}
        <Reveal as="section" className="mt-16">
          <h2 className="text-[length:var(--step-3)] font-bold text-[color:var(--color-ink)]">
            {t("formationTitle")}
          </h2>
          <div className="mt-6 space-y-6">
            {formations.map((f) => (
              <div key={f.year} className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <div className="text-[length:var(--step-0)] tabular-nums text-[color:var(--color-blue)]">
                  {f.year}
                </div>
                <ul className="space-y-1.5">
                  {f.items.map((item) => (
                    <li key={item.fr} className="text-[color:var(--color-ink)]">
                      {item[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Techniques + langues */}
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <Reveal as="section">
            <h2 className="text-[length:var(--step-2)] font-bold text-[color:var(--color-ink)]">
              {t("techniquesTitle")}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {techniques.map((tech) => (
                <li
                  key={tech.fr}
                  className="rounded-full border border-[color:var(--hairline)] px-3.5 py-1.5 text-[length:var(--step--1)] text-[color:var(--color-muted)]"
                >
                  {tech[locale]}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-[length:var(--step-2)] font-bold text-[color:var(--color-ink)]">
              {t("languagesTitle")}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {languages.map((lang) => (
                <li
                  key={lang}
                  className="rounded-full border border-[color:var(--hairline)] px-3.5 py-1.5 text-[length:var(--step-0)] text-[color:var(--color-ink)]"
                >
                  {lang}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
