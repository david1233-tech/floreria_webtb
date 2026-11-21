import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { VisitUs } from "@/components/home/Sections";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Escríbenos por WhatsApp al ${SITE.phoneDisplay} o visítanos en ${SITE.address}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de flores"
        text="¿Tienes una ocasión especial o quieres un arreglo personalizado? Escríbenos por WhatsApp y te ayudamos a elegir."
        palette="lila"
      />
      <VisitUs />
    </>
  );
}
