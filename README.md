# PhysioFit — Site portfolio & réservation · Ilyass Tchekri

Site vitrine + réservation pour un kinésithérapeute (M'diq · Tétouan, Maroc).
Bilingue **français / arabe** (RTL complet), pensé **mobile d'abord**.

**Phase 1 (livrée)** : le site fonctionne sans backend. Le formulaire de
rendez-vous prépare un message WhatsApp / email pré-rempli — aucune base de
données requise. Les Phases 2 (Supabase + Resend) et 3 (espace admin) sont
documentées dans le prompt d'origine et **ne sont pas encore codées**.

---

## Stack

- **Next.js 15** (App Router) + **TypeScript strict**
- **Tailwind CSS v4** (CSS-first, tokens dans `app/globals.css`)
- **next-intl** (FR / AR, RTL) — routing `/[locale]`
- **react-hook-form** + **zod** (validation client)
- **shadcn/ui**-style primitives (formulaire uniquement), **Radix**, **sonner**
- **MDX** pour les articles de conseils
- Déploiement : **Vercel**

## Démarrer le projet

```bash
npm install
npm run dev          # http://localhost:3000  → redirige vers /fr
```

Autres commandes :

```bash
npm run build        # build de production
npm run start        # sert le build de production
npm run typecheck    # tsc --noEmit
```

Les URLs : `/fr` (défaut) et `/ar`. Une visite de `/` redirige vers la langue.

---

## Où changer les informations du cabinet

**Un seul fichier : `lib/site.ts`.** Tout le site lit ces valeurs (téléphone,
WhatsApp, email, Instagram, adresse, horaires, tarifs, zone desservie).

| Information | Emplacement dans `lib/site.ts` |
| --- | --- |
| **Numéro de téléphone / WhatsApp** | `site.phone` (`display`, `tel`, `whatsapp`) |
| **Email** | `site.email` |
| **Instagram** | `site.instagram` |
| **Adresse exacte** | `site.address.street` (+ `lat` / `lng` pour la carte) |
| **Horaires** | `site.hours.weekly` (mettre `placeholder: false` une fois confirmés) |
| **Tarifs** | `site.pricing` (vide = rien d'affiché) |
| **URL du site** | `site.url` (à mettre à jour au déploiement) |

> Les valeurs marquées `À CONFIRMER` sont des **placeholders** clairement
> commentés. Voir `TODO-CLIENT.md` pour la liste de ce qui reste à fournir.

### Numéro de téléphone — rappel

Le numéro apparaît à trois formats dans `site.phone` :
`display` (affiché), `tel:` (bouton Appeler), `whatsapp` (lien wa.me).
Changez les trois de façon cohérente.

---

## Contenus

### Ajouter / modifier un **soin** (domaine de prise en charge)

Éditez `lib/content.ts` → tableau `soins`. Chaque soin a un `slug` (utilisé
dans l'URL `/soins/<slug>`), un `title`, un `seoTitle`, une `metaDescription`,
un `excerpt`, une liste de `conditions` et une liste `approach`. Tout est
bilingue (`{ fr, ar }`). Le nouveau soin apparaît automatiquement dans la
grille d'accueil, le bandeau, le `<select>` du formulaire, le sitemap et génère
sa propre page.

### Ajouter un **article** de conseils

1. Créez le corps de l'article en MDX : `content/conseils/<slug>.mdx`
   (rédigé en français ; la mise en forme est appliquée automatiquement).
2. Déclarez-le dans `lib/content.ts` → tableau `articles` (mêmes `slug`,
   `title`, `excerpt`, `date`, `readingMinutes`, `tag`, bilingues).

L'article apparaît alors dans l'index `/conseils`, les 3 dernières publications
de l'accueil, le sitemap, et à l'URL `/conseils/<slug>`.

> Le corps des articles est en français. La traduction arabe des articles est
> laissée au client (voir `TODO-CLIENT.md`).

### Modifier les textes d'interface (boutons, labels, sections)

Fichiers de traduction : `messages/fr.json` et `messages/ar.json`.
Gardez les deux fichiers synchronisés (mêmes clés).

### Parcours / formations / bio

`lib/parcours.ts` (expériences, formations, bio) — bilingue.

---

## Design system — « medical glass »

- Tokens couleurs & fontes : `app/globals.css` (`@theme` + `:root`).
- Palette : `--ink #0A2C6B`, `--blue #1B58C7`, `--sky #A9C6E8`, `--ice #EDF3FC`,
  `--lime #6FE04A` (accent d'ACTION uniquement — jamais de texte, jamais un fond
  de section), `--aqua #35C9C0` (dégradés des visuels), `--muted #6B7C99`,
  `--glass`/`--glass-solid` (surfaces en verre), `--color-error` (formulaire).
- Fontes : **Anton** (titres capitales), **Inter** (texte), **Cairo** (arabe —
  Anton n'a pas de glyphes arabes) — via `next/font`, `display: swap`.
- **Les 6 composants** (`components/glass/`) : `PillButton`, `GlassCard`,
  `FloatingBadge`, `ArchMask` (portrait + halo), `RotatedTag`, `Backdrop`
  (filigrane) + le panneau flottant dans `app/[locale]/layout.tsx`.
- Visuels anatomiques : `components/visuals/AnatomyVisual.tsx` (SVG au trait,
  tracé animé). Voir aussi la page **`/kitchen-sink`** (noindex) qui affiche tous
  les composants.
- `prefers-reduced-motion` est respecté partout (flottement, tracé, reveal).

---

## Phase 2 — persistance & notification email

Le formulaire enregistre chaque demande dans **Supabase** (la trace) et notifie
le praticien par **email via Resend** — en plus d'ouvrir WhatsApp (la
notification). **Sans configuration, le site fonctionne en Phase 1** (WhatsApp
seul) : la route `/api/bookings` renvoie alors `persisted:false` sans erreur.

**Mise en route :**

1. **Supabase** — créez un projet sur [supabase.com](https://supabase.com),
   puis dans **SQL Editor** exécutez `supabase/schema.sql` (crée la table
   `booking_requests` avec RLS activée).
2. **Resend** — créez un compte sur [resend.com](https://resend.com), une clé
   API, et (idéalement) vérifiez votre domaine d'envoi.
3. **Variables d'environnement** — copiez `.env.example` en `.env.local`
   (dev) et renseignez `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
   `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`. Sur Vercel : **Settings →
   Environment Variables** (mêmes clés). La clé `service_role` est **secrète**
   (serveur uniquement).

**Détails techniques** (`app/api/bookings/route.ts`) : re-validation zod côté
serveur, honeypot (`company`), rate limiting par IP (5 / 10 min, en mémoire —
voir `lib/rate-limit.ts` pour la note serverless), insertion Supabase, email
Resend. Tout est « best-effort » : un échec base/email ne casse jamais l'envoi
WhatsApp côté patient.

> **Phase 3 (pas encore codée)** : espace `/admin` protégé par Supabase Auth,
> liste et filtres des demandes, changement de statut, gestion des créneaux.

---

## Déployer sur Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhlachhab230-ai%2Fphisioilyass)

**Ou manuellement :**

1. Sur [vercel.com/new](https://vercel.com/new) → connectez-vous **avec GitHub**.
2. **Import** → sélectionnez le dépôt **`hlachhab230-ai/phisioilyass`**.
3. Framework détecté : **Next.js**. **Aucune variable d'environnement requise**
   pour voir le site (Phase 1). Cliquez **Deploy**.
4. Au bout d'~1 min : une URL type `https://phisioilyass.vercel.app`.
5. Ensuite, mettez à jour `site.url` dans `lib/site.ts` avec le vrai domaine,
   puis redéployez (corrige URLs canoniques, sitemap, `hreflang`, Open Graph).
6. (Optionnel) **Phase 2/3** : ajoutez les variables Supabase/Resend dans
   **Settings → Environment Variables** (voir `.env.example`), puis redéployez.
7. (Optionnel) Domaine personnalisé : onglet **Domains** du projet.

> La branche par défaut du dépôt contient déjà tout le code : l'import déploie
> le site directement, sans manipulation de branche.

### SEO / accessibilité déjà en place

- Métadonnées par page + Open Graph (image générée par `next/og`).
- JSON-LD `Physiotherapy` + `LocalBusiness` (nom, tél, zone desservie, langues,
  horaires) sur l'accueil.
- `sitemap.xml`, `robots.txt`, `hreflang` fr/ar, une page par soin avec un
  titre correspondant à une recherche réelle.
- Contraste AA vérifié, focus clavier visible, formulaire entièrement
  utilisable au clavier, RTL propre en arabe.

---

## Structure

```
app/[locale]/            pages (accueil, soins/[slug], parcours, conseils,
                         conseils/[slug], rendez-vous, mentions-legales)
components/              hero (goniomètre), layout, sections, booking, ui
content/conseils/        articles MDX
lib/                     site.ts, content.ts, parcours.ts, booking-schema.ts,
                         wa-message.ts, jsonld.ts, utils.ts
messages/                fr.json, ar.json
i18n/                    routing, request, navigation (next-intl)
```
