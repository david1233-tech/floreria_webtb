import { WA_GREETING } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export function WhatsAppFloat() {
  return (
    <a
      href={WA_GREETING}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="wa-float fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
