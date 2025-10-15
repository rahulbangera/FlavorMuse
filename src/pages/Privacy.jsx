// src/pages/Privacy.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Privacy() {
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
            <h1 className="text-2xl">Privacy Policy</h1>
            <p className="mt-1 text-white/60 text-sm">Last updated {new Date().toLocaleDateString()}</p>

            <h2 className="mt-6 text-xl">Overview</h2>
            <section className="mt-3 space-y-4">
              <p>EPIC is a text‑only reading experience; personal data collection is kept to the minimum needed to operate the site.</p>
              <p>We do not sell personal data; we process information only for legitimate purposes such as security, performance, and user‑requested features.</p>
            </section>

            <h2 className="mt-6 text-xl">Data we collect</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>Technical logs: IP address, device/browser metadata, and error diagnostics to maintain security and reliability.</p>
              <p>Usage events: page views, search queries, and performance metrics to improve reading quality and speed.</p>
              <p>Account data (only if sign‑in is enabled): basic profile and identifiers from the chosen auth provider.</p>
            </section>

            <h2 className="mt-6 text-xl">How we use data</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>Operate and secure the service, prevent abuse, and troubleshoot issues.</p>
              <p>Measure engagement to improve typography, layout, and search for study purposes.</p>
              <p>Comply with legal obligations and enforce our Terms.</p>
            </section>

            <h2 className="mt-6 text-xl">Sharing</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>Service providers: hosting, analytics, logging, and security vendors under appropriate safeguards.</p>
              <p>Legal requirements: disclosures to comply with applicable law, regulation, or legal process.</p>
              <p>No sale of personal data.</p>
            </section>

            <h2 className="mt-6 text-xl">Retention</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>We retain personal data only as long as necessary for the purposes above and to meet legal/accounting requirements.</p>
              <p>Logs and diagnostics are rotated and deleted on a schedule aligned with security and operational needs.</p>
            </section>

            <h2 className="mt-6 text-xl">Your choices</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>Where applicable, requests for access, correction, or deletion can be made via the Contact page.</p>
              <p>If sign‑in is enabled, account deletion or disconnecting an auth provider removes associated profile data subject to legal holds.</p>
            </section>

            <h2 className="mt-6 text-xl">Children</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>EPIC is intended for general audiences; it should not be used by children where consent requirements apply without guardian supervision.</p>
            </section>

            <h2 className="mt-6 text-xl">Security</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>We use reasonable technical and organizational measures; no method of transmission or storage is 100% secure.</p>
            </section>

            <h2 className="mt-6 text-xl">International</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>Data may be processed in locations outside India by service providers, subject to appropriate protections and contracts.</p>
            </section>

            <h2 className="mt-6 text-xl">India DPDP Act context</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>We aim to follow principles under India’s Digital Personal Data Protection Act, including lawful basis, purpose limitation, and data minimization.</p>
              <p>As rules and notifications evolve, we will update this Policy to reflect compliance obligations where applicable.</p>
            </section>

            <h2 className="mt-6 text-xl">Changes</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>We may update this Policy; material updates will be signaled by the “Last updated” date and reflected on this page.</p>
            </section>

            <h2 className="mt-6 text-xl">Contact</h2>
            <section className="mt-3 space-y-3 text-white/90">
              <p>Questions or privacy requests can be submitted through the Contact page.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
