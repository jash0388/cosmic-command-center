import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/site/Background";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Features } from "@/components/site/Features";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Bento } from "@/components/site/Bento";
import { Download } from "@/components/site/Download";
import { Pricing } from "@/components/site/Pricing";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DataNauts — Control your PC from anywhere" },
      { name: "description", content: "Scan a QR code and you're connected. Instant, encrypted remote desktop control for Windows, Mac, iOS & Android. No IP addresses, no complex setup." },
      { property: "og:title", content: "DataNauts — Remote desktop, reinvented" },
      { property: "og:description", content: "Encrypted, instant remote control for every device. Start free." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div style={{ background: "#05050a", minHeight: "100vh", color: "#f0f0ff", position: "relative" }}>
      <Background />
      <Navbar />
      <main style={{ position: "relative", zIndex: 2 }}>
        <Hero />
        <Marquee />
        <Features />
        <HowItWorks />
        <Bento />
        <Download />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
