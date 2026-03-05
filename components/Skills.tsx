"use client";
import { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";

const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const skillIcons: Record<string, { icon: string; v: string }> = {
  "React / Next.js": { icon: "nextjs", v: "original" },
  TypeScript: { icon: "typescript", v: "original" },
  "Node.js / Express": { icon: "nodejs", v: "original" },
  "Tailwind CSS / CSS3": { icon: "tailwindcss", v: "plain" },
  "PostgreSQL / Prisma ORM": { icon: "postgresql", v: "original" },
  "UI/UX Design (Figma)": { icon: "figma", v: "original" },
  "Docker & CI/CD": { icon: "docker", v: "original" },
  "React Native": { icon: "react", v: "original" },

  // ── Entry untuk nama di portfolio.ts ──
  Laravel: { icon: "laravel", v: "original" },
  "PostgreSQL / Prisma": { icon: "postgresql", v: "original" },
  "Framer Motion": { icon: "framermotion", v: "original" },
  "Docker / DevOps": { icon: "docker", v: "original" },
  "Three.js / WebGL": { icon: "threejs", v: "original" },
  Bootstrap: { icon: "bootstrap", v: "original" },
  MySQL: { icon: "mysql", v: "original" },
};

const techIcons: Record<string, { icon: string; v: string }> = {
  CodeIgniter: { icon: "codeigniter", v: "original" },
  Git: { icon: "git", v: "original" },
  Github: { icon: "github", v: "plain" },
  Vercel: { icon: "vercel", v: "original" },
  Vite: { icon: "vitejs", v: "original" },
  Canva: { icon: "canva", v: "plain" },
  GraphQL: { icon: "graphql", v: "plain" },
  Redis: { icon: "redis", v: "original" },
  Netlify: { icon: "netlify", v: "original" },
  Jest: { icon: "jest", v: "plain" },
  Cypress: { icon: "cypressio", v: "original" },
  Storybook: { icon: "storybook", v: "original" },
  Linux: { icon: "linux", v: "original" },
  Nginx: { icon: "nginx", v: "original" },
};

const FALLBACKS: Record<string, string[]> = {
  original: ["plain", "line"],
  plain: ["original", "line"],
  line: ["plain", "original"],
};

export default function Skills() {
  const [animated, setAnimated] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            setAnimated(true);
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              (el as HTMLElement).style.animationDelay = `${i * 0.08}s`;
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
  }, [animated]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>, iconName: string) => {
    const img = e.currentTarget;
    const currentSrc = img.src;
    const currentVariant = currentSrc.match(/-(original|plain|line)\.svg/)?.[1];
    if (!currentVariant) return;
    const fallbacks = FALLBACKS[currentVariant] ?? [];
    for (const fb of fallbacks) {
      const next = `${BASE}/${iconName}/${iconName}-${fb}.svg`;
      if (next !== currentSrc) {
        img.src = next;
        return;
      }
    }
    img.style.display = "none";
  };

  return (
    <section ref={sectionRef} id="skills" style={{ padding: "120px 40px", background: "var(--bg-2)", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* ── Header ── */}
        <div style={{ marginBottom: "72px" }}>
          <div className="section-label reveal opacity-0">Expertise</div>
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
            Skills &<br />
            <span className="gradient-text">Toolbox.</span>
          </h2>
        </div>

        {/* ── Skill Cards ── */}
        <div
          className="reveal opacity-0 skill-cards"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "var(--border)",
            marginBottom: "1px",
          }}
        >
          {portfolioData.skills.map((skill) => {
            const isHovered = hoveredSkill === skill.name;
            const meta = skillIcons[skill.name];
            return (
              <div
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  padding: "36px 28px",
                  background: isHovered ? "rgba(255,255,255,0.03)" : "var(--bg-2)",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                  transition: "background 0.35s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(90deg, var(--accent), var(--accent-light))",
                    transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1)",
                  }}
                />

                {/* Logo */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    filter: isHovered ? "none" : "grayscale(1) brightness(0.45)",
                    transition: "filter 0.4s ease",
                  }}
                >
                  {meta && <img src={`${BASE}/${meta.icon}/${meta.icon}-${meta.v}.svg`} alt={skill.name} width={40} height={40} style={{ objectFit: "contain" }} onError={(e) => handleError(e, meta.icon)} />}
                </div>

                {/* Name */}
                <div
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: isHovered ? "var(--text)" : "var(--text-muted)",
                    transition: "color 0.3s ease",
                  }}
                >
                  {skill.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom row ── */}
        <div style={{ background: "var(--bg-2)", padding: "40px 0 0" }}>
          <div
            className="reveal opacity-0"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
              marginBottom: "24px",
            }}
          >
            Also comfortable with
          </div>
          <div className="reveal opacity-0" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {Object.entries(techIcons).map(([tech, meta]) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1px solid var(--border)",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  transition: "all 0.25s ease",
                  cursor: "default",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.background = "rgba(201,169,110,0.06)";
                  const img = el.querySelector("img") as HTMLElement;
                  if (img) img.style.filter = "none";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.background = "transparent";
                  const img = el.querySelector("img") as HTMLElement;
                  if (img) img.style.filter = "grayscale(1) brightness(0.5)";
                }}
              >
                <img
                  src={`${BASE}/${meta.icon}/${meta.icon}-${meta.v}.svg`}
                  alt={tech}
                  width={20}
                  height={20}
                  style={{
                    objectFit: "contain",
                    filter: "grayscale(1) brightness(0.5)",
                    transition: "filter 0.25s ease",
                    flexShrink: 0,
                  }}
                  onError={(e) => handleError(e, meta.icon)}
                />
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                    lineHeight: 1,
                  }}
                >
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
          @media (max-width: 900px) {
            .skill-cards   { grid-template-columns: repeat(2, 1fr) !important; }
            .skills-bottom { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 500px) {
            .skill-cards { grid-template-columns: 1fr !important; }
          }
        `}</style>
    </section>
  );
}
