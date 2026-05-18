import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/site/Background";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({ meta: [{ title: "Terms — DataNauts" }] }),
  component: () => (
    <div style={{ background: "#05050a", minHeight: "100vh", position: "relative" }}>
      <Background /><Navbar />
      <main className="section" style={{ paddingTop: 160, maxWidth: 760, position: "relative", zIndex: 2 }}>
        <h1 className="h2" style={{ color: "#fff" }}>Terms of Service</h1>
        <div className="glass-card" style={{ marginTop: 32, fontFamily: "DM Sans", color: "rgba(240,240,255,0.65)", lineHeight: 1.8, fontSize: 15 }}>
          <p>By using DataNauts you agree to use the service responsibly and only on devices you are authorized to control.</p>
          <p style={{ marginTop: 16 }}>This is placeholder copy. Replace with your full terms before launch.</p>
        </div>
      </main>
      <Footer />
    </div>
  ),
});
