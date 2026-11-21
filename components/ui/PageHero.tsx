import { Flower } from "@/components/Flower";
import type { PaletteKey } from "@/lib/palettes";

export function PageHero({
  eyebrow,
  title,
  text,
  palette = "rosa",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  palette?: PaletteKey;
}) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blush/50 via-cream to-cream">
      <Flower
        id={`page-${eyebrow}`}
        palette={palette}
        className="flower-idle pointer-events-none absolute -right-16 -top-10 h-72 w-72 opacity-60 sm:h-96 sm:w-96"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="mb-4 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-rose-deep">
          <span className="h-px w-8 bg-gold" /> {eyebrow}
        </p>
        <h1 className="max-w-2xl font-display text-5xl font-medium leading-[1] sm:text-7xl">{title}</h1>
        {text && <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">{text}</p>}
      </div>
    </section>
  );
}
