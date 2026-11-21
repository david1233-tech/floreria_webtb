import Image from "next/image";
import { Flower } from "@/components/Flower";
import { PALETTES, type PaletteKey } from "@/lib/palettes";
import type { Product } from "@/lib/catalog";

type Layout = "ramo" | "caja";

/** Flores del ramo: [cx, cy, tamaño]. Primero las de atrás. */
const RAMO_FLOWERS = [
  [138, 140, 130],
  [262, 140, 130],
  [100, 220, 125],
  [300, 220, 125],
  [200, 108, 135],
  [200, 205, 160],
] as const;

const CAJA_FLOWERS = [
  [125, 240, 120],
  [275, 240, 120],
  [155, 175, 125],
  [245, 175, 125],
  [200, 130, 120],
  [200, 235, 140],
] as const;

const LEAVES = [
  [110, 270, -55],
  [290, 270, 55],
  [80, 185, -75],
  [320, 185, 75],
  [140, 85, -30],
  [260, 85, 30],
] as const;

/** Ilustración vectorial de un arreglo, usada mientras no haya foto real. */
export function ArrangementArt({
  id,
  palette,
  layout,
  className = "",
}: {
  id: string;
  palette: PaletteKey;
  layout: Layout;
  className?: string;
}) {
  const p = PALETTES[palette];
  const flowers = layout === "ramo" ? RAMO_FLOWERS : CAJA_FLOWERS;

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <rect width="400" height="500" fill={p.bg} />
      <circle cx="200" cy="200" r="175" fill="#fff" opacity="0.35" />

      <g fill="#7D9B6A">
        {LEAVES.map(([x, y, r], i) => (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="22"
            ry="58"
            transform={`rotate(${r} ${x} ${y})`}
            fill={i % 2 ? "#5E7D4E" : "#7D9B6A"}
          />
        ))}
      </g>

      {layout === "caja" && (
        <g>
          <ellipse cx="200" cy="440" rx="105" ry="22" fill="#000" opacity="0.08" />
          <path d="M95 300 V420 A105 22 0 0 0 305 420 V300 Z" fill={p.box} />
          <path d="M95 300 V420 A105 22 0 0 0 305 420 V300 Z" fill="#000" opacity="0.06" />
          <rect x="95" y="360" width="210" height="10" fill="#C9A15B" opacity="0.85" />
          <ellipse cx="200" cy="300" rx="105" ry="22" fill={p.box} />
        </g>
      )}

      {flowers.map(([cx, cy, size], i) => (
        <Flower
          key={i}
          id={`${id}-f${i}`}
          palette={palette}
          x={cx - size / 2}
          y={cy - size / 2}
          width={size}
          height={size}
        />
      ))}

      {layout === "ramo" && (
        <g>
          <path d="M112 275 L288 275 L232 470 L168 470 Z" fill={p.paper} />
          <path d="M112 275 L200 292 L168 470 Z" fill="#000" opacity="0.07" />
          <path d="M288 275 L200 292 L232 470 Z" fill="#fff" opacity="0.18" />
          <g fill={p.rings[1].base}>
            <ellipse cx="180" cy="395" rx="22" ry="11" transform="rotate(-20 180 395)" />
            <ellipse cx="220" cy="395" rx="22" ry="11" transform="rotate(20 220 395)" />
            <circle cx="200" cy="397" r="8" />
          </g>
        </g>
      )}
    </svg>
  );
}

/** Imagen de producto: foto real si existe, si no, la ilustración. */
export function ProductMedia({
  product,
  idSuffix = "",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority = false,
  className = "",
}: {
  product: Product;
  idSuffix?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const photo = product.images?.[0];
  if (photo) {
    return (
      <Image
        src={photo}
        alt={product.name}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <ArrangementArt
      id={`${product.slug}${idSuffix}`}
      palette={product.palette}
      layout={product.art}
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
