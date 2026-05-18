import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Plus, Minus } from "lucide-react";

const Q = [
  { q: "Is there a mobile app?", a: "Yes — iOS and Android. A PWA is also available, no install required." },
  { q: "Does it work on Mac?", a: "Yes. Native support for Windows 10/11 and macOS 12+, including Apple Silicon." },
  { q: "Is my screen data stored?", a: "No. DataNauts uses peer-to-peer encrypted tunnels. Your screen data never passes through our servers." },
  { q: "What's the latency like?", a: "Under 50ms on Pro with a normal connection. Local network is even faster." },
  { q: "Can I use it on mobile data?", a: "Global network access (4G/5G/any internet) is included on Pro. Trial is local WiFi only." },
  { q: "How many devices can I connect?", a: "Pro supports unlimited devices. Trial is 1 desktop at a time." },
];

export function FAQ() {
  const ref = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section" ref={ref}>
      <div className="reveal">
        <span className="eyebrow">FAQ</span>
        <h2 className="h2">Common questions.</h2>
      </div>
      <div style={{ marginTop: 32, maxWidth: 720, display: "flex", flexDirection: "column", gap: 8 }}>
        {Q.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="card reveal" style={{ padding: 0 }}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  width: "100%", background: "transparent", border: "none", cursor: "pointer",
                  padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
                  color: "#fff", fontSize: 15, fontWeight: 500, textAlign: "left",
                }}>
                {it.q}
                {isOpen ? <Minus size={16} color="var(--orange)" /> : <Plus size={16} color="var(--muted)" />}
              </button>
              {isOpen && (
                <div style={{ padding: "0 20px 18px", fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
                  {it.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
