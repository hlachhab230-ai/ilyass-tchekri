import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("title"),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/${locale}/mentions-legales`,
      languages: {
        fr: "/fr/mentions-legales",
        ar: "/ar/mentions-legales",
        "x-default": "/fr/mentions-legales",
      },
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const dataItems = t.raw("dataItems") as string[];

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mt-8">
      <h2 className="text-[length:var(--step-2)] font-bold text-[color:var(--color-ink)]">{title}</h2>
      <div className="mt-2 text-[color:var(--color-slate)] leading-relaxed">{children}</div>
    </section>
  );

  return (
    <div className="bg-[color:var(--color-paper)]">
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 md:py-20">
        <h1 className="text-[length:var(--step-3)] font-extrabold text-[color:var(--color-ink)]">
          {t("title")}
        </h1>

        <Section title={t("editorTitle")}>{t("editorBody")}</Section>
        <Section title={t("hostingTitle")}>{t("hostingBody")}</Section>

        <Section title={t("dataTitle")}>
          <p>{t("dataIntro")}</p>
          <ul className="mt-3 space-y-1.5 ps-5 list-disc marker:text-[color:var(--color-tape-ink)]">
            {dataItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title={t("purposeTitle")}>{t("purposeBody")}</Section>
        <Section title={t("retentionTitle")}>{t("retentionBody")}</Section>
        <Section title={t("rightsTitle")}>{t("rightsBody")}</Section>
        <Section title={t("medicalTitle")}>{t("medicalBody")}</Section>

        <Section title={t("contactTitle")}>
          <ul className="space-y-1">
            <li>
              <a href={`tel:${site.phone.tel}`} className="font-mono hover:text-[color:var(--color-tape-ink)]" dir="ltr">
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all hover:text-[color:var(--color-tape-ink)]">
                {site.email}
              </a>
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
