import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialMarker } from "@/components/home/EditorialMarker";
import { skillsByCategory } from "@/data/skills";
import { getProjectBySlug } from "@/data/projects";

const domainEvidence = [
  {
    summary:
      "Locate acquisition friction, conversion drop-off and customer priorities.",
    projectSlugs: ["funnel-analysis", "rfm-segmentation"],
  },
  {
    summary:
      "Turn source data into defined KPIs, validated models and usable reporting.",
    projectSlugs: ["renewalos", "funnel-analysis"],
  },
  {
    summary:
      "Connect commercial performance signals to profitability and account decisions.",
    projectSlugs: ["profit-leak", "renewalos"],
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
        <EditorialMarker index="06" label="Capability proof" tone="amber" />
        <h2 id="capability-proof-title">
          Business questions first. Tools in service of the answer.
        </h2>
        <p>
          A capability index grounded in independent portfolio evidence—not a
          keyword inventory.
        </p>
      </header>

      <div className="capability-proof-key" aria-hidden="true">
        <span>Domain and business use</span>
        <span>Analytical capabilities</span>
        <span>Portfolio proof</span>
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
                <p>Capabilities</p>
                <ul>
                  {domain.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
                <div>
                  <span>Relevant tools</span>
                  <p>{domain.tools.join(" · ")}</p>
                </div>
              </div>

              <div className="capability-proof-evidence">
                <p>Evidence / independent work</p>
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
    </section>
  );
}
