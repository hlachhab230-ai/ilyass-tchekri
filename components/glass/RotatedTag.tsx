import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Étiquette pivotée (#6). Petit pill gris clair, mot en capitales, tourné.
 * À utiliser 3–4 fois maximum sur toute la page, avec des mots réels
 * (KINÉ, TÉTOUAN, THÉRAPIE MANUELLE). Se colle au bord du panneau.
 */
export function RotatedTag({
  label,
  rotate = -6,
  className,
}: {
  label: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-block rounded-[var(--radius-pill)] border border-[color:var(--hairline)] bg-[color:var(--color-ice)] px-3 py-1.5 text-[color:var(--color-ink)] shadow-[var(--shadow-badge)]",
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {label}
    </span>
  );
}
