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
      className="py-12 px-6 md:px-10 w-full mx-auto sm:rounded-xl mb-4 bg-[var(--surface)] border border-[var(--border)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left */}
        <div>
          <div className="section-label mb-4">contact</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight text-[var(--text)]">
            Let's Build<br />Something Good.
          </h2>
          <p className="text-sm mb-8 leading-relaxed text-[var(--text-sub)]">
            Open to freelance projects, full-time roles, and interesting collaborations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-[var(--border)] no-underline transition-all duration-200 hover:bg-[rgba(0,0,139,0.05)] hover:border-[var(--border-hover)] min-w-0 overflow-hidden"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="p-2 rounded-lg bg-[rgba(0,0,139,0.07)] text-[var(--accent-dim)] shrink-0">{s.icon}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[var(--text)]">{s.label}</div>
                    <div className="text-xs text-[var(--muted)] truncate" title={s.sub}>{s.sub}</div>
                  </div>
                </div>
                <FiExternalLink size={13} className="text-[var(--muted2)] shrink-0 ml-auto" />
              </a>
            ))}
          </div>
        </div>

        {/* Right */}
        <form
          action="https://formspree.io/f/mpwjvezn"
          method="POST"
          className="flex flex-col gap-5"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const res = await fetch(form.action, {
              method: "POST", body: new FormData(form), headers: { Accept: "application/json" },
            });
            if (res.ok) { setShowModal(true); form.reset(); }
          }}
        >
          {[
            { id: "email",   label: "EMAIL",   type: "email", placeholder: "your@email.com" },
            { id: "subject", label: "SUBJECT", type: "text",  placeholder: "Subject" },
          ].map(({ id, label, type, placeholder }) => (
            <label key={id} className="flex flex-col gap-2">
              <span className="font-mono text-[9px] text-[var(--muted)] tracking-[0.2em]">{label}</span>
              <input id={id} name={id} type={type} placeholder={placeholder} required className="form-input" />
            </label>
          ))}

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[9px] text-[var(--muted)] tracking-[0.2em]">MESSAGE</span>
            <textarea id="message" name="message" rows={5} placeholder="Your message..." required className="form-input resize-none max-h-48" />
          </label>

          <button type="submit" className="btn-primary self-start font-mono">SEND MESSAGE →</button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="rounded-xl p-8 text-center shadow-xl bg-[var(--surface)] border border-[var(--border-hover)]">
            <div className="font-semibold mb-4 text-[var(--green)]">✓ Message sent successfully.</div>
            <button className="btn-primary font-mono" onClick={() => setShowModal(false)}>CLOSE</button>
          </div>
        </div>
      )}
    </section>
  );
}