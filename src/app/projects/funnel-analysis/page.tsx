import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/project/ProjectDetail";

export const metadata = {
  title: "E-commerce Funnel Analysis | Zakaria Maachou",
  description:
    "Funnel analysis on 3M+ users — view-to-cart bottleneck diagnosis with SQL CTEs and Tableau.",
};

export default function FunnelAnalysisPage() {
  const project = getProjectBySlug("funnel-analysis");
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
