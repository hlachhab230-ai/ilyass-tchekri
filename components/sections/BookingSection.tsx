import { getTranslations } from "next-intl/server";
import { BookingForm } from "@/components/booking/BookingForm";
import { PracticalInfo } from "./PracticalInfo";
import { Reveal } from "@/components/Reveal";

/** Section réservation de l'accueil : formulaire + infos pratiques. */
export async function BookingSection() {
  const t = await getTranslations("booking");

  return (
    <section id="reservation" className="scroll-mt-20 border-t border-[color:var(--border-hair)] bg-[color:var(--color-paper)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <h2 className="text-[length:var(--step-4)] font-bold text-[color:var(--color-ink)]">
            {t("heading")}
          </h2>
          <p className="mt-3 max-w-2xl text-[color:var(--color-slate)]">{t("intro")}</p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <BookingForm />
          <PracticalInfo />
        </div>
      </div>
    </section>
  );
}
