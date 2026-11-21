import type { MetadataRoute } from "next";
import { ALL_COLLECTIONS, PRODUCTS } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/colecciones", "/nosotros", "/contacto", "/preguntas-frecuentes"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...ALL_COLLECTIONS.map((c) => ({ url: `${SITE_URL}/colecciones/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...PRODUCTS.map((p) => ({ url: `${SITE_URL}/producto/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
