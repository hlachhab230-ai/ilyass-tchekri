import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Bouton-pastille — le SEUL motif de bouton du site.
 * Un pill avec le libellé, suivi d'un cercle contenant une flèche diagonale ↗.
 * Survol : le cercle tourne, la flèche glisse en diagonale. RTL : flèche miroitée.
 * Variantes : `ink` (fond marine + cercle blanc) · `white` (fond blanc + cercle lime).
 *
 * Rendu polymorphe :
 *  - `href`         → lien interne localisé (next-intl Link)
 *  - `externalHref` → lien externe <a> (WhatsApp, tel:, mailto, Instagram)
 *  - sinon          → <button>
 */
type Variant = "ink" | "white";

const wrapCls: Record<Variant, string> = {
  ink: "bg-[color:var(--color-ink)] text-white hover:bg-[color:color-mix(in_srgb,var(--color-ink)_88%,black)]",
  white:
    "bg-white text-[color:var(--color-ink)] border border-[color:var(--hairline)] hover:border-[color:var(--color-blue)]",
};
const circleCls: Record<Variant, string> = {
  ink: "bg-white text-[color:var(--color-ink)]",
  // Le lime ne porte JAMAIS de texte : il est fond, la flèche est en marine.
  white: "bg-[color:var(--color-lime)] text-[color:var(--color-ink)]",
};

const base =
  "group inline-flex items-center gap-1 rounded-[var(--radius-pill)] p-1.5 text-[length:var(--step-0)] font-medium transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-ink)] disabled:opacity-50";

function Inner({ label, variant }: { label: React.ReactNode; variant: Variant }) {
  return (
    <>
      <span className="ps-5 pe-1.5 py-1">{label}</span>
      <span
        className={cn(
          "grid size-9 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45",
          circleCls[variant],
        )}
      >
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
          aria-hidden="true"
        />
      </span>
    </>
  );
}

type CommonProps = {
  label: React.ReactNode;
  variant?: Variant;
  className?: string;
};

type PillButtonProps = CommonProps &
  (
    | ({ href: string; externalHref?: never } & Record<string, unknown>)
    | ({ externalHref: string; href?: never } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: never; externalHref?: never } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

export function PillButton(props: PillButtonProps) {
  const { label, variant = "ink", className, ...rest } = props;

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest as { href: string };
    return (
      <Link href={href} className={cn(base, wrapCls[variant], className)} {...linkRest}>
        <Inner label={label} variant={variant} />
      </Link>
    );
  }
  if ("externalHref" in rest && rest.externalHref) {
    const { externalHref, ...aRest } = rest as { externalHref: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={externalHref} className={cn(base, wrapCls[variant], className)} {...aRest}>
        <Inner label={label} variant={variant} />
      </a>
    );
  }
  return (
    <button
      className={cn(base, wrapCls[variant], className)}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <Inner label={label} variant={variant} />
    </button>
  );
}
