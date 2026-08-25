import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { Hero } from "@/components/sections/Hero";
import { DomainsBand } from "@/components/sections/DomainsBand";
import { CareGrid } from "@/components/sections/CareGrid";
import { SessionFlow } from "@/components/sections/SessionFlow";
import { ParcoursTeaser } from "@/components/sections/ParcoursTeaser";
import { AdviceTeaser } from "@/components/sections/AdviceTeaser";
import { BookingSection } from "@/components/sections/BookingSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = localBusinessJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <DomainsBand />
      <CareGrid />
      <SessionFlow />
      <ParcoursTeaser />
      <AdviceTeaser />
      <BookingSection />
    </>
  );
}
