"use client";
import { useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "iRenta",
    description:
      "A comprehensive platform designed to simplify the management and search of rental properties.",
    imageUrl: "/images/iRenta.png",
    repoUrl: "https://github.com/Takezooo/irenta",
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Kababayan Rice",
    description:
      "An e-commerce website for a rice business, featuring product listings, shopping cart, and secure checkout.",
    imageUrl: "/images/Kababayan.png",
    repoUrl: "https://github.com/SandorTheMoon/KabayanRicePrototype",
    technologies: ["JavaScript", "Django", "MySQL"],
  },
  {
    title: "Patfolio Website",
    description:
      "A personal portfolio website that I developed during my college years to showcase my projects and skills.",
    imageUrl: "/images/Patfolio.png",
    repoUrl: "https://github.com/PatriusCastro/Patfolio",
    technologies: ["HTML", "CSS", "Javascript"],
  },
];

export default function Project() {
  return (
    <section className="min-h-[85vh] py-[4rem] px-6 sm:px-0 flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <h2 className="text-3xl uppercase sm:text-5xl font-bold mb-4">
          Featured Projects
        </h2>
        <p className="text-sm sm:text-md xl:text-base mb-6">
            Here are some of the projects I've worked on recently. Feel free to
            explore the code!
        </p>
      </div>
      <div className="grid gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full group/card-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative card group/card rounded-2xl overflow-hidden shadow border border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-800/30 backdrop-blur-lg transition-all duration-500"
          >
            {/* Image */}
            <div className="card-background overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover/card:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-6 card-category transition duration-500">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between gap-4">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border dark:border-slate-700 border-slate-300 hover:bg-gradient-to-t hover:from-blue-700 hover:to-blue-500 justify-center rounded-xl w-full py-1.5 text-slate-700 dark:text-slate-200 hover:text-white flex items-center gap-2 transition-colors duration-300"
                  >
                    Source Code <FaGithub />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
