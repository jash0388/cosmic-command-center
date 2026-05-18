import { QrCode, Shield, Hand, Gauge, Monitor, Globe } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const FEATURES = [
  { Icon: QrCode, title: "Instant connect", body: "Scan a QR. No IP addresses or port forwarding. You're in." },
  { Icon: Shield, title: "End-to-end encrypted", body: "AES-256 tunnels. Screen data never touches our servers." },
  { Icon: Hand, title: "Touch-first controls", body: "Pinch, scroll and gesture controls built for thumbs." },
  { Icon: Gauge, title: "Low latency", body: "Sub-50ms on Pro. Feels like you're at the keyboard." },
  { Icon: Monitor, title: "Cross-platform", body: "Windows, Mac, iOS, Android. One account everywhere." },
  { Icon: Globe, title: "Works anywhere", body: "Any network, any country, NAT-traversal handled for you." },
];

export function Features() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="features" className="section" ref={ref}>
      <div className="reveal">
        <span className="eyebrow">Features</span>
        <h2 className="h2" style={{ maxWidth: 720 }}>
          Everything you need to control your machines.
        </h2>
        <p style={{ marginTop: 14, fontSize: 16, color: "var(--muted)", maxWidth: 560 }}>
          Built for speed. Designed to disappear. The remote desktop you actually want to use.
        </p>
      </div>

      <div style={{
        marginTop: 48,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 12,
      }}>
        {FEATURES.map(({ Icon, title, body }) => (
          <div key={title} className="card interactive reveal">
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "rgba(255,122,0,0.1)", border: "1px solid rgba(255,122,0,0.2)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon size={18} color="var(--orange)" />
            </div>
            <h3 className="h3" style={{ marginTop: 14 }}>{title}</h3>
            <p style={{ marginTop: 6, fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
