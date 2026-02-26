"use client";
import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import Image from "next/image";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              (el as HTMLElement).style.animationDelay = `${i * 0.15}s`;
              el.classList.add("animate-fade-up");
              el.classList.remove("opacity-0");
            });
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        padding: "120px 40px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "80px",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Left */}
        <div>
          <div className="section-label reveal opacity-0">About Me</div>
          <h2
            className="reveal opacity-0"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              fontStyle: "italic",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "32px",
            }}
          >
            {/* Designer who
            <br />
            <span className="gradient-text">codes.</span>
            <br /> */}
            Developer who
            <br />
            <span className="gradient-text">designs.</span>
          </h2>

          {/* Photo placeholder */}
          <div
            className="reveal opacity-0"
            style={{
              width: "100%",
              aspectRatio: "3/4",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Replace with actual <Image> */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, var(--surface-2) 0%, var(--surface) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/images/Naufal.jpg"
                alt="Foto"
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
            {/* Gold corner accents */}
            {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
              <div
                key={pos}
                style={{
                  position: "absolute",
                  width: "20px",
                  height: "20px",
                  borderColor: "var(--accent)",
                  borderStyle: "solid",
                  borderWidth: 0,
                  ...(pos === "top-left" && { top: 8, left: 8, borderTopWidth: 1, borderLeftWidth: 1 }),
                  ...(pos === "top-right" && { top: 8, right: 8, borderTopWidth: 1, borderRightWidth: 1 }),
                  ...(pos === "bottom-left" && { bottom: 8, left: 8, borderBottomWidth: 1, borderLeftWidth: 1 }),
                  ...(pos === "bottom-right" && { bottom: 8, right: 8, borderBottomWidth: 1, borderRightWidth: 1 }),
                }}
              />
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ paddingTop: "60px" }}>
          <p
            className="reveal opacity-0"
            style={{
              fontSize: "1.15rem",
              color: "var(--text-muted)",
              lineHeight: 1.8,
              marginBottom: "32px",
            }}
          >
            {portfolioData.bio}
          </p>

          <p
            className="reveal opacity-0"
            style={{
              fontSize: "1rem",
              color: "var(--text-dim)",
              lineHeight: 1.8,
              marginBottom: "48px",
            }}
          ></p>

          {/* Experience */}
          <div className="reveal opacity-0" style={{ marginBottom: "48px" }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
                marginBottom: "24px",
              }}
            >
              Experience
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {portfolioData.experience.map((exp, i) => (
                <div
                  key={i}
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid var(--border)",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "16px",
                    alignItems: "start",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        marginBottom: "4px",
                      }}
                    >
                      {exp.role}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.75rem",
                        color: "var(--accent)",
                        marginBottom: "8px",
                      }}
                    >
                      {exp.company}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-dim)",
                        lineHeight: 1.6,
                      }}
                    >
                      {exp.desc}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65rem",
                      color: "var(--text-dim)",
                      letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                      marginTop: "4px",
                    }}
                  >
                    {exp.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal opacity-0" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="/cv.pdf" className="btn-primary" target="_blank" rel="noopener">
              Download CV
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v8M3 9l4 4 4-4M1 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
            {Object.entries(portfolioData.social).map(([key, url]) => (
              <a key={key} href={url} className="btn-outline" style={{ padding: "13px 20px" }} target="_blank" rel="noopener">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
