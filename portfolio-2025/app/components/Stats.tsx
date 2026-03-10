"use client";

import { useEffect, useRef, useState } from "react";

type StatsProps = { projectCount: number; stars: number };

const statIcons  = ["◈", "◉", "⋆", "⬡"];
const statLabels = ["Years Experience", "Projects Done", "Stars on Repos", "Commits This Year"];

export default function Stats({ projectCount, stars }: StatsProps) {
  const [projects, setProjects]     = useState(0);
  const [repoStars, setRepoStars]   = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
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

  const statValues = ["1+", `${projects}+`, `${repoStars}`, "300+"];

  return (
    <section
      ref={sectionRef}
      className="mb-16 rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {statValues.map((val, i) => (
          <a
            key={i}
            href="https://github.com/PatriusCastro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2.5 py-7 px-5 text-center transition-all duration-300"
            style={{
              background: "var(--surface)",
              borderRight: i < 3 ? "1px solid var(--border)" : "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--surface2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--surface)";
            }}
          >
            <span style={{ fontSize: 14, color: "var(--accent-dim)", opacity: 0.8 }}>{statIcons[i]}</span>
            <div
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text)", lineHeight: 1 }}
            >
              {val}
            </div>
            <div
              className="uppercase"
              style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: "0.14em" }}
            >
              {statLabels[i]}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}