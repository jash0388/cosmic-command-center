import { ArrowRight, Wifi, Activity, Monitor, Smartphone } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section style={{ position: "relative", paddingTop: 140, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 56, alignItems: "center",
        }} className="hero-grid">
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 999, padding: "5px 12px", fontSize: 12, color: "var(--muted)",
              marginBottom: 24,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--green)" }} />
              v1.2 · Live across Windows, Mac, iOS &amp; Android
            </div>

            <h1 className="h-hero">
              Remote control,<br />
              <span style={{ color: "var(--orange)" }}>without the friction.</span>
            </h1>

            <p style={{ marginTop: 18, fontSize: 17, color: "var(--muted)", lineHeight: 1.6, maxWidth: 520 }}>
              DataNauts lets you connect to your PC or Mac from any device. Scan a QR, you&apos;re in. Encrypted by default. No IP setup, no port forwarding.
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
              <Link to="/auth/register" className="btn-primary btn-lg">
                Start free <ArrowRight size={16} />
              </Link>
              <Link to="/download" className="btn-secondary btn-lg">Download app</Link>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 28, color: "var(--muted)", fontSize: 13 }}>
              <span>★★★★★</span>
              <span>Trusted by 2,400+ teams</span>
            </div>
          </div>

          <div style={{ minWidth: 0 }}>
            <DashboardMock />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

function DashboardMock() {
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
    }}>
      {/* titlebar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 14px", borderBottom: "1px solid var(--border)",
        background: "#0e0e0e",
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#ff5f57" }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#febc2e" }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#28c840" }} />
        </div>
        <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "var(--muted)" }}>
          datanauts.app/devices
        </div>
        <div style={{ width: 40 }} />
      </div>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {/* stat row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          <Stat label="Active" value="3" tint="var(--green)" />
          <Stat label="Latency" value="14ms" />
          <Stat label="Devices" value="5" />
        </div>

        {/* device list */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          <DeviceRow icon={<Monitor size={14} />} name="MAC-STUDIO" status="online" latency="12ms" />
          <DeviceRow icon={<Monitor size={14} />} name="WIN-OFFICE" status="online" latency="44ms" />
          <DeviceRow icon={<Smartphone size={14} />} name="iPhone 15" status="online" latency="18ms" last />
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 12px", border: "1px solid var(--border)", borderRadius: 10,
          background: "#0e0e0e",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 12 }}>
            <Activity size={14} color="var(--orange)" />
            Session active · MAC-STUDIO
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
            <Wifi size={14} color="var(--green)" /> <span style={{ color: "var(--green)" }}>Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, tint }: { label: string; value: string; tint?: string }) {
  return (
    <div style={{ background: "#0e0e0e", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px" }}>
      <div style={{ fontSize: 11, color: "var(--muted)" }}>{label}</div>
      <div style={{ marginTop: 2, fontSize: 18, fontWeight: 700, color: tint ?? "#fff" }}>{value}</div>
    </div>
  );
}

function DeviceRow({ icon, name, status, latency, last }: { icon: React.ReactNode; name: string; status: string; latency: string; last?: boolean }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "auto 1fr auto auto", alignItems: "center", gap: 10,
      padding: "10px 12px", borderBottom: last ? "none" : "1px solid var(--border)",
      fontSize: 13,
    }}>
      <span style={{ color: "var(--muted)" }}>{icon}</span>
      <span style={{ color: "#fff", fontWeight: 500 }}>{name}</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--green)", fontSize: 12 }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--green)" }} />
        {status}
      </span>
      <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "var(--muted)" }}>{latency}</span>
    </div>
  );
}
