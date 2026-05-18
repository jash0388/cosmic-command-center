import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/site/Background";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({ meta: [{ title: "Privacy — DataNauts" }] }),
  component: () => (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Background /><Navbar />
      <main className="section" style={{ paddingTop: 140, maxWidth: 760, position: "relative", zIndex: 1 }}>
        <h1 className="h2">Privacy Policy</h1>
        <div className="card" style={{ marginTop: 24, color: "var(--muted)", lineHeight: 1.7, fontSize: 14 }}>
          <p>DataNauts uses peer-to-peer encrypted tunnels. Your screen data never passes through our servers. We collect only the minimal account information needed to operate your account.</p>
          <p style={{ marginTop: 14 }}>This is placeholder copy. Replace with your full policy before launch.</p>
        </div>
      </main>
      <Footer />
    </div>
  ),
});
