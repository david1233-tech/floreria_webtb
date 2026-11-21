import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { WA_GREETING } from "@/lib/whatsapp";
import { FacebookIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Flower } from "@/components/Flower";

const SHOP = [
  { label: "Todos los arreglos", href: "/colecciones" },
  { label: "Más vendidos", href: "/colecciones/mas-vendidos" },
  { label: "Ramos", href: "/colecciones/ramos" },
  { label: "Cajas de flores", href: "/colecciones/cajas" },
];

const HELP = [
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
  { label: "Tu carrito", href: "/carrito" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-wine text-petal">
      <Flower
        id="footer"
        className="flower-idle pointer-events-none absolute -right-24 -top-24 h-80 w-80 opacity-15"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl italic">{SITE.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-petal/65">{SITE.tagline}. Florería artesanal en {SITE.city}.</p>
          <div className="mt-6 flex gap-3">
            <a
              href={WA_GREETING}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full bg-petal/10 hover:bg-[#25D366]"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            {SITE.facebook && (
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full bg-petal/10 hover:bg-[#1877F2]"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <FooterList title="Tienda" links={SHOP} />
        <FooterList title="Ayuda" links={HELP} />

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Visítanos</h3>
          <ul className="space-y-3 text-sm text-petal/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {SITE.address}
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {SITE.hours}
            </li>
            <li className="flex gap-3">
              <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={WA_GREETING} target="_blank" rel="noopener noreferrer" className="hover:text-petal">
                {SITE.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-petal/10 px-4 py-6 text-center text-xs text-petal/50">
        © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{title}</h3>
      <ul className="space-y-2.5 text-sm text-petal/75">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-petal">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
