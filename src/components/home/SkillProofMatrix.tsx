import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialMarker } from "@/components/home/EditorialMarker";
import { languages, skillsByCategory } from "@/data/skills";
import { getProjectBySlug } from "@/data/projects";

const domainEvidence = [
  {
    summary:
      "Segmenter les clients, suivre la conversion et prioriser les actions CRM.",
    projectSlugs: ["rfm-segmentation", "funnel-analysis"],
  },
  {
    summary:
      "Préparer les données, calculer les KPI et livrer un reporting exploitable.",
    projectSlugs: ["funnel-analysis", "profit-leak"],
  },
  {
    summary:
      "Fiabiliser les sources et sécuriser les indicateurs avant diffusion.",
    projectSlugs: ["renewalos", "profit-leak"],
  },
] as const;

const capabilityDomains = skillsByCategory.map((group, index) => {
  const evidence = domainEvidence[index] ?? domainEvidence[0];
  const projects = evidence.projectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project) => project !== undefined);
  const tools = [...new Set(projects.flatMap((project) => project.tools))];

  return {
    ...group,
    summary: evidence.summary,
    projects,
    tools,
  };
});

export function SkillProofMatrix() {
  return (
    <section
      id="skills"
      className="capability-proof"
      aria-labelledby="capability-proof-title"
    >
      <header className="capability-proof-heading">
        <EditorialMarker index="06" label="Compétences" tone="amber" />
        <h2 id="capability-proof-title">Compétences et travaux associés</h2>
        <p>
          Trois domaines de compétences, avec les projets portfolio qui les
          illustrent.
        </p>
      </header>

      <div className="capability-proof-key" aria-hidden="true">
        <span>Domaine</span>
        <span>Compétences</span>
        <span>Projets associés</span>
      </div>

      <ol className="capability-proof-index">
        {capabilityDomains.map((domain, index) => (
          <li key={domain.category}>
            <section aria-labelledby={`capability-domain-${index}`}>
              <div className="capability-proof-domain">
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 id={`capability-domain-${index}`}>{domain.category}</h3>
                  <p>{domain.summary}</p>
                </div>
              </div>

              <div className="capability-proof-capabilities">
                <p>Compétences</p>
                <ul>
                  {domain.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
                <div>
                  <span>Outils mobilisés</span>
                  <p>{domain.tools.join(" · ")}</p>
                </div>
              </div>

              <div className="capability-proof-evidence">
                <p>Projets portfolio</p>
                <ul>
                  {domain.projects.map((project) => (
                    <li key={project.slug}>
                      <Link href={project.href}>
                        <span>{project.businessQuestion}</span>
                        <strong>{project.shortTitle}</strong>
                        <small>{project.projectType}</small>
                        <ArrowUpRight aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </li>
        ))}
      </ol>

      <div className="capability-languages">
        <p>Langues</p>
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
