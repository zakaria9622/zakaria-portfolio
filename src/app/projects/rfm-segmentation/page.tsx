import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { buildProjectStructuredData } from "@/lib/projectStructuredData";

const project = getProjectBySlug("rfm-segmentation");
if (!project) notFound();

const title = "Segmentation RFM & recommandations CRM";
const description =
  "Segmentation de 5 000 clients en VIP, Loyaux, À risque et Perdus, avec des actions de rétention et de réactivation par segment. Projet portfolio Python et pandas.";
const ogDescription = "Segmentation client et priorisation des actions CRM.";
const image = "/og/rfm-segmentation.png";

export const metadata: Metadata = {
  title: "Segmentation RFM & recommandations CRM | Zakaria Maachou",
  description,
  alternates: {
    canonical: project.href,
  },
  openGraph: {
    title,
    description: ogDescription,
    url: "/projects/rfm-segmentation",
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

export default function RfmSegmentationPage() {
  const project = getProjectBySlug("rfm-segmentation");
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
