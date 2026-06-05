"use client"
import { motion } from "framer-motion"
import { Zap, Clock, ShieldCheck, MessageSquare } from "lucide-react"
import WhatsAppIcon from "@/components/WhatsAppIcon"

const WA = "https://wa.me/5544991361672?text=Oi%2C%20quero%20fazer%20um%20pedido!"

const steps = [
  { icon: MessageSquare, label: "Manda mensagem",    sub: "Pelo WhatsApp, sem app nem cadastro" },
  { icon: Zap,            label: "A gente prepara",  sub: "Feito fresquinho na hora do pedido" },
  { icon: Clock,          label: "Entregamos rápido", sub: "Quente na sua porta em Maringá" },
  { icon: ShieldCheck,    label: "Qualidade garantida", sub: "Ou a gente resolve" },
]

export default function Delivery() {
  return (
    <section
      id="delivery"
      className="relative py-28 px-4 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1A0800 0%, #0D0500 50%, #1A0500 100%)" }}
    >
      {/* Center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, #E8650A14 0%, transparent 70%)",
        }}
      />

      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 divider-fire" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 rounded-full px-5 py-2 text-brand-orange font-body text-xs uppercase tracking-[0.4em] mb-10"
        >
          <Zap size={12} />
          Entrega Express
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-display text-7xl sm:text-9xl leading-none text-brand-cream">
            DIRETO
          </h2>
          <h2 className="font-display text-7xl sm:text-9xl leading-none text-fire">
            PRA VOCÊ
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-8 font-body text-brand-muted text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
        >
          Pediu pelo WhatsApp, a gente faz na hora e entrega quente na sua porta.
          Sem complicação, sem app, sem taxa escondida.
        </motion.p>

        {/* Steps */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.12 }}
              className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-brand-orange/30 transition-colors duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-orange/15 flex items-center justify-center group-hover:bg-brand-orange/25 transition-colors">
                <s.icon size={20} className="text-brand-orange" />
              </div>
              <p className="font-body font-semibold text-brand-cream text-sm text-center">{s.label}</p>
              <p className="font-body text-brand-muted text-xs text-center leading-relaxed">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <motion.a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-12 py-5 rounded-full font-body font-bold text-lg transition-colors duration-200 shadow-xl shadow-black/40"
          >
            <WhatsAppIcon size={22} />
            (44) 99136-1672
          </motion.a>
          <p className="mt-3 font-body text-brand-muted text-xs">Toque para abrir o WhatsApp</p>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 inset-x-0 divider-fire" />
    </section>
  )
}
