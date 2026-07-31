"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

export default function HomeClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [testiIndex, setTestiIndex] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const faqs = [
    {
      question: "What is IVF and how does it work?",
      answer:
        "IVF (In Vitro Fertilization) is an assisted reproductive technique where eggs are retrieved and fertilized by sperm in a laboratory. The resulting embryo is transferred into the uterus.",
    },
    {
      question: "Who should consider IVF?",
      answer:
        "IVF is recommended for blocked fallopian tubes, severe male infertility, unexplained infertility, diminished ovarian reserve, or endometriosis.",
    },
    {
      question: "How long does an IVF cycle take?",
      answer: "Approximately 4–6 weeks from medication start to pregnancy test.",
    },
    {
      question: "What are the success rates at Kulki IVF?",
      answer:
        "Consistently above the national average; individual success depends on age, medical history, and embryo quality.",
    },
    {
      question: "Is IVF treatment painful?",
      answer: "Most patients experience mild discomfort only. Egg retrieval is performed under sedation.",
    },
    {
      question: "How many IVF cycles are needed?",
      answer: "2–3 cycles give best cumulative success rates on average.",
    },
  ];

  const testimonials = [
    {
      text: '"Going through Fertility Treatment was a difficult journey, but with help of our amazing doctors and staff, we were able to conceive my pregnancy. We are forever grateful for their expertise and support throughout the process."',
      author: "Monika w/o Rohit",
      treatment: "IVF Treatment",
    },
    {
      text: '"After struggling with infertility for years, I decided to try fertility treatment. Thanks to their expertise and care, I am now pregnant with my first pregnancy. I am forever grateful for their help and highly recommend their services to anyone in a similar situation."',
      author: "Munesh w/o Sandeep",
      treatment: "Fertility Treatment",
    },
    {
      text: '"It\'s helped many couples struggling with infertility to have children. Consulting with a healthcare provider can provide more insight into whether it\'s right for you."',
      author: "Seema w/o Ajay",
      treatment: "IUI Treatment",
    },
    {
      text: '"The team made us feel heard and cared for at every step. Their state-of-the-art lab and compassionate approach gave us our twin daughters. We can\'t thank them enough."',
      author: "Priya w/o Vikram",
      treatment: "IVF Treatment",
    },
    {
      text: '"After two failed attempts elsewhere, Kulki IVF gave us renewed hope. Dr. Asha Sushawat guided us with patience and precision. Today we hold our baby boy — our own magic password to childbirth."',
      author: "Rekha w/o Suresh",
      treatment: "ICSI Treatment",
    },
  ];

  useEffect(() => {
    // IntersectionObserver for scroll reveals (.rv)
    const rvElements = document.querySelectorAll(".rv");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 }
      );
      rvElements.forEach((el) => observer.observe(el));
    } else {
      rvElements.forEach((el) => el.classList.add("active"));
    }

    // Counter animation
    const counters = document.querySelectorAll(".counter");
    if ("IntersectionObserver" in window) {
      const counterObs = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const counter = entry.target as HTMLElement;
              const target = +counter.getAttribute("data-target")!;
              const duration = 1800;
              const increment = target / (duration / 16);
              let current = 0;

              const updateCounter = () => {
                current += increment;
                if (current < target) {
                  counter.innerText = Math.ceil(current).toString();
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.innerText = target + (counter.getAttribute("data-plus") ? "+" : "");
                }
              };
              updateCounter();
              obs.unobserve(counter);
            }
          });
        },
        { threshold: 0.1 }
      );
      counters.forEach((counter) => counterObs.observe(counter));
    }
  }, []);

  const nextTesti = () => {
    setTestiIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTesti = () => {
    setTestiIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      <SchemaMarkup type="FAQ" faqs={faqs} />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title rv">
            Welcome to{" "}
            <span className="text-rose">
              Kulki{" "}
              <Link href="/treatments/ivf" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                IVF
              </Link>
            </span>{" "}
            Fertility & ART Center
          </h1>
          <p className="tagline rv d-1" style={{ marginBottom: "16px" }}>
            &quot;Magic Password to Childbirth...&quot;
          </p>
          <p className="hero-desc rv d-2">
            Where Dreams of Parenthood Become Reality. Advanced fertility treatments with compassionate, personalised care for every couple.
          </p>
          <div className="hero-cta-group rv d-3">
            <button
              className="btn btn-primary"
              onClick={() => document.querySelector(".modal-overlay")?.classList.add("active")}
            >
              Make an Appointment
            </button>
            <a href="tel:9799979532" className="btn btn-dark">
              9799979532
            </a>
          </div>
          <div className="trust-pills rv d-4">
            <div className="trust-pill">
              <i className="fa-solid fa-circle-check"></i> Advanced{" "}
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
            </div>
            <div className="trust-pill">
              <i className="fa-solid fa-circle-check"></i> Experienced Fertility Specialists
            </div>
            <div className="trust-pill">
              <i className="fa-solid fa-circle-check"></i> Personalised Care — Pratap Nagar, Jaipur
            </div>
            <div className="trust-pill">
              <i className="fa-solid fa-circle-check"></i> Monday – Sunday, 8 AM – 8 PM
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://cdn.pixabay.com/photo/2016/11/19/14/28/baby-1839565_1280.jpg" alt="Kulki IVF Banner" />
          <div className="stats-strip">
            <div className="container grid-4" style={{ gap: "16px" }}>
              <div className="stat-item">
                <span className="stat-num counter" data-target="1000" data-plus="true">
                  0
                </span>
                <span className="stat-label">Families</span>
              </div>
              <div className="stat-item">
                <span className="stat-num counter" data-target="95">
                  0
                </span>
                <span className="stat-label">% Satisfaction</span>
              </div>
              <div className="stat-item">
                <span className="stat-num counter" data-target="10" data-plus="true">
                  0
                </span>
                <span className="stat-label">Yrs Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">
                  <i className="fa-solid fa-atom"></i>
                </span>
                <span className="stat-label">ART Technology</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="container">
          {/* GEO / AEO Key Takeaways Box */}
          <div style={{ background: "var(--blush)", borderLeft: "5px solid var(--plum)", padding: "24px", borderRadius: "8px", margin: "24px 0 32px 0", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ marginTop: 0, color: "var(--plum)", fontSize: "1.3rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fa-solid fa-square-poll-horizontal"></i> Key Takeaways & At a Glance
            </h3>
            <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink)", listStyleType: "disc" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>Premier Clinical Care:</strong> Kulki{" "}
                <Link href="/treatments/ivf" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                  IVF
                </Link>{" "}
                Fertility & ART Centre is directed by veteran reproductive specialist Dr. Asha Sushawat and fertility specialist Dr. Aarti Soni in Pratap Nagar, Jaipur.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>World-Class Cleanroom:</strong> Features advanced embryology cleanroom laboratories utilizing positive pressure HEPA filter systems for optimal embryo development.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>High Implantation Success:</strong> Offers complete diagnostic workups and high-success cycle protocols for IVF,{" "}
                <Link href="/treatments/icsi" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                  ICSI
                </Link>
                ,{" "}
                <Link href="/treatments/iui" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                  IUI
                </Link>
                , and genetic testing (PGS/PGD).
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Financial Transparency:</strong> Clear, upfront cost estimations with zero hidden diagnostic or laboratory charges.
              </li>
            </ul>
          </div>

          <div className="about-grid">
            <div className="about-image-stack rv">
              <img src="/assets/images/homepageimg.webp" alt="Clinic Team" className="about-main-img" />
              <img src="/assets/images/Our Expertise-1.jpg" alt="Clinic Interior" className="about-accent-img" />
              <div className="about-badge">10+ Years of Excellence</div>
            </div>
            <div className="about-content rv d-2">
              <span className="section-tag">About Us</span>
              <h2 className="section-title">
                About <em>Kulki IVF</em> Fertility & ART Center
              </h2>
              <p>
                At Kulki IVF Fertility & ART Center, we understand the challenges of infertility and the desire to become parents. Our dedicated team of fertility specialists, along with state-of-the-art technology, provides personalized care and advanced treatments to address a wide range of fertility issues. We are committed to helping you overcome infertility and fulfill your dream of parenthood.
              </p>
              <ul className="checklist">
                <li>
                  <i className="fa-solid fa-check"></i> IVF,{" "}
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
              <button
                className="btn btn-dark"
                onClick={() => document.querySelector(".modal-overlay")?.classList.add("active")}
              >
                Consult Our Experts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-ink">
        <div className="container">
          <div className="section-header rv">
            <span className="section-tag">Our Expertise</span>
            <h2 className="section-title">
              Fertility <em>Treatments</em> & Services
            </h2>
            <p className="section-subtitle">
              At Kulki IVF Fertility & ART Center, we provide a comprehensive range of fertility services, including in vitro fertilization (IVF), intrauterine insemination (IUI), intracytoplasmic sperm injection (ICSI),{" "}
              <Link href="/treatments/egg-freezing" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                egg freezing
              </Link>
              , sperm freezing, genetic testing, and more. Our goal is to empower our patients with the knowledge and support they need to navigate their fertility journey with confidence.
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card rv d-1">
              <i className="service-icon fa-solid fa-baby"></i>
              <h3 className="service-title">In Vitro Fertilization (IVF)</h3>
              <p className="service-desc">
                Our IVF treatment involves fertilizing eggs with sperm in a laboratory setting. This procedure is ideal for couples facing infertility due to various reasons. We utilize advanced techniques and state-of-the-art equipment to maximize the chances of successful conception.
              </p>
            </div>
            <div className="service-card rv d-2">
              <i className="service-icon fa-solid fa-syringe"></i>
              <h3 className="service-title">Intrauterine Insemination (IUI)</h3>
              <p className="service-desc">
                IUI is a fertility treatment that involves placing sperm directly into the uterus during the ovulation period. It is a less invasive procedure compared to IVF and can be a suitable option for couples with certain fertility issues. Our experienced team will guide you through the process.
              </p>
            </div>
            <div className="service-card rv d-3">
              <i className="service-icon fa-solid fa-dna"></i>
              <h3 className="service-title">Genetic Testing</h3>
              <p className="service-desc">
                Genetic testing plays a crucial role in identifying potential genetic disorders or chromosomal abnormalities. We offer comprehensive genetic testing services to assess the risk of inherited conditions and provide valuable insights for family planning.
              </p>
            </div>
            <div className="service-card rv d-1">
              <i className="service-icon fa-solid fa-microscope"></i>
              <h3 className="service-title">ICSI Treatment</h3>
              <p className="service-desc">
                Intracytoplasmic Sperm Injection (ICSI) is recommended for severe{" "}
                <Link href="/infertility/male-infertility" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                  male infertility
                </Link>{" "}
                and failed IVF cycles. A single sperm is injected directly into the egg for fertilization.
              </p>
            </div>
            <div className="service-card rv d-2">
              <i className="service-icon fa-solid fa-snowflake"></i>
              <h3 className="service-title">
                Egg /{" "}
                <Link href="/treatments/egg-freezing" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                  Oocyte Freezing
                </Link>
              </h3>
              <p className="service-desc">
                Preserve your fertility for the future with our advanced vitrification techniques. Ideal for women who wish to delay parenthood or plan family-building options at a later stage.
              </p>
            </div>
            <div className="service-card rv d-3">
              <i className="service-icon fa-solid fa-person"></i>
              <h3 className="service-title">Male Fertility & Andrology</h3>
              <p className="service-desc">
                Comprehensive male fertility evaluation including sperm analysis, sperm freezing, TESE and lifestyle counselling — addressing{" "}
                <Link href="/infertility/male-infertility" style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "underline" }} className="auto-linked">
                  male factor infertility
                </Link>{" "}
                with dedication and advanced care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-header rv">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">
              Our <em>Features</em> — Above and Beyond
            </h2>
          </div>
          <div className="grid-2">
            <div className="feature-card rv d-1">
              <div className="feature-num">01</div>
              <div className="feature-content">
                <h3 className="feature-title">Personalized Treatment</h3>
                <p className="feature-desc">
                  At Kulki IVF Fertility & ART Center, we provide personalized treatment plans tailored to each individual or couple. Our experienced team of fertility specialists will guide you through every step of your fertility journey, ensuring the highest level of care and support.
                </p>
              </div>
            </div>
            <div className="feature-card rv d-2">
              <div className="feature-num">02</div>
              <div className="feature-content">
                <h3 className="feature-title">Compassionate Experts</h3>
                <p className="feature-desc">
                  Our team of compassionate experts understands the emotional and physical challenges of infertility. We are dedicated to providing a supportive and caring environment. From the moment you walk through our doors, you will be treated with empathy, respect, and understanding.
                </p>
              </div>
            </div>
            <div className="feature-card rv d-1">
              <div className="feature-num">03</div>
              <div className="feature-content">
                <h3 className="feature-title">Cutting-edge Technology</h3>
                <p className="feature-desc">
                  We pride ourselves on staying at the forefront of fertility technology. Our state-of-the-art laboratory and advanced equipment enable us to offer the latest and most effective fertility treatments. With our commitment to innovation, you can trust you are receiving the best possible care.
                </p>
              </div>
            </div>
            <div className="feature-card rv d-2">
              <div className="feature-num">04</div>
              <div className="feature-content">
                <h3 className="feature-title">Success Stories</h3>
                <p className="feature-desc">
                  Explore the inspiring success stories of individuals and couples who have achieved their dream of parenthood with the help of Kulki IVF Fertility & ART Center. From overcoming infertility challenges to embracing alternative family-building options, our success stories showcase the transformative impact of our fertility treatments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IVF Process Timeline Section */}
      <section className="section-padding bg-white" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header rv">
            <span className="section-tag">Patient Journey</span>
            <h2 className="section-title">
              The IVF <em>Process</em>
            </h2>
          </div>
          <div className="process-timeline rv">
            <div className="process-step">
              <div className="step-icon">
                <i className="fa-solid fa-comments"></i>
              </div>
              <div className="step-title">Consultation</div>
            </div>
            <div className="process-step">
              <div className="step-icon">
                <i className="fa-solid fa-flask"></i>
              </div>
              <div className="step-title">Evaluation & Testing</div>
            </div>
            <div className="process-step">
              <div className="step-icon">
                <i className="fa-solid fa-clipboard-list"></i>
              </div>
              <div className="step-title">Treatment Plan</div>
            </div>
            <div className="process-step">
              <div className="step-icon">
                <i className="fa-solid fa-egg"></i>
              </div>
              <div className="step-title">Egg Retrieval</div>
            </div>
            <div className="process-step">
              <div className="step-icon">
                <i className="fa-solid fa-microscope"></i>
              </div>
              <div className="step-title">Fertilization</div>
            </div>
            <div className="process-step">
              <div className="step-icon">
                <i className="fa-solid fa-baby"></i>
              </div>
              <div className="step-title">Embryo Transfer</div>
            </div>
            <div className="process-step">
              <div className="step-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <div className="step-title">Pregnancy Test</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-ink">
        <div className="container">
          <div className="section-header rv">
            <span className="section-tag">Meet the Experts</span>
            <h2 className="section-title">
              Our <em>Team</em>
            </h2>
            <p className="tagline" style={{ marginBottom: "16px" }}>
              Expertise. Compassion. Care.
            </p>
            <p className="section-subtitle">
              At Kulki IVF Fertility & ART Center, our team is dedicated to providing the highest level of care and support to our patients. With a combination of expertise, compassion, and cutting-edge technology, we strive to help couples achieve their dream of starting a family. Get to know our team of experienced professionals who are committed to making your journey to parenthood a success.
            </p>
          </div>
          <div className="grid-3">
            <div className="team-card rv d-1">
              <img src="/assets/images/dr.ssuniti.jpg" alt="Dr. Ssuniti" className="team-img" />
              <div className="team-info">
                <span className="team-role">EMBRYOLOGIST</span>
                <h3 className="team-name">Dr. Ssuniti</h3>
                <p className="team-spec">Consultant Clinical Embryologist & ART</p>
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
            <div className="team-card rv d-2">
              <img src="/assets/images/Dr.AshaSushawat.jpg" alt="Dr. Asha Sushawat" className="team-img" />
              <div className="team-info">
                <span className="team-role">INFERTILITY SPECIALIST</span>
                <h3 className="team-name">Dr. Asha Sushawat</h3>
                <p className="team-spec">Consultant Obstetrician & Gynecologist</p>
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
            <div className="team-card rv d-3">
              <img src="/assets/images/Dr.AartiSoni.jpg" alt="Dr. Aarti Soni" className="team-img" />
              <div className="team-info">
                <span className="team-role">INFERTILITY SPECIALIST</span>
                <h3 className="team-name">Dr. Aarti Soni</h3>
                <p className="team-spec">Consultant Obstetrician & Gynecologist</p>
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
          <div className="rv text-center" style={{ marginTop: "48px", textAlign: "center" }}>
            <Link href="/about" className="btn btn-primary">
              Meet Our Experts
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-header rv">
            <span className="section-tag">Patient Stories</span>
            <h2 className="section-title">
              What Our Patients <em>Say</em>
            </h2>
          </div>
          <div className="testimonial-slider rv">
            <div className="testimonial-track" style={{ transform: `translateX(-${testiIndex * 100}%)`, display: "flex", transition: "transform 0.5s ease" }}>
              {testimonials.map((t, idx) => (
                <div className="testimonial-card" key={idx} style={{ minWidth: "100%", flexShrink: 0 }}>
                  <i className="testi-icon fa-solid fa-quote-left"></i>
                  <p className="testi-text">{t.text}</p>
                  <div className="testi-author">
                    <h4 className="testi-author-name">{t.author}</h4>
                    <span className="testi-author-treatment">{t.treatment}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="slider-controls">
              <button className="slider-btn prev" onClick={prevTesti} aria-label="Previous testimonial">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button className="slider-btn next" onClick={nextTesti} aria-label="Next testimonial">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Rates Section */}
      <section className="section-padding bg-blush">
        <div className="container">
          <div className="rates-grid rv">
            <div className="rate-card d-1">
              <div className="rate-num counter" data-target="75">
                0
              </div>
              <div className="rate-label">% IVF Success Rate</div>
            </div>
            <div className="rate-card d-2">
              <div className="rate-num counter" data-target="95">
                0
              </div>
              <div className="rate-label">% Patient Satisfaction</div>
            </div>
            <div className="rate-card d-3">
              <div className="rate-num counter" data-target="1000" data-plus="true">
                0
              </div>
              <div className="rate-label">Successful Treatments</div>
            </div>
            <div className="rate-card d-4">
              <div className="rate-num counter" data-target="10" data-plus="true">
                0
              </div>
              <div className="rate-label">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-header rv">
            <span className="section-tag">Facilities</span>
            <h2 className="section-title">
              Our <em>Gallery</em>
            </h2>
          </div>
          <div className="gallery-masonry rv">
            {[
              { src: "/assets/images/galleryimage1.jpeg", alt: "Clinic Interior", category: "clinic" },
              { src: "/assets/images/galleryimage2.jpeg", alt: "Happy Family", category: "families" },
              { src: "/assets/images/galleryimage3.jpeg", alt: "Lab Equipment", category: "laboratory" },
              { src: "/assets/images/galleryimage14.jpeg", alt: "Clinic Area", category: "clinic" },
              { src: "/assets/images/galleryimage4.jpeg", alt: "Medical Technology", category: "laboratory" },
            ].map((img, idx) => (
              <div
                key={idx}
                className={`gallery-item ${idx === 0 ? "large" : ""}`}
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
          <div className="text-center rv" style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/gallery" className="btn btn-outline" style={{ color: "var(--ink)", borderColor: "var(--ink)" }}>
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding bg-white" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="section-header rv">
            <span className="section-tag">Insights</span>
            <h2 className="section-title">
              Latest <em>Articles</em>
            </h2>
          </div>
          <div className="grid-3">
            <div className="blog-card rv d-1">
              <div className="blog-img-wrapper">
                <img src="/assets/images/blog1.webp" alt="Blog Post" className="blog-img" />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span>
                    <i className="fa-solid fa-eye"></i> 14 views
                  </span>
                  <span>
                    <i className="fa-solid fa-comment"></i> 1 comment
                  </span>
                </div>
                <h3 className="blog-title">
                  <Link href="/blog/why-kulki-ivf-is-ranked-the-best-ivf-centre-in-jaipur">
                    Why Kulki IVF is Ranked the Best IVF Centre in Jaipur
                  </Link>
                </h3>
                <Link href="/blog/why-kulki-ivf-is-ranked-the-best-ivf-centre-in-jaipur" className="blog-link">
                  Read More <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="blog-card rv d-2">
              <div className="blog-img-wrapper">
                <img src="/assets/images/blog2.png" alt="Blog Post" className="blog-img" />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span>
                    <i className="fa-solid fa-eye"></i> 5 views
                  </span>
                  <span>
                    <i className="fa-solid fa-comment"></i> 0 comments
                  </span>
                </div>
                <h3 className="blog-title">
                  <Link href="/blog/best-ivf-centre-in-jaipur-a-comprehensive-guide-to-your-options">
                    Best IVF Centre in Jaipur: A Comprehensive Guide to Your Options
                  </Link>
                </h3>
                <Link href="/blog/best-ivf-centre-in-jaipur-a-comprehensive-guide-to-your-options" className="blog-link">
                  Read More <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="blog-card rv d-3">
              <div className="blog-img-wrapper">
                <img src="/assets/images/blog3.webp" alt="Blog Post" className="blog-img" />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span>
                    <i className="fa-solid fa-eye"></i> 5 views
                  </span>
                  <span>
                    <i className="fa-solid fa-comment"></i> 0 comments
                  </span>
                </div>
                <h3 className="blog-title">
                  <Link href="/blog/best-ivf-fertility-center-in-jaipur-your-ultimate-guide-to-starting-a-family">
                    Best IVF Fertility Center in Jaipur: Your Ultimate Guide
                  </Link>
                </h3>
                <Link href="/blog/best-ivf-fertility-center-in-jaipur-your-ultimate-guide-to-starting-a-family" className="blog-link">
                  Read More <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center rv" style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/blog" className="btn btn-outline" style={{ color: "var(--ink)", borderColor: "var(--ink)" }}>
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-header rv">
            <span className="section-tag">Common Questions</span>
            <h2 className="section-title">
              Frequently Asked <em>Questions</em>
            </h2>
          </div>
          <div className="faq-grid rv">
            <div className="faq-col">
              {faqs.slice(0, 3).map((faq, idx) => (
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
            <div className="faq-col">
              {faqs.slice(3, 6).map((faq, idx) => {
                const realIdx = idx + 3;
                return (
                  <div className="faq-item" key={realIdx}>
                    <button
                      className={`faq-question ${activeFaq === realIdx ? "active" : ""}`}
                      onClick={() => setActiveFaq(activeFaq === realIdx ? null : realIdx)}
                    >
                      {faq.question} <i className="fa-solid fa-plus"></i>
                    </button>
                    <div className="faq-answer" style={{ display: activeFaq === realIdx ? "block" : "none" }}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact-us">
        <div className="contact-wrap">
          <div className="contact-info-side">
            <span className="section-tag">Get in Touch</span>
            <h2 className="section-title">
              Contact <em>Kulki IVF</em>
            </h2>
            <p>Ready to start your journey? Reach out to us for a consultation or any queries.</p>

            <div className="contact-info-list">
              <div className="c-info-item rv">
                <div className="c-info-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="c-info-text">
                  <h4>Clinic Address</h4>
                  <p>
                    Plot No, 184, Nandpuri-B, In front of MAHIMA PANACHE Apartment, Near Maharana Pratap Circle, Haldighati Marg, Pratap Nagar JAIPUR 302033
                  </p>
                </div>
              </div>
              <div className="c-info-item rv">
                <div className="c-info-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="c-info-text">
                  <h4>Phone Numbers</h4>
                  <p>
                    <a href="tel:9799979532">9799979532</a> / <a href="tel:9799979533">9799979533</a>
                  </p>
                </div>
              </div>
              <div className="c-info-item rv">
                <div className="c-info-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="c-info-text">
                  <h4>Email Address</h4>
                  <p>
                    <a href="mailto:info@kulkiivfgroup.com">info@kulkiivfgroup.com</a>
                    <br />
                    <a href="mailto:kulkiivfgroup@gmail.com">kulkiivfgroup@gmail.com</a>
                  </p>
                </div>
              </div>
              <div className="c-info-item rv">
                <div className="c-info-icon">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div className="c-info-text">
                  <h4>Opening Hours</h4>
                  <p>Monday – Sunday | 8:00 AM – 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-side">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for contacting us! We'll reach out within 24 hours.");
              }}
              className="rv"
            >
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input name="first_name" type="text" className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input name="last_name" type="text" className="form-control" required />
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
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                    }}
                    title="Please enter a 10-digit mobile number using only numbers."
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div className="form-group">
                  <label>Treatment Area</label>
                  <select name="treatment" className="form-control">
                    <option>IVF Treatment</option>
                    <option>ICSI</option>
                    <option>IUI</option>
                    <option>Genetic Testing</option>
                    <option>Egg/Oocyte Freezing</option>
                    <option>Sperm Freezing</option>
                    <option>Male Fertility/Andrology</option>
                    <option>High-Risk Pregnancy Care</option>
                    <option>General Consultation</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label>Your Message</label>
                  <textarea name="message" className="form-control"></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                Send Message <i className="fa-solid fa-paper-plane" style={{ marginLeft: "8px" }}></i>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Google Map */}
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

      {/* Lightbox for Gallery Preview */}
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
