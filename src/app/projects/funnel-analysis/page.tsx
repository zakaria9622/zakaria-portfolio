import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { buildProjectStructuredData } from "@/lib/projectStructuredData";

const project = getProjectBySlug("funnel-analysis");
if (!project) notFound();

const title = "Funnel e-commerce & leviers de conversion";
const description =
  "Analyse du parcours vue → panier → achat sur 3,02 M de visiteurs pour identifier le principal point de friction avant l'achat. Projet portfolio SQL, Tableau et Python.";
const ogDescription = "Diagnostic de conversion vue → panier → achat.";
const image = "/og/funnel-analysis.png";

export const metadata: Metadata = {
  title: "Funnel e-commerce & leviers de conversion | Zakaria Maachou",
  description,
  alternates: {
    canonical: project.href,
  },
  openGraph: {
    title,
    description: ogDescription,
    url: "/projects/funnel-analysis",
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

export default function FunnelAnalysisPage() {
  const project = getProjectBySlug("funnel-analysis");
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
