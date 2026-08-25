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
    <footer className="border-t border-[color:var(--border-hair)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="font-display text-[length:var(--step-1)] font-bold">
            {site.name}
          </div>
          <div className="mt-1 font-mono text-[length:var(--step--1)] uppercase tracking-widest text-[color:var(--color-tape)]">
            {site.area[locale]}
          </div>
          <p className="mt-4 max-w-xs text-[length:var(--step-0)] text-[color:color-mix(in_srgb,var(--color-paper)_72%,transparent)]">
            {t("tagline")}
          </p>
        </div>

        <nav aria-label={t("navTitle")}>
          <h2 className="font-mono text-[length:var(--step--1)] uppercase tracking-widest text-[color:color-mix(in_srgb,var(--color-paper)_60%,transparent)]">
            {t("navTitle")}
          </h2>
          <ul className="mt-4 space-y-2 text-[color:color-mix(in_srgb,var(--color-paper)_85%,transparent)]">
            <li><Link href="/#soins" className="hover:text-[color:var(--color-tape)]">{nav("soins")}</Link></li>
            <li><Link href="/parcours" className="hover:text-[color:var(--color-tape)]">{nav("parcours")}</Link></li>
            <li><Link href="/conseils" className="hover:text-[color:var(--color-tape)]">{nav("conseils")}</Link></li>
            <li><Link href="/rendez-vous" className="hover:text-[color:var(--color-tape)]">{nav("book")}</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-[length:var(--step--1)] uppercase tracking-widest text-[color:color-mix(in_srgb,var(--color-paper)_60%,transparent)]">
            {t("contactTitle")}
          </h2>
          <ul className="mt-4 space-y-2 text-[color:color-mix(in_srgb,var(--color-paper)_85%,transparent)]">
            <li>
              <a href={`tel:${site.phone.tel}`} className="font-mono hover:text-[color:var(--color-tape)]">
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={whatsappBase} className="hover:text-[color:var(--color-tape)]">WhatsApp</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-[color:var(--color-tape)] break-all">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.instagram.personal.url} className="hover:text-[color:var(--color-tape)]">
                {site.instagram.personal.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:color-mix(in_srgb,var(--color-paper)_14%,transparent)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-[length:var(--step--1)] text-[color:color-mix(in_srgb,var(--color-paper)_60%,transparent)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} {site.name}. {t("rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="hover:text-[color:var(--color-tape)]">
              {t("legalLink")}
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-6 text-[length:var(--step--1)] text-[color:color-mix(in_srgb,var(--color-paper)_48%,transparent)] sm:px-6">
          {t("disclaimerShort")}
        </div>
      </div>
    </footer>
  );
}
