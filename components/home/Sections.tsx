import Link from "next/link";
import { ArrowRight, Clock, Flower2, MapPin, MessageCircle, PenLine, ShoppingBag, Truck } from "lucide-react";
import { Flower } from "@/components/Flower";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WhatsAppIcon, FacebookIcon } from "@/components/ui/BrandIcons";
import { OCASIONES, TIPOS } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { WA_GREETING } from "@/lib/whatsapp";

/* ---------- Franja de beneficios ---------- */

const BENEFITS = [
  { icon: Truck, title: "Delivery", text: `En ${SITE.deliveryArea}` },
  { icon: Clock, title: "Abierto", text: SITE.hours },
  { icon: Flower2, title: "Flores frescas", text: "Seleccionadas cada día" },
  { icon: PenLine, title: "Dedicatoria", text: "Tarjeta personalizada" },
];

export function Benefits() {
  return (
    <section className="border-y border-ink/5 bg-white/60">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blush/60 text-rose-deep">
              <Icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <span>
              <span className="block text-sm font-medium">{title}</span>
              <span className="block text-xs text-ink/60">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- ¿Qué quieres celebrar? ---------- */

export function Occasions() {
  return (
    <section id="ocasiones" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle eyebrow="Ocasiones" title="¿Qué quieres celebrar?" />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {OCASIONES.map((o) => (
            <Link
              key={o.slug}
              href={`/colecciones/${o.slug}`}
              className="scroll-reveal group relative aspect-square overflow-hidden rounded-3xl bg-white/70 p-5 ring-1 ring-ink/5 transition-shadow hover:shadow-xl hover:shadow-rose-deep/10"
            >
              <Flower
                id={`occ-${o.slug}`}
                palette={o.palette}
                className="absolute -bottom-10 -right-10 h-[78%] w-[78%] transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110"
              />
              <span className="relative font-display text-2xl leading-tight sm:text-3xl">{o.name}</span>
            </Link>
          ))}
          <Link
            href="/colecciones"
            className="scroll-reveal group flex aspect-square flex-col justify-between rounded-3xl bg-rose-deep p-5 text-cream"
          >
            <span className="font-display text-2xl leading-tight sm:text-3xl">Ver todos los arreglos</span>
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Tipos de arreglo ---------- */

export function Types() {
  return (
    <section className="bg-white/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle eyebrow="Explora" title="Nuestros arreglos" link={{ href: "/colecciones", label: "Ver catálogo" }} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TIPOS.map((t) => (
            <Link
              key={t.slug}
              href={`/colecciones/${t.slug}`}
              className="scroll-reveal group flex items-center gap-5 rounded-3xl bg-cream p-4 ring-1 ring-ink/5 transition-colors hover:bg-blush/40"
            >
              <Flower
                id={`type-${t.slug}`}
                palette={t.palette}
                className="h-20 w-20 shrink-0 transition-transform duration-700 group-hover:rotate-90"
              />
              <span>
                <span className="block font-display text-2xl">{t.name}</span>
                <span className="block text-sm text-ink/60">{t.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Así de fácil ---------- */

const STEPS = [
  { icon: ShoppingBag, title: "Elige tu arreglo", text: "Explora el catálogo y agrégalo al carrito." },
  { icon: PenLine, title: "Escribe tu dedicatoria", text: "La ponemos en una tarjeta junto a las flores." },
  { icon: MessageCircle, title: "Envía tu pedido", text: "Se arma un mensaje de WhatsApp listo para enviar." },
  { icon: Truck, title: "Lo entregamos", text: `Delivery en ${SITE.deliveryArea} o recojo en tienda.` },
];

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle eyebrow="Pedir es fácil" title="Así de simple" center />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="scroll-reveal relative text-center">
              <span className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-blush/60 text-rose-deep">
                <Icon className="h-7 w-7" strokeWidth={1.5} />
                <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-gold font-display text-sm text-cream">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 font-display text-2xl">{title}</h3>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm text-ink/60">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Visítanos ---------- */

export function VisitUs() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-5">
        <div className="scroll-reveal rounded-3xl bg-wine p-8 text-cream sm:p-10 lg:col-span-2">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">Visítanos</p>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">Te esperamos en Tiabaya</h2>
          <ul className="mt-8 space-y-5 text-cream/80">
            <li className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <span>Atendemos {SITE.hours.toLowerCase()}</span>
            </li>
            <li className="flex gap-4">
              <Truck className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <span>Delivery en {SITE.deliveryArea}</span>
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={WA_GREETING}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 font-medium text-white"
            >
              <WhatsAppIcon /> {SITE.phoneDisplay}
            </a>
            {SITE.facebook && (
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-cream/10 px-6 font-medium hover:bg-cream/20"
              >
                <FacebookIcon /> Facebook
              </a>
            )}
          </div>
        </div>
        <div className="scroll-reveal min-h-80 overflow-hidden rounded-3xl ring-1 ring-ink/5 lg:col-span-3">
          <iframe
            title={`Mapa: ${SITE.address}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`}
            className="h-full min-h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
