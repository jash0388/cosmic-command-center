import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/site/Background";
import { Navbar } from "@/components/site/Navbar";
import { Download } from "@/components/site/Download";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/download")({
  head: () => ({ meta: [
    { title: "Download DataNauts — Windows, Mac, iOS, Android" },
    { name: "description", content: "Download DataNauts for every platform. One account, every device." },
  ] }),
  component: () => (
    <div style={{ background: "#05050a", minHeight: "100vh", position: "relative" }}>
      <Background />
      <Navbar />
      <main style={{ position: "relative", zIndex: 2, paddingTop: 80 }}>
        <section className="section" style={{ paddingBottom: 0, textAlign: "center" }}>
          <h1 className="h-hero" style={{ fontSize: "clamp(40px, 6vw, 64px)" }}>
            Get DataNauts <span className="text-grad">everywhere.</span>
          </h1>
        </section>
        <Download />
      </main>
      <Footer />
    </div>
  ),
});
