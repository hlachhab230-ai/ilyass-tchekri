import { getTranslations, getLocale } from "next-intl/server";
import { Phone, MessageCircle, Mail, Clock, MapPin, ShieldAlert } from "lucide-react";
import { site, whatsappBase, mapsUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function PracticalInfo() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("booking");
  const closedLabel = locale === "ar" ? "مغلق" : "Fermé";

  const Icon = ({ children }: { children: React.ReactNode }) => (
    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[color:var(--color-ice)] text-[color:var(--color-blue)]">
      {children}
    </span>
  );

  return (
    <div className="grid gap-6">
      <h3 className="eyebrow">{t("practicalTitle")}</h3>

      <ul className="grid gap-3">
        <li>
          <a href={`tel:${site.phone.tel}`} className="inline-flex items-center gap-3 text-[color:var(--color-ink)] hover:text-[color:var(--color-blue)]">
            <Icon><Phone className="size-4" aria-hidden="true" /></Icon>
            <span className="tabular-nums" dir="ltr">{site.phone.display}</span>
          </a>
        </li>
        <li>
          <a href={whatsappBase} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-[color:var(--color-ink)] hover:text-[color:var(--color-blue)]">
            <Icon><MessageCircle className="size-4" aria-hidden="true" /></Icon>
            WhatsApp
          </a>
        </li>
        <li>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 break-all text-[color:var(--color-ink)] hover:text-[color:var(--color-blue)]">
            <Icon><Mail className="size-4" aria-hidden="true" /></Icon>
            {site.email}
          </a>
        </li>
      </ul>

      <div>
        <div className="mb-3 flex items-center gap-2 eyebrow"><Clock className="size-4" aria-hidden="true" />{t("hoursTitle")}</div>
        <dl className="grid gap-1.5">
          {site.hours.weekly.map((d) => (
            <div key={d.day} className="flex items-center justify-between gap-4 text-[length:var(--step--1)]">
              <dt className="text-[color:var(--color-muted)]">{d.label[locale]}</dt>
              <dd className="tabular-nums text-[color:var(--color-ink)]" dir="ltr">{d.closed ? closedLabel : `${d.open} – ${d.close}`}</dd>
            </div>
          ))}
        </dl>
        {site.hours.placeholder && (
          <p className="mt-2 text-[length:var(--step--1)] text-[color:var(--color-muted)]">{t("hoursPlaceholderNote")}</p>
        )}
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2 eyebrow"><MapPin className="size-4" aria-hidden="true" />{t("addressTitle")}</div>
        <p className="text-[color:var(--color-ink)]">{site.cabinet}</p>
        {site.address.street.startsWith("À CONFIRMER") ? (
          <p className="mt-1 text-[length:var(--step--1)] text-[color:var(--color-muted)]">{t("addressPlaceholderNote")}</p>
        ) : (
          <p className="mt-1 text-[color:var(--color-muted)]">{site.address.street}, {site.address.locality}</p>
        )}
        <a href={mapsUrl()} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-[length:var(--step--1)] font-semibold text-[color:var(--color-blue)] hover:underline">
          {t("openMap")}
        </a>
      </div>

      {/* Avertissement médical */}
      <div className="rounded-[var(--card-radius)] border border-[color:var(--hairline)] bg-[color:var(--color-ice)] p-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-[color:var(--color-blue)]" aria-hidden="true" />
          <div>
            <p className="text-[length:var(--step--1)] text-[color:var(--color-ink)]">{t("disclaimer.text")}</p>
            <p className="mt-1 text-[length:var(--step--1)] tabular-nums text-[color:var(--color-muted)]">{t("disclaimer.emergency")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
