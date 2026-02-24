import { portfolioData } from "@/data/portfolio";

export default function Marquee() {
  const items = [...portfolioData.techStack, ...portfolioData.techStack];

  return (
    <div
      style={{
        padding: "28px 0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        background: "var(--surface)",
      }}
    >
      <div className="marquee-track">
        {items.map((tech, i) => (
          <div
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "20px",
              padding: "0 24px",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              {tech}
            </span>
            <span style={{ color: "var(--accent)", fontSize: "0.5rem" }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
