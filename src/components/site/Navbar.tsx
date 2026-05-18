import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Rocket, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#features", label: "Features" },
    { href: "/#how", label: "How it Works" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/download", label: "Download" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,5,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-2">
          <Rocket
            size={16}
            className="text-[color:var(--blue)] transition-transform duration-300 group-hover:rotate-[15deg]"
          />
          <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: "-0.01em" }}>
            DataNauts
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] transition-colors duration-200"
              style={{ fontFamily: "DM Sans", fontWeight: 500, color: "rgba(240,240,255,0.65)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,240,255,0.65)")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/auth/login" className="btn-ghost" style={{ padding: "10px 22px", fontSize: 14 }}>
            Log in
          </Link>
          <Link to="/auth/register" className="btn-primary" style={{ padding: "11px 22px", fontSize: 14 }}>
            Get Started →
          </Link>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            inset: "68px 0 0 0",
            background: "rgba(5,5,10,0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            padding: 32,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 28, color: "#fff" }}
            >
              {l.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <Link to="/auth/login" className="btn-ghost btn-full" onClick={() => setOpen(false)}>Log in</Link>
            <Link to="/auth/register" className="btn-primary btn-full" onClick={() => setOpen(false)}>Get Started →</Link>
          </div>
        </div>
      )}
    </header>
  );
}
