import { PageTransition } from "@/components/ui/PageTransition";
import type { Metadata } from "next";
import { Flower2, HandHeart, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { VisitUs } from "@/components/home/Sections";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Conoce ${SITE.name}, florería artesanal en ${SITE.city}.`,
};

// Texto de ejemplo: reemplázalo por la historia real de la florería.
const VALUES = [
  { icon: Flower2, title: "Flores frescas", text: "Elegimos cada flor con cuidado para que tu arreglo luzca y dure." },
  { icon: HandHeart, title: "Hecho a mano", text: "Cada ramo se arma pensando en la persona que lo va a recibir." },
  { icon: Sparkles, title: "Atención cercana", text: "Te ayudamos a elegir y coordinamos cada detalle por WhatsApp." },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Nosotros"
        title={SITE.name}
        text={`Somos una florería artesanal en ${SITE.city}. Creemos que las flores tienen el poder de decir lo que a veces no encontramos en palabras.`}
        palette="durazno"
      />
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="scroll-reveal rounded-3xl bg-surface/70 p-8 ring-1 ring-ink/5">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-blush/60 text-rose-deep">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <h2 className="mt-5 font-display text-3xl">{title}</h2>
              <p className="mt-2 leading-relaxed text-ink/65">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <VisitUs />
    </PageTransition>
  );
}
