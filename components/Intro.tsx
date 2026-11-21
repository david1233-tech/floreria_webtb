"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Flower } from "./Flower";
import { SITE } from "@/lib/site";

/** Momento (ms) en que la flor explota y se revela la página. */
const BURST_AT = 4100;
/** Duración de la explosión de pétalos antes de retirar la intro. */
const BURST_DURATION = 2300;

/** Destellos dorados que suben; valores fijos para que servidor y cliente coincidan. */
const SPARKS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  delay: 1.4 + ((i * 7) % 10) * 0.18,
  duration: 3 + ((i * 5) % 4) * 0.6,
  size: 2 + (i % 3),
}));

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Intro() {
  const [phase, setPhase] = useState<"playing" | "open" | "gone">("playing");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timers = useRef<number[]>([]);
  const stopBurst = useRef<() => void>(() => {});
  const opened = useRef(false);

  const open = useCallback(() => {
    if (opened.current) return;
    opened.current = true;
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const reduce = prefersReducedMotion();
    setPhase("open");
    if (!reduce && canvasRef.current) stopBurst.current = burstPetals(canvasRef.current);
    timers.current.push(
      window.setTimeout(() => setPhase("gone"), reduce ? 700 : BURST_DURATION),
    );
  }, []);

  useEffect(() => {
    const id = window.setTimeout(open, prefersReducedMotion() ? 1600 : BURST_AT);
    timers.current.push(id);
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      stopBurst.current();
    };
  }, [open]);

  if (phase === "gone") return null;

  return (
    <div className={`intro-root ${phase === "open" ? "open" : ""}`}>
      <div className="intro-veil" aria-hidden="true">
        <div className="intro-stem" />
        {SPARKS.map((s, i) => (
          <span
            key={i}
            className="intro-spark"
            style={{
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay.toFixed(2)}s`,
              animationDuration: `${s.duration.toFixed(2)}s`,
            }}
          />
        ))}
        <div className="intro-flower">
          <Flower id="intro" bloom className="h-full w-full" />
        </div>
        <div className="intro-text">
          <p className="intro-name">
            {Array.from(SITE.name).map((ch, i) => (
              <span key={i} className="intro-letter" style={{ "--i": i } as CSSProperties}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </p>
          <span className="intro-line" />
          <p className="intro-tagline">{SITE.tagline}</p>
        </div>
      </div>
      <div className="intro-flash" aria-hidden="true" />
      <div className="intro-ring" aria-hidden="true" />
      <canvas ref={canvasRef} className="intro-canvas" aria-hidden="true" />
      <button type="button" className="intro-skip" onClick={open}>
        Saltar
      </button>
    </div>
  );
}

/** Explosión de pétalos en canvas desde el centro de la flor. Devuelve una función para detenerla. */
function burstPetals(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const cx = w / 2;
  const cy = h / 2 - h * 0.15;
  const small = w < 640;
  const colors = ["#F8E4E1", "#EFB8BC", "#D98C93", "#B4546A", "#8E3550", "#FBF6F0"];

  const particles = [
    ...Array.from({ length: small ? 90 : 170 }, () => makeParticle(false)),
    ...Array.from({ length: small ? 30 : 60 }, () => makeParticle(true)),
  ];

  function makeParticle(gold: boolean) {
    const angle = Math.random() * Math.PI * 2;
    const speed = (4 + Math.random() * (gold ? 22 : 18)) * (small ? 0.75 : 1);
    return {
      gold,
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      flip: Math.random() * Math.PI * 2,
      vf: 0.05 + Math.random() * 0.15,
      size: gold ? 1.2 + Math.random() * 2 : 8 + Math.random() * 16,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }

  const start = performance.now();
  let last = start;
  let raf = 0;

  const frame = (now: number) => {
    const t = now - start;
    const k = Math.min((now - last) / 16.67, 3);
    last = now;
    ctx.clearRect(0, 0, w, h);

    const alpha = t > BURST_DURATION * 0.55 ? 1 - (t - BURST_DURATION * 0.55) / (BURST_DURATION * 0.45) : 1;
    ctx.globalAlpha = Math.max(0, alpha);

    for (const p of particles) {
      const drag = Math.pow(0.972, k);
      p.vx *= drag;
      p.vy = p.vy * drag + 0.16 * k;
      p.x += p.vx * k;
      p.y += p.vy * k;
      p.rot += p.vr * k;
      p.flip += p.vf * k;

      ctx.save();
      ctx.translate(p.x, p.y);
      if (p.gold) {
        ctx.fillStyle = "#F3D9A0";
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.rotate(p.rot);
        ctx.scale(Math.cos(p.flip), 1);
        const s = p.size;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-s * 0.45, -s * 0.3, -s * 0.5, -s * 0.85, 0, -s);
        ctx.bezierCurveTo(s * 0.5, -s * 0.85, s * 0.45, -s * 0.3, 0, 0);
        ctx.fill();
      }
      ctx.restore();
    }

    if (t < BURST_DURATION) raf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, w, h);
  };

  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}
