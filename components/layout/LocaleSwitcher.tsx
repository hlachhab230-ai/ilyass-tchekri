"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABEL: Record<string, string> = { fr: "FR", ar: "ع" };

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label="Langue / اللغة"
      className="inline-flex items-center rounded-full border border-[color:var(--border-hair)] p-0.5 font-mono text-[length:var(--step--1)]"
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            aria-current={active ? "true" : undefined}
            onClick={() => router.replace(pathname, { locale: loc })}
            className={cn(
              "min-w-9 rounded-full px-2.5 py-1 transition-colors",
              active
                ? "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
                : "text-[color:var(--color-slate)] hover:text-[color:var(--color-ink)]",
            )}
          >
            {LABEL[loc]}
          </button>
        );
      })}
    </div>
  );
}
