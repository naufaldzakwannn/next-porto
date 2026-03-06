"use client";
import { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setAtTop(window.scrollY < 80);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      },
    );

    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Reset active saat kembali ke Hero ──
  useEffect(() => {
    if (atTop) setActive("");
  }, [atTop]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 40px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s ease",
          background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        {/* Logo
        <a
          href="#"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.4rem",
            fontStyle: "italic",
            color: "var(--accent)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          {portfolioData.name.split(" ")[0]}
          <span style={{ color: "var(--text)", fontStyle: "normal" }}>.</span>
        </a> */}

        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.4rem",
            fontStyle: "italic",
            color: "var(--accent)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            animation: atTop ? "logoPulse 2.5s ease-in-out infinite" : "none",
          }}
        >
          {portfolioData.name.split(" ")[0]}
          <span style={{ color: "var(--text)", fontStyle: "normal" }}>.</span>
        </a>

        {/* Desktop Nav */}
        <ul
          style={{
            display: "flex",
            gap: "40px",
            listStyle: "none",
            alignItems: "center",
          }}
          className="hidden-mobile"
        >
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setActive(link.href)}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                    position: "relative",
                    paddingBottom: "4px",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = isActive ? "var(--accent)" : "var(--text-muted)")}
                >
                  {link.label}
                  {/* Underline indicator */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: "var(--accent)",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1)",
                    }}
                  />
                </a>
              </li>
            );
          })}
          <li>
            <a href="#contact" className="btn-primary" style={{ padding: "10px 24px" }}>
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text)",
            cursor: "none",
            display: "none",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
          className="show-mobile"
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: i === 1 ? "20px" : "28px",
                height: "1px",
                background: menuOpen ? "var(--accent)" : "var(--text)",
                transition: "all 0.3s ease",
                transformOrigin: "left",
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--bg)",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2.5rem",
                color: "var(--text)",
                textDecoration: "none",
                opacity: 0,
                animation: `fadeUp 0.5s ease ${i * 0.1}s forwards`,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }

          @keyframes logoPulse {
          0%, 100% { opacity: 1; text-shadow: 0 0 0px transparent; }
          50%       { opacity: 0.7; text-shadow: 0 0 18px var(--accent); }
        }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </>
  );
}
