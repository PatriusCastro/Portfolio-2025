"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => setMounted(true), []);
  // Reserve space while unmounted so layout doesn't shift
  if (!mounted) return <div className="w-34 h-34 radius-8 shrink-0"/>;

  const isDark = theme === "dark";

  const toggle = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 350);
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.85 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "relative",
        width: 34,
        height: 34,
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--surface2)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none",
        flexShrink: 0,
        overflow: "hidden",
        /* ✅ Pure CSS-var transitions — no inline hover handlers needed */
        transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
      }}
      /* ✅ className-based hover via Tailwind so vars resolve at call time */
      className="theme-toggle-btn"
    >
      {/* Ripple on click */}
      <AnimatePresence>
        {pressed && (
          <motion.span
            key="ripple"
            initial={{ scale: 0.3, opacity: 0.6 }}
            animate={{ scale: 2.6, opacity: 0   }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "var(--accent-pale)",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* Icon swap with rotate */}
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg
            key="sun"
            xmlns="http://www.w3.org/2000/svg"
            width="15" height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ rotate: -70, opacity: 0, scale: 0.5 }}
            animate={{ rotate:   0, opacity: 1, scale: 1   }}
            exit={{    rotate:  70, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ color: "var(--accent-mid)", position: "relative", zIndex: 1 }}
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1"  x2="12" y2="3"  />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"  />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1"  y1="12" x2="3"  y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
            <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            xmlns="http://www.w3.org/2000/svg"
            width="14" height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ rotate:  70, opacity: 0, scale: 0.5 }}
            animate={{ rotate:   0, opacity: 1, scale: 1   }}
            exit={{    rotate: -70, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ color: "var(--accent-dim)", position: "relative", zIndex: 1 }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}