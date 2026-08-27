import { NextResponse } from "next/server";
import { bookingSchema, normalizeMoroccanPhone } from "@/lib/booking-schema";
import { buildBookingMessage } from "@/lib/wa-message";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getAvailabilityServer } from "@/lib/availability-server";
import { slotsFor } from "@/lib/availability";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export const runtime = "nodejs";

/**
 * POST /api/bookings — Phase 2.
 * Re-valide la demande côté serveur (zod), honeypot, rate limiting par IP,
 * enregistre dans Supabase (trace) et notifie le praticien par email (Resend).
 * Tout est « best-effort » : si Supabase/Resend ne sont pas configurés ou
 * échouent, on renvoie quand même 200 — WhatsApp reste la notification (Phase 1).
 */
export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(`bookings:${ip}`)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot : un bot remplit `company`. On accepte silencieusement sans rien faire.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true, skipped: "honeypot" });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const d = parsed.data;
  const phone = normalizeMoroccanPhone(d.phone) ?? d.phone;
  const locale: Locale = body.locale === "ar" ? "ar" : "fr";

  // Le créneau doit être réellement disponible ce jour-là (disponibilités
  // dynamiques : jours fermés + fenêtre horaire, gérées côté admin en Phase 3).
  const availability = await getAvailabilityServer();
  if (!slotsFor(d.preferredDate, availability).includes(d.preferredSlot)) {
    return NextResponse.json({ ok: false, error: "slot_unavailable" }, { status: 422 });
  }

  // 1) Persistance Supabase (trace)
  let id: string | null = null;
  let persisted = false;
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase
      .from("booking_requests")
      .insert({
        name: d.name,
        phone,
        reason: d.reason,
        is_first_visit: d.visitType === "first",
        preferred_date: d.preferredDate,
        preferred_slot: d.preferredSlot,
        message: d.message?.trim() ? d.message.trim() : null,
        status: "pending",
        locale,
      })
      .select("id")
      .single();
    if (!error && data) {
      id = data.id as string;
      persisted = true;
    } else if (error) {
      console.error("[bookings] supabase insert error:", error.message);
    }
  }

  // 2) Notification email au praticien (Resend, best-effort)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      const to = process.env.RESEND_TO || site.email;
      const from = process.env.RESEND_FROM || "PhysioFit <onboarding@resend.dev>";
      const text = `${buildBookingMessage(d, locale)}\n\n— envoyé depuis le formulaire du site`;
      await resend.emails.send({
        from,
        to,
        subject: `Nouvelle demande de RDV — ${d.name}`,
        text,
      });
    } catch (e) {
      console.error("[bookings] resend error:", e instanceof Error ? e.message : e);
    }
  }

  return NextResponse.json({ ok: true, id, persisted });
}
