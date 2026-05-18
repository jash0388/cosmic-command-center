import { useReveal } from "@/hooks/useReveal";
import { Apple, Smartphone, Monitor } from "lucide-react";

function WindowsIcon({ size = 22 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M3 5.5L10 4.5V11.5H3V5.5ZM11 4.3L21 3V11.5H11V4.3ZM3 12.5H10V19.5L3 18.5V12.5ZM11 12.5H21V21L11 19.7V12.5Z"/></svg>;
}

const APPS = [
  { Icon: WindowsIcon, title: "Windows", meta: "Windows 10/11 · 4.8 MB", cta: "Download .exe" },
  { Icon: Apple, title: "macOS", meta: "12+ · Apple Silicon + Intel", cta: "Download .dmg" },
  { Icon: Smartphone, title: "iOS", meta: "iPhone + iPad · iOS 15+", cta: "App Store" },
  { Icon: Monitor, title: "Android", meta: "Phone + Tablet · 9.0+", cta: "Google Play" },
];

export function Download() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="download" className="section" ref={ref}>
      <div className="reveal">
        <span className="eyebrow">Downloads</span>
        <h2 className="h2">Available on every platform.</h2>
        <p style={{ marginTop: 12, fontSize: 16, color: "var(--muted)" }}>One account. Every device you own.</p>
      </div>

      <div style={{
        marginTop: 40,
        display: "grid", gap: 12,
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      }}>
        {APPS.map(({ Icon, title, meta, cta }) => (
          <div key={title} className="card interactive reveal" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Icon size={22} />
            <div>
              <div className="h3">{title}</div>
              <div style={{ marginTop: 4, fontSize: 13, color: "var(--muted)" }}>{meta}</div>
            </div>
            <a href="#" className="btn-secondary btn-full" style={{ marginTop: "auto" }}>{cta}</a>
          </div>
        ))}
      </div>
    </section>
  );
}
