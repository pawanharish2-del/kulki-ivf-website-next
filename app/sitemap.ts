import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { treatmentsData } from "@/lib/data/treatmentsData";
import { infertilityData } from "@/lib/data/infertilityData";
import { locationsData } from "@/lib/data/locationsData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kulkiivfgroup.com";
  const now = new Date();

  // Static core routes
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/gallery",
    "/patient-info",
    "/infertility",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: (route === "" || route === "/blog" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Treatments
  const treatmentRoutes = Object.keys(treatmentsData).map((slug) => ({
    url: `${baseUrl}/treatments/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Infertility subpages
  const infertilityRoutes = Object.keys(infertilityData)
    .filter((slug) => slug !== "overview")
    .map((slug) => ({
      url: `${baseUrl}/infertility/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

  // Locations
  const locationRoutes = Object.keys(locationsData).map((slug) => ({
    url: `${baseUrl}/locations/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Dynamic Blog Posts from DB
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error("Sitemap DB fetch failed:", err);
  }

  return [...staticRoutes, ...treatmentRoutes, ...infertilityRoutes, ...locationRoutes, ...blogRoutes];
}
