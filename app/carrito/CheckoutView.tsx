"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Store, Trash2, Truck } from "lucide-react";
import { cart, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/catalog";
import { orderWaLink, type OrderDetails } from "@/lib/whatsapp";
import { SITE } from "@/lib/site";
import { ProductMedia } from "@/components/product/ProductArt";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

const TIMES = ["Mañana", "Tarde", "Noche"];

const todayInLima = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Lima" }).format(new Date());

export function CheckoutView() {
  const { lines, subtotal } = useCart();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<OrderDetails>({
    from: "",
    to: "",
    delivery: "delivery",
    address: "",
    date: "",
    time: "",
    message: "",
    notes: "",
  });

  const set = <K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-28 text-center">
        <ShoppingBag className="h-14 w-14 text-rose" strokeWidth={1.2} />
        <h1 className="mt-6 font-display text-4xl">Tu carrito está vacío</h1>
        <p className="mt-3 text-ink/60">Explora el catálogo y elige el arreglo perfecto.</p>
        <Link
          href="/colecciones"
          className="mt-8 rounded-full bg-rose-deep px-8 py-3.5 font-medium text-cream hover:bg-ink"
        >
          Ver arreglos
        </Link>
      </div>
    );
  }

  const href = orderWaLink(lines, subtotal, form);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
      <h1 className="font-display text-5xl font-medium">Tu pedido</h1>
      <p className="mt-2 text-ink/60">Completa los datos y envíanos el pedido por WhatsApp.</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <form
          className="space-y-8 lg:col-span-3"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(href, "_blank", "noopener,noreferrer");
            setSent(true);
          }}
        >
          <Fieldset title="¿Cómo lo recibes?">
            <div className="grid grid-cols-2 gap-3">
              <Choice
                active={form.delivery === "delivery"}
                onClick={() => set("delivery", "delivery")}
                icon={<Truck className="h-5 w-5" />}
                title="Delivery"
                text={SITE.deliveryArea}
              />
              <Choice
                active={form.delivery === "recojo"}
                onClick={() => set("delivery", "recojo")}
                icon={<Store className="h-5 w-5" />}
                title="Recojo en tienda"
                text="Mercado San Martín de Porres"
              />
            </div>
            {form.delivery === "delivery" && (
              <Field label="Dirección de entrega" required>
                <input
                  required
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  placeholder="Calle, número, distrito y referencia"
                  className={inputClass}
                />
              </Field>
            )}
          </Fieldset>

          <Fieldset title="¿Cuándo?">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Fecha" required>
                <input
                  required
                  type="date"
                  min={todayInLima()}
                  suppressHydrationWarning
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Horario">
                <select
                  value={form.time}
                  onChange={(e) => set("time", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Indistinto</option>
                  {TIMES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
            </div>
          </Fieldset>

          <Fieldset title="Tarjeta y datos">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="¿Para quién es?">
                <input
                  value={form.to}
                  onChange={(e) => set("to", e.target.value)}
                  placeholder="Nombre de quien recibe"
                  className={inputClass}
                />
              </Field>
              <Field label="Tu nombre" required>
                <input
                  required
                  value={form.from}
                  onChange={(e) => set("from", e.target.value)}
                  placeholder="Quién envía"
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label="Dedicatoria para la tarjeta">
              <textarea
                rows={3}
                maxLength={300}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Escribe tu mensaje…"
                className={`${inputClass} resize-none`}
              />
            </Field>
            <Field label="Notas adicionales">
              <input
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Ej.: llamar antes de llegar, entregar en portería…"
                className={inputClass}
              />
            </Field>
          </Fieldset>

          <button
            type="submit"
            className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#25D366] text-lg font-medium text-white shadow-xl shadow-[#25D366]/25 transition-transform hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="h-6 w-6" /> Enviar pedido por WhatsApp
          </button>

          {sent && (
            <div className="rounded-3xl bg-white/70 p-6 text-center ring-1 ring-ink/5">
              <p className="font-display text-2xl">¡Gracias por tu pedido! 🌸</p>
              <p className="mt-2 text-sm text-ink/65">
                Si WhatsApp no se abrió,{" "}
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-rose-deep underline">
                  haz clic aquí
                </a>
                . Cuando lo hayas enviado puedes vaciar el carrito.
              </p>
              <button
                type="button"
                onClick={() => cart.clear()}
                className="mt-4 rounded-full border border-ink/15 px-5 py-2 text-sm hover:border-ink/40"
              >
                Ya lo envié, vaciar carrito
              </button>
            </div>
          )}
        </form>

        <aside className="lg:col-span-2">
          <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-ink/5 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl">Resumen</h2>
            <ul className="mt-4 divide-y divide-ink/10">
              {lines.map(({ product, qty }) => (
                <li key={product.slug} className="flex gap-4 py-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl">
                    <ProductMedia product={product} idSuffix="-sum" sizes="64px" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <span className="font-medium leading-tight">{product.name}</span>
                      <button
                        type="button"
                        onClick={() => cart.remove(product.slug)}
                        aria-label={`Quitar ${product.name}`}
                        className="text-ink/40 hover:text-rose-deep"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-ink/15">
                        <button
                          type="button"
                          aria-label="Quitar uno"
                          onClick={() => cart.setQty(product.slug, qty - 1)}
                          className="grid h-7 w-7 place-items-center"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{qty}</span>
                        <button
                          type="button"
                          aria-label="Agregar uno"
                          onClick={() => cart.setQty(product.slug, qty + 1)}
                          className="grid h-7 w-7 place-items-center"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm">{formatPrice(qty * product.price)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-2 space-y-2 border-t border-ink/10 pt-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-ink/55">
                {form.delivery === "delivery"
                  ? "El costo de delivery depende de la zona y te lo confirmamos por WhatsApp."
                  : `Recojo en ${SITE.address}.`}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-ink/15 bg-white/70 px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-rose-deep";

function Fieldset({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-4 font-display text-2xl">{title}</legend>
      {children}
    </fieldset>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-ink/70">
        {label} {required && <span className="text-rose-deep">*</span>}
      </span>
      {children}
    </label>
  );
}

function Choice({
  active,
  onClick,
  icon,
  title,
  text,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-2xl p-4 text-left transition-colors ${active ? "bg-rose-deep text-cream" : "bg-white/70 ring-1 ring-ink/10 hover:ring-rose-deep"}`}
    >
      {icon}
      <span className="mt-2 block font-medium">{title}</span>
      <span className={`block text-xs ${active ? "text-cream/75" : "text-ink/55"}`}>{text}</span>
    </button>
  );
}
