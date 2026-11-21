"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { OCASIONES, TIPOS, type Collection } from "@/lib/catalog";
import { cartDrawer, useCart } from "@/lib/cart";
import { WA_GREETING } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ThemeToggle } from "./ThemeToggle";

const MENUS: { label: string; items: Collection[] }[] = [
  { label: "Arreglos", items: TIPOS },
  { label: "Ocasiones", items: OCASIONES },
];

const LINKS = [
  { label: "Más vendidos", href: "/colecciones/mas-vendidos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // Cierra el menú móvil al navegar.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <div className="bg-wine px-4 py-2 text-center text-[11px] tracking-wide text-petal/85 sm:text-xs">
        Delivery en {SITE.deliveryArea} · Atendemos {SITE.hours.toLowerCase()} ·{" "}
        <a href={WA_GREETING} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
          Pedidos al {SITE.phoneDisplay}
        </a>
      </div>

      <header
        className="header-scroll sticky top-0 z-40 border-b border-ink/5 bg-cream/85 backdrop-blur-md"
        style={{ viewTransitionName: "site-header" }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
            className="-ml-2 grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="font-display text-2xl italic text-ink sm:text-[1.7rem]">
            {SITE.name}
          </Link>

          <nav className="hidden items-center gap-8 text-sm lg:flex" aria-label="Principal">
            <Link href="/" className={navClass(isActive("/"))}>
              Inicio
            </Link>
            {MENUS.map((menu) => (
              <div key={menu.label} className="group relative">
                <button type="button" className={`${navClass(false)} flex items-center gap-1`}>
                  {menu.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="rounded-2xl border border-ink/5 bg-cream p-3 shadow-xl shadow-ink/10">
                    {menu.items.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/colecciones/${c.slug}`}
                          className="block rounded-xl px-4 py-2.5 text-ink/80 hover:bg-blush/50 hover:text-ink"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                    <li className="mt-1 border-t border-ink/5 pt-1">
                      <Link
                        href="/colecciones"
                        className="block rounded-xl px-4 py-2.5 font-medium text-rose-deep hover:bg-blush/50"
                      >
                        Ver todo
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={navClass(isActive(l.href))}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <a
              href={WA_GREETING}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir por WhatsApp"
              className="hidden h-10 w-10 place-items-center rounded-full text-[#128C4B] dark:text-[#25D366] hover:bg-ink/5 sm:grid"
            >
              <WhatsAppIcon />
            </a>
            <button
              type="button"
              onClick={cartDrawer.open}
              aria-label={`Abrir carrito (${count} productos)`}
              className="relative -mr-2 grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span
                  key={count}
                  className="bump absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-rose-deep px-1 text-[10px] font-semibold text-petal">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <div
        className={`fixed inset-0 z-50 bg-cream transition-opacity duration-300 lg:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        inert={!mobileOpen}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <span className="font-display text-2xl italic">{SITE.name}</span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
            className="-mr-2 grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="h-[calc(100%-4rem)] overflow-y-auto px-4 pb-10" aria-label="Menú móvil">
          <Link href="/" className="block border-b border-ink/10 py-4 font-display text-3xl">
            Inicio
          </Link>
          {MENUS.map((menu) => (
            <details key={menu.label} className="group border-b border-ink/10">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-3xl">
                {menu.label}
                <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="grid grid-cols-2 gap-2 pb-5">
                {menu.items.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/colecciones/${c.slug}`}
                      className="block rounded-xl bg-blush/40 px-4 py-3 text-sm"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="block border-b border-ink/10 py-4 font-display text-3xl">
              {l.label}
            </Link>
          ))}
          <a
            href={WA_GREETING}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] font-medium text-white"
          >
            <WhatsAppIcon /> Escríbenos por WhatsApp
          </a>
        </nav>
      </div>
    </>
  );
}

const navClass = (active: boolean) =>
  `relative py-2 transition-colors hover:text-rose-deep ${active ? "text-rose-deep" : "text-ink/75"}`;
