import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Check } from "lucide-react";

function Feat({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text)", padding: "6px 0" }}>
      <Check size={14} color="var(--green)" strokeWidth={3} />
      {children}
    </li>
  );
}

export function Pricing() {
  const ref = useReveal<HTMLDivElement>();
  const [yearly, setYearly] = useState(false);
  const price = yearly ? 7 : 9;

  return (
    <section id="pricing" className="section" ref={ref}>
      <div className="reveal" style={{ textAlign: "center" }}>
        <span className="eyebrow">Pricing</span>
        <h2 className="h2">Simple, honest pricing.</h2>
        <p style={{ marginTop: 12, fontSize: 16, color: "var(--muted)" }}>Start free. Upgrade when you need more.</p>

        <div style={{ display: "inline-flex", marginTop: 24, padding: 4, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 999 }}>
          {(["Monthly", "Yearly"] as const).map((label, i) => {
            const active = (i === 1) === yearly;
            return (
              <button key={label} onClick={() => setYearly(i === 1)}
                style={{
                  border: "none", padding: "6px 16px", borderRadius: 999,
                  background: active ? "#fff" : "transparent",
                  color: active ? "#0b0b0b" : "var(--muted)",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  transition: "background 120ms ease, color 120ms ease",
                }}>{label}</button>
            );
          })}
        </div>
      </div>

      <div style={{
        marginTop: 40, maxWidth: 880, marginInline: "auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 12,
      }}>
        <div className="card reveal" style={{ padding: 28 }}>
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "var(--muted)", letterSpacing: "0.15em" }}>FREE</div>
          <div style={{ marginTop: 10, fontSize: 40, fontWeight: 700 }}>$0<span style={{ fontSize: 16, color: "var(--muted)", fontWeight: 400 }}>/mo</span></div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>7-day trial · no card</div>
          <div style={{ height: 1, background: "var(--border)", margin: "20px 0" }} />
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <Feat>1 device</Feat>
            <Feat>Local network only</Feat>
            <Feat>QR pairing</Feat>
            <Feat>Standard latency</Feat>
          </ul>
          <a href="/auth/register" className="btn-secondary btn-full" style={{ marginTop: 24 }}>Start free</a>
        </div>

        <div className="card reveal" style={{ padding: 28, borderColor: "var(--orange)", position: "relative" }}>
          <div style={{ position: "absolute", top: -10, right: 20, background: "var(--orange)", color: "#0b0b0b", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>Most popular</div>
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "var(--orange)", letterSpacing: "0.15em" }}>PRO</div>
          <div style={{ marginTop: 10, fontSize: 40, fontWeight: 700 }}>${price}<span style={{ fontSize: 16, color: "var(--muted)", fontWeight: 400 }}>/mo</span></div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>Billed {yearly ? "yearly · save 20%" : "monthly"}</div>
          <div style={{ height: 1, background: "var(--border)", margin: "20px 0" }} />
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <Feat>Unlimited devices</Feat>
            <Feat>Global access (any network)</Feat>
            <Feat>Sub-50ms latency</Feat>
            <Feat>High-FPS streaming</Feat>
            <Feat>Priority support</Feat>
          </ul>
          <a href="/auth/register" className="btn-primary btn-full" style={{ marginTop: 24 }}>Get Pro</a>
        </div>
      </div>
    </section>
  );
}
