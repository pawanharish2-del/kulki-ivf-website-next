"use client";

import React, { useState } from "react";
import Link from "next/link";
import GeoTakeaways from "@/components/seo/GeoTakeaways";

export default function PatientInfoClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does the first consultation take?",
      answer: "Your initial consultation will typically last between 45 minutes to an hour to ensure all your questions and medical histories are fully addressed.",
    },
    {
      question: "Do I need a referral to visit?",
      answer: "While referrals are welcome, they are not mandatory. You can schedule an appointment directly with our clinic.",
    },
  ];

  return (
    <>
      {/* Page Hero */}
      <section
        className="page-hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.45), rgba(254, 248, 255, 0.65)), url('/assets/images/aboutimg.jpg')",
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
            Patient Information
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
            / <span>Patient Information</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
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
                <strong>Transparent Process:</strong> Detailed outline of patient pathways from baseline diagnostics, stimulation cycles, and embryology updates to embryo transfer.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Preparation Guidelines:</strong> Dietary, behavioral, and medical preparation instructions to optimize egg quality and cycle outcome.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Support Services:</strong> Emotional counseling, transparent pricing breakdowns, and dedicated coordinator support throughout your treatment.
              </li>
            </ul>
          </div>

          <h1 className="section-title text-center rv active" style={{ marginBottom: "24px" }}>
            Patient Information <br />
            <em>Everything You Need to Know Before Your Visit</em>
          </h1>

          <div className="geo-summary rv active">
            <h3>Key Takeaway</h3>
            <p>
              We are committed to making your visit to Kulki{" "}
              <Link href="/treatments/ivf" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                IVF
              </Link>{" "}
              as smooth and informative as possible. This page outlines what to expect during your first consultation and the resources available to you.
            </p>
          </div>

          {/* Block 1 */}
          <div className="grid-2" style={{ alignItems: "center", marginBottom: "80px", gap: "40px" }}>
            <div className="rv d-1 active">
              <img
                src="/assets/images/homepageimg.webp"
                alt="Your Initial Consultation"
                style={{ borderRadius: "20px", boxShadow: "var(--shadow-md)", width: "100%", aspectRatio: "4/3", objectFit: "cover" }}
              />
            </div>
            <div className="rv d-2 active">
              <span className="section-tag">First Visit</span>
              <h3 className="text-ink" style={{ marginBottom: "24px" }}>
                Your Initial Consultation
              </h3>
              <p style={{ color: "var(--text)", fontSize: "1.05rem" }}>
                Your first visit is about understanding your unique medical history and family goals. We will review any previous records, conduct a physical exam if necessary, and outline the next diagnostic steps.
              </p>
              <ul className="checklist" style={{ gridTemplateColumns: "1fr", marginTop: "24px" }}>
                <li>
                  <i className="fa-solid fa-check text-rose"></i> <strong>Bring all previous medical records and test results.</strong>
                </li>
                <li>
                  <i className="fa-solid fa-check text-rose"></i> <strong>Expect a detailed discussion with the fertility specialist.</strong>
                </li>
                <li>
                  <i className="fa-solid fa-check text-rose"></i> <strong>We encourage both partners to attend if applicable.</strong>
                </li>
                <li>
                  <i className="fa-solid fa-check text-rose"></i> <strong>Time dedicated to answering all your questions.</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* Block 2 */}
          <div className="grid-2" style={{ alignItems: "center", marginBottom: "80px", gap: "40px", direction: "rtl" }}>
            <div className="rv d-2 active" style={{ direction: "ltr" }}>
              <img
                src="/assets/images/galleryimage10.jpeg"
                alt="Financial & Insurance Info"
                style={{ borderRadius: "20px", boxShadow: "var(--shadow-md)", width: "100%", aspectRatio: "4/3", objectFit: "cover" }}
              />
            </div>
            <div className="rv d-1 active" style={{ direction: "ltr" }}>
              <span className="section-tag">Resources</span>
              <h3 className="text-ink" style={{ marginBottom: "24px" }}>
                Financial & Insurance Info
              </h3>
              <p style={{ color: "var(--text)", fontSize: "1.05rem" }}>
                We believe in complete transparency. Our financial counselors will walk you through the costs of treatments, package options, and available financing plans before you begin.
              </p>
              <ul className="checklist" style={{ gridTemplateColumns: "1fr", marginTop: "24px" }}>
                <li>
                  <i className="fa-solid fa-check text-rose"></i> <strong>Clear, upfront pricing with no hidden fees.</strong>
                </li>
                <li>
                  <i className="fa-solid fa-check text-rose"></i> <strong>Assistance with insurance documentation.</strong>
                </li>
                <li>
                  <i className="fa-solid fa-check text-rose"></i> <strong>Flexible payment plans available.</strong>
                </li>
                <li>
                  <i className="fa-solid fa-check text-rose"></i> <strong>Dedicated financial coordinator for your case.</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="faq-section rv active">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-accordion">
              {faqs.map((faq, idx) => (
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
                <h3 className="text-ink" style={{ marginBottom: "24px", fontSize: "2rem" }}>
                  We Are Here To Help
                </h3>
                <p style={{ fontSize: "1.1rem", color: "var(--text)", marginBottom: "32px" }}>
                  Have questions before your appointment? Our patient care team is available to assist you with scheduling, directions, and general inquiries.
                </p>
                <Link href="/contact" className="btn btn-primary">
                  Contact Us Today
                </Link>
              </div>
              <div>
                <img
                  src="/assets/images/baby_smile.png"
                  alt="We Are Here To Help"
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
            <h3 style={{ marginBottom: "16px", fontSize: "1.8rem" }}>Schedule Your Appointment</h3>
            <p style={{ color: "var(--mid)", fontSize: "1.1rem" }}>
              Visit Kulki{" "}
              <Link href="/treatments/ivf" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                IVF
              </Link>{" "}
              Fertility & ART Centre to learn more about our services.
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
            title="Kulki IVF Patient Journey Protocol"
            takeaways={[
              "Comprehensive baseline screening including hormonal assays and transvaginal ultrasound on Day 2/3 of cycle.",
              "Detailed consultation with Dr. Asha Sushawat or Dr. Aarti Soni for tailored ovulation induction protocols.",
              "Dedicated embryology lab updates provided throughout the fertilization and blastocyst culture phase.",
            ]}
          />
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
