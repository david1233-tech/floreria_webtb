import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Intro } from "@/components/Intro";
import { SITE } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SITE.name} | Florería`,
  description: SITE.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jost.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Intro />
        {children}
      </body>
    </html>
  );
}
