import { ImageResponse } from "next/og";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Image Open Graph générée (next/og). Texte en latin pour un rendu fiable.
export default async function OgImage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const role = site.role.fr; // latin, lisible dans l'image

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A2C6B",
          color: "#EDF3FC",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#6FE04A" }} />
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#6FE04A", textTransform: "uppercase" }}>
            {site.area.fr}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ fontSize: 34, color: "#A9C6E8", marginTop: 12 }}>{role}</div>
          <div style={{ fontSize: 30, color: "#EDF3FC", marginTop: 28, maxWidth: 900 }}>
            Traiter la cause, pas seulement le symptôme.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 26, color: "#6FE04A" }}>{site.phone.display}</div>
          <div style={{ fontSize: 24, color: "#A9C6E8" }}>{locale === "ar" ? "ع / FR" : "FR / ع"}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
