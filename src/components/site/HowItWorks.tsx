import { useReveal } from "@/hooks/useReveal";
import { Apple, Smartphone } from "lucide-react";

function WindowsIcon({ size = 12 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M3 5.5L10 4.5V11.5H3V5.5ZM11 4.3L21 3V11.5H11V4.3ZM3 12.5H10V19.5L3 18.5V12.5ZM11 12.5H21V21L11 19.7V12.5Z"/></svg>;
}

const STEPS = [
  {
    n: "01",
    title: "Install Desktop Agent",
    body: "Download the lightweight background service on the PC you want to control. Under 7MB. No restart required.",
    pills: [
      <span key="w" className="pill"><WindowsIcon /> Windows</span>,
      <span key="m" className="pill"><Apple size={12} /> macOS</span>,
    ],
  },
  {
    n: "02",
    title: "Scan the QR Code",
    body: "Open DataNauts on your phone and scan the secure one-time QR code. Takes literally 3 seconds.",
    pills: [<span key="p" className="pill">📱 Mobile</span>],
  },
  {
    n: "03",
    title: "You're in Command",
    body: "Full mouse, keyboard and trackpad control from your pocket. Anywhere on earth on Pro.",
    pills: [
      <span key="i" className="pill"><Smartphone size={12} /> iOS</span>,
      <span key="a" className="pill">🤖 Android</span>,
    ],
  },
];

export function HowItWorks() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="how" className="section" ref={ref}>
      <div className="text-center reveal">
        <span className="mono-label">How it works</span>
        <h2 className="h2" style={{ color: "#fff" }}>Set up in <span className="text-grad">seconds.</span></h2>
        <p style={{ marginTop: 18, fontFamily: "DM Sans", fontSize: 17, color: "rgba(240,240,255,0.5)" }}>
          Seriously. Three steps. That's it.
        </p>
      </div>

      <div
        style={{
          marginTop: 72,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          position: "relative",
        }}
      >
        {STEPS.map((s, i) => (
          <div key={s.n} className="reveal" style={{ transitionDelay: `${i * 120}ms`, position: "relative" }}>
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -30,
                left: -8,
                fontFamily: "Syne",
                fontWeight: 800,
                fontSize: 96,
                lineHeight: 1,
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                opacity: 0.15,
                pointerEvents: "none",
              }}
            >
              {s.n}
            </div>
            <div className="glass-card hoverable" style={{ padding: 24, position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>{s.pills}</div>
              <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 20, color: "#fff" }}>{s.title}</h3>
              <p style={{ fontFamily: "DM Sans", fontSize: 14, color: "rgba(240,240,255,0.5)", marginTop: 10, lineHeight: 1.6 }}>
                {s.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
