import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.zakariamaachou.com/sitemap.xml",
    host: "https://www.zakariamaachou.com",
  };
}
