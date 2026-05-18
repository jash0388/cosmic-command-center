import { QrCode, Shield, Hand, Gauge, Monitor, Globe } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const FEATURES = [
  { Icon: QrCode, title: "Instant Connect", body: "Zero-install PWA. Scan once, control instantly. No downloads on mobile." },
  { Icon: Shield, title: "Secure Tunnel", body: "End-to-end AES-256 encryption. Your screen data never touches our servers." },
  { Icon: Hand, title: "Touch Native", body: "Pinch, zoom, scroll naturally. Designed for how your thumbs actually work." },
  { Icon: Gauge, title: "Ultra Low Latency", body: "Sub-50ms response time on Pro. Feels like you're sitting right at your desk." },
  { Icon: Monitor, title: "Cross-Platform", body: "Control from iPhone, Android, iPad, or any modern browser. No restrictions." },
  { Icon: Globe, title: "Always Encrypted", body: "Military-grade encryption on every session. Nobody watches but you." },
];

export function Features() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="features" className="section" ref={ref}>
      <div className="text-center reveal">
        <span className="mono-label">Features</span>
        <h2 className="h2" style={{ color: "#fff" }}>
          Everything you need.<br />
          <span className="text-grad">Nothing you don't.</span>
        </h2>
        <p style={{ marginTop: 18, fontFamily: "DM Sans", fontSize: 17, color: "rgba(240,240,255,0.5)" }}>
          Minimalist by design. Ruthlessly powerful by nature.
        </p>
      </div>

      <div
        style={{
          marginTop: 72,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {FEATURES.map(({ Icon, title, body }, i) => (
          <div
            key={title}
            className="glass-card hoverable reveal feature-card"
            style={{ transitionDelay: `${i * 80}ms`, position: "relative" }}
          >
            <div
              className="icon-wrap"
              style={{
                width: 48, height: 48,
                background: "rgba(79,142,247,0.1)",
                border: "1px solid rgba(79,142,247,0.2)",
                borderRadius: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s ease",
              }}
            >
              <Icon size={24} color="#4f8ef7" />
            </div>
            <h3 className="h3" style={{ color: "#f0f0ff", marginTop: 20 }}>{title}</h3>
            <p style={{ fontFamily: "DM Sans", fontSize: 14, color: "rgba(240,240,255,0.5)", marginTop: 10, lineHeight: 1.6 }}>
              {body}
            </p>
            <div
              style={{
                marginTop: 24, width: 40, height: 1,
                background: "linear-gradient(90deg, #4f8ef7, transparent)",
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .feature-card:hover .icon-wrap {
          background: rgba(79,142,247,0.2) !important;
          border-color: rgba(79,142,247,0.4) !important;
        }
        .feature-card:hover .icon-wrap svg { color: #6ee7f7; }
      `}</style>
    </section>
  );
}
