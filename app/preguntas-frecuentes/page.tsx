import { PageTransition } from "@/components/ui/PageTransition";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Faq } from "@/components/home/Faq";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { WA_GREETING } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Pedidos, delivery, recojo en tienda, dedicatorias y pagos.",
};

export default function FaqPage() {
  return (
    <PageTransition>
      <PageHero eyebrow="Ayuda" title="Preguntas frecuentes" palette="amarillo" />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <Faq />
        <div className="mt-14 rounded-3xl bg-surface/70 p-8 text-center ring-1 ring-ink/5">
          <p className="font-display text-3xl">¿Tienes otra duda?</p>
          <p className="mt-2 text-ink/60">Escríbenos y te respondemos lo antes posible.</p>
          <a
            href={WA_GREETING}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-7 font-medium text-white"
          >
            <WhatsAppIcon /> Escribir por WhatsApp
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
