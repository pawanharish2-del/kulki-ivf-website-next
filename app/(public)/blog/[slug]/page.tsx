import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogPostClient from "@/components/pages/BlogPostClient";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch (err) {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    });
    if (!post) return {};

    return {
      title: post.metaTitle || `${post.title} | Kulki IVF Jaipur`,
      description: post.metaDescription || post.excerpt || `Read ${post.title} on the Kulki IVF Fertility & ART Centre blog.`,
      keywords: post.metaKeywords || `${post.slug}, IVF clinic Jaipur, fertility research Rajasthan`,
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt || undefined,
        type: "article",
        url: `https://kulkiivfgroup.com/blog/${post.slug}`,
        images: [post.featuredImage || "/assets/images/logo.jpg"],
        publishedTime: post.createdAt.toISOString(),
        authors: [post.author],
      },
      twitter: {
        card: "summary_large_image",
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt || undefined,
        images: [post.featuredImage || "/assets/images/logo.jpg"],
      },
      alternates: {
        canonical: `https://kulkiivfgroup.com/blog/${post.slug}`,
      },
    };
  } catch (err) {
    return {};
  }
}

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function BlogPostPage({ params }: Props) {
  let post = null;
  try {
    post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    });
  } catch (err) {
    console.error("Failed to fetch blog post:", err);
  }

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  const formattedPost = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage,
    author: post.author,
    category: post.category,
    createdAt: post.createdAt.toISOString(),
  };

  return <BlogPostClient post={formattedPost} />;
}
