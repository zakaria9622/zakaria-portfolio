/** Stack visible dans le hero — aligné sur le CV de référence. */
export const skillsStrip = [
  "SQL",
  "Python",
  "Excel",
  "KPI",
  "Reporting",
  "Data Viz",
  "Data Quality",
] as const;

/** Bande de capacités affichée sous le hero. */
export const capabilityBand = [
  "SQL",
  "KPI",
  "Reporting",
  "Tableau",
  "Python",
  "Data Quality",
  "CRM",
  "Performance",
] as const;

export const skillsByCategory = [
  {
    category: "CRM & Performance",
    skills: [
      "CRM",
      "Segmentation",
      "Rétention",
      "KPI",
      "Reporting",
      "Acquisition",
      "Analyse de performance",
    ],
  },
  {
    category: "Data & BI",
    skills: [
      "SQL",
      "Python",
      "pandas",
      "Tableau",
      "Power BI",
      "Looker Studio",
      "Excel",
    ],
  },
  {
    category: "Qualité & Activation",
    skills: [
      "ETL",
      "Talend",
      "dbt",
      "DuckDB",
      "Data Quality",
      "KPI",
      "Reporting",
      "Rentabilité",
    ],
  },
] as const;

export const languages = ["Français C1", "Anglais C1"] as const;
