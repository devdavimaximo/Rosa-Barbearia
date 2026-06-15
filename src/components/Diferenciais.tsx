import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const items: { title: string; desc: string; icon: ReactNode }[] = [
  {
    title: 'Atendimento Personalizado',
    desc: 'Cada cliente é único. Entendemos seu estilo e entregamos exatamente o que você precisa.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
  {
    title: 'Ambiente Confortável',
    desc: 'Estrutura planejada para que você se sinta à vontade do início ao fim.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    title: 'Profissionais Qualificados',
    desc: 'Experiência e constante aperfeiçoamento para entregar os melhores resultados.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  },
  {
    title: 'Agendamento Simplificado',
    desc: 'Reserve seu horário em poucos segundos pelo AppBarber, 24 horas por dia.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  },
  {
    title: 'Produtos de Qualidade',
    desc: 'Utilizamos produtos selecionados para garantir os melhores resultados e cuidados.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  },
  {
    title: 'Foco na Experiência',
    desc: 'Cada detalhe é pensado para que sua visita seja sempre excelente, do início ao fim.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  },
]

function Card({ item, colDelay }: { item: typeof items[0]; colDelay: number }) {
  const { ref, inView } = useInView()
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="bg-white rounded-md p-7 transition-shadow duration-[250ms]"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: colDelay, ease: 'easeOut' }}
      whileHover={{ y: -2, boxShadow: '0 4px 16px rgba(0,0,0,0.09)' }}
    >
      <div className="w-11 h-11 rounded-sm bg-brand flex items-center justify-center mb-4">
        <div className="w-[22px] h-[22px]">{item.icon}</div>
      </div>
      <h3 className="font-serif text-[17px] font-semibold text-[#1B1B1B] mb-1.5">
        {item.title}
      </h3>
      <p className="text-sm leading-[1.65] text-gray-500">{item.desc}</p>
    </motion.div>
  )
}

export default function Diferenciais() {
  const { ref, inView } = useInView()

  return (
    <section className="sec bg-brand">
      <div className="container">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="sec-head"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow eyebrow-light">Por que nos escolher</span>
          <h2 className="h-display h-display-light">Por que escolher a<br />Rosa Barbearia?</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <Card key={item.title} item={item} colDelay={(i % 3) * 0.10} />
          ))}
        </div>
      </div>
    </section>
  )
}
