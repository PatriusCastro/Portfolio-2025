"use client";

import { useState } from "react";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { FiExternalLink, FiMail } from "react-icons/fi";

const socials = [
  { label: "Email",     sub: "josuahcastro1@gmail.com",           href: "mailto:josuahcastro1@gmail.com",                              icon: <FiMail size={18} /> },
  { label: "LinkedIn",  sub: "patrick-josuah-castro",             href: "https://www.linkedin.com/in/patrick-josuah-castro-6aba2a27a/", icon: <SiLinkedin size={18} /> },
  { label: "GitHub",    sub: "github.com/PatriusCastro",          href: "https://github.com/PatriusCastro",                            icon: <SiGithub size={18} /> },
  { label: "Instagram", sub: "@_patissss",                        href: "https://instagram.com/_patissss",                             icon: <SiInstagram size={18} /> },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-[var(--border)] no-underline transition-all duration-200 hover:bg-[var(--accent-pale)] hover:border-[var(--border-hover)] min-w-0 overflow-hidden"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="p-2 rounded-lg bg-[var(--accent-pale)] text-[var(--accent-dim)] shrink-0">{s.icon}</span>
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
            setStatus("sending");
            try {
            const res = await fetch(form.action, {
              method: "POST", body: new FormData(form), headers: { Accept: "application/json" },
            });
            if (!res.ok) throw new Error(`Formspree ${res.status}`);
            form.reset();
            setStatus("sent");
            } catch { setStatus("error"); }
          }}
        >
          {[
            { id: "email",   label: "EMAIL",   type: "email", placeholder: "your@email.com" },
            { id: "subject", label: "SUBJECT", type: "text",  placeholder: "Subject" },
          ].map(({ id, label, type, placeholder }) => (
            <label key={id} className="flex flex-col gap-2">
              <span className="font-mono text-[11px] text-[var(--muted)] tracking-[0.2em]">{label}</span>
              <input id={id} name={id} type={type} placeholder={placeholder} required className="form-input" />
            </label>
          ))}

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[11px] text-[var(--muted)] tracking-[0.2em]">MESSAGE</span>
            <textarea id="message" name="message" rows={5} placeholder="Your message..." required className="form-input resize-none max-h-48" />
          </label>

          <button type="submit" disabled={status === "sending"} className="btn-primary self-start font-mono disabled:opacity-60">
            {status === "sending" ? "SENDING…" : "SEND MESSAGE →"}
          </button>
          <p role="status" className={`text-sm ${status === "error" ? "text-red-500" : "text-[var(--green)]"}`}>
            {status === "sent" && "✓ Message sent. I'll get back to you soon."}
            {status === "error" && "Couldn't send your message. Please try again or email me directly."}
          </p>
        </form>
      </div>

    </section>
  );
}