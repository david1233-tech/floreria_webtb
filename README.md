# Claudette Botánica

Sitio web de la florería **Claudette Botánica**, hecho con Next.js 16, React 19 y Tailwind CSS v4.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

- `app/page.tsx`: portada
- `app/layout.tsx`: fuentes, metadatos e intro animada
- `components/Intro.tsx`: animación de entrada (la flor florece, aparece el nombre y explota en pétalos)
- `components/Flower.tsx`: flor en SVG, se usa en la intro y en la portada
- `lib/site.ts`: nombre, eslogan y descripción de la marca
- `app/globals.css`: paleta de colores y animaciones
