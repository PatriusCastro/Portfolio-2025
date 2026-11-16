"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls, useMotionValue } from "framer-motion";
import Link from "next/link";
import { FiActivity, FiDownload, FiFileText, FiFolder, FiHome, FiImage, FiMail, FiMaximize2, FiMinimize2, FiMinus, FiMonitor, FiX } from "react-icons/fi";
import { Explorer, Mail, Notepad, TaskManager, Viewer } from "./DesktopApps";
import { projects } from "./Project";
import ThemeToggle from "./ThemeToggle";

// Desktop-size window frames; below md every window is a full-screen sheet.
const APPS = {
  projects: { title: "Projects — File Explorer", icon: <FiFolder />, body: null, frame: { "--x": "36vw", "--y": "9vh",  "--w": "60vw", "--h": "74vh" } },
  about:    { title: "about.txt — Notepad", icon: <FiFileText />, body: <Notepad />, frame: { "--x": "4vw",  "--y": "42vh", "--w": "30vw", "--h": "43vh" } },
  skills:   { title: "Skills — Task Manager", icon: <FiActivity />, body: <TaskManager />, frame: { "--x": "20vw", "--y": "14vh", "--w": "58vw", "--h": "62vh" } },
  contact:  { title: "New Message — Mail", icon: <FiMail />, body: <Mail />, frame: { "--x": "24vw", "--y": "12vh", "--w": "62vw", "--h": "70vh" } },
  // Opened from the explorer, not the dock; its title and body follow the chosen project.
  viewer:   { title: "Project", icon: <FiImage />, body: null, frame: { "--x": "16vw", "--y": "8vh", "--w": "68vw", "--h": "76vh" } },
} as const;
type AppId = keyof typeof APPS;

const dockBtn =
  "relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center rounded-xl text-xl border border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] no-underline transition-colors hover:border-[var(--border-hover)] hover:text-[var(--accent-mid)]";

const barBtn = "w-9 h-9 flex items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface2)] hover:text-[var(--text)]";

// Resize grips on every edge and corner, keyed by compass direction.
const GRIPS = {
  n: "top-0 inset-x-2.5 h-1.5 cursor-ns-resize", s: "bottom-0 inset-x-2.5 h-1.5 cursor-ns-resize",
  e: "right-0 inset-y-2.5 w-1.5 cursor-ew-resize", w: "left-0 inset-y-2.5 w-1.5 cursor-ew-resize",
  nw: "top-0 left-0 w-2.5 h-2.5 cursor-nwse-resize", se: "bottom-0 right-0 w-2.5 h-2.5 cursor-nwse-resize",
  ne: "top-0 right-0 w-2.5 h-2.5 cursor-nesw-resize", sw: "bottom-0 left-0 w-2.5 h-2.5 cursor-nesw-resize",
};

// Snap zones: drag a window's title bar to the top edge to maximise, or to a side edge to fill that half.
type Snap = "max" | "left" | "right";
const SNAPS: Record<Snap, string> = {
  max: "md:inset-x-2",
  left: "md:left-2 md:right-[calc(50%+0.25rem)]",
  right: "md:right-2 md:left-[calc(50%+0.25rem)]",
};
const snapFrame = "md:top-11 md:bottom-[6.25rem] md:rounded-xl";
const zoneAt = (p: { x: number; y: number }): Snap | null =>
  p.y < 16 ? "max" : p.x < 16 ? "left" : p.x > window.innerWidth - 16 ? "right" : null;

function Window({ id, title, children, z, active, minimized, bounds, onFocus, onMinimize, onClose, onHint }: {
  id: AppId; title: string; children: React.ReactNode; z: number; active: boolean; minimized: boolean; onMinimize: () => void; bounds: React.RefObject<HTMLDivElement | null>; onFocus: () => void; onClose: () => void;
  onHint: (zone: Snap | null) => void;
}) {
  const app = { ...APPS[id], title };
  const drag = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [snap, setSnap] = useState<Snap | null>(null);
  const max = snap !== null;
  const el = useRef<HTMLElement>(null);
  const restore = useRef({ x: 0, y: 0, w: "", h: "" });
  // Opening, minimising and restoring scale the window out of / into its dock icon: put the
  // transform origin on the icon, measured from the window's own unscaled top-left corner.
  const originX = useMotionValue("50%");
  const originY = useMotionValue("50%");
  useLayoutEffect(() => {
    const icon = document.querySelector(`[data-dock="${id}"]`)?.getBoundingClientRect();
    if (!icon || !el.current) return;
    originX.set(`${icon.left + icon.width / 2 - el.current.offsetLeft - x.get()}px`);
    originY.set(`${icon.top + icon.height / 2 - el.current.offsetTop - y.get()}px`);
  }, [minimized, id, originX, originY, x, y]);

  const snapTo = (to: Snap | null) => {
    // Dragging and resizing write a transform and inline width/height; park them while snapped.
    const s = el.current!.style;
    x.stop(); y.stop(); // the drag's settle animation would otherwise write the old position back
    if (!snap && to) restore.current = { x: x.get(), y: y.get(), w: s.width, h: s.height };
    if (to) { x.set(0); y.set(0); s.width = s.height = ""; }
    else { x.set(restore.current.x); y.set(restore.current.y); s.width = restore.current.w; s.height = restore.current.h; }
    setSnap(to);
  };
  const toggleMax = () => snapTo(snap ? null : "max");

  const resize = (dir: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    const node = el.current!, r = node.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY, x0 = x.get(), y0 = y.get();
    const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
    const move = (ev: PointerEvent) => {
      // West/north edges grow leftwards/upwards, so they shift the window as they resize it.
      const w = clamp(r.width + (dir.includes("w") ? sx - ev.clientX : ev.clientX - sx), 320, window.innerWidth * 0.96);
      const h = clamp(r.height + (dir.includes("n") ? sy - ev.clientY : ev.clientY - sy), 224, window.innerHeight * 0.86);
      if (/[ew]/.test(dir)) node.style.width = `${w}px`;
      if (/[ns]/.test(dir)) node.style.height = `${h}px`;
      if (dir.includes("w")) x.set(x0 + r.width - w);
      if (dir.includes("n")) y.set(y0 + r.height - h);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", () => window.removeEventListener("pointermove", move), { once: true });
  };

  return (
    <motion.section
      ref={el}
      aria-label={app.title}
      onPointerDown={onFocus}
      drag
      dragListener={false}
      dragControls={drag}
      dragConstraints={bounds}
      dragMomentum={false}
      dragElastic={0}
      onDrag={(_, info) => onHint(zoneAt(info.point))}
      onDragEnd={(_, info) => { onHint(null); const zone = zoneAt(info.point); if (zone) snapTo(zone); }}
      inert={minimized}
      initial={{ opacity: 0, scale: 0 }}
      animate={minimized ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.16 } }}
      transition={{ duration: 0.38, ease: [0.3, 0, 0.15, 1] }}
      style={{ x, y, originX, originY, zIndex: 10 + z, ...(app.frame as React.CSSProperties) }}
      className={`fixed inset-x-0 top-11 bottom-24 flex flex-col overflow-hidden border bg-[var(--surface)] transition-[border-color,box-shadow] duration-200
        ${snap
          ? `${SNAPS[snap]} ${snapFrame}`
          : "md:inset-auto md:left-[var(--x)] md:top-[var(--y)] md:w-[var(--w)] md:h-[var(--h)] md:rounded-2xl md:min-w-80 md:min-h-56 md:max-w-[96vw] md:max-h-[86dvh]"}
        ${active
          ? "border-[var(--border-hover)] shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
          : "border-[var(--border)] shadow-[0_8px_24px_rgba(0,0,0,0.25)]"}`}
    >
      {/* Title bar is the drag handle; phones keep windows as fixed full-screen sheets. */}
      <div
        onPointerDown={e => { if (!max && window.matchMedia("(min-width: 768px)").matches) drag.start(e); }}
        onDoubleClick={toggleMax}
        className={`h-11 shrink-0 flex items-center gap-2.5 pl-4 pr-1 border-b border-[var(--border)] select-none touch-none transition-colors duration-200
          ${max ? "" : "md:cursor-grab md:active:cursor-grabbing"} ${active ? "bg-[var(--surface2)]" : ""}`}
      >
        <span aria-hidden className={`text-sm ${active ? "text-[var(--accent-mid)]" : "text-[var(--muted)]"}`}>{app.icon}</span>
        <h2 className={`flex-1 font-mono text-xs tracking-wide ${active ? "text-[var(--text)]" : "text-[var(--muted)]"}`}>{app.title}</h2>
        <button
          aria-label={`Minimise ${app.title}`}
          onPointerDown={e => e.stopPropagation()}
          onDoubleClick={e => e.stopPropagation()}
          onClick={onMinimize}
          className={barBtn}
        >
          <FiMinus />
        </button>
        <button
          aria-label={max ? `Restore ${app.title}` : `Maximise ${app.title}`}
          onPointerDown={e => e.stopPropagation()}
          onDoubleClick={e => e.stopPropagation()}
          onClick={toggleMax}
          className={`${barBtn} hidden md:flex`}
        >
          {max ? <FiMinimize2 /> : <FiMaximize2 />}
        </button>
        <button
          aria-label={`Close ${app.title}`}
          onPointerDown={e => e.stopPropagation()}
          onDoubleClick={e => e.stopPropagation()}
          onClick={onClose}
          className={barBtn}
        >
          <FiX />
        </button>
      </div>
      {children}
      {!max && Object.entries(GRIPS).map(([dir, cls]) => (
        <div key={dir} aria-hidden onPointerDown={resize(dir)} className={`hidden md:block absolute z-10 touch-none ${cls}`} />
      ))}
    </motion.section>
  );
}

export default function Desktop() {
  const desktop = useRef<HTMLDivElement>(null);
  // Open windows, back to front: the last one is on top.
  const [open, setOpen] = useState<AppId[]>([]);

  // Minimised windows stay open (and keep their state) but are tucked into the dock.
  const [min, setMin] = useState<AppId[]>([]);
  const top = open.findLast(id => !min.includes(id));
  const topRef = useRef(top);
  topRef.current = top;

  const focus = (id: AppId) => { setOpen(o => [...o.filter(x => x !== id), id]); setMin(m => m.filter(x => x !== id)); };
  const close = (id: AppId) => { setOpen(o => o.filter(x => x !== id)); setMin(m => m.filter(x => x !== id)); };
  const minimize = (id: AppId) => setMin(m => [...m.filter(x => x !== id), id]);
  // Dock icon: opens or restores a window, brings a background one forward, minimises the front one.
  const dock = (id: AppId) => (id === top ? minimize(id) : focus(id));
  // Where the window being dragged would snap if dropped now.
  const [hint, setHint] = useState<Snap | null>(null);
  // The project shown in the viewer window.
  const [project, setProject] = useState(0);

  useEffect(() => {
    // Phones start on the bare desktop: a window there covers the whole screen.
    if (window.matchMedia("(min-width: 768px)").matches) setOpen(["about", "projects"]);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && topRef.current) close(topRef.current); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={desktop} className="relative z-10 h-dvh overflow-hidden">
      <div className="wallpaper" aria-hidden />
      <header className="absolute inset-x-0 top-0 h-11 px-4 flex items-center justify-between font-mono text-xs text-[var(--muted)]">
        <span className="font-bold text-[var(--text)]">patrius</span>
        <ThemeToggle />
      </header>

      <main className="absolute left-6 right-6 top-20 md:left-[4vw] md:top-[12vh] md:w-[30vw] md:right-auto">
        <div className="mb-4 font-mono text-[11px] tracking-[0.1em] text-[var(--muted)]">
          <span className="text-[var(--green)]">~/portfolio</span> › whoami
        </div>
        <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
          <span className="hero-metallic">Patrius Castro</span>
        </h1>
        <p className="mb-7 font-mono text-[13px] text-[var(--text)]">
          <span className="text-[var(--accent-dim)]">$ </span>Full-Stack Developer
        </p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => focus("contact")} className="btn-primary font-mono">Contact Me</button>
          <a href="/files/Castro_Resume.pdf" download className="btn-ghost font-mono no-underline">Download CV</a>
        </div>
      </main>

      {hint && <div aria-hidden className={`fixed inset-x-0 z-[9] border border-[var(--border-hover)] bg-[var(--accent-pale)] ${SNAPS[hint]} ${snapFrame}`} />}

      <AnimatePresence>
        {open.map((id, z) => (
          <Window key={id} id={id} title={id === "viewer" ? `${projects[project].title} — Viewer` : APPS[id].title} z={z} active={id === top} minimized={min.includes(id)} bounds={desktop} onFocus={() => focus(id)} onMinimize={() => minimize(id)} onClose={() => close(id)} onHint={setHint}>
            {id === "projects" ? <Explorer onOpen={i => { setProject(i); focus("viewer"); }} />
              : id === "viewer" ? <Viewer index={project} />
              : APPS[id].body}
          </Window>
        ))}
      </AnimatePresence>

      <nav
        aria-label="Dock"
        className="fixed z-50 bottom-4 left-1/2 -translate-x-1/2 max-w-[calc(100vw-1rem)] overflow-x-auto h-[72px] px-3 flex items-center gap-2 rounded-[20px] border border-[var(--border-hover)] bg-[var(--surface)] shadow-xl"
      >
        <button aria-label="Show desktop" onClick={() => setMin(open)} className={dockBtn}><FiHome /></button>
        {(Object.keys(APPS) as AppId[]).filter(id => id !== "viewer" || open.includes(id)).map(id => (
          <button key={id} aria-label={APPS[id].title} title={APPS[id].title} data-dock={id} onClick={() => dock(id)} className={dockBtn}>
            {APPS[id].icon}
            {open.includes(id) && <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[var(--accent-mid)]" />}
          </button>
        ))}
        <a href="/files/Castro_Resume.pdf" download aria-label="Download CV" title="Download CV" className={dockBtn}><FiDownload /></a>
        <span aria-hidden className="w-px h-9 shrink-0 bg-[var(--border-hover)] mx-1" />
        <Link href="/classic" aria-label="Classic site" className="h-10 sm:h-12 px-3 sm:px-4 shrink-0 flex items-center gap-2 rounded-xl border border-[var(--border-hover)] text-[13px] font-semibold text-[var(--accent-mid)] no-underline whitespace-nowrap">
          <FiMonitor /> <span className="hidden sm:inline">Classic site</span>
        </Link>
      </nav>
    </div>
  );
}
