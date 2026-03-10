"use client";

import { useState } from "react";
import { SiMaildotru, SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";

const socials = [
  { label: "Email",     sub: "josuahcastro1@gmail.com",           href: "mailto:josuahcastro1@gmail.com",                              icon: <SiMaildotru size={18} /> },
  { label: "LinkedIn",  sub: "patrick-josuah-castro",             href: "https://www.linkedin.com/in/patrick-josuah-castro-6aba2a27a/", icon: <SiLinkedin size={18} /> },
  { label: "GitHub",    sub: "github.com/PatriusCastro",          href: "https://github.com/PatriusCastro",                            icon: <SiGithub size={18} /> },
  { label: "Instagram", sub: "@_patissss",                        href: "https://instagram.com/_patissss",                             icon: <SiInstagram size={18} /> },
];

export default function Contact() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      id="contact"
      className="py-12 px-6 md:px-10 w-full mx-auto sm:rounded-xl mb-4"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left */}
        <div>
          <div className="section-label mb-4">contact</div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight"
            style={{ color: "var(--text)" }}
          >
            Let's Build<br />Something Good.
          </h2>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: "var(--text-sub)" }}>
            Open to freelance projects, full-time roles, and interesting collaborations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group"
                style={{ border: "1px solid var(--border)", background: "transparent", textDecoration: "none" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,0,139,0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="p-2 rounded-lg"
                    style={{ background: "rgba(0,0,139,0.07)", color: "var(--accent-dim)" }}
                  >
                    {s.icon}
                  </span>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{s.label}</div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>{s.sub}</div>
                  </div>
                </div>
                <FiExternalLink size={13} style={{ color: "var(--muted2)" }} />
              </a>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <form
          action="https://formspree.io/f/mpwjvezn"
          method="POST"
          className="flex flex-col gap-5"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const res = await fetch(form.action, {
              method: "POST", body: data, headers: { Accept: "application/json" },
            });
            if (res.ok) { setShowModal(true); form.reset(); }
          }}
        >
          {[
            { id: "email",   label: "EMAIL",   type: "email", placeholder: "your@email.com" },
            { id: "subject", label: "SUBJECT", type: "text",  placeholder: "Subject" },
          ].map(({ id, label, type, placeholder }) => (
            <label key={id} className="flex flex-col gap-2">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: "0.2em" }}>
                {label}
              </span>
              <input
                id={id} name={id} type={type} placeholder={placeholder} required
                className="form-input"
              />
            </label>
          ))}

          <label className="flex flex-col gap-2">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: "0.2em" }}>
              MESSAGE
            </span>
            <textarea
              id="message" name="message" rows={5} placeholder="Your message..." required
              className="form-input"
              style={{ resize: "none", maxHeight: 200 }}
            />
          </label>

          <button
            type="submit"
            className="btn-primary self-start"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            SEND MESSAGE →
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            className="rounded-xl p-8 text-center shadow-xl"
            style={{ background: "var(--surface)", border: "1px solid var(--border-hover)" }}
          >
            <div className="font-semibold mb-4" style={{ color: "var(--green)" }}>
              ✓ Message sent successfully.
            </div>
            <button
              className="btn-primary"
              style={{ fontFamily: "var(--font-mono)" }}
              onClick={() => setShowModal(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </section>
  );
}