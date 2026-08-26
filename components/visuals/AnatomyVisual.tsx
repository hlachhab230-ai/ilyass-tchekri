"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Visuel anatomique au trait (genou, colonne, épaule, main), tracé en
 * aqua→bleu sur un halo lumineux — approche « verre » sans image externe.
 * Le tracé s'anime (stroke-dashoffset) au premier passage à l'écran.
 * prefers-reduced-motion : tracé affiché directement.
 *
 * NB : les mêmes tracés existent en fichiers dans /public/anatomy/ comme
 * référence pour de futurs rendus 3D (voir TODO-CLIENT.md). Ils sont inline
 * ici pour permettre l'animation et éviter une requête réseau.
 */
export type AnatomyName = "knee" | "spine" | "shoulder" | "hand";

// Tracés au trait, volontairement stylisés (placeholders avant rendus 3D).
// Doubles contours pour évoquer les os et lire comme de l'anatomie.
const PATHS: Record<AnatomyName, string[]> = {
  knee: [
    "M74 14 C 78 48, 92 56, 96 82", // fémur — bord interne
    "M98 14 C 102 48, 120 56, 122 84", // fémur — bord externe
    "M74 96 C 74 100, 122 100, 122 96", // condyles / ligne articulaire
    "M90 108 C 90 142, 86 172, 84 192", // tibia interne
    "M112 108 C 114 142, 112 172, 110 192", // tibia externe
    "M128 112 C 132 142, 128 168, 126 188", // fibula
  ],
  spine: [
    "M100 12 C 126 38, 74 64, 100 90 C 126 116, 74 142, 100 188", // rachis (courbe en S)
    "M86 40 L 114 40", "M82 66 L 118 66", "M80 92 L 120 92",
    "M82 118 L 118 118", "M86 144 L 114 144", "M90 168 L 110 168", // vertèbres
  ],
  shoulder: [
    "M108 90 m -24 0 a 24 24 0 1 0 48 0 a 24 24 0 1 0 -48 0", // tête humérale (cercle)
    "M120 112 C 132 142, 130 170, 122 192", // bras externe
    "M100 112 C 98 142, 96 170, 92 190", // bras interne
    "M28 66 C 60 60, 88 66, 108 80", // clavicule
    "M40 74 C 52 108, 70 128, 96 132", // omoplate
  ],
  hand: [
    "M62 192 C 54 156, 56 124, 68 112 C 96 100, 128 104, 142 118 C 150 148, 148 176, 136 192", // paume
    "M70 112 L 66 44", "M70 44 C 66 40, 74 40, 70 44", // index
    "M90 106 L 88 30", "M110 106 L 112 28", "M130 110 L 134 40", // majeur, annulaire, auriculaire
    "M142 120 C 154 104, 156 84, 146 74", // pouce
  ],
};

export function AnatomyVisual({
  name,
  className,
}: {
  name: AnatomyName;
  className?: string;
}) {
  const ref = React.useRef<SVGSVGElement | null>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setShown(true), io.disconnect())),
      { threshold: 0.3 },
    );
    io.observe(el);
    // Filet de sécurité : le tracé ne doit jamais rester invisible si
    // l'observer ne se déclenche pas (scroll rapide, hors-écran prolongé).
    const fallback = window.setTimeout(() => setShown(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const gid = React.useId();

  return (
    <div className={cn("relative isolate grid place-items-center", className)}>
      <div aria-hidden="true" className="halo absolute inset-[4%] -z-10 rounded-full blur-xl opacity-90" />
      <svg
        ref={ref}
        viewBox="0 0 200 200"
        className="h-full w-full"
        role="img"
        aria-label={LABELS[name]}
        fill="none"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-aqua)" />
            <stop offset="100%" stopColor="var(--color-blue)" />
          </linearGradient>
        </defs>
        {PATHS[name].map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={`url(#${gid})`}
            strokeWidth={3.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: shown ? 0 : 1,
              transition: `stroke-dashoffset 900ms ease ${i * 90}ms`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const LABELS: Record<AnatomyName, string> = {
  knee: "Illustration du genou",
  spine: "Illustration de la colonne vertébrale",
  shoulder: "Illustration de l'épaule",
  hand: "Illustration de la main",
};
