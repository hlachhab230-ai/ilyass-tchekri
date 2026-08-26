/**
 * ────────────────────────────────────────────────────────────────────────────
 *  SOURCE UNIQUE DES COORDONNÉES DU CABINET
 * ────────────────────────────────────────────────────────────────────────────
 *  C'est le SEUL fichier à modifier pour changer le numéro de téléphone,
 *  l'adresse, les horaires, l'email ou les liens Instagram.
 *  Tout le site lit ces valeurs. Ne dupliquez ces informations nulle part
 *  ailleurs.
 *
 *  Les valeurs marquées « À CONFIRMER » sont des PLACEHOLDERS : remplacez-les
 *  par les vraies données du cabinet. Voir aussi TODO-CLIENT.md.
 */

export const site = {
  // Identité — données réelles (CV + Instagram)
  name: "Ilyass Tchekri",
  role: {
    fr: "Kinésithérapeute — Thérapeute manuel orthopédique",
    ar: "أخصائي العلاج الطبيعي — معالج يدوي لجهاز الحركة",
  },
  shortRole: { fr: "Kiné", ar: "أخصائي علاج طبيعي" },
  area: { fr: "M'diq · Tétouan", ar: "المضيق · تطوان" },
  cabinet: "Cabinet PhysioFit — Ali Ghoumari, Tétouan",
  baseline: {
    fr: "Bouge mieux, récupère plus vite, vis en pleine forme.",
    ar: "تحرّك بشكل أفضل، تعافَ بسرعة، عِش بكامل عافيتك.",
  },

  // Contact — données réelles
  phone: {
    // Format d'affichage
    display: "+212 6 59 91 81 09",
    // Format international sans espaces pour tel:
    tel: "+212659918109",
    // Format WhatsApp (sans +, sans espaces)
    whatsapp: "212659918109",
  },
  email: "Tchekriliyass@gmail.com",

  instagram: {
    personal: { handle: "@physiolife_ilyass", url: "https://instagram.com/physiolife_ilyass" },
    clinic: { handle: "@physiofit.agb", url: "https://instagram.com/physiofit.agb" },
  },

  /**
   * Portrait d'Ilyass (page Parcours).
   * À CONFIRMER — déposez la photo dans `public/images/ilyass-portrait.jpg`
   * puis mettez ici son chemin : "/images/ilyass-portrait.jpg".
   * Tant que la valeur est null, un cadre placeholder élégant est affiché.
   */
  portrait: null as string | null,

  /**
   * Adresse exacte du cabinet.
   * À CONFIRMER — remplacez `street` par l'adresse postale complète.
   * `locality` et `region` sont corrects. `mapQuery` sert au lien Google Maps.
   */
  address: {
    street: "À CONFIRMER — adresse exacte du cabinet", // ← À REMPLACER
    locality: "Tétouan",
    region: "Tanger-Tétouan-Al Hoceïma",
    country: "Maroc",
    countryCode: "MA",
    // Requête Google Maps de repli tant que l'adresse exacte n'est pas fournie.
    mapQuery: "Cabinet PhysioFit Ali Ghoumari, Tétouan, Maroc",
    // Coordonnées GPS — À CONFIRMER (laisser null tant qu'inconnues).
    lat: null as number | null,
    lng: null as number | null,
  },

  /**
   * Horaires d'ouverture.
   * À CONFIRMER — ce sont des PLACEHOLDERS. Remplacez par les vrais horaires.
   * `days` : 0 = dimanche … 6 = samedi. `closed: true` = jour fermé.
   * Ces horaires servent aussi au JSON-LD (openingHours) et au formulaire.
   */
  hours: {
    // À CONFIRMER — placeholder d'exemple ci-dessous
    placeholder: true,
    weekly: [
      { day: 1, label: { fr: "Lundi", ar: "الإثنين" }, open: "09:00", close: "18:00", closed: false },
      { day: 2, label: { fr: "Mardi", ar: "الثلاثاء" }, open: "09:00", close: "18:00", closed: false },
      { day: 3, label: { fr: "Mercredi", ar: "الأربعاء" }, open: "09:00", close: "18:00", closed: false },
      { day: 4, label: { fr: "Jeudi", ar: "الخميس" }, open: "09:00", close: "18:00", closed: false },
      { day: 5, label: { fr: "Vendredi", ar: "الجمعة" }, open: "09:00", close: "18:00", closed: false },
      { day: 6, label: { fr: "Samedi", ar: "السبت" }, open: "09:00", close: "13:00", closed: false },
      { day: 0, label: { fr: "Dimanche", ar: "الأحد" }, open: "", close: "", closed: true },
    ],
  },

  /**
   * Tarifs — À CONFIRMER. Tant que ce tableau est vide, AUCUN tarif n'est
   * affiché sur le site (conformément à la consigne).
   */
  pricing: [] as Array<{ label: { fr: string; ar: string }; price: string }>,

  // Langues parlées (pour JSON-LD et la page parcours)
  languages: {
    fr: ["Arabe", "Français", "Anglais", "Espagnol"],
    ar: ["العربية", "الفرنسية", "الإنجليزية", "الإسبانية"],
  },

  // Zone desservie (JSON-LD areaServed)
  areaServed: ["M'diq", "Tétouan", "Martil", "Fnideq"],

  // URL canonique du site (À CONFIRMER au moment du déploiement)
  url: "https://physiofit-ilyass.vercel.app",
} as const;

/** Lien WhatsApp de base (sans message). */
export const whatsappBase = `https://wa.me/${site.phone.whatsapp}`;

/** Lien Google Maps (adresse exacte si fournie, sinon requête de repli). */
export function mapsUrl(): string {
  if (site.address.lat != null && site.address.lng != null) {
    return `https://www.google.com/maps/search/?api=1&query=${site.address.lat},${site.address.lng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    site.address.mapQuery,
  )}`;
}
