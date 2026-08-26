import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";
import { SessionFlow } from "@/components/sections/SessionFlow";
import { TechniquesAccordion } from "@/components/sections/TechniquesAccordion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const nav = await getTranslations({ locale, namespace: "nav" });
  const s = await getTranslations({ locale, namespace: "session" });
  return {
    title: nav("methode"),
    description: s("intro"),
    alternates: {
      canonical: `/${locale}/methode`,
      languages: { fr: "/fr/methode", ar: "/ar/methode", "x-default": "/fr/methode" },
    },
  };
}

export default async function MethodePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations("nav");

  return (
    <div>
      <div className="bg-[color:var(--color-ink)] text-white">
        <div className="px-5 py-14 sm:px-10 md:py-20">
          <p className="eyebrow text-[color:var(--color-sky)]">{site.area[locale]}</p>
          <h1 className="mt-3 text-[length:var(--step-4)]">{nav("methode")}</h1>
        </div>
      </div>
      <SessionFlow />
      <TechniquesAccordion />
    </div>
  );
}
