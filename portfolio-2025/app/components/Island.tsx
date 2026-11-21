"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiDownload, FiMail } from "react-icons/fi";

type Item<Id> = { id: Id; icon: React.ReactNode; label: string };

// A Dynamic Island in the style of Pulo: rest shows the time, hover peeks at the front window, click opens a panel.
export default function Island<Id extends string>({ current, windows, onPick, contact }: {
  current: Item<Id> | null; windows: Item<Id>[]; onPick: (id: Id) => void; contact: Id;
}) {
  const [hover, setHover] = useState(false);
  const [flash, setFlash] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const el = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const state = open ? "open" : hover || flash ? "peek" : "rest";

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 10_000);
    return () => clearInterval(t);
  }, []);

  // Like a notification: briefly peek when the front window changes.
  useEffect(() => {
    if (!current) return;
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 1800);
    return () => clearTimeout(t);
  }, [current?.id, current?.label]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => { if (!el.current?.contains(e.target as Node)) setOpen(false); };
    // Capture phase so Escape closes the island before the desktop's handler closes a window.
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { e.stopPropagation(); setOpen(false); } };
    document.addEventListener("pointerdown", away);
    window.addEventListener("keydown", esc, true);
    return () => { document.removeEventListener("pointerdown", away); window.removeEventListener("keydown", esc, true); };
  }, [open]);

  const pick = (id: Id) => { setOpen(false); onPick(id); };
  const glyph = (
    <span aria-hidden className="w-6 h-6 shrink-0 flex items-center justify-center rounded-full bg-[var(--accent-mid)] text-[13px] text-white">
      {current?.icon ?? <b className="font-mono text-[11px]">P</b>}
    </span>
  );
  const status = (
    <span className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
      <span aria-hidden className="w-2 h-2 rounded-full bg-[var(--green)]" />
      {state !== "rest" && "Open to work"}
    </span>
  );

  return (
    <div className="fixed inset-x-0 top-1.5 z-[60] flex justify-center pointer-events-none">
      <motion.div
        ref={el}
        layout
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        initial={false}
        animate={{ borderRadius: open ? 26 : 18 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
        className="pointer-events-auto overflow-hidden glass text-[var(--text)]"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {open ? (
            <motion.div
              key="open"
              layout // children of a layout-animated parent get scale-corrected only if they opt in, otherwise text stretches
              role="dialog"
              aria-label="Status"
              tabIndex={-1}
              autoFocus // the pill button unmounts on open, so keyboard focus moves into the panel
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="w-[min(92vw,360px)] p-4 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span aria-hidden className="w-11 h-11 shrink-0 flex items-center justify-center rounded-2xl bg-[var(--accent-mid)] text-lg font-bold text-white">P</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold">Patrius Castro</div>
                  <div className="text-xs text-[var(--muted)]">Full-Stack Developer</div>
                </div>
                {status}
              </div>
              <div>
                <div className="mb-2 text-[10px] uppercase tracking-[0.12em] text-[var(--muted2)]">Windows</div>
                {windows.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {windows.map(w => (
                      <button key={w.id} onClick={() => pick(w.id)}
                        className={`h-8 px-3 flex items-center gap-2 rounded-full text-xs transition-colors hover:bg-[var(--text)]/15 ${w.id === current?.id ? "bg-[var(--text)]/12 text-[var(--text)]" : "bg-[var(--text)]/[0.06] text-[var(--text-sub)]"}`}>
                        <span aria-hidden>{w.icon}</span>{w.label}
                      </button>
                    ))}
                  </div>
                ) : <div className="text-xs text-[var(--muted)]">No windows open</div>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => pick(contact)} className="flex-1 h-9 flex items-center justify-center gap-2 rounded-full bg-[var(--text)] text-[var(--bg)] text-xs font-semibold transition-opacity hover:opacity-85">
                  <FiMail aria-hidden /> Contact
                </button>
                <a href="/files/Castro_Resume.pdf" download className="flex-1 h-9 flex items-center justify-center gap-2 rounded-full bg-[var(--text)]/10 text-[var(--text)] text-xs font-semibold no-underline transition-colors hover:bg-[var(--text)]/15">
                  <FiDownload aria-hidden /> CV
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key={state}
              layout
              aria-expanded={false}
              aria-label="Open status island"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={`h-8 pl-1 pr-3 flex items-center text-xs ${state === "peek" ? "w-[min(calc(100vw-11rem),340px)] gap-2.5" : "w-40 justify-between"}`}
            >
              {glyph}
              {state === "peek"
                ? <span className="flex-1 min-w-0 truncate text-left">
                    <b className="font-semibold">{current?.label ?? "Patrius Castro"}</b>
                    <span className="text-[var(--muted)]"> · {current ? "open" : "Full-Stack Dev"}</span>
                  </span>
                : <span className="font-semibold tabular-nums">{time}</span>}
              {status}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
