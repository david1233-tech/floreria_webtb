"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Flower } from "@/components/Flower";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SITE } from "@/lib/site";
import { WA_GREETING } from "@/lib/whatsapp";
import type { PaletteKey } from "@/lib/palettes";

type Slide = {
  eyebrow: string;
  title: string;
  text: string;
  cta: { label: string; href: string; external?: boolean };
  palette: PaletteKey;
  accents: [PaletteKey, PaletteKey];
  bg: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: `Florería en ${SITE.city}`,
    title: SITE.tagline,
    text: SITE.description,
    cta: { label: "Ver arreglos", href: "/colecciones" },
    palette: "rosa",
    accents: ["durazno", "lila"],
    bg: "from-cream via-blush/60 to-cream",
  },
  {
    eyebrow: "Amor · Cumpleaños · Aniversario",
    title: "Un detalle para cada ocasión",
    text: "Elige la ocasión y encuentra el arreglo perfecto para sorprender a esa persona especial.",
    cta: { label: "Elegir ocasión", href: "/#ocasiones" },
    palette: "rojo",
    accents: ["rosa", "blanco"],
    bg: "from-[#F6DEDC] via-cream to-[#F6DEDC]",
  },
  {
    eyebrow: `Delivery en ${SITE.deliveryArea}`,
    title: "Pide por WhatsApp, nosotros lo llevamos",
    text: `Atendemos ${SITE.hours.toLowerCase()}. Escríbenos y coordinamos tu pedido en minutos.`,
    cta: { label: "Escribir por WhatsApp", href: WA_GREETING, external: true },
    palette: "amarillo",
    accents: ["durazno", "rosa"],
    bg: "from-[#FBF0D5] via-cream to-[#FBF0D5]",
  },
];

const step = (r: number) => ({ "--r": r }) as CSSProperties;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(id);
  }, [paused, go, index]);

  return (
    <section
      className="relative overflow-hidden"
      aria-roledescription="carrusel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="grid">
        {SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={i}
              className={`col-start-1 row-start-1 bg-linear-to-br ${s.bg} transition-opacity duration-1000 ${active ? "z-10 opacity-100" : "pointer-events-none opacity-0"}`}
              aria-hidden={!active}
              inert={!active}
            >
              <div className="mx-auto grid min-h-[calc(100svh-6.5rem)] max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16">
                <div className={active ? "hero-in" : ""}>
                  <p
                    className="reveal mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-rose-deep"
                    style={step(1)}
                  >
                    <span className="h-px w-10 bg-gold" /> {s.eyebrow}
                  </p>
                  <h1
                    className="reveal font-display text-5xl font-medium leading-[0.95] text-ink sm:text-7xl lg:text-[5.5rem]"
                    style={step(2)}
                  >
                    {s.title}
                  </h1>
                  <p className="reveal mt-6 max-w-md text-lg leading-relaxed text-ink/70" style={step(3)}>
                    {s.text}
                  </p>
                  <div className="reveal mt-9 flex flex-wrap gap-3" style={step(4)}>
                    {s.cta.external ? (
                      <a
                        href={s.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-7 font-medium text-white shadow-lg shadow-[#25D366]/25 transition-transform hover:-translate-y-0.5"
                      >
                        <WhatsAppIcon /> {s.cta.label}
                      </a>
                    ) : (
                      <Link
                        href={s.cta.href}
                        className="group inline-flex h-12 items-center gap-2 rounded-full bg-rose-deep px-7 font-medium text-cream shadow-lg shadow-rose-deep/25 transition-colors hover:bg-ink"
                      >
                        {s.cta.label}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                    <Link
                      href="/colecciones/mas-vendidos"
                      className="inline-flex h-12 items-center rounded-full border border-ink/15 px-7 font-medium text-ink hover:border-ink/40"
                    >
                      Más vendidos
                    </Link>
                  </div>
                </div>

                <div
                  className={`reveal relative mx-auto aspect-square w-full max-w-[22rem] md:max-w-md ${active ? "hero-art-in" : ""}`}
                  style={step(2)}
                >
                  <div className="absolute inset-[8%] rounded-full bg-white/50 ring-1 ring-gold/30" />
                  <Flower
                    id={`hero-${i}`}
                    palette={s.palette}
                    className="flower-idle relative h-full w-full drop-shadow-[0_30px_40px_rgba(180,84,106,0.25)]"
                  />
                  <Flower
                    id={`hero-${i}-a`}
                    palette={s.accents[0]}
                    className="flower-idle absolute -left-2 bottom-2 h-1/3 w-1/3 drop-shadow-lg"
                  />
                  <Flower
                    id={`hero-${i}-b`}
                    palette={s.accents[1]}
                    className="flower-idle absolute -right-1 top-4 h-1/4 w-1/4 drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-6 z-20 mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ir a la diapositiva ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-500 ${i === index ? "w-10 bg-rose-deep" : "w-2 bg-ink/20 hover:bg-ink/40"}`}
            />
          ))}
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Anterior"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-cream/70 backdrop-blur hover:bg-cream"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Siguiente"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-cream/70 backdrop-blur hover:bg-cream"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
