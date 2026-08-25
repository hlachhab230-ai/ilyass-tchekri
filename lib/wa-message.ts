import { site } from "./site";
import { formatMoroccanPhone, normalizeMoroccanPhone, type BookingData } from "./booking-schema";
import type { Locale } from "@/i18n/routing";

/**
 * Construit le message texte de demande de rendez-vous, lisible tel quel côté
 * praticien. Utilisé pour WhatsApp (encodeURIComponent) et pour le corps mailto.
 */
export function buildBookingMessage(data: BookingData, locale: Locale): string {
  const canonical = normalizeMoroccanPhone(data.phone) ?? data.phone;
  const phone = formatMoroccanPhone(canonical);

  const t =
    locale === "ar"
      ? {
          title: "طلب موعد",
          name: "الاسم",
          phone: "الهاتف",
          reason: "السبب",
          type: "النوع",
          first: "استشارة أولى",
          follow: "متابعة",
          date: "التاريخ المطلوب",
          slot: "التوقيت",
          message: "رسالة",
        }
      : {
          title: "Demande de rendez-vous",
          name: "Nom",
          phone: "Téléphone",
          reason: "Motif",
          type: "Type",
          first: "première consultation",
          follow: "suivi",
          date: "Date souhaitée",
          slot: "Créneau",
          message: "Message",
        };

  const lines = [
    t.title,
    `${t.name} : ${data.name}`,
    `${t.phone} : ${phone}`,
    `${t.reason} : ${data.reason}`,
    `${t.type} : ${data.visitType === "first" ? t.first : t.follow}`,
    `${t.date} : ${data.preferredDate}`,
    `${t.slot} : ${data.preferredSlot}`,
  ];
  if (data.message && data.message.trim().length > 0) {
    lines.push(`${t.message} : ${data.message.trim()}`);
  }
  return lines.join("\n");
}

/** Lien WhatsApp pré-rempli. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Lien mailto: pré-rempli avec le même contenu. */
export function mailtoLink(message: string, locale: Locale): string {
  const subject = locale === "ar" ? "طلب موعد" : "Demande de rendez-vous";
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    message,
  )}`;
}
