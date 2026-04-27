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
  HTML5: { icon: "html5", v: "original" },
  CSS3: { icon: "css3", v: "original" },
  PHP: { icon: "php", v: "original" },
  JavaScript: { icon: "javascript", v: "original" },
  Postman: { icon: "postman", v: "original" },
  ESLint: { icon: "eslint", v: "original" },
  Bash: { icon: "bash", v: "original" },
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
              (el as HTMLElement).style.animationDelay = `${i * 0.06}s`;
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
    <section ref={sectionRef} id="skills" className="skills-section">
      <div className="skills-container">
        {/* HEADER */}
        <div className="skills-header">
          <div className="section-label reveal opacity-0">Expertise</div>
          <h2 className="skills-title reveal opacity-0">
            Skills & <br />
            <span className="gradient-text">Toolbox.</span>
          </h2>
        </div>

        {/* SKILL GRID */}
        <div className="skill-cards reveal opacity-0">
          {portfolioData.skills.map((skill) => {
            const isHovered = hoveredSkill === skill.name;
            const meta = skillIcons[skill.name];

            return (
              <div
                key={skill.name}
                className="skill-card"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                onTouchStart={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "scale(0.96)";
                }}
                onTouchEnd={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "scale(1)";
                }}
              >
                <div className={`skill-icon ${isHovered ? "active" : ""}`}>{meta && <img src={`${BASE}/${meta.icon}/${meta.icon}-${meta.v}.svg`} alt={skill.name} onError={(e) => handleError(e, meta.icon)} />}</div>

                <div className="skill-name">{skill.name}</div>
              </div>
            );
          })}
        </div>

        {/* TECH STACK */}
        <div className="skills-bottom">
          <div className="bottom-label reveal opacity-0">Also comfortable with</div>

          <div className="tech-list reveal opacity-0">
            {Object.entries(techIcons).map(([tech, meta]) => (
              <div key={tech} className="tech-chip">
                <img src={`${BASE}/${meta.icon}/${meta.icon}-${meta.v}.svg`} alt={tech} onError={(e) => handleError(e, meta.icon)} />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STYLE */}
      <style>{`
        .skills-section {
          padding: 120px 40px;
          background: var(--bg-2);
        }

        .skills-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .skills-header {
          margin-bottom: 60px;
        }

        .skills-title {
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 700;
          line-height: 1.1;
        }

        .skill-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
        }

        .skill-card {
          padding: 28px 20px;
          background: var(--bg-2);
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: all 0.3s ease;
        }

        .skill-icon {
          width: 42px;
          height: 42px;
          filter: grayscale(1) brightness(0.5);
          transition: 0.3s;
        }

        .skill-icon img {
          width: 100%;
          height: 100%;
        }

        .skill-icon.active {
          filter: none;
        }

        .skill-name {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .skills-bottom {
          margin-top: 40px;
        }

        .tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tech-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border: 1px solid var(--border);
          border-radius: 999px;
        }

        .tech-chip img {
          width: 18px;
          filter: grayscale(1);
        }

        .tech-chip span {
          font-size: 0.7rem;
        }

        /* 📱 MOBILE */
        @media (max-width: 768px) {
          .skills-section {
            padding: 80px 20px;
          }

          .skill-cards {
            grid-template-columns: repeat(2, 1fr);
          }

          .skill-card {
            padding: 18px 14px;
          }
        }

        @media (max-width: 500px) {
          .skills-section {
            padding: 60px 16px;
          }

          .skills-title {
            font-size: 2rem;
          }

          .skill-icon {
            width: 32px;
            height: 32px;
          }

          .skill-name {
            font-size: 0.75rem;
          }

          .tech-chip {
            padding: 8px 10px;
          }

          .tech-chip span {
            font-size: 0.65rem;
          }
        }
      `}</style>
    </section>
  );
}
