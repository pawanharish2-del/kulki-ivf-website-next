"use client";

import React from "react";
import Link from "next/link";
import GeoTakeaways from "@/components/seo/GeoTakeaways";

export default function AboutClient() {
  return (
    <>
      {/* Page Hero */}
      <section
        className="page-hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.45), rgba(254, 248, 255, 0.65)), url('/assets/images/homepageimg1.jpg')",
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
            About Us
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
            / <span>About Us</span>
          </div>
        </div>
      </section>

      {/* Our Story */}
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
                <strong>Expert Medical Leadership:</strong> Directed by veteran gynecologist Dr. Asha Sushawat with over 30 years of clinical experience in advanced reproductive medicine.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Full-Time Scientific Team:</strong> Dedicated in-house team including Fertility Specialist Dr. Aarti Soni and Senior Embryologist Dr. Ssuniti.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Ethical Practices:</strong> Committed to high success rates through evidence-based medication protocols, cleanroom culture systems, and complete cost transparency.
              </li>
            </ul>
          </div>

          <div className="about-grid">
            <div className="about-image-stack rv active">
              <img src="/assets/images/aboutsection image.jpg" alt="Clinic Team" className="about-main-img" />
              <img src="/assets/images/Our Expertise-3.jpg" alt="Clinic Interior" className="about-accent-img" />
              <div className="about-badge">10+ Years of Excellence</div>
            </div>
            <div className="about-content rv d-2 active">
              <span className="section-tag">Our Story</span>
              <h2 className="section-title">
                About{" "}
                <em>
                  Kulki{" "}
                  <Link href="/treatments/ivf" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                    IVF
                  </Link>
                </em>{" "}
                Fertility & ART Center
              </h2>
              <p>
                At Kulki{" "}
                <Link href="/treatments/ivf" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                  IVF
                </Link>{" "}
                Fertility & ART Center, we understand the challenges of infertility and the desire to become parents. Our dedicated team of fertility specialists, along with state-of-the-art technology, provides personalized care and advanced treatments to address a wide range of fertility issues. We are committed to helping you overcome infertility and fulfill your dream of parenthood.
              </p>
              <ul className="checklist">
                <li>
                  <i className="fa-solid fa-check"></i>{" "}
                  <Link href="/treatments/ivf" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                    IVF
                  </Link>
                  ,{" "}
                  <Link href="/treatments/icsi" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                    ICSI
                  </Link>{" "}
                  &{" "}
                  <Link href="/treatments/iui" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                    IUI
                  </Link>{" "}
                  Treatments
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> Egg & Sperm Freezing
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> Genetic Testing Services
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> Male Fertility & Andrology
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> Compassionate Patient Care
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> Transparent & Ethical Practice
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-blush">
        <div className="container">
          <div className="grid-2">
            <div className="feature-card rv d-1 active" style={{ backgroundColor: "var(--white)" }}>
              <div className="feature-content">
                <h3 className="feature-title text-rose">Our Vision</h3>
                <p className="feature-desc" style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                  To be the most trusted fertility centre in Rajasthan, giving every couple a real chance at parenthood through personalized care and unwavering dedication.
                </p>
              </div>
            </div>
            <div className="feature-card rv d-2 active" style={{ backgroundColor: "var(--white)" }}>
              <div className="feature-content">
                <h3 className="feature-title text-gold">Our Mission</h3>
                <p className="feature-desc" style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                  To provide advanced, ethical, and compassionate fertility care using the latest ART technologies. We aim to support couples emotionally and medically throughout their fertility journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-ink">
        <div className="container">
          <div className="section-header rv active">
            <span className="section-tag">Meet the Experts</span>
            <h2 className="section-title">
              Our <em>Team</em>
            </h2>
          </div>
          <div className="grid-3">
            <div className="team-card rv d-1 active">
              <img src="/assets/images/dr.ssuniti.jpg" alt="Dr. Ssuniti" className="team-img" />
              <div className="team-info">
                <span className="team-role">EMBRYOLOGIST</span>
                <h3 className="team-name">Dr. Ssuniti</h3>
                <p className="team-spec">Consultant Clinical Embryologist & Artificial Reproductive Technology</p>
                <p style={{ color: "var(--mid)", fontSize: "0.85rem", marginBottom: "16px" }}>kulkiivfgroup@gmail.com</p>
                <div className="team-social">
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="team-card rv d-2 active">
              <img src="/assets/images/Dr.AshaSushawat.jpg" alt="Dr. Asha Sushawat" className="team-img" />
              <div className="team-info">
                <span className="team-role">INFERTILITY SPECIALIST</span>
                <h3 className="team-name">Dr. Asha Sushawat</h3>
                <p className="team-spec">Consultant Obstetrician & Gynecologist</p>
                <p style={{ color: "var(--mid)", fontSize: "0.85rem", marginBottom: "16px" }}>kulkiivfgroup@gmail.com</p>
                <div className="team-social">
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="team-card rv d-3 active">
              <img src="/assets/images/Dr.AartiSoni.jpg" alt="Dr. Aarti Soni" className="team-img" />
              <div className="team-info">
                <span className="team-role">INFERTILITY SPECIALIST</span>
                <h3 className="team-name">Dr. Aarti Soni</h3>
                <p className="team-spec">Consultant Obstetrician & Gynecologist</p>
                <p style={{ color: "var(--mid)", fontSize: "0.85rem", marginBottom: "16px" }}>kulkiivfgroup@gmail.com</p>
                <div className="team-social">
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-header rv active">
            <h2 className="section-title">
              Why Choose <em>Kulki IVF</em>
            </h2>
          </div>
          <div className="grid-3">
            <div className="service-card rv active" style={{ border: "1px solid var(--border)", backgroundColor: "var(--blush)" }}>
              <i className="service-icon fa-solid fa-clipboard-list"></i>
              <h3 className="service-title" style={{ color: "var(--ink)" }}>
                Personalized Treatment
              </h3>
              <p className="service-desc" style={{ color: "var(--mid)" }}>
                Tailored plans for each individual or couple. Our experienced team of fertility specialists will guide you through every step.
              </p>
            </div>
            <div className="service-card rv active" style={{ border: "1px solid var(--border)", backgroundColor: "var(--blush)" }}>
              <i className="service-icon fa-solid fa-hand-holding-heart"></i>
              <h3 className="service-title" style={{ color: "var(--ink)" }}>
                Compassionate Experts
              </h3>
              <p className="service-desc" style={{ color: "var(--mid)" }}>
                We understand the emotional challenges of infertility and are dedicated to providing a supportive, caring environment.
              </p>
            </div>
            <div className="service-card rv active" style={{ border: "1px solid var(--border)", backgroundColor: "var(--blush)" }}>
              <i className="service-icon fa-solid fa-flask"></i>
              <h3 className="service-title" style={{ color: "var(--ink)" }}>
                Cutting-edge Technology
              </h3>
              <p className="service-desc" style={{ color: "var(--mid)" }}>
                Our state-of-the-art laboratory and advanced equipment enable us to offer the latest and most effective fertility treatments.
              </p>
            </div>
            <div className="service-card rv active" style={{ border: "1px solid var(--border)", backgroundColor: "var(--blush)" }}>
              <i className="service-icon fa-solid fa-trophy"></i>
              <h3 className="service-title" style={{ color: "var(--ink)" }}>
                High Success Rates
              </h3>
              <p className="service-desc" style={{ color: "var(--mid)" }}>
                We take pride in our consistently high success rates across various fertility treatments, bringing joy to countless families.
              </p>
            </div>
            <div className="service-card rv active" style={{ border: "1px solid var(--border)", backgroundColor: "var(--blush)" }}>
              <i className="service-icon fa-solid fa-shield-halved"></i>
              <h3 className="service-title" style={{ color: "var(--ink)" }}>
                Ethical Practices
              </h3>
              <p className="service-desc" style={{ color: "var(--mid)" }}>
                Transparency and ethics are at the core of our operations, ensuring you receive honest guidance.
              </p>
            </div>
            <div className="service-card rv active" style={{ border: "1px solid var(--border)", backgroundColor: "var(--blush)" }}>
              <i className="service-icon fa-solid fa-users"></i>
              <h3 className="service-title" style={{ color: "var(--ink)" }}>
                Holistic Support
              </h3>
              <p className="service-desc" style={{ color: "var(--mid)" }}>
                From genetic counseling to psychological support, we offer holistic care beyond just medical treatments.
              </p>
            </div>
          </div>

          <GeoTakeaways
            title="About Kulki IVF - E-E-A-T Summary"
            takeaways={[
              "30+ years of cumulative clinical excellence in reproductive medicine in Rajasthan.",
              "State-of-the-art ART and embryology cleanroom lab maintaining stringent international quality controls.",
              "Complete financial transparency with customized treatment protocols for every patient.",
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
