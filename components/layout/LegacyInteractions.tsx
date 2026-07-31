"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LegacyInteractions() {
  const pathname = usePathname();
  const [loaderOpacity, setLoaderOpacity] = useState("1");
  const [loaderDisplay, setLoaderDisplay] = useState("flex");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);

  // 1. Page Loader Animation
  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      setLoaderDisplay("none");
      return;
    }
    setLoaderOpacity("1");
    setLoaderDisplay("flex");

    const timer1 = setTimeout(() => {
      setLoaderOpacity("0");
      const timer2 = setTimeout(() => {
        setLoaderDisplay("none");
      }, 500);
      return () => clearTimeout(timer2);
    }, 700);

    return () => clearTimeout(timer1);
  }, [pathname]);

  // 2. Scroll Progress & Back to Top visibility
  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    const handleScroll = () => {
      // Scroll progress
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(scrolled);

      // Back to Top button (> 400px)
      if (window.scrollY > 400) {
        setShowBackTop(true);
      } else {
        setShowBackTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // 3. Global JS Micro-Interactions (RV scroll reveal & Animated Counters & Modal Triggers)
  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    // RV elements observer
    const rvElements = document.querySelectorAll(".rv");
    if ("IntersectionObserver" in window) {
      const rvObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 }
      );
      rvElements.forEach((el) => rvObserver.observe(el));
    } else {
      rvElements.forEach((el) => el.classList.add("active"));
    }

    // Animated Counters observer
    const counters = document.querySelectorAll(".counter");
    if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const counter = entry.target as HTMLElement;
              // Avoid re-animating if already animated
              if (counter.getAttribute("data-animated") === "true") return;
              counter.setAttribute("data-animated", "true");

              const targetVal = +(counter.getAttribute("data-target") || 0);
              const duration = 1800;
              const increment = targetVal / (duration / 16);
              let current = 0;

              const updateCounter = () => {
                current += increment;
                if (current < targetVal) {
                  counter.innerText = Math.ceil(current).toString();
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.innerText = targetVal + (counter.getAttribute("data-plus") ? "+" : "");
                }
              };
              updateCounter();
              observer.unobserve(counter);
            }
          });
        },
        { threshold: 0.1 }
      );
      counters.forEach((counter) => counterObserver.observe(counter));
    }

    // Global Event Delegation for Booking Modal triggers (href="#book" or data-action="book")
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const bookTrigger = target.closest('a[href="#book"], button[data-action="book"], a[href="#contact-us"][data-action="book"]');
      if (bookTrigger) {
        e.preventDefault();
        const modalOverlay = document.querySelector(".modal-overlay");
        if (modalOverlay) {
          modalOverlay.classList.add("active");
        }
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Hide all public legacy interactions (floating WhatsApp, Call, loader) on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* 1. Page Loader */}
      <div
        className="page-loader"
        style={{
          opacity: loaderOpacity,
          display: loaderDisplay,
          transition: "opacity 0.5s ease, visibility 0.5s ease",
        }}
      >
        <div className="loader-ring"></div>
        <div className="loader-text">KULKI IVF</div>
      </div>

      {/* 2. Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* 3. Floating WhatsApp Button */}
      <a
        href="https://wa.me/919799979532"
        className="float-wa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Us"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* 4. Floating Call Button */}
      <a href="tel:9799979532" className="float-call" aria-label="Call Us">
        <i className="fa-solid fa-phone"></i>
      </a>

      {/* 5. Back to Top Button */}
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
