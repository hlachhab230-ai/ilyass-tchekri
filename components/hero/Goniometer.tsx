"use client";

import * as React from "react";

/**
 * Goniomètre animé — élément signature du hero.
 * Un rapporteur gradué, un bras fixe et un bras mobile articulés sur une
 * charnière, et un compteur en mono. Au chargement, le bras balaie de 0° à
 * TARGET en ~1,4 s (ease-out), l'arc se remplit en teal, le chiffre s'incrémente.
 * prefers-reduced-motion : état final affiché directement, sans animation.
 */

const TARGET = 142; // degrés — amplitude retrouvée
const DURATION = 1400; // ms

// Géométrie (viewBox 360 × 300)
const PX = 150; // pivot x
const PY = 235; // pivot y
const ARM = 162; // longueur des bras
const R_ARC = 96; // rayon de l'arc rempli
const R_TICK_OUT = 120;
const R_TICK_IN = 108;

function polar(deg: number, r: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [PX + r * Math.cos(a), PY - r * Math.sin(a)];
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function Goniometer({
  label,
  sublabel,
}: {
  label: string;
  sublabel: string;
}) {
  const [angle, setAngle] = React.useState(0);

  React.useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setAngle(TARGET);
      return;
    }

    let raf = 0;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / DURATION, 1);
      setAngle(TARGET * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const [fixedX, fixedY] = polar(0, ARM);
  const [mobileX, mobileY] = polar(angle, ARM);
  const [arcStartX, arcStartY] = polar(0, R_ARC);
  const [arcEndX, arcEndY] = polar(angle, R_ARC);

  const sector =
    angle < 0.5
      ? ""
      : `M ${PX} ${PY} L ${arcStartX.toFixed(2)} ${arcStartY.toFixed(2)} ` +
        `A ${R_ARC} ${R_ARC} 0 0 0 ${arcEndX.toFixed(2)} ${arcEndY.toFixed(2)} Z`;

  const arcStroke =
    angle < 0.5
      ? ""
      : `M ${arcStartX.toFixed(2)} ${arcStartY.toFixed(2)} ` +
        `A ${R_ARC} ${R_ARC} 0 0 0 ${arcEndX.toFixed(2)} ${arcEndY.toFixed(2)}`;

  // Graduations tous les 10°, plus marquées tous les 30°.
  const ticks = [];
  for (let d = 0; d <= 180; d += 10) {
    const major = d % 30 === 0;
    const [x1, y1] = polar(d, major ? R_TICK_IN - 6 : R_TICK_IN);
    const [x2, y2] = polar(d, R_TICK_OUT);
    ticks.push(
      <line
        key={d}
        x1={x1.toFixed(1)}
        y1={y1.toFixed(1)}
        x2={x2.toFixed(1)}
        y2={y2.toFixed(1)}
        stroke="currentColor"
        strokeWidth={major ? 1.5 : 1}
        opacity={major ? 0.55 : 0.28}
      />,
    );
  }

  const rounded = Math.round(angle);

  return (
    <figure className="m-0 flex flex-col items-center gap-4 text-[color:var(--color-paper)]">
      <svg
        viewBox="0 0 360 300"
        className="w-full max-w-[420px]"
        role="img"
        aria-label={`${label} — ${TARGET}°, ${sublabel}`}
      >
        {/* graduations du rapporteur */}
        <g className="text-[color:var(--color-slate)]">{ticks}</g>

        {/* secteur rempli (teal translucide) */}
        {sector && (
          <path
            d={sector}
            fill="var(--color-tape)"
            fillOpacity={0.16}
            stroke="none"
          />
        )}
        {/* arc lumineux */}
        {arcStroke && (
          <path
            d={arcStroke}
            fill="none"
            stroke="var(--color-tape)"
            strokeWidth={3}
            strokeLinecap="round"
          />
        )}

        {/* bras fixe */}
        <line
          x1={PX}
          y1={PY}
          x2={fixedX}
          y2={fixedY}
          stroke="currentColor"
          strokeWidth={4}
          strokeLinecap="round"
          opacity={0.85}
        />
        {/* bras mobile */}
        <line
          x1={PX}
          y1={PY}
          x2={mobileX}
          y2={mobileY}
          stroke="var(--color-tape)"
          strokeWidth={4}
          strokeLinecap="round"
        />

        {/* charnière (pivot) */}
        <circle cx={PX} cy={PY} r={7} fill="var(--color-ink)" stroke="var(--color-tape)" strokeWidth={2.5} />

        {/* compteur en mono */}
        <text
          x={286}
          y={78}
          textAnchor="middle"
          fill="var(--color-paper)"
          style={{ fontFamily: "var(--font-mono)", fontSize: 40, fontWeight: 500 }}
        >
          {rounded}°
        </text>
      </svg>

      <figcaption className="text-center">
        <div className="font-mono text-[length:var(--step--1)] uppercase tracking-[0.18em] text-[color:var(--color-tape)]">
          {label}
        </div>
        <div className="font-mono text-[length:var(--step--1)] text-[color:color-mix(in_srgb,var(--color-paper)_65%,transparent)]">
          {sublabel}
        </div>
      </figcaption>
    </figure>
  );
}
