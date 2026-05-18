import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/download", label: "Download" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(11,11,11,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "background 150ms ease, border-color 150ms ease",
      }}
    >
      <div className="mx-auto flex items-center justify-between" style={{ maxWidth: 1200, height: 60, padding: "0 24px" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Logo />
          <span style={{ fontWeight: 700, fontSize: 16, color: "#fff", letterSpacing: "-0.01em" }}>DataNauts</span>
        </Link>

        <nav className="hidden md:flex" style={{ alignItems: "center", gap: 8 }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="btn-ghost-sm">{l.label}</a>
          ))}
        </nav>

        <div className="hidden md:flex" style={{ alignItems: "center", gap: 8 }}>
          <Link to="/auth/login" className="btn-ghost-sm">Log in</Link>
          <Link to="/auth/register" className="btn-primary">Get started</Link>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen(v => !v)}
          className="md:hidden"
          style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden" style={{
          background: "rgba(11,11,11,0.96)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          padding: "16px 24px 24px",
          display: "flex", flexDirection: "column", gap: 6,
        }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ color: "#fff", padding: "10px 12px", borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <Link to="/auth/login" className="btn-secondary btn-full" onClick={() => setOpen(false)}>Log in</Link>
            <Link to="/auth/register" className="btn-primary btn-full" onClick={() => setOpen(false)}>Get started</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 6,
      background: "var(--orange)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      color: "#0b0b0b", fontWeight: 800, fontSize: size * 0.6,
      letterSpacing: "-0.05em",
    }}>D</div>
  );
}
