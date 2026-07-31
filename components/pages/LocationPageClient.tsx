"use client";

import React, { useState } from "react";
import Link from "next/link";
import GeoTakeaways from "@/components/seo/GeoTakeaways";

interface LocationPageProps {
  data: {
    slug: string;
    title: string;
    heroTitle: string;
    heroImg?: string;
    mainTitle: string;
    geoSummary: string;
    locationContent: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  };
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

export default function LocationPageClient({ data }: LocationPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const cityName = data.slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // Clean faqs
  const cleanedFaqs = (data.faqs || []).map((f) => {
    const lines = f.answer.split("\n").map((l) => l.trim()).filter(Boolean);
    const uniqueLines = Array.from(new Set(lines)).join(" ");
    return {
      question: f.question,
      answer: uniqueLines || f.answer,
    };
  });

  return (
    <>
      {/* Hero Section */}
      <section className="hero" style={{ minHeight: "60vh" }}>
        <div className="hero-content">
          <h1 className="hero-title rv active" dangerouslySetInnerHTML={{ __html: cleanHtml(data.heroTitle || `Best IVF Center in <span class="text-rose">${cityName}</span>`) }} />
          <p className="tagline rv d-1 active" style={{ marginBottom: "16px" }}>
            &quot;Your Journey to Parenthood Starts Here&quot;
          </p>
          <p className="hero-desc rv d-2 active" dangerouslySetInnerHTML={{ __html: cleanHtml(data.geoSummary || `Are you looking for the top fertility clinic or the best IVF doctor in ${cityName}? Kulki IVF offers advanced, personalized fertility treatments to help you achieve your dream of starting a family.`) }} />
          <div className="hero-cta-group rv d-3 active">
            <Link href="/contact" className="btn btn-primary">
              Consult Our Experts
            </Link>
            <a href="tel:9799979532" className="btn btn-dark">
              9799979532
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src={data.heroImg || "https://cdn.pixabay.com/photo/2016/11/19/14/28/baby-1839565_1280.jpg"} alt={`Best IVF Center in ${cityName} - Newborn Baby`} />
        </div>
      </section>

      {/* Main Content Article */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="rv active" style={{ maxWidth: "1000px", margin: "0 auto", lineHeight: 1.8, fontSize: "1.05rem" }}>
            <h2 style={{ fontSize: "2.5rem", color: "var(--plum)", marginBottom: "24px" }}>
              Welcome to the Best IVF Hospital in {cityName}
            </h2>

            {data.locationContent ? (
              <div dangerouslySetInnerHTML={{ __html: cleanHtml(data.locationContent) }} />
            ) : (
              <p>
                If you are struggling with infertility and seeking the <strong>best IVF center in {cityName}</strong>, Kulki IVF Fertility & ART Centre provides world-class fertility care right at your doorstep. We understand that the journey to parenthood can be emotionally and physically challenging. That is why our dedicated team of renowned fertility specialists, experienced embryologists, and compassionate nursing staff work tirelessly to offer the most effective and affordable IVF treatments.
              </p>
            )}

            {/* FAQ Section */}
            {cleanedFaqs.length > 0 && (
              <div className="faq-section rv active" style={{ marginTop: "60px" }}>
                <h2>Frequently Asked Questions ({cityName})</h2>
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

            {/* Schedule Card */}
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
              <h3 style={{ marginBottom: "16px", fontSize: "1.8rem" }}>Schedule Your Appointment</h3>
              <p style={{ color: "var(--mid)", fontSize: "1.1rem" }}>
                Visit Kulki{" "}
                <Link href="/treatments/ivf" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                  IVF
                </Link>{" "}
                Fertility & ART Centre to learn more about our services in {cityName}.
              </p>
              <div style={{ marginTop: "24px", fontSize: "1.05rem" }}>
                <p style={{ marginBottom: "8px" }}>
                  <i className="fa-solid fa-location-dot text-rose"></i> <strong>Address:</strong> Plot No 184, Nandpuri-B, Pratap Nagar, JAIPUR 302033
                </p>
                <p>
                  <i className="fa-solid fa-phone text-rose"></i> <strong>Phone:</strong> 9799979532, 9799979533
                </p>
              </div>
            </div>

            <GeoTakeaways
              title={`Kulki IVF Care for ${cityName} Patients - At a Glance`}
              takeaways={[
                `Dedicated coordination and consultation scheduling for patients traveling from ${cityName} to Jaipur.`,
                "Advanced cleanroom embryology labs providing the highest implantation success rates in Rajasthan.",
                "Complete financial guidance with transparent IVF cost breakdowns and 0% EMI options.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding bg-ink text-center">
        <div className="container rv active">
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "12px", width: "100%" }}>
            Ready to Start Your Journey?
          </h2>
          <p className="section-subtitle" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto", maxWidth: "650px", marginBottom: "32px" }}>
            Book a consultation with our experts today and take the first step towards parenthood.
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
