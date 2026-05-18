import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/site/Background";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({ meta: [{ title: "Privacy — DataNauts" }] }),
  component: () => (
    <div style={{ background: "#05050a", minHeight: "100vh", position: "relative" }}>
      <Background /><Navbar />
      <main className="section" style={{ paddingTop: 160, maxWidth: 760, position: "relative", zIndex: 2 }}>
        <h1 className="h2" style={{ color: "#fff" }}>Privacy Policy</h1>
        <div className="glass-card" style={{ marginTop: 32, fontFamily: "DM Sans", color: "rgba(240,240,255,0.65)", lineHeight: 1.8, fontSize: 15 }}>
          <p>DataNauts uses peer-to-peer encrypted tunnels. Your screen data never passes through our servers. We collect only minimal account information needed to operate your account.</p>
          <p style={{ marginTop: 16 }}>This is placeholder copy. Replace with your full policy before launch.</p>
        </div>
      </main>
      <Footer />
    </div>
  ),
});
