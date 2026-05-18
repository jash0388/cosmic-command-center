const NAMES = [
  "Acme Corp", "NovaBuild", "DevStudio", "TechFlow", "CloudBase",
  "Prismatic", "Vortex Labs", "DesignCo", "BuildPro", "LaunchPad",
  "GridStack", "PixelForge",
];

export function Marquee() {
  const items = [...NAMES, ...NAMES];
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "20px 0",
        overflow: "hidden",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 28,
          width: "max-content",
          animation: "marquee 40s linear infinite",
          fontFamily: "JetBrains Mono",
          fontSize: 12,
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.4)" }}>Trusted by teams at:</span>
        {items.map((n, i) => (
          <span key={i} style={{ display: "flex", gap: 28 }}>
            {n}<span>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
