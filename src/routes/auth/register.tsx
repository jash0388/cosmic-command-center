import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/lib/auth-store";
import { Logo } from "@/components/site/Navbar";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "Sign up — DataNauts" }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (user) navigate({ to: "/dashboard" }); }, [user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { display_name: name },
      },
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Account created");
    navigate({ to: "/dashboard" });
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div className="card" style={{ width: "100%", maxWidth: 400, padding: 32 }}>
        <Link to="/" style={{ display: "flex", justifyContent: "center", gap: 8, alignItems: "center", textDecoration: "none" }}>
          <Logo />
          <span style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>DataNauts</span>
        </Link>
        <h2 style={{ marginTop: 20, fontSize: 22, fontWeight: 700, color: "#fff", textAlign: "center" }}>Create your account</h2>
        <p style={{ marginTop: 4, fontSize: 14, color: "var(--muted)", textAlign: "center" }}>Free for 7 days · no card</p>
        <form style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }} onSubmit={onSubmit}>
          <input className="input-field" placeholder="Full name" type="text" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          <input className="input-field" placeholder="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          <input className="input-field" placeholder="Password (min 6 chars)" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          <button type="submit" disabled={loading} className="btn-primary btn-full" style={{ marginTop: 8, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>
        <div style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: "var(--muted)" }}>
          Already have one? <Link to="/auth/login" style={{ color: "var(--orange)", textDecoration: "none" }}>Log in</Link>
        </div>
      </div>
    </div>
  );
}
