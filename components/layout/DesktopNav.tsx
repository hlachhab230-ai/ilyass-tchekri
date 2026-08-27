"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** Nav desktop avec mise en évidence du lien actif. */
export function DesktopNav({ links }: { links: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Navigation principale" className="hidden items-center gap-7 md:flex">
      {links.map((l) => {
        // pathname inclut le préfixe de langue (/fr/...) : on teste la fin.
        const path = l.href;
        const active = pathname.replace(/^\/(fr|ar)/, "") === path || (path !== "/" && pathname.includes(path));
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "text-[length:var(--step-0)] font-medium transition-colors",
              active
                ? "text-[color:var(--color-ink)]"
                : "text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]",
            )}
          >
            <span className={cn("inline-block border-b-2 pb-0.5", active ? "border-[color:var(--color-lime)]" : "border-transparent")}>
              {l.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
