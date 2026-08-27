import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { buildProjectStructuredData } from "@/lib/projectStructuredData";

const project = getProjectBySlug("profit-leak");
if (!project) notFound();

const title = "Rentabilité e-commerce & fuites de marge";
const description =
  "Analyse de 12 000 commandes pour localiser les fuites de marge par catégorie, région et politique de remise. Projet portfolio SQL, Tableau et Python.";
const ogDescription = "Diagnostic des fuites de marge et des leviers de rentabilité.";
const image = "/og/profit-leak.png";

export const metadata: Metadata = {
  title: "Rentabilité e-commerce & fuites de marge | Zakaria Maachou",
  description,
  alternates: {
    canonical: project.href,
  },
  openGraph: {
    title,
    description: ogDescription,
    url: "/projects/profit-leak",
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

export default function ProfitLeakPage() {
  const project = getProjectBySlug("profit-leak");
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
