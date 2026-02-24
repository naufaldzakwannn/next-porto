"use client";
import { useState, useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = [
    "all",
    ...Array.from(new Set(portfolioData.projects.map((p) => p.category.split(" ")[0]))),
  ];

  const filtered =
    filter === "all"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              (el as HTMLElement).style.animationDelay = `${i * 0.1}s`;
              el.classList.add("animate-fade-up");
              el.classList.remove("opacity-0");
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        padding: "120px 40px",
        background: "var(--bg-2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "-200px",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "60px",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <div className="section-label reveal opacity-0">Selected Work</div>
            <h2
              className="reveal opacity-0"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
                fontStyle: "italic",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              What I've
              <br />
              <span className="gradient-text">Built.</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div
            className="reveal opacity-0"
            style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "8px 16px",
                  background: filter === cat ? "var(--accent)" : "transparent",
                  color: filter === cat ? "var(--bg)" : "var(--text-muted)",
                  border: filter === cat ? "1px solid var(--accent)" : "1px solid var(--border)",
                  cursor: "none",
                  transition: "all 0.3s ease",
                  borderRadius: "var(--radius)",
                }}
                onMouseEnter={(e) => {
                  if (filter !== cat) {
                    (e.target as HTMLButtonElement).style.borderColor = "var(--accent)";
                    (e.target as HTMLButtonElement).style.color = "var(--accent)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== cat) {
                    (e.target as HTMLButtonElement).style.borderColor = "var(--border)";
                    (e.target as HTMLButtonElement).style.color = "var(--text-muted)";
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured projects — large */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "2px" }}>
          {filtered
            .filter((p) => p.featured)
            .map((project, i) => (
              <div
                key={project.id}
                className="reveal opacity-0"
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                  minHeight: "360px",
                  border: "1px solid var(--border)",
                  overflow: "hidden",
                  cursor: "none",
                  transition: "border-color 0.3s ease",
                  borderColor: hovered === project.id ? "var(--border-hover)" : "var(--border)",
                }}
                className={`reveal opacity-0 project-row-${i % 2}`}
              >
                {/* Info */}
                <div
                  style={{
                    padding: "48px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    order: i % 2 === 0 ? 0 : 1,
                    background: "var(--surface)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <span className="tag">{project.category}</span>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.7rem",
                          color: "var(--text-dim)",
                        }}
                      >
                        {project.year}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        fontStyle: "italic",
                        lineHeight: 1.2,
                        marginBottom: "16px",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.7,
                        marginBottom: "24px",
                      }}
                    >
                      {project.description}
                    </p>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.65rem",
                            color: "var(--text-dim)",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", marginTop: "32px" }}>
                    <a href={project.link} className="btn-primary" style={{ padding: "10px 24px" }}>
                      View Project
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h12M8 3l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </a>
                    {project.github && (
                      <a href={project.github} className="btn-outline" style={{ padding: "9px 20px" }}>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                {/* Visual */}
                <div
                  style={{
                    background: `linear-gradient(135deg, var(--surface-2), var(--surface))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    order: i % 2 === 0 ? 1 : 0,
                    position: "relative",
                    overflow: "hidden",
                    minHeight: "300px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(135deg, ${
                        project.gradient.includes("amber")
                          ? "rgba(120,80,20,0.2)"
                          : project.gradient.includes("emerald")
                          ? "rgba(20,80,60,0.2)"
                          : "rgba(60,20,80,0.2)"
                      }, transparent)`,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "5rem",
                      fontWeight: 900,
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.04)",
                      letterSpacing: "-0.05em",
                      transform: hovered === project.id ? "scale(1.05)" : "scale(1)",
                      transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                      userSelect: "none",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "24px",
                      right: "24px",
                      width: "48px",
                      height: "48px",
                      border: "1px solid var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: hovered === project.id ? "rotate(45deg)" : "rotate(0)",
                      transition: "transform 0.4s ease",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M12 4H5M12 4v7" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Non-featured — grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
            marginTop: "2px",
          }}
          className="projects-grid"
        >
          {filtered
            .filter((p) => !p.featured)
            .map((project) => (
              <div
                key={project.id}
                className="reveal opacity-0 card-glass"
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: "36px",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "none",
                  borderRadius: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "24px",
                  }}
                >
                  <span className="tag">{project.year}</span>
                  <a
                    href={project.link}
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-muted)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                      (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </a>
                </div>

                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontStyle: "italic",
                    fontWeight: 700,
                    marginBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    marginBottom: "20px",
                  }}
                >
                  {project.description}
                </p>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="tag" style={{ fontSize: "0.6rem" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .project-row-0, .project-row-1 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
