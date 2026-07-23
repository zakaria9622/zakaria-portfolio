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

function DecisionBrief({ project }: { project: Project }) {
  const highlightedMetrics = project.kpis
    .filter((metric) => metric.highlight)
    .slice(0, 2);

  return (
    <section
      id="decision-brief"
      className="project-decision-brief project-anchor"
      aria-labelledby="decision-brief-title"
    >
      <SectionHeading
        number="01"
        eyebrow="Executive decision brief"
        title="The decision, before the documentation."
        titleId="decision-brief-title"
        description="A concise chain from the commercial question to the recommended action."
      />

      <ol className="project-decision-chain">
        <li>
          <span>Question</span>
          <p>{project.businessQuestion}</p>
        </li>
        <li>
          <span>Observed signal</span>
          <p>{principalSignal(project)}</p>
          {highlightedMetrics.length > 0 && (
            <dl>
              {highlightedMetrics.map((metric) => (
                <div key={metric.label}>
                  <dt>{metric.label}</dt>
                  <dd>{metric.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </li>
        <li>
          <span>Interpretation</span>
          <p>{project.mainInsight}</p>
        </li>
        <li>
          <span>Recommended decision</span>
          <p>{project.recommendations[0]}</p>
        </li>
      </ol>
    </section>
  );
}

function PrimaryEvidence({ project }: { project: Project }) {
  const src = projectImages[project.slug];
  const alt = `${project.title} dashboard showing ${project.screenshotPlaceholder.toLowerCase()}`;

  return (
    <section
      id="evidence"
      className="project-evidence-chapter project-anchor"
      aria-labelledby="evidence-title"
    >
      <SectionHeading
        number="02"
        eyebrow="Primary evidence"
        title="Inspect the analytical exhibit."
        titleId="evidence-title"
        description="The dashboard is presented as reviewable evidence, with the full analytical context preserved."
      />

      <figure className="project-primary-exhibit">
        <div className="project-exhibit-register">
          <span>Exhibit 01</span>
          <p>{project.shortTitle} / primary analytical output</p>
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
            triggerLabel={`Expand exhibit: ${project.screenshotPlaceholder}`}
          />
        </div>
        <figcaption>
          <span>Figure 01</span>
          <p>{project.screenshotPlaceholder}</p>
          <small>{project.datasetDisclosure}</small>
        </figcaption>
      </figure>

      {project.supportingScreenshots?.map((screenshot, index) => (
        <figure
          key={screenshot.src}
          className="project-primary-exhibit project-supporting-exhibit"
        >
          <div className="project-exhibit-register">
            <span>Exhibit {String(index + 2).padStart(2, "0")}</span>
            <p>Supporting diagnostic view</p>
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
              triggerLabel={`Expand exhibit: ${screenshot.alt}`}
            />
          </div>
          <figcaption>
            <span>Figure {String(index + 2).padStart(2, "0")}</span>
            <p>{screenshot.caption}</p>
            <small>{project.datasetDisclosure}</small>
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
        number="03"
        eyebrow="Analysis and diagnosis"
        title="From signal to commercial meaning."
        titleId="analysis-title"
        description={project.businessProblem}
      />

      <ProjectAnalyticalSignature project={project} />

      <div className="project-finding">
        <p>Finding / interpretation</p>
        <blockquote>{project.mainInsight}</blockquote>
      </div>

      <div className="project-recommendations">
        <header>
          <p>Decision layer</p>
          <h3>Recommended business action</h3>
          <span>
            Recommendations follow the evidence in this independent case study;
            no tested uplift is implied.
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

function MethodChapter({ project }: { project: Project }) {
  return (
    <section
      id="method"
      className="project-method-chapter project-anchor"
      aria-labelledby="method-title"
    >
      <SectionHeading
        number="04"
        eyebrow="Method and quality"
        title="How the conclusion was built."
        titleId="method-title"
        description="The technical record stays inspectable without displacing the business question."
      />

      <div className="project-method-grid">
        <div>
          <p>Methodology</p>
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
          <p>{project.architecture ? "Architecture" : "Quality controls"}</p>
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
          <p>Evidence and quality controls</p>
          <ul>
            {project.evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="project-tool-register">
        <p>Tools in service of the question</p>
        <ul>
          {project.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TransparencyChapter({ project }: { project: Project }) {
  const records = [
    { label: "Project type", value: project.projectType },
    { label: "Ownership", value: project.ownership },
    { label: "Dataset origin and boundary", value: project.datasetDisclosure },
  ];

  return (
    <section
      id="transparency"
      className="project-transparency-chapter project-anchor"
      aria-labelledby="transparency-title"
    >
      <SectionHeading
        number="05"
        eyebrow="Transparency record"
        title="What this work does—and does not—claim."
        titleId="transparency-title"
        description="Dataset origin, ownership and material limitations remain part of the main narrative."
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
          <p>Material limitations</p>
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
        number="06"
        eyebrow="Evidence handoff"
        title="Inspect the work."
        titleId="inspect-the-work-title"
        description="Open the underlying repository, methodology and analytical artifacts."
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
                <span className="sr-only">(opens in a new tab)</span>
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
          GitHub repository
          <ArrowUpRight aria-hidden="true" />
        </a>
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-work-secondary"
          >
            Live demo
            <ArrowUpRight aria-hidden="true" />
          </a>
        )}
        <Link href="/#projects" className="project-work-secondary">
          All projects
          <ArrowLeft aria-hidden="true" />
        </Link>
      </div>

      <Link href={nextProject.href} className="project-next-case">
        <span>Next case / {nextProject.featuredCategory}</span>
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
            Selected projects
          </Link>
          <p>{project.projectType}</p>
        </div>

        <div className="project-hero-grid">
          <div className="project-hero-title">
            <ProjectMarker
              index={caseNumber}
              label={`Case study / ${project.featuredCategory}`}
            />
            <h1>{heroTitle}</h1>
            {project.heroSubtitle && <p>{project.heroSubtitle}</p>}
          </div>

          <div className="project-hero-brief">
            <p>Business question</p>
            <h2>{project.businessQuestion}</h2>
            <div>
              <span>Verified signal</span>
              <strong>{principalSignal(project)}</strong>
            </div>
            <a href="#evidence">
              Inspect the evidence
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
          <p>
            <span>Dataset disclosure</span>
            {project.datasetDisclosure}
          </p>
        </div>
      </header>

      <ProjectChapterNav />

      <div className="project-publication">
        <DecisionBrief project={project} />
        <PrimaryEvidence project={project} />
        <AnalysisChapter project={project} />
        <MethodChapter project={project} />
        <TransparencyChapter project={project} />
        <WorkClose project={project} nextProject={nextProject} />
      </div>
    </article>
  );
}
