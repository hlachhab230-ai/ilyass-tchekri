"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const STATUSES = ["pending", "confirmed", "declined"] as const;

async function requireUser() {
  const supabase = await getSupabaseServer();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

/** Change le statut d'une demande. */
export async function updateStatusAction(formData: FormData) {
  if (!(await requireUser())) redirect("/admin/login");
  const admin = getSupabaseAdmin();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !STATUSES.includes(status as (typeof STATUSES)[number])) return;

  await admin.from("booking_requests").update({ status }).eq("id", id);
  revalidatePath("/admin");
}

/** Met à jour les disponibilités (jours fermés, fenêtre horaire, dates fermées). */
export async function updateAvailabilityAction(formData: FormData) {
  if (!(await requireUser())) redirect("/admin/login");
  const admin = getSupabaseAdmin();
  if (!admin) return;

  const closedWeekdays = formData
    .getAll("closedWeekdays")
    .map((v) => parseInt(String(v), 10))
    .filter((n) => !Number.isNaN(n) && n >= 0 && n <= 6);
  const open = String(formData.get("open") || "09:00");
  const close = String(formData.get("close") || "18:00");
  const closedDates = String(formData.get("closedDates") || "")
    .split(/[\s,;]+/)
    .filter((s) => /^\d{4}-\d{2}-\d{2}$/.test(s));

  await admin
    .from("availability")
    .update({
      closed_weekdays: closedWeekdays,
      open_time: open,
      close_time: close,
      closed_dates: closedDates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", true);
  revalidatePath("/admin");
}

export async function signOutAction() {
  const supabase = await getSupabaseServer();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}
