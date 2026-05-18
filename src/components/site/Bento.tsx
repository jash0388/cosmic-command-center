import { useReveal } from "@/hooks/useReveal";
import { Wifi, Signal } from "lucide-react";

function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "JetBrains Mono", fontSize: 11, fontWeight: 500,
      letterSpacing: "0.15em", textTransform: "uppercase",
      color: "rgba(110,231,247,0.85)", marginBottom: 14,
    }}>{children}</div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return <h3 className="h3" style={{ color: "#fff", fontSize: 24 }}>{children}</h3>;
}

function QrAnim() {
  // 5x5 grid of squares animating in
  const cells = Array.from({ length: 25 });
  return (
    <div style={{
      marginTop: 22,
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: 6,
      maxWidth: 160,
    }}>
      {cells.map((_, i) => {
        const filled = [0,1,2,3,4,5,9,10,14,15,19,20,21,22,23,24].includes(i) || Math.random() > 0.5;
        return (
          <div
            key={i}
            style={{
              aspectRatio: "1",
              background: filled ? "#6ee7f7" : "transparent",
              border: filled ? "none" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 3,
              animation: `qr-fade 0.4s ${i * 60}ms ${i * 60}ms forwards both`,
              opacity: 0,
            }}
          />
        );
      })}
    </div>
  );
}

export function Bento() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section" ref={ref}>
      <div className="text-center reveal">
        <span className="mono-label">The Product</span>
        <h2 className="h2" style={{ color: "#fff" }}>See it in <span className="text-grad">action.</span></h2>
        <p style={{ marginTop: 18, fontFamily: "DM Sans", fontSize: 17, color: "rgba(240,240,255,0.5)" }}>
          One scan. Full control.
        </p>
      </div>

      <div className="bento-grid">
        {/* Box 1 - spans 2 cols */}
        <div className="glass-card hoverable reveal" style={{ gridColumn: "span 2", position: "relative", overflow: "hidden" }}>
          <MonoLabel>Real-time Control</MonoLabel>
          <Title>It just feels instant.</Title>
          <div style={{ marginTop: 22, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 64, color: "#4ade80", textShadow: "0 0 40px rgba(74,222,128,0.5)" }}>12</span>
                <span style={{ fontFamily: "JetBrains Mono", fontSize: 14, color: "rgba(240,240,255,0.5)" }}>ms</span>
              </div>
              <div style={{ marginTop: 6, fontFamily: "JetBrains Mono", fontSize: 12, color: "#4ade80" }}>Connected ✓</div>
            </div>
            <div style={{ position: "relative", width: 120, height: 120 }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  position: "absolute", inset: 0, margin: "auto", width: 24, height: 24,
                  borderRadius: "50%", border: "1px solid rgba(74,222,128,0.5)",
                  animation: `pulse-dot 2s ${i * 0.6}s infinite`,
                }} />
              ))}
              <span style={{
                position: "absolute", inset: 0, margin: "auto", width: 16, height: 16,
                borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 20px rgba(74,222,128,0.8)",
              }} />
            </div>
          </div>
          <div aria-hidden style={{
            position: "absolute", top: -100, right: -100, width: 300, height: 300,
            background: "radial-gradient(circle, rgba(79,142,247,0.18), transparent 70%)",
            pointerEvents: "none",
          }} />
        </div>

        {/* Box 2 - tall right */}
        <div className="glass-card hoverable reveal" style={{ gridRow: "span 2", position: "relative", display: "flex", flexDirection: "column" }}>
          <MonoLabel>Zero Knowledge</MonoLabel>
          <Title>We never see your screen.</Title>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", margin: "32px 0" }}>
            <div style={{ position: "relative", width: 140, height: 140 }}>
              <svg viewBox="0 0 100 100" width="140" height="140" style={{ position: "absolute", inset: 0 }}>
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(79,142,247,0.3)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: "spin-slow 16s linear infinite", transformOrigin: "50% 50%" }} />
                <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(155,109,255,0.3)" strokeWidth="1" strokeDasharray="2 6" style={{ animation: "spin-slow 22s linear infinite reverse", transformOrigin: "50% 50%" }} />
              </svg>
              <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="#6ee7f7" strokeWidth="1.5"
                   style={{ position: "absolute", inset: 0, margin: "auto", filter: "drop-shadow(0 0 16px rgba(110,231,247,0.6))" }}>
                <path d="M12 2L4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z" />
              </svg>
            </div>
          </div>
          <div style={{ textAlign: "center", fontFamily: "JetBrains Mono", fontSize: 12, color: "#6ee7f7", letterSpacing: "0.1em" }}>
            256-BIT AES ENCRYPTED
          </div>
        </div>

        {/* Box 3 */}
        <div className="glass-card hoverable reveal">
          <MonoLabel>Any Network</MonoLabel>
          <Title>WiFi. 4G. 5G. All of it.</Title>
          <div style={{ marginTop: 22, display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[{i: <Wifi size={20} />, l: "WiFi"}, {i: <Signal size={20} />, l: "4G"}, {i: <Signal size={20} />, l: "5G"}].map((x, k) => (
              <div key={k} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: 10, padding: "10px 14px",
                color: "#4ade80", fontFamily: "JetBrains Mono", fontSize: 12,
              }}>{x.i} {x.l} ✓</div>
            ))}
          </div>
        </div>

        {/* Box 4 spans 2 cols */}
        <div className="glass-card hoverable reveal" style={{ gridColumn: "span 2", position: "relative", overflow: "hidden" }}>
          <MonoLabel>Global Reach</MonoLabel>
          <Title>Control from anywhere on Earth.</Title>
          <div style={{ marginTop: 22, display: "flex", justifyContent: "center" }}>
            <svg viewBox="0 0 360 180" width="100%" style={{ maxWidth: 480 }}>
              <defs>
                <radialGradient id="globe" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(79,142,247,0.25)" />
                  <stop offset="100%" stopColor="rgba(79,142,247,0)" />
                </radialGradient>
              </defs>
              <circle cx="180" cy="90" r="80" fill="url(#globe)" />
              <circle cx="180" cy="90" r="80" fill="none" stroke="rgba(79,142,247,0.3)" strokeWidth="1" />
              {[0,1,2,3].map(i => (
                <ellipse key={i} cx="180" cy="90" rx="80" ry={20 + i*16} fill="none" stroke="rgba(79,142,247,0.15)" strokeWidth="0.7" />
              ))}
              <path d="M 90 130 Q 180 20 270 60" fill="none" stroke="#6ee7f7" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: "dash-travel 2s linear infinite" }} />
              <circle cx="90" cy="130" r="5" fill="#4f8ef7" style={{ filter: "drop-shadow(0 0 6px #4f8ef7)" }} />
              <circle cx="270" cy="60" r="5" fill="#9b6dff" style={{ filter: "drop-shadow(0 0 6px #9b6dff)" }} />
            </svg>
          </div>
        </div>

        {/* Box 5 */}
        <div className="glass-card hoverable reveal">
          <MonoLabel>Instant Pairing</MonoLabel>
          <Title>Scan. Connect. Done.</Title>
          <QrAnim />
        </div>
      </div>

      <style>{`
        .bento-grid {
          margin-top: 56px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: minmax(220px, auto);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-grid > * { grid-column: span 1 !important; grid-row: auto !important; }
        }
      `}</style>
    </section>
  );
}
