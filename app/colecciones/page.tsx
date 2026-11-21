import type { Metadata } from "next";
import { CollectionView } from "@/components/product/CollectionView";
import { PRODUCTS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catálogo de arreglos",
  description: "Ramos, cajas de flores, rosas, girasoles y tulipanes con delivery en Tiabaya y Arequipa.",
};

export default function CatalogPage() {
  return (
    <CollectionView
      title="Todos los arreglos"
      description="Ramos, cajas y arreglos hechos a mano para cada momento."
      palette="rosa"
      products={PRODUCTS}
    />
  );
}
