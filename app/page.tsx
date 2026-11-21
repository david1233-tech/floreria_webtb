import { PageTransition } from "@/components/ui/PageTransition";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { Benefits, HowItWorks, Marquee, Occasions, Types, VisitUs } from "@/components/home/Sections";
import { Faq } from "@/components/home/Faq";
import { ProductGrid } from "@/components/product/ProductCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { productsIn } from "@/lib/catalog";

export default function Home() {
  return (
    <PageTransition>
      <HeroCarousel />
      <Benefits />

      <section className="pt-20 sm:pt-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Favoritos"
            title="Los más vendidos"
            link={{ href: "/colecciones/mas-vendidos", label: "Ver todos" }}
          />
          <ProductGrid products={productsIn("mas-vendidos").slice(0, 4)} />
        </div>
      </section>

      <div className="mt-20 sm:mt-28">
        <Marquee />
      </div>
      <Occasions />
      <Types />
      <HowItWorks />

      <section className="bg-surface/60 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionTitle eyebrow="Ayuda" title="Preguntas frecuentes" center />
          <Faq limit={5} />
        </div>
      </section>

      <VisitUs />
    </PageTransition>
  );
}
