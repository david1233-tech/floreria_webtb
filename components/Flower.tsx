import type { CSSProperties } from "react";

/** Pétalo apuntando hacia arriba, con la base en el centro (0,0). */
const PETAL = "M0 0C-15 -14 -21 -48 0 -72C21 -48 15 -14 0 0Z";

/** Tres coronas de pétalos: exterior claro, interior más intenso. */
const RINGS = [
  { count: 12, scale: 1, offset: 0, tip: "#F8E4E1", base: "#D98C93", delay: 0.9 },
  { count: 10, scale: 0.78, offset: 18, tip: "#EFB8BC", base: "#B4546A", delay: 1.2 },
  { count: 8, scale: 0.55, offset: 11, tip: "#D98C93", base: "#8E3550", delay: 1.45 },
];

const STAMENS = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Math.PI * 2;
  return { cx: +(Math.cos(a) * 8).toFixed(2), cy: +(Math.sin(a) * 8).toFixed(2) };
});

type Props = {
  /** Prefijo único para los gradientes SVG (una flor por id). */
  id: string;
  /** Anima la apertura de los pétalos (intro). */
  bloom?: boolean;
  className?: string;
};

export function Flower({ id, bloom = false, className = "" }: Props) {
  return (
    <svg
      viewBox="-100 -100 200 200"
      className={`${bloom ? "flower-bloom" : ""} ${className}`}
      aria-hidden="true"
    >
      <defs>
        {RINGS.map((ring, ri) => (
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
          <stop offset="0" stopColor="#F7E3B0" />
          <stop offset="1" stopColor="#B8873F" />
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
            <circle key={i} cx={s.cx} cy={s.cy} r="1.6" fill="#FFF3D6" />
          ))}
        </g>
      </g>
    </svg>
  );
}
