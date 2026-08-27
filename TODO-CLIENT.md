# À fournir par le client — Ilyass Tchekri

Ce fichier liste tout ce qui manque encore pour finaliser le site. Les
placeholders correspondants sont clairement commentés dans le code
(principalement `lib/site.ts`).

## 🔴 Informations indispensables

- [ ] **Adresse exacte du cabinet** (rue, numéro, quartier)
      → `lib/site.ts` → `site.address.street`
- [ ] **Coordonnées GPS du cabinet** (latitude / longitude) pour la carte
      → `lib/site.ts` → `site.address.lat` et `site.address.lng`
      (sinon un lien Google Maps de repli est utilisé)
- [ ] **Horaires d'ouverture réels** (jours et plages)
      → `lib/site.ts` → `site.hours.weekly`, puis passer `placeholder: false`
      ⚠️ Les horaires actuels (Lun–Ven 09:00–18:00, Sam 09:00–13:00) sont des
      **exemples** à remplacer.
- [ ] **Tarifs** (si vous souhaitez les afficher)
      → `lib/site.ts` → `site.pricing` (rien n'est affiché tant que vide)

## 🟠 Photos & visuels

> ⚠️ **Important** : envoyez chaque photo comme **fichier joint** (bouton 📎),
> pas collée dans le message — une image collée s'affiche mais n'est pas
> enregistrée et ne peut pas être intégrée. Le réseau de l'atelier bloque les
> sites d'images (Google, Unsplash…), donc les photos doivent venir de vous.

- [x] **Photo portrait** d'Ilyass → intégrée (`public/images/ilyass-portrait.jpg`,
      hero + page Parcours). Remplaçable par une version plus haute résolution.
- [x] **Photo du cabinet** → intégrée (`public/images/cabinet.jpg`, section « À propos »).
- [x] **Photo de séance (cupping)** → intégrée (`public/images/cupping.jpg`, page Méthode).
- [ ] (Optionnel) Autres photos de **gestes** (dry needling, drainage, mobilisation)
      pour enrichir les pages soins — déposer dans `public/images/` et me le signaler.
- [ ] **Logo PhysioFit** en vectoriel (SVG) si vous voulez l'afficher.

## 🔵 Visuels 3D (optionnel — remplacer les SVG au trait)

Les visuels anatomiques du site (genou, colonne, épaule, main) sont des tracés
SVG. Vous pourrez faire produire des **rendus 3D en verre bleu-vert** pour les
remplacer. Dimensions à fournir (PNG transparent ou WebP, fond transparent) :

- [ ] **Genou / Colonne / Épaule / Main** — carré **800×800 px** chacun,
      objet centré, marge ~12%. Déposer dans `public/anatomy/` (`knee.png`, etc.)
      et me le signaler pour brancher `<AnatomyVisual>` sur les images.

## 🟡 Textes & contenus

- [ ] **Relire la bio** (page Parcours) — actuellement adaptée du CV
      → `lib/parcours.ts` → `bio`
- [ ] **Relire / compléter les 4 articles de conseils** (brouillons prudents)
      → `content/conseils/*.mdx`
- [ ] **Traduction arabe des articles** de conseils (le corps est en français ;
      l'interface est déjà bilingue). À fournir si souhaité.
- [ ] Confirmer les **libellés arabes** des soins et techniques
      (traductions proposées, à valider par un locuteur natif)
      → `lib/content.ts`

## 🟢 Déploiement & légal

- [ ] **Domaine final** du site → mettre à jour `lib/site.ts` → `site.url`
- [ ] Vérifier / compléter les **mentions légales** (hébergeur, éditeur)
      → `messages/fr.json` et `messages/ar.json`, section `legal`
- [ ] Confirmer les **numéros d'urgence** affichés près du formulaire
      (actuellement : 15 SAMU · 150 Protection civile · 19 Police)

## 🟣 Phase 2 — activer la base + les emails (optionnel)

Le formulaire enregistre les demandes et envoie un email au praticien **si**
c'est configuré (sinon, WhatsApp seul continue de fonctionner).

- [ ] Créer un projet **Supabase** (gratuit) → exécuter `supabase/schema.sql`
- [ ] Créer un compte **Resend** (gratuit) → une clé API + email destinataire
- [ ] Renseigner les variables (voir `.env.example`) dans Vercel :
      `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
      `RESEND_FROM`, `RESEND_TO`
- [ ] (Recommandé prod) brancher un rate-limit partagé (Upstash) — voir README

## ℹ️ Déjà intégré (données réelles fournies)

- Nom, titre, zone (M'diq · Tétouan), cabinet PhysioFit
- Téléphone / WhatsApp : +212 6 59 91 81 09
- Email : Tchekriliyass@gmail.com
- Instagram : @physiolife_ilyass · @physiofit.agb
- Domaines de prise en charge, techniques, parcours et formations (issus du CV)
