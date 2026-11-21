import type { CSSProperties } from "react";
import { Flower } from "@/components/Flower";
import { SITE } from "@/lib/site";

const step = (r: number) => ({ "--r": r }) as CSSProperties;

const PETALS = [
  { top: "12%", left: "6%", size: 22, color: "#EFB8BC", delay: "0s" },
  { top: "70%", left: "12%", size: 16, color: "#D98C93", delay: "1.5s" },
  { top: "18%", left: "88%", size: 18, color: "#F3D5D3", delay: "3s" },
  { top: "78%", left: "82%", size: 24, color: "#EFB8BC", delay: "2.2s" },
  { top: "45%", left: "52%", size: 12, color: "#C9A15B", delay: "4s" },
];

export default function Home() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-cream">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-blush/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-gold/15 blur-3xl" />

      {PETALS.map((p, i) => (
        <svg
          key={i}
          viewBox="-10 -20 20 20"
          className="float-petal reveal pointer-events-none"
          style={{ top: p.top, left: p.left, width: p.size, animationDelay: p.delay, ...step(4) }}
          aria-hidden="true"
        >
          <path d="M0 0C-4.5 -3 -5 -8.5 0 -10C5 -8.5 4.5 -3 0 0Z" fill={p.color} />
        </svg>
      ))}

      <header
        className="reveal relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6"
        style={step(0)}
      >
        <span className="font-display text-2xl italic text-ink">{SITE.name}</span>
        <span className="hidden text-xs uppercase tracking-[0.3em] text-ink/60 sm:block">
          Florería artesanal
        </span>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100svh-88px)] max-w-6xl items-center gap-12 px-4 pb-20 sm:px-6 md:grid-cols-2">
        <div>
          <p
            className="reveal mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-rose-deep"
            style={step(1)}
          >
            <span className="h-px w-10 bg-gold" /> Hecho a mano
          </p>
          <h1
            className="reveal font-display text-5xl font-medium leading-[0.95] text-ink sm:text-7xl lg:text-8xl"
            style={step(2)}
          >
            {SITE.tagline}
          </h1>
          <p className="reveal mt-8 max-w-md text-lg leading-relaxed text-ink/70" style={step(3)}>
            {SITE.description}
          </p>
        </div>

        <div className="reveal relative mx-auto aspect-square w-full max-w-md" style={step(2)}>
          <div className="absolute inset-[6%] rounded-full bg-linear-to-br from-blush to-cream" />
          <div className="absolute inset-[6%] rounded-full ring-1 ring-gold/30" />
          <Flower
            id="hero"
            className="flower-idle relative h-full w-full drop-shadow-[0_30px_40px_rgba(180,84,106,0.25)]"
          />
        </div>
      </section>
    </main>
  );
}
