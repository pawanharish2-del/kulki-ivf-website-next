"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    treatment: "IVF Treatment",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      question: "What are your consultation timings?",
      answer: "Our clinic is open Monday to Sunday from 8:00 AM to 8:00 PM. We recommend booking an appointment beforehand.",
    },
    {
      question: "Do you offer online consultations?",
      answer: "Yes, we provide online video consultations for initial discussions. Please contact us to schedule one.",
    },
    {
      question: "What should I bring for my first visit?",
      answer: "Please bring any previous medical records, past fertility treatment details, and a valid ID proof.",
    },
    {
      question: "Is EMI available for treatments?",
      answer: "Yes, we have flexible payment plans and 0% EMI options available. Our financial counselor will guide you during your visit.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit numerical phone number.");
      return;
    }
    setSubmitted(true);
    alert("Thank you for contacting us! We'll reach out within 24 hours.");
  };

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
            Contact Kulki{" "}
            <Link href="/treatments/ivf" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
              IVF
            </Link>
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
            / <span>Contact</span>
          </div>
        </div>
      </section>

      {/* Emergency Contact Strip */}
      <div style={{ backgroundColor: "#f3e1e8", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "24px 0" }}>
        <div className="container">
          <p style={{ color: "var(--rose)", margin: 0, textAlign: "center", fontSize: "1.1rem", fontWeight: 500 }}>
            <i className="fa-solid fa-truck-medical" style={{ marginRight: "8px" }}></i>
            For Urgent Medical Assistance, call:{" "}
            <a href="tel:9799979532" style={{ color: "var(--ink)", fontWeight: 700 }}>
              9799979532
            </a>
          </p>
        </div>
      </div>

      {/* Contact Form & Info */}
      <section className="section-padding bg-white" id="contact-us">
        <div className="container">
          <div className="grid-3">
            {/* Column 1: Info */}
            <div className="contact-info-side rv active">
              <h2 className="section-title" style={{ color: "black", fontSize: "2rem" }}>
                Get in <em>Touch</em>
              </h2>
              <p style={{ color: "black", marginBottom: "32px" }}>Reach out to us for a consultation or any queries.</p>

              <div className="contact-info-list" style={{ marginTop: 0, gap: "24px" }}>
                <div className="c-info-item">
                  <div className="c-info-icon" style={{ width: "36px", height: "36px", fontSize: "1rem" }}>
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="c-info-text">
                    <h4 style={{ fontSize: "1rem" }}>Address</h4>
                    <p style={{ fontSize: "0.9rem" }}>
                      Plot No, 184, Nandpuri-B, In front of MAHIMA PANACHE Apartment, Near Maharana Pratap Circle, Haldighati Marg, Pratap Nagar JAIPUR 302033
                    </p>
                  </div>
                </div>
                <div className="c-info-item">
                  <div className="c-info-icon" style={{ width: "36px", height: "36px", fontSize: "1rem" }}>
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="c-info-text">
                    <h4 style={{ fontSize: "1rem" }}>Phone</h4>
                    <p style={{ fontSize: "0.9rem" }}>
                      <a href="tel:9799979532">9799979532</a>
                      <br />
                      <a href="tel:9799979533">9799979533</a>
                    </p>
                  </div>
                </div>
                <div className="c-info-item">
                  <div className="c-info-icon" style={{ width: "36px", height: "36px", fontSize: "1rem" }}>
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="c-info-text">
                    <h4 style={{ fontSize: "1rem" }}>Email</h4>
                    <p style={{ fontSize: "0.9rem" }}>
                      <a href="mailto:info@kulkiivfgroup.com">info@kulkiivfgroup.com, kulkiivfgroup@gmail.com</a>
                    </p>
                  </div>
                </div>
                <div className="c-info-item">
                  <div className="c-info-icon" style={{ width: "36px", height: "36px", fontSize: "1rem" }}>
                    <i className="fa-solid fa-clock"></i>
                  </div>
                  <div className="c-info-text">
                    <h4 style={{ fontSize: "1rem" }}>Hours</h4>
                    <p style={{ fontSize: "0.9rem" }}>Mon – Sun | 8:00 AM – 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 & 3: Form */}
            <div
              className="contact-form-side rv d-2 active"
              style={{ padding: "40px", gridColumn: "span 2", border: "1px solid var(--border)", borderRadius: "4px" }}
            >
              <h2 className="section-title" style={{ marginBottom: "32px", fontSize: "2rem" }}>
                Send a <em>Message</em>
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      name="first_name"
                      type="text"
                      className="form-control"
                      required
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      name="last_name"
                      type="text"
                      className="form-control"
                      required
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, "").slice(0, 10) })}
                      title="Please enter a 10-digit mobile number using only numbers."
                    />
                  </div>
                  <div className="form-group">
                    <label>Treatment Interest</label>
                    <select
                      name="treatment"
                      className="form-control"
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    >
                      <option value="IVF Treatment">IVF Treatment</option>
                      <option value="ICSI">ICSI</option>
                      <option value="IUI">IUI</option>
                      <option value="Genetic Testing">Genetic Testing</option>
                      <option value="Egg/Oocyte Freezing">Egg/Oocyte Freezing</option>
                      <option value="Sperm Freezing">Sperm Freezing</option>
                      <option value="Male Fertility/Andrology">Male Fertility/Andrology</option>
                      <option value="High-Risk Pregnancy Care">High-Risk Pregnancy Care</option>
                      <option value="General Consultation">General Consultation</option>
                    </select>
                  </div>
                  <div className="form-group full">
                    <label>Your Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                  Send Message <i className="fa-solid fa-paper-plane" style={{ marginLeft: "8px" }}></i>
                </button>
                {submitted && (
                  <div className="success-msg" style={{ display: "block", marginTop: "16px" }}>
                    ✓ Thank you for contacting us! We&apos;ll reach out within 24 hours.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Embed */}
      <section className="map-container" style={{ width: "100%", overflow: "hidden", lineHeight: 0 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.699278249298!2d75.82766317522089!3d26.817702376703966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25f1ad60fcda9013%3A0xa120d35a69f6152b!2sKulki%20IVF!5e0!3m2!1sen!2sin!4v1781238708239!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0, width: "100%" }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* FAQ Strip */}
      <section className="section-padding bg-blush">
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
                <strong>Convenient Location:</strong> Located at Plot No. 184, Nandpuri-B, Haldighati Marg, Pratap Nagar, Jaipur, Rajasthan 302033.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Easy Communication:</strong> Directly call our support line at +91-9799979532 or email us at info@kulkiivfgroup.com.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Prompt Scheduling:</strong> Get support scheduling your comprehensive baseline diagnostic evaluation and consultation with Dr. Asha Sushawat.
              </li>
            </ul>
          </div>

          <div className="section-header rv active">
            <h2 className="section-title">
              Quick <em>Questions</em>
            </h2>
          </div>
          <div className="faq-grid rv d-1 active" style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column" }}>
            {faqs.map((faq, idx) => (
              <div className="faq-item" key={idx}>
                <button
                  className={`faq-question ${activeFaq === idx ? "active" : ""}`}
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  {faq.question} <i className="fa-solid fa-plus"></i>
                </button>
                <div className="faq-answer" style={{ display: activeFaq === idx ? "block" : "none" }}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
