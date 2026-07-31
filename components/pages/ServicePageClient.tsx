"use client";

import React, { useState } from "react";
import Link from "next/link";
import GeoTakeaways from "@/components/seo/GeoTakeaways";

interface Block {
  image: string;
  tag: string;
  title: string;
  text: string;
  checklist: string[];
}

interface ServicePageProps {
  data: {
    slug: string;
    title: string;
    heroTitle: string;
    heroImg: string;
    takeaways: string[];
    mainTitle: string;
    geoSummary: string;
    blocks: Block[];
    faqs: {
      question: string;
      answer: string;
    }[];
    bottomCard?: {
      title: string;
      text: string;
      image: string;
      buttonText: string;
      buttonLink: string;
    };
    contactCard?: {
      title: string;
      subtitle: string;
      address: string;
      phone: string;
    };
    ctaBanner?: {
      title: string;
      subtitle: string;
      buttonText: string;
    };
  };
  breadcrumbCategory: string;
  breadcrumbLink: string;
}

function cleanHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/href=["'](\.\.\/)*infertility\/([^"'.]+)(\.html)?["']/g, 'href="/infertility/$2"')
    .replace(/href=["'](\.\.\/)*treatments\/([^"'.]+)(\.html)?["']/g, 'href="/treatments/$2"')
    .replace(/href=["']\.\/([^"'.]+)(\.html)?["']/g, 'href="/treatments/$1"')
    .replace(/href=["'](\.\.\/)+contact(\.html)?["']/g, 'href="/contact"')
    .replace(/href=["'](\.\.\/)+about(\.html)?["']/g, 'href="/about"');
}

export default function ServicePageClient({ data, breadcrumbCategory, breadcrumbLink }: ServicePageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Clean up duplicate question strings if extraction grabbed question twice
  const cleanedFaqs = (data.faqs || []).map((f) => {
    // sometimes answer has duplicated lines
    const lines = f.answer.split("\n").map((l) => l.trim()).filter(Boolean);
    const uniqueLines = Array.from(new Set(lines)).join(" ");
    return {
      question: f.question,
      answer: uniqueLines || f.answer,
    };
  });

  return (
    <>
      {/* Page Hero */}
      <section
        className="page-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.45), rgba(254, 248, 255, 0.65)), url('${data.heroImg || "/assets/images/aboutimg.jpg"}')`,
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
            dangerouslySetInnerHTML={{ __html: cleanHtml(data.heroTitle) }}
          />

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
            /{" "}
            <Link href={breadcrumbLink} style={{ color: "#1a0a2e", textDecoration: "none" }}>
              {breadcrumbCategory}
            </Link>{" "}
            / <span style={{ textTransform: "capitalize" }}>{data.slug.replace(/-/g, " ")}</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="container">
          {/* GEO / AEO Key Takeaways Box */}
          {data.takeaways && data.takeaways.length > 0 && (
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
                {data.takeaways.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: "8px" }} dangerouslySetInnerHTML={{ __html: cleanHtml(item) }} />
                ))}
              </ul>
            </div>
          )}

          <h1 className="section-title text-center rv active" style={{ marginBottom: "24px" }} dangerouslySetInnerHTML={{ __html: cleanHtml(data.mainTitle) }} />

          {data.geoSummary && (
            <div className="geo-summary rv active">
              <h3>Key Takeaway</h3>
              <p dangerouslySetInnerHTML={{ __html: cleanHtml(data.geoSummary) }} />
            </div>
          )}

          {/* Blocks */}
          {data.blocks &&
            data.blocks.map((block, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={idx}
                  className="grid-2"
                  style={{
                    alignItems: "center",
                    marginBottom: "80px",
                    gap: "40px",
                    direction: isEven ? "rtl" : "ltr",
                  }}
                >
                  <div className={`rv ${isEven ? "d-2" : "d-1"} active`} style={{ direction: "ltr" }}>
                    <img
                      src={block.image || "/assets/images/galleryimage10.jpeg"}
                      alt={block.title || "Clinic service"}
                      style={{ borderRadius: "20px", boxShadow: "var(--shadow-md)", width: "100%", aspectRatio: "4/3", objectFit: "cover" }}
                    />
                  </div>
                  <div className={`rv ${isEven ? "d-1" : "d-2"} active`} style={{ direction: "ltr" }}>
                    {block.tag && <span className="section-tag">{block.tag}</span>}
                    <h3 className="text-ink" style={{ marginBottom: "24px" }}>
                      {block.title}
                    </h3>
                    <p style={{ color: "var(--text)", fontSize: "1.05rem" }} dangerouslySetInnerHTML={{ __html: cleanHtml(block.text) }} />
                    {block.checklist && block.checklist.length > 0 && (
                      <ul className="checklist" style={{ gridTemplateColumns: "1fr", marginTop: "24px" }}>
                        {block.checklist.map((li, lIdx) => (
                          <li key={lIdx} dangerouslySetInnerHTML={{ __html: cleanHtml(li) }} />
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}

          {/* FAQ Section */}
          {cleanedFaqs.length > 0 && (
            <div className="faq-section rv active">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-accordion">
                {cleanedFaqs.map((faq, idx) => (
                  <div className={`faq-item ${activeFaq === idx ? "active" : ""}`} key={idx}>
                    <button className="faq-question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                      {faq.question}
                      <i className="fa-solid fa-chevron-down"></i>
                    </button>
                    <div className="faq-answer" style={{ display: activeFaq === idx ? "block" : "none" }}>
                      <p style={{ paddingTop: "16px" }}>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Card */}
          <div
            className="rv active"
            style={{
              background: "linear-gradient(135deg, var(--mist) 0%, var(--blush) 100%)",
              borderRadius: "24px",
              padding: "60px",
              marginTop: "80px",
              marginBottom: "60px",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div className="grid-2" style={{ alignItems: "center", gap: "40px" }}>
              <div>
                <h3 className="text-ink" style={{ marginBottom: "24px", fontSize: "2rem" }} dangerouslySetInnerHTML={{ __html: cleanHtml(data.bottomCard?.title || "Start Your Journey Today") }} />
                <p style={{ fontSize: "1.1rem", color: "var(--text)", marginBottom: "32px" }} dangerouslySetInnerHTML={{ __html: cleanHtml(data.bottomCard?.text || "At Kulki IVF Fertility & ART Centre, we combine expertise, compassion, and cutting-edge technology to give you the highest chance of success.") }} />
                <Link href={data.bottomCard?.buttonLink || "/contact"} className="btn btn-primary">
                  {data.bottomCard?.buttonText || "Contact Us Today"}
                </Link>
              </div>
              <div>
                <img
                  src={data.bottomCard?.image || "/assets/images/hero_family.png"}
                  alt={data.bottomCard?.title || "Start Your Journey Today"}
                  style={{ borderRadius: "16px", boxShadow: "var(--shadow-sm)", width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div
            className="contact-card rv active"
            style={{
              marginTop: "60px",
              padding: "40px",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              textAlign: "center",
              background: "var(--white)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <i className="fa-solid fa-calendar-check text-rose" style={{ fontSize: "3rem", marginBottom: "24px" }}></i>
            <h3 style={{ marginBottom: "16px", fontSize: "1.8rem" }} dangerouslySetInnerHTML={{ __html: cleanHtml(data.contactCard?.title || "Schedule Your Appointment") }} />
            <p style={{ color: "var(--mid)", fontSize: "1.1rem" }} dangerouslySetInnerHTML={{ __html: cleanHtml(data.contactCard?.subtitle || 'Visit Kulki <a href="/treatments/ivf" style="color: var(--plum); font-weight: 600; text-decoration: underline;" class="auto-linked">IVF</a> Fertility & ART Centre to learn more about our services.') }} />
            <div style={{ marginTop: "24px", fontSize: "1.05rem" }}>
              <p style={{ marginBottom: "8px" }} dangerouslySetInnerHTML={{ __html: cleanHtml(data.contactCard?.address || '<i class="fa-solid fa-location-dot text-rose"></i> <strong>Address:</strong> Plot No 184, Nandpuri-B, Pratap Nagar, JAIPUR 302033') }} />
              <p dangerouslySetInnerHTML={{ __html: cleanHtml(data.contactCard?.phone || '<i class="fa-solid fa-phone text-rose"></i> <strong>Phone:</strong> 9799979532, 9799979533') }} />
            </div>
          </div>

          <GeoTakeaways
            title={`${data.slug.replace(/-/g, " ")} - Kulki IVF Clinical Overview`}
            takeaways={[
              "Customized treatment protocols tailored by senior reproductive specialists Dr. Asha Sushawat and Dr. Aarti Soni.",
              "Strict quality controls in an international standard embryology lab ensuring optimal success rates.",
              "Complete financial transparency with zero hidden charges or unexpected laboratory fees.",
            ]}
          />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding bg-ink text-center">
        <div className="container rv active">
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "12px", width: "100%" }} dangerouslySetInnerHTML={{ __html: cleanHtml(data.ctaBanner?.title || "Ready to Start Your Journey?") }} />
          <p className="section-subtitle" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto", maxWidth: "650px", marginBottom: "32px" }} dangerouslySetInnerHTML={{ __html: cleanHtml(data.ctaBanner?.subtitle || "Book a consultation with our experts today and take the first step towards parenthood.") }} />
          <div style={{ textAlign: "center", width: "100%" }}>
            <button
              className="btn btn-primary"
              onClick={() => document.querySelector(".modal-overlay")?.classList.add("active")}
            >
              {data.ctaBanner?.buttonText || "Book Appointment"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
