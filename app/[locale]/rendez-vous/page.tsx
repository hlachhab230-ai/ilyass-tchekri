import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { AlertTriangle } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { site } from "@/lib/site";
import { BookingForm } from "@/components/booking/BookingForm";
import { PracticalInfo } from "@/components/sections/PracticalInfo";
import { PageHeader } from "@/components/layout/PageHeader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking" });
  return {
    title: t("heading"),
    description: t("intro"),
    alternates: {
      canonical: `/${locale}/rendez-vous`,
      languages: { fr: "/fr/rendez-vous", ar: "/ar/rendez-vous", "x-default": "/fr/rendez-vous" },
    },
  };
}

export default async function RendezVousPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("booking");

  return (
    <div className="bg-[color:var(--color-paper)]">
      <PageHeader eyebrow={site.area[locale]} title={t("heading")} subtitle={t("intro")} />

      <div className="px-5 py-12 sm:px-10 md:py-16">
        {/* Avertissement médical, visible près du formulaire */}
        <div className="flex items-start gap-3 rounded-[var(--card-radius)] border border-[color:color-mix(in_srgb,var(--color-error)_45%,transparent)] bg-[color:color-mix(in_srgb,var(--color-error)_7%,transparent)] p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[color:var(--color-error)]" aria-hidden="true" />
          <div>
            <p className="text-[color:var(--color-ink)]">{t("disclaimer.text")}</p>
            <p className="mt-1 text-[length:var(--step--1)] tabular-nums text-[color:var(--color-muted)]">
              {t("disclaimer.emergency")}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <BookingForm />
          <PracticalInfo />
        </div>
      </div>
    </div>
  );
}
