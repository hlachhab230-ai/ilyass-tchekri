/**
 * Contenu structuré du site : domaines de prise en charge (soins),
 * techniques complémentaires, et registre des articles /conseils.
 *
 * Contenu bilingue volontairement STRUCTURÉ (phrases courtes) plutôt que de
 * longues proses : c'est plus fiable à traduire et plus honnête pour du
 * contenu de santé. Aucune promesse de résultat n'est faite ici.
 */

export type Bilingual = { fr: string; ar: string };

export type Soin = {
  slug: string;
  /** Titre court affiché sur les cartes. */
  title: Bilingual;
  /** Titre SEO = une recherche réelle (« kiné lombalgie Tétouan »). */
  seoTitle: Bilingual;
  metaDescription: Bilingual;
  /** Accroche d'une phrase. */
  excerpt: Bilingual;
  /** Motifs pris en charge (pour la page + le <select> du formulaire). */
  conditions: Bilingual[];
  /** Ce que comprend la prise en charge. */
  approach: Bilingual[];
};

export const soins: Soin[] = [
  {
    slug: "traumatologie-post-operatoire",
    title: { fr: "Traumatologie & post-opératoire", ar: "الرضوض وما بعد الجراحة" },
    seoTitle: {
      fr: "Rééducation LCA, entorses & post-opératoire — Kiné Tétouan · M'diq",
      ar: "إعادة تأهيل الرباط الصليبي والالتواءات وما بعد الجراحة — تطوان والمضيق",
    },
    metaDescription: {
      fr: "Rééducation après entorse, fracture, immobilisation ou chirurgie (LCA). Récupération progressive de l'amplitude et de la force à Tétouan et M'diq.",
      ar: "إعادة التأهيل بعد الالتواء أو الكسر أو التجبير أو الجراحة (الرباط الصليبي). استعادة تدريجية للمدى والقوة بتطوان والمضيق.",
    },
    excerpt: {
      fr: "Retrouver l'amplitude, la force et la confiance après une blessure ou une chirurgie.",
      ar: "استعادة المدى والقوة والثقة بعد الإصابة أو الجراحة.",
    },
    conditions: [
      { fr: "Rééducation du LCA (ligament croisé antérieur)", ar: "إعادة تأهيل الرباط الصليبي الأمامي" },
      { fr: "Entorses (cheville, genou, poignet)", ar: "الالتواءات (الكاحل، الركبة، الرسغ)" },
      { fr: "Suites de fracture et d'immobilisation", ar: "ما بعد الكسور والتجبير" },
      { fr: "Rééducation post-opératoire", ar: "إعادة التأهيل بعد العمليات الجراحية" },
    ],
    approach: [
      { fr: "Bilan de l'amplitude et de la force", ar: "تقييم المدى الحركي والقوة" },
      { fr: "Thérapie manuelle avant les machines", ar: "العلاج اليدوي قبل الأجهزة" },
      { fr: "Progression encadrée du renforcement", ar: "تدرّج مؤطَّر في التقوية" },
      { fr: "Auto-rééducation guidée à la maison", ar: "تمارين ذاتية موجَّهة في المنزل" },
    ],
  },
  {
    slug: "rhumatologie-douleurs-chroniques",
    title: { fr: "Rhumatologie & douleurs chroniques", ar: "الروماتيزم والآلام المزمنة" },
    seoTitle: {
      fr: "Kiné lombalgie, cervicalgie & tendinopathies — Tétouan · M'diq",
      ar: "أخصائي علاج طبيعي لآلام الظهر والرقبة والأوتار — تطوان والمضيق",
    },
    metaDescription: {
      fr: "Prise en charge de la lombalgie, cervicalgie et tendinopathies. Traiter la cause du mouvement douloureux, pas seulement le symptôme. Tétouan, M'diq.",
      ar: "التكفل بآلام أسفل الظهر والرقبة واعتلالات الأوتار. معالجة سبب الألم لا العَرَض فقط. تطوان، المضيق.",
    },
    excerpt: {
      fr: "Comprendre l'origine de la douleur et remettre le mouvement en confiance.",
      ar: "فهم أصل الألم واستعادة الحركة بثقة.",
    },
    conditions: [
      { fr: "Lombalgie (douleurs du bas du dos)", ar: "آلام أسفل الظهر" },
      { fr: "Cervicalgie (douleurs du cou)", ar: "آلام الرقبة" },
      { fr: "Tendinopathies", ar: "اعتلالات الأوتار" },
      { fr: "Douleurs articulaires chroniques", ar: "آلام المفاصل المزمنة" },
    ],
    approach: [
      { fr: "Bilan du mouvement et des habitudes", ar: "تقييم الحركة والعادات اليومية" },
      { fr: "Thérapie manuelle orthopédique", ar: "العلاج اليدوي لجهاز الحركة" },
      { fr: "Techniques complémentaires si indiquées", ar: "تقنيات مكمّلة عند الحاجة" },
      { fr: "Conseils d'activité et de posture", ar: "نصائح حول النشاط والوضعية" },
    ],
  },
  {
    slug: "neurologie",
    title: { fr: "Neurologie", ar: "طب الأعصاب" },
    seoTitle: {
      fr: "Rééducation neurologique : AVC & paralysie faciale — Tétouan · M'diq",
      ar: "إعادة التأهيل العصبي: السكتة الدماغية وشلل الوجه — تطوان والمضيق",
    },
    metaDescription: {
      fr: "Rééducation après AVC et paralysie faciale : récupération de la motricité, du contrôle et de l'autonomie, à votre rythme. Tétouan, M'diq.",
      ar: "إعادة التأهيل بعد السكتة الدماغية وشلل الوجه: استعادة الحركة والتحكم والاستقلالية بوتيرتكم. تطوان، المضيق.",
    },
    excerpt: {
      fr: "Regagner du contrôle et de l'autonomie, étape par étape.",
      ar: "استعادة التحكم والاستقلالية خطوة بخطوة.",
    },
    conditions: [
      { fr: "Suites d'AVC", ar: "ما بعد السكتة الدماغية" },
      { fr: "Paralysie faciale", ar: "شلل الوجه" },
      { fr: "Troubles de la motricité", ar: "اضطرابات الحركة" },
    ],
    approach: [
      { fr: "Bilan et objectifs fonctionnels", ar: "تقييم وأهداف وظيفية" },
      { fr: "Techniques de rééducation des paralysies faciales", ar: "تقنيات إعادة تأهيل شلل الوجه" },
      { fr: "Travail progressif de la motricité", ar: "عمل تدريجي على الحركة" },
      { fr: "Accompagnement et suivi", ar: "مرافقة ومتابعة" },
    ],
  },
  {
    slug: "perinatalite",
    title: { fr: "Périnatalité", ar: "فترة ما حول الولادة" },
    seoTitle: {
      fr: "Rééducation pré & post-natale, périnée — Kiné Tétouan · M'diq",
      ar: "إعادة التأهيل قبل وبعد الولادة وتأهيل العجان — تطوان والمضيق",
    },
    metaDescription: {
      fr: "Rééducation pré et post-natale : préparer le corps, récupérer après l'accouchement, renforcer le périnée en douceur. Tétouan, M'diq.",
      ar: "إعادة التأهيل قبل وبعد الولادة: تهيئة الجسم، التعافي بعد الولادة، تقوية العجان بلطف. تطوان، المضيق.",
    },
    excerpt: {
      fr: "Accompagner le corps avant et après la naissance, en douceur.",
      ar: "مرافقة الجسم قبل الولادة وبعدها بلطف.",
    },
    conditions: [
      { fr: "Préparation pré-natale", ar: "التهيئة قبل الولادة" },
      { fr: "Récupération post-natale", ar: "التعافي بعد الولادة" },
      { fr: "Renforcement du périnée", ar: "تقوية العجان" },
    ],
    approach: [
      { fr: "Bilan adapté et respectueux", ar: "تقييم ملائم ومحترِم" },
      { fr: "Travail progressif et guidé", ar: "عمل تدريجي وموجَّه" },
      { fr: "Exercices à poursuivre à la maison", ar: "تمارين للاستمرار في المنزل" },
    ],
  },
  {
    slug: "kinesitherapie-respiratoire",
    title: { fr: "Kinésithérapie respiratoire", ar: "العلاج الطبيعي التنفسي" },
    seoTitle: {
      fr: "Kiné respiratoire enfants & adultes — Tétouan · M'diq",
      ar: "العلاج الطبيعي التنفسي للأطفال والكبار — تطوان والمضيق",
    },
    metaDescription: {
      fr: "Kinésithérapie respiratoire pour enfants et adultes : dégager les voies respiratoires et mieux respirer. Tétouan, M'diq.",
      ar: "العلاج الطبيعي التنفسي للأطفال والكبار: تحرير المجاري التنفسية وتحسين التنفس. تطوان، المضيق.",
    },
    excerpt: {
      fr: "Aider à mieux respirer, chez l'enfant comme chez l'adulte.",
      ar: "المساعدة على تنفّس أفضل، للأطفال والكبار.",
    },
    conditions: [
      { fr: "Encombrement respiratoire du nourrisson et de l'enfant", ar: "احتقان الجهاز التنفسي عند الرضيع والطفل" },
      { fr: "Gêne respiratoire chez l'adulte", ar: "صعوبة التنفس عند الكبار" },
    ],
    approach: [
      { fr: "Bilan respiratoire", ar: "تقييم تنفسي" },
      { fr: "Techniques de désencombrement adaptées", ar: "تقنيات ملائمة لتحرير المجاري" },
      { fr: "Conseils aux parents", ar: "نصائح للآباء" },
    ],
  },
  {
    slug: "orthopedie-pediatrique",
    title: { fr: "Orthopédie pédiatrique", ar: "جراحة العظام للأطفال" },
    seoTitle: {
      fr: "Kiné orthopédie pédiatrique — Enfants · Tétouan · M'diq",
      ar: "العلاج الطبيعي لعظام الأطفال — تطوان والمضيق",
    },
    metaDescription: {
      fr: "Prise en charge orthopédique de l'enfant : accompagner la croissance et le mouvement dans un cadre rassurant. Tétouan, M'diq.",
      ar: "التكفل بعظام الطفل: مرافقة النمو والحركة في إطار مطمئن. تطوان، المضيق.",
    },
    excerpt: {
      fr: "Accompagner la croissance et le mouvement de l'enfant.",
      ar: "مرافقة نمو الطفل وحركته.",
    },
    conditions: [
      { fr: "Troubles orthopédiques de l'enfant", ar: "اضطرابات العظام عند الطفل" },
      { fr: "Suivi de la marche et de la posture", ar: "متابعة المشي والوضعية" },
    ],
    approach: [
      { fr: "Bilan adapté à l'âge", ar: "تقييم مناسب للعمر" },
      { fr: "Jeu et mouvement encadrés", ar: "اللعب والحركة ضمن إطار" },
      { fr: "Implication des parents", ar: "إشراك الآباء" },
    ],
  },
  {
    slug: "sport-performance",
    title: { fr: "Sport & performance", ar: "الرياضة والأداء" },
    seoTitle: {
      fr: "Kiné du sport : pubalgie, renforcement, prévention — Tétouan · M'diq",
      ar: "العلاج الطبيعي الرياضي: الفتق الرياضي، التقوية، الوقاية — تطوان والمضيق",
    },
    metaDescription: {
      fr: "Rééducation du sportif : pubalgie, renforcement, prévention des blessures et retour au terrain. Tétouan, M'diq.",
      ar: "إعادة تأهيل الرياضي: الفتق الرياضي، التقوية، الوقاية من الإصابات والعودة إلى الملعب. تطوان، المضيق.",
    },
    excerpt: {
      fr: "Prévenir la blessure, renforcer, revenir au terrain plus solide.",
      ar: "الوقاية من الإصابة، التقوية، والعودة إلى الملعب أقوى.",
    },
    conditions: [
      { fr: "Pubalgie", ar: "الفتق الرياضي (ألم العانة)" },
      { fr: "Renforcement des membres inférieurs", ar: "تقوية الأطراف السفلية" },
      { fr: "Prévention des blessures", ar: "الوقاية من الإصابات" },
    ],
    approach: [
      { fr: "Bilan du geste sportif", ar: "تقييم الحركة الرياضية" },
      { fr: "Renforcement ciblé et progressif", ar: "تقوية مستهدفة وتدريجية" },
      { fr: "Auto-rééducation pour le sportif", ar: "تمارين ذاتية للرياضي" },
    ],
  },
];

/** Techniques complémentaires (carte large de la grille Soins + page parcours). */
export const techniques: Bilingual[] = [
  { fr: "Thérapie manuelle orthopédique", ar: "العلاج اليدوي لجهاز الحركة" },
  { fr: "Dry needling", ar: "الإبر الجافة (Dry needling)" },
  { fr: "Cupping therapy", ar: "العلاج بالحجامة" },
  { fr: "Drainage lymphatique manuel", ar: "التصريف اللمفاوي اليدوي" },
  { fr: "Gua sha", ar: "الغوا شا (Gua sha)" },
  { fr: "Gymnastique médicale", ar: "الجمباز الطبي" },
  { fr: "Auto-rééducation guidée", ar: "إعادة التأهيل الذاتي الموجَّه" },
];

export function getSoin(slug: string): Soin | undefined {
  return soins.find((s) => s.slug === slug);
}

/**
 * Registre des articles /conseils. Le corps de chaque article vit dans
 * content/conseils/<slug>.mdx (rédigé en français). Ce registre alimente
 * l'index, les métadonnées SEO et les slugs statiques.
 */
export type Article = {
  slug: string;
  title: Bilingual;
  excerpt: Bilingual;
  /** Date ISO (YYYY-MM-DD). */
  date: string;
  /** Minutes de lecture (indicatif). */
  readingMinutes: number;
  tag: Bilingual;
};

export const articles: Article[] = [
  {
    slug: "reeducation-manuelle-ou-machines",
    title: {
      fr: "Rééducation manuelle ou machines : que choisir ?",
      ar: "العلاج اليدوي أم الأجهزة: ماذا تختار؟",
    },
    excerpt: {
      fr: "Pourquoi je commence par les mains avant de passer aux machines — et ce que cela change pour votre récupération.",
      ar: "لماذا أبدأ باليدين قبل الأجهزة — وما تأثير ذلك على تعافيك.",
    },
    date: "2025-07-02",
    readingMinutes: 4,
    tag: { fr: "Méthode", ar: "المنهج" },
  },
  {
    slug: "oreiller-et-douleurs-cervicales",
    title: {
      fr: "Le rôle de l'oreiller dans les douleurs cervicales",
      ar: "دور الوسادة في آلام الرقبة",
    },
    excerpt: {
      fr: "Un mauvais oreiller entretient parfois une cervicalgie. Quelques repères simples pour bien le choisir.",
      ar: "قد تُبقي الوسادة غير المناسبة على ألم الرقبة. معايير بسيطة لاختيارها.",
    },
    date: "2025-06-18",
    readingMinutes: 3,
    tag: { fr: "Conseil", ar: "نصيحة" },
  },
  {
    slug: "lca-deux-signes-alerte",
    title: {
      fr: "Rééducation du LCA : 2 signes d'alerte à connaître",
      ar: "إعادة تأهيل الرباط الصليبي: علامتان تحذيريتان",
    },
    excerpt: {
      fr: "Pendant la rééducation du ligament croisé, deux signaux doivent vous amener à ralentir et à en parler.",
      ar: "خلال إعادة تأهيل الرباط الصليبي، علامتان تستدعيان التمهّل والتواصل.",
    },
    date: "2025-05-30",
    readingMinutes: 3,
    tag: { fr: "Sécurité", ar: "السلامة" },
  },
  {
    slug: "pubalgie-footballeurs",
    title: {
      fr: "Pubalgie : l'auto-rééducation pour les footballeurs",
      ar: "الفتق الرياضي: تمارين ذاتية للاعبي كرة القدم",
    },
    excerpt: {
      fr: "La pubalgie n'est pas une fatalité. Des repères d'auto-rééducation pour comprendre et avancer.",
      ar: "الفتق الرياضي ليس قدراً محتوماً. معايير للتمارين الذاتية للفهم والتقدّم.",
    },
    date: "2025-05-12",
    readingMinutes: 4,
    tag: { fr: "Sport", ar: "الرياضة" },
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Articles triés du plus récent au plus ancien. */
export function articlesByDate(): Article[] {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
}
