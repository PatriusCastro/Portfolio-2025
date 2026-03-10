"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Typewriter ───────────────────────────────────────────────────────────────
const roles = ["Full-Stack Developer", "Frontend Specialist", "UI Craftsman", "React Engineer"];

function useTypewriter(texts: string[], speed = 65, pause = 2400) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx]             = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length)
      t = setTimeout(() => setCharIdx(c => c + 1), speed);
    else if (!deleting && charIdx === current.length)
      t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && charIdx > 0)
      t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    else { setDeleting(false); setIdx(i => (i + 1) % texts.length); }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return displayed;
}

// ─── Particle canvas background ───────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    // Particle config
    const COUNT   = 72;
    const MAX_DIST = 130;

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
    }

    let particles: Particle[] = [];

    function resize() {
      W = canvas!.width  = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }

    function init() {
      resize();
      particles = Array.from({ length: COUNT }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r:  Math.random() * 1.5 + 0.5,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(100, 130, 220, ${alpha})`;
            ctx!.lineWidth   = 0.8;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw dots
      particles.forEach(p => {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(100, 130, 220, 0.55)";
        ctx!.fill();
      });
    }

    function update() {
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
    }

    function loop() {
      update();
      draw();
      animId = requestAnimationFrame(loop);
    }

    init();
    loop();

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}

// Hero 
export default function Hero() {
  const role = useTypewriter(roles);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative flex flex-col items-center justify-center min-h-[88vh] py-12 text-center overflow-hidden"
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Terminal prompt */}
        <div
          className="mb-7 flex items-center gap-2"
          style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em" }}
        >
          <span style={{ color: "var(--green)" }}>~/portfolio</span>
          <span style={{ color: "var(--muted2)" }}>›</span>
          <span>whoami</span>
        </div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-5 tracking-tight"
        >
          <span className="hero-metallic">Patrius Castro</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-11 h-6"
          style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--muted)", letterSpacing: "0.04em" }}
        >
          <span style={{ color: "var(--accent-dim)" }}>$ </span>
          <span style={{ color: "var(--text)" }}>{role}</span>
          <span className="cursor ml-0.5" style={{ color: "var(--accent-dim)" }}>▌</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-3"
        >
          <button
            className="btn-primary"
            style={{ fontFamily: "var(--font-mono)" }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Me
          </button>
          <a
            href="/files/Patrick-Josuah-Castro-CV.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{ fontFamily: "var(--font-mono)", textDecoration: "none" }}
          >
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{ zIndex: 10 }}>
        SCROLL
        <div className="scroll-indicator-line" />
      </div>
    </motion.section>
  );
}