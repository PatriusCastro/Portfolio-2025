"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "iRenta",
    description:
      "A comprehensive platform to simplify the management and search of rental properties. Built for landlords and tenants alike.",
    imageUrl: "/images/iRenta.png",
    repoUrl: "https://github.com/Takezooo/irenta",
    liveUrl: "",
    technologies: ["React", "Node.js", "MongoDB"],
    live: true,
    year: "2024",
  },
  {
    title: "Kababayan Rice",
    description:
      "E-commerce platform for a local rice business. Features product listings, cart management, and a streamlined checkout flow.",
    imageUrl: "/images/Kababayan.png",
    repoUrl: "https://github.com/SandorTheMoon/KabayanRicePrototype",
    liveUrl: "",
    technologies: ["JavaScript", "Django", "MySQL"],
    live: true,
    year: "2023",
  },
  {
    title: "Patfolio Website",
    description:
      "Personal portfolio site built during college. A snapshot of early-career frontend work and design exploration.",
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
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid",
        borderColor: hovered ? "var(--border-hover)" : "var(--border)",
        background: "var(--surface)",
        boxShadow: hovered ? "0 0 32px var(--accent-glow), 0 8px 36px rgba(0,0,0,0.2)" : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: 180 }}>
        <img
          src={project.imageUrl}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        {/* Overlay on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,139,0.15), rgba(0,0,0,0.55))",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />
        {/* Year badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.1em",
            padding: "3px 8px",
            borderRadius: 3,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {project.year}
        </div>
        {/* Status badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.12em",
            padding: "3px 8px",
            borderRadius: 3,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(6px)",
            border: "1px solid",
            borderColor: project.live ? "rgba(0,180,90,0.4)" : "rgba(255,255,255,0.1)",
            color: project.live ? "var(--green)" : "rgba(255,255,255,0.4)",
          }}
        >
          {project.live ? "LIVE" : "ARCHIVED"}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <h3 style={{ fontWeight: 700, fontSize: 17, color: "var(--text)", letterSpacing: "-0.01em" }}>
          {project.title}
        </h3>

        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, flex: 1 }}>
          {project.description}
        </p>

        {/* Tech chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.technologies.map(tech => (
            <span key={tech} className="tech-chip">{tech}</span>
          ))}
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: 8,
            paddingTop: 12,
            borderTop: "1px solid var(--border)",
          }}
        >
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "8px 0",
              borderRadius: 6,
              border: "1px solid var(--border)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "var(--muted)",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent-mid)";
              (e.currentTarget as HTMLElement).style.background = "rgba(0,0,139,0.06)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--muted)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            <FaGithub size={13} /> Source Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 6,
                border: "1px solid rgba(0,0,139,0.4)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "var(--accent-mid)",
                background: "rgba(0,0,139,0.07)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,0,139,0.14)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,0,139,0.07)";
              }}
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
    <section id="projects" className="py-16 px-6 sm:px-0 mb-16">
      {/* Header */}
      <div className="mb-12">
        <div className="section-label">projects</div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2"
              style={{ color: "var(--text)" }}
            >
              Featured Projects
            </h2>
            <p className="text-sm max-w-md leading-relaxed" style={{ color: "var(--muted)" }}>
              A selection of things I've built — hover a card to explore.
            </p>
          </div>
          <a
            href="https://github.com/PatriusCastro"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--muted)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              whiteSpace: "nowrap",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-mid)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
          >
            View all on GitHub →
          </a>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}