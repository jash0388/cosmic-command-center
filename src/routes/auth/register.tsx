import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/Navbar";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "Sign up — DataNauts" }] }),
  component: Register,
});

function Register() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div className="card" style={{ width: "100%", maxWidth: 400, padding: 32 }}>
        <Link to="/" style={{ display: "flex", justifyContent: "center", gap: 8, alignItems: "center", textDecoration: "none" }}>
          <Logo />
          <span style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>DataNauts</span>
        </Link>
        <h2 style={{ marginTop: 20, fontSize: 22, fontWeight: 700, color: "#fff", textAlign: "center" }}>Create your account</h2>
        <p style={{ marginTop: 4, fontSize: 14, color: "var(--muted)", textAlign: "center" }}>Free for 7 days · no card</p>
        <form style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }} onSubmit={(e) => e.preventDefault()}>
          <input className="input-field" placeholder="Full name" type="text" />
          <input className="input-field" placeholder="Email" type="email" />
          <input className="input-field" placeholder="Password" type="password" />
          <button type="submit" className="btn-primary btn-full" style={{ marginTop: 8 }}>Create account</button>
        </form>
        <div style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: "var(--muted)" }}>
          Already have one? <Link to="/auth/login" style={{ color: "var(--orange)", textDecoration: "none" }}>Log in</Link>
        </div>
      </div>
    </div>
  );
}
