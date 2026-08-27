import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getAvailabilityServer } from "@/lib/availability-server";
import { updateStatusAction, updateAvailabilityAction, signOutAction } from "./actions";

export const dynamic = "force-dynamic";

type Booking = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  reason: string;
  is_first_visit: boolean;
  preferred_date: string;
  preferred_slot: string;
  message: string | null;
  status: "pending" | "confirmed" | "declined";
  locale: string;
};

const STATUS_LABEL: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmé",
  declined: "Refusé",
};
const STATUS_CLS: Record<string, string> = {
  pending: "bg-[color:var(--color-ice)] text-[color:var(--color-ink)]",
  confirmed: "bg-[color:var(--color-lime)] text-[color:var(--color-ink)]",
  declined: "bg-[color:color-mix(in_srgb,var(--color-error)_18%,white)] text-[color:var(--color-error)]",
};
const WEEKDAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; date?: string }>;
}) {
  const supabase = await getSupabaseServer();
  if (!supabase) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="text-[length:var(--step-2)] font-bold">Administration</h1>
        <p className="mt-4 rounded-lg bg-white p-4 text-[color:var(--color-muted)]">
          Supabase n'est pas configuré. Renseignez les variables d'environnement (voir README, Phase 2/3),
          puis exécutez <code>supabase/schema.sql</code>.
        </p>
      </main>
    );
  }

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/admin/login");

  const { status, date } = await searchParams;
  const admin = getSupabaseAdmin();
  let bookings: Booking[] = [];
  if (admin) {
    let q = admin.from("booking_requests").select("*").order("created_at", { ascending: false }).limit(300);
    if (status && ["pending", "confirmed", "declined"].includes(status)) q = q.eq("status", status);
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) q = q.eq("preferred_date", date);
    const { data } = await q;
    bookings = (data as Booking[] | null) ?? [];
  }

  const avail = await getAvailabilityServer();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[length:var(--step-2)] font-bold">Demandes de rendez-vous</h1>
          <p className="text-[length:var(--step--1)] text-[color:var(--color-muted)]">{userData.user.email}</p>
        </div>
        <form action={signOutAction}>
          <button className="rounded-full border border-[color:var(--hairline)] bg-white px-4 py-2 text-[length:var(--step--1)] font-medium hover:border-[color:var(--color-blue)]">
            Se déconnecter
          </button>
        </form>
      </header>

      {/* Filtres */}
      <form className="mt-6 flex flex-wrap items-end gap-3" method="get">
        <label className="grid gap-1">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-muted)]">Statut</span>
          <select name="status" defaultValue={status ?? ""} className="h-10 rounded-lg border border-[color:var(--hairline)] bg-white px-3">
            <option value="">Tous</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmé</option>
            <option value="declined">Refusé</option>
          </select>
        </label>
        <label className="grid gap-1">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-muted)]">Date souhaitée</span>
          <input type="date" name="date" defaultValue={date ?? ""} className="h-10 rounded-lg border border-[color:var(--hairline)] bg-white px-3" />
        </label>
        <button className="h-10 rounded-full bg-[color:var(--color-ink)] px-5 font-medium text-white hover:bg-[color:var(--color-blue)]">Filtrer</button>
        {(status || date) && (
          <a href="/admin" className="h-10 leading-10 text-[length:var(--step--1)] text-[color:var(--color-blue)] hover:underline">Réinitialiser</a>
        )}
      </form>

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-[color:var(--hairline)] bg-white">
        <table className="w-full min-w-[820px] text-start text-[length:var(--step--1)]">
          <thead className="bg-[color:var(--color-ice)] text-[color:var(--color-muted)]">
            <tr className="[&>th]:px-3 [&>th]:py-3 [&>th]:text-start [&>th]:font-semibold">
              <th>Reçue</th><th>Nom</th><th>Téléphone</th><th>Motif</th><th>Type</th><th>Souhait</th><th>Statut</th><th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--hairline)]">
            {bookings.length === 0 && (
              <tr><td colSpan={8} className="px-3 py-10 text-center text-[color:var(--color-muted)]">Aucune demande.</td></tr>
            )}
            {bookings.map((b) => (
              <tr key={b.id} className="[&>td]:px-3 [&>td]:py-3 align-top">
                <td className="whitespace-nowrap text-[color:var(--color-muted)] tabular-nums">
                  {new Date(b.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })}
                </td>
                <td className="font-medium">{b.name}{b.message ? <div className="mt-1 max-w-[220px] text-[color:var(--color-muted)]">{b.message}</div> : null}</td>
                <td className="whitespace-nowrap tabular-nums" dir="ltr">
                  <a className="hover:text-[color:var(--color-blue)]" href={`https://wa.me/${b.phone}`} target="_blank" rel="noopener noreferrer">{b.phone}</a>
                </td>
                <td>{b.reason}</td>
                <td className="whitespace-nowrap">{b.is_first_visit ? "1ère consult." : "Suivi"}</td>
                <td className="whitespace-nowrap tabular-nums">{b.preferred_date} · {b.preferred_slot}</td>
                <td><span className={`inline-block rounded-full px-2.5 py-1 text-[0.75rem] font-medium ${STATUS_CLS[b.status]}`}>{STATUS_LABEL[b.status]}</span></td>
                <td>
                  <div className="flex flex-wrap gap-1.5">
                    {(["confirmed", "declined", "pending"] as const)
                      .filter((s) => s !== b.status)
                      .map((s) => (
                        <form key={s} action={updateStatusAction}>
                          <input type="hidden" name="id" value={b.id} />
                          <input type="hidden" name="status" value={s} />
                          <button className="rounded-full border border-[color:var(--hairline)] px-2.5 py-1 text-[0.75rem] hover:border-[color:var(--color-blue)]">
                            {STATUS_LABEL[s]}
                          </button>
                        </form>
                      ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Disponibilités */}
      <section className="mt-10 rounded-xl border border-[color:var(--hairline)] bg-white p-5 sm:p-7">
        <h2 className="text-[length:var(--step-1)] font-bold">Disponibilités</h2>
        <p className="mt-1 text-[length:var(--step--1)] text-[color:var(--color-muted)]">
          Le formulaire public grise automatiquement les jours et créneaux fermés.
        </p>
        {!avail.configured && (
          <p className="mt-3 rounded-lg bg-[color:var(--color-ice)] p-3 text-[length:var(--step--1)] text-[color:var(--color-muted)]">
            Valeurs par défaut (base non configurée). Une fois Supabase branché, l'enregistrement fonctionnera.
          </p>
        )}
        <form action={updateAvailabilityAction} className="mt-5 grid gap-5">
          <fieldset className="grid gap-2">
            <legend className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-muted)]">Jours fermés</legend>
            <div className="flex flex-wrap gap-3">
              {WEEKDAYS.map((label, i) => (
                <label key={i} className="inline-flex items-center gap-2">
                  <input type="checkbox" name="closedWeekdays" value={i} defaultChecked={avail.closedWeekdays.includes(i)} />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-wrap gap-5">
            <label className="grid gap-1">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-muted)]">Ouverture</span>
              <input type="time" name="open" defaultValue={avail.open} className="h-10 rounded-lg border border-[color:var(--hairline)] px-3" />
            </label>
            <label className="grid gap-1">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-muted)]">Fermeture</span>
              <input type="time" name="close" defaultValue={avail.close} className="h-10 rounded-lg border border-[color:var(--hairline)] px-3" />
            </label>
          </div>
          <label className="grid gap-1">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-muted)]">Dates fermées (YYYY-MM-DD, séparées par espace/virgule)</span>
            <input type="text" name="closedDates" defaultValue={avail.closedDates.join(" ")} placeholder="2026-01-01 2026-05-01" className="h-10 rounded-lg border border-[color:var(--hairline)] px-3" />
          </label>
          <div>
            <button className="rounded-full bg-[color:var(--color-ink)] px-6 py-2.5 font-medium text-white hover:bg-[color:var(--color-blue)]">
              Enregistrer les disponibilités
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
