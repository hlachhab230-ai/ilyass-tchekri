import * as React from "react";

/**
 * Fond derrière le panneau flottant : le dégradé bleu poudré vit sur <body>,
 * ce composant ajoute le mot géant en filigrane blanc semi-transparent, coupé
 * par le panneau (il est en position fixe, derrière le panneau via z-index).
 */
export function Backdrop({ word = "PHYSIO" }: { word?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-0 overflow-hidden">
      <div className="mx-auto flex max-w-[1280px] justify-center">
        <span
          className="select-none whitespace-nowrap font-display uppercase leading-none text-white/25"
          style={{ fontSize: "clamp(6rem, 22vw, 18rem)", letterSpacing: "-0.03em", marginTop: "0.2em" }}
        >
          {word}
        </span>
      </div>
    </div>
  );
}
