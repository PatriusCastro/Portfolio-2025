"use client";

import Logo from "../public/assets/main-logo.png";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="bg-slate-200 text-slate-800 dark:text-slate-200 dark:bg-slate-900 transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center py-4 px-6 sticky top-0 z-10">
        <img
          src={Logo.src}
          alt="Logo"
          width={40}
          height={40}
          className="bg-slate-900 rounded-lg dark:bg-slate-800 p-1 hover:scale-105 transition-transform duration-200 cursor-pointer"
        />
        <button
          onClick={toggleTheme}
          className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-slate-200" />
          ) : (
            <Moon className="w-5 h-5 text-gray-900" />
          )}
        </button>
      </nav>
      {/* Hero Section */}
      <div className="h-[90vh] flex flex-col justify-center items-center">
        {/* Hero Texts */}
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-2">Patrius Castro</h1>
          <p className="mb-6">Web Developer specializing in Frontend Development with React & Tailwind</p>
        </div>
        {/* Hero Buttons */}
        <div className="gap-4 flex">
          <button className="bg-blue-600 hover:bg-blue-500 font-bold px-4 py-2 rounded-xl text-white">Contact Me</button>
          <button className="hover:bg-slate-800 font-bold border-1 px-4 py-2 rounded-xl">Download CV</button>
        </div>
      </div>
    </div>
  );
}
