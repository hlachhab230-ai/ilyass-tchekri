"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase/client";

export default function AdminLogin() {
  const router = useRouter();
  const supabase = React.useMemo(() => getSupabaseBrowser(), []);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Identifiants invalides.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-[0_16px_40px_rgba(10,44,107,.12)]">
        <h1 className="text-[length:var(--step-2)] font-bold">Administration</h1>
        <p className="mt-1 text-[length:var(--step--1)] text-[color:var(--color-muted)]">PhysioFit — demandes de rendez-vous</p>

        {!supabase ? (
          <p className="mt-6 rounded-lg bg-[color:var(--color-ice)] p-4 text-[length:var(--step--1)] text-[color:var(--color-muted)]">
            Supabase n'est pas configuré. Renseignez <code>NEXT_PUBLIC_SUPABASE_URL</code> et{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> (voir README, Phase 2/3).
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-[length:var(--step--1)] font-medium">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-lg border border-[color:var(--hairline)] px-3 focus-visible:outline-3 focus-visible:outline-[color:var(--color-blue)]"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-[length:var(--step--1)] font-medium">Mot de passe</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-lg border border-[color:var(--hairline)] px-3 focus-visible:outline-3 focus-visible:outline-[color:var(--color-blue)]"
              />
            </label>
            {error && <p className="text-[length:var(--step--1)] text-[color:var(--color-error)]">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="h-11 rounded-full bg-[color:var(--color-ink)] font-medium text-white hover:bg-[color:var(--color-blue)] disabled:opacity-50"
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
