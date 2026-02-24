"use client";

import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "40px",
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "1.1rem",
          color: "var(--accent)",
        }}
      >
        {portfolioData.name}.
      </div>

      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.65rem",
          color: "var(--text-dim)",
          letterSpacing: "0.08em",
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} {portfolioData.name} — All rights reserved
      </div>

      <div style={{ display: "flex", gap: "24px" }}>
        {Object.entries(portfolioData.social).map(([key, url]) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              color: "var(--text-dim)",
              textDecoration: "none",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-dim)")}
          >
            {key}
          </a>
        ))}
      </div>
    </footer>
  );
}
