/**
 * Rate limiting en mémoire, par clé (IP). Fenêtre glissante simple.
 *
 * ⚠️ En serverless (Vercel), la mémoire n'est pas partagée entre instances :
 * c'est une protection « best-effort » contre les envois répétés depuis une
 * même instance. Pour une limite stricte en production, brancher un store
 * partagé (Upstash Redis, ou une table Supabase). Voir README (Phase 2).
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
