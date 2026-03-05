"use client";
import { useState, useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with your form submission logic (e.g. Resend, EmailJS, Formspree)
    setSent(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        padding: "120px 40px",
        background: "var(--bg-2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Big background text */}
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(60px, 15vw, 200px)",
          fontWeight: 900,
          fontStyle: "italic",
          color: "rgba(255,255,255,0.015)",
          letterSpacing: "-0.05em",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        Let's Talk
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left */}
          <div>
            <div className="section-label reveal opacity-0">Contact</div>
            <h2
              className="reveal opacity-0"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
                fontStyle: "italic",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginBottom: "32px",
              }}
            >
              Let's build
              <br />
              something
              <br />
              <span className="gradient-text">great.</span>
            </h2>
            {/* <p
              className="reveal opacity-0"
              style={{
                fontSize: "1rem",
                color: "var(--text-muted)",
                lineHeight: 1.8,
                marginBottom: "48px",
                maxWidth: "400px",
              }}
            >
              Punya proyek menarik atau ingin berdiskusi? Saya selalu terbuka untuk peluang baru dan kolaborasi yang bermakna.
            </p> */}

            {/* Contact details */}
            <div className="reveal opacity-0" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                {
                  label: "Email",
                  value: portfolioData.email,
                  href: `mailto:${portfolioData.email}`,
                },
                {
                  label: "Location",
                  value: portfolioData.location,
                  href: null,
                },
                {
                  label: "Availability",
                  value: portfolioData.availability ? "Open for work" : "Not available",
                  href: null,
                  highlight: portfolioData.availability,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65rem",
                      color: "var(--text-dim)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      width: "80px",
                      flexShrink: 0,
                    }}
                  >
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        color: "var(--accent)",
                        textDecoration: "none",
                        fontSize: "0.95rem",
                        transition: "opacity 0.3s",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.7")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontSize: "0.95rem",
                        color: (item as any).highlight ? "#4ade80" : "var(--text)",
                      }}
                    >
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="reveal opacity-0" style={{ display: "flex", gap: "16px", marginTop: "40px" }}>
              {Object.entries(portfolioData.social).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.65rem",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    transition: "color 0.3s ease",
                    padding: "8px 0",
                    borderBottom: "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "var(--accent)";
                    (e.target as HTMLElement).style.borderBottomColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = "var(--text-muted)";
                    (e.target as HTMLElement).style.borderBottomColor = "transparent";
                  }}
                >
                  {key}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal opacity-0">
            {sent ? (
              <div
                style={{
                  padding: "60px 40px",
                  border: "1px solid var(--accent)",
                  textAlign: "center",
                  background: "var(--accent-dim)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2rem",
                    fontStyle: "italic",
                    marginBottom: "16px",
                    color: "var(--accent)",
                  }}
                >
                  Message sent!
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Terima kasih sudah menghubungi saya. Saya akan segera membalas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {[
                  { key: "name", label: "Your Name", type: "text", placeholder: "Nama" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "email@example.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--text-dim)",
                        marginBottom: "10px",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={(formState as any)[field.key]}
                      onChange={(e) => setFormState((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "14px 18px",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                        fontSize: "0.9rem",
                        fontFamily: "'DM Sans', sans-serif",
                        outline: "none",
                        transition: "border-color 0.3s ease",
                        cursor: "none",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                ))}

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--text-dim)",
                      marginBottom: "10px",
                    }}
                  >
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Pesan"
                    value={formState.message}
                    onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      fontSize: "0.9rem",
                      fontFamily: "'DM Sans', sans-serif",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.3s ease",
                      cursor: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8l13-6-6 13-2-5-5-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        input::placeholder, textarea::placeholder { color: var(--text-dim); }
      `}</style>
    </section>
  );
}
