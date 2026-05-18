import { Apple, Smartphone } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

function WindowsIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M3 5.5L10 4.5V11.5H3V5.5ZM11 4.3L21 3V11.5H11V4.3ZM3 12.5H10V19.5L3 18.5V12.5ZM11 12.5H21V21L11 19.7V12.5Z"/></svg>;
}

export function FinalCTA() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 480,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(120deg, #0a1235 0%, #1a0a35 50%, #2a0a45 100%)",
          backgroundSize: "200% 200%",
          animation: "mesh-shift 15s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          opacity: 0.03,
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div className="reveal" style={{ position: "relative", textAlign: "center", padding: "100px 24px", maxWidth: 760, zIndex: 1 }}>
        <span style={{
          display: "inline-block",
          fontFamily: "JetBrains Mono", fontSize: 11, fontWeight: 500,
          letterSpacing: "0.15em", textTransform: "uppercase",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 999, padding: "6px 16px",
          color: "rgba(240,240,255,0.85)",
          marginBottom: 24,
        }}>Start Today — It's Free</span>

        <h2 className="h2" style={{ color: "#fff" }}>Ready for <span className="text-grad">launch?</span></h2>
        <p style={{ marginTop: 18, fontFamily: "DM Sans", fontSize: 17, color: "rgba(240,240,255,0.65)", maxWidth: 520, margin: "18px auto 0" }}>
          Join thousands of remote workers. No credit card. No complex setup. Just control.
        </p>

        <div style={{ marginTop: 40, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/auth/register" className="btn-primary btn-lg">Start for Free →</a>
          <a href="/download" className="btn-ghost btn-lg">Download the App</a>
        </div>

        <div style={{ marginTop: 32, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <span className="pill"><WindowsIcon /> Windows</span>
          <span className="pill"><Apple size={14} /> macOS</span>
          <span className="pill"><Smartphone size={14} /> iOS</span>
          <span className="pill">🤖 Android</span>
        </div>
      </div>
    </section>
  );
}
