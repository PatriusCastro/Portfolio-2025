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
      className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-slate-200" />
      ) : (
        <Moon className="w-5 h-5 text-gray-900" />
      )}
    </button>
  );
}