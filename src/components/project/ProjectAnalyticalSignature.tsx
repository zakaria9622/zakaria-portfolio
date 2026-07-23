import type { CSSProperties } from "react";
import type { Project, ProjectKpi } from "@/data/projects";

function findMetric(project: Project, label: string) {
  return project.kpis.find((metric) => metric.label === label);
}

function requireMetric(project: Project, label: string) {
  const metric = findMetric(project, label);
  if (!metric) throw new Error(`Missing "${label}" metric for ${project.slug}`);
  return metric;
}

function numericValue(metric: ProjectKpi) {
  return Number(metric.value.replace(/[^\d.-]/g, "")) || 0;
}

function percentageValues(metric: ProjectKpi) {
  return [...metric.value.matchAll(/[\d.]+%/g)].map((match) =>
    Number.parseFloat(match[0])
  );
}

function scaleStyle(value: number) {
  return {
    "--project-scale": `${Math.max(0, Math.min(value, 100))}%`,
  } as CSSProperties;
}

function FunnelSignature({ project }: { project: Project }) {
  const views = requireMetric(project, "View users");
  const carts = requireMetric(project, "Cart users");
  const purchases = requireMetric(project, "Purchase users");
  const viewToCart = requireMetric(project, "View-to-cart rate");
  const cartToPurchase = requireMetric(project, "Cart-to-purchase rate");
  const totalConversion = requireMetric(project, "Total conversion rate");
  const base = numericValue(views);
  const stages = [
    { metric: views, conversion: "Funnel entry", scale: 100 },
    {
      metric: carts,
      conversion: `${viewToCart.label}: ${viewToCart.value}`,
      scale: base ? (numericValue(carts) / base) * 100 : 0,
    },
    {
      metric: purchases,
      conversion: `${totalConversion.label}: ${totalConversion.value}`,
      scale: base ? (numericValue(purchases) / base) * 100 : 0,
    },
  ];

  return (
    <div className="project-signature project-signature-funnel">
      <div className="project-signature-register">
        <p>Strict user funnel</p>
        <span>{cartToPurchase.label}: {cartToPurchase.value}</span>
      </div>
      <ol aria-label="View, cart, and purchase funnel stages">
        {stages.map(({ metric, conversion, scale }, index) => (
          <li key={metric.label}>
            <div>
              <span>0{index + 1}</span>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
            </div>
            <i style={scaleStyle(scale)} aria-hidden="true">
              <span />
            </i>
            <small>{conversion}</small>
          </li>
        ))}
      </ol>
      <p className="project-signature-note">{project.mainInsight}</p>
    </div>
  );
}

function RfmSignature({ project }: { project: Project }) {
  const vip = requireMetric(project, "VIP share");
  const lost = requireMetric(project, "Lost share");
  const [vipCustomers = 0, vipRevenue = 0] = percentageValues(vip);
  const [lostCustomers = 0, lostRevenue = 0] = percentageValues(lost);
  const segments = [
    {
      name: "VIP",
      metric: vip,
      customers: vipCustomers,
      revenue: vipRevenue,
      priority: "Retention priority",
    },
    {
      name: "Lost",
      metric: lost,
      customers: lostCustomers,
      revenue: lostRevenue,
      priority: "Lower broad-campaign priority",
    },
  ];

  return (
    <div className="project-signature project-signature-rfm">
      <div className="project-signature-register">
        <p>Customer concentration</p>
        <span>Customer share versus revenue share</span>
      </div>
      <div className="rfm-comparison-key" aria-hidden="true">
        <span>Customers</span>
        <span>Revenue</span>
      </div>
      <ol aria-label="VIP and Lost segment concentration comparison">
        {segments.map((segment, index) => (
          <li key={segment.name}>
            <div className="rfm-segment-title">
              <span>0{index + 1}</span>
              <h3>{segment.name}</h3>
              <p>{segment.priority}</p>
            </div>
            <div className="rfm-bar-group">
              <div>
                <i style={scaleStyle(segment.customers)} aria-hidden="true">
                  <span />
                </i>
                <strong>{segment.customers}%</strong>
              </div>
              <div>
                <i style={scaleStyle(segment.revenue)} aria-hidden="true">
                  <span />
                </i>
                <strong>{segment.revenue}%</strong>
              </div>
            </div>
            <small>{segment.metric.value}</small>
          </li>
        ))}
      </ol>
      <p className="project-signature-note">{project.mainInsight}</p>
    </div>
  );
}

function ProfitSignature({ project }: { project: Project }) {
  const revenue = requireMetric(project, "Revenue");
  const profit = requireMetric(project, "Profit");
  const margin = requireMetric(project, "Profit margin");
  const discount = requireMetric(project, "Avg. discount");
  const lossRate = requireMetric(project, "Loss-making order rate");
  const pressureMetrics = [margin, discount, lossRate];

  return (
    <div className="project-signature project-signature-profit">
      <div className="project-signature-register">
        <p>Commercial pressure record</p>
        <span>Revenue → profit → margin diagnosis</span>
      </div>
      <div className="profit-ledger">
        <div>
          <span>{revenue.label}</span>
          <strong>{revenue.value}</strong>
        </div>
        <div>
          <span>{profit.label}</span>
          <strong>{profit.value}</strong>
        </div>
      </div>
      <ol aria-label="Profit margin, discount, and loss-making order indicators">
        {pressureMetrics.map((metric, index) => (
          <li key={metric.label}>
            <div>
              <span>0{index + 1}</span>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
            </div>
            <i
              style={scaleStyle(numericValue(metric))}
              aria-hidden="true"
            >
              <span />
            </i>
          </li>
        ))}
      </ol>
      <p className="project-signature-note">{project.mainInsight}</p>
    </div>
  );
}

function RenewalSignature({ project }: { project: Project }) {
  const stages = [
    requireMetric(project, "Data status"),
    requireMetric(project, "KPI status"),
    requireMetric(project, "Decision output"),
  ];
  const controls = [
    requireMetric(project, "Interface"),
    requireMetric(project, "Deployment"),
    requireMetric(project, "Impact claim"),
  ];

  return (
    <div className="project-signature project-signature-renewal">
      <div className="project-signature-register">
        <p>KPI trust gate</p>
        <span>Exceptions visible before decision output</span>
      </div>
      <ol className="renewal-gate" aria-label="Data trust gate stages">
        {stages.map((metric, index) => (
          <li key={metric.label}>
            <span>Gate 0{index + 1}</span>
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
          </li>
        ))}
      </ol>
      <dl className="renewal-control-record">
        {controls.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
      <p className="project-signature-note">{project.mainInsight}</p>
    </div>
  );
}

export function ProjectAnalyticalSignature({ project }: { project: Project }) {
  if (project.slug === "funnel-analysis") {
    return <FunnelSignature project={project} />;
  }

  if (project.slug === "rfm-segmentation") {
    return <RfmSignature project={project} />;
  }

  if (project.slug === "profit-leak") {
    return <ProfitSignature project={project} />;
  }

  return <RenewalSignature project={project} />;
}
