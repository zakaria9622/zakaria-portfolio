export type ProjectKpi = {
  label: string;
  value: string;
  highlight?: boolean;
};

export type ProjectArtifact = {
  label: string;
  description: string;
  href: string;
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  heroTitle?: string;
  heroSubtitle?: string;
  shortTitle: string;
  tools: string[];
  businessQuestion: string;
  summary: string;
  /** Ligne de contexte affichée sur la carte projet (périmètre, volumes, KPI). */
  cardContext: string;
  github: string;
  liveDemo?: string;
  href: string;
  featuredOrder: number;
  featuredCategory: string;
  featuredInsight?: string;
  projectType: string;
  datasetDisclosure: string;
  ownership: string;
  evidence: string[];
  artifacts?: ProjectArtifact[];
  businessProblem: string;
  architecture?: string[];
  methodology: string[];
  kpis: ProjectKpi[];
  mainInsight: string;
  recommendations: string[];
  limitations?: string[];
  supportingScreenshots?: ProjectScreenshot[];
  screenshotPlaceholder: string;
};

export const projects: Project[] = [
  {
    slug: "renewalos",
    title:
      "RenewalOS — Fiabilité du revenu B2B & priorisation Customer Success",
    heroTitle: "RenewalOS",
    heroSubtitle: "Fiabilité du revenu B2B & priorisation Customer Success",
    shortTitle: "RenewalOS",
    tools: ["SQL", "dbt", "DuckDB", "Python", "Streamlit"],
    businessQuestion:
      "Les KPI de revenu sont-ils fiables avant que le Customer Success priorise ses comptes ?",
    summary:
      "Détection des incidents qualité avant reporting, puis priorisation d'un portefeuille CRM sous contrainte de capacité.",
    cardContext:
      "Portefeuille 24 mois · 7 sources · Réconciliation ARR · Contrôles qualité · Priorisation sous contrainte",
    github:
      "https://github.com/zakaria9622/renewalos-b2b-revenue-quality-engine",
    liveDemo: "https://renewalos-zakaria.streamlit.app/",
    href: "/projects/renewalos",
    featuredOrder: 1,
    featuredCategory: "Data Quality & Aide à la décision",
    featuredInsight:
      "Les KPI restent sous contrôle qualité tant que les exceptions ne sont pas revues.",
    projectType: "Projet portfolio individuel",
    datasetDisclosure:
      "Données B2B synthétiques uniquement. Aucune donnée client de production, aucun déploiement en production, aucun résultat d'intervention observé ni impact business réel n'est revendiqué.",
    ownership: "Projet individuel de bout en bout",
    evidence: [
      "Entrepôt DuckDB modélisé avec dbt",
      "Contrôles qualité et réconciliation du revenu",
      "Diagnostic de santé des comptes explicable",
      "Démonstration Streamlit publique et dépôt GitHub",
    ],
    artifacts: [
      {
        label: "Génération et validation des sources",
        description:
          "Couche reproductible de génération et de validation des données sources, qui injecte puis détecte 14 scénarios d'incidents qualité contrôlés.",
        href:
          "https://github.com/zakaria9622/renewalos-b2b-revenue-quality-engine/blob/master/src/renewalos/generation/validate_generation.py",
      },
      {
        label: "Contrôle qualité des KPI",
        description:
          "Modèle dbt qui bloque, nuance ou déclare non évaluables les métriques de revenu selon les preuves de qualité et de réconciliation.",
        href:
          "https://github.com/zakaria9622/renewalos-b2b-revenue-quality-engine/blob/master/dbt/models/marts/mart_kpi_trust_status.sql",
      },
      {
        label: "Validation des contrôles qualité",
        description:
          "Couche de validation vérifiant la couverture des incidents, les métadonnées d'exception, les statuts qualité et les écarts de réconciliation.",
        href:
          "https://github.com/zakaria9622/renewalos-b2b-revenue-quality-engine/blob/master/src/renewalos/quality/validation.py",
      },
      {
        label: "Méthodologie de santé des comptes",
        description:
          "Documentation des contrôles qualité, des composantes de score, des seuils simulés, de la logique d'explication et des limites.",
        href:
          "https://github.com/zakaria9622/renewalos-b2b-revenue-quality-engine/blob/master/docs/account_health_methodology.md",
      },
      {
        label: "Optimiseur sous contrainte de capacité",
        description:
          "Optimiseur de scénarios (OR-Tools) sélectionnant les comptes éligibles sous contrainte d'heures CSM et de nombre de comptes.",
        href:
          "https://github.com/zakaria9622/renewalos-b2b-revenue-quality-engine/blob/master/src/renewalos/prioritization/optimizer.py",
      },
    ],
    businessProblem:
      "Les équipes B2B agissent souvent sur des signaux d'ARR, de churn, de renouvellement et de santé des comptes avant que les problèmes des systèmes sources ne soient visibles. RenewalOS montre un workflow analytique où les exceptions de données, les écarts de réconciliation et les règles de décision sont exposés avant que la priorisation Customer Success ne soit revue.",
    architecture: [
      "Sept domaines sources alimentent un entrepôt DuckDB local modélisé avec dbt (26 modèles : staging, intermediate, qualité, marts).",
      "Les contrôles qualité et la réconciliation du revenu font remonter les exceptions sources avant l'usage des vues destinées aux KPI.",
      "Le diagnostic de santé des comptes explicite les signaux de risque tout en conservant les enregistrements bloqués ou exclus.",
      "OR-Tools applique des limites de capacité CSM simulées aux scénarios de recommandation, et non à des décisions de production.",
    ],
    methodology: [
      "Génération de données sources synthétiques : contrats, facturation, usage, support et activité Customer Success",
      "Chargement des enregistrements non fiabilisés dans DuckDB et modélisation des couches de l'entrepôt avec dbt",
      "Application des contrôles qualité et de la réconciliation du revenu avant tout reporting de KPI",
      "Construction d'un diagnostic de santé des comptes explicable, exceptions sources toujours visibles",
      "Production de scénarios de priorisation CSM sous contrainte de capacité, avec exclusions explicites",
    ],
    kpis: [
      { label: "Sources de données", value: "7", highlight: true },
      { label: "Profondeur d'historique", value: "24 mois" },
      { label: "Comptes du portefeuille", value: "750" },
      { label: "Scénarios qualité couverts", value: "14", highlight: true },
      { label: "Modèles dbt", value: "26" },
      { label: "Réconciliation", value: "ARR" },
    ],
    mainInsight:
      "Les sorties décisionnelles restent restreintes tant que les exceptions sources et les écarts de réconciliation ne sont pas visibles et revus.",
    recommendations: [
      "Revoir les exceptions qualité avant de traiter l'ARR, le churn ou le renouvellement comme des KPI de pilotage",
      "Traiter les écarts de réconciliation comme des points bloquants exigeant une preuve, plutôt que de les lisser manuellement",
      "Considérer la priorisation CSM comme une simulation de scénarios tant qu'elle n'est pas validée sur données réelles",
      "Garder les enregistrements exclus visibles pour que les arbitrages de capacité ne masquent pas les problèmes de fiabilité",
    ],
    limitations: [
      "Le projet repose uniquement sur des données synthétiques.",
      "Les sorties sont diagnostiques et ne constituent pas un reporting de KPI de pilotage fiabilisé.",
      "La priorisation CSM est une analyse de scénarios simulée, pas une preuve d'intervention observée.",
      "Aucun impact business, résultat client ou niveau de précision de modèle n'est revendiqué.",
      "Aucun déploiement en production n'est configuré ni revendiqué.",
    ],
    supportingScreenshots: [
      {
        src: "/projects/renewalos-data-trust-diagnostics.png",
        alt: "Écran de diagnostic Data Trust de RenewalOS présentant les catégories de contrôle qualité",
        caption:
          "Le diagnostic Data Trust rend les exceptions sources visibles avant la lecture des KPI ou des scénarios de priorisation.",
      },
    ],
    screenshotPlaceholder:
      "Control Tower RenewalOS — contrôles qualité et statut du reporting KPI",
  },
  {
    slug: "funnel-analysis",
    title: "Funnel e-commerce & leviers de conversion",
    shortTitle: "Funnel e-commerce",
    tools: ["SQL", "Tableau", "Python"],
    businessQuestion: "Où les utilisateurs abandonnent-ils avant l'achat ?",
    summary:
      "Identification du principal point de friction entre consultation, panier et achat.",
    cardContext:
      "3,02 M visiteurs · Vue → panier 11,14 % · Panier → achat 58,35 %",
    github: "https://github.com/zakaria9622/funnel-analysis-project",
    href: "/projects/funnel-analysis",
    featuredOrder: 2,
    featuredCategory: "Analyse de performance & Conversion",
    featuredInsight: "Point de friction vue → panier : 11,14 %.",
    projectType: "Projet portfolio individuel",
    datasetDisclosure:
      "Données e-commerce événementielles externes utilisées à des fins de démonstration analytique. Le jeu de données complet est exclu du dépôt en raison de sa taille ; un échantillon, les sorties agrégées et la documentation méthodologique sont fournis. Il ne s'agit pas d'une mission client.",
    ownership: "Projet individuel de bout en bout",
    evidence: [
      "Logique de funnel utilisateur strictement chronologique en SQL",
      "Contrôles de qualité des données et exports prêts pour Tableau",
      "Classeur Tableau et capture du dashboard",
      "Échantillon de données et méthodologie documentée",
    ],
    artifacts: [
      {
        label: "SQL du funnel strict",
        description:
          "Logique utilisateur ordonnée dans le temps : première vue, premier panier après la vue, premier achat après le panier.",
        href:
          "https://github.com/zakaria9622/funnel-analysis-project/blob/main/sql/04_funnel_overall.sql",
      },
      {
        label: "Contrôles de qualité des données",
        description:
          "Contrôles SQL sur le volume de lignes, les types d'événements, les identifiants nuls, la plage de dates et les enregistrements exploitables.",
        href:
          "https://github.com/zakaria9622/funnel-analysis-project/blob/main/sql/07_qa_checks.sql",
      },
      {
        label: "Méthodologie",
        description:
          "Définitions du funnel, règles de séquencement, formules et principes d'analyse par segment.",
        href:
          "https://github.com/zakaria9622/funnel-analysis-project/blob/main/docs/methodology.md",
      },
      {
        label: "Échantillon de données événementielles",
        description:
          "Échantillon CSV consultable présentant le schéma d'événements utilisé par le pipeline de démonstration.",
        href:
          "https://github.com/zakaria9622/funnel-analysis-project/blob/main/data/ecommerce_events_sample.csv",
      },
      {
        label: "Classeur Tableau",
        description:
          "Classeur Tableau connecté aux sorties analytiques générées par le projet.",
        href:
          "https://github.com/zakaria9622/funnel-analysis-project/blob/main/tableau/ecommerce_funnel_dashboard.twb",
      },
    ],
    businessProblem:
      "Ce projet portfolio examine à quel moment les utilisateurs abandonnent un parcours d'achat e-commerce et quantifie les pertes de conversion à chaque étape du funnel.",
    methodology: [
      "Définition des étapes du funnel : vue → panier → achat",
      "Calcul des utilisateurs uniques, taux de conversion et taux d'abandon via des CTE SQL",
      "Analyse de 3 022 130 visiteurs avec DuckDB pour des agrégations performantes",
      "Construction d'un dashboard Tableau destiné au suivi par les équipes métiers",
      "Isolation de l'étape vue → panier comme principal point de friction",
    ],
    kpis: [
      { label: "Visiteurs", value: "3 022 130" },
      { label: "Taux vue → panier", value: "11,14 %", highlight: true },
      { label: "Taux panier → achat", value: "58,35 %" },
      { label: "Taux de conversion global", value: "6,50 %", highlight: true },
      { label: "Utilisateurs avec panier", value: "336 718" },
      { label: "Utilisateurs acheteurs", value: "196 474" },
    ],
    mainInsight:
      "Seuls 11,14 % des visiteurs ajoutent un produit au panier, alors que 58,35 % des paniers aboutissent à un achat. Le principal point de friction se situe donc entre la vue produit et l'ajout au panier, et non au moment du paiement.",
    recommendations: [
      "Tester les CTA et la visibilité de l'ajout au panier sur les pages produit",
      "Analyser les catégories de produits présentant la plus forte perte vue → panier",
      "Mettre en place un retargeting sur les visiteurs à forte intention n'ayant pas ajouté au panier",
      "Suivre le taux vue → panier comme KPI de conversion à part entière, au même titre que le taux d'achat",
    ],
    screenshotPlaceholder:
      "Dashboard funnel — conversion et abandon par étape",
  },
  {
    slug: "rfm-segmentation",
    title: "Segmentation RFM & recommandations CRM",
    shortTitle: "Segmentation RFM",
    tools: ["Python", "pandas"],
    businessQuestion: "Quels clients le CRM doit-il prioriser ?",
    summary:
      "Actions de rétention et de réactivation adaptées à chaque segment client.",
    cardContext: "5 000 clients · VIP · Loyaux · À risque · Perdus",
    github: "https://github.com/zakaria9622/customer-segmentation-rfm",
    href: "/projects/rfm-segmentation",
    featuredOrder: 3,
    featuredCategory: "CRM & Segmentation",
    featuredInsight:
      "Les clients VIP représentent 27,9 % des clients et 75,4 % du chiffre d'affaires.",
    projectType: "Projet portfolio individuel",
    datasetDisclosure:
      "Données de commandes e-commerce synthétiques, mais réalistes d'un point de vue métier, générées avec Python. Le jeu de données contient 5 000 clients simulés et 45 356 commandes, et ne représente pas une entreprise réelle.",
    ownership: "Projet individuel de bout en bout",
    evidence: [
      "Agrégation client avec Python et pandas",
      "Règles de scoring et de segmentation RFM documentées",
      "Sorties KPI générées et analyse visuelle",
      "Dépôt GitHub reproductible",
    ],
    artifacts: [
      {
        label: "Générateur de données synthétiques",
        description:
          "Générateur Python à graine fixe définissant les profils de comportement client, la fréquence de commande, la récence et la distribution du chiffre d'affaires.",
        href:
          "https://github.com/zakaria9622/customer-segmentation-rfm/blob/main/scripts/generate_dataset.py",
      },
      {
        label: "Pipeline de scoring RFM",
        description:
          "Agrégation au niveau client, scoring par quintiles, affectation de segments mutuellement exclusifs et export des KPI.",
        href:
          "https://github.com/zakaria9622/customer-segmentation-rfm/blob/main/scripts/rfm_segmentation.py",
      },
      {
        label: "Métriques d'exécution versionnées",
        description:
          "Sortie exploitable par machine contenant le nombre de clients, de commandes, le chiffre d'affaires et les résultats exacts par segment.",
        href:
          "https://github.com/zakaria9622/customer-segmentation-rfm/blob/main/outputs/metrics.json",
      },
      {
        label: "Synthèse par segment",
        description:
          "Nombre de clients, part de chiffre d'affaires et revenu moyen par client, publiés pour chaque segment.",
        href:
          "https://github.com/zakaria9622/customer-segmentation-rfm/blob/main/outputs/segment_summary.csv",
      },
      {
        label: "Playbook CRM",
        description:
          "Actions métiers, idées de campagnes et KPI de suivi pour les segments VIP, Loyaux, À risque et Perdus.",
        href:
          "https://github.com/zakaria9622/customer-segmentation-rfm/blob/main/docs/crm_playbook.md",
      },
    ],
    businessProblem:
      "Ce projet portfolio construit une segmentation client fondée sur la récence, la fréquence et le montant d'achat, afin de prioriser les actions de rétention et de réactivation.",
    methodology: [
      "Calcul des scores RFM sur 5 000 clients et 45 356 commandes",
      "Segmentation des clients en groupes VIP, Loyaux, À risque et Perdus",
      "Quantification de la concentration du chiffre d'affaires par segment",
      "Définition de règles de priorisation CRM fondées sur l'économie de chaque segment",
      "Traduction des résultats en recommandations actionnables par segment",
    ],
    kpis: [
      { label: "Clients analysés", value: "5 000" },
      { label: "Commandes", value: "45 356" },
      { label: "Chiffre d'affaires", value: "4 522 014 €" },
      {
        label: "Part VIP",
        value: "27,9 % des clients · 75,4 % du CA",
        highlight: true,
      },
      {
        label: "Part Perdus",
        value: "23,62 % des clients · 2,95 % du CA",
        highlight: true,
      },
    ],
    mainInsight:
      "Le chiffre d'affaires est fortement concentré : les clients VIP (27,9 %) génèrent 75,4 % du CA, tandis que les clients Perdus (23,62 %) n'en représentent que 2,95 % — un signal de priorisation CRM très clair.",
    recommendations: [
      "Rétention VIP : programme de fidélité, offres exclusives, suivi de compte proactif",
      "Réactivation À risque : campagnes email ciblées avant bascule vers le segment Perdus",
      "Upsell et cross-sell sur le segment Loyaux pour le faire progresser vers le statut VIP",
      "Dépriorisation des campagnes de masse sur le segment Perdus au profit du segment À risque récupérable",
    ],
    screenshotPlaceholder:
      "Dashboard de segmentation RFM — répartition des segments et chiffre d'affaires",
  },
  {
    slug: "profit-leak",
    title: "Rentabilité e-commerce & fuites de marge",
    shortTitle: "Rentabilité e-commerce",
    tools: ["SQL", "Tableau", "Python"],
    businessQuestion: "Où la marge se dégrade-t-elle ?",
    summary:
      "Priorisation des fuites de marge et des leviers d'amélioration de la rentabilité.",
    cardContext: "12 000 commandes · CA · Coûts · Marge · Remises",
    github: "https://github.com/zakaria9622/ecommerce-profit-leak-analysis",
    href: "/projects/profit-leak",
    featuredOrder: 4,
    featuredCategory: "Rentabilité",
    featuredInsight:
      "La perte de marge se concentre sur Électronique / UE ; des remises élevées dégradent la marge.",
    projectType: "Projet portfolio individuel",
    datasetDisclosure:
      "Données de commandes e-commerce synthétiques générées avec Python. L'analyse porte sur 12 000 commandes simulées et ne représente pas la performance d'une entreprise réelle.",
    ownership: "Projet individuel de bout en bout",
    evidence: [
      "Couche SQL DuckDB et requêtes KPI documentées",
      "Pipeline Python de génération, validation et export du jeu de données",
      "Classeur Tableau et capture du dashboard",
      "Dépôt GitHub reproductible",
    ],
    artifacts: [
      {
        label: "Générateur de données synthétiques",
        description:
          "Générateur Python à graine fixe définissant les distributions par catégorie et région, les profils de remise et de coût, et des scénarios explicites de fuite de marge.",
        href:
          "https://github.com/zakaria9622/ecommerce-profit-leak-analysis/blob/main/scripts/generate_dataset.py",
      },
      {
        label: "Modèle de préparation de la marge",
        description:
          "Transformation SQL au niveau commande calculant la marge, le taux de marge, les tranches de remise et la maille mensuelle de reporting.",
        href:
          "https://github.com/zakaria9622/ecommerce-profit-leak-analysis/blob/main/sql/02_staging_profit_view.sql",
      },
      {
        label: "SQL des KPI de synthèse",
        description:
          "Agrégats SQL sur les commandes, le chiffre d'affaires, les coûts, la marge, le taux de marge, la remise moyenne et la part de commandes à perte.",
        href:
          "https://github.com/zakaria9622/ecommerce-profit-leak-analysis/blob/main/sql/03_kpi_overview.sql",
      },
      {
        label: "SQL des segments en fuite de marge",
        description:
          "Analyse croisée catégorie × région classant les segments les plus faibles en marge et en rentabilité.",
        href:
          "https://github.com/zakaria9622/ecommerce-profit-leak-analysis/blob/main/sql/06_category_region_segments.sql",
      },
      {
        label: "Classeur Tableau",
        description:
          "Classeur Tableau consultable, connecté aux sorties de rentabilité générées par le projet.",
        href:
          "https://github.com/zakaria9622/ecommerce-profit-leak-analysis/blob/main/tableau/profit_leak_dashboard.twb",
      },
    ],
    businessProblem:
      "Ce projet portfolio examine où la rentabilité se dégrade selon les catégories, les régions et les politiques de remise, à partir de données de commandes e-commerce.",
    methodology: [
      "Construction d'une couche analytique DuckDB au niveau commande (12 000 commandes)",
      "Calcul du chiffre d'affaires, de la marge, du taux de marge et des remises par segment",
      "Identification des commandes à perte et des couples catégorie × région les plus fragiles",
      "Visualisation des facteurs de rentabilité dans Tableau pour les équipes métiers",
      "Traduction des résultats SQL en recommandations commerciales actionnables",
    ],
    kpis: [
      { label: "Commandes analysées", value: "12 000" },
      { label: "Chiffre d'affaires", value: "2 054 589 €" },
      { label: "Marge", value: "214 041 €", highlight: true },
      { label: "Taux de marge", value: "10,42 %" },
      { label: "Remise moyenne", value: "17,39 %" },
      {
        label: "Part de commandes à perte",
        value: "16,01 %",
        highlight: true,
      },
    ],
    mainInsight:
      "La fuite de marge se concentre sur le couple Électronique / UE, et les niveaux de remise élevés dégradent systématiquement la marge.",
    recommendations: [
      "Revoir la politique de remise sur l'Électronique en UE — zone d'érosion de marge la plus forte",
      "Plafonner la profondeur promotionnelle sur les catégories à marge de contribution négative",
      "Suivre la part de commandes à perte chaque semaine comme KPI avancé de rentabilité",
      "Prioriser les correctifs d'assortiment et de prix sur les segments catégorie × région les plus fragiles",
    ],
    screenshotPlaceholder:
      "Dashboard de rentabilité — vue remises et catégorie × région",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = [...projects].sort(
  (a, b) => a.featuredOrder - b.featuredOrder
);
