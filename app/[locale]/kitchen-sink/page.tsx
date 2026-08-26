import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Clock, GraduationCap, Activity } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { PillButton } from "@/components/glass/PillButton";
import { GlassCard } from "@/components/glass/GlassCard";
import { FloatingBadge } from "@/components/glass/FloatingBadge";
import { ArchMask } from "@/components/glass/ArchMask";
import { RotatedTag } from "@/components/glass/RotatedTag";
import { AnatomyVisual, type AnatomyName } from "@/components/visuals/AnatomyVisual";

export const metadata: Metadata = {
  title: "Kitchen sink",
  robots: { index: false, follow: false },
};

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[color:var(--hairline)] px-6 py-10 sm:px-10">
      <h2 className="eyebrow mb-6">{title}</h2>
      {children}
    </section>
  );
}

export default async function KitchenSink({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const anatomies: AnatomyName[] = ["knee", "spine", "shoulder", "hand"];

  return (
    <div>
      <div className="px-6 pt-10 sm:px-10">
        <h1 className="text-[length:var(--step-4)]">Design system — medical glass</h1>
        <p className="mt-3 max-w-2xl text-[color:var(--color-muted)]">
          Les six composants et les visuels anatomiques, pour validation.
        </p>
      </div>

      {/* 2. Bouton-pastille */}
      <Row title="02 · Bouton-pastille">
        <div className="flex flex-wrap items-center gap-4">
          <PillButton href="/rendez-vous" label="Prendre rendez-vous" variant="ink" />
          <PillButton href="/rendez-vous" label="En savoir plus" variant="white" />
          <PillButton externalHref="https://wa.me/212659918109" label="WhatsApp" variant="ink" />
        </div>
      </Row>

      {/* 3. Carte de verre */}
      <Row title="03 · Carte de verre (survol : s'élève, pastille → lime)">
        <div className="grid gap-4 sm:grid-cols-3">
          <GlassCard href="/soins/traumatologie-post-operatoire">
            <AnatomyVisual name="knee" className="h-28 w-28" />
            <h3 className="mt-4 text-[length:var(--step-1)]">Traumatologie<br />& post-opératoire</h3>
          </GlassCard>
          <GlassCard href="/soins/rhumatologie-douleurs-chroniques">
            <AnatomyVisual name="spine" className="h-28 w-28" />
            <h3 className="mt-4 text-[length:var(--step-1)]">Rhumatologie<br />& douleurs</h3>
          </GlassCard>
          <GlassCard href="/soins/neurologie" variant="ink">
            <AnatomyVisual name="shoulder" className="h-28 w-28" />
            <h3 className="mt-4 text-[length:var(--step-1)] text-white">Neurologie<br />& récupération</h3>
          </GlassCard>
        </div>
      </Row>

      {/* 4. Badge flottant */}
      <Row title="04 · Badge flottant (flottement 6px)">
        <div className="flex flex-wrap gap-6">
          <FloatingBadge icon={<Clock className="size-5" />} value="3 ans" label="clinique hospitalière" />
          <FloatingBadge icon={<GraduationCap className="size-5" />} value="7" label="formations" delayMs={800} />
          <FloatingBadge icon={<Activity className="size-5" />} value="5" label="structures" delayMs={1600} />
        </div>
      </Row>

      {/* 5. Masque en arche */}
      <Row title="05 · Masque en arche (portrait + halo)">
        <div className="max-w-[240px]">
          <ArchMask src={null} alt="Portrait Ilyass Tchekri" initials="IT" />
        </div>
      </Row>

      {/* 6. Étiquette pivotée */}
      <Row title="06 · Étiquette pivotée">
        <div className="flex flex-wrap items-center gap-8 py-4">
          <RotatedTag label="KINÉ" rotate={-6} />
          <RotatedTag label="TÉTOUAN" rotate={4} />
          <RotatedTag label="THÉRAPIE MANUELLE" rotate={8} />
        </div>
      </Row>

      {/* Visuels anatomiques */}
      <Row title="Visuels anatomiques (tracé animé au scroll)">
        <div className="flex flex-wrap gap-6">
          {anatomies.map((n) => (
            <div key={n} className="glass-solid grid size-40 place-items-center rounded-[var(--card-radius)]">
              <AnatomyVisual name={n} className="h-28 w-28" />
            </div>
          ))}
        </div>
      </Row>
    </div>
  );
}
