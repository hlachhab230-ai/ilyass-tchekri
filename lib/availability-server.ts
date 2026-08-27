import { getSupabaseAdmin } from "./supabase-admin";
import { defaultAvailability, type Availability } from "./availability";

/** Lecture serveur des disponibilités (Supabase). Repli statique si non configuré. */
export async function getAvailabilityServer(): Promise<Availability> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return defaultAvailability();

  const { data, error } = await supabase
    .from("availability")
    .select("closed_weekdays, open_time, close_time, closed_dates")
    .eq("id", true)
    .single();

  if (error || !data) return defaultAvailability();

  return {
    configured: true,
    closedWeekdays: (data.closed_weekdays as number[] | null) ?? [],
    open: (data.open_time as string | null) ?? "09:00",
    close: (data.close_time as string | null) ?? "18:00",
    closedDates: ((data.closed_dates as string[] | null) ?? []).map((d) => String(d)),
  };
}
