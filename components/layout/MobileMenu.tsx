"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Menu mobile (hamburger). Sur mobile, c'est le seul accès aux pages internes.
 * Overlay plein écran, fermeture au clic sur un lien / Échap / bouton fermer.
 */
export function MobileMenu({
  links,
  bookLabel,
}: {
  links: { href: string; label: string }[];
  bookLabel: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => setMounted(true), []);

  // Fermer à chaque navigation.
  React.useEffect(() => setOpen(false), [pathname]);

  // Échap + blocage du scroll quand ouvert.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="grid size-10 place-items-center rounded-full border border-[color:var(--hairline)] bg-white text-[color:var(--color-ink)] focus-visible:outline-3 focus-visible:outline-[color:var(--color-ink)]"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      {open && mounted && createPortal(
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-[color:var(--color-ink)] text-white" role="dialog" aria-modal="true" dir={document.documentElement.dir}>
          <div className="flex h-16 items-center justify-between px-4">
            <span className="font-display text-[length:var(--step-1)] uppercase">Menu</span>
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setOpen(false)}
              className="grid size-10 place-items-center rounded-full border border-white/20 focus-visible:outline-3 focus-visible:outline-white"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex flex-col px-4 pt-6" aria-label="Navigation mobile">
            {links.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "flex items-center justify-between border-b border-white/12 py-5 font-display text-[length:var(--step-3)] uppercase",
                    active ? "text-[color:var(--color-lime)]" : "text-white",
                  )}
                >
                  {l.label}
                  <ArrowUpRight className="size-6 opacity-60 rtl:-scale-x-100" aria-hidden="true" />
                </Link>
              );
            })}
            <Link
              href="/rendez-vous"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[color:var(--color-lime)] px-6 py-4 font-medium text-[color:var(--color-ink)]"
            >
              {bookLabel}
              <ArrowUpRight className="size-5 rtl:-scale-x-100" aria-hidden="true" />
            </Link>
          </nav>
        </div>,
        document.body,
      )}
    </div>
  );
}
