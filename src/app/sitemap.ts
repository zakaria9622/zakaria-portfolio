import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const baseUrl = "https://www.zakariamaachou.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${baseUrl}${project.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
