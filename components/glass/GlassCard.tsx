import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Carte de verre (#3). Survol : s'élève de 6px, sa pastille de flèche passe en lime.
 * `variant="ink"` : fond marine plein, texte blanc — pour casser le rythme (3e carte).
 * Si `href` est fourni, toute la carte est un lien interne.
 */
export function GlassCard({
  href,
  variant = "glass",
  arrow = true,
  className,
  children,
}: {
  href?: string;
  variant?: "glass" | "ink";
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const isInk = variant === "ink";
  const surface = isInk
    ? "bg-[color:var(--color-ink)] text-white border-t border-white/15"
    : "glass-solid text-[color:var(--color-ink)]";

  const inner = (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-[var(--card-radius)] p-6 transition-transform duration-300 group-hover:-translate-y-1.5",
        surface,
        className,
      )}
    >
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className={cn(
            "mt-6 grid size-10 place-items-center self-end rounded-full transition-colors duration-300",
            isInk ? "bg-white/12 text-white" : "bg-[color:var(--color-ice)] text-[color:var(--color-ink)]",
            "group-hover:bg-[color:var(--color-lime)] group-hover:text-[color:var(--color-ink)]",
          )}
        >
          <ArrowUpRight className="size-5 rtl:-scale-x-100" />
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group block h-full focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-ink)] rounded-[var(--card-radius)]">
        {inner}
      </Link>
    );
  }
  return <div className="group h-full">{inner}</div>;
}
