"use client";

import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";

const LINKS = [
  { icon: <SiGithub size={15} />,    href: "https://github.com/PatriusCastro",                              label: "GitHub"    },
  { icon: <SiLinkedin size={15} />,  href: "https://www.linkedin.com/in/patrick-josuah-castro-6aba2a27a/", label: "LinkedIn"  },
  { icon: <SiInstagram size={15} />, href: "https://instagram.com/_patissss",                               label: "Instagram" },
];

const NAV = ["about", "skills", "projects", "contact"];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center gap-8">

        {/* Logo */}
        <span className="font-mono text-base select-none">
          <span className="text-[var(--accent-dim)]">{"<"}</span>
          <span className="text-[var(--text)] font-bold">patrius</span>
          <span className="text-[var(--accent-dim)]">{" />"}</span>
        </span>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          {NAV.map(item => (
            <a
              key={item}
              href={`#${item}`}
              className="font-mono text-[11px] tracking-widest uppercase text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--accent-mid)]"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-full h-px bg-[var(--border)]" />

        {/* Bottom row */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-[var(--muted2)] tracking-[0.08em]">
            © {new Date().getFullYear()} Patrius Castro. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {LINKS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[var(--muted)] hover:text-[var(--accent-mid)] transition-colors duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}