import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionTitle({
  eyebrow,
  title,
  link,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  link?: { href: string; label: string };
  center?: boolean;
}) {
  return (
    <div
      className={`mb-10 flex flex-col gap-4 ${center ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"}`}
    >
      <div>
        {eyebrow && (
          <p
            className={`mb-3 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-rose-deep ${center ? "justify-center" : ""}`}
          >
            <span className="h-px w-8 bg-gold" /> {eyebrow}
          </p>
        )}
        <h2 className="font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
          {title}
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-rose-deep hover:text-ink"
        >
          {link.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
