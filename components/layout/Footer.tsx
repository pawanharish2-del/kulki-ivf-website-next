"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackTop(true);
      } else {
        setShowBackTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const locationSlugs = [
    { name: "Jaipur", slug: "jaipur" },
    { name: "Jodhpur", slug: "jodhpur" },
    { name: "Udaipur", slug: "udaipur" },
    { name: "Kota", slug: "kota" },
    { name: "Ajmer", slug: "ajmer" },
    { name: "Bikaner", slug: "bikaner" },
    { name: "Alwar", slug: "alwar" },
    { name: "Bharatpur", slug: "bharatpur" },
    { name: "Sikar", slug: "sikar" },
    { name: "Bhilwara", slug: "bhilwara" },
    { name: "Pali", slug: "pali" },
    { name: "Sri Ganganagar", slug: "sri-ganganagar" },
    { name: "Hanumangarh", slug: "hanumangarh" },
    { name: "Barmer", slug: "barmer" },
    { name: "Chittorgarh", slug: "chittorgarh" },
    { name: "Nagaur", slug: "nagaur" },
    { name: "Jhunjhunu", slug: "jhunjhunu" },
    { name: "Tonk", slug: "tonk" },
    { name: "Sawai Madhopur", slug: "sawai-madhopur" },
    { name: "Jaisalmer", slug: "jaisalmer" },
  ];

  return (
    <>
      <footer className="main-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="logo-link" style={{ marginBottom: "16px" }}>
                <img
                  src="/assets/images/logo.jpg"
                  alt="Kulki IVF Logo"
                  style={{
                    height: "80px",
                    width: "auto",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <p className="footer-tagline">&quot;Magic Password to Childbirth...&quot;</p>
              <p>
                Providing advanced, ethical, and compassionate fertility care using the latest ART technologies in Jaipur.
              </p>
              <div className="footer-social">
                <a href="http://www.facebook.com/kulkiivfgroup" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/kulki_ivf_group/" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.youtube.com/@kulkiivfgroup" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="https://wa.me/919799979532" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <div className="footer-links">
                <Link href="/">Home</Link>
                <Link href="/about">About Us</Link>
                <Link href="/patient-info">Patient Info</Link>
                <Link href="/gallery">Gallery</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/contact">Contact Us</Link>
              </div>
            </div>

            <div className="footer-col">
              <h4>Treatments</h4>
              <div className="footer-links">
                <Link href="/treatments/ivf">Refined IVF Treatment</Link>
                <Link href="/treatments/iui">IUI Treatment</Link>
                <Link href="/treatments/icsi">ICSI Treatment</Link>
                <Link href="/treatments/egg-freezing">Egg Freezing</Link>
                <Link href="/treatments/genetic-testing">Genetic Testing</Link>
                <Link href="/infertility/male-infertility">Male Fertility</Link>
              </div>
            </div>

            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul className="footer-contact-list">
                <li>
                  <i className="fa-solid fa-location-dot"></i>
                  <span>
                    Plot No, 184, Nandpuri-B, In front of MAHIMA PANACHE Apartment, Near Maharana Pratap Circle, Haldighati Marg, Pratap Nagar JAIPUR 302033
                  </span>
                </li>
                <li>
                  <i className="fa-solid fa-phone"></i>
                  <span>9799979532 / 9799979533</span>
                </li>
                <li>
                  <i className="fa-solid fa-envelope"></i>
                  <span>info@kulkiivfgroup.com, kulkiivfgroup@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="footer-locations-pro"
            style={{
              gridColumn: "1 / -1",
              marginTop: "40px",
              paddingTop: "32px",
              borderTop: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <h4
              style={{
                marginBottom: "24px",
                fontSize: "1.2rem",
                color: "#222",
                letterSpacing: "0.5px",
                borderBottom: "2px solid var(--plum)",
                paddingBottom: "8px",
                display: "inline-block",
              }}
            >
              Premium IVF Centers in Rajasthan
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "16px",
                marginTop: "16px",
              }}
            >
              {locationSlugs.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  style={{
                    color: "#444",
                    fontWeight: 500,
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "var(--plum)")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#444")}
                >
                  <i className="fa-solid fa-location-dot" style={{ fontSize: "0.8em", color: "var(--plum)" }}></i>{" "}
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; 2026 by Kulki IVF | Designed & developed by{" "}
              <a href="https://amazingit.in/" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>
                AmazingIt
              </a>
            </p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <a href="https://wa.me/919799979532" className="float-wa" target="_blank" rel="noreferrer" aria-label="WhatsApp Us">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
      <a href="tel:9799979532" className="float-call" aria-label="Call Us">
        <i className="fa-solid fa-phone"></i>
      </a>
      <button
        id="back-top"
        className={`btop ${showBackTop ? "show" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </>
  );
}
