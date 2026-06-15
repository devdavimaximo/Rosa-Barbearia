import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { APPBARBER_URL } from '../App'
import { CalendarIcon } from './icons'

/* ── Category Icons ──────────────────────────────────────── */
const IconAll = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
)
const IconScissors = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    <line x1="20" y1="4" x2="8.12" y2="15.88"/>
    <line x1="14.47" y1="14.48" x2="20" y2="20"/>
    <line x1="8.12" y1="8.12" x2="12" y2="12"/>
  </svg>
)
const IconBeard = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9c0-1 .5-2 2-2h14c1.5 0 2 1 2 2v3c0 4-3 7-8 7s-8-3-8-7V9z"/>
    <path d="M8 16c.5 1.5 1.5 2.5 4 2.5s3.5-1 4-2.5"/>
    <line x1="12" y1="7" x2="12" y2="12"/>
    <circle cx="12" cy="5" r="2"/>
  </svg>
)
const IconDroplet = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    <line x1="12" y1="12" x2="12" y2="17"/>
    <line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/>
  </svg>
)
const IconSparkle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v3m0 12v3M3 12h3m12 0h3"/>
    <path d="M5.64 5.64l2.12 2.12m8.48 8.48l2.12 2.12M5.64 18.36l2.12-2.12m8.48-8.48l2.12-2.12"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

/* ── Data ─────────────────────────────────────────────────── */
type Category = { id: string; label: string; icon: ReactNode; items: string[] }

const categories: Category[] = [
  {
    id: 'cortes',
    label: 'Cortes',
    icon: <IconScissors />,
    items: [
      'Corte',
      'Corte e Sobrancelha Navalha',
      'Corte e Hidratação no Cabelo',
      'Corte e Barba',
      'Corte e Barba Expressa',
      'Corte e Cavanhaque',
      'Corte, Barba e Sobrancelha Navalha',
      'Corte, Cavanhaque e Sobrancelha Navalha',
    ],
  },
  {
    id: 'barba',
    label: 'Barba',
    icon: <IconBeard />,
    items: ['Barba', 'Barba Express', 'Hidratação na Barba'],
  },
  {
    id: 'tratamentos',
    label: 'Tratamentos',
    icon: <IconDroplet />,
    items: ['Hidratação no Cabelo', 'Selagem Térmica', 'Progressiva', 'Limpeza de Pele'],
  },
  {
    id: 'acabamentos',
    label: 'Acabamentos',
    icon: <IconSparkle />,
    items: [
      'Sobrancelha Navalha',
      'Sobrancelha a Cera',
      'Acabamento',
      'Depilação Nariz',
      'Depilação Orelha',
      'Depilação Nariz e Orelha',
    ],
  },
]

const tabs = [
  ...categories.map(c => ({ id: c.id, label: c.label, icon: c.icon })),
  { id: 'todos', label: 'Todos', icon: <IconAll /> },
]

/* ── Item card ────────────────────────────────────────────── */
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const } },
}

function ServiceItem({ name }: { name: string; icon?: ReactNode }) {
  return (
    <motion.div
      variants={itemVariants}
      className="group flex items-center gap-3 px-4 py-3.5 rounded-md border border-black/[0.06]
        bg-white hover:border-brand/30 hover:bg-brand/[0.03] transition-colors duration-200 cursor-default"
    >
      <span className="w-[5px] h-[5px] rounded-full bg-brand shrink-0
        transition-transform duration-[220ms] group-hover:scale-[1.8]"
        aria-hidden="true"
      />
      <span className="text-[14.5px] text-[#1B1B1B] group-hover:text-brand transition-colors duration-200 leading-snug">
        {name}
      </span>
    </motion.div>
  )
}

/* ── Category group (for "Todos" view) ───────────────────── */
const groupVariants = {
  hidden: { opacity: 0, y: 14 },
  show:   (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] as const },
  }),
}

function CategoryGroup({ cat, index }: { cat: Category; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={groupVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="border-t border-black/[0.07] pt-6"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-brand">{cat.icon}</span>
        <h3 className="font-serif text-[19px] font-semibold text-[#1B1B1B]">{cat.label}</h3>
        <div className="flex-1 h-px bg-black/[0.07]" aria-hidden="true" />
        <span className="text-[12px] text-gray-400 tabular-nums">{cat.items.length}</span>
      </div>
      <ul className="flex flex-col gap-0">
        {cat.items.map(item => (
          <li
            key={item}
            className="group flex items-center gap-3 py-2.5 border-b border-black/[0.04] last:border-0
              transition-all duration-[200ms] cursor-default"
          >
            <span className="w-[4px] h-[4px] rounded-full bg-brand/60 shrink-0
              transition-transform duration-[200ms] group-hover:scale-[2] group-hover:bg-brand"
              aria-hidden="true"
            />
            <span className="text-[14px] text-[#1B1B1B] group-hover:text-brand transition-colors duration-200">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/* ── Staggered grid (for single category) ────────────────── */
const listVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.055 } },
}

function SingleCategory({ cat }: { cat: Category }) {
  return (
    <motion.div
      key={cat.id}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, transition: { duration: 0.18 } }}
      variants={listVariants}
    >
      <motion.div
        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
        className="flex items-center gap-2.5 mb-6 pb-4 border-b border-black/[0.07]"
      >
        <div className="w-9 h-9 rounded-sm bg-brand flex items-center justify-center text-white">
          {cat.icon}
        </div>
        <div>
          <h3 className="font-serif text-[20px] font-semibold text-[#1B1B1B] leading-none">{cat.label}</h3>
          <p className="text-[12px] text-gray-400 mt-0.5">{cat.items.length} serviços disponíveis</p>
        </div>
      </motion.div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {cat.items.map(name => (
          <ServiceItem key={name} name={name} icon={cat.icon} />
        ))}
      </ul>
    </motion.div>
  )
}

/* ── Main component ──────────────────────────────────────── */
export default function Services() {
  const [activeTab, setActiveTab] = useState<string>('cortes')
  const { ref, inView } = useInView()

  const activeCategory = categories.find(c => c.id === activeTab)

  return (
    <section className="sec bg-white" id="servicos">
      <div className="container">

        {/* Header */}
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="sec-head"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">O que oferecemos</span>
          <h2 className="h-display">Nossos Serviços</h2>
          <p className="body-md mt-3 max-w-[500px]">
            Soluções completas para cabelo, barba e cuidados pessoais.
          </p>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-2 mb-10 overflow-x-auto pb-1 -mx-5 px-5 md:mx-0 md:px-0
            scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Categorias de serviços"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls="services-content"
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full
                text-[13px] font-medium whitespace-nowrap shrink-0
                transition-colors duration-[200ms] focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
                ${activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-brand bg-black/[0.04] hover:bg-brand/[0.06]'}`}
            >
              {/* Sliding pill background */}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-brand rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <div id="services-content" role="tabpanel" className="min-h-[320px]">
          <AnimatePresence mode="wait">
            {activeTab === 'todos' ? (
              <motion.div
                key="todos"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
              >
                {categories.map((cat, i) => (
                  <CategoryGroup key={cat.id} cat={cat} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const } }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
              >
                {activeCategory && <SingleCategory cat={activeCategory} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href={APPBARBER_URL} target="_blank" rel="noopener" className="btn btn-primary">
            <CalendarIcon />
            Agendar Horário
          </a>
        </motion.div>

      </div>
    </section>
  )
}
