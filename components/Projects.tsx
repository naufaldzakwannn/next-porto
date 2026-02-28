"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";

type Project = (typeof portfolioData.projects)[0];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("all");
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ["all", ...Array.from(new Set(portfolioData.projects.map((p) => p.category.split(" ")[0])))];

  const filtered = filter === "all" ? portfolioData.projects : portfolioData.projects.filter((p) => p.category.toLowerCase().includes(filter.toLowerCase()));

  // Re-trigger animasi setiap filter berubah
  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll<HTMLElement>(".project-card");
    cards.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "none";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = `opacity 0.4s ease ${i * 0.07}s, transform 0.4s cubic-bezier(0.23,1,0.32,1) ${i * 0.07}s`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      });
    });
  }, [filter]);

  // Initial section reveal
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
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Lock scroll saat modal terbuka
  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  // Tutup modal dengan tombol ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const getGradientColor = (gradient: string) => {
    if (gradient.includes("amber")) return "rgba(120,80,20,0.55)";
    if (gradient.includes("emerald")) return "rgba(20,80,60,0.55)";
    if (gradient.includes("violet")) return "rgba(60,20,100,0.55)";
    if (gradient.includes("rose")) return "rgba(100,20,40,0.55)";
    if (gradient.includes("sky")) return "rgba(20,60,100,0.55)";
    return "rgba(80,60,20,0.55)";
  };

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
      {/* ════════════════════════════════════════
          MODAL PROJECT DETAIL
      ════════════════════════════════════════ */}
      {activeProject && (
        <div
          onClick={() => setActiveProject(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(4,4,4,0.88)",
            backdropFilter: "blur(12px)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            animation: "fadeIn 0.25s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "820px",
              maxHeight: "88vh",
              background: "var(--surface)",
              border: "1px solid var(--border-hover)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
              animation: "scaleIn 0.3s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            {/* Tombol Close */}
            <button
              onClick={() => setActiveProject(null)}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                zIndex: 10,
                background: "rgba(8,8,8,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "none",
                color: "var(--text-muted)",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.color = "var(--bg)";
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(8,8,8,0.7)";
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* ── Gambar preview (bukan fullscreen) ── */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 8",
                flexShrink: 0,
                background: "var(--surface-2)",
                overflow: "hidden",
              }}
            >
              {activeProject.image ? (
                <Image
                  src={activeProject.image}
                  alt={activeProject.imageAlt ?? activeProject.title}
                  fill
                  sizes="820px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                />
              ) : (
                <>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(135deg, ${getGradientColor(activeProject.gradient)}, transparent 70%)`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "7rem",
                      fontWeight: 900,
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.05)",
                      userSelect: "none",
                    }}
                  >
                    {activeProject.title.split("—")[0].trim()}
                  </div>
                </>
              )}
              {/* Fade bawah agar menyatu ke konten */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "80px",
                  background: "linear-gradient(to top, var(--surface), transparent)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* ── Konten detail (scrollable) ── */}
            <div style={{ overflowY: "auto", padding: "28px 36px 36px", flexGrow: 1 }}>
              {/* Meta row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className="tag">{activeProject.category}</span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65rem",
                      color: "var(--text-dim)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {activeProject.year}
                  </span>
                </div>
                {/* Hint ESC */}
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.1em",
                    opacity: 0.5,
                  }}
                >
                  ESC to close
                </span>
              </div>

              {/* Judul */}
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  marginBottom: "16px",
                }}
              >
                {activeProject.title}
              </h3>

              {/* Divider */}
              <hr className="hr-gold" style={{ marginBottom: "20px" }} />

              {/* Deskripsi */}
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  marginBottom: "28px",
                }}
              >
                {activeProject.description}
              </p>

              {/* Tech stack */}
              <div style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-dim)",
                    marginBottom: "12px",
                  }}
                >
                  Tech Stack
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {activeProject.tech.map((t: string) => (
                    <span key={t} className="tag" style={{ fontSize: "0.65rem" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "12px 28px" }}>
                  Visit Site
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </a>
                {activeProject.github && (
                  <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "11px 24px" }}>
                    View Code
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1C3.686 1 1 3.686 1 7c0 2.652 1.72 4.9 4.107 5.695.3.055.41-.13.41-.288 0-.142-.005-.518-.008-1.018-1.67.363-2.02-.805-2.02-.805-.273-.693-.667-.878-.667-.878-.545-.373.041-.365.041-.365.603.042.92.619.92.619.535.918 1.404.652 1.746.499.054-.388.21-.652.38-.802-1.333-.152-2.733-.667-2.733-2.966 0-.655.234-1.19.618-1.61-.062-.152-.268-.762.059-1.588 0 0 .504-.161 1.65.615A5.74 5.74 0 017 4.668c.51.002 1.023.069 1.502.202 1.146-.776 1.649-.615 1.649-.615.328.826.122 1.436.06 1.588.385.42.617.955.617 1.61 0 2.305-1.403 2.812-2.74 2.96.216.186.408.552.408 1.113 0 .804-.007 1.452-.007 1.65 0 .16.108.347.413.288C11.281 11.898 13 9.651 13 7c0-3.314-2.686-6-6-6z"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Background glow ── */}
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
              What I&apos;ve
              <br />
              <span className="gradient-text">Built.</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="reveal opacity-0" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {categories.map((cat) => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "8px 16px",
                    background: isActive ? "var(--accent)" : "transparent",
                    color: isActive ? "var(--bg)" : "var(--text-muted)",
                    border: isActive ? "1px solid var(--accent)" : "1px solid var(--border)",
                    cursor: "none",
                    transition: "all 0.3s ease",
                    borderRadius: "var(--radius)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "var(--accent)";
                      e.currentTarget.style.color = "var(--accent)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--text-muted)";
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Featured projects ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "2px" }}>
          {filtered
            .filter((p) => p.featured)
            .map((project, i) => (
              <div
                key={project.id}
                className="project-card"
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  minHeight: "420px",
                  border: "1px solid",
                  borderColor: hovered === project.id ? "var(--border-hover)" : "var(--border)",
                  overflow: "hidden",
                  cursor: "none",
                  transition: "border-color 0.3s ease",
                  opacity: 0,
                }}
              >
                {/* Info panel */}
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
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                      <span className="tag">{project.category}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "var(--text-dim)" }}>{project.year}</span>
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
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "24px" }}>{project.description}</p>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {project.tech.map((t) => (
                        <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "var(--text-dim)", letterSpacing: "0.08em" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "16px", marginTop: "32px" }}>
                    {/* ✅ Tombol "View Project" membuka modal, bukan link langsung */}
                    <button onClick={() => setActiveProject(project)} className="btn-primary" style={{ padding: "10px 24px", border: "none" }}>
                      View Project
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h12M8 3l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener" className="btn-outline" style={{ padding: "9px 20px" }}>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                {/* Visual panel — klik untuk buka modal */}
                <div
                  onClick={() => setActiveProject(project)}
                  style={{
                    order: i % 2 === 0 ? 1 : 0,
                    position: "relative",
                    overflow: "hidden",
                    minHeight: "420px",
                    background: "var(--surface-2)",
                    cursor: "none",
                  }}
                >
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.imageAlt ?? project.title}
                        fill
                        sizes="(max-width: 900px) 100vw, 50vw"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center center",
                          transform: hovered === project.id ? "scale(1.04)" : "scale(1)",
                          transition: "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: hovered === project.id ? "rgba(8,8,8,0.3)" : "rgba(8,8,8,0.12)",
                          transition: "background 0.4s ease",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${getGradientColor(project.gradient)}, transparent 70%)` }} />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                          backgroundSize: "40px 40px",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "8rem",
                          fontWeight: 900,
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.05)",
                          letterSpacing: "-0.05em",
                          userSelect: "none",
                          transform: hovered === project.id ? "scale(1.08)" : "scale(1)",
                          transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </>
                  )}
                  {/* "Click to preview" hint muncul saat hover
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: hovered === project.id ? 1 : 0,
                      transition: "opacity 0.3s ease",
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--text)",
                        background: "rgba(0,0,0,0.55)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        padding: "10px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                        <circle cx="7" cy="7" r="2" fill="currentColor" />
                      </svg>
                      Preview
                    </div>
                  </div> */}
                  {/* Arrow pojok kanan bawah */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      right: "20px",
                      width: "44px",
                      height: "44px",
                      border: `1px solid ${project.accent ?? "var(--accent)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: hovered === project.id ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.4s ease",
                      background: "rgba(0,0,0,0.3)",
                      backdropFilter: "blur(4px)",
                      zIndex: 3,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M12 4H5M12 4v7" stroke={project.accent ?? "var(--accent)"} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* ── Non-featured grid ── */}
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", marginTop: "2px" }}>
          {filtered
            .filter((p) => !p.featured)
            .map((project) => (
              <div
                key={project.id}
                className="project-card card-glass"
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ overflow: "hidden", cursor: "none", borderRadius: 0, opacity: 0, display: "flex", flexDirection: "column" }}
              >
                {/* Thumbnail — klik buka modal */}
                <div
                  onClick={() => setActiveProject(project)}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "180px",
                    flexShrink: 0,
                    overflow: "hidden",
                    background: "var(--surface-2)",
                    cursor: "none",
                  }}
                >
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.imageAlt ?? project.title}
                        fill
                        sizes="(max-width: 900px) 100vw, 33vw"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center center",
                          transform: hovered === project.id ? "scale(1.06)" : "scale(1)",
                          transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                        }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(8,8,8,0.7) 100%)" }} />
                    </>
                  ) : (
                    <>
                      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${getGradientColor(project.gradient)}, transparent)` }} />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "3.5rem",
                          fontWeight: 900,
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.06)",
                          userSelect: "none",
                        }}
                      >
                        {project.title.split("—")[0].trim()}
                      </div>
                    </>
                  )}

                  {/* Preview hint on hover */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: hovered === project.id ? 1 : 0,
                      transition: "opacity 0.3s ease",
                      background: "rgba(0,0,0,0.25)",
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--text)",
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        padding: "8px 16px",
                      }}
                    >
                      Click to preview
                    </span>
                  </div>

                  {/* Category badge */}
                  <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 3 }}>
                    <span className="tag" style={{ fontSize: "0.58rem", backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.4)" }}>
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "var(--text-dim)", letterSpacing: "0.08em" }}>{project.year}</span>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {/* Preview button */}
                      <button
                        onClick={() => setActiveProject(project)}
                        style={{
                          width: "32px",
                          height: "32px",
                          border: "1px solid var(--border)",
                          background: "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-muted)",
                          transition: "all 0.3s ease",
                          cursor: "none",
                        }}
                        title="Preview"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = project.accent ?? "var(--accent)";
                          e.currentTarget.style.color = project.accent ?? "var(--accent)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.color = "var(--text-muted)";
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
                          <circle cx="7" cy="7" r="2" fill="currentColor" />
                        </svg>
                      </button>
                      {/* External link */}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener"
                        style={{
                          width: "32px",
                          height: "32px",
                          border: "1px solid var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-muted)",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = project.accent ?? "var(--accent)";
                          e.currentTarget.style.color = project.accent ?? "var(--accent)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.color = "var(--text-muted)";
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                          <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <h3 style={{ fontSize: "1.1rem", fontStyle: "italic", fontWeight: 700, marginBottom: "10px", letterSpacing: "-0.01em", lineHeight: 1.3 }}>{project.title}</h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "16px", flexGrow: 1 }}>{project.description}</p>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "auto" }}>
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="tag" style={{ fontSize: "0.58rem" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .project-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
