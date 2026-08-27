import { NextResponse } from "next/server";
import { getAvailabilityServer } from "@/lib/availability-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/availability — consommé par le formulaire public (griser les créneaux). */
export async function GET() {
  const a = await getAvailabilityServer();
  return NextResponse.json(a, { headers: { "Cache-Control": "no-store" } });
}
