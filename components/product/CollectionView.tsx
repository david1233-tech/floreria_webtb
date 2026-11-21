import Link from "next/link";
import { Flower } from "@/components/Flower";
import { ProductGrid } from "./ProductCard";
import { OCASIONES, TIPOS, type Product } from "@/lib/catalog";
import type { PaletteKey } from "@/lib/palettes";

/** Plantilla compartida por /colecciones y /colecciones/[slug]. */
export function CollectionView({
  title,
  description,
  palette,
  products,
  activeSlug,
}: {
  title: string;
  description: string;
  palette: PaletteKey;
  products: Product[];
  activeSlug?: string;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-blush/50 via-cream to-cream">
        <Flower
          id={`col-${activeSlug ?? "all"}`}
          palette={palette}
          className="flower-idle pointer-events-none absolute -right-16 -top-10 h-72 w-72 opacity-60 sm:h-96 sm:w-96"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <nav className="mb-4 text-xs text-ink/50" aria-label="Ruta">
            <Link href="/" className="hover:text-ink">Inicio</Link> /{" "}
            <Link href="/colecciones" className="hover:text-ink">Catálogo</Link>
          </nav>
          <h1 className="font-display text-5xl font-medium sm:text-6xl">{title}</h1>
          <p className="mt-4 max-w-lg text-lg text-ink/65">{description}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <FilterRow label="Arreglos" items={TIPOS} activeSlug={activeSlug} />
        <FilterRow label="Ocasiones" items={OCASIONES} activeSlug={activeSlug} />

        <p className="mb-6 mt-8 text-sm text-ink/55">
          {products.length} {products.length === 1 ? "arreglo" : "arreglos"}
        </p>
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="rounded-3xl bg-white/60 p-10 text-center text-ink/60">
            Pronto tendremos arreglos en esta categoría.
          </p>
        )}
      </div>
    </>
  );
}

function FilterRow({
  label,
  items,
  activeSlug,
}: {
  label: string;
  items: { slug: string; name: string }[];
  activeSlug?: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="hidden w-24 shrink-0 text-xs font-medium uppercase tracking-widest text-ink/45 sm:block">
        {label}
      </span>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {items.map((c) => {
          const active = c.slug === activeSlug;
          return (
            <Link
              key={c.slug}
              href={active ? "/colecciones" : `/colecciones/${c.slug}`}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${active ? "bg-rose-deep text-cream" : "bg-white/70 text-ink/75 ring-1 ring-ink/10 hover:ring-rose-deep"}`}
            >
              {c.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
