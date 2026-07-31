import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import BlogListClient from "@/components/pages/BlogListClient";

export const metadata: Metadata = {
  title: "Blog & News | KULKI IVF Fertility & ART Centre | Jaipur",
  description:
    "Read the latest articles, guides, and clinic news from Kulki IVF Fertility & ART Centre in Jaipur. Stay informed about fertility treatments, IVF costs, and patient success stories.",
  keywords: "Kulki IVF blog, IVF cost in Jaipur, fertility articles Jaipur, PCOS IVF treatment Rajasthan",
  openGraph: {
    title: "Blog & News | KULKI IVF Fertility & ART Centre",
    description: "Read the latest articles, guides, and clinic news from Kulki IVF in Jaipur.",
    type: "website",
    url: "https://kulkiivfgroup.com/blog",
    images: ["/assets/images/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & News | KULKI IVF Fertility & ART Centre",
    description: "Read the latest articles, guides, and clinic news from Kulki IVF in Jaipur.",
    images: ["/assets/images/logo.jpg"],
  },
  alternates: {
    canonical: "https://kulkiivfgroup.com/blog",
  },
};

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function BlogListingPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err) {
    console.error("Failed to fetch blog posts from database:", err);
  }

  // Format dates for client component
  const formattedPosts = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    featuredImage: p.featuredImage,
    createdAt: p.createdAt.toISOString(),
  }));

  return <BlogListClient posts={formattedPosts} />;
}
