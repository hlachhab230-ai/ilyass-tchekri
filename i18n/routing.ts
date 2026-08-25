import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "ar"],
  defaultLocale: "fr",
  // Keep the default locale visible in the URL (/fr, /ar) so hreflang and
  // Open Graph URLs are unambiguous for a bilingual local audience.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
