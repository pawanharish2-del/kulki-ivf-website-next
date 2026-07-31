"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change or resize > 1024px
    setIsMenuOpen(false);
    document.body.classList.remove("menu-open");
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.classList.remove("menu-open");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    if (nextState) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove("menu-open");
  };

  const handleAccordionClick = (e: React.MouseEvent, dropdownKey: string) => {
    if (window.innerWidth > 1024) return; // Desktop uses CSS hover
    e.preventDefault();
    setOpenDropdown(openDropdown === dropdownKey ? null : dropdownKey);
  };

  const openBookingModal = (e: React.MouseEvent) => {
    e.preventDefault();
    const modal = document.querySelector(".modal-overlay");
    if (modal) modal.classList.add("active");
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  return (
    <>
      {/* Header Top Bar */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-info">
            <span>
              <i className="fa-solid fa-location-dot"></i> Plot No, 184, Nandpuri-B, In front of MAHIMA PANACHE Apartment, Near Maharana Pratap Circle, Haldighati Marg, Pratap Nagar JAIPUR 302033
            </span>
          </div>
          <div className="header-top-info">
            <span>
              <i className="fa-solid fa-phone"></i>{" "}
              <a href="tel:9799979532" style={{ color: "inherit", textDecoration: "none" }}>
                9799979532
              </a>
            </span>
            <span>
              <i className="fa-solid fa-envelope"></i>{" "}
              <a href="mailto:info@kulkiivfgroup.com" style={{ color: "inherit", textDecoration: "none" }}>
                info@kulkiivfgroup.com, kulkiivfgroup@gmail.com
              </a>
            </span>
            <span>
              <i className="fa-solid fa-clock"></i> Mon–Sun: 8AM–8PM
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`main-header ${isShrunk ? "shrunk" : ""}`}>
        <div className="container nav-container">
          <Link href="/" className="logo-link" onClick={closeMenu}>
            <img
              src="/assets/images/logo.jpg"
              alt="Kulki IVF Logo"
              className="logo-img"
              style={{
                height: "65px",
                width: "auto",
                objectFit: "contain",
                marginRight: "15px",
                borderRadius: "8px",
              }}
            />
          </Link>

          <button
            className={`hamburger ${isMenuOpen ? "on" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle Navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`main-nav ${isMenuOpen ? "on" : ""}`}>
            <ul className="nav-list">
              <li className={`nav-item ${isActive("/") && pathname === "/" ? "active" : ""}`}>
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className={`nav-item ${isActive("/infertility") ? "active" : ""} ${openDropdown === "infertility" ? "open" : ""}`}>
                <a
                  href="/infertility"
                  className="nav-link"
                  onClick={(e) => {
                    if (window.innerWidth <= 1024) {
                      handleAccordionClick(e, "infertility");
                    }
                  }}
                >
                  Infertility <i className="fa-solid fa-chevron-down" style={{ fontSize: "0.7em" }}></i>
                </a>
                <div className="mega-menu" style={{ gap: "32px" }}>
                  <div>
                    <h4 className="mega-column-title">
                      <Link href="/infertility/male-infertility" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                        Male Infertility
                      </Link>
                    </h4>
                    <ul className="mega-list">
                      <li>
                        <Link href="/infertility/male-infertility" className="mega-link">
                          <i className="fa-solid fa-person"></i> Causes & Diagnosis
                        </Link>
                      </li>
                      <li>
                        <Link href="/infertility/male-infertility" className="mega-link">
                          <i className="fa-solid fa-flask"></i> Sperm Analysis
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mega-column-title">
                      <Link href="/infertility/female-infertility" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                        Female Infertility
                      </Link>
                    </h4>
                    <ul className="mega-list">
                      <li>
                        <Link href="/infertility/female-infertility" className="mega-link">
                          <i className="fa-solid fa-person-dress"></i> PCOS & Endometriosis
                        </Link>
                      </li>
                      <li>
                        <Link href="/infertility/female-infertility" className="mega-link">
                          <i className="fa-solid fa-bed-pulse"></i> Ovulation Issues
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li className={`nav-item ${isActive("/treatments") ? "active" : ""} ${openDropdown === "treatments" ? "open" : ""}`}>
                <a
                  href="#treatments"
                  className="nav-link"
                  onClick={(e) => handleAccordionClick(e, "treatments")}
                >
                  Treatments <i className="fa-solid fa-chevron-down" style={{ fontSize: "0.7em" }}></i>
                </a>
                <div className="mega-menu">
                  <div>
                    <h4 className="mega-column-title">ART Treatments</h4>
                    <ul className="mega-list">
                      <li>
                        <Link href="/treatments/ivf" className="mega-link">
                          <i className="fa-solid fa-baby"></i> IVF Treatment
                        </Link>
                      </li>
                      <li>
                        <Link href="/treatments/icsi" className="mega-link">
                          <i className="fa-solid fa-microscope"></i> ICSI
                        </Link>
                      </li>
                      <li>
                        <Link href="/treatments/iui" className="mega-link">
                          <i className="fa-solid fa-syringe"></i> IUI
                        </Link>
                      </li>
                      <li>
                        <Link href="/treatments/andrology" className="mega-link">
                          <i className="fa-solid fa-person"></i> Andrology
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mega-column-title">Preservation & Donation</h4>
                    <ul className="mega-list">
                      <li>
                        <Link href="/treatments/egg-freezing" className="mega-link">
                          <i className="fa-solid fa-snowflake"></i> Egg Freezing
                        </Link>
                      </li>
                      <li>
                        <Link href="/treatments/sperm-freezing" className="mega-link">
                          <i className="fa-solid fa-vial"></i> Sperm Freezing
                        </Link>
                      </li>
                      <li>
                        <Link href="/treatments/oocyte-donation" className="mega-link">
                          <i className="fa-solid fa-egg"></i> Oocyte Donation
                        </Link>
                      </li>
                      <li>
                        <Link href="/treatments/sperm-donation" className="mega-link">
                          <i className="fa-solid fa-hand-holding-heart"></i> Sperm Donation
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mega-column-title">Advanced Services</h4>
                    <ul className="mega-list">
                      <li>
                        <Link href="/treatments/endoscopy" className="mega-link">
                          <i className="fa-solid fa-stethoscope"></i> Endoscopy
                        </Link>
                      </li>
                      <li>
                        <Link href="/treatments/gynaecology" className="mega-link">
                          <i className="fa-solid fa-heart-pulse"></i> Gynaecology
                        </Link>
                      </li>
                      <li>
                        <Link href="/treatments/genetic-testing" className="mega-link">
                          <i className="fa-solid fa-dna"></i> Genetic Testing
                        </Link>
                      </li>
                      <li>
                        <Link href="/treatments/counselling" className="mega-link">
                          <i className="fa-solid fa-comments"></i> Counselling
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li className={`nav-item ${isActive("/about") || isActive("/patient-info") ? "active" : ""} ${openDropdown === "about" ? "open" : ""}`}>
                <a
                  href="#about"
                  className="nav-link"
                  onClick={(e) => handleAccordionClick(e, "about")}
                >
                  About <i className="fa-solid fa-chevron-down" style={{ fontSize: "0.7em" }}></i>
                </a>
                <div className="mega-menu" style={{ gap: "32px" }}>
                  <div>
                    <h4 className="mega-column-title">Who We Are</h4>
                    <ul className="mega-list">
                      <li>
                        <Link href="/about" className="mega-link">
                          <i className="fa-solid fa-users"></i> Our Story & Team
                        </Link>
                      </li>
                      <li>
                        <Link href="/patient-info" className="mega-link">
                          <i className="fa-solid fa-clipboard-list"></i> Patient Information
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li className={`nav-item ${isActive("/gallery") ? "active" : ""}`}>
                <Link href="/gallery" className="nav-link">
                  Gallery
                </Link>
              </li>
              <li className={`nav-item ${isActive("/blog") ? "active" : ""}`}>
                <Link href="/blog" className="nav-link">
                  Blog
                </Link>
              </li>
              <li className={`nav-item ${isActive("/contact") ? "active" : ""}`}>
                <Link href="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="header-cta" style={{ marginLeft: "24px" }}>
              <button
                className="btn btn-primary"
                onClick={openBookingModal}
                data-action="book"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile Menu Footer */}
            <div className="mobile-menu-footer">
              <div className="mobile-contact-info" style={{ marginBottom: "20px", fontSize: "0.9rem", color: "var(--text)" }}>
                <p style={{ marginBottom: "10px" }}>
                  <a href="tel:9799979532" style={{ color: "var(--ink)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <i className="fa-solid fa-phone" style={{ color: "var(--rose)" }}></i> 9799979532
                  </a>
                </p>
                <p style={{ marginBottom: "10px" }}>
                  <a href="mailto:info@kulkiivfgroup.com" style={{ color: "var(--text)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <i className="fa-solid fa-envelope" style={{ color: "var(--rose)" }}></i> info@kulkiivfgroup.com
                  </a>
                </p>
                <p style={{ lineHeight: 1.4, fontSize: "0.85rem", display: "inline-flex", alignItems: "flex-start", gap: "8px", margin: 0, color: "var(--mid)" }}>
                  <i className="fa-solid fa-location-dot" style={{ color: "var(--rose)", marginTop: "3px" }}></i>
                  <span>Plot 184, Nandpuri-B, Near Maharana Pratap Circle, Pratap Nagar, Jaipur</span>
                </p>
              </div>
              <div className="mobile-socials" style={{ display: "flex", gap: "18px", fontSize: "1.25rem", marginTop: "16px" }}>
                <a href="http://www.facebook.com/kulkiivfgroup" target="_blank" rel="noreferrer" style={{ color: "#1877f2", transition: "opacity 0.2s ease" }}>
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com/kulki_ivf_group/" target="_blank" rel="noreferrer" style={{ color: "#c13584", transition: "opacity 0.2s ease" }}>
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.youtube.com/@kulkiivfgroup" target="_blank" rel="noreferrer" style={{ color: "#ff0000", transition: "opacity 0.2s ease" }}>
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu */}
      <div
        className={`nav-overlay ${isMenuOpen ? "on" : ""}`}
        onClick={closeMenu}
      ></div>
    </>
  );
}
