"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { cart, cartDrawer } from "@/lib/cart";
import { productWaLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/catalog";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Botón compacto para las tarjetas del catálogo. */
export function QuickAdd({ slug }: { slug: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        cart.add(slug);
        cartDrawer.open();
      }}
      className="flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-rose-deep hover:bg-rose-deep hover:text-cream"
    >
      <ShoppingBag className="h-4 w-4" /> Agregar
    </button>
  );
}

/** Selector de cantidad y botones de compra de la ficha de producto. */
export function AddToCart({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full border border-ink/15">
          <button
            type="button"
            aria-label="Quitar uno"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-12 w-12 place-items-center text-ink/70 hover:text-ink"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium tabular-nums" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            aria-label="Agregar uno"
            onClick={() => setQty((q) => q + 1)}
            className="grid h-12 w-12 place-items-center text-ink/70 hover:text-ink"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            cart.add(product.slug, qty);
            cartDrawer.open();
          }}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-rose-deep px-6 font-medium text-cream shadow-lg shadow-rose-deep/20 transition-colors hover:bg-ink"
        >
          <ShoppingBag className="h-5 w-5" /> Agregar al carrito
        </button>
      </div>
      <a
        href={productWaLink(product, qty)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 items-center justify-center gap-2 rounded-full border border-[#25D366] font-medium text-[#128C4B] transition-colors hover:bg-[#25D366] hover:text-white"
      >
        <WhatsAppIcon /> Pedir ahora por WhatsApp
      </a>
    </div>
  );
}
