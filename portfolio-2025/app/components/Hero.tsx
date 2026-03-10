"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ROLES = ["Full-Stack Developer", "Frontend Specialist", "UI Craftsman", "React Engineer"];

function useTypewriter(texts: string[], speed = 65, pause = 2400) {
  const [displayed, setDisplayed] = useState("");
  const [idx,      setIdx]        = useState(0);
  const [charIdx,  setCharIdx]    = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length)
      t = setTimeout(() => setCharIdx(c => c + 1), speed);
    else if (!deleting && charIdx === current.length)
      t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && charIdx > 0)
      t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    else { setDeleting(false); setIdx(i => (i + 1) % texts.length); }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return displayed;
}

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <motion.section
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
      className="relative flex flex-col items-center justify-center min-h-[88vh] py-12 text-center overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-7 flex items-center gap-2 font-[var(--font-mono)] text-[11px] tracking-[0.1em] text-[var(--muted)]">
          <span className="text-[var(--green)]">~/portfolio</span>
          <span className="text-[var(--muted2)]">›</span>
          <span>whoami</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-5 tracking-tight"
        >
          <span className="hero-metallic">Patrius Castro</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mb-11 h-6 font-[var(--font-mono)] text-[13px] tracking-[0.04em] text-[var(--muted)]"
        >
          <span className="text-[var(--accent-dim)]">$ </span>
          <span className="text-[var(--text)]">{role}</span>
          <span className="cursor ml-0.5 text-[var(--accent-dim)]">▌</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="flex gap-3"
        >
          <button
            className="btn-primary font-[var(--font-mono)]"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Me
          </button>
          <a
            href="/files/Castro_Resume.pdf"
            download target="_blank" rel="noopener noreferrer"
            className="btn-ghost font-[var(--font-mono)] no-underline"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      <div className="scroll-indicator z-10">
        SCROLL
        <div className="scroll-indicator-line" />
      </div>
    </motion.section>
  );
}