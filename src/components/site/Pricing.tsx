import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Check } from "lucide-react";

function Feat({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "DM Sans", fontSize: 14, color: "rgba(240,240,255,0.7)", padding: "8px 0" }}>
      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Check size={11} color="#4ade80" strokeWidth={3} />
      </span>
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
      <div className="text-center reveal">
        <span className="mono-label">Pricing</span>
        <h2 className="h2" style={{ color: "#fff" }}>
          Honest pricing.<br/>
          <span className="text-grad">No surprises.</span>
        </h2>
        <p style={{ marginTop: 18, fontFamily: "DM Sans", fontSize: 17, color: "rgba(240,240,255,0.5)" }}>
          Start free. Upgrade when you need it.
        </p>

        <div style={{ marginTop: 36, display: "inline-flex", alignItems: "center", gap: 10 }}>
          <div style={{
            display: "inline-flex",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 999,
            padding: 4,
            backdropFilter: "blur(12px)",
          }}>
            {(["Monthly", "Yearly"] as const).map((label, i) => {
              const active = (i === 1) === yearly;
              return (
                <button
                  key={label}
                  onClick={() => setYearly(i === 1)}
                  style={{
                    border: "none",
                    background: active ? "#fff" : "transparent",
                    color: active ? "#05050a" : "rgba(240,240,255,0.6)",
                    padding: "8px 22px",
                    borderRadius: 999,
                    fontFamily: "Syne", fontWeight: 600, fontSize: 13,
                    cursor: "pointer",
                    transition: "all 0.25s var(--ease)",
                  }}
                >{label}</button>
              );
            })}
          </div>
          {yearly && (
            <span style={{
              fontFamily: "JetBrains Mono", fontSize: 11,
              background: "rgba(74,222,128,0.15)", color: "#4ade80",
              border: "1px solid rgba(74,222,128,0.3)",
              borderRadius: 999, padding: "4px 12px",
            }}>SAVE 20%</span>
          )}
        </div>
      </div>

      <div style={{
        marginTop: 56, maxWidth: 900, margin: "56px auto 0",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 20,
      }}>
        {/* Trial */}
        <div className="glass-card hoverable reveal">
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, letterSpacing: "0.15em", color: "rgba(240,240,255,0.5)" }}>TRIAL</div>
          <div style={{ marginTop: 16, fontFamily: "Syne", fontWeight: 800, fontSize: 52, color: "#fff", lineHeight: 1 }}>Free</div>
          <div style={{ marginTop: 8, fontFamily: "DM Sans", fontSize: 13, color: "rgba(240,240,255,0.5)" }}>7 days · No card needed</div>
          <div style={{ marginTop: 22, height: 1, background: "rgba(255,255,255,0.06)" }} />
          <ul style={{ marginTop: 18, listStyle: "none", padding: 0 }}>
            <Feat>Basic Remote Control</Feat>
            <Feat>Local Network Only</Feat>
            <Feat>Standard Latency</Feat>
            <Feat>1 Device</Feat>
            <Feat>QR Pairing</Feat>
          </ul>
          <a href="/auth/register" className="btn-ghost btn-full" style={{ marginTop: 24 }}>Start for Free</a>
        </div>

        {/* Pro */}
        <div className="glass-card featured reveal" style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, letterSpacing: "0.15em", color: "#6ee7f7" }}>PRO</span>
            <span style={{
              background: "linear-gradient(135deg, #4f8ef7, #9b6dff)",
              borderRadius: 999, padding: "3px 12px",
              fontFamily: "JetBrains Mono", fontSize: 10, fontWeight: 600,
              color: "#fff", textTransform: "uppercase",
              boxShadow: "0 0 16px rgba(79,142,247,0.4)",
            }}>Most Popular</span>
          </div>
          <div style={{ marginTop: 16, display: "flex", alignItems: "baseline", gap: 4 }}>
            <span className="text-grad" style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 72, lineHeight: 1 }}>${price}</span>
            <span style={{ fontFamily: "Syne", fontWeight: 400, fontSize: 24, color: "rgba(240,240,255,0.5)" }}>/mo</span>
          </div>
          <div style={{ marginTop: 8, fontFamily: "DM Sans", fontSize: 13, color: "rgba(240,240,255,0.5)" }}>
            Billed {yearly ? "yearly" : "monthly"} · Cancel anytime
          </div>
          <div style={{ marginTop: 22, height: 1, background: "rgba(255,255,255,0.06)" }} />
          <ul style={{ marginTop: 18, listStyle: "none", padding: 0 }}>
            <Feat>Global Access (Any Network)</Feat>
            <Feat>High-FPS Streaming</Feat>
            <Feat>Ultra-Low Latency (&lt;50ms)</Feat>
            <Feat>Advanced Touch Gestures</Feat>
            <Feat>Priority Support</Feat>
            <Feat>Unlimited Devices</Feat>
            <Feat>Early Access to New Features</Feat>
          </ul>
          <a href="/auth/register" className="btn-primary btn-full" style={{ marginTop: 24 }}>Get Pro →</a>
          <div style={{ marginTop: 12, textAlign: "center", fontFamily: "DM Sans", fontSize: 12, color: "rgba(240,240,255,0.4)" }}>
            🔒 Secured by Stripe. Cancel anytime.
          </div>
        </div>
      </div>

      <p style={{ marginTop: 32, textAlign: "center", fontFamily: "DM Sans", fontSize: 14, color: "rgba(240,240,255,0.5)" }}>
        All plans include end-to-end encryption. Always.
      </p>
    </section>
  );
}
