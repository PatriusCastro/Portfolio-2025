"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import Logo from "../../public/assets/main-logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`flex justify-between items-center py-4 px-6 sticky top-0 z-10 transition-all
        ${scrolled ? "bg-white/30 dark:bg-slate-800/30 backdrop-blur-lg shadow-sm sm:rounded-b-xl" : ""}
      `}
    >
      <h1 className="font-bold cursor-pointer">patrius.</h1>
      <ThemeToggle />
    </nav>
  );
}