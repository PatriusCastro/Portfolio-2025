"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheckSquare, FiFolder, FiStar } from "react-icons/fi";

type StatsProps = {
  projectCount: number;
  stars: number;
};

export default function Stats({ projectCount, stars }: StatsProps) {
  const [projects, setProjects] = useState(0);
  const [repoStars, setRepoStars] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          animateValue(0, projectCount, setProjects, 1200);
          animateValue(0, stars, setRepoStars, 1200);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [projectCount, stars, hasAnimated]);

  function animateValue(
    from: number,
    to: number,
    setter: (val: number) => void,
    duration: number
  ) {
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setter(Math.floor(progress * (to - from) + from));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  return (
    <section
      ref={sectionRef}
      className="py-6 px-12 border-y bg-white/80 dark:bg-slate-800/30 backdrop-blur-lg border-slate-300 dark:border-slate-700 mask-x-from-90% to-100% transition duration-300"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center w-full text-center gap-y-6">
        {/* Experience */}
        <a
          href="https://github.com/PatriusCastro"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="1 year experience"
          className="flex-1 flex justify-center items-center gap-3 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          <FiCheckSquare size={20} />
          <span className="text-base sm:text-lg">1 Year Experience</span>
        </a>

        {/* Projects */}
        <a
          href="https://github.com/PatriusCastro?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${projects} projects done`}
          className="flex-1 flex justify-center items-center gap-3 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          <FiFolder size={20} />
          <span className="text-base sm:text-lg">{projects}+ Projects done</span>
        </a>

        {/* Stars */}
        <a
          href="https://github.com/PatriusCastro"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${repoStars} stars on repositories`}
          className="flex-1 flex justify-center items-center gap-3 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          <FiStar size={20} />
          <span className="text-base sm:text-lg">{repoStars} Stars on repositories</span>
        </a>
      </div>
    </section>
  );
}
