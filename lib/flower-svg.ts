import { PALETTES, type PaletteKey } from "./palettes";

const PETAL = "M0 0C-15 -14 -21 -48 0 -72C21 -48 15 -14 0 0Z";
const RINGS = [
  { count: 12, scale: 1, offset: 0 },
  { count: 10, scale: 0.78, offset: 18 },
  { count: 8, scale: 0.55, offset: 11 },
];

/** Flor como SVG en texto (para imágenes generadas: Open Graph, íconos). */
export function flowerSvg(palette: PaletteKey = "rosa") {
  const p = PALETTES[palette];
  const defs = p.rings
    .map(
      (r, i) =>
        `<linearGradient id="g${i}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="-72"><stop offset="0" stop-color="${r.base}"/><stop offset="1" stop-color="${r.tip}"/></linearGradient>`,
    )
    .join("");
  const rings = RINGS.map(
    (ring, ri) =>
      `<g transform="scale(${ring.scale})">${Array.from(
        { length: ring.count },
        (_, i) =>
          `<path d="${PETAL}" fill="url(#g${ri})" transform="rotate(${ring.offset + (i * 360) / ring.count})"/>`,
      ).join("")}</g>`,
  ).join("");
  const stamens = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return `<circle cx="${(Math.cos(a) * 8).toFixed(2)}" cy="${(Math.sin(a) * 8).toFixed(2)}" r="1.6" fill="${p.stamen}"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 200 200"><defs>${defs}<radialGradient id="c"><stop offset="0" stop-color="${p.core[0]}"/><stop offset="1" stop-color="${p.core[1]}"/></radialGradient></defs>${rings}<circle r="13" fill="url(#c)"/>${stamens}</svg>`;
}

export const flowerDataUri = (palette: PaletteKey = "rosa") =>
  `data:image/svg+xml;base64,${Buffer.from(flowerSvg(palette)).toString("base64")}`;
