import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // 1. Seed Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@kulkiivf.com" },
    update: { password: hashedPassword },
    create: {
      email: "admin@kulkiivf.com",
      name: "Dr. Asha Sushawat (Director)",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log(`Admin user seeded: ${admin.email}`);

  // 2. Seed Blog Posts from legacy html files
  const blogsDir = path.join(process.cwd(), "legacy_source", "blogs");
  if (fs.existsSync(blogsDir)) {
    const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith(".html"));
    console.log(`Found ${files.length} legacy blog HTML files to seed.`);

    for (const file of files) {
      const filePath = path.join(blogsDir, file);
      const html = fs.readFileSync(filePath, "utf-8");
      const $ = cheerio.load(html);

      const slug = file.replace(".html", "");
      
      // Extract title
      let title = $("h1.page-hero-title").text().trim();
      if (!title) {
        title = $("title").text().trim().split("|")[0].trim();
      }
      if (!title) {
        title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      }

      // Extract SEO meta
      const metaDescription = $('meta[name="description"]').attr("content") || "";
      const metaKeywords = $('meta[name="keywords"]').attr("content") || "IVF Jaipur, Kulki IVF, fertility clinic";

      // Extract Excerpt
      let excerpt = $("p").first().text().trim();
      if (metaDescription && metaDescription.length > 20) {
        excerpt = metaDescription;
      }

      // Extract content body
      let contentHtml = "";
      const contentCol = $(".blog-grid > div:first-child");
      if (contentCol.length > 0) {
        // Clean up relative URLs in content
        contentCol.find("a").each((_, el) => {
          const href = $(el).attr("href");
          if (href) {
            let cleanHref = href.replace(/\.\.\/pages\/treatments\//g, "/treatments/")
                                .replace(/\.\.\/pages\/infertility\//g, "/infertility/")
                                .replace(/\.\.\/pages\/about\.html/g, "/about")
                                .replace(/\.\.\/pages\/contact\.html/g, "/contact")
                                .replace(/\.\.\/pages\/blog\.html/g, "/blog")
                                .replace(/\.html/g, "");
            $(el).attr("href", cleanHref);
          }
        });
        contentCol.find("img").each((_, el) => {
          const src = $(el).attr("src");
          if (src) {
            $(el).attr("src", src.replace(/\.\.\/assets\//g, "/assets/"));
          }
        });
        contentHtml = contentCol.html() || "";
      } else {
        contentHtml = $("body").html() || `<p>${metaDescription}</p>`;
      }

      // Extract Featured Image
      let featuredImage = "/assets/images/banner.jpg";
      const ogImage = $('meta[property="og:image"]').attr("content");
      if (ogImage && ogImage.includes("assets")) {
        const parts = ogImage.split("assets/");
        if (parts[1]) featuredImage = `/assets/${parts[1]}`;
      } else {
        const firstImg = $(".blog-grid img").first().attr("src");
        if (firstImg) {
          featuredImage = firstImg.replace(/\.\.\/assets\//g, "/assets/");
        }
      }

      // Determine category from keywords or title
      let category = "Fertility";
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes("ivf")) category = "IVF Treatment";
      else if (lowerTitle.includes("icsi")) category = "ICSI";
      else if (lowerTitle.includes("iui")) category = "IUI Treatment";
      else if (lowerTitle.includes("egg")) category = "Egg Freezing";
      else if (lowerTitle.includes("male") || lowerTitle.includes("sperm")) category = "Male Infertility";

      await prisma.blogPost.upsert({
        where: { slug },
        update: {
          title,
          content: contentHtml,
          excerpt: excerpt.substring(0, 300),
          featuredImage,
          metaTitle: title,
          metaDescription: metaDescription.substring(0, 300),
          metaKeywords,
          category,
        },
        create: {
          title,
          slug,
          content: contentHtml,
          excerpt: excerpt.substring(0, 300),
          featuredImage,
          metaTitle: title,
          metaDescription: metaDescription.substring(0, 300),
          metaKeywords,
          author: "Dr. Asha Sushawat",
          category,
          tags: "IVF, Fertility, Jaipur, Kulki IVF",
          status: "PUBLISHED",
        },
      });
      console.log(`Seeded blog post: ${slug} (${category})`);
    }
  } else {
    console.warn("Legacy blogs directory not found. Skipping blog seed.");
  }

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
