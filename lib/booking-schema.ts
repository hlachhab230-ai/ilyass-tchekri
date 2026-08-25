import { z } from "zod";
import { site } from "./site";

/**
 * Normalise un numéro de téléphone marocain vers le format international
 * canonique « 2126XXXXXXXX » / « 2127XXXXXXXX » (12 chiffres, sans +).
 * Accepte : 06…, 07…, +2126…, 2126…, avec ou sans espaces.
 * Renvoie null si le numéro n'est pas un mobile marocain valide.
 */
export function normalizeMoroccanPhone(input: string): string | null {
  // Ne garder que les chiffres (on tolère le +, les espaces, tirets, points).
  const digits = input.replace(/[^\d]/g, "");

  let national: string; // 9 chiffres commençant par 6 ou 7

  if (/^0[67]\d{8}$/.test(digits)) {
    // 06XXXXXXXX / 07XXXXXXXX  (10 chiffres)
    national = digits.slice(1);
  } else if (/^212[67]\d{8}$/.test(digits)) {
    // 2126XXXXXXXX / 2127XXXXXXXX (12 chiffres)
    national = digits.slice(3);
  } else if (/^[67]\d{8}$/.test(digits)) {
    // 6XXXXXXXX / 7XXXXXXXX (9 chiffres, sans préfixe)
    national = digits;
  } else {
    return null;
  }

  return `212${national}`;
}

/** Formate un numéro canonique 2126XXXXXXXX pour l'affichage : +212 6 XX XX XX XX */
export function formatMoroccanPhone(canonical: string): string {
  // canonical = 212 + 9 chiffres
  const n = canonical.slice(3); // 9 chiffres
  return `+212 ${n[0]} ${n.slice(1, 3)} ${n.slice(3, 5)} ${n.slice(5, 7)} ${n.slice(7, 9)}`;
}

/** Créneaux horaires proposés (chips), de 09:00 à 18:00 par pas de 30 min. */
export const SLOTS: string[] = (() => {
  const out: string[] = [];
  for (let h = 9; h <= 18; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    if (h !== 18) out.push(`${String(h).padStart(2, "0")}:30`);
  }
  return out;
})();

export const VISIT_TYPES = ["first", "follow-up"] as const;
export type VisitType = (typeof VISIT_TYPES)[number];

/**
 * Créneaux réellement proposables pour une date donnée, d'après les horaires
 * hebdomadaires (site.hours). Un jour fermé renvoie [] ; sinon les créneaux
 * compris dans la plage open→close. (La disponibilité fine — congés, créneaux
 * déjà pris — relève de la Phase 3 ; ici on s'appuie sur les horaires.)
 */
export function slotsForDate(dateStr: string): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return SLOTS;
  const day = new Date(dateStr + "T00:00:00").getDay();
  const h = site.hours.weekly.find((d) => d.day === day);
  if (!h || h.closed) return [];
  return SLOTS.filter((s) => s >= h.open && s <= h.close);
}

/**
 * Schéma de réservation. Les messages d'erreur sont neutres (clés) ; la
 * traduction se fait côté composant via next-intl pour rester bilingue.
 * On garde les libellés FR par défaut comme repli lisible.
 */
export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "name_min" })
    .max(80, { message: "name_max" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "phone_required" })
    .refine((v) => normalizeMoroccanPhone(v) !== null, { message: "phone_invalid" }),
  reason: z.string().trim().min(1, { message: "reason_required" }),
  visitType: z.enum(VISIT_TYPES, { message: "visit_required" }),
  preferredDate: z
    .string()
    .trim()
    .min(1, { message: "date_required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "date_invalid" }),
  preferredSlot: z.string().trim().min(1, { message: "slot_required" }),
  // `.optional()` suffit : "" passe déjà .max(600) après .trim(). Ne pas
  // envelopper dans .or(z.literal("")) — cela transforme un dépassement en
  // erreur d'union générique et rend le message "message_max" inatteignable.
  message: z.string().trim().max(600, { message: "message_max" }).optional(),
  // Honeypot anti-spam : doit rester vide (champ caché aux humains).
  company: z.string().max(0).optional(),
}).superRefine((data, ctx) => {
  // Le créneau choisi doit exister dans les horaires du jour sélectionné.
  if (
    /^\d{4}-\d{2}-\d{2}$/.test(data.preferredDate) &&
    data.preferredSlot &&
    !slotsForDate(data.preferredDate).includes(data.preferredSlot)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["preferredSlot"],
      message: "slot_unavailable",
    });
  }
});

export type BookingInput = z.input<typeof bookingSchema>;
export type BookingData = z.output<typeof bookingSchema>;
