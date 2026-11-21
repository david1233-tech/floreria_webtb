"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { cart, cartDrawer, useCart, useCartDrawer } from "@/lib/cart";
import { formatPrice } from "@/lib/catalog";
import { ProductMedia } from "@/components/product/ProductArt";

export function CartDrawer() {
  const open = useCartDrawer();
  const { lines, count, subtotal } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cartDrawer.close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} inert={!open}>
      <div
        onClick={cartDrawer.close}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="Carrito"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-display text-2xl">
            Tu carrito <span className="text-ink/40">({count})</span>
          </h2>
          <button
            type="button"
            onClick={cartDrawer.close}
            aria-label="Cerrar carrito"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-rose" strokeWidth={1.2} />
            <p className="font-display text-2xl">Tu carrito está vacío</p>
            <p className="text-sm text-ink/60">Elige un arreglo y aparecerá aquí.</p>
            <Link
              href="/colecciones"
              onClick={cartDrawer.close}
              className="mt-2 rounded-full bg-rose-deep px-6 py-3 text-sm font-medium text-cream hover:bg-ink"
            >
              Ver arreglos
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
              {lines.map(({ product, qty }) => (
                <li key={product.slug} className="flex gap-4 py-5">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl">
                    <ProductMedia product={product} idSuffix="-cart" sizes="80px" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/producto/${product.slug}`}
                        onClick={cartDrawer.close}
                        className="font-display text-lg leading-tight hover:text-rose-deep"
                      >
                        {product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => cart.remove(product.slug)}
                        aria-label={`Quitar ${product.name}`}
                        className="text-ink/40 hover:text-rose-deep"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-ink/60">{formatPrice(product.price)}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-ink/15">
                        <button
                          type="button"
                          aria-label="Quitar uno"
                          onClick={() => cart.setQty(product.slug, qty - 1)}
                          className="grid h-8 w-8 place-items-center text-ink/70"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{qty}</span>
                        <button
                          type="button"
                          aria-label="Agregar uno"
                          onClick={() => cart.setQty(product.slug, qty + 1)}
                          className="grid h-8 w-8 place-items-center text-ink/70"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-medium">{formatPrice(qty * product.price)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="space-y-3 border-t border-ink/10 px-6 py-5">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-ink/55">El costo de delivery se confirma por WhatsApp.</p>
              <Link
                href="/carrito"
                onClick={cartDrawer.close}
                className="flex h-12 items-center justify-center rounded-full bg-rose-deep font-medium text-cream hover:bg-ink"
              >
                Completar pedido
              </Link>
              <button
                type="button"
                onClick={cartDrawer.close}
                className="w-full text-sm text-ink/60 hover:text-ink"
              >
                Seguir comprando
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
