import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { buildProjectStructuredData } from "@/lib/projectStructuredData";

const project = getProjectBySlug("rfm-segmentation");
if (!project) notFound();

const title = "Customer Segmentation RFM";
const description = "CRM segmentation and retention recommendations";
const image = "/og/rfm-segmentation.png";

export const metadata: Metadata = {
  title: "Customer Segmentation RFM | Zakaria Maachou",
  description,
  alternates: {
    canonical: project.href,
  },
  openGraph: {
    title,
    description,
    url: "/projects/rfm-segmentation",
    siteName: "Zakaria Maachou Portfolio",
    type: "article",
    images: [
      {
        url: image,
        width: 1200,
        height: 627,
        alt: `${title} - ${description}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: image,
        alt: `${title} - ${description}`,
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
