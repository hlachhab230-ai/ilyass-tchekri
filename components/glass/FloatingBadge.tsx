import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Badge flottant (#4). Petite carte blanche : icône dans un carré bleu clair +
 * grand chiffre + libellé minuscule. Se superpose aux images.
 * Flottement vertical 6px, boucle 4s, décalée via `delayMs` (désactivé si
 * prefers-reduced-motion — géré en CSS).
 */
export function FloatingBadge({
  icon,
  value,
  label,
  delayMs = 0,
  className,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  delayMs?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "badge-float inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[var(--shadow-badge)]",
        className,
      )}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[color:var(--color-ice)] text-[color:var(--color-blue)]">
        {icon}
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[length:var(--step-2)] text-[color:var(--color-ink)]">
          {value}
        </span>
        <span className="eyebrow mt-1">{label}</span>
      </span>
    </div>
  );
}
