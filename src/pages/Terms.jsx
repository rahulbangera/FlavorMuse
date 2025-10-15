// src/pages/Terms.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="h-full w-full bg-[url('/images/mahabharata-bg.jpg')] bg-cover bg-center opacity-15"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_60%)]"></div>
      </div>

      <Header />

      <main className="flex-1">
        <div className="container-xl py-12">
          <div className="glass p-6 rounded-2xl border border-white/10">
            <h1 className="text-2xl">Terms of Service</h1>
            <p className="mt-1 text-white/60 text-sm">Last updated {new Date().toLocaleDateString()}</p>

            <section className="mt-6 space-y-4">
              <p>EPIC is a reading experience for the Bhagavad Gita that presents Sanskrit, transliteration, and translation for personal, non‑commercial study.</p>
              <p>By accessing EPIC, continued use constitutes acceptance of these Terms; features may evolve, and updates to these Terms will be posted here.</p>
            </section>

            <h2 className="mt-8 text-xl">Allowed use</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>Personal, non‑commercial reading and study of presented text is permitted.</p>
              <p>Reasonable, non‑automated browsing and search is allowed; do not scrape or mirror the site.</p>
              <p>Respect all stated licenses or attributions that may accompany specific text resources.</p>
            </section>

            <h2 className="mt-8 text-xl">Prohibited conduct</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>No unlawful, infringing, or harmful activity, including attempts to disrupt or bypass security.</p>
              <p>No automated scraping, bulk exporting, or rehosting without prior written permission.</p>
              <p>No misrepresentation of EPIC content as original research or commercial product claims.</p>
            </section>

            <h2 className="mt-8 text-xl">Intellectual property</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>UI design, layout, and code of EPIC are owned by EPIC unless otherwise indicated.</p>
              <p>Scriptural text may include public domain material or licensed translations; rights remain with respective owners.</p>
              <p>Any trademarks or logos displayed remain the property of their respective holders.</p>
            </section>

            <h2 className="mt-8 text-xl">No audio features</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>EPIC currently provides a text‑only experience; listening, streaming, or audio downloads are not offered.</p>
            </section>

            <h2 className="mt-8 text-xl">Disclaimers</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>EPIC is provided on an “as‑is” basis without warranties of any kind to the fullest extent permitted by law.</p>
              <p>EPIC does not guarantee error‑free or uninterrupted availability and may modify or discontinue features at any time.</p>
              <p>Study guidance is informational and not a substitute for qualified teaching or legal advice.</p>
            </section>

            <h2 className="mt-8 text-xl">Limitation of liability</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>To the maximum extent permitted by law, EPIC will not be liable for indirect, incidental, special, or consequential damages.</p>
              <p>Total liability for any claims related to the service will not exceed amounts paid (if any) for access during the preceding three months.</p>
            </section>

            <h2 className="mt-8 text-xl">Termination</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>Access may be suspended or terminated at any time for any reason, including suspected violations of these Terms.</p>
            </section>

            <h2 className="mt-8 text-xl">Governing law</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>These Terms are governed by the laws of India; venue and jurisdiction lie in courts located in Karnataka, India.</p>
            </section>

            <h2 className="mt-8 text-xl">Changes</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>EPIC may update these Terms; material changes will be indicated by updating the “Last updated” date at the top of this page.</p>
            </section>

            <h2 className="mt-8 text-xl">Contact</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>For questions about these Terms, reach out via the Contact page.</p>
              <p className="text-white/50 text-xs">This content is informational and not legal advice; consider consulting qualified counsel for specific needs.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
