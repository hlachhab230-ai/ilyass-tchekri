import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/layout/PageHeader";
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
      <PageHeader eyebrow={site.area[locale]} title={nav("methode")} />
      <SessionFlow />
      <TechniquesAccordion />
    </div>
  );
}
