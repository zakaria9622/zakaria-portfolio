export const skillsStrip = [
  "SQL",
  "DuckDB",
  "dbt",
  "Tableau",
  "Python",
  "pandas",
  "Data quality",
  "KPI",
  "Reporting",
  "Analytics Engineering",
] as const;

export const skillsByCategory = [
  {
    category: "Data & BI",
    skills: ["SQL", "DuckDB", "dbt", "Tableau", "Python pandas"],
  },
  {
    category: "Business Analytics",
    skills: [
      "KPI tracking",
      "reporting",
      "dashboards",
      "profitability analysis",
      "funnel analysis",
      "data quality",
      "analytics engineering",
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
      "data governance",
      "capacity optimization",
    ],
  },
] as const;
