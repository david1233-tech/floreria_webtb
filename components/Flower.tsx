import type { CSSProperties, SVGProps } from "react";
import { PALETTES, type PaletteKey } from "@/lib/palettes";

/** Pétalo apuntando hacia arriba, con la base en el centro (0,0). */
const PETAL = "M0 0C-15 -14 -21 -48 0 -72C21 -48 15 -14 0 0Z";

/** Geometría de las tres coronas (exterior, media, interior). */
const RINGS = [
  { count: 12, scale: 1, offset: 0, delay: 0.9 },
  { count: 10, scale: 0.78, offset: 18, delay: 1.2 },
  { count: 8, scale: 0.55, offset: 11, delay: 1.45 },
];

const STAMENS = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Math.PI * 2;
  return { cx: +(Math.cos(a) * 8).toFixed(2), cy: +(Math.sin(a) * 8).toFixed(2) };
});

type Props = Omit<SVGProps<SVGSVGElement>, "id"> & {
  /** Prefijo único para los gradientes SVG (una flor por id). */
  id: string;
  palette?: PaletteKey;
  /** Anima la apertura de los pétalos (intro). */
  bloom?: boolean;
};

export function Flower({ id, palette = "rosa", bloom = false, className = "", ...rest }: Props) {
  const colors = PALETTES[palette];

  return (
    <svg
      viewBox="-100 -100 200 200"
      className={`${bloom ? "flower-bloom" : ""} ${className}`}
      aria-hidden="true"
      {...rest}
    >
      <defs>
        {colors.rings.map((ring, ri) => (
          <linearGradient
            key={ri}
            id={`${id}-g${ri}`}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="-72"
          >
            <stop offset="0" stopColor={ring.base} />
            <stop offset="1" stopColor={ring.tip} />
          </linearGradient>
        ))}
        <radialGradient id={`${id}-core`}>
          <stop offset="0" stopColor={colors.core[0]} />
          <stop offset="1" stopColor={colors.core[1]} />
        </radialGradient>
      </defs>

      <g className="flower-spin">
        {RINGS.map((ring, ri) => (
          <g key={ri} transform={`scale(${ring.scale})`}>
            {Array.from({ length: ring.count }, (_, i) => (
              <g key={i} transform={`rotate(${ring.offset + (i * 360) / ring.count})`}>
                <g
                  className="petal"
                  style={{ "--d": `${(ring.delay + i * 0.035).toFixed(3)}s` } as CSSProperties}
                >
                  <path d={PETAL} fill={`url(#${id}-g${ri})`} />
                  <path d="M0 -6V-58" stroke="#fff" strokeOpacity="0.22" strokeWidth="1" />
                </g>
              </g>
            ))}
          </g>
        ))}
        <g className="flower-core">
          <circle r="13" fill={`url(#${id}-core)`} />
          {STAMENS.map((s, i) => (
            <circle key={i} cx={s.cx} cy={s.cy} r="1.6" fill={colors.stamen} />
          ))}
        </g>
      </g>
    </svg>
  );
}
