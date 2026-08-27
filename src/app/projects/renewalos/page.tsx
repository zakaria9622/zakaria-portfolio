import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { buildProjectStructuredData } from "@/lib/projectStructuredData";

const project = getProjectBySlug("renewalos");
if (!project) notFound();

const title = "RenewalOS";
const description =
  "Contrôle qualité des données de revenu B2B avant reporting, puis priorisation Customer Success sous contrainte de capacité. Projet portfolio SQL, dbt, DuckDB, Python et Streamlit.";
const ogDescription = "Qualité des données, réconciliation du revenu et priorisation Customer Success.";
const image = "/og/renewalos.png";

export const metadata: Metadata = {
  title: "RenewalOS — Fiabilité du revenu B2B & priorisation Customer Success | Zakaria Maachou",
  description,
  alternates: {
    canonical: project.href,
  },
  openGraph: {
    title,
    description: ogDescription,
    url: "/projects/renewalos",
    siteName: "Portfolio Zakaria Maachou",
    type: "article",
    locale: "fr_FR",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: `${title} — ${ogDescription}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: ogDescription,
    images: [
      {
        url: image,
        alt: `${title} — ${ogDescription}`,
      },
    ],
  },
};

export default function RenewalOSPage() {
  const project = getProjectBySlug("renewalos");
  if (!project) notFound();
  const structuredData = buildProjectStructuredData(project);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ProjectDetail project={project} />
    </>
  );
}
