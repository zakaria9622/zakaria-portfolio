import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialMarker } from "@/components/home/EditorialMarker";
import { getProjectBySlug } from "@/data/projects";

const evidenceSources = [
  { slug: "funnel-analysis", metricLabel: "View users", marker: "A" },
  { slug: "profit-leak", metricLabel: "Orders analyzed", marker: "B" },
  { slug: "rfm-segmentation", metricLabel: "VIP share", marker: "C" },
] as const;

export function KpiRibbon() {
  return (
    <section className="evidence-ledger" aria-labelledby="evidence-ledger-title">
      <div className="evidence-ledger-intro">
        <EditorialMarker index="02" label="Evidence ledger" tone="amber" />
        <h2 id="evidence-ledger-title">Scale is context. Decisions are the output.</h2>
        <p>
          Selected evidence from independent portfolio case studies, with scope
          and ownership documented on every project page.
        </p>
      </div>

      <div className="evidence-ledger-entries">
        {evidenceSources.map(({ slug, metricLabel, marker }, index) => {
          const project = getProjectBySlug(slug);
          const metric = project?.kpis.find((item) => item.label === metricLabel);

          if (!project || !metric) return null;

          const valueParts = metric.value.split("·").map((part) => part.trim());
          const hasCompoundValue = valueParts.length > 1;

          return (
            <article
              key={project.slug}
              className={index === 0 ? "evidence-ledger-entry is-lead" : "evidence-ledger-entry"}
            >
              <span className="evidence-ledger-marker" aria-hidden="true">{marker}</span>
              <div className={hasCompoundValue ? "evidence-ledger-metric is-compound" : "evidence-ledger-metric"}>
                <strong>
                  {hasCompoundValue
                    ? valueParts.map((part, partIndex) => (
                        <span key={part}>{partIndex === 0 ? part : `· ${part}`}</span>
                      ))
                    : metric.value}
                </strong>
                <span>{metric.label}</span>
              </div>
              <div className="evidence-ledger-context">
                <p>{project.businessQuestion}</p>
                <span>{project.projectType}</span>
              </div>
              <Link href={project.href} aria-label={`Read ${project.title}`}>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
