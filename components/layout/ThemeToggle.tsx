"use client";

import { useLayoutEffect, useSyncExternalStore, type MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_KEY as KEY } from "@/lib/head-scripts";

type Theme = "light" | "dark";

const preferred = (): Theme => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const current = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // Si el usuario no eligió un tema, sigue los cambios del sistema.
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = () => {
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {}
    document.documentElement.dataset.theme = media.matches ? "dark" : "light";
  };
  media.addEventListener("change", onSystem);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onSystem);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, current, () => "light" as Theme);

  // En desarrollo React reinicia los atributos de <html>; se vuelve a aplicar.
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = preferred();
  }, []);

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(KEY, next);
      } catch {}
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return apply();

    // Círculo que se expande desde el botón hasta cubrir la pantalla.
    const x = e.clientX;
    const y = e.clientY;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;
    root.classList.add("theme-vt");

    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
    transition.finished.finally(() => root.classList.remove("theme-vt"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={theme === "dark" ? "Tema claro" : "Tema oscuro"}
      className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full hover:bg-ink/5"
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-500 ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-500 ${theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
      />
    </button>
  );
}
