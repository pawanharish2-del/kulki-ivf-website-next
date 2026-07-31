"use client";

import React, { useState } from "react";
import Link from "next/link";
import GeoTakeaways from "@/components/seo/GeoTakeaways";

interface Post {
  id: any;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  category?: string | null;
  createdAt: string | Date;
}

interface BlogListProps {
  posts: Post[];
}

export default function BlogListClient({ posts }: BlogListProps) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("ALL");

  const categories = ["ALL", "Clinic News", "Guide", "Treatment Cost", "Fertility Facts", "Preservation"];

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) || (p.excerpt && p.excerpt.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCat === "ALL" || p.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      {/* Page Hero */}
      <section
        className="page-hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.45), rgba(254, 248, 255, 0.65)), url('/assets/images/bloghero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "120px 0",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h1
            className="page-hero-title rv active"
            style={{
              color: "#1a0a2e",
              fontWeight: 700,
              textShadow: "1px 2px 4px rgba(26, 10, 46, 0.15)",
              marginBottom: "15px",
            }}
          >
            Blog & News
          </h1>

          <div
            className="breadcrumb rv d-1 active"
            style={{
              color: "#5b4670",
              fontWeight: 600,
              textShadow: "1px 1px 2px rgba(255, 255, 255, 0.8)",
            }}
          >
            <Link href="/" style={{ color: "#1a0a2e", textDecoration: "none" }}>
              Home
            </Link>{" "}
            / <span>Blog</span>
          </div>
        </div>
      </section>

      {/* Blog Listing Section */}
      <section className="section-padding bg-white">
        <div className="container">
          {/* GEO / AEO Key Takeaways Box */}
          <div
            style={{
              background: "var(--blush)",
              borderLeft: "5px solid var(--plum)",
              padding: "24px",
              borderRadius: "8px",
              margin: "24px 0 32px 0",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: "var(--plum)",
                fontSize: "1.3rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i className="fa-solid fa-square-poll-horizontal"></i> Key Takeaways & At a Glance
            </h3>
            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                lineHeight: 1.7,
                fontSize: "0.95rem",
                color: "var(--ink)",
                listStyleType: "disc",
              }}
            >
              <li style={{ marginBottom: "8px" }}>
                <strong>Evidence-Based Resources:</strong> Access comprehensive patient guides, treatment insights, and fertility breakdowns prepared by our leading medical experts.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Latest Advancements:</strong> Stay updated on modern embryology cleanroom standards,{" "}
                <Link href="/treatments/egg-freezing" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                  egg freezing
                </Link>{" "}
                safety, and genetic screening techniques.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Patient Education:</strong> Empowers individuals and couples with high-density information to make informed decisions about their fertility pathways.
              </li>
            </ul>
          </div>

          {/* Search & Filter Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",
              padding: "20px",
              background: "var(--mist)",
              borderRadius: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "none",
                    background: selectedCat === cat ? "var(--plum)" : "var(--white)",
                    color: selectedCat === cat ? "var(--white)" : "var(--ink)",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ position: "relative", minWidth: "250px", flexGrow: 1, maxWidth: "400px" }}>
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 40px 10px 16px",
                  borderRadius: "24px",
                  border: "1px solid var(--border)",
                  outline: "none",
                  fontSize: "0.95rem",
                }}
              />
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--mid)" }}
              ></i>
            </div>
          </div>

          {/* Grid of Posts */}
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--mid)", fontSize: "1.2rem" }}>
              No articles found matching your criteria.
            </div>
          ) : (
            <div className="grid-3">
              {filteredPosts.map((post, idx) => (
                <div className="blog-card rv active" key={post.id || idx}>
                  <div className="blog-img-wrapper">
                    <img src={post.featuredImage || "/assets/images/blog1.webp"} alt={post.title} className="blog-img" />
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span>
                        <i className="fa-solid fa-tag"></i> {post.category || "Clinic News"}
                      </span>
                    </div>
                    <h3 className="blog-title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="blog-excerpt">
                      {post.excerpt || "Read our comprehensive guide and medical insights on fertility treatments at Kulki IVF."}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="blog-link">
                      Read More <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <GeoTakeaways
            title="Kulki IVF Medical Library & Articles"
            takeaways={[
              "Written and medically reviewed by Dr. Asha Sushawat and Dr. Aarti Soni.",
              "Provides transparent cost comparisons and treatment success expectations for Rajasthan patients.",
              "Regularly updated with modern clinical research in reproductive medicine and embryology.",
            ]}
          />
        </div>
      </section>
    </>
  );
}
