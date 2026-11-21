import Link from "next/link";
import { formatPrice, type Product } from "@/lib/catalog";
import { ProductMedia } from "./ProductArt";
import { QuickAdd } from "./AddToCart";
import { ProductMorph } from "@/components/ui/PageTransition";

export function ProductCard({ product, idSuffix = "" }: { product: Product; idSuffix?: string }) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`/producto/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-3xl"
      >
        <ProductMorph slug={product.slug}>
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
            <ProductMedia product={product} idSuffix={idSuffix} />
          </div>
        </ProductMorph>
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-rose-deep backdrop-blur">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <Link href={`/producto/${product.slug}`} className="hover:text-rose-deep">
          <h3 className="font-display text-xl font-medium leading-snug sm:text-2xl">
            {product.name}
          </h3>
        </Link>
        <p className="mb-4 mt-1 flex items-baseline gap-2">
          <span className="font-medium text-ink">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-ink/45 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </p>
        <div className="mt-auto">
          <QuickAdd slug={product.slug} />
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products, idSuffix = "" }: { products: Product[]; idSuffix?: string }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} idSuffix={idSuffix} />
      ))}
    </div>
  );
}
