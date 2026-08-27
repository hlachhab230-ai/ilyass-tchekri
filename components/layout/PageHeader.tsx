import * as React from "react";

/** En-tête sombre commun aux pages secondaires (cohérence + DRY). */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-[color:var(--color-ink)] text-white">
      <div className="px-5 py-14 sm:px-10 md:py-20">
        {eyebrow && <p className="eyebrow text-[color:var(--color-sky)]">{eyebrow}</p>}
        <h1 className="mt-3 text-[length:var(--step-4)]">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-[length:var(--step-1)] text-white/80">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
}
