import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { buildProjectStructuredData } from "@/lib/projectStructuredData";

const project = getProjectBySlug("renewalos");
if (!project) notFound();

const title = "RenewalOS";
const description = "Revenue quality, account health and CSM prioritization";
const image = "/og/renewalos.png";

export const metadata: Metadata = {
  title: "RenewalOS - Revenue Quality & Account Health | Zakaria Maachou",
  description,
  alternates: {
    canonical: project.href,
  },
  openGraph: {
    title,
    description,
    url: "/projects/renewalos",
    siteName: "Zakaria Maachou Portfolio",
    type: "article",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
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
