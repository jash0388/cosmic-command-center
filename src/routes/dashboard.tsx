import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  LayoutDashboard, Monitor, Activity, Settings, LogOut,
  Search, Bell, ChevronDown, Plus, QrCode, Wifi,
  Smartphone, MoreHorizontal, Menu, X, Copy, RefreshCw,
  Pencil, Trash2, PlayCircle, PauseCircle, Check,
} from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/site/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/lib/auth-store";
import {
  useAddDevice, useDeleteDevice, useDevices, useUpdateDevice, type Device,
} from "@/lib/hooks/useDevices";
import { useEndSession, useSessions, useStartSession, useLiveLatency, type DeviceSession } from "@/lib/hooks/useSessions";
import { usePairingCode, useRedeemPairingCode } from "@/lib/hooks/usePairingCode";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — DataNauts" }] }),
  component: Dashboard,
});

type Section = "overview" | "devices" | "activity" | "settings";

function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [section, setSection] = useState<Section>("overview");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Device["status"]>("all");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth/login" });
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: "var(--muted)", fontSize: 14 }}>
        Loading your workspace…
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex" }}>
      <aside className="dn-sidebar-desk">
        <SidebarContent section={section} setSection={setSection} />
      </aside>

      {sidebarOpen && (
        <div className="dn-sidebar-mobile" onClick={() => setSidebarOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 240, height: "100%", background: "var(--surface)", borderRight: "1px solid var(--border)" }}>
            <SidebarContent section={section} setSection={(s) => { setSection(s); setSidebarOpen(false); }} />
          </div>
        </div>
      )}

      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Topbar onMenu={() => setSidebarOpen(true)} search={search} setSearch={setSearch} />
        <div style={{ flex: 1, padding: "24px clamp(16px, 3vw, 32px)" }}>
          {section === "overview" && <Overview search={search} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />}
          {section === "devices" && <DevicesView search={search} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />}
          {section === "activity" && <ActivityView search={search} />}
          {section === "settings" && <SettingsView />}
        </div>
      </main>

      <style>{`
        .dn-sidebar-desk { width: 220px; flex-shrink: 0; border-right: 1px solid var(--border); background: var(--surface); display: flex; flex-direction: column; }
        .dn-sidebar-mobile { position: fixed; inset: 0; z-index: 60; background: rgba(0,0,0,0.5); display: flex; }
        @media (max-width: 900px) { .dn-sidebar-desk { display: none; } }
        .dn-menu-btn { display: none; }
        @media (max-width: 900px) { .dn-menu-btn { display: inline-flex !important; } }
        .dn-search-wrap { flex: 1; max-width: 360px; }
        @media (max-width: 640px) { .dn-search-wrap { max-width: none; } .dn-search-label { display: none; } }
        .dn-pop { position: absolute; right: 0; top: calc(100% + 6px); background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 6px; min-width: 180px; z-index: 30; box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
        .dn-pop button { width: 100%; text-align: left; }
      `}</style>
    </div>
  );
}

function SidebarContent({ section, setSection }: { section: Section; setSection: (s: Section) => void }) {
  const user = useAuthStore((s) => s.user);
  const items: { id: Section; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "devices", label: "Devices", icon: Monitor },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  async function onLogout() {
    await supabase.auth.signOut();
    toast.success("Signed out");
  }

  const initial = (user?.user_metadata?.display_name || user?.email || "U").toString().charAt(0).toUpperCase();

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
            <button key={id} onClick={() => setSection(id)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8,
              background: active ? "rgba(236,72,153,0.12)" : "transparent",
              color: active ? "#fff" : "var(--muted)",
              border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, textAlign: "left",
              transition: "background 80ms linear, color 80ms linear",
            }}>
              <Icon size={16} color={active ? "var(--pink)" : "currentColor"} />
              {label}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: 12, borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 8, borderRadius: 8, background: "var(--surface-2)" }}>
          <div style={{ width: 30, height: 30, borderRadius: 999, background: "var(--gradient-primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>{initial}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: "#fff", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.user_metadata?.display_name || user?.email}
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>Free plan</div>
          </div>
          <button onClick={onLogout} className="btn-ghost-sm" style={{ padding: 4 }} aria-label="Log out" title="Log out"><LogOut size={14} /></button>
        </div>
      </div>
    </>
  );
}

function Topbar({ onMenu, search, setSearch }: { onMenu: () => void; search: string; setSearch: (s: string) => void }) {
  const user = useAuthStore((s) => s.user);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const initial = (user?.user_metadata?.display_name || user?.email || "U").toString().charAt(0).toUpperCase();

  async function onLogout() {
    await supabase.auth.signOut();
    toast.success("Signed out");
  }

  return (
    <header style={{ height: 56, borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12, padding: "0 16px", background: "var(--bg)", position: "sticky", top: 0, zIndex: 10 }}>
      <button className="dn-menu-btn btn-ghost-sm" onClick={onMenu} style={{ padding: 6 }} aria-label="Menu">
        <Menu size={18} />
      </button>
      <div className="dn-search-wrap" style={{ position: "relative" }}>
        <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
        <input className="input-field" placeholder="Search devices, sessions…" value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: 34, height: 34, fontSize: 13 }} />
      </div>
      <div style={{ flex: 1 }} />
      <button className="btn-ghost-sm" style={{ position: "relative", padding: 6 }} aria-label="Notifications" onClick={() => toast("No new notifications")}>
        <Bell size={16} />
      </button>
      <div ref={ref} style={{ position: "relative" }}>
        <button onClick={() => setOpen((o) => !o)} style={{
          display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "1px solid var(--border)",
          borderRadius: 8, padding: "4px 8px 4px 4px", cursor: "pointer", color: "#fff",
        }}>
          <span style={{ width: 24, height: 24, borderRadius: 999, background: "var(--gradient-primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{initial}</span>
          <span className="dn-search-label" style={{ fontSize: 13, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {user?.user_metadata?.display_name || user?.email}
          </span>
          <ChevronDown size={14} color="var(--muted)" />
        </button>
        {open && (
          <div className="dn-pop">
            <button className="btn-ghost-sm" style={{ width: "100%", justifyContent: "flex-start" }} onClick={() => { setOpen(false); onLogout(); }}>
              <LogOut size={14} /> Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

function filterDevices(list: Device[], q: string, status: "all" | Device["status"] = "all") {
  const s = q.trim().toLowerCase();
  return list.filter((d) => {
    if (status !== "all" && d.status !== status) return false;
    if (!s) return true;
    return d.name.toLowerCase().includes(s) || d.os.toLowerCase().includes(s) || d.status.includes(s) || d.type.includes(s);
  });
}

function StatusFilter({ value, onChange }: { value: "all" | Device["status"]; onChange: (v: "all" | Device["status"]) => void }) {
  const opts: { v: "all" | Device["status"]; label: string }[] = [
    { v: "all", label: "All" },
    { v: "online", label: "Online" },
    { v: "idle", label: "Idle" },
    { v: "offline", label: "Offline" },
  ];
  return (
    <div style={{ display: "inline-flex", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: 2 }}>
      {opts.map((o) => (
        <button key={o.v} onClick={() => onChange(o.v)} style={{
          padding: "4px 10px", fontSize: 12, fontWeight: 500, border: "none", borderRadius: 6, cursor: "pointer",
          background: value === o.v ? "var(--surface)" : "transparent",
          color: value === o.v ? "#fff" : "var(--muted)",
          transition: "background 80ms linear, color 80ms linear",
        }}>{o.label}</button>
      ))}
    </div>
  );
}

/* ---------- Overview ---------- */
function Overview({ search, statusFilter, setStatusFilter }: { search: string; statusFilter: "all" | Device["status"]; setStatusFilter: (s: "all" | Device["status"]) => void }) {
  const user = useAuthStore((s) => s.user);
  const { data: devices = [], isLoading: dLoading, error: dError } = useDevices();
  const { data: sessions = [], isLoading: sLoading, error: sError } = useSessions();
  const [addOpen, setAddOpen] = useState(false);
  const [pairOpen, setPairOpen] = useState(false);

  const visibleDevices = useMemo(() => filterDevices(devices, search, statusFilter), [devices, search, statusFilter]);

  const activeDeviceIds = useMemo(
    () => sessions.filter((s) => !s.ended_at).map((s) => s.device_id),
    [sessions]
  );
  useLiveLatency(activeDeviceIds);

  const online = devices.filter((d) => d.status === "online");
  const avgLatency = online.length ? Math.round(online.reduce((a, d) => a + d.latency_ms, 0) / online.length) : 0;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const sessionsToday = sessions.filter((s) => new Date(s.started_at) >= today).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Overview</h1>
          <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 2 }}>
            Welcome back, {user?.user_metadata?.display_name || user?.email?.split("@")[0]}.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-secondary" onClick={() => setPairOpen(true)}><QrCode size={14} /> Pair with code</button>
          <button className="btn-primary" onClick={() => setAddOpen(true)}><Plus size={14} /> Add device</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <StatCard label="Devices online" value={dLoading ? "—" : `${online.length} / ${devices.length}`} delta={dLoading ? " " : `${devices.length - online.length} offline`} />
        <StatCard label="Average latency" value={online.length ? `${avgLatency} ms` : "—"} delta={online.length ? "all green" : "no live devices"} tint={online.length ? "var(--green)" : undefined} />
        <StatCard label="Sessions today" value={sLoading ? "—" : String(sessionsToday)} delta={sessions.length ? `${sessions.length} total` : "no sessions yet"} />
        <StatCard label="Active session" value={String(sessions.filter((s) => !s.ended_at).length)} delta="open right now" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        <QuickConnect onOpenPair={() => setPairOpen(true)} />
        <RecentSessions sessions={sessions} devices={devices} loading={sLoading} error={sError as Error | null} />
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottom: "1px solid var(--border)" }}>
          <h3 className="h3">Your devices</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <StatusFilter value={statusFilter} onChange={setStatusFilter} />
            <span style={{ fontSize: 12, color: "var(--muted)" }}>{visibleDevices.length} of {devices.length}</span>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <DeviceTable devices={visibleDevices} loading={dLoading} error={dError as Error | null} onAdd={() => setAddOpen(true)} />
        </div>
      </div>

      {addOpen && <AddDeviceModal onClose={() => setAddOpen(false)} />}
      {pairOpen && <PairCodeModal onClose={() => setPairOpen(false)} />}
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

/* ---------- Quick connect (QR pairing) ---------- */
function QuickConnect({ onOpenPair }: { onOpenPair: () => void }) {
  const { code, remaining, ttl, copied, loading, regenerate, copy } = usePairingCode();
  const pct = (remaining / ttl) * 100;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=0&bgcolor=ffffff&color=0a0b14&data=${encodeURIComponent(`datanauts://pair?code=${code}`)}`;

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 className="h3">Quick connect</h3>
        <span style={{ fontSize: 11, color: remaining < 10 ? "var(--pink)" : "var(--muted)", fontFamily: "JetBrains Mono" }}>
          {loading ? "ISSUING…" : `EXPIRES IN ${remaining}s`}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: 14, border: "1px dashed var(--border-strong)", borderRadius: 10 }}>
        <div style={{ width: 80, height: 80, borderRadius: 8, background: "#fff", padding: 4, flexShrink: 0, display: "grid", placeItems: "center" }}>
          {loading ? (
            <QrCode size={40} color="#0a0b14" />
          ) : (
            <img src={qrSrc} alt={`QR code for ${code}`} width={72} height={72} style={{ display: "block" }} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#fff", fontFamily: "JetBrains Mono", fontSize: 18, fontWeight: 600, letterSpacing: "0.05em" }}>{code}</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Scan from phone, or enter manually to pair.</div>
          <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
            <button className="btn-ghost-sm" style={{ padding: "4px 8px" }} onClick={copy} disabled={loading}>
              {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
            </button>
            <button className="btn-ghost-sm" style={{ padding: "4px 8px" }} onClick={regenerate} disabled={loading}>
              <RefreshCw size={12} /> New code
            </button>
            <button className="btn-ghost-sm" style={{ padding: "4px 8px", color: "var(--blue)" }} onClick={onOpenPair}>
              Enter code →
            </button>
          </div>
        </div>
      </div>
      <div style={{ height: 3, background: "var(--surface-2)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: remaining < 10 ? "var(--pink)" : "var(--orange)", transition: "width 1s linear" }} />
      </div>
    </div>
  );
}

function RecentSessions({ sessions, devices, loading, error }: { sessions: DeviceSession[]; devices: Device[]; loading: boolean; error: Error | null }) {
  const recent = sessions.slice(0, 5);
  const nameFor = (id: string) => devices.find((d) => d.id === id)?.name ?? "Unknown device";
  return (
    <div className="card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 className="h3">Recent sessions</h3>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>{sessions.length} total</span>
      </div>
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column" }}>
        {loading && <SkeletonRows />}
        {!loading && error && (
          <div style={{ fontSize: 13, color: "#ef4444", padding: "16px 0", textAlign: "center" }}>
            Couldn't load sessions: {error.message}
          </div>
        )}
        {!loading && !error && recent.length === 0 && (
          <div style={{ fontSize: 13, color: "var(--muted)", padding: "16px 0", textAlign: "center" }}>
            No sessions yet. Start one from the Devices tab.
          </div>
        )}
        {!error && recent.map((s, i) => (
          <div key={s.id} style={{
            display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 12,
            padding: "10px 0", borderBottom: i < recent.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{nameFor(s.device_id)}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>
                {new Date(s.started_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · {formatDuration(s)}
              </div>
            </div>
            <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: s.ended_at ? "var(--muted)" : "var(--green)" }}>
              {s.ended_at ? `${s.latency_ms}ms` : "live"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDuration(s: DeviceSession) {
  if (!s.ended_at) return "in progress";
  const total = s.duration_seconds;
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m`;
  return `${total}s`;
}

function SkeletonRows() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ height: 36, borderRadius: 8, background: "var(--surface-2)", opacity: 0.6 }} />
      ))}
    </div>
  );
}

/* ---------- Device table ---------- */
function DeviceTable({ devices, loading, error, onAdd }: { devices: Device[]; loading: boolean; error: Error | null; onAdd: () => void }) {
  if (loading) return <div style={{ padding: 16 }}><SkeletonRows /></div>;
  if (error) return (
    <div style={{ padding: 24, fontSize: 13, color: "#ef4444" }}>
      Failed to load devices: {error.message}
    </div>
  );
  if (devices.length === 0) {
    return (
      <div style={{ padding: "32px 24px", textAlign: "center" }}>
        <Monitor size={28} color="var(--muted)" style={{ margin: "0 auto" }} />
        <div style={{ color: "#fff", marginTop: 12, fontWeight: 500 }}>No devices yet</div>
        <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>Add your first device to start controlling it remotely.</div>
        <button className="btn-primary" style={{ marginTop: 16 }} onClick={onAdd}><Plus size={14} /> Add device</button>
      </div>
    );
  }
  return (
    <table className="tbl">
      <thead>
        <tr>
          <th>Device</th><th>OS</th><th>Status</th><th>Latency</th><th>Last seen</th><th style={{ width: 60 }}></th>
        </tr>
      </thead>
      <tbody>
        {devices.map((d) => <DeviceRow key={d.id} device={d} />)}
      </tbody>
    </table>
  );
}

function DeviceRow({ device }: { device: Device }) {
  const start = useStartSession();
  const end = useEndSession();
  const update = useUpdateDevice();
  const del = useDeleteDevice();
  const sessions = useSessions();
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(device.name);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [menuOpen]);

  const activeSession = sessions.data?.find((s) => s.device_id === device.id && !s.ended_at);

  async function toggleConnect() {
    if (activeSession) {
      try {
        await end.mutateAsync({ sessionId: activeSession.id, deviceId: device.id, startedAt: activeSession.started_at });
        toast.success(`Disconnected from ${device.name}`);
      } catch (e) { toast.error((e as Error).message); }
    } else {
      try {
        await start.mutateAsync(device.id);
        toast.success(`Connected to ${device.name}`);
      } catch (e) { toast.error((e as Error).message); }
    }
  }

  async function saveRename() {
    const trimmed = name.trim();
    if (!trimmed || trimmed === device.name) { setRenaming(false); setName(device.name); return; }
    try {
      await update.mutateAsync({ id: device.id, patch: { name: trimmed } });
      toast.success("Device renamed");
    } catch (e) { toast.error((e as Error).message); }
    setRenaming(false);
  }

  async function onDelete() {
    if (!confirm(`Remove "${device.name}"? This will delete its session history.`)) return;
    try {
      await del.mutateAsync(device.id);
      toast.success("Device removed");
    } catch (e) { toast.error((e as Error).message); }
  }

  return (
    <tr>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {device.type === "desktop" ? <Monitor size={14} color="var(--muted)" /> : <Smartphone size={14} color="var(--muted)" />}
          {renaming ? (
            <input className="input-field" value={name} onChange={(e) => setName(e.target.value)}
              onBlur={saveRename}
              onKeyDown={(e) => { if (e.key === "Enter") saveRename(); if (e.key === "Escape") { setRenaming(false); setName(device.name); } }}
              autoFocus style={{ height: 28, padding: "4px 8px", fontSize: 13, maxWidth: 200 }} />
          ) : (
            <span style={{ color: "#fff", fontWeight: 500 }}>{device.name}</span>
          )}
        </div>
      </td>
      <td style={{ color: "var(--muted)" }}>{device.os}</td>
      <td><StatusBadge status={device.status} /></td>
      <td style={{ fontFamily: "JetBrains Mono", color: device.status === "offline" ? "var(--muted)" : "#fff" }}>
        {device.status === "offline" ? "—" : `${device.latency_ms}ms`}
      </td>
      <td style={{ color: "var(--muted)" }}>{relativeTime(device.last_seen_at)}</td>
      <td style={{ textAlign: "right" }}>
        <div style={{ display: "inline-flex", gap: 4, position: "relative" }} ref={ref}>
          <button
            className="btn-ghost-sm"
            style={{ padding: "4px 8px", color: activeSession ? "var(--green)" : "#fff" }}
            disabled={start.isPending || end.isPending}
            onClick={toggleConnect}
            title={activeSession ? "Disconnect" : "Connect"}
          >
            {activeSession ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
          </button>
          <button className="btn-ghost-sm" style={{ padding: 4 }} onClick={() => setMenuOpen((o) => !o)} aria-label="More"><MoreHorizontal size={14} /></button>
          {menuOpen && (
            <div className="dn-pop">
              <button className="btn-ghost-sm" onClick={() => { setMenuOpen(false); setRenaming(true); }}>
                <Pencil size={12} /> Rename
              </button>
              <button className="btn-ghost-sm" onClick={() => { setMenuOpen(false); onDelete(); }} style={{ color: "#ef4444" }}>
                <Trash2 size={12} /> Remove
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

function StatusBadge({ status }: { status: Device["status"] }) {
  const map = {
    online: { color: "var(--green)", label: "Online" },
    idle: { color: "#eab308", label: "Idle" },
    offline: { color: "#6b7280", label: "Offline" },
  } as const;
  const c = map[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: c.color }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: c.color }} />
      {c.label}
    </span>
  );
}

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

/* ---------- Add device modal ---------- */
function AddDeviceModal({ onClose }: { onClose: () => void }) {
  const add = useAddDevice();
  const [name, setName] = useState("");
  const [type, setType] = useState<"desktop" | "mobile">("desktop");
  const [os, setOs] = useState("macOS");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await add.mutateAsync({ name: name.trim(), type, os });
      toast.success("Device added");
      onClose();
    } catch (e) { toast.error((e as Error).message); }
  }

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 70, display: "grid", placeItems: "center", padding: 16 }}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}
        className="card" style={{ width: "100%", maxWidth: 400, padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 className="h3">Add a device</h3>
          <button type="button" className="btn-ghost-sm" onClick={onClose} style={{ padding: 4 }} aria-label="Close"><X size={16} /></button>
        </div>
        <label style={{ fontSize: 12, color: "var(--muted)" }}>Name
          <input className="input-field" placeholder="e.g. MAC-STUDIO" value={name} onChange={(e) => setName(e.target.value)} autoFocus style={{ marginTop: 4 }} />
        </label>
        <label style={{ fontSize: 12, color: "var(--muted)" }}>Type
          <select className="input-field" value={type} onChange={(e) => setType(e.target.value as "desktop" | "mobile")} style={{ marginTop: 4 }}>
            <option value="desktop">Desktop</option>
            <option value="mobile">Mobile</option>
          </select>
        </label>
        <label style={{ fontSize: 12, color: "var(--muted)" }}>Operating system
          <select className="input-field" value={os} onChange={(e) => setOs(e.target.value)} style={{ marginTop: 4 }}>
            <option>macOS</option>
            <option>Windows 11</option>
            <option>Windows 10</option>
            <option>Ubuntu</option>
            <option>iOS</option>
            <option>Android</option>
          </select>
        </label>
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button type="button" className="btn-secondary btn-full" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary btn-full" disabled={add.isPending || !name.trim()}>
            {add.isPending ? "Adding…" : "Add device"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- Devices view ---------- */
function DevicesView({ search, statusFilter, setStatusFilter }: { search: string; statusFilter: "all" | Device["status"]; setStatusFilter: (s: "all" | Device["status"]) => void }) {
  const { data: devices = [], isLoading, error } = useDevices();
  const [addOpen, setAddOpen] = useState(false);
  const [pairOpen, setPairOpen] = useState(false);
  const visible = useMemo(() => filterDevices(devices, search, statusFilter), [devices, search, statusFilter]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Devices</h1>
          <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 2 }}>
            {isLoading ? "Loading…" : `${visible.length} of ${devices.length} devices${search || statusFilter !== "all" ? " (filtered)" : ""}`}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-secondary" onClick={() => setPairOpen(true)}><QrCode size={14} /> Pair with code</button>
          <button className="btn-primary" onClick={() => setAddOpen(true)}><Plus size={14} /> Add device</button>
        </div>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 14px", borderBottom: "1px solid var(--border)" }}>
          <StatusFilter value={statusFilter} onChange={setStatusFilter} />
        </div>
        <div style={{ overflowX: "auto" }}>
          <DeviceTable devices={visible} loading={isLoading} error={error as Error | null} onAdd={() => setAddOpen(true)} />
        </div>
      </div>
      {addOpen && <AddDeviceModal onClose={() => setAddOpen(false)} />}
      {pairOpen && <PairCodeModal onClose={() => setPairOpen(false)} />}
    </div>
  );
}

/* ---------- Activity ---------- */
function ActivityView({ search }: { search: string }) {
  const { data: sessions = [], isLoading, error } = useSessions();
  const { data: devices = [] } = useDevices();
  const nameFor = (id: string) => devices.find((d) => d.id === id)?.name ?? "Unknown";

  const visible = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return sessions;
    return sessions.filter((x) => {
      const name = nameFor(x.device_id).toLowerCase();
      const state = x.ended_at ? "closed" : "live";
      return name.includes(s) || state.includes(s) || String(x.latency_ms).includes(s);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions, devices, search]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Activity</h1>
        <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 2 }}>
          {isLoading ? "Loading…" : `${visible.length} session${visible.length === 1 ? "" : "s"}`}
        </p>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {isLoading && <div style={{ padding: 16 }}><SkeletonRows /></div>}
        {!isLoading && error && (
          <div style={{ padding: 24, fontSize: 13, color: "#ef4444", textAlign: "center" }}>
            Couldn't load activity: {error.message}
          </div>
        )}
        {!isLoading && !error && visible.length === 0 && (
          <div style={{ padding: "32px 24px", textAlign: "center" }}>
            <Activity size={28} color="var(--muted)" style={{ margin: "0 auto" }} />
            <div style={{ color: "#fff", marginTop: 12, fontWeight: 500 }}>No activity{search ? " matches your search" : " yet"}</div>
            <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
              {search ? "Try a different search." : "Connect to a device from the Devices tab to start a session."}
            </div>
          </div>
        )}
        {!isLoading && !error && visible.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead>
                <tr><th>Device</th><th>Started</th><th>Duration</th><th>Latency</th><th>Connection</th></tr>
              </thead>
              <tbody>
                {visible.map((s) => (
                  <tr key={s.id}>
                    <td style={{ color: "#fff", fontWeight: 500 }}>{nameFor(s.device_id)}</td>
                    <td style={{ color: "var(--muted)" }}>{new Date(s.started_at).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}</td>
                    <td style={{ color: "var(--muted)" }}>{formatDuration(s)}</td>
                    <td style={{ fontFamily: "JetBrains Mono", color: "#fff" }}>{s.latency_ms}ms</td>
                    <td>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: s.ended_at ? "var(--muted)" : "var(--green)", fontSize: 12 }}>
                        <Wifi size={12} /> {s.ended_at ? "Closed" : "Live · encrypted"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Settings ---------- */
function SettingsView() {
  const user = useAuthStore((s) => s.user);
  const [name, setName] = useState((user?.user_metadata?.display_name as string) || "");
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ data: { display_name: name } });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Profile updated");
  }

  async function onLogout() {
    await supabase.auth.signOut();
    toast.success("Signed out");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Settings</h1>
        <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 2 }}>Manage your account.</p>
      </div>
      <form className="card" onSubmit={save}>
        <h3 className="h3">Profile</h3>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          <label style={{ fontSize: 12, color: "var(--muted)" }}>Display name
            <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} style={{ marginTop: 4 }} />
          </label>
          <label style={{ fontSize: 12, color: "var(--muted)" }}>Email
            <input className="input-field" value={user?.email ?? ""} disabled style={{ marginTop: 4, opacity: 0.7 }} />
          </label>
          <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }} disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
      <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h3 className="h3">Sign out</h3>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>End your session on this browser.</div>
        </div>
        <button className="btn-secondary" onClick={onLogout}><LogOut size={14} /> Log out</button>
      </div>
    </div>
  );
}