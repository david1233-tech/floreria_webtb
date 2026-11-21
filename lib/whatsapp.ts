import { formatPrice, type Product } from "./catalog";
import { SITE } from "./site";

export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const WA_GREETING = waLink(`¡Hola ${SITE.name}! Quisiera hacer una consulta.`);

export const productWaLink = (product: Product, qty = 1) =>
  waLink(
    `¡Hola ${SITE.name}! 🌸 Quisiera pedir:\n\n• ${qty} x ${product.name} (${formatPrice(product.price)})\n\n¿Está disponible?`,
  );

export type OrderDetails = {
  from: string;
  to: string;
  delivery: "delivery" | "recojo";
  address: string;
  date: string;
  time: string;
  message: string;
  notes: string;
};

export function orderWaLink(
  lines: { product: Product; qty: number }[],
  subtotal: number,
  d: OrderDetails,
) {
  const items = lines
    .map((l) => `• ${l.qty} x ${l.product.name}: ${formatPrice(l.qty * l.product.price)}`)
    .join("\n");

  const dateText = d.date
    ? new Date(`${d.date}T12:00:00`).toLocaleDateString("es-PE", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "Por coordinar";

  const parts = [
    `¡Hola ${SITE.name}! 🌸 Quiero hacer este pedido:`,
    "",
    items,
    "",
    `*Subtotal: ${formatPrice(subtotal)}*`,
    d.delivery === "delivery" ? "(El costo de delivery lo confirmamos por aquí)" : "",
    "",
    d.delivery === "delivery"
      ? `🚚 *Delivery* a: ${d.address || "por confirmar"}`
      : `🏪 *Recojo en tienda* (${SITE.address})`,
    `📅 Fecha: ${dateText}${d.time ? ` · ${d.time}` : ""}`,
    d.to ? `💐 Para: ${d.to}` : "",
    d.message ? `💌 Dedicatoria: "${d.message}"` : "",
    d.from ? `🙋 De: ${d.from}` : "",
    d.notes ? `📝 Notas: ${d.notes}` : "",
  ];

  return waLink(parts.filter((p, i, arr) => p !== "" || arr[i - 1] !== "").join("\n").trim());
}
