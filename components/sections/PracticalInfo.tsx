import { getTranslations, getLocale } from "next-intl/server";
import { Phone, MessageCircle, Mail, Clock, MapPin, AlertTriangle } from "lucide-react";
import { site, whatsappBase, mapsUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function PracticalInfo() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("booking");

  const closedLabel = locale === "ar" ? "مغلق" : "Fermé";

  return (
    <div className="grid gap-6">
      <h3 className="font-mono text-[length:var(--step--1)] uppercase tracking-widest text-[color:var(--color-slate)]">
        {t("practicalTitle")}
      </h3>

      {/* Contact rapide */}
      <ul className="grid gap-3">
        <li>
          <a href={`tel:${site.phone.tel}`} className="group inline-flex items-center gap-3 text-[color:var(--color-ink)]">
            <Phone className="size-4 text-[color:var(--color-tape-ink)]" aria-hidden="true" />
            <span className="font-mono tabular-nums" dir="ltr">{site.phone.display}</span>
          </a>
        </li>
        <li>
          <a href={whatsappBase} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-[color:var(--color-ink)] hover:text-[color:var(--color-tape-ink)]">
            <MessageCircle className="size-4 text-[color:var(--color-tape-ink)]" aria-hidden="true" />
            WhatsApp
          </a>
        </li>
        <li>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 break-all text-[color:var(--color-ink)] hover:text-[color:var(--color-tape-ink)]">
            <Mail className="size-4 text-[color:var(--color-tape-ink)]" aria-hidden="true" />
            {site.email}
          </a>
        </li>
      </ul>

      {/* Horaires */}
      <div>
        <div className="flex items-center gap-2 font-mono text-[length:var(--step--1)] uppercase tracking-wide text-[color:var(--color-slate)]">
          <Clock className="size-4" aria-hidden="true" />
          {t("hoursTitle")}
        </div>
        <dl className="mt-3 grid gap-1.5">
          {site.hours.weekly.map((d) => (
            <div key={d.day} className="flex items-center justify-between gap-4 text-[length:var(--step-0)]">
              <dt className="text-[color:var(--color-slate)]">{d.label[locale]}</dt>
              <dd className="font-mono tabular-nums text-[color:var(--color-ink)]" dir="ltr">
                {d.closed ? closedLabel : `${d.open} – ${d.close}`}
              </dd>
            </div>
          ))}
        </dl>
        {site.hours.placeholder && (
          <p className="mt-2 text-[length:var(--step--1)] text-[color:var(--color-slate)]">
            {t("hoursPlaceholderNote")}
          </p>
        )}
      </div>

      {/* Adresse + carte */}
      <div>
        <div className="flex items-center gap-2 font-mono text-[length:var(--step--1)] uppercase tracking-wide text-[color:var(--color-slate)]">
          <MapPin className="size-4" aria-hidden="true" />
          {t("addressTitle")}
        </div>
        <p className="mt-3 text-[color:var(--color-ink)]">{site.cabinet}</p>
        {site.address.street.startsWith("À CONFIRMER") ? (
          <p className="mt-1 text-[length:var(--step--1)] text-[color:var(--color-slate)]">
            {t("addressPlaceholderNote")}
          </p>
        ) : (
          <p className="mt-1 text-[color:var(--color-slate)]">
            {site.address.street}, {site.address.locality}
          </p>
        )}
        <a
          href={mapsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 font-mono text-[length:var(--step--1)] uppercase tracking-wide text-[color:var(--color-tape-ink)] hover:opacity-80"
        >
          {t("openMap")}
        </a>
      </div>

      {/* Avertissement médical — accent ember (alerte, jamais décoratif) */}
      <div className="rounded-lg border border-[color:color-mix(in_srgb,var(--color-ember)_45%,transparent)] bg-[color:color-mix(in_srgb,var(--color-ember)_7%,transparent)] p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[color:var(--color-ember)]" aria-hidden="true" />
          <div>
            <p className="text-[length:var(--step-0)] text-[color:var(--color-ink)]">
              {t("disclaimer.text")}
            </p>
            <p className="mt-1 font-mono text-[length:var(--step--1)] tabular-nums text-[color:var(--color-slate)]">
              {t("disclaimer.emergency")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
