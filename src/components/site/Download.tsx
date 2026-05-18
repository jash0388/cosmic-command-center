import { useReveal } from "@/hooks/useReveal";
import { Apple, Info } from "lucide-react";

function WindowsIcon({ size = 40, color = "#4f8ef7" }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M3 5.5L10 4.5V11.5H3V5.5ZM11 4.3L21 3V11.5H11V4.3ZM3 12.5H10V19.5L3 18.5V12.5ZM11 12.5H21V21L11 19.7V12.5Z"/></svg>;
}
function AndroidIcon({ size = 40 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="#4ade80"><path d="M17.6 9.48l1.84-3.18a.4.4 0 00-.69-.4l-1.87 3.23a11.46 11.46 0 00-9.76 0L5.25 5.9a.4.4 0 10-.69.4L6.4 9.48A11.05 11.05 0 001 18.4h22a11.05 11.05 0 00-5.4-8.92zM7 15.5a1 1 0 110-2 1 1 0 010 2zm10 0a1 1 0 110-2 1 1 0 010 2z"/></svg>;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 999,
      padding: "5px 12px",
      fontFamily: "JetBrains Mono", fontSize: 11,
      color: "rgba(240,240,255,0.65)",
      marginTop: 12,
    }}>{children}</span>
  );
}

function Card({ icon, title, sub, badge, btn, note }: any) {
  return (
    <div className="glass-card hoverable reveal" style={{ padding: 40, display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 18 }}>{icon}</div>
      <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 19, color: "#fff" }}>{title}</h3>
      <div style={{ marginTop: 6, fontFamily: "DM Sans", fontSize: 13, color: "rgba(240,240,255,0.5)" }}>{sub}</div>
      <Badge>{badge}</Badge>
      <div style={{ flex: 1 }} />
      <a href="#" className="btn-primary btn-full" style={{ marginTop: 24 }}>{btn}</a>
      <div style={{ marginTop: 14, fontFamily: "DM Sans", fontSize: 12, color: "rgba(240,240,255,0.4)", fontStyle: "italic" }}>{note}</div>
    </div>
  );
}

export function Download() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="download" className="section" ref={ref}>
      <div className="text-center reveal">
        <span className="mono-label">Downloads</span>
        <h2 className="h2" style={{ color: "#fff" }}>Available on <span className="text-grad">every platform.</span></h2>
        <p style={{ marginTop: 18, fontFamily: "DM Sans", fontSize: 17, color: "rgba(240,240,255,0.5)" }}>
          One account. Every device you own.
        </p>
      </div>

      <div style={{
        marginTop: 56,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 20,
      }}>
        <Card icon={<WindowsIcon />} title="DataNauts for Windows" sub="Windows 10 / 11 · 64-bit" badge="v1.2.0 · 4.8 MB" btn="Download .exe →" note="Runs silently in background. No restart needed." />
        <Card icon={<Apple size={40} color="rgba(240,240,255,0.8)" />} title="DataNauts for Mac" sub="macOS 12 Monterey and above" badge="v1.2.0 · 6.1 MB · M1/M2/M3 + Intel" btn="Download .dmg →" note="Native Apple Silicon + Intel support." />
        <Card icon={<Apple size={40} color="#4f8ef7" />} title="DataNauts for iPhone" sub="iOS 15 and above" badge="iPhone + iPad" btn="App Store →" note="Optimized for touch. Works on iPad too." />
        <Card icon={<AndroidIcon />} title="DataNauts for Android" sub="Android 9.0 and above" badge="Phone + Tablet" btn="Google Play →" note="Works on phones and all Android tablets." />
      </div>

      <div className="glass-card reveal" style={{ marginTop: 28, padding: 24, display: "flex", alignItems: "flex-start", gap: 14 }}>
        <Info size={20} color="#6ee7f7" style={{ flexShrink: 0, marginTop: 2 }} />
        <p style={{ fontFamily: "DM Sans", fontSize: 14, color: "rgba(240,240,255,0.55)", lineHeight: 1.6 }}>
          Desktop Agent (Windows/Mac) installs on the computer you want to control. The Mobile App (iOS/Android) is what you use to control it from anywhere.
        </p>
      </div>
    </section>
  );
}
