import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogFormClient from "@/components/admin/BlogFormClient";

interface Props {
  params: {
    id: string;
  };
}

export const revalidate = 0; // Dynamic fetching in admin edit

export default async function EditBlogPage({ params }: Props) {
  const id = params.id;
  if (!id) notFound();

  let post = null;
  try {
    post = await prisma.blogPost.findUnique({
      where: { id: id as any },
    });
  } catch (err) {
    console.error("Failed to fetch post for edit:", err);
  }

  if (!post) {
    notFound();
  }

  const postData = {
    id: post.id as any,
    title: post.title,
    slug: post.slug,
    content: post.content,
    featuredImage: post.featuredImage || "/assets/images/blog1.webp",
    metaTitle: post.metaTitle || "",
    metaDescription: post.metaDescription || "",
    isPublished: post.isPublished,
  };

  return <BlogFormClient initialData={postData} isEdit={true} />;
}
