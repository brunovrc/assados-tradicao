"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Flame } from "lucide-react"
import { withBase } from "@/lib/basePath"

const foods = [
  {
    name:   "Costela Bovina",
    tag:    "12h na brasa",
    desc:   "Assada lentamente até a carne soltar do osso. Aquele sabor que só a tradição garante.",
    video:  withBase("/costela.mp4"),
    accent: "#E8650A",
  },
  {
    name:   "Frango Assado",
    tag:    "Dourado na brasa",
    desc:   "Temperado na véspera, suculento por dentro e crocante por fora.",
    video:  withBase("/frango.mp4"),
    accent: "#C8860A",
  },
  {
    name:   "Linguiça Artesanal",
    tag:    "Receita da casa",
    desc:   "Feita com tempero próprio, grelhada na brasa fresquinha a cada pedido.",
    video:  withBase("/linguica.mp4"),
    accent: "#FF7A1A",
  },
  {
    name:   "Maionese",
    tag:    "Receita da casa",
    desc:   "Cremosa e bem temperada. O acompanhamento que faz toda a diferença no pedido.",
    video:  withBase("/maionese.mp4"),
    accent: "#C8860A",
  },
]

function VideoCard({ food, i }: { food: (typeof foods)[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.1, duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="w-full transition-all duration-300 group cursor-default"
    >
      {/* Video — rounded top */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "brightness(0.95) saturate(1.1)" }}
        >
          <source src={food.video!} type="video/mp4" />
        </video>
        {/* Subtle bottom gradient so it feels grounded */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </div>

      {/* Text — below the video, never overlapping */}
      <div className="mt-4 px-1">
        <h3 className="font-body font-bold text-brand-cream text-lg leading-snug group-hover:text-brand-cream transition-colors">
          {food.name}
        </h3>
        <p className="text-xs font-body font-semibold mt-1" style={{ color: food.accent }}>
          {food.tag}
        </p>
        <p className="text-sm font-body text-brand-muted mt-2 leading-relaxed">
          {food.desc}
        </p>
      </div>
    </motion.div>
  )
}

function GradientCard({ food, i }: { food: (typeof foods)[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.1, duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="w-full transition-all duration-300 group cursor-default"
    >
      {/* Gradient "image" */}
      <div
        className="relative rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center"
        style={{ background: "linear-gradient(160deg, #4A0E00 0%, #1C0500 100%)" }}
      >
        {/* Animated embers */}
        {[0,1,2,3].map((j) => (
          <motion.span
            key={j}
            className="absolute rounded-full pointer-events-none"
            style={{
              left:      `${20 + j*20}%`,
              bottom:    "15%",
              width:     3 + j,
              height:    3 + j,
              background: food.accent,
              boxShadow: `0 0 6px ${food.accent}`,
            }}
            animate={{ y:[0,-70], opacity:[0.8,0], scale:[1,0] }}
            transition={{ duration:2+j*0.4, delay:j*0.5+i*0.2, repeat:Infinity, ease:"easeOut" }}
          />
        ))}
        <div className="flex flex-col items-center gap-3 relative z-10">
          <span className="text-6xl">🔥</span>
          <p
            className="font-display text-4xl tracking-wider"
            style={{ color: food.accent }}
          >
            Em Breve
          </p>
        </div>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at 50% 100%, ${food.accent}20, transparent 70%)` }}
        />
      </div>

      {/* Text below */}
      <div className="mt-4 px-1">
        <h3 className="font-body font-bold text-brand-cream text-lg leading-snug">
          {food.name}
        </h3>
        <p className="text-xs font-body font-semibold mt-1" style={{ color: food.accent }}>
          {food.tag}
        </p>
        <p className="text-sm font-body text-brand-muted mt-2 leading-relaxed">
          {food.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function FoodShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden bg-brand-bg">

      {/* Parallax glow */}
      <motion.div
        style={{ y, background: "radial-gradient(ellipse, #E8650A0D 0%, transparent 70%)" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-brand-orange font-body text-xs uppercase tracking-[0.5em] mb-4">
            <Flame size={12} />
            Nossos carros-chefes
            <Flame size={12} />
          </div>
          <h2 className="font-display text-6xl sm:text-7xl text-brand-cream">DA BRASA</h2>
          <div className="mt-4 divider-fire" />
          <p className="mt-5 font-body text-brand-muted text-sm max-w-md mx-auto">
            Feito fresquinho, entregue quente. Cada corte preparado com cuidado desde a marinada até a brasa.
          </p>
        </motion.div>

        {/* Cards grid — blog style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {foods.map((food, i) =>
            food.video
              ? <VideoCard    key={food.name} food={food} i={i} />
              : <GradientCard key={food.name} food={food} i={i} />
          )}
        </div>
      </div>
    </section>
  )
}
