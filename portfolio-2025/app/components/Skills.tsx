"use client";

import { useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiPhp,
  SiLaravel,
  SiPython,
  SiDjango,
  SiMysql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiFigma,
  SiWordpress,
  SiC,
  SiCplusplus,
  SiPostgresql,
  SiGithub
} from "react-icons/si";

const skillGroups: Record<
  string,
  { name: string; icon: React.ReactNode }[]
> = {
  Languages: [
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "HTML", icon: <SiHtml5 /> },
    { name: "CSS", icon: <SiCss3 /> },
    { name: "C", icon: <SiC /> },
    { name: "C++", icon: <SiCplusplus /> },
    { name: "Python", icon: <SiPython /> },

  ],
  Frameworks: [
    { name: "Laravel", icon: <SiLaravel /> },
    { name: "Node.js", icon: <SiNodedotjs /> },
    { name: "React.js", icon: <SiReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Django", icon: <SiDjango /> },
    { name: "Tailwind", icon: <SiTailwindcss /> },
    
  ],
  Databases: [
    { name: "MySQL", icon: <SiMysql /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
  ],
  Tools: [
    { name: "Git", icon: <SiGit /> },
    { name: "GitHub", icon: <SiGithub /> },
    { name: "Docker", icon: <SiDocker /> },
    { name: "Figma", icon: <SiFigma /> },
    { name: "WordPress", icon: <SiWordpress /> },
  ],
};

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState("Languages");

  return (
    <section className="py-16 px-4 sm:px-8 sm:rounded-xl border border-slate-300 dark:border-slate-800 bg-white/30 dark:bg-slate-800/30 backdrop-blur-lg shadow-sm transition-colors duration-300">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl uppercase sm:text-4xl font-bold mb-4">
          Technologies I Use
        </h2>
        <p className="text-slate-600 text-sm sm:text-base dark:text-slate-300 max-w-2xl mx-auto">
          These are the tools and technologies I use to design, build, and
          deploy modern web applications across frontend, backend, and more.
        </p>
      </div>

      {/* Toggle Tabs */}
      <div className="flex justify-center gap-2 sm:gap-4 mb-12">
        {Object.keys(skillGroups).map((group) => (
          <button
            key={group}
            onClick={() => setActiveGroup(group)}
            className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all 
              ${
                activeGroup === group
                  ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900"
                  : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Two-Column Layout */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        {/* Left Column */}
        <div>
          <h5 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
            {activeGroup}
          </h5>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            {activeGroup === "Languages" &&
              "Proficient in modern programming languages for building dynamic and responsive web applications."} 
            {activeGroup === "Frameworks" &&
              "Knowledgeable in popular frameworks and libraries for efficient frontend and backend development."}
            {activeGroup === "Databases" &&
              "Experienced in relational and NoSQL databases for managing data effectively."}
            {activeGroup === "Tools" &&
              "Proficient with essential tools for version control, containerization, design, and CMS management."}
          </p>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {skillGroups[activeGroup].map((skill, i) => (
            <div
              key={i}
              className="flex h-fit justify-between items-center gap-2 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-white hover:text-slate-950 dark:hover:bg-slate-800 dark:hover:text-white transition-all cursor-pointer"
            >
              <span className="text-xl">{skill.icon}</span>
              <span className="text-sm font-medium cursor-pointer">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
