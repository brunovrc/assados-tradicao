"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Flame, Zap, MapPin, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import WhatsAppIcon from "@/components/WhatsAppIcon"

const WA = "https://wa.me/5544991361672?text=Oi%2C%20quero%20fazer%20um%20pedido!"

interface NavItem { name: string; url: string; icon: LucideIcon }

const items: NavItem[] = [
  { name: "Cardápio",    url: "#cardapio",    icon: Flame  },
  { name: "Delivery",   url: "#delivery",    icon: Zap    },
  { name: "Localização",url: "#localizacao", icon: MapPin },
]

export default function Navbar() {
  const [active,   setActive]   = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [visible,  setVisible]  = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 60) {
        setVisible(true)             // sempre visível no topo
      } else {
        setVisible(y < lastY.current) // visível só ao subir
      }
      lastY.current = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Framer Motion controla todo o transform — não usar -translate-x-1/2 do Tailwind */
  const yVal = visible ? 0 : (isMobile ? 120 : -120)

  return (
    <motion.div
      className="fixed left-1/2 z-50"
      style={{ bottom: isMobile ? 24 : "auto", top: isMobile ? "auto" : 24 }}
      initial={{ x: "-50%", y: 0, opacity: 1 }}
      animate={{ x: "-50%", y: yVal, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className="flex items-center gap-2 backdrop-blur-lg py-2 px-2 rounded-full"
        style={{
          background: "rgba(13,5,0,0.70)",
          border:     "1px solid rgba(232,101,10,0.22)",
          boxShadow:  "0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(232,101,10,0.07)",
        }}
      >
        {/* Nav links */}
        {items.map((item) => {
          const Icon     = item.icon
          const isActive = active === item.name
          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActive(item.name)}
              className={cn(
                "relative cursor-pointer font-semibold px-7 py-3 rounded-full transition-colors duration-200 text-base",
                isActive ? "text-brand-orange" : "text-brand-muted hover:text-brand-gold",
              )}
            >
              <span className="hidden md:inline font-body text-base tracking-wide">{item.name}</span>
              <span className="md:hidden"><Icon size={22} strokeWidth={2.5} /></span>

              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full rounded-full -z-10"
                  style={{ background: "rgba(232,101,10,0.10)" }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full"
                    style={{
                      background: "#E8650A",
                      ...(isMobile
                        ? { bottom: "-8px", top: "auto",   borderRadius: "0 0 9999px 9999px" }
                        : { top:    "-8px", bottom: "auto", borderRadius: "9999px 9999px 0 0" }),
                    }}
                  >
                    <div className="absolute w-12 h-6 rounded-full blur-md -left-2"
                      style={{ background:"rgba(232,101,10,0.30)", ...(isMobile?{bottom:"-8px",top:"auto"}:{top:"-8px",bottom:"auto"}) }}
                    />
                    <div className="absolute w-8 h-6 rounded-full blur-md"
                      style={{ background:"rgba(232,101,10,0.25)", ...(isMobile?{bottom:"-4px",top:"auto"}:{top:"-4px",bottom:"auto"}) }}
                    />
                    <div className="absolute w-4 h-4 rounded-full blur-sm left-2"
                      style={{ background:"rgba(232,101,10,0.20)", ...(isMobile?{bottom:"0",top:"auto"}:{top:"0",bottom:"auto"}) }}
                    />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}

        {/* Divider */}
        <div className="w-px h-6 mx-2 hidden md:block" style={{ background: "rgba(232,101,10,0.20)" }} />

        {/* CTA — right side */}
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-white px-6 py-3 rounded-full font-body text-base font-semibold transition-all duration-200 hover:scale-105 hover:brightness-110"
          style={{
            background:  "linear-gradient(135deg, #16a34a, #15803d)",
            boxShadow:   "0 2px 12px rgba(22,163,74,0.35)",
          }}
        >
          <WhatsAppIcon size={17} />
          Pedir Agora
        </a>
      </div>
    </motion.div>
  )
}
