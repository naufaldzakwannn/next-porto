"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"counting" | "done" | "hidden">("counting");

  useEffect(() => {
    // Simulasi progress 0 → 100 dengan easing
    let start: number | null = null;
    const duration = 2200; // ms total

    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const tick = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const t = Math.min(elapsed / duration, 1);
      setProgress(Math.floor(ease(t) * 100));

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Setelah 100, tunggu sebentar lalu fade out
        setTimeout(() => setPhase("done"), 300);
        setTimeout(() => setPhase("hidden"), 1000);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: phase === "done" ? "opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1)" : "none",
        opacity: phase === "done" ? 0 : 1,
        transform: phase === "done" ? "scale(1.02)" : "scale(1)",
        pointerEvents: phase === "done" ? "none" : "all",
      }}
    >
      {/* Noise overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.025,
          pointerEvents: "none",
        }}
      />

      {/* Radial glow di tengah */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          transition: "opacity 0.5s ease",
          opacity: phase === "done" ? 0 : 1,
        }}
      />

      {/* ── Konten tengah ── */}
      <div style={{ position: "relative", textAlign: "center" }}>
        {/* Nama / logo */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: "8px",
            background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 50%, #fff8e7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Naufal Dzakwan
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
            marginBottom: "56px",
          }}
        >
          Web Developer
        </div>

        {/* Progress bar container */}
        <div style={{ position: "relative", width: "280px", margin: "0 auto" }}>
          {/* Track */}
          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.07)",
              width: "100%",
              marginBottom: "14px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Fill */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, var(--accent), var(--accent-light))",
                transition: "width 0.05s linear",
                boxShadow: "0 0 8px rgba(201,169,110,0.6)",
              }}
            />
          </div>

          {/* Angka progress + label */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                color: "var(--text-dim)",
                textTransform: "uppercase",
              }}
            >
              {progress < 100 ? "Loading" : "Ready"}
            </span>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "1.1rem",
                color: "var(--accent)",
                minWidth: "44px",
                textAlign: "right",
                lineHeight: 1,
              }}
            >
              {progress}
            </span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      {[
        { top: 32, left: 32, borderTop: "1px solid", borderLeft: "1px solid" },
        { top: 32, right: 32, borderTop: "1px solid", borderRight: "1px solid" },
        { bottom: 32, left: 32, borderBottom: "1px solid", borderLeft: "1px solid" },
        { bottom: 32, right: 32, borderBottom: "1px solid", borderRight: "1px solid" },
      ].map((style, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "24px",
            height: "24px",
            borderColor: "rgba(201,169,110,0.25)",
            ...style,
          }}
        />
      ))}

      {/* Bottom location tag */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.58rem",
          letterSpacing: "0.2em",
          color: "var(--text-dim)",
          textTransform: "uppercase",
          opacity: 0.5,
          whiteSpace: "nowrap",
        }}
      >
        PAdang, Indonesia — {new Date().getFullYear()}
      </div>
    </div>
  );
}
