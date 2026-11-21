import type { PaletteKey } from "./palettes";

/**
 * CATÁLOGO
 * Productos de EJEMPLO: reemplaza nombres, precios y descripciones por los reales.
 * Para usar fotos reales, añade `images: ["/images/productos/archivo.jpg"]`.
 */

export type Collection = {
  slug: string;
  name: string;
  kind: "tipo" | "ocasion" | "especial";
  description: string;
  palette: PaletteKey;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  details: string[];
  /** Slugs de colecciones a las que pertenece (tipos y ocasiones). */
  collections: string[];
  palette: PaletteKey;
  /** Cómo se dibuja la ilustración cuando no hay foto. */
  art: "ramo" | "caja";
  bestSeller?: boolean;
  badge?: string;
  images?: string[];
};

export const TIPOS: Collection[] = [
  { slug: "ramos", name: "Ramos", kind: "tipo", palette: "rosa", description: "Ramos envueltos a mano, listos para entregar." },
  { slug: "cajas", name: "Cajas de flores", kind: "tipo", palette: "rojo", description: "Flores en cajas elegantes que sorprenden al abrirlas." },
  { slug: "rosas", name: "Rosas", kind: "tipo", palette: "rojo", description: "La flor clásica del cariño, en todos sus colores." },
  { slug: "girasoles", name: "Girasoles", kind: "tipo", palette: "amarillo", description: "Luz y alegría para cualquier día." },
  { slug: "tulipanes", name: "Tulipanes", kind: "tipo", palette: "lila", description: "Delicados, modernos y llenos de color." },
  { slug: "arreglos", name: "Arreglos florales", kind: "tipo", palette: "blanco", description: "Arreglos en base para mesas, eventos y homenajes." },
];

export const OCASIONES: Collection[] = [
  { slug: "amor", name: "Amor", kind: "ocasion", palette: "rojo", description: "Dilo con flores: para tu pareja o esa persona especial." },
  { slug: "cumpleanos", name: "Cumpleaños", kind: "ocasion", palette: "amarillo", description: "Flores que hacen el día de alguien todavía más feliz." },
  { slug: "aniversario", name: "Aniversario", kind: "ocasion", palette: "rosa", description: "Para celebrar cada año juntos." },
  { slug: "mama", name: "Para mamá", kind: "ocasion", palette: "durazno", description: "Para quien siempre cuida de todos." },
  { slug: "nacimiento", name: "Nacimiento", kind: "ocasion", palette: "lila", description: "Bienvenida para el nuevo integrante de la familia." },
  { slug: "mejorate-pronto", name: "Mejórate pronto", kind: "ocasion", palette: "amarillo", description: "Un detalle que acompaña y da ánimo." },
  { slug: "condolencias", name: "Condolencias", kind: "ocasion", palette: "blanco", description: "Arreglos sobrios para acompañar en momentos difíciles." },
];

export const ESPECIALES: Collection[] = [
  { slug: "mas-vendidos", name: "Más vendidos", kind: "especial", palette: "rosa", description: "Los arreglos favoritos de nuestros clientes." },
];

export const PRODUCTS: Product[] = [
  {
    slug: "caja-12-rosas-rojas",
    name: "Caja de 12 rosas rojas",
    price: 120,
    oldPrice: 140,
    description: "Doce rosas rojas seleccionadas en una caja elegante. Un clásico que nunca falla.",
    details: ["12 rosas rojas", "Caja decorativa", "Tarjeta con dedicatoria"],
    collections: ["cajas", "rosas", "amor", "aniversario"],
    palette: "rojo",
    art: "caja",
    bestSeller: true,
    badge: "Oferta",
  },
  {
    slug: "ramo-de-girasoles",
    name: "Ramo de girasoles",
    price: 85,
    description: "Girasoles radiantes envueltos en papel kraft. Alegría en estado puro.",
    details: ["Girasoles frescos", "Follaje de temporada", "Papel kraft y lazo"],
    collections: ["ramos", "girasoles", "cumpleanos", "mejorate-pronto"],
    palette: "amarillo",
    art: "ramo",
    bestSeller: true,
  },
  {
    slug: "ramo-dulce-rosa",
    name: "Ramo Dulce Rosa",
    price: 95,
    description: "Rosas rosadas con follaje fino, envueltas a mano. Tierno y elegante.",
    details: ["Rosas rosadas", "Follaje fino", "Papel coreano y lazo"],
    collections: ["ramos", "rosas", "amor", "cumpleanos", "mama"],
    palette: "rosa",
    art: "ramo",
    bestSeller: true,
  },
  {
    slug: "caja-de-tulipanes",
    name: "Caja de tulipanes lila",
    price: 150,
    description: "Tulipanes lila en caja redonda. Moderno, delicado y diferente.",
    details: ["Tulipanes lila", "Caja redonda", "Tarjeta con dedicatoria"],
    collections: ["cajas", "tulipanes", "aniversario", "mama"],
    palette: "lila",
    art: "caja",
    bestSeller: true,
  },
  {
    slug: "ramo-24-rosas-rojas",
    name: "Ramo de 24 rosas rojas",
    price: 180,
    description: "Dos docenas de rosas rojas para decirlo en grande.",
    details: ["24 rosas rojas", "Follaje de temporada", "Papel y lazo de regalo"],
    collections: ["ramos", "rosas", "amor", "aniversario"],
    palette: "rojo",
    art: "ramo",
  },
  {
    slug: "ramo-primavera",
    name: "Ramo Primavera",
    price: 75,
    description: "Flores en tonos durazno y crema. Fresco, alegre y perfecto para regalar.",
    details: ["Flores de temporada", "Tonos durazno", "Papel y lazo"],
    collections: ["ramos", "cumpleanos", "mejorate-pronto", "nacimiento", "mama"],
    palette: "durazno",
    art: "ramo",
    badge: "Nuevo",
  },
  {
    slug: "caja-rosa-pastel",
    name: "Caja Rosa Pastel",
    price: 110,
    description: "Rosas en tonos pastel dentro de una caja a juego.",
    details: ["Rosas rosadas", "Caja decorativa", "Tarjeta con dedicatoria"],
    collections: ["cajas", "rosas", "mama", "cumpleanos", "nacimiento"],
    palette: "rosa",
    art: "caja",
  },
  {
    slug: "ramo-de-tulipanes",
    name: "Ramo de tulipanes",
    price: 130,
    description: "Tulipanes lila envueltos a mano. Sencillo y sofisticado.",
    details: ["Tulipanes lila", "Papel coreano", "Lazo de regalo"],
    collections: ["ramos", "tulipanes", "amor", "mama"],
    palette: "lila",
    art: "ramo",
  },
  {
    slug: "caja-de-girasoles",
    name: "Caja de girasoles",
    price: 115,
    description: "Girasoles en caja para iluminar el día de alguien.",
    details: ["Girasoles frescos", "Caja decorativa", "Tarjeta con dedicatoria"],
    collections: ["cajas", "girasoles", "cumpleanos", "mejorate-pronto"],
    palette: "amarillo",
    art: "caja",
  },
  {
    slug: "arreglo-paz-blanca",
    name: "Arreglo Paz Blanca",
    price: 160,
    description: "Flores blancas en un arreglo sobrio para expresar respeto y cariño.",
    details: ["Flores blancas", "Base decorativa", "Tarjeta con mensaje"],
    collections: ["arreglos", "condolencias"],
    palette: "blanco",
    art: "caja",
  },
  {
    slug: "ramo-blanco-sereno",
    name: "Ramo Blanco Sereno",
    price: 90,
    description: "Flores blancas y follaje verde en un ramo de líneas limpias.",
    details: ["Flores blancas", "Follaje verde", "Papel y lazo"],
    collections: ["ramos", "arreglos", "condolencias", "nacimiento"],
    palette: "blanco",
    art: "ramo",
  },
  {
    slug: "mini-ramo-detalle",
    name: "Mini ramo detalle",
    price: 45,
    description: "Un pequeño ramo para un gran gesto. Ideal como detalle sorpresa.",
    details: ["Flores de temporada", "Tamaño mini", "Papel y lazo"],
    collections: ["ramos", "cumpleanos", "amor"],
    palette: "rosa",
    art: "ramo",
    badge: "Nuevo",
  },
];

export const ALL_COLLECTIONS = [...TIPOS, ...OCASIONES, ...ESPECIALES];

export const getCollection = (slug: string) => ALL_COLLECTIONS.find((c) => c.slug === slug);

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const productsIn = (slug: string) =>
  slug === "mas-vendidos"
    ? PRODUCTS.filter((p) => p.bestSeller)
    : PRODUCTS.filter((p) => p.collections.includes(slug));

export const relatedTo = (product: Product, limit = 4) =>
  PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.collections.some((c) => product.collections.includes(c)),
  ).slice(0, limit);

export const formatPrice = (value: number) => `S/ ${value.toFixed(2)}`;
