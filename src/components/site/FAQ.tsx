import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const Q = [
  { q: "Is there a mobile app to download?", a: "Not in the traditional sense. DataNauts mobile uses PWA technology — open the link in Safari or Chrome and add it to your home screen. No App Store required. Native iOS and Android apps coming soon." },
  { q: "Does it work on Mac?", a: "Yes. The desktop agent supports both Windows 10/11 and macOS 12 (Monterey) and above, including all Apple Silicon chips (M1, M2, M3)." },
  { q: "Is my screen data stored?", a: "Never. DataNauts uses peer-to-peer encrypted tunnels. Your screen data never passes through our servers. We literally cannot see your screen." },
  { q: "What's the latency like?", a: "On a solid connection, under 50ms on Pro. Most users say it feels instant. Trial plan on local network is even snappier." },
  { q: "Can I use it on mobile data?", a: "Global network access (4G, 5G, any internet) is a Pro feature. Trial is local WiFi network only." },
  { q: "How many devices can I connect?", a: "Pro plan supports unlimited devices. Trial supports 1 desktop agent at a time." },
];

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="glass-card hoverable" style={{ padding: 0, borderRadius: 14, overflow: "hidden" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%", background: "transparent", border: "none",
          padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", color: "#fff", textAlign: "left",
        }}
      >
        <span style={{ fontFamily: "DM Sans", fontWeight: 500, fontSize: 16, color: "#fff" }}>{q}</span>
        <span style={{
          fontFamily: "Syne", fontSize: 22, color: "#4f8ef7",
          transition: "transform 0.3s var(--ease)",
          transform: open ? "rotate(45deg)" : "rotate(0)",
          display: "inline-block",
        }}>+</span>
      </button>
      <div
        style={{
          maxHeight: open ? 240 : 0,
          opacity: open ? 1 : 0,
          transition: "max-height 0.35s var(--ease), opacity 0.3s var(--ease)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "0 28px 22px", fontFamily: "DM Sans", fontSize: 14, color: "rgba(240,240,255,0.55)", lineHeight: 1.7 }}>
          {a}
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const ref = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section" ref={ref}>
      <div className="text-center reveal">
        <span className="mono-label">FAQ</span>
        <h2 className="h2" style={{ color: "#fff" }}>Questions we <span className="text-grad">know you have.</span></h2>
      </div>
      <div style={{ maxWidth: 720, margin: "56px auto 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {Q.map((item, i) => (
          <div key={i} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
            <Item {...item} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          </div>
        ))}
      </div>
    </section>
  );
}
