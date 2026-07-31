import React from "react";
import { prisma } from "@/lib/prisma";
import BlogsTableClient from "@/components/admin/BlogsTableClient";

export const revalidate = 0; // Dynamic fetching in admin

export default async function AdminBlogsPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      orderBy: { updatedAt: "desc" },
    });
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
  }

  const formattedPosts = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    featuredImage: p.featuredImage,
    author: p.author,
    category: p.category,
    status: p.status,
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <BlogsTableClient initialPosts={formattedPosts} />;
}
