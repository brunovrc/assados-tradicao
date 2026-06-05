import type { Metadata } from "next"
import { Barlow_Condensed, Barlow } from "next/font/google"
import "./globals.css"

/* Display font — Barlow Condensed ExtraBold
   Cobertura completa do português (Ã, Ç, etc.)
   Estilo condensado e robusto, próximo ao logo */
const barlowCondensed = Barlow_Condensed({
  weight: ["700", "800"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
})

const barlow = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Assados Tradição | Sabor de Verdade — Maringá",
  description:
    "Casa de assados em Maringá. Costela, frango, picanha e muito mais. Delivery expresso pelo WhatsApp. Rua Tulipa, 493.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "1024x1024", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512",   type: "image/png" },
      { url: "/favicon.png", sizes: "192x192",   type: "image/png" },
      { url: "/favicon.png", sizes: "32x32",     type: "image/png" },
    ],
    apple: { url: "/favicon.png", sizes: "1024x1024", type: "image/png" },
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "Assados Tradição",
    description: "Sabor de verdade, direto da brasa. Delivery em Maringá.",
    locale: "pt_BR",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" style={{ backgroundColor: "#0D0500" }}>
      <body
        className={`${barlowCondensed.variable} ${barlow.variable} text-brand-cream font-body`}
        style={{ backgroundColor: "#0D0500", margin: 0 }}
      >
        {children}
      </body>
    </html>
  )
}
