import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site, whatsappBase } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Goniometer } from "@/components/hero/Goniometer";
import { MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/routing";

export async function Hero() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("hero");

  return (
    <section className="bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        {/* Texte */}
        <div>
          <p className="font-mono text-[length:var(--step--1)] uppercase tracking-[0.22em] text-[color:var(--color-tape)]">
            {site.area[locale]}
          </p>
          <h1 className="mt-5 text-[length:var(--step-5)] font-extrabold text-[color:var(--color-paper)]">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-lg text-[length:var(--step-1)] text-[color:color-mix(in_srgb,var(--color-paper)_78%,transparent)]">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="primary" size="lg">
              <Link href="/rendez-vous">{t("primaryCta")}</Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <a href={whatsappBase} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" />
                {t("secondaryCta")}
              </a>
            </Button>
          </div>
        </div>

        {/* Goniomètre — sous le texte en mobile */}
        <div className="flex justify-center md:justify-end">
          <Goniometer label={t("goniometer.label")} sublabel={t("goniometer.sublabel")} />
        </div>
      </div>
    </section>
  );
}
