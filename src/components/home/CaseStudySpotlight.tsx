import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialMarker } from "@/components/home/EditorialMarker";
import { ProjectImageLightbox } from "@/components/project/ProjectImageLightbox";
import {
  getProjectBySlug,
  type Project,
  type ProjectKpi,
} from "@/data/projects";

const imageBySlug: Record<string, string> = {
  "profit-leak": "/projects/profit-leak.png",
  "funnel-analysis": "/projects/funnel-analysis.png",
  "rfm-segmentation": "/projects/rfm-segmentation.png",
  renewalos: "/projects/renewalos-home.png",
};

function requireProject(slug: string) {
  const project = getProjectBySlug(slug);
  if (!project) throw new Error(`Missing project data for ${slug}`);
  return project;
}

const funnelProject = requireProject("funnel-analysis");
const rfmProject = requireProject("rfm-segmentation");
const profitProject = requireProject("profit-leak");
const renewalProject = requireProject("renewalos");

function findMetric(project: Project, label: string) {
  return project.kpis.find((metric) => metric.label === label);
}

function numericValue(metric?: ProjectKpi) {
  if (!metric) return 0;
  return Number(metric.value.replace(/[^\d.-]/g, "")) || 0;
}

function percentageValues(metric?: ProjectKpi) {
  if (!metric) return [];
  return [...metric.value.matchAll(/[\d.]+%/g)].map((match) =>
    Number.parseFloat(match[0])
  );
}

function CaseImage({
  project,
  className = "",
  sizes,
}: {
  project: Project;
  className?: string;
  sizes: string;
}) {
  const imageSrc = imageBySlug[project.slug];
  const imageAlt = `${project.title} dashboard — ${project.screenshotPlaceholder}`;

  return (
    <figure className={`editorial-case-figure ${className}`}>
      <div className="editorial-case-image-frame">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes={sizes}
          className="editorial-case-image"
        />
        <ProjectImageLightbox
          src={imageSrc}
          alt={imageAlt}
          caption={project.screenshotPlaceholder}
          triggerLabel={`Expand ${project.title} dashboard preview`}
        />
      </div>
      <figcaption>{project.screenshotPlaceholder}</figcaption>
    </figure>
  );
}

function CaseLink({ project }: { project: Project }) {
  return (
    <Link href={project.href} prefetch={false} className="editorial-case-link">
      Complete case study
      <ArrowUpRight aria-hidden="true" />
    </Link>
  );
}

function Disclosure({ project }: { project: Project }) {
  return (
    <p className="editorial-case-disclosure">
      <span>Dataset note</span>
      {project.datasetDisclosure}
    </p>
  );
}

export function CaseStudySpotlight() {
  const funnelView = findMetric(funnelProject, "View users");
  const funnelCart = findMetric(funnelProject, "Cart users");
  const funnelPurchase = findMetric(funnelProject, "Purchase users");
  const funnelBase = numericValue(funnelView);
  const funnelStages = [funnelView, funnelCart, funnelPurchase].filter(
    (metric): metric is ProjectKpi => Boolean(metric)
  );

  const rfmVip = findMetric(rfmProject, "VIP share");
  const [vipCustomerShare = 0, vipRevenueShare = 0] =
    percentageValues(rfmVip);
  const rfmValueParts = rfmVip?.value.split("·").map((part) => part.trim()) ?? [];

  const profitMetrics = [
    findMetric(profitProject, "Profit"),
    findMetric(profitProject, "Avg. discount"),
    findMetric(profitProject, "Loss-making order rate"),
  ].filter((metric): metric is ProjectKpi => Boolean(metric));

  const renewalMetrics = [
    findMetric(renewalProject, "Data status"),
    findMetric(renewalProject, "KPI status"),
    findMetric(renewalProject, "Decision output"),
    findMetric(renewalProject, "Impact claim"),
  ].filter((metric): metric is ProjectKpi => Boolean(metric));

  return (
    <section
      id="projects"
      className="editorial-cases"
      aria-labelledby="case-studies-heading"
    >
      <div className="editorial-cases-heading">
        <EditorialMarker index="04" label="Selected case studies" tone="amber" />
        <h2 id="case-studies-heading">
          Four growth questions. Four different analytical decisions.
        </h2>
        <p>
          Independent portfolio work demonstrating how acquisition, conversion,
          retention, profitability and data reliability become marketing
          priorities.
        </p>
      </div>

      <article className="editorial-case editorial-case-funnel">
        <header className="editorial-case-masthead">
          <span>Case 01 / {funnelProject.featuredCategory}</span>
          <p>{funnelProject.projectType}</p>
        </header>

        <div className="editorial-funnel-lead">
          <div className="editorial-case-title-block">
            <p>Business question</p>
            <h3>
              {funnelProject.featuredBusinessQuestion ??
                funnelProject.businessQuestion}
            </h3>
            <CaseLink project={funnelProject} />
          </div>

          <div className="editorial-funnel-signal">
            <p>Observed signal / strict user funnel</p>
            <ol>
              {funnelStages.map((metric, index) => {
                const scale = funnelBase
                  ? Math.max(numericValue(metric) / funnelBase, 0.012)
                  : 0;

                return (
                  <li key={metric.label}>
                    <div>
                      <span>0{index + 1}</span>
                      <p>{metric.label}</p>
                      <strong>{metric.value}</strong>
                    </div>
                    <i aria-hidden="true">
                      <span style={{ transform: `scaleX(${scale})` }} />
                    </i>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="editorial-funnel-analysis">
          <CaseImage
            project={funnelProject}
            className="is-funnel"
            sizes="(max-width: 768px) calc(100vw - 32px), 58vw"
          />
          <div className="editorial-case-trace">
            <div>
              <span>D</span>
              <p>Analytical interpretation</p>
              <strong>{funnelProject.mainInsight}</strong>
            </div>
            <div>
              <span>→</span>
              <p>Decision / recommendation</p>
              <strong>{funnelProject.recommendations[0]}</strong>
            </div>
            <Disclosure project={funnelProject} />
          </div>
        </div>
      </article>

      <div className="editorial-case-pair">
        <article className="editorial-case editorial-case-rfm">
          <header className="editorial-case-masthead">
            <span>Case 02 / {rfmProject.featuredCategory}</span>
            <p>{rfmProject.projectType}</p>
          </header>

          <CaseImage
            project={rfmProject}
            className="is-rfm"
            sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1200px) 48vw, 600px"
          />

          <div className="editorial-paired-case-body">
            <p className="editorial-case-question-label">Business question</p>
            <h3>{rfmProject.businessQuestion}</h3>

            <div
              className="rfm-concentration"
              aria-label={rfmVip ? `${rfmVip.label}: ${rfmVip.value}` : undefined}
            >
              <p>Observed signal / customer concentration</p>
              <div>
                <span>
                  <i
                    aria-hidden="true"
                    style={{ transform: `scaleX(${vipCustomerShare / 100})` }}
                  />
                  <strong>{rfmValueParts[0]}</strong>
                </span>
                <span>
                  <i
                    aria-hidden="true"
                    style={{ transform: `scaleX(${vipRevenueShare / 100})` }}
                  />
                  <strong>{rfmValueParts[1]}</strong>
                </span>
              </div>
            </div>

            <dl className="editorial-case-reading">
              <div>
                <dt>Analytical interpretation</dt>
                <dd>{rfmProject.mainInsight}</dd>
              </div>
              <div>
                <dt>Decision / recommendation</dt>
                <dd>{rfmProject.recommendations[0]}</dd>
              </div>
            </dl>
            <Disclosure project={rfmProject} />
            <CaseLink project={rfmProject} />
          </div>
        </article>

        <article className="editorial-case editorial-case-profit">
          <header className="editorial-case-masthead">
            <span>Case 03 / {profitProject.featuredCategory}</span>
            <p>{profitProject.projectType}</p>
          </header>

          <div className="editorial-paired-case-body">
            <p className="editorial-case-question-label">Business question</p>
            <h3>{profitProject.businessQuestion}</h3>

            <div className="profit-diagnostic" aria-label="Observed signals">
              <p>Observed signal / commercial diagnosis</p>
              <dl>
                {profitMetrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <CaseImage
              project={profitProject}
              className="is-profit"
              sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1200px) 48vw, 600px"
            />

            <dl className="editorial-case-reading">
              <div>
                <dt>Analytical interpretation</dt>
                <dd>{profitProject.mainInsight}</dd>
              </div>
              <div>
                <dt>Decision / recommendation</dt>
                <dd>{profitProject.recommendations[0]}</dd>
              </div>
            </dl>
            <Disclosure project={profitProject} />
            <CaseLink project={profitProject} />
          </div>
        </article>
      </div>

      <article className="editorial-case editorial-case-renewal">
        <header className="editorial-case-masthead">
          <span>Case 04 / {renewalProject.featuredCategory}</span>
          <p>{renewalProject.projectType}</p>
        </header>

        <div className="renewal-control-heading">
          <div>
            <p>Business question</p>
            <h3>{renewalProject.businessQuestion}</h3>
          </div>
          <CaseLink project={renewalProject} />
        </div>

        <div className="renewal-control-grid">
          <div className="renewal-trust-gate">
            <p>Observed signal / KPI trust gate</p>
            <ol>
              {renewalMetrics.map((metric, index) => (
                <li key={metric.label}>
                  <span aria-hidden="true">0{index + 1}</span>
                  <p>{metric.label}</p>
                  <strong>{metric.value}</strong>
                </li>
              ))}
            </ol>
          </div>

          <CaseImage
            project={renewalProject}
            className="is-renewal"
            sizes="(max-width: 768px) calc(100vw - 32px), 54vw"
          />
        </div>

        <div className="renewal-decision-line">
          <div>
            <span>D</span>
            <p>Analytical interpretation</p>
            <strong>{renewalProject.mainInsight}</strong>
          </div>
          <div>
            <span>→</span>
            <p>Decision / recommendation</p>
            <strong>{renewalProject.recommendations[0]}</strong>
          </div>
        </div>
        <Disclosure project={renewalProject} />
      </article>
    </section>
  );
}
