import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase côté serveur (service role) — UNIQUEMENT dans les route
 * handlers, jamais côté client (la clé service_role contourne les RLS).
 * Renvoie null si les variables d'environnement ne sont pas configurées :
 * dans ce cas la Phase 1 continue de fonctionner (WhatsApp reste la notification).
 */
let cached: SupabaseClient | null | undefined;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    cached = null;
    return null;
  }
  cached = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return cached;
}
