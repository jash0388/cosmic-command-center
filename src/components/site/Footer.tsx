import { Github, Twitter } from "lucide-react";
import { Logo } from "./Navbar";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 0 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{
          display: "grid", gap: 32,
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Logo />
              <span style={{ fontWeight: 700, color: "#fff" }}>DataNauts</span>
            </div>
            <p style={{ marginTop: 10, fontSize: 13, color: "var(--muted)", maxWidth: 220 }}>
              Remote desktop control, without the friction.
            </p>
          </div>
          <FooterCol title="Product" links={[["Features", "/#features"], ["Pricing", "/#pricing"], ["Download", "/download"]]} />
          <FooterCol title="Company" links={[["Dashboard", "/dashboard"], ["Log in", "/auth/login"], ["Sign up", "/auth/register"]]} />
          <FooterCol title="Legal" links={[["Privacy", "/legal/privacy"], ["Terms", "/legal/terms"]]} />
        </div>

        <div style={{
          marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--border)",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          fontSize: 12, color: "var(--muted)",
        }}>
          <div>© 2026 DataNauts · A product by Big Brain</div>
          <div style={{ display: "flex", gap: 14 }}>
            <a href="#" style={{ color: "var(--muted)" }}><Twitter size={16} /></a>
            <a href="#" style={{ color: "var(--muted)" }}><Github size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {links.map(([l, h]) => (
          <a key={l} href={h} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>{l}</a>
        ))}
      </div>
    </div>
  );
}
