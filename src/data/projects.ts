export type ProjectKpi = {
  label: string;
  value: string;
  highlight?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  tools: string[];
  businessQuestion: string;
  scope?: string;
  mainOutput: string;
  github: string;
  href: string;
  featuredOrder: number;
  businessProblem: string;
  methodology: string[];
  kpis: ProjectKpi[];
  mainInsight: string;
  recommendations: string[];
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
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = [...projects].sort(
  (a, b) => a.featuredOrder - b.featuredOrder
);
