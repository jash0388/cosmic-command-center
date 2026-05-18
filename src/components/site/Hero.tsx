import { useEffect, useRef } from "react";
import { Apple, Smartphone } from "lucide-react";

function Particles() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);
    const parts = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.2 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.2 * devicePixelRatio,
      a: Math.random() * 0.4 + 0.1,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      aria-hidden
    />
  );
}

function WindowsIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M3 5.5L10 4.5V11.5H3V5.5ZM11 4.3L21 3V11.5H11V4.3ZM3 12.5H10V19.5L3 18.5V12.5ZM11 12.5H21V21L11 19.7V12.5Z"/></svg>
  );
}

export function Hero() {
  return (
    <section
      className="relative flex items-center justify-center text-center"
      style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 60, overflow: "hidden" }}
    >
      <Particles />
      <div className="relative mx-auto px-6" style={{ maxWidth: 860, zIndex: 2 }}>
        <div
          className="reveal in-view"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(79,142,247,0.08)",
            border: "1px solid rgba(79,142,247,0.2)",
            borderRadius: 999, padding: "8px 20px",
            fontFamily: "JetBrains Mono", fontSize: 12, color: "#4f8ef7",
            marginBottom: 32,
          }}
        >
          ✦ Now available on Windows, Mac, iOS &amp; Android
        </div>

        <h1 className="h-hero">
          <span style={{ color: "rgba(240,240,255,0.5)", fontWeight: 700, display: "block" }}>
            Control your PC
          </span>
          <span style={{ display: "block" }}>
            from <span className="text-grad">anywhere.</span>
          </span>
        </h1>

        <p
          className="mx-auto"
          style={{
            fontFamily: "DM Sans", fontWeight: 400, fontSize: 19,
            color: "rgba(240,240,255,0.55)", lineHeight: 1.7,
            maxWidth: 560, marginTop: 24,
          }}
        >
          Scan a QR code and you're connected. No IP addresses, no complex setup. Just instant, encrypted remote access.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4" style={{ marginTop: 48 }}>
          <a href="/auth/register" className="btn-primary btn-lg">Start for Free →</a>
          <a href="/download" className="btn-ghost btn-lg">Download the App</a>
        </div>

        <p style={{ marginTop: 20, fontFamily: "DM Sans", fontSize: 13, color: "rgba(240,240,255,0.35)" }}>
          ★★★★★&nbsp;&nbsp;2,400+ teams use DataNauts daily
        </p>

        <div className="flex flex-wrap items-center justify-center" style={{ gap: 10, marginTop: 40 }}>
          <span className="pill"><WindowsIcon /> Windows</span>
          <span className="pill"><Apple size={14} /> macOS</span>
          <span className="pill"><Smartphone size={14} /> iOS</span>
          <span className="pill">🤖 Android</span>
        </div>

        <DeviceMockup />
      </div>
    </section>
  );
}

function DeviceMockup() {
  return (
    <div
      className="relative mx-auto"
      style={{
        width: "min(900px, 100%)",
        marginTop: 80,
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        boxShadow:
          "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(79,142,247,0.1), 0 0 200px rgba(79,142,247,0.05)",
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
        </div>
        <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
          DATANAUTS · SESSION ACTIVE
        </div>
        <div style={{ width: 40 }} />
      </div>

      <div style={{ padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, textAlign: "left" }}>
        {/* status panel */}
        <div className="glass-card" style={{ padding: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 10, height: 10, borderRadius: "50%", background: "#4ade80",
                boxShadow: "0 0 0 0 rgba(74,222,128,0.5)",
                animation: "pulse-dot 2s infinite",
              }}
            />
            <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 15, color: "#fff" }}>Connected</span>
          </div>
          <div style={{ marginTop: 14, fontFamily: "DM Sans", fontSize: 13, color: "rgba(240,240,255,0.5)" }}>
            JASHWANTH-DESKTOP
          </div>
          <div style={{ marginTop: 6, fontFamily: "JetBrains Mono", fontSize: 11, color: "rgba(240,240,255,0.35)", letterSpacing: "0.1em" }}>
            10.0.42.118 · ENCRYPTED
          </div>
          <div style={{ marginTop: 18, display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 36, color: "#6ee7f7" }}>14</span>
            <span style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "rgba(240,240,255,0.5)" }}>ms latency</span>
          </div>
        </div>

        {/* control grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {["⌘", "⇧", "⌥", "↑", "↓", "↵"].map((k, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "1",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "JetBrains Mono",
                fontSize: 18,
                color: "rgba(240,240,255,0.7)",
              }}
            >
              {k}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
