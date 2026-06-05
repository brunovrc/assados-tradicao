"use client"
import { motion } from "framer-motion"
import { MapPin, Phone, Instagram, Clock } from "lucide-react"
import WhatsAppIcon from "@/components/WhatsAppIcon"

const WA      = "https://wa.me/5544991361672?text=Oi%2C%20quero%20fazer%20um%20pedido!"
const INSTA   = "https://instagram.com/assados.tradicao.maringa"
const MAP_SRC = "https://maps.google.com/maps?q=Rua+Tulipa+493+Maringá+Paraná+Brasil&output=embed&z=16"

const infos = [
  {
    icon: MapPin,
    label: "Endereço",
    value: "Rua Tulipa, 493\nMaringá – PR",
    color: "#E8650A",
    href:  null,
  },
  {
    icon: Phone,
    label: "Delivery",
    value: "(44) 99136-1672",
    color: "#22c55e",
    href:  WA,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@assados.tradicao.maringa",
    color: "#e879f9",
    href:  INSTA,
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Todos os dias\nConsulte disponibilidade",
    color: "#C8860A",
    href:  null,
  },
]

export default function Location() {
  return (
    <section id="localizacao" className="py-24 px-4 bg-brand-bg">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-brand-gold text-xs uppercase tracking-[0.6em] mb-4">Onde estamos</p>
          <h2 className="font-display text-7xl sm:text-8xl text-brand-cream">LOCALIZAÇÃO</h2>
          <div className="mt-4 divider-fire" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 rounded-3xl overflow-hidden border border-white/[0.07] h-80 lg:h-[420px]"
            style={{ boxShadow: "0 0 40px #00000060" }}
          >
            <iframe
              src={MAP_SRC}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) saturate(0.5) brightness(0.85)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Assados Tradição"
            />
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {infos.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl px-5 py-4 flex items-start gap-4 hover:border-white/[0.12] transition-colors duration-300"
              >
                <info.icon size={20} className="mt-0.5 shrink-0" style={{ color: info.color }} />
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.3em] text-brand-muted mb-1">{info.label}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body font-semibold text-sm whitespace-pre-line hover:opacity-80 transition-opacity"
                      style={{ color: info.color }}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="font-body font-semibold text-brand-cream text-sm whitespace-pre-line">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* WhatsApp big CTA */}
            <motion.a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white rounded-2xl py-4 font-body font-bold text-sm transition-all duration-200 mt-2 shadow-lg shadow-black/30"
            >
              <WhatsAppIcon size={18} />
              Falar pelo WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
