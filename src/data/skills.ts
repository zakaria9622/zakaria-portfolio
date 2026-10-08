/** Stack visible dans le hero — aligné sur le CV de référence. */
export const skillsStrip = [
  "SQL",
  "Python",
  "Excel",
  "KPI",
  "Reporting",
  "Tableau",
  "Qualité des données",
] as const;

/** Bande de capacités affichée sous le hero. */
export const capabilityBand = [
  "SQL",
  "KPI",
  "Reporting",
  "Tableau",
  "Python",
  "Qualité des données",
  "Segmentation RFM",
  "Performance",
] as const;

export const skillsByCategory = [
  {
    category: "Analyse",
    skills: [
      "SQL",
      "Python (pandas)",
      "Excel",
      "KPI",
      "Segmentation RFM",
    ],
  },
  {
    category: "BI & Reporting",
    skills: [
      "Tableau",
      "Power BI",
      "Visualisation",
      "Tableaux de bord",
    ],
  },
  {
    category: "Qualité des données",
    skills: [
      "Nettoyage",
      "Contrôles de cohérence",
      "ETL",
      "dbt",
      "DuckDB",
    ],
  },
] as const;

export const languages = ["Français C1", "Anglais C1"] as const;
