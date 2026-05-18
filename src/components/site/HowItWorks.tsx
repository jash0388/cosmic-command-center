import { useReveal } from "@/hooks/useReveal";
import { Download, QrCode, MousePointer2 } from "lucide-react";

const STEPS = [
  { n: "01", Icon: Download, title: "Install the agent", body: "Lightweight 7MB background service for Windows or Mac. No restart." },
  { n: "02", Icon: QrCode, title: "Scan the QR", body: "Open DataNauts on mobile and pair in under 3 seconds." },
  { n: "03", Icon: MousePointer2, title: "Take control", body: "Mouse, keyboard, trackpad. Full control from anywhere on Pro." },
];

export function HowItWorks() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="how" className="section" ref={ref}>
      <div className="reveal">
        <span className="eyebrow">How it works</span>
        <h2 className="h2">Setup in under a minute.</h2>
      </div>

      <div style={{
        marginTop: 40,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 12,
      }}>
        {STEPS.map(({ n, Icon, title, body }) => (
          <div key={n} className="card reveal">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Icon size={20} color="var(--orange)" />
              <span style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "var(--muted)" }}>{n}</span>
            </div>
            <h3 className="h3" style={{ marginTop: 18 }}>{title}</h3>
            <p style={{ marginTop: 6, fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
