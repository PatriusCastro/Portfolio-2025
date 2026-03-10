"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript,
  SiHtml5, SiCss3, SiNodedotjs, SiLaravel, SiPython, SiDjango,
  SiMysql, SiMongodb, SiGit, SiDocker, SiFigma, SiWordpress,
  SiC, SiCplusplus, SiPostgresql, SiGithub, SiJira
} from "react-icons/si";

type Skill = { name: string; icon: React.ReactNode; level: number };

const skillGroups: Record<string, Skill[]> = {
  Languages: [
    { name: "TypeScript", icon: <SiTypescript />, level: 88 },
    { name: "JavaScript", icon: <SiJavascript />, level: 90 },
    { name: "HTML",       icon: <SiHtml5 />,      level: 95 },
    { name: "CSS",        icon: <SiCss3 />,        level: 92 },
    { name: "Python",     icon: <SiPython />,      level: 68 },
    { name: "C",          icon: <SiC />,           level: 60 },
    { name: "C++",        icon: <SiCplusplus />,   level: 58 },
  ],
  Frameworks: [
    { name: "React.js",  icon: <SiReact />,       level: 92 },
    { name: "Next.js",   icon: <SiNextdotjs />,   level: 88 },
    { name: "Tailwind",  icon: <SiTailwindcss />, level: 90 },
    { name: "Node.js",   icon: <SiNodedotjs />,   level: 78 },
    { name: "Laravel",   icon: <SiLaravel />,     level: 72 },
    { name: "Django",    icon: <SiDjango />,      level: 68 },
  ],
  Databases: [
    { name: "MySQL",      icon: <SiMysql />,      level: 80 },
    { name: "MongoDB",    icon: <SiMongodb />,    level: 74 },
    { name: "PostgreSQL", icon: <SiPostgresql />, level: 70 },
  ],
  Tools: [
    { name: "Git",       icon: <SiGit />,        level: 90 },
    { name: "GitHub",    icon: <SiGithub />,     level: 90 },
    { name: "Docker",    icon: <SiDocker />,     level: 65 },
    { name: "Figma",     icon: <SiFigma />,      level: 75 },
    { name: "WordPress", icon: <SiWordpress />,  level: 72 },
    { name: "Jira",      icon: <SiJira />,       level: 70 },
  ],
};

const groupDescriptions: Record<string, string> = {
  Languages:  "Core languages I write daily — from typed JS to systems-level C.",
  Frameworks: "Full-stack frameworks and UI libraries I use to ship products.",
  Databases:  "Relational and NoSQL databases for designing scalable data layers.",
  Tools:      "Dev tools for version control, containerization, design, and planning.",
};

function SkillTile({ skill, animated }: { skill: Skill; animated: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`p-3.5 rounded-lg border flex flex-col gap-2.5 cursor-default transition-all duration-200
        ${hovered ? "border-[var(--border-hover)] bg-[rgba(0,0,139,0.06)]" : "border-[var(--border)] bg-[var(--surface2)]"}`}
    >
      <div className="flex items-center gap-2.5">
        <span className={`text-[18px] transition-colors duration-200 ${hovered ? "text-[var(--accent-mid)]" : "text-[var(--accent-dim)]"}`}>
          {skill.icon}
        </span>
        <span className="font-mono text-[12px] text-[var(--text)] tracking-wide">{skill.name}</span>
        <span className={`font-mono text-[10px] text-[var(--accent-mid)] ml-auto transition-all duration-200 ${hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1.5"}`}>
          {skill.level}%
        </span>
      </div>
      <div className="h-px bg-[var(--border)] rounded overflow-hidden">
        <div
          className="h-full rounded bg-gradient-to-r from-[var(--accent-dim)] to-[var(--accent-mid)] shadow-[0_0_8px_var(--accent-glow)] transition-[width] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ width: hovered && animated ? `${skill.level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState("Languages");
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => { if (inView) setAnimated(true); }, [inView]);

  return (
    <section
      id="skills"
      ref={ref}
      className="py-14 px-6 sm:px-10 sm:rounded-2xl mb-20 bg-[var(--surface)] border border-[var(--border)]"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <div className="section-label">skills</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-[var(--text)]">Technologies I Use</h2>
          <p className="text-sm max-w-sm leading-relaxed text-[var(--muted)]">{groupDescriptions[activeGroup]}</p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {Object.keys(skillGroups).map(group => (
            <button
              key={group}
              onClick={() => setActiveGroup(group)}
              className={`px-4 py-1.5 rounded text-xs font-mono tracking-wide border transition-all duration-200
                ${activeGroup === group
                  ? "border-[rgba(0,0,139,0.45)] bg-[rgba(0,0,139,0.08)] text-[var(--accent-mid)]"
                  : "border-[var(--border)] bg-transparent text-[var(--muted)]"}`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[130px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {skillGroups[activeGroup].map(skill => (
              <SkillTile key={skill.name} skill={skill} animated={animated} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}