"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { arMA } from "date-fns/locale/ar-MA";
import { CalendarDays, MessageCircle, Mail, Check } from "lucide-react";

import { bookingSchema, slotsForDate, SLOTS, type BookingInput, type BookingData } from "@/lib/booking-schema";
import { site } from "@/lib/site";
import { buildBookingMessage, whatsappLink, mailtoLink } from "@/lib/wa-message";
import { soins } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioCard } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { SlotChips } from "./SlotChips";

type Result = { wa: string; mailto: string };

// Jours de la semaine fermés (0 = dimanche) d'après les horaires du cabinet.
const CLOSED_DAYS = site.hours.weekly.filter((d) => d.closed).map((d) => d.day);

export function BookingForm() {
  const t = useTranslations("booking");
  const locale = useLocale() as Locale;
  const dfLocale = locale === "ar" ? arMA : fr;

  const [result, setResult] = React.useState<Result | null>(null);
  const [showCal, setShowCal] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      reason: "",
      visitType: undefined as unknown as BookingInput["visitType"],
      preferredDate: "",
      preferredSlot: "",
      message: "",
      company: "",
    },
    mode: "onTouched",
  });

  // Traduit un code d'erreur zod. Ne traduit que les codes connus : un code
  // inattendu (ex. erreur d'union zod) ne doit jamais déclencher un
  // MISSING_MESSAGE de next-intl.
  const KNOWN_ERRORS = new Set([
    "name_min", "name_max", "phone_required", "phone_invalid",
    "reason_required", "visit_required", "date_required", "date_invalid",
    "slot_required", "slot_unavailable", "message_max",
  ]);
  const err = (code?: string) =>
    code && KNOWN_ERRORS.has(code) ? t(`form.errors.${code}` as never) : undefined;

  // Créneaux proposables selon la date choisie (horaires du jour).
  const watchedDate = watch("preferredDate");
  const watchedSlot = watch("preferredSlot");
  const availableSlots = React.useMemo(
    () => (watchedDate ? slotsForDate(watchedDate) : SLOTS),
    [watchedDate],
  );

  // Si la date change et que le créneau choisi n'est plus proposable, on le vide.
  React.useEffect(() => {
    if (watchedDate && watchedSlot && !availableSlots.includes(watchedSlot)) {
      setValue("preferredSlot", "", { shouldValidate: false });
    }
  }, [watchedDate, watchedSlot, availableSlots, setValue]);

  const submit = (via: "wa" | "mail") =>
    handleSubmit((values) => {
      const data = values as BookingData;
      const message = buildBookingMessage(data, locale);
      const wa = whatsappLink(message);
      const mailto = mailtoLink(message, locale);
      // On affiche TOUJOURS l'écran de succès en premier : il contient un vrai
      // lien <a> vers WhatsApp que l'utilisateur peut toucher. C'est le chemin
      // fiable — l'ouverture automatique ci-dessous est un « best-effort » qui
      // peut être bloquée par le navigateur (iOS Safari) après la validation
      // asynchrone ; dans ce cas l'écran de succès prend le relais.
      setResult({ wa, mailto });

      if (via === "wa") {
        window.open(wa, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = mailto;
      }
      toast.success(t("form.success"));
    });

  const reasonOptions = React.useMemo(
    () => soins.map((s) => s.title[locale]),
    [locale],
  );

  if (result) {
    return (
      <div
        id="booking-form"
        className="rounded-xl border border-[color:var(--color-tape)] bg-[color:color-mix(in_srgb,var(--color-tape)_8%,transparent)] p-6 sm:p-8"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-[color:var(--color-tape)] text-[color:var(--color-ink)]">
            <Check className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[length:var(--step-1)] font-medium text-[color:var(--color-ink)]">
              {t("form.success")}
            </p>
            <p className="mt-1 text-[color:var(--color-slate)]">
              {t("form.successMailtoHint")}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="primary" size="lg" className="flex-1">
            <a href={result.wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" /> WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1">
            <a href={result.mailto}>
              <Mail aria-hidden="true" /> {t("form.submitMailto")}
            </a>
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-4 text-[length:var(--step--1)] text-[color:var(--color-slate)] underline underline-offset-4 hover:text-[color:var(--color-ink)]"
        >
          {t("form.reset")}
        </button>
      </div>
    );
  }

  return (
    <form
      id="booking-form"
      noValidate
      onSubmit={submit("wa")}
      className="rounded-xl border border-[color:var(--border-hair)] bg-white/40 p-5 sm:p-7"
    >
      <div className="grid gap-5">
        {/* Nom */}
        <div className="grid gap-1.5">
          <Label htmlFor="name">{t("form.name")}</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-err" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-err" className="text-[length:var(--step--1)] text-[color:var(--color-ember)]">
              {err(errors.name.message)}
            </p>
          )}
        </div>

        {/* Téléphone */}
        <div className="grid gap-1.5">
          <Label htmlFor="phone">{t("form.phone")}</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder="06 00 00 00 00"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-err phone-hint" : "phone-hint"}
            {...register("phone")}
          />
          <p id="phone-hint" className="font-mono text-[length:var(--step--1)] text-[color:var(--color-slate)]">
            {t("form.phoneHint")}
          </p>
          {errors.phone && (
            <p id="phone-err" className="text-[length:var(--step--1)] text-[color:var(--color-ember)]">
              {err(errors.phone.message)}
            </p>
          )}
        </div>

        {/* Motif */}
        <div className="grid gap-1.5">
          <Label htmlFor="reason">{t("form.reason")}</Label>
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="reason"
                  aria-invalid={!!errors.reason}
                  aria-describedby={errors.reason ? "reason-err" : undefined}
                >
                  <SelectValue placeholder={t("form.reasonPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {reasonOptions.map((label) => (
                    <SelectItem key={label} value={label}>
                      {label}
                    </SelectItem>
                  ))}
                  <SelectItem value={t("form.reasonOther")}>
                    {t("form.reasonOther")}
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.reason && (
            <p id="reason-err" className="text-[length:var(--step--1)] text-[color:var(--color-ember)]">
              {err(errors.reason.message)}
            </p>
          )}
        </div>

        {/* Type de visite */}
        <fieldset className="grid gap-1.5">
          <legend className="font-mono text-[length:var(--step--1)] uppercase tracking-wide text-[color:var(--color-slate)]">
            {t("form.visit")}
          </legend>
          <Controller
            name="visitType"
            control={control}
            render={({ field }) => (
              <RadioGroup
                className="grid-cols-2"
                value={field.value}
                onValueChange={field.onChange}
              >
                <RadioCard value="first" label={t("form.visitFirst")} />
                <RadioCard value="follow-up" label={t("form.visitFollow")} />
              </RadioGroup>
            )}
          />
          {errors.visitType && (
            <p className="text-[length:var(--step--1)] text-[color:var(--color-ember)]">
              {err(errors.visitType.message)}
            </p>
          )}
        </fieldset>

        {/* Date souhaitée */}
        <div className="grid gap-1.5">
          <Label htmlFor="date-btn">{t("form.date")}</Label>
          <Controller
            name="preferredDate"
            control={control}
            render={({ field }) => {
              const selectedDate = field.value ? new Date(field.value + "T00:00:00") : undefined;
              return (
                <div>
                  <button
                    id="date-btn"
                    type="button"
                    aria-expanded={showCal}
                    aria-invalid={!!errors.preferredDate}
                    aria-describedby={errors.preferredDate ? "date-err" : undefined}
                    onClick={() => setShowCal((v) => !v)}
                    className="flex h-11 w-full items-center justify-between rounded-md border border-[color:var(--border-hair)] bg-white/60 px-3.5 text-start text-[length:var(--step-0)] transition-colors hover:border-[color:var(--color-tape)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-tape-ink)] aria-[invalid=true]:border-[color:var(--color-ember)]"
                  >
                    <span className={selectedDate ? "text-[color:var(--color-ink)]" : "text-[color:color-mix(in_srgb,var(--color-slate)_75%,transparent)]"}>
                      {selectedDate
                        ? format(selectedDate, "PPPP", { locale: dfLocale })
                        : t("form.datePlaceholder")}
                    </span>
                    <CalendarDays className="size-4 opacity-60" aria-hidden="true" />
                  </button>
                  {showCal && (
                    <div className="mt-2 w-fit rounded-md border border-[color:var(--border-hair)] bg-[color:var(--color-paper)] p-2">
                      <Calendar
                        locale={locale}
                        selected={selectedDate}
                        disabledDaysOfWeek={CLOSED_DAYS}
                        onSelect={(d) => {
                          if (d) field.onChange(format(d, "yyyy-MM-dd"));
                          setShowCal(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            }}
          />
          {errors.preferredDate && (
            <p id="date-err" className="text-[length:var(--step--1)] text-[color:var(--color-ember)]">
              {err(errors.preferredDate.message)}
            </p>
          )}
        </div>

        {/* Créneau */}
        <div className="grid gap-1.5">
          <span id="slot-label" className="font-mono text-[length:var(--step--1)] uppercase tracking-wide text-[color:var(--color-slate)]">
            {t("form.slot")}
          </span>
          <Controller
            name="preferredSlot"
            control={control}
            render={({ field }) => (
              <SlotChips
                labelledBy="slot-label"
                value={field.value}
                onChange={field.onChange}
                available={availableSlots}
              />
            )}
          />
          {watchedDate && availableSlots.length === 0 && (
            <p className="text-[length:var(--step--1)] text-[color:var(--color-slate)]">
              {t("form.closedDay")}
            </p>
          )}
          {errors.preferredSlot && (
            <p className="text-[length:var(--step--1)] text-[color:var(--color-ember)]">
              {err(errors.preferredSlot.message)}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="grid gap-1.5">
          <Label htmlFor="message">
            {t("form.message")}{" "}
            <span className="normal-case text-[color:color-mix(in_srgb,var(--color-slate)_80%,transparent)]">
              {t("form.messageOptional")}
            </span>
          </Label>
          <Textarea
            id="message"
            placeholder={t("form.messagePlaceholder")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-err" : undefined}
            {...register("message")}
          />
          {errors.message && (
            <p id="message-err" className="text-[length:var(--step--1)] text-[color:var(--color-ember)]">
              {err(errors.message.message)}
            </p>
          )}
        </div>

        {/* Honeypot anti-spam — caché aux humains.
            IMPORTANT : on utilise `sr-only` (clip + 1px), PAS un décalage type
            `-left-[9999px]`. Un grand décalage négatif casse la mise en page RTL
            (overflow horizontal de la page → contenu poussé hors écran en arabe). */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="company">Ne pas remplir</label>
          <input
            id="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="sr-only"
            {...register("company")}
          />
        </div>

        {/* Actions */}
        <div className="mt-1 flex flex-col gap-3 sm:flex-row">
          <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="flex-1">
            <MessageCircle aria-hidden="true" />
            {isSubmitting ? t("form.sending") : t("form.submit")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={submit("mail")}
            className="flex-1"
          >
            <Mail aria-hidden="true" />
            {t("form.submitMailto")}
          </Button>
        </div>
      </div>
    </form>
  );
}
