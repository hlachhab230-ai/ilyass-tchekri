import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { PillButton } from "@/components/glass/PillButton";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import type { Locale } from "@/i18n/routing";

export async function Header() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("nav");

  const links = [
    { href: "/soins", label: t("soins") },
    { href: "/methode", label: t("methode") },
    { href: "/parcours", label: t("parcours") },
    { href: "/conseils", label: t("conseils") },
  ];
  const mobileLinks = [{ href: "/", label: t("home") }, ...links];

  return (
    <header className="sticky top-0 z-40 rounded-t-[var(--panel-radius)] border-b border-[color:var(--hairline)] bg-white/85 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-7">
        <Link href="/" className="flex items-baseline gap-2" aria-label={site.name}>
          <span className="font-display text-[length:var(--step-1)] uppercase tracking-tight text-[color:var(--color-ink)]">
            {site.name}
          </span>
          <span className="eyebrow hidden sm:inline">{site.shortRole[locale]}</span>
        </Link>

        <DesktopNav links={links} />

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher />
          <PillButton href="/rendez-vous" label={t("book")} className="hidden sm:inline-flex" />
          <MobileMenu links={mobileLinks} bookLabel={t("book")} />
        </div>
      </div>
    </header>
  );
}
