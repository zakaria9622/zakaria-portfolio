import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/project/ProjectDetail";

export const metadata = {
  title: "RenewalOS — Revenue Quality & Account Health | Zakaria Maachou",
  description:
    "Synthetic B2B revenue-quality and account-health case study with DuckDB, dbt, Streamlit and OR-Tools.",
};

export default function RenewalOSPage() {
  const project = getProjectBySlug("renewalos");
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
