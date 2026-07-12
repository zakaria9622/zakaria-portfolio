import type { Project } from "@/data/projects";

const SITE_URL = "https://www.zakariamaachou.com";
const WEBSITE_ID = "https://www.zakariamaachou.com/#website";
const PERSON_ID = "https://www.zakariamaachou.com/#person";

export function buildProjectStructuredData(project: Project) {
  const canonicalUrl = new URL(project.href, SITE_URL).toString();
  const sameAs = [project.github, project.liveDemo].filter(
    (url): url is string => Boolean(url)
  );

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonicalUrl}#case-study`,
    name: project.title,
    headline: project.title,
    description: project.summary ?? project.businessProblem,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    inLanguage: "en",
    learningResourceType: "Case study",
    author: {
      "@id": PERSON_ID,
    },
    creator: {
      "@id": PERSON_ID,
    },
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    keywords: project.tools,
    about: project.businessQuestion,
    sameAs,
  };
}
