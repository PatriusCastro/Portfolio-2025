"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
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

// Single skill tile — shows icon + name, reveals bar on hover
function SkillTile({ skill, animated }: { skill: Skill; animated: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "14px 16px",
        borderRadius: 8,
        border: "1px solid",
        borderColor: hovered ? "var(--border-hover)" : "var(--border)",
        background: hovered ? "rgba(0,0,139,0.06)" : "var(--surface2)",
        transition: "border-color 0.2s, background 0.2s",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* Icon + name row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18, color: hovered ? "var(--accent-mid)" : "var(--accent-dim)", transition: "color 0.2s" }}>
          {skill.icon}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)", letterSpacing: "0.02em" }}>
          {skill.name}
        </span>
        {/* Level label — slides in on hover */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--accent-mid)",
            marginLeft: "auto",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(6px)",
            transition: "opacity 0.2s, transform 0.2s",
          }}
        >
          {skill.level}%
        </span>
      </div>

      {/* Skill bar — always rendered, only fills on hover + animated */}
      <div style={{ height: 2, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            borderRadius: 2,
            background: "linear-gradient(90deg, var(--accent-dim), var(--accent-mid))",
            width: hovered && animated ? `${skill.level}%` : "0%",
            transition: "width 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 0 8px var(--accent-glow)",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState("Languages");
  const [animated, setAnimated]       = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => { if (inView) setAnimated(true); }, [inView]);

  return (
    <section
      id="skills"
      ref={ref}
      className="py-14 px-6 sm:px-10 sm:rounded-2xl mb-16"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <div className="section-label">skills</div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2"
            style={{ color: "var(--text)" }}
          >
            Technologies I Use
          </h2>
          <p className="text-sm max-w-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {groupDescriptions[activeGroup]}
          </p>
        </div>

        {/* Tab strip — right-aligned on desktop */}
        <div className="flex flex-wrap gap-2 shrink-0">
          {Object.keys(skillGroups).map(group => (
            <button
              key={group}
              onClick={() => setActiveGroup(group)}
              className="px-4 py-1.5 rounded text-xs transition-all duration-200"
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.06em",
                border: "1px solid",
                borderColor: activeGroup === group ? "rgba(0,0,139,0.45)" : "var(--border)",
                background:   activeGroup === group ? "rgba(0,0,139,0.08)" : "transparent",
                color:        activeGroup === group ? "var(--accent-mid)" : "var(--muted)",
              }}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      {/* Skill grid — fixed height so layout never shifts */}
      <div style={{ minHeight: 280 }}>
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