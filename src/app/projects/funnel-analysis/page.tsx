import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/project/ProjectDetail";

const project = getProjectBySlug("funnel-analysis");
if (!project) notFound();

const title = "Funnel Analysis";
const description = "View -> Cart -> Purchase conversion diagnostics";
const image = "/og/funnel-analysis.png";

export const metadata: Metadata = {
  title: "E-commerce Funnel Analysis | Zakaria Maachou",
  description,
  alternates: {
    canonical: project.href,
  },
  openGraph: {
    title,
    description,
    url: "/projects/funnel-analysis",
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

export default function FunnelAnalysisPage() {
  const project = getProjectBySlug("funnel-analysis");
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
