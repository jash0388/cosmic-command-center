import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="section">
      <div className="card" style={{ padding: 48, textAlign: "center" }}>
        <h2 className="h2">Ready to take control?</h2>
        <p style={{ marginTop: 12, fontSize: 16, color: "var(--muted)" }}>
          Free for 7 days. No credit card required.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
          <Link to="/auth/register" className="btn-primary btn-lg">Start free <ArrowRight size={16} /></Link>
          <Link to="/download" className="btn-secondary btn-lg">Download app</Link>
        </div>
      </div>
    </section>
  );
}
