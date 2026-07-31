"use client";

import React, { useState } from "react";
import Link from "next/link";
import GeoTakeaways from "@/components/seo/GeoTakeaways";

export default function GalleryClient() {
  const [filter, setFilter] = useState("all");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const images = [
    { src: "/assets/images/galleryimage1.jpeg", alt: "Clinic Interior", category: "clinic", large: true },
    { src: "/assets/images/galleryimage2.jpeg", alt: "Laboratory Setup", category: "laboratory", large: false },
    { src: "/assets/images/galleryimage3.jpeg", alt: "Laboratory Setup", category: "laboratory", large: false },
    { src: "/assets/images/galleryimage4.jpeg", alt: "Clinic Interior", category: "clinic", large: false },
    { src: "/assets/images/galleryimage5.jpeg", alt: "Clinic Interior", category: "clinic", large: false },
    { src: "/assets/images/galleryimage6.jpeg", alt: "Clinic Interior", category: "clinic", large: false },
    { src: "/assets/images/galleryimage7.jpeg", alt: "Doctor Consultation", category: "doctors", large: false },
    { src: "/assets/images/galleryimage8.jpeg", alt: "Doctor Consultation", category: "doctors", large: false },
    { src: "/assets/images/galleryimage9.jpeg", alt: "Clinic Interior", category: "clinic", large: false },
    { src: "/assets/images/galleryimage10.jpeg", alt: "Laboratory", category: "laboratory", large: true },
    { src: "/assets/images/galleryimage11.jpeg", alt: "Clinic", category: "clinic", large: false },
    { src: "/assets/images/galleryimage12.jpeg", alt: "Families", category: "families", large: false },
    { src: "/assets/images/galleryimage13.jpeg", alt: "Clinic", category: "clinic", large: false },
    { src: "/assets/images/galleryimage14.jpeg", alt: "Clinic", category: "clinic", large: false },
    { src: "/assets/images/baby_smile.png", alt: "Baby Smile", category: "families", large: false },
    { src: "/assets/images/Our Expertise-1.jpg", alt: "Our Expertise", category: "doctors", large: false },
    { src: "/assets/images/Our Expertise-3.jpg", alt: "Our Expertise", category: "laboratory", large: false },
  ];

  const filteredImages = filter === "all" ? images : images.filter((img) => img.category === filter);

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
            Our Gallery
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
            / <span>Gallery</span>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
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
                <strong>Advanced Lab Infrastructure:</strong> Take a visual tour of our modular{" "}
                <Link href="/treatments/ivf" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                  IVF
                </Link>{" "}
                embryology laboratories built to international cleanroom standards.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Patient Amenities:</strong> View our modern, clean, and comfortable consulting chambers, recovery wards, and diagnostic facilities in Pratap Nagar.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Advanced Equipment:</strong> Explore the state-of-the-art incubation and vitrification freezing systems that support our high{" "}
                <Link href="/treatments/ivf" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                  IVF
                </Link>{" "}
                success rates.
              </li>
            </ul>
          </div>

          {/* Filter Tabs */}
          <div className="gallery-filter rv active">
            <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
              All Photos
            </button>
            <button className={`filter-btn ${filter === "clinic" ? "active" : ""}`} onClick={() => setFilter("clinic")}>
              Clinic & Facilities
            </button>
            <button className={`filter-btn ${filter === "laboratory" ? "active" : ""}`} onClick={() => setFilter("laboratory")}>
              Laboratory
            </button>
            <button className={`filter-btn ${filter === "doctors" ? "active" : ""}`} onClick={() => setFilter("doctors")}>
              Doctors & Staff
            </button>
            <button className={`filter-btn ${filter === "families" ? "active" : ""}`} onClick={() => setFilter("families")}>
              Happy Families
            </button>
          </div>

          {/* Masonry Grid */}
          <div className="gallery-masonry rv d-1 active">
            {filteredImages.map((img, idx) => (
              <div
                key={idx}
                className={`gallery-item ${img.large ? "large" : ""}`}
                data-category={img.category}
                onClick={() => setLightboxImg(img.src)}
              >
                <img src={img.src} alt={img.alt} />
                <div className="gallery-overlay">
                  <i className="fa-solid fa-plus"></i>
                </div>
              </div>
            ))}
          </div>

          <GeoTakeaways
            title="Kulki IVF Facilities & Cleanroom Protocols"
            takeaways={[
              "ISO-certified Class 100 positive pressure air filtration cleanroom embryology suite.",
              "Dedicated vitrification cryopreservation storage facility for oocytes, embryos, and sperm samples.",
              "Comfortable, patient-centric consultation and pre/post-operative recovery rooms.",
            ]}
          />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding bg-ink text-center">
        <div className="container rv active">
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "12px", width: "100%" }}>
            Experience Our State-of-the-Art Facilities in Person
          </h2>
          <div style={{ textAlign: "center", width: "100%" }}>
            <button
              className="btn btn-primary"
              onClick={() => document.querySelector(".modal-overlay")?.classList.add("active")}
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox active" onClick={() => setLightboxImg(null)}>
          <span className="lightbox-close" onClick={() => setLightboxImg(null)}>
            &times;
          </span>
          <img className="lightbox-img" src={lightboxImg} alt="Lightbox Preview" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
