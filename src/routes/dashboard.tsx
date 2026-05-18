import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Monitor, Activity, Settings, LogOut,
  Search, Bell, ChevronDown, Plus, QrCode, Wifi,
  Smartphone, MoreHorizontal, ArrowUpRight, Menu, X,
} from "lucide-react";
import { Logo } from "@/components/site/Navbar";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — DataNauts" }] }),
  component: Dashboard,
});

type Device = {
  name: string;
  type: "desktop" | "mobile";
  os: string;
  status: "online" | "offline" | "idle";
  latency: number;
  lastSeen: string;
};

const DEVICES: Device[] = [
  { name: "MAC-STUDIO", type: "desktop", os: "macOS 14.4", status: "online", latency: 12, lastSeen: "now" },
  { name: "WIN-OFFICE", type: "desktop", os: "Windows 11", status: "online", latency: 44, lastSeen: "now" },
  { name: "MACBOOK-PRO", type: "desktop", os: "macOS 14.4", status: "idle", latency: 28, lastSeen: "2m ago" },
  { name: "iPhone 15 Pro", type: "mobile", os: "iOS 17.4", status: "online", latency: 18, lastSeen: "now" },
  { name: "WIN-HOME", type: "desktop", os: "Windows 11", status: "offline", latency: 0, lastSeen: "yesterday" },
];

const SESSIONS = [
  { device: "MAC-STUDIO", duration: "1h 24m", latency: "12ms", started: "10:32" },
  { device: "WIN-OFFICE", duration: "22m", latency: "44ms", started: "09:48" },
  { device: "MACBOOK-PRO", duration: "3h 02m", latency: "28ms", started: "Yesterday" },
  { device: "iPhone 15 Pro", duration: "14m", latency: "18ms", started: "Yesterday" },
];

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [section, setSection] = useState<"overview" | "devices" | "activity" | "settings">("overview");

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex" }}>
      {/* Sidebar - desktop */}
      <aside className="dn-sidebar-desk">
        <SidebarContent section={section} setSection={setSection} />
      </aside>

      {/* Sidebar - mobile drawer */}
      {sidebarOpen && (
        <div className="dn-sidebar-mobile" onClick={() => setSidebarOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            width: 240, height: "100%", background: "var(--surface)",
            borderRight: "1px solid var(--border)",
          }}>
            <SidebarContent section={section} setSection={(s) => { setSection(s); setSidebarOpen(false); }} />
          </div>
        </div>
      )}

      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Topbar onMenu={() => setSidebarOpen(true)} />
        <div style={{ flex: 1, padding: "24px clamp(16px, 3vw, 32px)" }}>
          {section === "overview" && <Overview />}
          {section === "devices" && <DevicesView />}
          {section === "activity" && <ActivityView />}
          {section === "settings" && <SettingsView />}
        </div>
      </main>

      <style>{`
        .dn-sidebar-desk {
          width: 220px; flex-shrink: 0;
          border-right: 1px solid var(--border);
          background: var(--surface);
          display: flex; flex-direction: column;
        }
        .dn-sidebar-mobile {
          position: fixed; inset: 0; z-index: 60;
          background: rgba(0,0,0,0.5); display: flex;
        }
        @media (max-width: 900px) {
          .dn-sidebar-desk { display: none; }
        }
        .dn-menu-btn { display: none; }
        @media (max-width: 900px) {
          .dn-menu-btn { display: inline-flex !important; }
        }
        .dn-search-wrap { flex: 1; max-width: 360px; }
        @media (max-width: 640px) {
          .dn-search-wrap { max-width: none; }
          .dn-search-label { display: none; }
        }
      `}</style>
    </div>
  );
}

function SidebarContent({ section, setSection }: {
  section: string;
  setSection: (s: any) => void;
}) {
  const items = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "devices", label: "Devices", icon: Monitor },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
  ];
  return (
    <>
      <div style={{ padding: 16, borderBottom: "1px solid var(--border)" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Logo />
          <span style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>DataNauts</span>
        </Link>
      </div>

      <nav style={{ padding: 12, display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {items.map(({ id, label, icon: Icon }) => {
          const active = section === id;
          return (
            <button key={id} onClick={() => setSection(id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 10px", borderRadius: 8,
                background: active ? "rgba(255,122,0,0.1)" : "transparent",
                color: active ? "#fff" : "var(--muted)",
                border: "none", cursor: "pointer",
                fontSize: 14, fontWeight: 500, textAlign: "left",
                position: "relative",
                transition: "background 120ms ease, color 120ms ease",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
              {active && <span style={{ position: "absolute", left: -12, top: 8, bottom: 8, width: 2, background: "var(--orange)", borderRadius: 2 }} />}
              <Icon size={16} color={active ? "var(--orange)" : "currentColor"} />
              {label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: 12, borderTop: "1px solid var(--border)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: 8, borderRadius: 8, background: "var(--surface-2)",
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 999,
            background: "var(--orange)", color: "#0b0b0b",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 13,
          }}>J</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: "#fff", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis" }}>Jashwanth</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>Pro plan</div>
          </div>
          <button className="btn-ghost-sm" style={{ padding: 4 }} aria-label="Log out"><LogOut size={14} /></button>
        </div>
      </div>
    </>
  );
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header style={{
      height: 56, borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center", gap: 12,
      padding: "0 16px", background: "var(--bg)",
      position: "sticky", top: 0, zIndex: 10,
    }}>
      <button className="dn-menu-btn btn-ghost-sm" onClick={onMenu} style={{ padding: 6 }} aria-label="Menu">
        <Menu size={18} />
      </button>

      <div className="dn-search-wrap" style={{ position: "relative" }}>
        <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
        <input className="input-field" placeholder="Search devices, sessions…"
          style={{ paddingLeft: 34, height: 34, fontSize: 13 }} />
      </div>

      <div style={{ flex: 1 }} />

      <button className="btn-ghost-sm" style={{ position: "relative", padding: 6 }} aria-label="Notifications">
        <Bell size={16} />
        <span style={{ position: "absolute", top: 4, right: 4, width: 6, height: 6, borderRadius: 999, background: "var(--orange)" }} />
      </button>

      <button style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "transparent", border: "1px solid var(--border)",
        borderRadius: 8, padding: "4px 8px 4px 4px",
        cursor: "pointer", color: "#fff",
      }}>
        <span style={{
          width: 24, height: 24, borderRadius: 999, background: "var(--orange)", color: "#0b0b0b",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700,
        }}>J</span>
        <span className="dn-search-label" style={{ fontSize: 13 }}>Jashwanth</span>
        <ChevronDown size={14} color="var(--muted)" />
      </button>
    </header>
  );
}

function Overview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Overview</h1>
          <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 2 }}>Welcome back, Jashwanth.</p>
        </div>
        <button className="btn-primary"><Plus size={14} /> Add device</button>
      </div>

      {/* stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <StatCard label="Active sessions" value="3" delta="+1 today" />
        <StatCard label="Average latency" value="14 ms" delta="all green" tint="var(--green)" />
        <StatCard label="Devices online" value="4 / 5" delta="1 offline" />
        <StatCard label="Data this month" value="2.4 GB" delta="−12% vs last" />
      </div>

      {/* quick connect + recent */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 className="h3">Quick connect</h3>
            <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "JetBrains Mono" }}>PAIR · NEW</span>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: 14, border: "1px dashed var(--border-strong)", borderRadius: 10,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 8, background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <QrCode size={48} color="#0b0b0b" />
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 500, fontSize: 14 }}>Scan from mobile</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Code refreshes every 30 seconds</div>
              <button className="btn-ghost-sm" style={{ marginTop: 6, padding: "4px 8px" }}>Generate new code</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 className="h3">Recent sessions</h3>
            <a href="#" style={{ fontSize: 12, color: "var(--muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
              View all <ArrowUpRight size={12} />
            </a>
          </div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column" }}>
            {SESSIONS.map((s, i) => (
              <div key={s.device} style={{
                display: "grid", gridTemplateColumns: "1fr auto auto", alignItems: "center", gap: 12,
                padding: "10px 0", borderBottom: i < SESSIONS.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>{s.device}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{s.started} · {s.duration}</div>
                </div>
                <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "var(--muted)" }}>{s.latency}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* device table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottom: "1px solid var(--border)" }}>
          <h3 className="h3">Your devices</h3>
          <button className="btn-ghost-sm">Manage</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <DeviceTable />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, delta, tint }: { label: string; value: string; delta: string; tint?: string }) {
  return (
    <div className="card">
      <div style={{ fontSize: 12, color: "var(--muted)" }}>{label}</div>
      <div style={{ marginTop: 6, fontSize: 24, fontWeight: 700, color: tint ?? "#fff" }}>{value}</div>
      <div style={{ marginTop: 4, fontSize: 12, color: "var(--muted)" }}>{delta}</div>
    </div>
  );
}

function DeviceTable() {
  return (
    <table className="tbl">
      <thead>
        <tr>
          <th>Device</th>
          <th>OS</th>
          <th>Status</th>
          <th>Latency</th>
          <th>Last seen</th>
          <th style={{ width: 80 }}></th>
        </tr>
      </thead>
      <tbody>
        {DEVICES.map(d => (
          <tr key={d.name}>
            <td>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {d.type === "desktop"
                  ? <Monitor size={14} color="var(--muted)" />
                  : <Smartphone size={14} color="var(--muted)" />}
                <span style={{ color: "#fff", fontWeight: 500 }}>{d.name}</span>
              </div>
            </td>
            <td style={{ color: "var(--muted)" }}>{d.os}</td>
            <td><StatusBadge status={d.status} /></td>
            <td style={{ fontFamily: "JetBrains Mono", color: d.status === "offline" ? "var(--muted)" : "#fff" }}>
              {d.status === "offline" ? "—" : `${d.latency}ms`}
            </td>
            <td style={{ color: "var(--muted)" }}>{d.lastSeen}</td>
            <td style={{ textAlign: "right" }}>
              <button className="btn-ghost-sm" style={{ padding: 4 }} aria-label="More"><MoreHorizontal size={14} /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function StatusBadge({ status }: { status: Device["status"] }) {
  const map = {
    online: { color: "var(--green)", label: "Online" },
    idle: { color: "#eab308", label: "Idle" },
    offline: { color: "#6b7280", label: "Offline" },
  };
  const c = map[status];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 12, color: c.color,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: c.color }} />
      {c.label}
    </span>
  );
}

function DevicesView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Devices</h1>
          <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 2 }}>{DEVICES.length} devices linked to your account</p>
        </div>
        <button className="btn-primary"><Plus size={14} /> Add device</button>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <DeviceTable />
        </div>
      </div>
    </div>
  );
}

function ActivityView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Activity</h1>
        <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 2 }}>Recent sessions across all devices</p>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Device</th><th>Started</th><th>Duration</th><th>Latency</th><th>Connection</th>
              </tr>
            </thead>
            <tbody>
              {SESSIONS.concat(SESSIONS).map((s, i) => (
                <tr key={i}>
                  <td style={{ color: "#fff", fontWeight: 500 }}>{s.device}</td>
                  <td style={{ color: "var(--muted)" }}>{s.started}</td>
                  <td style={{ color: "var(--muted)" }}>{s.duration}</td>
                  <td style={{ fontFamily: "JetBrains Mono", color: "#fff" }}>{s.latency}</td>
                  <td>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--green)", fontSize: 12 }}>
                      <Wifi size={12} /> Encrypted
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Settings</h1>
        <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 2 }}>Manage your account preferences</p>
      </div>
      <div className="card">
        <h3 className="h3">Profile</h3>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          <input className="input-field" defaultValue="Jashwanth" />
          <input className="input-field" defaultValue="jashwanth@datanauts.app" />
          <button className="btn-primary" style={{ alignSelf: "flex-start" }}>Save changes</button>
        </div>
      </div>
      <div className="card">
        <h3 className="h3">Plan</h3>
        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 600 }}>Pro · $9 / month</div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Renews May 18, 2026</div>
          </div>
          <button className="btn-secondary">Manage billing</button>
        </div>
      </div>
    </div>
  );
}
