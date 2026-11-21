import { Plus } from "lucide-react";
import { SITE } from "@/lib/site";

export const FAQS = [
  {
    q: "¿Cómo hago un pedido?",
    a: "Agrega los arreglos al carrito, completa los datos de entrega y presiona «Enviar pedido por WhatsApp». Se abrirá un mensaje con todo tu pedido listo para enviar. También puedes escribirnos directamente.",
  },
  {
    q: "¿Hacen delivery?",
    a: `Sí, hacemos delivery en ${SITE.deliveryArea}. El costo depende de la zona y te lo confirmamos por WhatsApp antes de cerrar el pedido.`,
  },
  {
    q: "¿Puedo recoger mi pedido en tienda?",
    a: `Claro. Puedes recogerlo en ${SITE.address}. Elige «Recojo en tienda» al completar tu pedido.`,
  },
  {
    q: "¿Qué días atienden?",
    a: `Atendemos ${SITE.hours.toLowerCase()}. Te recomendamos pedir con anticipación en fechas especiales como San Valentín o el Día de la Madre.`,
  },
  {
    q: "¿Puedo agregar una dedicatoria?",
    a: "Sí. Al completar tu pedido escribe el mensaje y lo incluimos en una tarjeta junto a las flores.",
  },
  {
    q: "¿Cómo se paga?",
    a: "Coordinamos el pago por WhatsApp al confirmar tu pedido.",
  },
  {
    q: "¿El arreglo será igual al de la foto?",
    a: "Las imágenes son referenciales. Según la temporada, alguna flor puede variar, siempre manteniendo el estilo, los colores y el tamaño del arreglo.",
  },
];

export function Faq({ limit }: { limit?: number }) {
  const items = limit ? FAQS.slice(0, limit) : FAQS;
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl sm:text-2xl">
            {f.q}
            <Plus className="h-5 w-5 shrink-0 text-rose-deep transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed text-ink/70">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
