/** Stack visible dans le hero — aligné sur le CV de référence. */
export const skillsStrip = [
  "SQL",
  "Tableau",
  "Excel",
  "Python/pandas",
  "KPI",
  "Qualité des données",
  "ETL",
  "Reporting BI",
] as const;

/** Bande de capacités affichée sous le hero. */
export const capabilityBand = [
  "SQL",
  "KPI",
  "Reporting BI",
  "Tableau",
  "Python/pandas",
  "Qualité des données",
  "Segmentation RFM",
  "ETL",
] as const;

export const skillsByCategory = [
  {
    category: "Data & BI",
    skills: [
      "SQL (jointures, CTE, agrégations)",
      "Data warehouse",
      "ETL",
      "Modélisation",
      "Tableau",
      "Tableaux de bord",
      "Reporting BI",
    ],
    summary: "Structurer les données et restituer les KPI dans des tableaux de bord BI.",
    projectSlugs: ["profit-leak", "renewalos"],
  },
  {
    category: "Python / Excel",
    skills: [
      "Python/pandas",
      "Nettoyage de données",
      "Analyse exploratoire",
      "Excel",
      "Tableaux de suivi",
    ],
    summary: "Préparer, explorer et suivre les données.",
    projectSlugs: ["rfm-segmentation"],
  },
  {
    category: "Analyse business",
    skills: [
      "Besoins métier",
      "Spécifications fonctionnelles",
      "Qualité des données",
      "Diagnostic business",
      "Recommandations",
    ],
    summary: "Traduire les besoins métier en analyses et recommandations.",
    projectSlugs: ["renewalos", "profit-leak"],
  },
  {
    category: "Marketing analytics",
    skills: [
      "GA4",
      "Search Console",
      "Looker Studio",
      "Acquisition",
      "Conversion",
      "CRM",
      "Performance digitale",
    ],
    summary: "Analyser les parcours de conversion et segmenter la clientèle.",
    projectSlugs: ["funnel-analysis", "rfm-segmentation"],
  },
] as const;

export const languages = ["Français courant", "Anglais courant"] as const;
