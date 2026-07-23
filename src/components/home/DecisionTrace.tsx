import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { EditorialMarker } from "@/components/home/EditorialMarker";

type DecisionTraceProps = {
  project: Project;
};

function findMetric(project: Project, label: string) {
  return project.kpis.find((metric) => metric.label === label);
}

function percentageValue(value?: string) {
  if (!value) return 0;
  const parsed = Number.parseFloat(value.replace("%", ""));
  return Number.isFinite(parsed) ? parsed / 100 : 0;
}

export function DecisionTrace({ project }: DecisionTraceProps) {
  const viewToCart = findMetric(project, "View-to-cart rate");
  const cartToPurchase = findMetric(project, "Cart-to-purchase rate");
  const question = project.featuredBusinessQuestion ?? project.businessQuestion;
  const decision = project.recommendations[0];

  return (
    <aside className="decision-trace" aria-labelledby="decision-trace-title">
      <div className="decision-trace-heading">
        <EditorialMarker index="01" label="Decision trace" tone="blue" />
        <p>Featured case / {project.featuredCategory}</p>
      </div>

      <h2 id="decision-trace-title" className="sr-only">
        Evidence-to-decision trace for {project.title}
      </h2>

      <ol className="decision-trace-list">
        <li>
          <span className="decision-trace-index">Q</span>
          <div>
            <p className="decision-trace-label">Business question</p>
            <p className="decision-trace-question">{question}</p>
          </div>
        </li>

        <li>
          <span className="decision-trace-index">S</span>
          <div>
            <p className="decision-trace-label">Observed signal</p>
            <div className="decision-trace-metrics">
              {[viewToCart, cartToPurchase].map((metric, index) =>
                metric ? (
                  <div key={metric.label} className="decision-trace-metric">
                    <div className="decision-trace-metric-copy">
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </div>
                    <span className="decision-trace-bar-track" aria-hidden="true">
                      <span
                        className={index === 0 ? "is-risk" : "is-signal"}
                        style={{
                          transform: `scaleX(${percentageValue(metric.value)})`,
                        }}
                      />
                    </span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </li>

        <li>
          <span className="decision-trace-index">D</span>
          <div>
            <p className="decision-trace-label">Diagnosis</p>
            <p>{project.mainInsight}</p>
          </div>
        </li>

        <li className="decision-trace-decision">
          <span className="decision-trace-index">→</span>
          <div>
            <p className="decision-trace-label">Marketing decision</p>
            <p>{decision}</p>
          </div>
        </li>
      </ol>

      <Link href={project.href} className="editorial-text-link">
        Read the full case study
        <ArrowUpRight aria-hidden="true" />
      </Link>
    </aside>
  );
}
