import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionView } from "@/components/product/CollectionView";
import { ALL_COLLECTIONS, getCollection, productsIn } from "@/lib/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/colecciones/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return { title: collection.name, description: collection.description };
}

export default async function CollectionPage({ params }: PageProps<"/colecciones/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  return (
    <CollectionView
      title={collection.name}
      description={collection.description}
      palette={collection.palette}
      products={productsIn(slug)}
      activeSlug={slug}
    />
  );
}
