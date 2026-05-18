import { Link } from "@tanstack/react-router";
import { Github, Twitter, Rocket } from "lucide-react";

export function Footer() {
  return (
    <footer style={{
      background: "rgba(0,0,0,0.4)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "64px 0 40px",
      position: "relative",
      zIndex: 2,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 40,
          alignItems: "start",
        }}>
          {/* Col 1 */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Rocket size={16} color="#4f8ef7" />
              <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 20, color: "#fff" }}>DataNauts</span>
            </div>
            <p style={{ marginTop: 12, fontFamily: "DM Sans", fontSize: 14, color: "rgba(240,240,255,0.5)", maxWidth: 240 }}>
              Command your digital universe.
            </p>
          </div>

          {/* Col 2 - Big Brain badge */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="big-brain-wrap">
              <div className="big-brain-badge">
                <span className="brain-emoji">🧠</span>
                <div>
                  <div style={{ fontFamily: "Syne", fontWeight: 600, fontSize: 14, color: "rgba(240,240,255,0.9)" }}>
                    A product by Big Brain
                  </div>
                  <div style={{ marginTop: 2, fontFamily: "DM Sans", fontSize: 12, color: "rgba(240,240,255,0.45)" }}>
                    Built by Jashwanth &amp; Team 🚀
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, justifySelf: "end" }}>
            <div>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, letterSpacing: "0.15em", color: "rgba(240,240,255,0.4)", textTransform: "uppercase", marginBottom: 14 }}>Product</div>
              <FooterLink href="/#features">Features</FooterLink>
              <FooterLink href="/#pricing">Pricing</FooterLink>
              <FooterLink href="/download">Download</FooterLink>
            </div>
            <div>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, letterSpacing: "0.15em", color: "rgba(240,240,255,0.4)", textTransform: "uppercase", marginBottom: 14 }}>Legal</div>
              <FooterLink href="/legal/privacy">Privacy</FooterLink>
              <FooterLink href="/legal/terms">Terms</FooterLink>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 48,
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <div style={{ fontFamily: "DM Sans", fontSize: 13, color: "rgba(240,240,255,0.35)" }}>
            © 2025 DataNauts. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <SocialIcon><Twitter size={18} /></SocialIcon>
            <SocialIcon><Github size={18} /></SocialIcon>
          </div>
        </div>
      </div>

      <style>{`
        .big-brain-wrap {
          position: relative;
          display: inline-block;
        }
        .big-brain-wrap::before {
          content: "";
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(ellipse, rgba(79,142,247,0.15) 0%, transparent 70%);
          pointer-events: none;
          animation: glow-pulse 3s ease-in-out infinite;
        }
        .big-brain-badge {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 14px 28px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.08),
            0 0 0 1px rgba(79,142,247,0.05);
          transition: all 0.3s ease;
          cursor: default;
        }
        .big-brain-badge:hover {
          border-color: rgba(79,142,247,0.3);
          background: rgba(79,142,247,0.06);
          box-shadow:
            0 8px 40px rgba(0,0,0,0.4),
            0 0 30px rgba(79,142,247,0.15),
            inset 0 1px 0 rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }
        .brain-emoji {
          font-size: 22px;
          display: inline-block;
          animation: brain-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "block",
        fontFamily: "DM Sans", fontSize: 14, color: "rgba(240,240,255,0.5)",
        textDecoration: "none", padding: "5px 0",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,240,255,0.5)")}
    >{children}</a>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      style={{
        color: "rgba(240,240,255,0.4)",
        transition: "all 0.2s",
        display: "inline-flex",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "scale(1.1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(240,240,255,0.4)"; e.currentTarget.style.transform = "scale(1)"; }}
    >{children}</a>
  );
}
