import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const idOrSlug = params.id;
    // Check if 24-character hex string (MongoDB ObjectId) or numeric integer
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);
    const isNumeric = /^\d+$/.test(idOrSlug);

    let whereCondition: any = { slug: idOrSlug };
    if (isObjectId) {
      whereCondition = { id: idOrSlug };
    } else if (isNumeric) {
      // Fallback for integer ID if ever used
      whereCondition = { id: idOrSlug as any };
    }

    const post = await prisma.blogPost.findFirst({
      where: whereCondition,
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      content,
      featuredImage,
      metaTitle,
      metaDescription,
      isPublished,
    } = body;

    // Check if another post already has this slug
    if (slug) {
      const existing = await prisma.blogPost.findFirst({
        where: {
          slug,
          NOT: { id: id as any },
        },
      });
      if (existing) {
        return NextResponse.json(
          { error: "Another post with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const updated = await prisma.blogPost.update({
      where: { id: id as any },
      data: {
        title,
        slug,
        content,
        featuredImage,
        metaTitle,
        metaDescription,
        isPublished: isPublished === undefined ? true : Boolean(isPublished),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    await prisma.blogPost.delete({
      where: { id: id as any },
    });

    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
