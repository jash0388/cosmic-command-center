export function Background() {
  // Minimal: no orbs, no noise. Just a subtle top gradient.
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background:
          "radial-gradient(1000px 500px at 50% -200px, rgba(255,122,0,0.06), transparent 70%)",
      }}
    />
  );
}
