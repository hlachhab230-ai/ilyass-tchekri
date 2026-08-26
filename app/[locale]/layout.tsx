import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { DirectionProvider } from "@radix-ui/react-direction";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Anton, Inter, Cairo } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Backdrop } from "@/components/glass/Backdrop";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";

// Anton : display capitales (latin, un seul poids très gras)
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});
// Inter : texte courant
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
// Cairo : titres + texte arabes (Anton n'a pas l'arabe)
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  const title = `${site.name} — ${site.role[locale]}`;
  const description = t("subtitle");

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s · ${site.name}`,
    },
    description,
    applicationName: site.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        ar: "/ar",
        "x-default": "/fr",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_MA" : "fr_MA",
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    icons: { icon: "/favicon.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const dir = locale === "ar" ? "rtl" : "ltr";
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${anton.variable} ${inter.variable} ${cairo.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <DirectionProvider dir={dir}>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-3 focus:start-3 focus:bg-[color:var(--color-ink)] focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
            >
              {t("skipToContent")}
            </a>
            {/* Fond bleu poudré + mot filigrane géant, derrière le panneau */}
            <Backdrop word="PHYSIO" />
            {/* La page entière vit dans le panneau flottant */}
            <div className="panel overflow-clip">
              <Header />
              <main id="main">{children}</main>
              <Footer />
            </div>
            <MobileActionBar />
            <Toaster />
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
