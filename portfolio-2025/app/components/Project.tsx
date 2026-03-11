"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "VetSync",
    description: "A platform to find trusted veterinary clinics nearby, book appointment, view services, and get care for pets.",
    imageUrl: "/images/VetSync.png",
    repoUrl: "",
    liveUrl: "https://vetsync-business.vercel.app/",
    technologies: ["React", "Node.js", "PostgreSQL", "ExpressJs"],
    live: true,
    year: "2025",
  },
  {
    title: "Request Management System",
    description: "A web-based application designed to streamline the handling of various requests within an organization. It provides a centralized platform for users to submit, track, and manage their requests efficiently.",
    imageUrl: "/images/Req-Management.png",
    repoUrl: "https://github.com/markdonnie/purchase-request",
    liveUrl: "",
    technologies: ["Laravel", "PHP", "MySQL"],
    live: false,
    year: "2025",
  },
  {
    title: "iRenta",
    description: "A comprehensive platform to simplify the management and search of rental properties. Built for landlords and tenants alike.",
    imageUrl: "/images/iRenta.png",
    repoUrl: "https://github.com/Takezooo/irenta",
    liveUrl: "",
    technologies: ["React", "Node.js", "MongoDB", "ExpressJs"],
    live: false,
    year: "2024",
  },
  {
    title: "Kababayan Rice",
    description: "E-commerce platform for a local rice business. Features product listings, cart management, and a streamlined checkout flow.",
    imageUrl: "/images/Kababayan.png",
    repoUrl: "https://github.com/SandorTheMoon/KabayanRicePrototype",
    liveUrl: "",
    technologies: ["JavaScript", "Django", "MySQL"],
    live: false,
    year: "2023",
  },
  {
    title: "Patfolio Website",
    description: "Personal portfolio site built during college. A snapshot of early-career frontend work and design exploration.",
    imageUrl: "/images/Patfolio.png",
    repoUrl: "https://github.com/PatriusCastro/Patfolio",
    liveUrl: "",
    technologies: ["HTML", "CSS", "JavaScript"],
    live: false,
    year: "2022",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-xl overflow-hidden flex flex-col border transition-all duration-300 bg-[var(--surface)]
        ${hovered ? "border-[var(--border-hover)] shadow-[0_0_32px_var(--accent-glow),0_8px_36px_rgba(0,0,0,0.2)] -translate-y-1" : "border-[var(--border)]"}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <img
          src={project.imageUrl}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? "scale-105" : "scale-100"}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-b from-[rgba(0,0,139,0.15)] to-[rgba(0,0,0,0.55)] transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`} />
        <span className="absolute top-3 left-3 font-mono text-[10px] tracking-widest px-2 py-0.5 rounded bg-black/50 backdrop-blur border border-white/10 text-white/60">
          {project.year}
        </span>
        <span className={`absolute top-3 right-3 font-mono text-[9px] tracking-widest px-2 py-0.5 rounded bg-black/50 backdrop-blur border
          ${project.live ? "border-[rgba(0,180,90,0.4)] text-[var(--green)]" : "border-white/10 text-white/40"}`}>
          {project.live ? "LIVE" : "ARCHIVED"}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-bold text-[17px] tracking-tight text-[var(--text)]">{project.title}</h3>
        <p className="text-[13px] text-[var(--muted)] leading-relaxed flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map(tech => <span key={tech} className="tech-chip">{tech}</span>)}
        </div>

        <div className="flex gap-2 pt-3 border-t border-[var(--border)]">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md border border-[var(--border)] font-mono text-[11px] tracking-wide text-[var(--muted)] no-underline transition-all duration-200 hover:border-[var(--border-hover)] hover:text-[var(--accent-mid)] hover:bg-[rgba(0,0,139,0.06)]"
          >
            <FaGithub size={13} /> Source Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-md border border-[rgba(0,0,139,0.4)] font-mono text-[11px] tracking-wide text-[var(--accent-mid)] bg-[rgba(0,0,139,0.07)] no-underline transition-all duration-200 hover:bg-[rgba(0,0,139,0.14)]"
            >
              <FaExternalLinkAlt size={11} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Project() {
  return (
    <section id="projects" className="py-20 px-6 sm:px-0 mb-20">
      <div className="mb-12">
        <div className="section-label">projects</div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-[var(--text)]">Featured Projects</h2>
            <p className="text-sm max-w-md leading-relaxed text-[var(--muted)]">A selection of things I've built — hover a card to explore.</p>
          </div>
          <a
            href="https://github.com/PatriusCastro"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-widest text-[var(--muted)] no-underline flex items-center gap-1.5 whitespace-nowrap transition-colors duration-200 hover:text-[var(--accent-mid)]"
          >
            View all on GitHub →
          </a>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}