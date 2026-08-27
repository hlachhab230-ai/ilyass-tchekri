import { SLOTS } from "./booking-schema";
import { site } from "./site";

/**
 * Disponibilités consommées par le formulaire public ET l'admin (Phase 3).
 * Modèle simple : jours de semaine fermés + fenêtre horaire + dates fermées
 * ponctuelles. Module PUR (client + serveur) — aucune dépendance serveur ici.
 */
export type Availability = {
  configured: boolean;
  closedWeekdays: number[]; // 0 = dimanche
  open: string; // "HH:MM"
  close: string; // "HH:MM"
  closedDates: string[]; // "YYYY-MM-DD"
};

/** Repli statique dérivé de site.hours quand la base n'est pas configurée. */
export function defaultAvailability(): Availability {
  const closedWeekdays = site.hours.weekly.filter((d) => d.closed).map((d) => d.day);
  const openDays = site.hours.weekly.filter((d) => !d.closed);
  const open = openDays.reduce((m, d) => (d.open < m ? d.open : m), "23:59");
  const close = openDays.reduce((m, d) => (d.close > m ? d.close : m), "00:00");
  return {
    configured: false,
    closedWeekdays,
    open: open === "23:59" ? "09:00" : open,
    close: close === "00:00" ? "18:00" : close,
    closedDates: [],
  };
}

export function isDateOpen(dateStr: string, a: Availability): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  if (a.closedDates.includes(dateStr)) return false;
  const day = new Date(dateStr + "T00:00:00").getDay();
  return !a.closedWeekdays.includes(day);
}

/** Créneaux proposables pour une date, selon les disponibilités. */
export function slotsFor(dateStr: string, a: Availability): string[] {
  if (!isDateOpen(dateStr, a)) return [];
  return SLOTS.filter((s) => s >= a.open && s <= a.close);
}
