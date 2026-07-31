import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

// Next.js build time evaluation bypass karne ke liye
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Create unique filename
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filename = `${timestamp}-${cleanName}`;

    // If Vercel Blob token is available or in production, upload to Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN || process.env.NODE_ENV === "production") {
      try {
        const blob = await put(filename, file, { access: "public" });
        return NextResponse.json({ url: blob.url, success: true });
      } catch (blobError) {
        console.error("Vercel Blob upload failed, falling back to local storage if in development:", blobError);
        if (process.env.NODE_ENV === "production" && !process.env.BLOB_READ_WRITE_TOKEN) {
          return NextResponse.json(
            { error: "Vercel Blob storage is not configured (missing BLOB_READ_WRITE_TOKEN)." },
            { status: 500 }
          );
        }
      }
    }

    // Fallback for local development when token is absent
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ url: fileUrl, success: true });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}