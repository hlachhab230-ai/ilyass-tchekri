import { getTranslations } from "next-intl/server";

type Stat = { value: string; label: string };

export async function StatsBand() {
  const t = await getTranslations("stats");
  const stats: Stat[] = [
    t.raw("years") as Stat,
    t.raw("structures") as Stat,
    t.raw("trainings") as Stat,
    t.raw("languages") as Stat,
  ];

  return (
    <section className="mx-5 rounded-[var(--card-radius)] bg-[color:var(--color-ice)] px-6 py-12 sm:mx-10 sm:px-10">
      <h2 className="eyebrow mb-8 text-center">{t("heading")}</h2>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="font-display text-[length:var(--step-4)] text-[color:var(--color-ink)]">{s.value}</div>
            <div className="mt-2 text-[length:var(--step--1)] font-medium text-[color:var(--color-muted)]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
