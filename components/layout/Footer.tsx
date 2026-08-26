import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site, whatsappBase } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="rounded-b-[var(--panel-radius)] bg-[color:var(--color-ink)] text-white">
      <div className="grid gap-10 px-6 py-14 sm:px-10 md:grid-cols-3">
        <div>
          <div className="font-display text-[length:var(--step-2)] uppercase">{site.name}</div>
          <div className="eyebrow mt-2 text-[color:var(--color-sky)]">{site.area[locale]}</div>
          <p className="mt-4 max-w-xs text-white/75">{t("tagline")}</p>
        </div>

        <nav aria-label={t("navTitle")}>
          <h2 className="eyebrow text-[color:var(--color-sky)]">{t("navTitle")}</h2>
          <ul className="mt-4 space-y-2 text-white/85">
            <li><Link href="/#soins" className="hover:text-[color:var(--color-lime)]">{nav("soins")}</Link></li>
            <li><Link href="/parcours" className="hover:text-[color:var(--color-lime)]">{nav("parcours")}</Link></li>
            <li><Link href="/conseils" className="hover:text-[color:var(--color-lime)]">{nav("conseils")}</Link></li>
            <li><Link href="/rendez-vous" className="hover:text-[color:var(--color-lime)]">{nav("book")}</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-[color:var(--color-sky)]">{t("contactTitle")}</h2>
          <ul className="mt-4 space-y-2 text-white/85">
            <li><a href={`tel:${site.phone.tel}`} dir="ltr" className="hover:text-[color:var(--color-lime)]">{site.phone.display}</a></li>
            <li><a href={whatsappBase} className="hover:text-[color:var(--color-lime)]">WhatsApp</a></li>
            <li><a href={`mailto:${site.email}`} className="break-all hover:text-[color:var(--color-lime)]">{site.email}</a></li>
            <li><a href={site.instagram.personal.url} className="hover:text-[color:var(--color-lime)]">{site.instagram.personal.handle}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="flex flex-col gap-2 px-6 py-5 text-[length:var(--step--1)] text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>© {year} {site.name}. {t("rights")}</p>
          <Link href="/mentions-legales" className="hover:text-[color:var(--color-lime)]">{t("legalLink")}</Link>
        </div>
        <p className="px-6 pb-6 text-[length:var(--step--1)] text-white/45 sm:px-10">{t("disclaimerShort")}</p>
      </div>
    </footer>
  );
}
