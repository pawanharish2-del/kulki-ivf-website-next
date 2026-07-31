"use client";

import React, { useState, useEffect } from "react";

export default function BookingModal() {
  const [isActive, setIsActive] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    treatment: "IVF Treatment",
    message: "",
  });

  useEffect(() => {
    // Listen for DOM class addition or custom event to trigger modal open from legacy triggers or Header
    const observer = new MutationObserver(() => {
      const overlay = document.querySelector(".modal-overlay");
      if (overlay && overlay.classList.contains("active")) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    });

    const overlay = document.querySelector(".modal-overlay");
    if (overlay) {
      observer.observe(overlay, { attributes: true, attributeFilter: ["class"] });
    }

    // Also attach click listeners to all [data-action="book"] or href="#book"
    const handleBookClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const trigger = target.closest('a[href="#book"], button[data-action="book"]');
      if (trigger) {
        e.preventDefault();
        setIsActive(true);
      }
    };

    document.addEventListener("click", handleBookClick);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleBookClick);
    };
  }, []);

  const closeModal = () => {
    setIsActive(false);
    const overlay = document.querySelector(".modal-overlay");
    if (overlay) overlay.classList.remove("active");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    setFormData({ ...formData, phone: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Please enter exactly a 10-digit numerical phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission / send_mail endpoint
      await new Promise((res) => setTimeout(res, 800));
      setIsSubmitting(false);
      closeModal();
      setFormData({ full_name: "", phone: "", treatment: "IVF Treatment", message: "" });
      setShowThankYou(true);
    } catch (err) {
      setIsSubmitting(false);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <>
      {/* Booking Popup Modal */}
      <div
        className={`modal-overlay ${isActive ? "active" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
        style={{ display: isActive ? "flex" : "none" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3>Book an Appointment</h3>
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-grid" style={{ gridTemplateColumns: "1fr" }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    name="full_name"
                    type="text"
                    className="form-control"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
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
                    onChange={handlePhoneChange}
                    title="Please enter a 10-digit mobile number using only numbers."
                    placeholder="e.g. 9799979532"
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
                    <option value="General Consultation">General Consultation</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message (Optional)</label>
                  <textarea
                    name="message"
                    className="form-control"
                    style={{ minHeight: "80px" }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-dark"
                style={{ width: "100%", marginTop: "16px" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request Appointment"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Thank You Modal */}
      {showThankYou && (
        <div
          className="thankyou-modal active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowThankYou(false);
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="thankyou-modal-card"
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "12px",
              maxWidth: "450px",
              width: "90%",
              textAlign: "center",
              position: "relative",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <button
              className="thankyou-close"
              onClick={() => setShowThankYou(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "var(--mid)",
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div
              style={{
                width: "70px",
                height: "70px",
                background: "rgba(230, 84, 115, 0.1)",
                color: "var(--rose)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: "2.2rem",
              }}
            >
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h3
              style={{
                fontSize: "1.8rem",
                color: "var(--ink)",
                marginBottom: "12px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
              }}
            >
              Thank You!
            </h3>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--text)",
                lineHeight: 1.5,
                marginBottom: "24px",
              }}
            >
              Your message has been successfully received. We will get back to you shortly.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setShowThankYou(false)}
              style={{ padding: "10px 24px", fontWeight: 600 }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
