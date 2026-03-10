"use client";

import { useEffect, useRef, useState } from "react";

type StatsProps = { projectCount: number; stars: number };

const statIcons  = ["◈", "◉", "⋆", "⬡"];
const statLabels = ["Years Experience", "Projects Done", "Stars on Repos", "Commits This Year"];

export default function Stats({ projectCount, stars }: StatsProps) {
  const [projects, setProjects]   = useState(0);
  const [repoStars, setRepoStars] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  function animateValue(from: number, to: number, setter: (v: number) => void, duration: number) {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setter(Math.floor(p * (to - from) + from));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateValue(0, projectCount, setProjects, 1200);
          animateValue(0, stars, setRepoStars, 1200);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, [projectCount, stars, hasAnimated]);

  const statValues = ["1+", `${projects}+`, `${repoStars}`, "100+"];

  return (
    <section ref={sectionRef} className="mb-20 sm:rounded-xl overflow-hidden border border-[var(--border)]">
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {statValues.map((val, i) => (
          <a
            key={i}
            href="https://github.com/PatriusCastro"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center gap-2.5 py-7 px-5 text-center bg-[var(--surface)] transition-all duration-300 hover:bg-[var(--surface2)]
              ${i < 3 ? "border-r border-[var(--border)]" : ""}`}
          >
            <span className="text-sm text-[var(--accent-dim)] opacity-80">{statIcons[i]}</span>
            <div className="text-3xl font-bold font-mono text-[var(--text)] leading-none">{val}</div>
            <div className="font-mono text-[9px] text-[var(--muted)] tracking-[0.14em] uppercase">{statLabels[i]}</div>
          </a>
        ))}
      </div>
    </section>
  );
}