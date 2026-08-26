"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

type Step = { title: string; desc: string };

/**
 * Le déroulé d'une séance — 4 étapes 01→04, ligne de progression lime qui se
 * remplit au scroll. prefers-reduced-motion : remplie directement.
 */
export function SessionFlow() {
  const t = useTranslations("session");
  const steps = t.raw("steps") as Step[];
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [filled, setFilled] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFilled(true);
      return;
    }
    const io = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && (setFilled(true), io.disconnect())),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="deroule" className="scroll-mt-24 px-5 py-16 sm:px-10 md:py-24">
      <h2 className="text-[length:var(--step-3)]">{t("heading")}</h2>
      <p className="mt-3 max-w-xl text-[color:var(--color-muted)]">{t("intro")}</p>

      <div ref={ref} className="relative mt-12">
        {/* piste + remplissage lime (horizontal desktop) */}
        <div className="absolute inset-x-0 top-5 hidden h-0.5 bg-[color:var(--hairline)] md:block">
          <div
            className="h-full bg-[color:var(--color-lime)] transition-[width] duration-[1400ms] ease-out"
            style={{ width: filled ? "100%" : "0%" }}
          />
        </div>

        <ol className="grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <li key={i} className="relative">
              <div className="mb-4 grid size-10 place-items-center rounded-full border border-[color:var(--hairline)] bg-white font-display text-[length:var(--step-0)] text-[color:var(--color-ink)]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-[length:var(--step-1)]">{step.title}</h3>
              <p className="mt-2 text-[length:var(--step--1)] text-[color:var(--color-muted)]">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
