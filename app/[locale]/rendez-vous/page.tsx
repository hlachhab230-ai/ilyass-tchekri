import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { AlertTriangle } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { BookingForm } from "@/components/booking/BookingForm";
import { PracticalInfo } from "@/components/sections/PracticalInfo";

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
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
        <h1 className="text-[length:var(--step-4)] font-extrabold text-[color:var(--color-ink)]">
          {t("heading")}
        </h1>
        <p className="mt-3 max-w-2xl text-[length:var(--step-1)] text-[color:var(--color-slate)]">
          {t("intro")}
        </p>

        {/* Avertissement médical, visible près du formulaire */}
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-[color:color-mix(in_srgb,var(--color-ember)_45%,transparent)] bg-[color:color-mix(in_srgb,var(--color-ember)_7%,transparent)] p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[color:var(--color-ember)]" aria-hidden="true" />
          <div>
            <p className="text-[color:var(--color-ink)]">{t("disclaimer.text")}</p>
            <p className="mt-1 font-mono text-[length:var(--step--1)] tabular-nums text-[color:var(--color-slate)]">
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
