import { site, mapsUrl } from "./site";
import type { Locale } from "@/i18n/routing";

/**
 * JSON-LD Physiotherapy + LocalBusiness pour le SEO local.
 * Les horaires proviennent de site.hours (placeholders tant que non confirmés).
 */
export function localBusinessJsonLd(locale: Locale) {
  const openingHoursSpecification = site.hours.weekly
    .filter((d) => !d.closed)
    .map((d) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayName(d.day),
      opens: d.open,
      closes: d.close,
    }));

  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.countryCode,
  };
  // N'inclure la rue que si elle est réellement fournie (pas le placeholder).
  if (!site.address.street.startsWith("À CONFIRMER")) {
    address.streetAddress = site.address.street;
  }

  const geo =
    site.address.lat != null && site.address.lng != null
      ? { "@type": "GeoCoordinates", latitude: site.address.lat, longitude: site.address.lng }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": ["Physiotherapy", "LocalBusiness", "MedicalBusiness"],
    name: `${site.name} — ${site.role[locale]}`,
    description: site.baseline[locale],
    url: `${site.url}/${locale}`,
    telephone: site.phone.tel,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    address,
    ...(geo ? { geo } : {}),
    hasMap: mapsUrl(),
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    availableLanguage: site.languages.fr,
    sameAs: [site.instagram.personal.url, site.instagram.clinic.url],
    openingHoursSpecification,
  };
}

function dayName(day: number): string {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][day];
}
