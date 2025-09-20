"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: "spring", stiffness: 60 }}
      className="relative flex flex-col items-center justify-center min-h-[80vh] py-12"
    >
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2">
          <span className="hero-metallic">Patrius Castro</span>
        </h1>
        <p className="text-base sm:text-lg mb-6">
          Full-Stack Developer turning ideas into reality through code.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-4 py-2 bg-blue-700 hover:bg-gradient-to-t hover:from-blue-700 hover:to-blue-500 text-white rounded-xl shadow-md hover:shadow-lg transition"
        >
          Contact Me
        </button>
        <a
          href="/files/Patrick-Josuah-Castro-CV.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-white shadow dark:hover:bg-slate-800 transition"
        >
          Download CV
        </a>
      </div>
    </motion.section>
  );
}
