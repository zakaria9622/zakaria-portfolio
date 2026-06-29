export type ProjectKpi = {
  label: string;
  value: string;
  highlight?: boolean;
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  tools: string[];
  businessQuestion: string;
  summary?: string;
  scope?: string;
  cardScope?: string;
  cardMetric?: ProjectKpi;
  mainOutput: string;
  github: string;
  href: string;
  featuredOrder: number;
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
    slug: "profit-leak",
    title: "E-commerce Profit Leak Analysis",
    shortTitle: "Profit Leak Analysis",
    tools: ["SQL / DuckDB", "Tableau", "Python"],
    businessQuestion: "Where is margin being destroyed?",
    mainOutput:
      "Profitability dashboard, discount impact, weak category-region segments",
    github: "https://github.com/zakaria9622/ecommerce-profit-leak-analysis",
    href: "/projects/profit-leak",
    featuredOrder: 1,
    businessProblem:
      "An e-commerce business needed to understand where profitability was eroding across categories, regions and discount strategies — without relying on assumptions.",
    methodology: [
      "Built a DuckDB analytical layer on order-level data (12,000 orders)",
      "Calculated revenue, profit, margin and discount metrics by segment",
      "Identified loss-making orders and category-region combinations",
      "Visualized profitability drivers in Tableau for business stakeholders",
      "Translated SQL findings into actionable commercial recommendations",
    ],
    kpis: [
      { label: "Orders analyzed", value: "12,000" },
      { label: "Revenue", value: "€2,054,589" },
      { label: "Profit", value: "€214,041", highlight: true },
      { label: "Profit margin", value: "10.42%" },
      { label: "Avg. discount", value: "17.39%" },
      { label: "Loss-making order rate", value: "16.01%", highlight: true },
    ],
    mainInsight:
      "Margin leak is concentrated in Electronics / EU, and high discount levels systematically reduce margin.",
    recommendations: [
      "Review discount policy on Electronics in EU — highest margin erosion zone",
      "Cap promotional depth on categories with negative contribution margin",
      "Monitor loss-making order rate weekly as a leading profitability KPI",
      "Prioritize assortment and pricing fixes on weak category-region segments",
    ],
    screenshotPlaceholder: "Profitability dashboard — discount & category-region view",
  },
  {
    slug: "funnel-analysis",
    title: "E-commerce Funnel Analysis",
    shortTitle: "Funnel Analysis",
    tools: ["SQL / DuckDB", "Tableau", "Python"],
    businessQuestion: "Where do users drop before purchase?",
    scope: "More than 3M users",
    mainOutput:
      "Funnel dashboard, view-to-cart bottleneck diagnosis",
    github: "https://github.com/zakaria9622/funnel-analysis-project",
    href: "/projects/funnel-analysis",
    featuredOrder: 2,
    businessProblem:
      "A high-traffic e-commerce platform needed to pinpoint where users abandoned the purchase journey and quantify conversion drop-offs at each funnel stage.",
    methodology: [
      "Defined funnel stages: view → cart → purchase",
      "Used SQL CTEs to calculate unique users, conversion rates and drop-offs",
      "Analyzed 3M+ user journeys with DuckDB for performant aggregation",
      "Built a Tableau funnel dashboard for stakeholder reporting",
      "Isolated the view-to-cart step as the primary friction point",
    ],
    kpis: [
      { label: "Users analyzed", value: "3M+" },
      { label: "Funnel stages", value: "View → Cart → Purchase" },
      { label: "Primary friction", value: "View-to-cart", highlight: true },
      { label: "Analysis method", value: "SQL CTEs" },
    ],
    mainInsight:
      "The main friction occurs before add-to-cart — users view products but fail to engage with the cart step, indicating a product-page or UX conversion gap.",
    recommendations: [
      "A/B test product page CTAs and add-to-cart visibility",
      "Analyze product categories with highest view-to-cart drop-off",
      "Implement retargeting for high-intent viewers who did not add to cart",
      "Track view-to-cart rate as a core conversion KPI alongside purchase rate",
    ],
    screenshotPlaceholder: "Funnel dashboard — conversion & drop-off by stage",
  },
  {
    slug: "rfm-segmentation",
    title: "Customer Segmentation RFM",
    shortTitle: "RFM Segmentation",
    tools: ["Python", "pandas", "CRM analytics"],
    businessQuestion: "Which customers should CRM prioritize?",
    mainOutput:
      "VIP, Loyal, At-risk and Lost customer segmentation",
    github: "https://github.com/zakaria9622/customer-segmentation-rfm",
    href: "/projects/rfm-segmentation",
    featuredOrder: 3,
    businessProblem:
      "A CRM team needed a data-driven way to segment customers by recency, frequency and monetary value — and prioritize retention and win-back actions.",
    methodology: [
      "Computed RFM scores on 5,000 customers and 45,356 orders",
      "Segmented customers into VIP, Loyal, At-risk and Lost clusters",
      "Quantified revenue concentration per segment",
      "Built CRM prioritization rules based on segment economics",
      "Delivered actionable recommendations per segment",
    ],
    kpis: [
      { label: "Customers", value: "5,000" },
      { label: "Orders", value: "45,356" },
      { label: "Total revenue", value: "€4,522,014" },
      { label: "VIP share", value: "27.9% customers · 75.4% revenue", highlight: true },
      { label: "Lost share", value: "23.62% customers · 2.95% revenue", highlight: true },
    ],
    mainInsight:
      "Revenue is highly concentrated: VIP customers (27.9%) drive 75.4% of revenue, while Lost customers (23.62%) contribute only 2.95% — clear CRM prioritization signals.",
    recommendations: [
      "VIP retention: loyalty programs, exclusive offers, proactive account management",
      "At-risk win-back: targeted email campaigns before churn to Lost segment",
      "Upsell / cross-sell on Loyal segment to move toward VIP status",
      "Deprioritize broad campaigns on Lost segment — focus budget on recoverable At-risk",
    ],
    screenshotPlaceholder: "RFM segmentation dashboard — segment distribution & revenue",
  },
  {
    slug: "renewalos",
    title: "RenewalOS — Revenue Quality & Account Health",
    shortTitle: "RenewalOS",
    tools: ["DuckDB", "dbt", "SQL", "Python", "Streamlit", "OR-Tools"],
    businessQuestion:
      "Can revenue KPIs be trusted before Customer Success teams prioritize accounts?",
    summary:
      "A synthetic B2B analytics system that detects revenue-data issues, gates KPI reporting, explains account health, and generates capacity-constrained CSM recommendations.",
    scope: "Synthetic data only",
    cardScope: "Simulated B2B portfolio · reproducible scenario",
    cardMetric: {
      label: "DECISION CONTROL",
      value: "KPI reporting gated by data quality",
    },
    mainOutput:
      "Data-quality-gated revenue reconciliation and explainable CSM prioritization.",
    github:
      "https://github.com/zakaria9622/renewalos-b2b-revenue-quality-engine",
    href: "/projects/renewalos",
    featuredOrder: 4,
    businessProblem:
      "B2B teams often act on ARR, churn, renewal and account-health signals before source-system issues are visible. RenewalOS shows a synthetic analytics workflow where data exceptions, reconciliation gaps and decision rules are exposed before Customer Success prioritization is reviewed.",
    architecture: [
      "Synthetic source domains feed a local DuckDB warehouse modeled with dbt.",
      "Quality controls and revenue reconciliation checks surface source-data exceptions before KPI-facing views are used.",
      "Account-health diagnostics explain risk signals while preserving blocked or excluded records.",
      "OR-Tools applies simulated CSM capacity limits to scenario recommendations, not production decisions.",
    ],
    methodology: [
      "Generated synthetic source data for contracts, billing, usage, support and Customer Success activity",
      "Loaded untrusted records into DuckDB and modeled warehouse layers with dbt",
      "Applied data-quality controls and revenue reconciliation checks before KPI reporting",
      "Built explainable account-health diagnostics with source exceptions still visible",
      "Produced capacity-constrained CSM prioritization scenarios with explicit exclusions",
    ],
    kpis: [
      { label: "Data status", value: "Synthetic", highlight: true },
      { label: "KPI status", value: "Gated" },
      { label: "Decision output", value: "Diagnostic scenarios" },
      { label: "Interface", value: "Local Streamlit" },
      { label: "Deployment", value: "Not production" },
      { label: "Impact claim", value: "None" },
    ],
    mainInsight:
      "Decision outputs are restricted until source-data exceptions and reconciliation gaps are visible and reviewed.",
    recommendations: [
      "Review quality exceptions before treating ARR, churn or renewal metrics as management KPIs",
      "Use reconciliation gaps as blockers that require evidence rather than manual smoothing",
      "Treat CSM prioritization output as simulated scenario planning until validated on real data",
      "Keep excluded records visible so capacity decisions do not hide data-trust issues",
    ],
    limitations: [
      "Uses synthetic data only.",
      "Outputs are diagnostic and are not trusted management KPI reporting.",
      "CSM prioritization is simulated scenario analysis, not observed intervention evidence.",
      "No observed business impact, customer outcome or model-accuracy claim is made.",
      "No production deployment is configured or claimed.",
    ],
    supportingScreenshots: [
      {
        src: "/projects/renewalos-data-trust-diagnostics.png",
        alt: "RenewalOS Data Trust diagnostics screen showing quality-control categories",
        caption:
          "Data Trust diagnostics make source-data exceptions visible before KPI or prioritization outputs are reviewed.",
      },
    ],
    screenshotPlaceholder:
      "RenewalOS Control Tower — synthetic data disclaimer and KPI reporting restrictions",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = [...projects].sort(
  (a, b) => a.featuredOrder - b.featuredOrder
);
