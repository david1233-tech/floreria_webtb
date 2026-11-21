import type { Metadata } from "next";
import { CheckoutView } from "./CheckoutView";

export const metadata: Metadata = {
  title: "Tu carrito",
  description: "Completa tu pedido y envíalo por WhatsApp.",
};

export default function CartPage() {
  return <CheckoutView />;
}
