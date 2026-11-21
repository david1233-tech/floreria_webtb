import { ViewTransition, type ReactNode } from "react";

/** Animación de entrada/salida al navegar entre páginas (ver globals.css). */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

/** Imagen de producto que "viaja" de la tarjeta a la ficha. */
export function ProductMorph({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <ViewTransition name={`product-${slug}`} share="morph" default="none">
      <div className="absolute inset-0">{children}</div>
    </ViewTransition>
  );
}
