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
  component: DownloadPage,
});

function DownloadPage() {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Background />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, paddingTop: 100 }}>
        <section className="section" style={{ paddingBottom: 0 }}>
          <h1 className="h-hero" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
            Get DataNauts <span style={{ color: "var(--orange)" }}>everywhere.</span>
          </h1>
          <p style={{ marginTop: 14, fontSize: 16, color: "var(--muted)", maxWidth: 520 }}>
            Download the desktop agent for the machine you want to control, then pair from mobile.
          </p>
        </section>
        <Download />
      </main>
      <Footer />
    </div>
  );
}
