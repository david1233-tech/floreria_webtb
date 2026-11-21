/** Datos de la marca. Cambia aquí y se actualiza en toda la web. */
export const SITE = {
  name: "Claudette Botánica",
  tagline: "Flores que cuentan historias",
  description:
    "Arreglos florales hechos a mano para cada momento especial: amor, celebración, gratitud y despedida.",

  /** Número de WhatsApp en formato internacional, solo dígitos. */
  whatsapp: "51987531832",
  phoneDisplay: "+51 987 531 832",

  city: "Tiabaya, Arequipa",
  address: "Mercado San Martín de Porres, Tiabaya, Arequipa",
  mapQuery: "Mercado San Martín de Porres, Tiabaya, Arequipa, Perú",
  hours: "Todos los días",
  deliveryArea: "Tiabaya y Arequipa",

  /** Pega aquí el enlace de la página de Facebook. Si está vacío, no se muestra. */
  facebook: "",
} as const;

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Más vendidos", href: "/colecciones/mas-vendidos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;
