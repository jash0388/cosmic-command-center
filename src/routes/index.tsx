import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/site/Background";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Features } from "@/components/site/Features";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Download } from "@/components/site/Download";
import { Pricing } from "@/components/site/Pricing";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DataNauts — Remote desktop control, without the friction" },
      { name: "description", content: "Control your PC or Mac from any device. Scan a QR, you're in. Encrypted by default. Works on Windows, Mac, iOS and Android." },
      { property: "og:title", content: "DataNauts — Remote desktop, reinvented" },
      { property: "og:description", content: "Encrypted, instant remote control for every device." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div style={{ minHeight: "100vh", position: "relative", color: "var(--text)" }}>
      <Background />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Marquee />
        <Features />
        <HowItWorks />
        <Download />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
