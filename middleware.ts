import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // /admin : hors i18n, on rafraîchit seulement la session Supabase.
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return updateSession(request);
  }
  // Le reste du site : routing next-intl (FR/AR).
  return intlMiddleware(request);
}

export const config = {
  // Tout sauf api, assets Next et fichiers statiques.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
