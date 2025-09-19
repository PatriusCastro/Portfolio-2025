"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`flex justify-between items-center py-4 px-6 sticky top-0 z-10 transition-all
        ${scrolled ? "bg-white/30 dark:bg-slate-800/30 backdrop-blur-lg shadow-sm sm:rounded-b-xl" : ""}
      `}
    >
      <button
        className="group relative font-bold text-slate-900 dark:text-slate-200 transition duration-300"
        aria-label="Scroll to top"
        onClick={() => {
          router.push("/"); // navigate to root without "#"
          window.scrollTo({ top: 0, behavior: "smooth" }); // smooth scroll
        }}
      >
        <span className="patrius-text">patrius.</span>
      </button>

      <ThemeToggle />
    </nav>
  );
}
