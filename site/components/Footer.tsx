import Image from "next/image"
import { Instagram, MapPin } from "lucide-react"
import WhatsAppIcon from "@/components/WhatsAppIcon"

const WA    = "https://wa.me/5544991361672?text=Oi%2C%20quero%20fazer%20um%20pedido!"
const INSTA = "https://instagram.com/assados.tradicao.maringa"

export default function Footer() {
  return (
    <footer className="bg-[#060200] border-t border-white/[0.04] pt-14 pb-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 pb-10 border-b border-white/[0.05]">

          {/* Brand */}
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Assados Tradição"
              width={56}
              height={56}
              className="rounded-full ring-1 ring-brand-orange/30"
            />
            <div>
              <p className="font-display text-2xl tracking-widest text-brand-cream leading-none">ASSADOS TRADIÇÃO</p>
              <p className="font-body text-xs text-brand-gold mt-0.5 tracking-[0.3em] uppercase">Sabor de Verdade</p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            {[
              { href: "#cardapio",    label: "Cardápio" },
              { href: "#delivery",   label: "Delivery" },
              { href: "#localizacao",label: "Localização" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-body text-xs uppercase tracking-[0.2em] text-brand-muted hover:text-brand-gold transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Contacts */}
          <div className="flex flex-col gap-3">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              <WhatsAppIcon size={15} />
              (44) 99136-1672
            </a>
            <a
              href={INSTA}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-sm text-pink-400 hover:text-pink-300 transition-colors"
            >
              <Instagram size={15} />
              @assados.tradicao.maringa
            </a>
            <span className="flex items-center gap-2 font-body text-sm text-brand-muted">
              <MapPin size={15} className="text-brand-orange" />
              Rua Tulipa, 493 — Maringá, PR
            </span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-brand-muted/40 text-xs">
            © {new Date().getFullYear()} Assados Tradição — Todos os direitos reservados
          </p>
          <p className="font-body text-brand-muted/30 text-xs">
            Maringá, Paraná, Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
