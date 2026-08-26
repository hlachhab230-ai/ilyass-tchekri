import { getTranslations } from "next-intl/server";
import { BookingForm } from "@/components/booking/BookingForm";
import { PracticalInfo } from "./PracticalInfo";

/** Réservation : formulaire + infos pratiques dans une grande carte de verre sur fond ink. */
export async function BookingSection() {
  const t = await getTranslations("booking");

  return (
    <section id="reservation" className="scroll-mt-24 px-3 py-6 sm:px-6 sm:py-10">
      <div className="rounded-[var(--card-radius)] bg-[color:var(--color-ink)] px-5 py-14 sm:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-white">{t("heading")}</h2>
          <p className="mt-3 max-w-2xl text-white/75">{t("intro")}</p>

          <div className="mt-10 grid gap-6 rounded-[var(--card-radius)] bg-white p-5 sm:p-8 lg:grid-cols-[1.15fr_0.85fr]">
            <BookingForm />
            <PracticalInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
