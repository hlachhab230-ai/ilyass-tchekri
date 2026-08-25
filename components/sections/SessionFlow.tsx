import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/Reveal";

type Step = { title: string; desc: string };

/** Le déroulé d'une séance — 4 étapes numérotées (seule section numérotée). */
export async function SessionFlow() {
  const t = await getTranslations("session");
  const steps = t.raw("steps") as Step[];

  return (
    <section id="deroule" className="scroll-mt-20 bg-[color:var(--color-navy)] text-[color:var(--color-paper)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <h2 className="text-[length:var(--step-4)] font-bold">{t("heading")}</h2>
          <p className="mt-3 max-w-xl text-[color:color-mix(in_srgb,var(--color-paper)_75%,transparent)]">
            {t("intro")}
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal as="li" key={i} delayMs={Math.min(i * 80, 320)} className="relative">
              <div className="font-mono text-[length:var(--step-2)] font-medium tabular-nums text-[color:var(--color-tape)]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-3 h-px w-10 bg-[color:color-mix(in_srgb,var(--color-tape)_60%,transparent)]" />
              <h3 className="mt-4 text-[length:var(--step-1)] font-bold">{step.title}</h3>
              <p className="mt-2 text-[length:var(--step-0)] text-[color:color-mix(in_srgb,var(--color-paper)_74%,transparent)]">
                {step.desc}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
