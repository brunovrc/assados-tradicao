"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import WhatsAppIcon from "@/components/WhatsAppIcon"
import { withBase } from "@/lib/basePath"

const WA = "https://wa.me/5544991361672?text=Oi%2C%20quero%20fazer%20um%20pedido!"

/* ── Background video cycle ────────────────────────────────────
   Técnica: o novo vídeo faz fade-in POR CIMA do atual.
   O atual fica em opacity 1 o tempo todo — sem buracos escuros.
──────────────────────────────────────────────────────────────── */
const BG_VIDEOS = [
  { src: withBase("/fogo.mp4"),    duration: 9000 },
  { src: withBase("/costela.mp4"), duration: 8000 },
  { src: withBase("/frango.mp4"),  duration: 8000 },
]

const LABELS: Record<number, string> = { 1: "Costela assada", 2: "Frango assado" }
const VIDEO_STYLE = {
  objectPosition: "center 60%",
  filter: "brightness(0.82) saturate(1.2)",
} as const

function VideoCycle() {
  const [base, setBase]   = useState(0)   // always visible underneath
  const [top,  setTop]    = useState<number | null>(null)   // fading in on top
  const timer             = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = () => {
    const next = (base + 1) % BG_VIDEOS.length
    setTop(next)
    // after fade-in finishes, promote top → base
    timer.current = setTimeout(() => {
      setBase(next)
      setTop(null)
    }, 1900)
  }

  useEffect(() => {
    const t = setTimeout(advance, BG_VIDEOS[base].duration)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base])

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base layer — always opacity 1, never fades */}
      <video
        key={`base-${base}`}
        src={BG_VIDEOS[base].src}
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={VIDEO_STYLE}
      />

      {/* Top layer — Ken Burns + fade-in suave */}
      {top !== null && (
        <motion.video
          key={`top-${top}`}
          src={BG_VIDEOS[top].src}
          autoPlay muted loop playsInline
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 w-full h-full object-cover"
          style={VIDEO_STYLE}
        />
      )}

      {/* Label */}
      <AnimatePresence>
        {base > 0 && top === null && (
          <motion.div
            key={`lbl-${base}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-8 left-8 z-10 pointer-events-none"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.4em] text-brand-gold/60">
              {LABELS[base]}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Embers ── */
const EMBERS = Array.from({ length: 14 }, (_, i) => ({
  id: i, left: `${4 + i * 6.8}%`,
  size: 2 + (i % 4),
  color: i % 3 === 0 ? "#E8650A" : i % 3 === 1 ? "#FF7A1A" : "#C8860A",
  dur: 1.8 + (i % 4) * 0.6, delay: i * 0.4,
}))

/* ── Shutter text ──
   - flex-nowrap: nunca quebra linha no meio de uma palavra
   - tamanho responsivo via clamp para caber sempre em 2 linhas
   - sem textShadow: o overlay já dá contraste suficiente
── */
const FONT_SIZE = "clamp(2.8rem, 11.5vw, 8.5rem)"

function ShutterLine({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  return (
    <div className="flex flex-nowrap justify-center lg:justify-start">
      {text.split("").map((ch, i) => (
        <div
          key={i}
          className="relative"
          style={{
            padding: "0 0.015em",
            /* clip horizontal para a animação não vazar,
               mas deixa o vertical livre para acentos (Ã, Ç) */
            overflowX: "clip",
            overflowY: "visible",
          }}
        >
          <motion.span
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: baseDelay + i * 0.05 + 0.2, duration: 0.9 }}
            className="block font-display tracking-tight text-brand-cream uppercase"
            style={{ fontSize: FONT_SIZE, fontWeight: 800, lineHeight: 1.05 }}
          >{ch}</motion.span>

          {[
            { clip:"polygon(0 0,100% 0,100% 33%,0 33%)",      color:"text-brand-orange",    dx:"-105%", tdx:"105%"  },
            { clip:"polygon(0 33%,100% 33%,100% 66%,0 66%)",  color:"text-brand-gold",      dx:"105%",  tdx:"-105%" },
            { clip:"polygon(0 66%,100% 66%,100% 100%,0 100%)",color:"text-brand-orange-lt", dx:"-105%", tdx:"105%"  },
          ].map(({ clip, color, dx, tdx }, si) => (
            <motion.span key={si}
              initial={{ x: dx, opacity: 0 }}
              animate={{ x: tdx, opacity: [0, 1, 0] }}
              transition={{ duration: 0.65, delay: baseDelay + i * 0.05 + si * 0.1, ease: "easeInOut" }}
              className={`absolute inset-0 font-display tracking-tight uppercase ${color} pointer-events-none z-10`}
              style={{ fontSize: FONT_SIZE, fontWeight: 800, lineHeight: 1.05, clipPath: clip }}
            >{ch}</motion.span>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ── Hero ── */
export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: "#0D0500" }}>

      {/* Cycling video background */}
      <VideoCycle />

      {/* Overlay uniforme e leve — sem bloco escuro na área do texto */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(8,2,0,0.60) 0%, rgba(8,2,0,0.45) 55%, rgba(8,2,0,0.18) 100%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(10,3,0,0.92) 0%, transparent 100%)" }}
      />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage:"linear-gradient(to right,#C8860A 1px,transparent 1px),linear-gradient(to bottom,#C8860A 1px,transparent 1px)", backgroundSize:"60px 60px" }}
      />

      {/* Embers */}
      {EMBERS.map((e) => (
        <motion.span key={e.id} className="absolute rounded-full pointer-events-none"
          style={{ left:e.left, bottom:"6%", width:e.size, height:e.size, background:e.color, boxShadow:`0 0 6px ${e.color}` }}
          animate={{ y:[0,-150], x:[0,e.id%2===0?16:-16], opacity:[0.9,0], scale:[1,0.2] }}
          transition={{ duration:e.dur, delay:e.delay, repeat:Infinity, ease:"easeOut" }}
        />
      ))}

      {/* Corner marks */}
      {(["top-28 left-8","top-28 right-8","bottom-20 left-8","bottom-20 right-8"] as const).map((pos,i) => (
        <div key={i} className={`absolute ${pos} w-10 h-10 pointer-events-none`} style={{
          borderTop:    i<2  ?"1px solid rgba(200,134,10,0.28)":undefined,
          borderBottom: i>=2 ?"1px solid rgba(200,134,10,0.28)":undefined,
          borderLeft:   i%2===0?"1px solid rgba(200,134,10,0.28)":undefined,
          borderRight:  i%2===1?"1px solid rgba(200,134,10,0.28)":undefined,
        }}/>
      ))}

      {/* ── Main layout ── */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 pt-24 pb-20">

          {/* LEFT: Text */}
          <div className="flex flex-col items-center lg:items-start lg:w-[55%]">
            <motion.div className="flex flex-col items-center lg:items-start">
              <ShutterLine text="ASSADOS"  baseDelay={0.3} />
              <ShutterLine text="TRADIÇÃO" baseDelay={0.65} />
            </motion.div>

            {/* Tagline — bigger */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.8 }}
              className="mt-5 font-display text-2xl sm:text-3xl lg:text-4xl tracking-[0.3em] text-brand-gold"
              style={{ fontWeight: 700 }}
            >
              — SABOR DE VERDADE —
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-body font-bold text-base transition-all duration-200 hover:scale-105 shadow-xl shadow-black/50"
              >
                <WhatsAppIcon size={18} />
                Pedir pelo WhatsApp
              </a>

              {/* Ver Cardápio — darker solid background */}
              <a
                href="#cardapio"
                className="flex items-center justify-center gap-2 text-brand-orange hover:text-brand-gold px-8 py-4 rounded-full font-body font-semibold text-base transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(10,3,0,0.75)",
                  border:     "1px solid rgba(232,101,10,0.45)",
                  backdropFilter: "blur(8px)",
                  boxShadow:  "0 4px 20px rgba(0,0,0,0.5)",
                }}
              >
                Ver Cardápio
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Logo — mix-blend-mode screen removes dark bg */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1.1, ease: "easeOut" }}
            className="lg:w-[45%] flex justify-center lg:justify-end items-center"
            style={{ mixBlendMode: "screen" }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={withBase("/logo-sem-fundo.png")}
                alt="Assados Tradição"
                width={520}
                height={520}
                priority
                quality={100}
                className="w-[260px] sm:w-[340px] lg:w-[480px] h-auto"
                style={{ filter: "brightness(1.2) contrast(1.05) saturate(1.15) drop-shadow(0 0 40px rgba(232,101,10,0.5))" }}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.6, repeat:Infinity }}>
          <ChevronDown size={22} className="text-brand-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
