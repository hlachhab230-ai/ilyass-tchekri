import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { Hero } from "@/components/sections/Hero";
import { CareCards } from "@/components/sections/CareCards";
import { About } from "@/components/sections/About";
import { StatsBand } from "@/components/sections/StatsBand";
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <CareCards />
      <About />
      <StatsBand />
      <AdviceTeaser />
      <BookingSection />
    </>
  );
}
