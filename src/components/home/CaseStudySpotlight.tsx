import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialMarker } from "@/components/home/EditorialMarker";
import { ProjectImageLightbox } from "@/components/project/ProjectImageLightbox";
import { getProjectBySlug, type Project, type ProjectKpi } from "@/data/projects";
import {
  findMetric,
  numericValue,
  percentageValues,
  ratio,
} from "@/lib/metrics";

const imageBySlug: Record<string, string> = {
  "profit-leak": "/projects/profit-leak.png",
  "funnel-analysis": "/projects/funnel-analysis.png",
  "rfm-segmentation": "/projects/rfm-segmentation.png",
  renewalos: "/projects/renewalos-home.png",
};

function requireProject(slug: string) {
  const project = getProjectBySlug(slug);
  if (!project) throw new Error(`Données de projet manquantes pour ${slug}`);
  return project;
}

const renewalProject = requireProject("renewalos");
const funnelProject = requireProject("funnel-analysis");
const rfmProject = requireProject("rfm-segmentation");
const profitProject = requireProject("profit-leak");

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
  const imageAlt = `${project.shortTitle} — ${project.screenshotPlaceholder}`;

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
          triggerLabel={`Agrandir l'aperçu : ${project.shortTitle}`}
        />
      </div>
      <figcaption>{project.screenshotPlaceholder}</figcaption>
    </figure>
  );
}

function CaseLink({ project }: { project: Project }) {
  return (
    <Link href={project.href} prefetch={false} className="editorial-case-link">
      Voir le projet
      <ArrowUpRight aria-hidden="true" />
    </Link>
  );
}

function CaseContext({ project }: { project: Project }) {
  return (
    <p className="editorial-case-context">
      <span>Contexte</span>
      {project.cardContext}
    </p>
  );
}

function Disclosure({ project }: { project: Project }) {
  return (
    <p className="editorial-case-disclosure">
      <span>Note sur les données</span>
      {project.datasetDisclosure}
    </p>
  );
}

function CaseReading({ project }: { project: Project }) {
  return (
    <dl className="editorial-case-reading">
      <div>
        <dt>Analyse</dt>
        <dd>{project.mainInsight}</dd>
      </div>
      <div>
        <dt>Décision / recommandation</dt>
        <dd>{project.recommendations[0]}</dd>
      </div>
    </dl>
  );
}

export function CaseStudySpotlight() {
  const renewalMetrics = [
    findMetric(renewalProject, "Données"),
    findMetric(renewalProject, "Statut des KPI"),
    findMetric(renewalProject, "Sortie décisionnelle"),
    findMetric(renewalProject, "Impact business revendiqué"),
  ].filter((metric): metric is ProjectKpi => Boolean(metric));

  const funnelView = findMetric(funnelProject, "Visiteurs");
  const funnelCart = findMetric(funnelProject, "Utilisateurs avec panier");
  const funnelPurchase = findMetric(funnelProject, "Utilisateurs acheteurs");
  const funnelBase = numericValue(funnelView);
  const funnelStages = [funnelView, funnelCart, funnelPurchase].filter(
    (metric): metric is ProjectKpi => Boolean(metric)
  );

  const rfmVip = findMetric(rfmProject, "Part VIP");
  const [vipCustomerShare = 0, vipRevenueShare = 0] = percentageValues(rfmVip);
  const rfmValueParts = rfmVip?.value.split("·").map((part) => part.trim()) ?? [];

  const profitMetrics = [
    findMetric(profitProject, "Marge"),
    findMetric(profitProject, "Remise moyenne"),
    findMetric(profitProject, "Part de commandes à perte"),
  ].filter((metric): metric is ProjectKpi => Boolean(metric));

  return (
    <section
      id="projects"
      className="editorial-cases"
      aria-labelledby="case-studies-heading"
    >
      <div className="editorial-cases-heading">
        <EditorialMarker index="04" label="Projets" tone="amber" />
        <h2 id="case-studies-heading">Projets</h2>
        <p>
          Quatre projets portfolio structurés de la même façon : problème
          métier, données et méthode, KPI, analyse, puis décision.
        </p>
      </div>

      <article className="editorial-case editorial-case-renewal">
        <header className="editorial-case-masthead">
          <span>Projet 01 / {renewalProject.featuredCategory}</span>
          <p>{renewalProject.projectType}</p>
        </header>

        <div className="renewal-control-heading">
          <div>
            <p>Problème métier</p>
            <h3>{renewalProject.businessQuestion}</h3>
          </div>
          <CaseLink project={renewalProject} />
        </div>

        <CaseContext project={renewalProject} />

        <div className="renewal-control-grid">
          <div className="renewal-trust-gate">
            <p>Repères / contrôle qualité avant reporting</p>
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
            <span>A</span>
            <p>Analyse</p>
            <strong>{renewalProject.mainInsight}</strong>
          </div>
          <div>
            <span>→</span>
            <p>Décision / recommandation</p>
            <strong>{renewalProject.recommendations[0]}</strong>
          </div>
        </div>
        <Disclosure project={renewalProject} />
      </article>

      <article className="editorial-case editorial-case-funnel">
        <header className="editorial-case-masthead">
          <span>Projet 02 / {funnelProject.featuredCategory}</span>
          <p>{funnelProject.projectType}</p>
        </header>

        <div className="editorial-funnel-lead">
          <div className="editorial-case-title-block">
            <p>Problème métier</p>
            <h3>{funnelProject.businessQuestion}</h3>
            <CaseContext project={funnelProject} />
            <CaseLink project={funnelProject} />
          </div>

          <div className="editorial-funnel-signal">
            <p>KPI / funnel utilisateur strict</p>
            <ol>
              {funnelStages.map((metric, index) => (
                <li key={metric.label}>
                  <div>
                    <span>0{index + 1}</span>
                    <p>{metric.label}</p>
                    <strong>{metric.value}</strong>
                  </div>
                  <i aria-hidden="true">
                    <span
                      style={{
                        transform: `scaleX(${ratio(
                          numericValue(metric),
                          funnelBase,
                          0.012
                        )})`,
                      }}
                    />
                  </i>
                </li>
              ))}
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
              <span>A</span>
              <p>Analyse</p>
              <strong>{funnelProject.mainInsight}</strong>
            </div>
            <div>
              <span>→</span>
              <p>Décision / recommandation</p>
              <strong>{funnelProject.recommendations[0]}</strong>
            </div>
            <Disclosure project={funnelProject} />
          </div>
        </div>
      </article>

      <div className="editorial-case-pair">
        <article className="editorial-case editorial-case-rfm">
          <header className="editorial-case-masthead">
            <span>Projet 03 / {rfmProject.featuredCategory}</span>
            <p>{rfmProject.projectType}</p>
          </header>

          <CaseImage
            project={rfmProject}
            className="is-rfm"
            sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1200px) 48vw, 600px"
          />

          <div className="editorial-paired-case-body">
            <p className="editorial-case-question-label">Problème métier</p>
            <h3>{rfmProject.businessQuestion}</h3>
            <CaseContext project={rfmProject} />

            <div
              className="rfm-concentration"
              aria-label={rfmVip ? `${rfmVip.label} : ${rfmVip.value}` : undefined}
            >
              <p>KPI / concentration du chiffre d&apos;affaires</p>
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

            <CaseReading project={rfmProject} />
            <Disclosure project={rfmProject} />
            <CaseLink project={rfmProject} />
          </div>
        </article>

        <article className="editorial-case editorial-case-profit">
          <header className="editorial-case-masthead">
            <span>Projet 04 / {profitProject.featuredCategory}</span>
            <p>{profitProject.projectType}</p>
          </header>

          <div className="editorial-paired-case-body">
            <p className="editorial-case-question-label">Problème métier</p>
            <h3>{profitProject.businessQuestion}</h3>
            <CaseContext project={profitProject} />

            <div className="profit-diagnostic" aria-label="Indicateurs observés">
              <p>KPI / diagnostic de rentabilité</p>
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

            <CaseReading project={profitProject} />
            <Disclosure project={profitProject} />
            <CaseLink project={profitProject} />
          </div>
        </article>
      </div>
    </section>
  );
}
