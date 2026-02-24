"use client";
import { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Skills() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            setAnimated(true);
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              (el as HTMLElement).style.animationDelay = `${i * 0.1}s`;
              el.classList.add("animate-fade-up");
              el.classList.remove("opacity-0");
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{ padding: "120px 40px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "80px" }} className="skills-grid">
        {/* Left */}
        <div>
          <div className="section-label reveal opacity-0">Expertise</div>
          <h2
            className="reveal opacity-0"
            style={{
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
              fontWeight: 700,
              fontStyle: "italic",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "32px",
            }}
          >
            Skills &
            <br />
            <span className="gradient-text">Toolbox.</span>
          </h2>
          <p
            className="reveal opacity-0"
            style={{
              fontSize: "0.95rem",
              color: "var(--text-muted)",
              lineHeight: 1.8,
              marginBottom: "48px",
            }}
          >
            Saya terus belajar dan berkembang. Berikut adalah teknologi dan tools yang saya kuasai dan gunakan sehari-hari.
          </p>

          {/* Philosophy cards */}
          {[
            { icon: "⚡", title: "Performance First", desc: "Setiap millisecond berarti. Saya obsesif dengan Core Web Vitals dan optimasi." },
            { icon: "♿", title: "Accessible by Default", desc: "Produk yang baik bisa digunakan semua orang. Aksesibilitas bukan opsi." },
            { icon: "✨", title: "Beauty Matters", desc: "Desain yang indah bukan vanity — ia mencerminkan craft dan kepedulian." },
          ].map((item, i) => (
            <div
              key={i}
              className="reveal opacity-0 card-glass"
              style={{
                padding: "20px 24px",
                marginBottom: "8px",
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
                borderRadius: "var(--radius)",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
              <div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    marginBottom: "4px",
                  }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right — skill bars */}
        <div style={{ paddingTop: "60px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {portfolioData.skills.map((skill, i) => (
              <div key={skill.name} className="reveal opacity-0">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontSize: "0.9rem", fontWeight: 400 }}>{skill.name}</span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.75rem",
                      color: "var(--accent)",
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: animated ? `${skill.level}%` : "0%",
                      transitionDelay: `${i * 0.1 + 0.3}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tech pills */}
          <div
            className="reveal opacity-0"
            style={{ marginTop: "60px" }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
                marginBottom: "20px",
              }}
            >
              Also comfortable with
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {[
                "GraphQL", "Redis", "AWS S3", "Vercel", "Netlify",
                "Jest", "Cypress", "Storybook", "Webpack", "Vite",
                "Linux", "Nginx", "CI/CD", "Agile / Scrum",
              ].map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.65rem",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                    padding: "4px 12px",
                    letterSpacing: "0.05em",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.borderColor = "var(--accent)";
                    (e.target as HTMLElement).style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.borderColor = "var(--border)";
                    (e.target as HTMLElement).style.color = "var(--text-muted)";
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
