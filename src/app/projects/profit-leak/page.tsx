import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/project/ProjectDetail";

export const metadata = {
  title: "E-commerce Profit Leak Analysis | Zakaria Maachou",
  description:
    "Profitability analysis — margin leak in Electronics/EU, discount impact and category-region diagnostics.",
};

export default function ProfitLeakPage() {
  const project = getProjectBySlug("profit-leak");
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
