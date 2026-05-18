const NAMES = [
  "Acme", "NovaBuild", "Linear", "TechFlow", "CloudBase",
  "Prismatic", "Vortex Labs", "DesignCo", "BuildPro", "LaunchPad",
  "GridStack", "PixelForge",
];

export function Marquee() {
  const items = [...NAMES, ...NAMES];
  return (
    <div style={{
      borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
      padding: "16px 0", overflow: "hidden", position: "relative",
    }}>
      <div style={{
        display: "flex", gap: 40, width: "max-content",
        animation: "marquee 50s linear infinite",
        fontFamily: "JetBrains Mono", fontSize: 12, color: "var(--muted)",
        whiteSpace: "nowrap", alignItems: "center",
      }}>
        <span style={{ color: "#fff", paddingLeft: 24 }}>Trusted by teams at</span>
        {items.map((n, i) => <span key={i}>{n}</span>)}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}
