# Zakaria Maachou — Portfolio Business Analyst

Portfolio destiné aux recruteurs, centré sur l'analyse de données, la définition des KPI, le reporting, la qualité des données et l'aide à la décision.

**Positionnement :** Business Analyst | Analyse de données, Reporting & Aide à la décision
**Site en ligne :** https://www.zakariamaachou.com

Le portfolio est rédigé en français. Restent en anglais les noms d'outils, les noms techniques et les noms de dépôts GitHub.

## Système visuel

Le système visuel combine une composition éditoriale premium avec des repères analytiques :

- papier chaud, encre carbone et bleu signal
- typographie d'affichage Newsreader
- typographie de texte DM Sans
- libellés, registres et annotations de données en IBM Plex Mono
- mises en page asymétriques plutôt qu'une grille de cartes de dashboard
- lecture homogène de chaque projet : problème métier → données et méthode → KPI → analyse → décision

L'ancien héro Three.js et ses dépendances WebGL ont été supprimés. L'atmosphère repose sur la typographie, les filets, l'espacement et un CSS léger.

## Architecture

### Page d'accueil

`src/app/page.tsx` est un Server Component qui compose :

- le héro et le profil en bref
- la bande de capacités
- l'expérience professionnelle
- les quatre projets
- la méthode « de la question métier à la décision »
- les compétences et les projets associés
- la formation
- le bloc de contact

Les sections statiques sont rendues côté serveur. Les frontières client sont limitées aux interactions qui l'exigent : accordéon d'expérience, navigation d'en-tête, chapitres de projet et visionneuses d'images.

### Pages projet

Les quatre routes utilisent l'architecture serveur partagée `ProjectDetail` :

- héro du projet et note sur les données
- problème métier
- données et méthode
- KPI et restitution visuelle
- analyse
- décision et recommandations
- limites et périmètre
- sources inspectables et projet suivant

`ProjectChapterNav` et `ProjectImageLightbox` sont les composants client dédiés à l'état des chapitres et au comportement modal accessible.

### Contenu et preuves

`src/data/projects.ts` est la source de vérité pour les affirmations, KPI, notes sur les données, méthodologie, limites et liens vers les livrables. Les données structurées sont générées à partir des mêmes enregistrements.

Le portfolio ne présente pas des travaux indépendants comme des missions client ni comme un impact en production. Les jeux de données synthétiques et les limites liées aux données externes sont identifiés sur les pages projet concernées.

## Projets

- [RenewalOS — Fiabilité du revenu B2B & priorisation Customer Success](https://www.zakariamaachou.com/projects/renewalos)
- [Funnel e-commerce & leviers de conversion](https://www.zakariamaachou.com/projects/funnel-analysis)
- [Segmentation RFM & recommandations CRM](https://www.zakariamaachou.com/projects/rfm-segmentation)
- [Rentabilité e-commerce & fuites de marge](https://www.zakariamaachou.com/projects/profit-leak)

## CV téléchargeable

Le portfolio n'expose aucun CV téléchargeable. L'ancien PDF a été supprimé de `public/` : aucune URL directe ne permet plus d'y accéder.

Pour proposer un CV plus tard : déposer un PDF aligné sur le positionnement Business Analyst dans `public/`, puis ajouter les CTA souhaités.

## Accessibilité et animations

- repères sémantiques et un seul titre principal par route
- lien d'évitement et focus clavier visible
- navigation, accordéon et visionneuses opérables au clavier
- confinement et restauration du focus pour les images en modal
- fermeture par la touche Échap
- prise en charge de `prefers-reduced-motion` en CSS et via Framer Motion
- mises en page responsive du mobile étroit aux grands écrans
- textes alternatifs descriptifs sur les visuels analytiques

## Technologies

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Sharp via Next.js pour la génération des visuels Open Graph

Les polices sont chargées avec `next/font`, auto-hébergées par l'application, et limitées à Newsreader, DM Sans et IBM Plex Mono.

## Métadonnées et aperçus sociaux

Le site inclut :

- titres, descriptions et URL canoniques par route
- métadonnées Open Graph et Twitter en `fr_FR`
- JSON-LD WebSite, Person et CreativeWork
- sitemap et robots générés
- visuels sociaux 1200×630

Régénérer les visuels Open Graph sans changer leurs URL :

```bash
node scripts/generate-og-images.mjs
```

## Développement local

### Prérequis

- Node.js
- npm

### Installation

```bash
git clone https://github.com/zakaria9622/zakaria-portfolio.git
cd zakaria-portfolio
npm ci
```

### Lancement

```bash
npm run dev
```

Ouvrir http://localhost:3000.

### Vérifier et produire le build de production

```bash
npm run lint
npm run build
npm run start
```

## Structure du dépôt

```text
src/
├── app/                  # routes, métadonnées, sitemap, robots et CSS global
├── components/
│   ├── home/             # sections de la page d'accueil
│   ├── layout/           # en-tête et pied de page partagés
│   ├── project/          # architecture partagée des pages projet
│   └── ui/               # icônes sociales partagées
├── data/                 # profil, expérience, formation, compétences et projets
└── lib/                  # lecture des KPI et données structurées des projets

public/
├── og/                   # aperçus sociaux 1200×630 par route
└── projects/             # visuels des livrables analytiques
```

## Déploiement

L'application utilise un build de production Next.js standard et est déployée sur Vercel sur le domaine indiqué plus haut.

## Contact

- LinkedIn : https://www.linkedin.com/in/zakaria-maachou
- GitHub : https://github.com/zakaria9622
