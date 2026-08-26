"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { techniqueDetails } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Techniques — grille de pills, chacune ouvre une courte explication (accordéon). */
export function TechniquesAccordion() {
  const t = useTranslations("techniques");
  const locale = useLocale() as Locale;
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section className="px-5 py-16 sm:px-10 md:py-24">
      <h2 className="text-[length:var(--step-3)]">{t("heading")}</h2>
      <p className="mt-3 max-w-xl text-[color:var(--color-muted)]">{t("intro")}</p>

      <ul className="mt-8 space-y-2.5">
        {techniqueDetails.map((tech, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className="glass-solid overflow-hidden rounded-[var(--card-radius)]">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`tech-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start focus-visible:outline-3 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--color-ink)]"
              >
                <span className="text-[length:var(--step-0)] font-semibold text-[color:var(--color-ink)]">
                  {tech.name[locale]}
                </span>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full transition-colors",
                    isOpen ? "bg-[color:var(--color-lime)] text-[color:var(--color-ink)]" : "bg-[color:var(--color-ice)] text-[color:var(--color-ink)]",
                  )}
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                </span>
              </button>
              <div
                id={`tech-panel-${i}`}
                hidden={!isOpen}
                className="px-5 pb-5 text-[length:var(--step--1)] text-[color:var(--color-muted)]"
              >
                {tech.desc[locale]}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
