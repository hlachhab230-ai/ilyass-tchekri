"use client";

import { SLOTS } from "@/lib/booking-schema";
import { cn } from "@/lib/utils";

export function SlotChips({
  value,
  onChange,
  labelledBy,
  available,
}: {
  value: string;
  onChange: (slot: string) => void;
  labelledBy?: string;
  /** Créneaux proposables (selon les horaires du jour). Les autres sont grisés. */
  available?: string[];
}) {
  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      className="flex flex-wrap gap-2"
    >
      {SLOTS.map((slot) => {
        const active = value === slot;
        const disabled = available ? !available.includes(slot) : false;
        return (
          <button
            key={slot}
            type="button"
            role="radio"
            aria-checked={active}
            aria-disabled={disabled}
            disabled={disabled}
            onClick={() => !disabled && onChange(slot)}
            className={cn(
              "rounded-full border px-3.5 py-2 font-mono text-[length:var(--step--1)] tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-tape-ink)]",
              active
                ? "border-[color:var(--color-tape)] bg-[color:var(--color-tape)] text-[color:var(--color-ink)]"
                : disabled
                  ? "cursor-not-allowed border-[color:var(--border-hair)] text-[color:color-mix(in_srgb,var(--color-slate)_45%,transparent)] line-through"
                  : "border-[color:var(--border-hair)] text-[color:var(--color-slate)] hover:border-[color:var(--color-tape)] hover:text-[color:var(--color-ink)]",
            )}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
