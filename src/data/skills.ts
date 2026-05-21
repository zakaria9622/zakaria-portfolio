export const skillsStrip = [
  "SQL",
  "DuckDB",
  "Tableau",
  "Python",
  "pandas",
  "Excel",
  "KPI",
  "Reporting",
  "Business Analytics",
] as const;

export const skillsByCategory = [
  {
    category: "Data & BI",
    skills: ["SQL", "DuckDB", "Tableau", "Excel", "Python pandas"],
  },
  {
    category: "Business Analytics",
    skills: [
      "KPI tracking",
      "reporting",
      "dashboards",
      "profitability analysis",
      "funnel analysis",
    ],
  },
  {
    category: "Marketing / CRM Analytics",
    skills: [
      "Google Analytics",
      "Search Console",
      "Looker Studio",
      "CRM segmentation",
      "conversion analysis",
    ],
  },
] as const;
