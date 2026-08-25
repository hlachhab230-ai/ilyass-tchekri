import type { Bilingual } from "./content";

/** Bio à la première personne (adaptée du CV, sans promesse de résultat). */
export const bio: Bilingual = {
  fr: "Kinésithérapeute et thérapeute manuel orthopédique, je suis spécialisé en rééducation traumatologique, rhumatologique et neurologique, ainsi qu'en périnatalité. J'interviens aussi en kinésithérapie respiratoire (enfants et adultes), en orthopédie pédiatrique et en gymnastique médicale. Mon approche allie expertise technique, écoute et exercices adaptés : traiter la cause du mouvement douloureux, et pas seulement le symptôme.",
  ar: "أخصائي العلاج الطبيعي ومعالج يدوي لجهاز الحركة، متخصص في إعادة التأهيل بعد الرضوض وفي الروماتيزم والأعصاب، وكذلك في فترة ما حول الولادة. أتدخّل أيضاً في العلاج الطبيعي التنفسي (للأطفال والكبار)، وفي عظام الأطفال والجمباز الطبي. منهجي يجمع بين الخبرة التقنية والإنصات والتمارين الملائمة: معالجة سبب الحركة المؤلمة، لا العَرَض وحده.",
};

export type ExperienceItem = {
  place: string; // nom propre — non traduit
  location: Bilingual;
  role: Bilingual;
};

export const experiences: ExperienceItem[] = [
  {
    place: "Cabinet PhysioFit — Ali Ghoumari",
    location: { fr: "Tétouan", ar: "تطوان" },
    role: {
      fr: "Rééducation traumatologique, rhumatologique et neurologique · dry needling · cupping therapy",
      ar: "إعادة التأهيل بعد الرضوض والروماتيزم والأعصاب · الإبر الجافة · الحجامة",
    },
  },
  {
    place: "Centre régional de médecine physique et de kinésithérapie",
    location: { fr: "M'diq", ar: "المضيق" },
    role: {
      fr: "Traumatologie, rhumatologie, neurologie · rééducation pré et post-natale · gymnastique médicale",
      ar: "الرضوض والروماتيزم والأعصاب · إعادة التأهيل قبل وبعد الولادة · الجمباز الطبي",
    },
  },
  {
    place: "Hôpital Mohammed VI",
    location: { fr: "M'diq", ar: "المضيق" },
    role: {
      fr: "Traumatologie / orthopédie — bilan, diagnostic et plan de traitement",
      ar: "الرضوض / جراحة العظام — التقييم والتشخيص وخطة العلاج",
    },
  },
  {
    place: "Clinique CRM",
    location: { fr: "Tétouan", ar: "تطوان" },
    role: {
      fr: "Rhumatologie — bilan et examens cliniques",
      ar: "الروماتيزم — التقييم والفحوصات السريرية",
    },
  },
  {
    place: "Association Ichraka Kalb",
    location: { fr: "M'diq · Tétouan", ar: "المضيق · تطوان" },
    role: {
      fr: "Neurologie — bilan, diagnostic et plan de traitement",
      ar: "الأعصاب — التقييم والتشخيص وخطة العلاج",
    },
  },
];

export type FormationItem = {
  year: string;
  items: Bilingual[];
};

export const formations: FormationItem[] = [
  {
    year: "2022 – 2025",
    items: [{ fr: "Diplôme de kinésithérapie", ar: "دبلوم العلاج الطبيعي" }],
  },
  {
    year: "2024",
    items: [
      { fr: "Dry needling (DGSA · EBP · AMTM)", ar: "الإبر الجافة (DGSA · EBP · AMTM)" },
      { fr: "Cupping therapy (AMTM · EBP HT)", ar: "العلاج بالحجامة (AMTM · EBP HT)" },
      { fr: "Drainage lymphatique manuel (AMPK · PN)", ar: "التصريف اللمفاوي اليدوي (AMPK · PN)" },
    ],
  },
  {
    year: "2025",
    items: [
      { fr: "Kinésithérapie respiratoire", ar: "العلاج الطبيعي التنفسي" },
      { fr: "Techniques de rééducation des paralysies faciales", ar: "تقنيات إعادة تأهيل شلل الوجه" },
      { fr: "Spécialisation en thérapies manuelles", ar: "تخصّص في العلاجات اليدوية" },
    ],
  },
];
