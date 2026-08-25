"use client";

import { Toaster as Sonner } from "sonner";

/** Toaster global (sonner), stylé aux tokens du site. */
export function Toaster() {
  return (
    <Sonner
      position="top-center"
      toastOptions={{
        style: {
          background: "var(--color-ink)",
          color: "var(--color-paper)",
          border: "1px solid color-mix(in srgb, var(--color-tape) 40%, transparent)",
          fontFamily: "var(--font-sans)",
        },
      }}
    />
  );
}
