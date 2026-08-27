import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import {
  featuredProjects,
  type Project,
  type ProjectKpi,
} from "@/data/projects";
import { ProjectAnalyticalSignature } from "@/components/project/ProjectAnalyticalSignature";
import { ProjectChapterNav } from "@/components/project/ProjectChapterNav";
import { ProjectImageLightbox } from "@/components/project/ProjectImageLightbox";

const projectImages: Record<string, string> = {
  "profit-leak": "/projects/profit-leak.png",
  "funnel-analysis": "/projects/funnel-analysis.png",
  "rfm-segmentation": "/projects/rfm-segmentation.png",
  renewalos: "/projects/renewalos-home.png",
};

function principalSignal(project: Project) {
  return (
    project.featuredInsight ??
    project.kpis.find((metric) => metric.highlight)?.value ??
    project.mainInsight
  );
}

function getNextProject(project: Project) {
  const index = featuredProjects.findIndex(
    (candidate) => candidate.slug === project.slug
  );
  return featuredProjects[(index + 1) % featuredProjects.length];
}

function ProjectMarker({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <div className="project-marker">
      <span>{index}</span>
      <p>{label}</p>
    </div>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
  titleId,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  titleId: string;
  description?: string;
}) {
  return (
    <header className="project-section-heading">
      <ProjectMarker index={number} label={eyebrow} />
      <div>
        <h2 id={titleId}>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </header>
  );
}

function BusinessProblem({ project }: { project: Project }) {
  return (
    <section
      id="business-problem"
      className="project-decision-brief project-anchor"
      aria-labelledby="business-problem-title"
    >
      <SectionHeading
        number="01"
        eyebrow="Problème métier"
        title="La question posée par le métier."
        titleId="business-problem-title"
        description={project.businessProblem}
      />

      <ol className="project-decision-chain">
        <li>
          <span>Question</span>
          <p>{project.businessQuestion}</p>
        </li>
        <li>
          <span>Périmètre</span>
          <p>{project.cardContext}</p>
        </li>
        <li>
          <span>Attendu</span>
          <p>{project.summary}</p>
        </li>
        <li>
          <span>Décision visée</span>
          <p>{project.recommendations[0]}</p>
        </li>
      </ol>
    </section>
  );
}

function DataAndMethod({ project }: { project: Project }) {
  return (
    <section
      id="data-method"
      className="project-method-chapter project-anchor"
      aria-labelledby="data-method-title"
    >
      <SectionHeading
        number="02"
        eyebrow="Données & méthode"
        title="Comment les données ont été préparées."
        titleId="data-method-title"
        description="Origine des données, étapes de traitement et contrôles appliqués avant analyse."
      />

      <div className="project-method-grid">
        <div>
          <p>Méthode</p>
          <ol>
            {project.methodology.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <p>{project.architecture ? "Architecture" : "Contrôles qualité"}</p>
          <ol>
            {(project.architecture ?? project.evidence).map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {project.architecture && (
        <div className="project-quality-record">
          <p>Preuves et contrôles qualité</p>
          <ul>
            {project.evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="project-tool-register">
        <p>Outils mobilisés</p>
        <ul>
          {project.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function KpiChapter({ project }: { project: Project }) {
  const src = projectImages[project.slug];
  const alt = `${project.shortTitle} — ${project.screenshotPlaceholder.toLowerCase()}`;

  return (
    <section
      id="kpi"
      className="project-evidence-chapter project-anchor"
      aria-labelledby="kpi-title"
    >
      <SectionHeading
        number="03"
        eyebrow="KPI"
        title="Les indicateurs suivis."
        titleId="kpi-title"
        description="Les indicateurs retenus pour répondre à la question métier, et le reporting qui les restitue."
      />

      <dl className="project-kpi-register">
        {project.kpis.map((metric: ProjectKpi) => (
          <div key={metric.label} className={metric.highlight ? "is-key" : undefined}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>

      <figure className="project-primary-exhibit">
        <div className="project-exhibit-register">
          <span>Visuel 01</span>
          <p>{project.shortTitle} / restitution principale</p>
        </div>
        <div className="project-exhibit-image">
          <Image
            src={src}
            alt={alt}
            fill
            loading="lazy"
            sizes="(max-width: 760px) 100vw, (max-width: 1200px) 92vw, 1280px"
            className="project-exhibit-image-content"
          />
          <ProjectImageLightbox
            src={src}
            alt={alt}
            caption={project.screenshotPlaceholder}
            triggerLabel={`Agrandir le visuel : ${project.screenshotPlaceholder}`}
          />
        </div>
        <figcaption>
          <span>Figure 01</span>
          <p>{project.screenshotPlaceholder}</p>
        </figcaption>
      </figure>

      {project.supportingScreenshots?.map((screenshot, index) => (
        <figure
          key={screenshot.src}
          className="project-primary-exhibit project-supporting-exhibit"
        >
          <div className="project-exhibit-register">
            <span>Visuel {String(index + 2).padStart(2, "0")}</span>
            <p>Vue de diagnostic complémentaire</p>
          </div>
          <div className="project-exhibit-image">
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              fill
              loading="lazy"
              sizes="(max-width: 760px) 100vw, (max-width: 1200px) 92vw, 1280px"
              className="project-exhibit-image-content"
            />
            <ProjectImageLightbox
              src={screenshot.src}
              alt={screenshot.alt}
              caption={screenshot.caption}
              triggerLabel={`Agrandir le visuel : ${screenshot.alt}`}
            />
          </div>
          <figcaption>
            <span>Figure {String(index + 2).padStart(2, "0")}</span>
            <p>{screenshot.caption}</p>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}

function AnalysisChapter({ project }: { project: Project }) {
  return (
    <section
      id="analysis"
      className="project-analysis-chapter project-anchor"
      aria-labelledby="analysis-title"
    >
      <SectionHeading
        number="04"
        eyebrow="Analyse"
        title="Ce que montrent les indicateurs."
        titleId="analysis-title"
        description="Lecture des écarts et des tendances observés dans les données du projet."
      />

      <ProjectAnalyticalSignature project={project} />

      <div className="project-finding">
        <p>Constat principal</p>
        <blockquote>{project.mainInsight}</blockquote>
      </div>
    </section>
  );
}

function DecisionChapter({ project }: { project: Project }) {
  return (
    <section
      id="decision"
      className="project-decision-chapter project-anchor"
      aria-labelledby="decision-title"
    >
      <SectionHeading
        number="05"
        eyebrow="Décision & recommandation"
        title="Ce que l'analyse change pour le métier."
        titleId="decision-title"
        description="Priorités et actions déduites des résultats observés."
      />

      <div className="project-recommendations">
        <header>
          <p>Recommandations</p>
          <h3>Actions proposées</h3>
          <span>
            Les recommandations découlent des résultats de ce projet portfolio ;
            aucun gain testé ni impact business observé n&apos;est revendiqué.
          </span>
        </header>
        <ol>
          {project.recommendations.map((recommendation, index) => (
            <li key={recommendation}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{recommendation}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TransparencyChapter({ project }: { project: Project }) {
  const records = [
    { label: "Type de projet", value: project.projectType },
    { label: "Réalisation", value: project.ownership },
    { label: "Origine et périmètre des données", value: project.datasetDisclosure },
  ];

  return (
    <section
      id="transparency"
      className="project-transparency-chapter project-anchor"
      aria-labelledby="transparency-title"
    >
      <SectionHeading
        number="06"
        eyebrow="Limites"
        title="Ce que ce travail revendique — et ne revendique pas."
        titleId="transparency-title"
        description="Origine des données, réalisation et limites matérielles restent dans le fil de lecture."
      />

      <dl className="project-transparency-record">
        {records.map((record, index) => (
          <div key={record.label}>
            <dt>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {record.label}
            </dt>
            <dd>{record.value}</dd>
          </div>
        ))}
      </dl>

      {project.limitations && project.limitations.length > 0 && (
        <div className="project-limitations">
          <p>Limites matérielles</p>
          <ul>
            {project.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function WorkClose({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  return (
    <section
      id="inspect-the-work"
      className="project-work-close project-anchor"
      aria-labelledby="inspect-the-work-title"
    >
      <SectionHeading
        number="07"
        eyebrow="Sources"
        title="Consulter le travail."
        titleId="inspect-the-work-title"
        description="Dépôt, méthodologie et livrables analytiques du projet."
      />

      {project.artifacts && (
        <ol className="project-artifact-register">
          {project.artifacts.map((artifact, index) => (
            <li key={artifact.href}>
              <a
                href={artifact.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{artifact.label}</strong>
                  <p>{artifact.description}</p>
                </div>
                <ArrowUpRight aria-hidden="true" />
                <span className="sr-only">(ouvre un nouvel onglet)</span>
              </a>
            </li>
          ))}
        </ol>
      )}

      <div className="project-work-actions">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-work-primary"
        >
          <GitHubIcon aria-hidden="true" />
          Dépôt GitHub
          <ArrowUpRight aria-hidden="true" />
        </a>
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-work-secondary"
          >
            Démo en ligne
            <ArrowUpRight aria-hidden="true" />
          </a>
        )}
        <Link href="/#projects" className="project-work-secondary">
          Tous les projets
          <ArrowLeft aria-hidden="true" />
        </Link>
      </div>

      <Link href={nextProject.href} className="project-next-case">
        <span>Projet suivant / {nextProject.featuredCategory}</span>
        <strong>{nextProject.shortTitle}</strong>
        <p>{nextProject.businessQuestion}</p>
        <ArrowRight aria-hidden="true" />
      </Link>
    </section>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const heroTitle = project.heroTitle ?? project.title;
  const nextProject = getNextProject(project);
  const caseNumber = String(project.featuredOrder).padStart(2, "0");
  const heroMetrics = project.kpis.slice(0, 3);

  return (
    <article
      className="editorial-project"
      data-project-slug={project.slug}
    >
      <header className="project-hero">
        <div className="project-hero-masthead">
          <Link href="/#projects" className="project-back-link">
            <ArrowLeft aria-hidden="true" />
            Projets
          </Link>
          <p>{project.projectType}</p>
        </div>

        <div className="project-hero-grid">
          <div className="project-hero-title">
            <ProjectMarker
              index={caseNumber}
              label={`Projet / ${project.featuredCategory}`}
            />
            <h1>{heroTitle}</h1>
            {project.heroSubtitle && <p>{project.heroSubtitle}</p>}
          </div>

          <div className="project-hero-brief">
            <p>Problème métier</p>
            <h2>{project.businessQuestion}</h2>
            <div>
              <span>Constat clé</span>
              <strong>{principalSignal(project)}</strong>
            </div>
            <a href="#kpi">
              Voir les KPI
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="project-hero-record">
          <dl>
            {heroMetrics.map((metric: ProjectKpi) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <ProjectChapterNav />

      <div className="project-publication">
        <BusinessProblem project={project} />
        <DataAndMethod project={project} />
        <KpiChapter project={project} />
        <AnalysisChapter project={project} />
        <DecisionChapter project={project} />
        <TransparencyChapter project={project} />
        <WorkClose project={project} nextProject={nextProject} />
      </div>
    </article>
  );
}
