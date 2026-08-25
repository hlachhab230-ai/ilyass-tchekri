import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { soins, techniques } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/i18n/routing";

export async function CareGrid() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("soins");
  const isRtl = locale === "ar";

  return (
    <section id="soins" className="scroll-mt-20 bg-[color:var(--color-paper)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <h2 className="text-[length:var(--step-4)] font-bold text-[color:var(--color-ink)]">
            {t("heading")}
          </h2>
          <p className="mt-3 max-w-xl text-[color:var(--color-slate)]">{t("intro")}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {soins.map((s, i) => (
            <Reveal key={s.slug} delayMs={Math.min(i * 60, 240)}>
              <Link
                href={`/soins/${s.slug}`}
                className="group flex h-full flex-col justify-between rounded-xl border border-[color:var(--border-hair)] bg-white/50 p-6 transition-colors hover:border-[color:var(--color-tape-ink)]"
              >
                <div>
                  <h3 className="text-[length:var(--step-1)] font-bold text-[color:var(--color-ink)]">
                    {s.title[locale]}
                  </h3>
                  <p className="mt-2 text-[length:var(--step-0)] text-[color:var(--color-slate)]">
                    {s.excerpt[locale]}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[length:var(--step--1)] uppercase tracking-wide text-[color:var(--color-tape-ink)]">
                  {t("discover")}
                  <ArrowRight
                    className={`size-4 transition-transform group-hover:translate-x-1 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}

          {/* Carte large — techniques complémentaires */}
          <Reveal className="sm:col-span-2 lg:col-span-3">
            <div className="rounded-xl border border-[color:var(--border-hair)] bg-[color:var(--color-ink)] p-6 text-[color:var(--color-paper)] sm:p-8">
              <h3 className="text-[length:var(--step-2)] font-bold">
                {t("techniquesTitle")}
              </h3>
              <p className="mt-2 max-w-2xl text-[color:color-mix(in_srgb,var(--color-paper)_75%,transparent)]">
                {t("techniquesDesc")}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {techniques.map((tech) => (
                  <li
                    key={tech.fr}
                    className="rounded-full border border-[color:color-mix(in_srgb,var(--color-paper)_28%,transparent)] px-3.5 py-1.5 font-mono text-[length:var(--step--1)] text-[color:color-mix(in_srgb,var(--color-paper)_88%,transparent)]"
                  >
                    {tech[locale]}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
