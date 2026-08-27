import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Supabase navigateur (login admin). Renvoie null si non configuré.
 * Utilise uniquement la clé anon (publique) — jamais la service_role.
 */
export function getSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createBrowserClient(url, anon);
}
