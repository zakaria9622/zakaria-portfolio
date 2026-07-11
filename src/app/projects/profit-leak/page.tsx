import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/project/ProjectDetail";

const project = getProjectBySlug("profit-leak");
if (!project) notFound();

const title = "Profit Leak Analysis";
const description = "E-commerce margin, discount and loss diagnostics";
const image = "/og/profit-leak.png";

export const metadata: Metadata = {
  title: "E-commerce Profit Leak Analysis | Zakaria Maachou",
  description,
  alternates: {
    canonical: project.href,
  },
  openGraph: {
    title,
    description,
    url: "/projects/profit-leak",
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

export default function ProfitLeakPage() {
  const project = getProjectBySlug("profit-leak");
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
