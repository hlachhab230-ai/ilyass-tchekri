import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { bio, experiences } from "@/lib/parcours";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/i18n/routing";

export async function ParcoursTeaser() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("parcours");
  const isRtl = locale === "ar";

  return (
    <section id="parcours" className="scroll-mt-20 bg-[color:var(--color-paper)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:py-24">
        <Reveal>
          <h2 className="text-[length:var(--step-4)] font-bold text-[color:var(--color-ink)]">
            {t("heading")}
          </h2>
          <p className="mt-4 max-w-md text-[color:var(--color-slate)]">{bio[locale]}</p>
          <Link
            href="/parcours"
            className="mt-6 inline-flex items-center gap-1.5 font-mono text-[length:var(--step--1)] uppercase tracking-wide text-[color:var(--color-tape-ink)] hover:opacity-80"
          >
            {t("experienceTitle")}
            <ArrowRight className={`size-4 ${isRtl ? "rotate-180" : ""}`} aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal>
          <ul className="divide-y divide-[color:var(--border-hair)]">
            {experiences.map((exp) => (
              <li key={exp.place} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4">
                <div>
                  <div className="font-medium text-[color:var(--color-ink)]">{exp.place}</div>
                  <div className="mt-0.5 text-[length:var(--step--1)] text-[color:var(--color-slate)]">
                    {exp.role[locale]}
                  </div>
                </div>
                <div className="font-mono text-[length:var(--step--1)] uppercase tracking-wide text-[color:var(--color-tape-ink)]">
                  {exp.location[locale]}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
