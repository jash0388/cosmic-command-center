import { createFileRoute, Link } from "@tanstack/react-router";
import { Background } from "@/components/site/Background";
import { Rocket, Monitor, Settings, LogOut, Activity } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — DataNauts" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#05050a", position: "relative" }}>
      <Background />
      <aside style={{
        width: 240, padding: 24, position: "relative", zIndex: 2,
        background: "rgba(255,255,255,0.02)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column", gap: 24,
      }}>
        <Link to="/" style={{ display: "flex", gap: 8, alignItems: "center", textDecoration: "none" }}>
          <Rocket size={16} color="#4f8ef7" />
          <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18, color: "#fff" }}>DataNauts</span>
        </Link>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <NavItem icon={<Activity size={16} />} label="Overview" active />
          <NavItem icon={<Monitor size={16} />} label="Devices" />
          <NavItem icon={<Settings size={16} />} label="Settings" />
        </nav>
        <div style={{ marginTop: "auto", padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #4f8ef7, #9b6dff)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Syne", fontWeight: 700 }}>J</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "DM Sans", fontSize: 13, color: "#fff" }}>Jashwanth</div>
            <div style={{ fontFamily: "DM Sans", fontSize: 11, color: "rgba(240,240,255,0.4)" }}>Pro plan</div>
          </div>
          <LogOut size={14} color="rgba(240,240,255,0.4)" />
        </div>
      </aside>
      <main style={{ flex: 1, padding: 40, position: "relative", zIndex: 2 }}>
        <h1 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 28, color: "#fff" }}>Welcome back, Jashwanth</h1>
        <p style={{ marginTop: 8, fontFamily: "DM Sans", color: "rgba(240,240,255,0.5)" }}>Here's what's happening across your connected devices.</p>
        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          <Stat label="Active Sessions" value="3" delta="+1 today" />
          <Stat label="Avg. Latency" value="14ms" delta="all green" />
          <Stat label="Devices Online" value="5" delta="Win · Mac · iPad · iPhone · Pixel" />
        </div>
        <div className="glass-card" style={{ marginTop: 32 }}>
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, letterSpacing: "0.15em", color: "rgba(240,240,255,0.5)", textTransform: "uppercase" }}>Recent Sessions</div>
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
            {[["JASHWANTH-DESKTOP", "12ms", "now"], ["MACBOOK-PRO", "18ms", "2h ago"], ["WIN-OFFICE", "44ms", "yesterday"]].map(([n, l, t], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <span style={{ fontFamily: "DM Sans", color: "#fff", fontSize: 14 }}>{n}</span>
                <span style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "#6ee7f7" }}>{l}</span>
                <span style={{ fontFamily: "DM Sans", fontSize: 12, color: "rgba(240,240,255,0.4)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 14px", borderRadius: 10,
      background: active ? "rgba(79,142,247,0.08)" : "transparent",
      borderLeft: active ? "3px solid #4f8ef7" : "3px solid transparent",
      color: active ? "#fff" : "rgba(240,240,255,0.6)",
      fontFamily: "DM Sans", fontSize: 14, cursor: "pointer",
    }}>{icon}{label}</div>
  );
}

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="glass-card hoverable" style={{ padding: 22 }}>
      <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, letterSpacing: "0.15em", color: "rgba(240,240,255,0.5)", textTransform: "uppercase" }}>{label}</div>
      <div style={{ marginTop: 10, fontFamily: "Syne", fontWeight: 800, fontSize: 36, color: "#fff" }}>{value}</div>
      <div style={{ marginTop: 4, fontFamily: "DM Sans", fontSize: 12, color: "#4ade80" }}>{delta}</div>
    </div>
  );
}
