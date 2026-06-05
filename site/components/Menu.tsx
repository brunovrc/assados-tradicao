"use client"
import { motion } from "framer-motion"
import {
  /* Item icons */
  IconBone, IconFlameFilled, IconSausage, IconCrown, IconMeat, IconGrill,
  IconBowlChopsticks, IconBowlSpoon, IconCup, IconSoup, IconSalad, IconBread,
  IconGlassFull, IconBeerFilled, IconDropletFilled, IconLemon, IconLeafFilled, IconBolt,
  /* Header decorative */
  IconFlame, IconToolsKitchen2, IconGlassCocktail,
  /* Section */
  IconChefHat,
} from "@tabler/icons-react"
import WhatsAppIcon from "@/components/WhatsAppIcon"

const WA = "https://wa.me/5544991361672?text=Oi%2C%20quero%20fazer%20um%20pedido!"

/* ── Shared icon style ─────────────────────────────────────── */
const IT = { size: 22, strokeWidth: 1.5 }   // item icons
const DT = { size: 42, strokeWidth: 1.1 }   // decorative header icons

/* ── Data ─────────────────────────────────────────────────── */
const categories = [
  {
    title:  "Assados",
    sub:    "Direto da brasa",
    accent: "#E8650A",
    DecoIcon: IconFlame,
    items: [
      { name: "Costela Bovina",     desc: "12h na brasa, carne soltando do osso",      Icon: IconBone        },
      { name: "Frango Assado",      desc: "Temperado na véspera, dourado na brasa",     Icon: IconFlameFilled },
      { name: "Linguiça Artesanal", desc: "Receita da casa, fresquinha a cada pedido",  Icon: IconSausage     },
      { name: "Picanha",            desc: "Corte nobre, selada no ponto certo",         Icon: IconCrown       },
      { name: "Cupim",              desc: "Macio e suculento, cheio de sabor",          Icon: IconMeat        },
      { name: "Maminha",            desc: "Tenra e saborosa, sempre no ponto",          Icon: IconGrill       },
    ],
  },
  {
    title:  "Acompanhamentos",
    sub:    "Para completar",
    accent: "#C8860A",
    DecoIcon: IconToolsKitchen2,
    items: [
      { name: "Arroz Branco",       desc: "Soltinho, feito na hora",           Icon: IconBowlChopsticks },
      { name: "Batata Assada",      desc: "Dourada e crocante por fora",        Icon: IconBowlSpoon      },
      { name: "Maionese Temperada", desc: "Receita da casa, cremosa",           Icon: IconCup            },
      { name: "Farofa",             desc: "Crocante e bem temperada",           Icon: IconSoup           },
      { name: "Vinagrete",          desc: "Fresco, no ponto",                   Icon: IconSalad          },
      { name: "Pão de Alho",        desc: "Crocante, com manteiga e alho",     Icon: IconBread          },
    ],
  },
  {
    title:  "Bebidas",
    sub:    "Para acompanhar",
    accent: "#FF7A1A",
    DecoIcon: IconGlassCocktail,
    items: [
      { name: "Refrigerante",  desc: "Lata gelada",                   Icon: IconGlassFull    },
      { name: "Cerveja",       desc: "Long neck ou lata bem gelada",  Icon: IconBeerFilled   },
      { name: "Água",          desc: "Com ou sem gás",                 Icon: IconDropletFilled},
      { name: "Suco Natural",  desc: "Frutas da estação",              Icon: IconLemon        },
      { name: "Água de Coco",  desc: "Natural e gelada",              Icon: IconLeafFilled   },
      { name: "Energético",    desc: "Para repor energia",            Icon: IconBolt         },
    ],
  },
]

/* ── Card ─────────────────────────────────────────────────── */
function CategoryCard({ cat, i }: { cat: typeof categories[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1C0A00 0%, #110500 100%)",
        border: `1px solid rgba(232,101,10,0.20)`,
        boxShadow: `0 0 40px rgba(232,101,10,0.05), inset 0 0 60px rgba(232,101,10,0.03)`,
      }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-8 right-8 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${cat.accent}55, transparent)` }}
      />

      <div className="p-7 flex flex-col flex-1">

        {/* Card header */}
        <div className="flex items-start justify-between mb-5">
          <span className="font-body text-[10px] uppercase tracking-[0.45em] pt-1"
            style={{ color: `${cat.accent}90` }}>
            {cat.sub}
          </span>
          <div style={{ color: cat.accent, opacity: 0.55 }}>
            <cat.DecoIcon {...DT} />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-body font-bold text-brand-cream mb-3"
          style={{ fontSize: "clamp(1.7rem,2.5vw,2.2rem)" }}>
          {cat.title}
        </h3>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
          className="h-[2px] w-10 rounded-full mb-7 origin-left"
          style={{ background: cat.accent }}
        />

        {/* Items */}
        <div className="flex flex-col flex-1">
          {cat.items.map((item, ii) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + ii * 0.06 + 0.2 }}
              className="group flex items-start gap-3.5 py-3 border-b last:border-0 cursor-default"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            >
              <div className="shrink-0 mt-0.5 transition-all duration-200 group-hover:scale-110"
                style={{ color: cat.accent, opacity: 0.7 }}>
                <item.Icon {...IT} />
              </div>
              <div>
                <p className="font-body font-semibold text-sm text-brand-cream leading-snug group-hover:text-brand-gold transition-colors duration-150">
                  {item.name}
                </p>
                <p className="font-body text-xs mt-0.5 leading-relaxed" style={{ color: "#A07040" }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Section ───────────────────────────────────────────────── */
export default function Menu() {
  return (
    <section id="cardapio" className="relative py-28 px-4 sm:px-8 overflow-hidden" style={{ background: "#0A0300" }}>

      {/* Background embers */}
      {[...Array(8)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width: 3+(i%3), height: 3+(i%3), left:`${5+i*12}%`, bottom:"8%",
            background: i%2===0?"#E8650A":"#C8860A", boxShadow:`0 0 6px ${i%2===0?"#E8650A":"#C8860A"}` }}
          animate={{ y:[0,-120], opacity:[0.6,0], scale:[1,0] }}
          transition={{ duration:3+i*0.4, delay:i*0.5, repeat:Infinity, ease:"easeOut" }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16" style={{ background:"linear-gradient(to right,transparent,rgba(232,101,10,0.5))" }}/>
            <IconChefHat size={22} className="text-brand-orange" strokeWidth={1.5} />
            <div className="h-px w-16" style={{ background:"linear-gradient(to left,transparent,rgba(232,101,10,0.5))" }}/>
          </div>
          <h2 className="font-body font-light text-brand-cream"
            style={{ fontSize:"clamp(2.8rem,6vw,5rem)", letterSpacing:"-0.01em" }}>
            Nosso Cardápio
          </h2>
          <p className="mt-4 font-body text-sm max-w-lg mx-auto leading-relaxed" style={{ color:"#A07040" }}>
            Sabores preparados na brasa, acompanhamentos e bebidas para completar a experiência.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} i={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ delay:0.3 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <p className="font-body text-sm" style={{ color:"#A07040" }}>
            Manda mensagem e a gente te diz o que tá disponível hoje.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white px-10 py-4 rounded-full font-body font-bold text-base transition-all duration-200 hover:scale-105 hover:brightness-110"
            style={{ background:"linear-gradient(135deg,#16a34a,#15803d)", boxShadow:"0 4px 24px rgba(22,163,74,0.28)" }}>
            <WhatsAppIcon size={18} />
            Fazer pedido pelo WhatsApp
          </a>
        </motion.div>

      </div>
    </section>
  )
}
