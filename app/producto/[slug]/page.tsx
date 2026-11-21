import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, PenLine, Truck } from "lucide-react";
import { ProductMedia } from "@/components/product/ProductArt";
import { AddToCart } from "@/components/product/AddToCart";
import { ProductGrid } from "@/components/product/ProductCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PRODUCTS, formatPrice, getCollection, getProduct, relatedTo } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/producto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: PageProps<"/producto/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const tags = product.collections.map(getCollection).filter((c) => c !== undefined);
  const related = relatedTo(product);

  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 md:py-16 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:sticky md:top-28 md:self-start">
          <ProductMedia product={product} idSuffix="-main" sizes="(min-width: 768px) 50vw, 100vw" priority />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-deep">
              {product.badge}
            </span>
          )}
        </div>

        <div>
          <nav className="mb-5 text-xs text-ink/50" aria-label="Ruta">
            <Link href="/" className="hover:text-ink">Inicio</Link> /{" "}
            <Link href="/colecciones" className="hover:text-ink">Catálogo</Link> /{" "}
            <span className="text-ink/70">{product.name}</span>
          </nav>
          <h1 className="font-display text-4xl font-medium leading-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-ink/45 line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">{product.description}</p>

          <ul className="mt-6 space-y-2">
            {product.details.map((d) => (
              <li key={d} className="flex items-center gap-3 text-ink/80">
                <Check className="h-4 w-4 text-rose-deep" /> {d}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <AddToCart product={product} />
          </div>

          <ul className="mt-8 grid gap-3 rounded-3xl bg-white/60 p-5 text-sm text-ink/75 ring-1 ring-ink/5">
            <li className="flex gap-3">
              <Truck className="h-5 w-5 shrink-0 text-rose-deep" strokeWidth={1.6} />
              Delivery en {SITE.deliveryArea} (costo según zona) o recojo en tienda.
            </li>
            <li className="flex gap-3">
              <Clock className="h-5 w-5 shrink-0 text-rose-deep" strokeWidth={1.6} />
              Atendemos {SITE.hours.toLowerCase()}.
            </li>
            <li className="flex gap-3">
              <PenLine className="h-5 w-5 shrink-0 text-rose-deep" strokeWidth={1.6} />
              Escribe tu dedicatoria al completar el pedido.
            </li>
          </ul>

          {tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((c) => (
                <Link
                  key={c.slug}
                  href={`/colecciones/${c.slug}`}
                  className="rounded-full bg-blush/50 px-3 py-1 text-xs text-ink/70 hover:bg-blush"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}
          <p className="mt-6 text-xs text-ink/45">
            Imagen referencial. Según la temporada, alguna flor puede variar manteniendo el estilo del arreglo.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <SectionTitle title="También te puede gustar" />
          <ProductGrid products={related} idSuffix="-rel" />
        </section>
      )}
    </>
  );
}
