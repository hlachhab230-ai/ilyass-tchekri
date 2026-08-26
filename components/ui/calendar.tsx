"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { fr } from "date-fns/locale/fr";
import { arMA } from "date-fns/locale/ar-MA";
import "react-day-picker/style.css";
import { cn } from "@/lib/utils";

type CalendarProps = {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  locale?: "fr" | "ar";
  className?: string;
  /** Dates avant aujourd'hui désactivées par défaut. */
  fromDate?: Date;
  /** Jours de semaine fermés à désactiver (0 = dimanche). */
  disabledDaysOfWeek?: number[];
};

export function Calendar({
  selected,
  onSelect,
  locale = "fr",
  className,
  fromDate,
  disabledDaysOfWeek,
}: CalendarProps) {
  const today = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  return (
    <div
      className={cn("rdp-shell", className)}
      // Teal du kinesio tape comme accent du calendrier.
      style={
        {
          "--rdp-accent-color": "var(--color-blue)",
          "--rdp-accent-background-color":
            "color-mix(in srgb, var(--color-blue) 16%, transparent)",
          "--rdp-today-color": "var(--color-error)",
          "--rdp-day-width": "2.4rem",
          "--rdp-day-height": "2.4rem",
          "--rdp-day_button-width": "2.4rem",
          "--rdp-day_button-height": "2.4rem",
        } as React.CSSProperties
      }
    >
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        locale={locale === "ar" ? arMA : fr}
        dir={locale === "ar" ? "rtl" : "ltr"}
        startMonth={fromDate ?? today}
        disabled={[
          { before: fromDate ?? today },
          ...(disabledDaysOfWeek && disabledDaysOfWeek.length
            ? [{ dayOfWeek: disabledDaysOfWeek }]
            : []),
        ]}
        showOutsideDays={false}
      />
    </div>
  );
}
