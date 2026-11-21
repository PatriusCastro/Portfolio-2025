"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import Link from "next/link";
import { FiActivity, FiDownload, FiFileText, FiFolder, FiHome, FiImage, FiMail, FiMaximize2, FiMinimize2, FiMinus, FiMonitor, FiX } from "react-icons/fi";
import { Explorer, Mail, Notepad, TaskManager, Viewer } from "./DesktopApps";
import { projects } from "./Project";
import Island from "./Island";
import ThemeToggle from "./ThemeToggle";

// Desktop-size window frames; below lg (phones and portrait tablets) every window is a full-screen sheet.
const APPS = {
  projects: { title: "Projects — File Explorer", icon: <FiFolder />, body: null, frame: { "--x": "36vw", "--y": "9vh",  "--w": "60vw", "--h": "74vh" } },
  about:    { title: "about.txt — Notepad", icon: <FiFileText />, body: <Notepad />, frame: { "--x": "4vw",  "--y": "42vh", "--w": "30vw", "--h": "43vh" } },
  skills:   { title: "Skills — Task Manager", icon: <FiActivity />, body: <TaskManager />, frame: { "--x": "20vw", "--y": "14vh", "--w": "58vw", "--h": "62vh" } },
  contact:  { title: "New Message — Mail", icon: <FiMail />, body: <Mail />, frame: { "--x": "24vw", "--y": "12vh", "--w": "62vw", "--h": "70vh" } },
  // Opened from the explorer, not the dock; its title and body follow the chosen project.
  viewer:   { title: "Project", icon: <FiImage />, body: null, frame: { "--x": "16vw", "--y": "8vh", "--w": "68vw", "--h": "76vh" } },
} as const;
type AppId = keyof typeof APPS;

// Dock tiles are neutral squircles in the theme's surface colours, like macOS tinted icons; only the focused app takes the accent.
const tile = "w-full h-full flex items-center justify-center rounded-[23%] bg-gradient-to-b from-[var(--surface)] to-[var(--surface2)] border border-[var(--glass-edge)] text-[var(--text-sub)] no-underline shadow-[inset_0_1px_0_var(--glass-hi),0_1px_3px_rgba(0,0,0,0.18)] transition-colors hover:text-[var(--accent-mid)] aria-[current=true]:text-[var(--accent-mid)] [&>svg]:w-[44%] [&>svg]:h-[44%]";

// One dock slot. On hover-capable screens it magnifies with the pointer's distance, like the macOS dock.
function DockItem({ mouseX, magnify, label, running, className = "", children }: {
  mouseX: MotionValue<number>; magnify: boolean; label: string; running?: boolean; className?: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dist = useTransform(mouseX, x => { const r = ref.current?.getBoundingClientRect(); return r ? x - r.left - r.width / 2 : Infinity; });
  const size = useSpring(useTransform(dist, [-150, 0, 150], [48, 76, 48]), { mass: 0.1, stiffness: 180, damping: 13 });
  return (
    <motion.div ref={ref} style={magnify ? { width: size, height: size } : undefined} className={`${className} group relative shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12`}>
      {children}
      <span aria-hidden className="glass hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2.5 py-1 rounded-lg text-xs font-medium text-[var(--text)] whitespace-nowrap pointer-events-none opacity-0 transition-opacity group-hover:opacity-100">{label}</span>
      {running && <span aria-hidden className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--text)] opacity-70" />}
    </motion.div>
  );
}

const barBtn = "w-11 h-11 flex items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface2)] hover:text-[var(--text)]";

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
  max: "lg:inset-x-2",
  left: "lg:left-2 lg:right-[calc(50%+0.25rem)]",
  right: "lg:right-2 lg:left-[calc(50%+0.25rem)]",
};
const snapFrame = "lg:top-11 lg:bottom-[6.25rem] lg:rounded-xl";
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
    // Pointer events can outpace the display; apply only the latest one once per frame.
    let last: PointerEvent | null = null;
    const move = (ev: PointerEvent) => { if (!last) requestAnimationFrame(() => { apply(last!); last = null; }); last = ev; };
    const apply = (ev: PointerEvent) => {
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
      // will-change keeps each window on its own GPU layer, so dragging and scaling don't repaint it every frame.
      className={`fixed inset-x-2 top-12 bottom-[5.25rem] rounded-2xl md:inset-x-0 md:mx-auto md:w-[min(100%-3rem,46rem)] md:top-14 md:bottom-24 lg:mx-0 flex flex-col overflow-hidden border border-[var(--glass-edge)] bg-[var(--surface)] will-change-transform
        ${snap
          ? `${SNAPS[snap]} ${snapFrame} lg:w-auto`
          : "lg:inset-auto lg:left-[var(--x)] lg:top-[var(--y)] lg:w-[var(--w)] lg:h-[var(--h)] lg:rounded-xl lg:min-w-80 lg:min-h-56 lg:max-w-[96vw] lg:max-h-[86dvh]"}
        ${active
          ? "shadow-[0_28px_80px_rgba(0,0,0,0.38),0_4px_14px_rgba(0,0,0,0.16)]"
          : "shadow-[0_10px_30px_rgba(0,0,0,0.2)]"}`}
    >
      {/* Title bar is the drag handle; phones keep windows as fixed full-screen sheets. */}
      <div
        onPointerDown={e => { if (!max && window.matchMedia("(min-width: 1024px)").matches) drag.start(e); }}
        onDoubleClick={toggleMax}
        className={`relative h-11 lg:h-10 shrink-0 flex items-center gap-2 pl-4 lg:pl-3.5 pr-1 border-b border-[var(--glass-edge)] select-none touch-none
          ${max ? "" : "lg:cursor-grab lg:active:cursor-grabbing"} ${active ? "bg-[var(--surface2)]/60" : ""}`}
      >
        {/* macOS traffic lights for a mouse; their glyphs show on hover. Inactive windows grey them out. */}
        <div className="group/lights hidden lg:pointer-fine:flex items-center gap-2 z-10" onPointerDown={e => e.stopPropagation()} onDoubleClick={e => e.stopPropagation()}>
          {([
            [`Close ${app.title}`, onClose, "#ff5f57", <FiX key="x" />],
            [`Minimise ${app.title}`, onMinimize, "#febc2e", <FiMinus key="m" />],
            [`${max ? "Restore" : "Maximise"} ${app.title}`, toggleMax, "#28c840", max ? <FiMinimize2 key="r" /> : <FiMaximize2 key="r" />],
          ] as const).map(([label, act, color, glyph]) => (
            <button key={label} aria-label={label} onClick={act} style={{ "--c": color } as React.CSSProperties}
              className={`w-3 h-3 rounded-full ring-1 ring-inset ring-black/10 flex items-center justify-center text-[8px] text-black/60 [&>svg]:opacity-0 group-hover/lights:[&>svg]:opacity-100 group-focus-within/lights:[&>svg]:opacity-100
                ${active ? "bg-[var(--c)]" : "bg-[var(--muted2)]/35 group-hover/lights:bg-[var(--c)]"}`}
            >{glyph}</button>
          ))}
        </div>
        <h2 className={`flex-1 min-w-0 truncate flex items-center gap-2 text-[13px] font-semibold lg:pointer-fine:absolute lg:pointer-fine:inset-x-24 lg:pointer-fine:justify-center pointer-events-none ${active ? "text-[var(--text)]" : "text-[var(--muted)]"}`}>
          <span aria-hidden className="shrink-0 text-sm opacity-70">{app.icon}</span><span className="truncate">{app.title}</span>
        </h2>
        {/* Touch screens get full-size buttons instead of the tiny lights. */}
        <div className="flex lg:pointer-fine:hidden" onPointerDown={e => e.stopPropagation()} onDoubleClick={e => e.stopPropagation()}>
          <button aria-label={`Minimise ${app.title}`} onClick={onMinimize} className={barBtn}><FiMinus /></button>
          <button aria-label={max ? `Restore ${app.title}` : `Maximise ${app.title}`} onClick={toggleMax} className={`${barBtn} hidden lg:flex`}>{max ? <FiMinimize2 /> : <FiMaximize2 />}</button>
          <button aria-label={`Close ${app.title}`} onClick={onClose} className={barBtn}><FiX /></button>
        </div>
      </div>
      {children}
      {!max && Object.entries(GRIPS).map(([dir, cls]) => (
        <div key={dir} aria-hidden onPointerDown={resize(dir)} className={`hidden lg:block absolute z-10 touch-none ${cls}`} />
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
  // Dock magnification: only for a mouse on a wide screen, and never with reduced motion.
  const mouseX = useMotionValue(Infinity);
  const [magnify, setMagnify] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setMagnify(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const titleOf = (id: AppId) => (id === "viewer" ? `${projects[project].title} — Viewer` : APPS[id].title);
  const item = (id: AppId) => ({ id, icon: APPS[id].icon, label: titleOf(id).split(" — ")[0] });

  useEffect(() => {
    // Phones start on the bare desktop: a window there covers the whole screen.
    if (window.matchMedia("(min-width: 1024px)").matches) setOpen(["about", "projects"]);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && topRef.current) close(topRef.current); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={desktop} className="relative z-10 h-dvh overflow-hidden">
      <div className="wallpaper" aria-hidden><span /></div>
      <header className="absolute inset-x-0 top-0 h-11 px-4 flex items-center justify-between font-mono text-xs text-[var(--muted)]">
        <span className="font-bold text-[var(--text)]">patrius</span>
        <ThemeToggle />
      </header>
      <Island current={top ? item(top) : null} windows={open.map(item)} onPick={focus} contact="contact" />

      <main className="absolute left-6 right-6 top-20 lg:left-[4vw] lg:top-[12vh] lg:w-[34vw] lg:right-auto">
        <div className="mb-4 font-mono text-[11px] tracking-[0.1em] text-[var(--muted)]">
          <span className="text-[var(--green)]">~/portfolio</span> › whoami
        </div>
        <h1 className="text-5xl lg:text-[clamp(2.5rem,4vw,3.75rem)] font-extrabold tracking-tight mb-4">
          <span className="hero-metallic">Patrius Castro</span>
        </h1>
        <p className="mb-7 font-mono text-[13px] text-[var(--text)]">
          <span className="text-[var(--accent-dim)]">$ </span>Full-Stack Developer
        </p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => focus("contact")} className="btn-primary font-mono">Contact Me</button>
          <a href="/files/Castro_Resume.pdf" download className="btn-ghost font-mono no-underline">Download CV</a>
        </div>

        {/* Touch screens have no dock tooltips, so the home screen lists the apps with their names, like a phone launcher. */}
        <ul aria-label="Apps" className="lg:hidden mt-12 grid grid-cols-4 sm:grid-cols-6 gap-x-3 gap-y-6 max-w-md sm:max-w-xl">
          {([
            ["Projects", <FiFolder key="i" />, () => focus("projects")],
            ["About", <FiFileText key="i" />, () => focus("about")],
            ["Skills", <FiActivity key="i" />, () => focus("skills")],
            ["Contact", <FiMail key="i" />, () => focus("contact")],
            ["CV", <FiDownload key="i" />, "/files/Castro_Resume.pdf"],
            ["Classic", <FiMonitor key="i" />, "/classic"],
          ] as const).map(([label, icon, act]) => (
            <li key={label} className="flex flex-col items-center gap-1.5">
              <span className="w-14 h-14">
                {typeof act === "function"
                  ? <button onClick={act} aria-label={label} className={tile}>{icon}</button>
                  : label === "CV"
                    ? <a href={act} download aria-label="Download CV" className={tile}>{icon}</a>
                    : <Link href={act} aria-label="Classic site" className={tile}>{icon}</Link>}
              </span>
              <span aria-hidden className="text-[11px] font-medium text-[var(--text-sub)]">{label}</span>
            </li>
          ))}
        </ul>
      </main>

      {hint && <div aria-hidden className={`fixed inset-x-0 z-[9] border border-[var(--border-hover)] bg-[var(--accent-pale)] ${SNAPS[hint]} ${snapFrame}`} />}

      <AnimatePresence>
        {open.map((id, z) => (
          <Window key={id} id={id} title={titleOf(id)} z={z} active={id === top} minimized={min.includes(id)} bounds={desktop} onFocus={() => focus(id)} onMinimize={() => minimize(id)} onClose={() => close(id)} onHint={setHint}>
            {id === "projects" ? <Explorer onOpen={i => { setProject(i); focus("viewer"); }} />
              : id === "viewer" ? <Viewer index={project} />
              : APPS[id].body}
          </Window>
        ))}
      </AnimatePresence>

      <nav
        aria-label="Dock"
        onMouseMove={e => magnify && mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        // Phones scroll the dock sideways if it overflows; md+ lets magnified icons and tooltips rise above it.
        className="glass fixed z-50 bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 max-w-[calc(100vw-1rem)] overflow-x-auto md:overflow-visible md:h-[68px] px-2 pt-2 pb-2.5 flex items-end gap-1.5 sm:gap-2 rounded-[20px] md:rounded-[22px] [scrollbar-width:none]"
      >
        <DockItem mouseX={mouseX} magnify={magnify} label="Show desktop">
          <button aria-label="Show desktop" onClick={() => setMin(open)} className={tile}><FiHome /></button>
        </DockItem>
        {(Object.keys(APPS) as AppId[]).filter(id => id !== "viewer" || open.includes(id)).map(id => (
          <DockItem key={id} mouseX={mouseX} magnify={magnify} label={titleOf(id).split(" — ")[0]} running={open.includes(id)}>
            <button aria-label={APPS[id].title} aria-current={id === top || undefined} data-dock={id} onClick={() => dock(id)} className={tile}>
              {APPS[id].icon}
            </button>
          </DockItem>
        ))}
        <DockItem mouseX={mouseX} magnify={magnify} label="Download CV">
          <a href="/files/Castro_Resume.pdf" download aria-label="Download CV" className={tile}><FiDownload /></a>
        </DockItem>
        <span aria-hidden className="hidden sm:block self-stretch w-px my-1.5 shrink-0 bg-[var(--glass-edge)] mx-0.5" />
        <DockItem mouseX={mouseX} magnify={magnify} label="Classic site" className="hidden sm:block"> {/* phones reach it from the home-screen launcher */}
          <Link href="/classic" aria-label="Classic site" className={tile}><FiMonitor /></Link>
        </DockItem>
      </nav>
    </div>
  );
}
