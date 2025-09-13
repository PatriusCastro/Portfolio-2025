"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group relative flex items-center w-14 h-8 bg-slate-300 dark:bg-slate-800"
    >
      <span
        className="absolute left-1 top-1 w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 shadow-md transition-all duration-300 "
        style={{
          transform: theme === "dark" ? "translateX(24px)" : "translateX(0px)",
        }}
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300" />
        ) : (
          <Moon className="w-4 h-4 text-gray-800 group-hover:text-gray-600" />
        )}
      </span>
    </button>
  );
}
