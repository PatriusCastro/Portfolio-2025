"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";

const NAV_LINKS = ["about", "skills", "projects", "contact"] as const;

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [scrollPct,  setScrollPct]  = useState(0);
  const [activeLink, setActiveLink] = useState("");
  const [time,       setTime]       = useState("");
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [isMobile,   setIsMobile]   = useState(false);
  const router = useRouter();

  const handleScroll = useCallback(() => {
    const top = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    setScrollPct(max > 0 ? (top / max) * 100 : 0);
    setScrolled(top > 20);

    // At bottom → highlight last link
    if (window.innerHeight + top >= document.documentElement.scrollHeight - 10) {
      setActiveLink(NAV_LINKS[NAV_LINKS.length - 1]);
      return;
    }

    const OFFSET = 140;
    let current = "";
    for (const id of NAV_LINKS) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= OFFSET) current = id;
    }

    setActiveLink(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const drawerVisible = menuOpen && isMobile;

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-0.5 z-[100] transition-[width] duration-100
                   bg-[linear-gradient(90deg,var(--accent-dim),var(--accent-mid))]
                   shadow-[0_0_8px_var(--accent-glow)]"
        style={{ width: `${scrollPct}%` }}
      />

      {/* Main nav */}
      <motion.nav
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={[
          "sticky z-50 flex items-center justify-between px-5 h-[60px]",
          "backdrop-blur-xl transition-all duration-300",
          "border-[var(--border)]",
          scrolled
            ? "top-[10px] mx-6 sm:mx-0 rounded-[14px] border shadow-[0_4px_32px_rgba(0,0,0,0.1)] bg-[var(--nav-bg-scrolled)]"
            : "top-0 mx-0 rounded-none border-b bg-[var(--nav-bg-flat)] shadow-none",
        ].join(" ")}
      >
        {/* Logo */}
        <button
          className="group text-sm hover:opacity-75 transition-opacity duration-200 bg-transparent border-0 p-0 cursor-pointer font-[var(--font-mono)] text-[var(--text)]"
          aria-label="Scroll to top"
          onClick={() => { router.push("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <span className="text-[var(--accent-dim)]">{"<"}</span>
          <span className="patrius-text">patrius</span>
          <span className="text-[var(--accent-dim)]">{" />"}</span>
        </button>

        {/* Desktop nav links */}
        <nav className="hidden sm:flex items-center gap-1 font-[var(--font-mono)] text-[10px] tracking-[0.12em]">
          {NAV_LINKS.map(link => {
            const isActive = activeLink === link;
            return (
              <a
                key={link}
                href={`#${link}`}
                onClick={e => { e.preventDefault(); scrollTo(link); }}
                className={[
                  "relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-md",
                  "uppercase no-underline transition-colors duration-200",
                  isActive
                    ? "text-[var(--text)] bg-[var(--accent-pale)]"
                    : "text-[var(--text-sub)] hover:text-[var(--accent-mid)] bg-transparent",
                ].join(" ")}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="inline-block w-1 h-1 rounded-full shrink-0 bg-[var(--accent-mid)] shadow-[0_0_6px_var(--accent-glow)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {link}
              </a>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2 font-[var(--font-mono)] text-[10px] text-[var(--text-sub)]">
            <span className="status-dot" />
            {time}
          </div>

          <ThemeToggle />

          {/* Hamburger */}
          <motion.button
            className={[
              "sm:hidden flex items-center justify-center",
              "w-[34px] h-[34px] rounded-lg border cursor-pointer shrink-0 p-0",
              "transition-colors duration-200",
              menuOpen
                ? "border-[var(--border-hover)] bg-[var(--accent-pale)]"
                : "border-[var(--border)] bg-[var(--surface2)]",
            ].join(" ")}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.88 }}
          >
            <div className="relative w-4 h-3">
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5.5 : 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className={`absolute top-0 left-0 block w-full h-[1.5px] rounded-sm ${menuOpen ? "bg-[var(--accent-mid)]" : "bg-[var(--text)]"}`}
                style={{ transformOrigin: "center" }}
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 block w-full h-[1.5px] rounded-sm bg-[var(--text)]"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5.5 : 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className={`absolute bottom-0 left-0 block w-full h-[1.5px] rounded-sm ${menuOpen ? "bg-[var(--accent-mid)]" : "bg-[var(--text)]"}`}
                style={{ transformOrigin: "center" }}
              />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerVisible && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 backdrop-blur-sm bg-black/35"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="drawer"
              className="fixed left-3 right-3 z-[48] rounded-[14px] overflow-hidden border border-[var(--border)] bg-[var(--nav-bg-scrolled)] backdrop-blur-2xl"
              style={{ top: 68 }}
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{   opacity: 0, y: -8,  scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link}`}
                  onClick={e => { e.preventDefault(); scrollTo(link); }}
                  className={[
                    "flex items-center justify-between px-5 py-4 no-underline uppercase transition-colors duration-150",
                    "font-[var(--font-mono)] text-[12px] tracking-[0.12em]",
                    i < NAV_LINKS.length - 1 ? "border-b border-[var(--border)]" : "",
                    activeLink === link
                      ? "text-[var(--accent-mid)] bg-[var(--accent-pale)]"
                      : "text-[var(--text)] bg-transparent",
                  ].join(" ")}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <span>{link}</span>
                  {activeLink === link && (
                    <span className="w-[5px] h-[5px] rounded-full shrink-0 bg-[var(--accent-mid)] shadow-[0_0_6px_var(--accent-glow)]" />
                  )}
                </motion.a>
              ))}

              <div className="flex items-center gap-2 px-5 py-3 border-t border-[var(--border)] font-[var(--font-mono)] text-[10px] text-[var(--muted2)]">
                <span className="status-dot" />
                {time}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}