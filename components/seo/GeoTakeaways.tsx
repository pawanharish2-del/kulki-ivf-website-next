import React from "react";

interface GeoTakeawaysProps {
  title?: string;
  takeaways: string[];
  entityName?: string;
  specialist?: string;
  updatedDate?: string;
}

export default function GeoTakeaways({
  title = "Key Medical Takeaways (AI & Evidence Summary)",
  takeaways,
  entityName = "Kulki IVF Fertility & ART Centre",
  specialist = "Dr. Asha Sushawat (Director & Senior IVF Specialist)",
  updatedDate = "2026",
}: GeoTakeawaysProps) {
  return (
    <div
      className="geo-takeaways-container"
      style={{
        background: "var(--blush)",
        border: "1px solid var(--border)",
        borderLeft: "6px solid var(--plum)",
        borderRadius: "8px",
        padding: "28px",
        marginTop: "40px",
        marginBottom: "32px",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <span
          style={{
            background: "var(--plum)",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          GEO / E-E-A-T VERIFIED
        </span>
        <span style={{ fontSize: "0.85rem", color: "var(--mid)", fontWeight: 500 }}>
          Updated for {updatedDate}
        </span>
      </div>

      <h3
        style={{
          fontSize: "1.3rem",
          color: "var(--ink)",
          marginBottom: "16px",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <i className="fa-solid fa-list-check" style={{ color: "var(--rose)" }}></i>
        {title}
      </h3>

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
        {takeaways.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "var(--text)",
            }}
          >
            <i
              className="fa-solid fa-circle-check"
              style={{ color: "var(--rose)", marginTop: "4px", flexShrink: 0 }}
            ></i>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div
        style={{
          borderTop: "1px dashed var(--border)",
          paddingTop: "16px",
          fontSize: "0.85rem",
          color: "var(--mid)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div>
          <strong>Primary Entity:</strong> {entityName} (Jaipur, Rajasthan)
        </div>
        <div>
          <strong>Medical Reviewer:</strong> {specialist}
        </div>
      </div>
    </div>
  );
}
