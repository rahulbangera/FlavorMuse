// src/pages/Contact.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";

const mail = (addr, subject, body) =>
  `mailto:${addr}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export default function Contact() {
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
            <h1 className="text-2xl">Contact</h1>
            <p className="mt-1 text-white/60">Reach out for support, feedback, or privacy requests.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="btn text-sm"
                href={mail(
                  "gurudattajr@gmail.com",
                  "EPIC Support",
                  "Describe your question or issue:\n\n• What happened?\n• What did you expect?\n• Steps to reproduce:\n• Device/Browser:\n"
                )}
                aria-label="Email support"
              >
                Email support
              </a>

              <a
                className="btn text-sm"
                href={mail(
                  "gurudattajr@gmail.com",
                  "Bug Report",
                  "Issue summary:\n\n• Steps to reproduce:\n• Expected result:\n• Actual result:\n• Screenshots/links (if any):\n• Device/Browser:\n"
                )}
                aria-label="Report a bug"
              >
                Report a bug
              </a>

              <a
                className="btn text-sm"
                href={mail(
                  "gurudattajr@gmail.com",
                  "Privacy Request",
                  "Choose one:\n• Access my data\n• Export my data\n• Correct my data\n• Restrict processing\n\nInclude account email and any relevant details:\n"
                )}
                aria-label="Privacy request"
              >
                Privacy request
              </a>

              <a
                className="btn text-sm"
                href={mail(
                  "gurudattajr@gmail.com",
                  "Account Deletion",
                  "Please delete my account associated with this email.\n\nConfirmation email:\nAdditional notes (optional):\n"
                )}
                aria-label="Account deletion"
              >
                Account deletion
              </a>
            </div>

            <div className="mt-6 text-sm text-white/60">
              <p>If an email app does not open, copy this address: <span className="text-white">gurudattajr@gmail.com</span></p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
