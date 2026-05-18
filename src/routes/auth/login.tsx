import { createFileRoute, Link } from "@tanstack/react-router";
import { Background } from "@/components/site/Background";
import { Rocket } from "lucide-react";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Log in — DataNauts" }] }),
  component: Login,
});

function Login() {
  return (
    <div style={{ minHeight: "100vh", background: "#05050a", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative" }}>
      <Background />
      <div className="glass-card" style={{ width: "100%", maxWidth: 440, padding: 48, position: "relative", zIndex: 2 }}>
        <Link to="/" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Rocket size={18} color="#4f8ef7" />
          <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 20, color: "#fff" }}>DataNauts</span>
        </Link>
        <h2 style={{ marginTop: 24, fontFamily: "Syne", fontWeight: 700, fontSize: 28, color: "#fff", textAlign: "center" }}>
          Enter Mission Control
        </h2>
        <form style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 14 }} onSubmit={(e) => e.preventDefault()}>
          <input className="input-field" placeholder="Email" type="email" />
          <input className="input-field" placeholder="Password" type="password" />
          <button type="submit" className="btn-primary btn-full" style={{ marginTop: 6 }}>Log in →</button>
        </form>
        <div style={{ margin: "24px 0", height: 1, background: "rgba(255,255,255,0.06)" }} />
        <div style={{ textAlign: "center", fontFamily: "DM Sans", fontSize: 14, color: "rgba(240,240,255,0.5)" }}>
          Don't have an account?{" "}
          <Link to="/auth/register" style={{ color: "#6ee7f7", textDecoration: "none" }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
