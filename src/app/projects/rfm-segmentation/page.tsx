import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/project/ProjectDetail";

export const metadata = {
  title: "Customer Segmentation RFM | Zakaria Maachou",
  description:
    "RFM customer segmentation — VIP, Loyal, At-risk and Lost segments with CRM prioritization.",
};

export default function RfmSegmentationPage() {
  const project = getProjectBySlug("rfm-segmentation");
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
