import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "./LocaleSwitcher";
import type { Locale } from "@/i18n/routing";

export async function Header() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("nav");

  const links = [
    { href: "/#soins", label: t("soins") },
    { href: "/#deroule", label: t("session") },
    { href: "/parcours", label: t("parcours") },
    { href: "/conseils", label: t("conseils") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border-hair)] bg-[color:color-mix(in_srgb,var(--color-paper)_86%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-baseline gap-2"
          aria-label={site.name}
        >
          <span className="font-display text-[length:var(--step-1)] font-bold tracking-tight text-[color:var(--color-ink)]">
            {site.name}
          </span>
          <span className="font-mono text-[length:var(--step--1)] uppercase tracking-widest text-[color:var(--color-tape-ink)]">
            {site.shortRole[locale]}
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-6 md:flex"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[length:var(--step-0)] text-[color:var(--color-slate)] transition-colors hover:text-[color:var(--color-ink)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher />
          <Button asChild variant="ink" size="sm" className="hidden sm:inline-flex">
            <Link href="/rendez-vous">{t("book")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
