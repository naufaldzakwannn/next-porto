"use client";
import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  const yearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (yearRef.current) {
      yearRef.current.textContent = new Date().getFullYear().toString();
    }
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 40px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Large background text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(80px, 18vw, 280px)",
          fontWeight: 900,
          fontStyle: "italic",
          color: "rgba(255,255,255,0.02)",
          letterSpacing: "-0.05em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        Portfolio
      </div>

      {/* Top-right info */}
      <div
        style={{
          position: "absolute",
          top: "120px",
          right: "40px",
          textAlign: "right",
        }}
      >
        <div
          className="animate-fade-in delay-800 opacity-0"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7rem",
            color: "var(--text-dim)",
            letterSpacing: "0.1em",
            marginBottom: "8px",
          }}
        >
          AVAILABLE FOR WORK
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#4ade80",
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              color: "#4ade80",
              letterSpacing: "0.1em",
            }}
          >
            OPEN
          </span>
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
            50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(74,222,128,0); }
          }
        `}</style>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-fade-in delay-800 opacity-0"
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            color: "var(--text-dim)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, var(--accent), transparent)",
            animation: "scrollLine 2s ease-in-out infinite",
          }}
        />
        <style>{`
          @keyframes scrollLine {
            0% { transform: scaleY(0); transform-origin: top; }
            50% { transform: scaleY(1); transform-origin: top; }
            51% { transform: scaleY(1); transform-origin: bottom; }
            100% { transform: scaleY(0); transform-origin: bottom; }
          }
        `}</style>
      </div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
        <div className="section-label animate-fade-in opacity-0">
          {portfolioData.location} — <span ref={yearRef} />
        </div>

        <h1
          className="animate-fade-up delay-200 opacity-0"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 900,
            fontStyle: "italic",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: "0",
          }}
        >
          {portfolioData.name.split(" ")[0]}
          <br />
          <span className="gradient-text">{portfolioData.name.split(" ")[1]}</span>
        </h1>

        <div
          className="animate-fade-up delay-300 opacity-0"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            margin: "20px 0 32px",
          }}
        >
          <hr className="hr-gold" style={{ width: "60px" }} />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
            }}
          >
            {portfolioData.title} {portfolioData.subtitle}
          </span>
        </div>

        <div className="animate-fade-up delay-500 opacity-0" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a href="#work" className="btn-primary">
            View My Work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
          <a href={`mailto:${portfolioData.email}`} className="btn-outline">
            Get In Touch
          </a>
        </div>

        {/* Stats */}
        <div
          className="animate-fade-up delay-600 opacity-0"
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "64px",
            paddingTop: "40px",
            borderTop: "1px solid var(--border)",
          }}
        >
          {[
            { num: "2", label: "Years Experience" },
            { num: "10", label: "Projects Delivered" },
            { num: "2", label: "Happy Clients" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  color: "var(--text-dim)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
