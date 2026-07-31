"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import GeoTakeaways from "@/components/seo/GeoTakeaways";

interface Post {
  id: any;
  title: string;
  slug: string;
  content: string;
  featuredImage?: string | null;
  createdAt: string;
}

interface BlogPostProps {
  post: Post;
}

function cleanHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/href=["'](\.\.\/)*pages\/infertility\/([^"'.]+)(\.html)?["']/g, 'href="/infertility/$2"')
    .replace(/href=["'](\.\.\/)*pages\/infertility(\.html)?["']/g, 'href="/infertility"')
    .replace(/href=["'](\.\.\/)*pages\/treatments\/([^"'.]+)(\.html)?["']/g, 'href="/treatments/$2"')
    .replace(/href=["'](\.\.\/)*pages\/about(\.html)?["']/g, 'href="/about"')
    .replace(/href=["'](\.\.\/)*pages\/contact(\.html)?["']/g, 'href="/contact"')
    .replace(/href=["'](\.\.\/)*pages\/gallery(\.html)?["']/g, 'href="/gallery"')
    .replace(/href=["'](\.\.\/)*pages\/patient-info(\.html)?["']/g, 'href="/patient-info"')
    .replace(/href=["'](\.\.\/)*pages\/blog(\.html)?["']/g, 'href="/blog"')
    .replace(/href=["'](\.\.\/)*blogs\/([^"'.]+)(\.html)?["']/g, 'href="/blog/$2"')
    .replace(/href=["']\.\/treatments\/([^"'.]+)(\.html)?["']/g, 'href="/treatments/$1"')
    .replace(/href=["']\.\/infertility\/([^"'.]+)(\.html)?["']/g, 'href="/infertility/$1"')
    .replace(/href=["'](\.\.\/)+contact(\.html)?["']/g, 'href="/contact"')
    .replace(/href=["'](\.\.\/)+about(\.html)?["']/g, 'href="/about"');
}

export default function BlogPostClient({ post }: BlogPostProps) {
  useEffect(() => {
    // Add smooth scrolling to TOC links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  }, []);

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Hero Section */}
      <section
        className="page-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(26,10,46,0.8), rgba(26,10,46,0.9)), url('${post.featuredImage || "/assets/images/tech_1.png"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "120px 0",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <span className="section-tag text-gold" style={{ color: "var(--gold)", letterSpacing: "2px", display: "inline-block", marginBottom: "12px" }}>
            E-E-A-T CERTIFIED HEALTH INSIGHTS • FERTILITY
          </span>
          <h1 className="page-hero-title rv active" style={{ maxWidth: "900px", margin: "0 auto 24px", fontSize: "2.8rem", lineHeight: 1.2, color: "#fff" }}>
            {post.title}
          </h1>
          <div className="breadcrumb rv d-1 active" style={{ color: "var(--mist)", fontSize: "0.95rem" }}>
            <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
              Home
            </Link>{" "}
            /{" "}
            <Link href="/blog" style={{ color: "#fff", textDecoration: "none" }}>
              Blog
            </Link>{" "}
            / <span>Article</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", marginTop: "16px" }}>
            By <strong style={{ color: "#fff" }}>Dr. Asha Sushawat</strong> • Published on {formattedDate}
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="section-padding bg-white">
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Article Content */}
          <article
            className="blog-article-content rv active"
            style={{
              lineHeight: 1.8,
              fontSize: "1.1rem",
              color: "var(--text)",
            }}
            dangerouslySetInnerHTML={{ __html: cleanHtml(post.content) }}
          />

          {/* Author / Clinic Review Box */}
          <div
            style={{
              background: "var(--mist)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "32px",
              marginTop: "60px",
              display: "flex",
              gap: "24px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <img
              src="/assets/images/Dr.AshaSushawat.jpg"
              alt="Dr. Asha Sushawat"
              style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--plum)" }}
            />
            <div style={{ flex: 1, minWidth: "250px" }}>
              <h4 style={{ margin: "0 0 8px 0", color: "var(--ink)", fontSize: "1.2rem" }}>Medically Reviewed by Dr. Asha Sushawat</h4>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--mid)", lineHeight: 1.6 }}>
                Senior IVF Consultant & Reproductive Endocrinologist at Kulki IVF Jaipur. With over 15 years of clinical excellence in assisted reproductive technologies, Dr. Sushawat is dedicated to evidence-based fertility solutions.
              </p>
            </div>
          </div>

          <GeoTakeaways
            title={`${post.title} - Clinical Takeaways`}
            takeaways={[
              "All medical protocols described are performed under strict Class 10,000 cleanroom laboratory standards at Kulki IVF Jaipur.",
              "For individualized diagnosis and customized stimulation cycles, patients should schedule an in-person consultation with our senior fertility specialists.",
              "Transparent treatment packages and financial EMI assistance are available for all Rajasthan patients.",
            ]}
          />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding bg-ink text-center">
        <div className="container rv active">
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "12px", width: "100%" }}>
            Have Questions About This Treatment?
          </h2>
          <p className="section-subtitle" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto", maxWidth: "650px", marginBottom: "32px" }}>
            Consult directly with our fertility specialists in Jaipur and get tailored medical guidance.
          </p>
          <div style={{ textAlign: "center", width: "100%" }}>
            <button
              className="btn btn-primary"
              onClick={() => document.querySelector(".modal-overlay")?.classList.add("active")}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
