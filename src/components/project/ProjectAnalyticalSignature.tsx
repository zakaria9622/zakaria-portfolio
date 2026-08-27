import type { CSSProperties } from "react";
import type { Project, ProjectKpi } from "@/data/projects";
import { numericValue, percentageValues, requireMetric } from "@/lib/metrics";

function scaleStyle(value: number) {
  return {
    "--project-scale": `${Math.max(0, Math.min(value, 100))}%`,
  } as CSSProperties;
}

const percentFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 2,
});

/** Formate un pourcentage au format français : 27,9 % — 23,62 %. */
function formatPercent(value: number) {
  return `${percentFormatter.format(value)} %`;
}

function FunnelSignature({ project }: { project: Project }) {
  const views = requireMetric(project, "Visiteurs");
  const carts = requireMetric(project, "Utilisateurs avec panier");
  const purchases = requireMetric(project, "Utilisateurs acheteurs");
  const viewToCart = requireMetric(project, "Taux vue → panier");
  const cartToPurchase = requireMetric(project, "Taux panier → achat");
  const totalConversion = requireMetric(project, "Taux de conversion global");
  const base = numericValue(views);
  const stages = [
    { metric: views, conversion: "Entrée du funnel", scale: 100 },
    {
      metric: carts,
      conversion: `${viewToCart.label} : ${viewToCart.value}`,
      scale: base ? (numericValue(carts) / base) * 100 : 0,
    },
    {
      metric: purchases,
      conversion: `${totalConversion.label} : ${totalConversion.value}`,
      scale: base ? (numericValue(purchases) / base) * 100 : 0,
    },
  ];

  return (
    <div className="project-signature project-signature-funnel">
      <div className="project-signature-register">
        <p>Funnel utilisateur strict</p>
        <span>
          {cartToPurchase.label} : {cartToPurchase.value}
        </span>
      </div>
      <ol aria-label="Étapes du funnel : vue, panier et achat">
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
    </div>
  );
}

function RfmSignature({ project }: { project: Project }) {
  const vip = requireMetric(project, "Part VIP");
  const lost = requireMetric(project, "Part Perdus");
  const [vipCustomers = 0, vipRevenue = 0] = percentageValues(vip);
  const [lostCustomers = 0, lostRevenue = 0] = percentageValues(lost);
  const segments = [
    {
      name: "VIP",
      metric: vip,
      customers: vipCustomers,
      revenue: vipRevenue,
      priority: "Priorité rétention",
    },
    {
      name: "Perdus",
      metric: lost,
      customers: lostCustomers,
      revenue: lostRevenue,
      priority: "Priorité basse en campagne de masse",
    },
  ];

  return (
    <div className="project-signature project-signature-rfm">
      <div className="project-signature-register">
        <p>Concentration client</p>
        <span>Part des clients comparée à la part du chiffre d&apos;affaires</span>
      </div>
      <div className="rfm-comparison-key" aria-hidden="true">
        <span>Clients</span>
        <span>Chiffre d&apos;affaires</span>
      </div>
      <ol aria-label="Comparaison de concentration des segments VIP et Perdus">
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
                <strong>{formatPercent(segment.customers)}</strong>
              </div>
              <div>
                <i style={scaleStyle(segment.revenue)} aria-hidden="true">
                  <span />
                </i>
                <strong>{formatPercent(segment.revenue)}</strong>
              </div>
            </div>
            <small>{segment.metric.value}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProfitSignature({ project }: { project: Project }) {
  const revenue = requireMetric(project, "Chiffre d'affaires");
  const profit = requireMetric(project, "Marge");
  const margin = requireMetric(project, "Taux de marge");
  const discount = requireMetric(project, "Remise moyenne");
  const lossRate = requireMetric(project, "Part de commandes à perte");
  const pressureMetrics = [margin, discount, lossRate];

  return (
    <div className="project-signature project-signature-profit">
      <div className="project-signature-register">
        <p>Pression sur la rentabilité</p>
        <span>Chiffre d&apos;affaires → marge → taux de marge</span>
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
      <ol aria-label="Taux de marge, remise moyenne et commandes à perte">
        {pressureMetrics.map((metric: ProjectKpi, index) => (
          <li key={metric.label}>
            <div>
              <span>0{index + 1}</span>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
            </div>
            <i style={scaleStyle(numericValue(metric))} aria-hidden="true">
              <span />
            </i>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RenewalSignature({ project }: { project: Project }) {
  const stages = [
    requireMetric(project, "Sources de données"),
    requireMetric(project, "Scénarios qualité couverts"),
    requireMetric(project, "Réconciliation"),
  ];
  const controls = [
    requireMetric(project, "Profondeur d'historique"),
    requireMetric(project, "Comptes du portefeuille"),
    requireMetric(project, "Modèles dbt"),
  ];

  return (
    <div className="project-signature project-signature-renewal">
      <div className="project-signature-register">
        <p>Contrôle qualité avant reporting</p>
        <span>Exceptions visibles avant toute sortie décisionnelle</span>
      </div>
      <ol className="renewal-gate" aria-label="Chaîne de contrôle qualité des données">
        {stages.map((metric, index) => (
          <li key={metric.label}>
            <span>Étape 0{index + 1}</span>
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
