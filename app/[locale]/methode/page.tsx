import type { Metadata } from "next";
import Image from "next/image";
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

  const caption =
    locale === "ar"
      ? "العلاج بالحجامة أثناء جلسة بالعيادة"
      : "Cupping therapy en séance, au cabinet";

  return (
    <div>
      <PageHeader eyebrow={site.area[locale]} title={nav("methode")} />

      {/* Photo de pratique réelle */}
      <div className="px-5 pt-12 sm:px-10">
        <figure className="relative mx-auto max-w-md overflow-hidden rounded-[var(--card-radius)]">
          <div className="relative aspect-[4/5]">
            <Image
              src="/images/cupping.jpg"
              alt="Ilyass Tchekri appliquant une cupping therapy sur le dos d'un patient"
              fill
              sizes="(max-width: 768px) 100vw, 448px"
              className="object-cover object-center"
              priority
            />
          </div>
          <figcaption className="bg-[color:var(--color-ink)] px-5 py-3 text-[length:var(--step--1)] text-white/85">
            {caption}
          </figcaption>
        </figure>
      </div>

      <SessionFlow />
      <TechniquesAccordion />
    </div>
  );
}
