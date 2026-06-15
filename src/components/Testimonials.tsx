import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { ChevronLeft, ChevronRight } from './icons'

const reviews = [
  { text: '"Excelente experiência! Atendimento de primeira, ambiente limpo, confortável e com um clima super agradável. São atenciosos e demonstram muito cuidado em cada detalhe do corte. Com certeza recomendo a todos que procuram qualidade e bom atendimento."', name: 'Raphael Reis Raupp', detail: 'Avaliação Google', initial: 'R' },
  { text: '"O atendimento sempre excelente, não tenho que reclamar, atende minhas expectativas e ouve com atenção cada detalhe referente ao corte e acabamentos, fora o local que esta impecável e acolhedor."', name: 'Tainara Oliveira', detail: 'Avaliação Google', initial: 'T' },
  { text: '"Excelente atendimento, fez exatamente o corte que eu queria."', name: 'Davi Prudêncio da Rosa', detail: 'Avaliação Google', initial: 'D' },
  { text: '"Lugar super confortável e serviço 100% bom."', name: 'João Silva', detail: 'Avaliação Google', initial: 'J' },
  { text: '"Ótimo estabelecimento, corte de cabelo e barba foi excelente também! Recomendo a todos."', name: 'Giovane Gomes', detail: 'Avaliação Google', initial: 'G' },
]

export default function Testimonials() {
  const { ref, inView } = useInView()
  const [cur, setCur]   = useState(0)
  const [dir, setDir]   = useState(1)
  const timerRef        = useRef<ReturnType<typeof setInterval> | null>(null)
  const total           = reviews.length

  const go = useCallback((idx: number, direction = 1) => {
    setDir(direction)
    setCur(((idx % total) + total) % total)
  }, [total])

  const stopAuto  = () => { if (timerRef.current) clearInterval(timerRef.current) }
  const startAuto = useCallback(() => {
    timerRef.current = setInterval(() => go(cur + 1, 1), 5000)
  }, [cur, go])

  useEffect(() => { startAuto(); return stopAuto }, [cur])

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0 }),
  }

  return (
    <section className="sec bg-brand-dark overflow-hidden" aria-labelledby="tst-title">
      <div className="container">

        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow eyebrow-light">Depoimentos</span>
          <h2 className="h-display h-display-light mb-10" id="tst-title">
            O que nossos<br />clientes dizem.
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          className="overflow-hidden relative"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={cur}
              className="max-w-[680px] mx-auto rounded-lg p-8 border border-white/[0.18] cursor-grab active:cursor-grabbing"
              style={{ background: 'rgba(255,255,255,0.10)' }}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as const }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 60) {
                  const d = info.offset.x < 0 ? 1 : -1
                  go(cur + d, d)
                }
              }}
              role="article"
            >
              <div className="flex gap-1 mb-3.5" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-cream text-base" aria-hidden="true">★</span>
                ))}
              </div>
              <p className="text-[17px] leading-[1.72] text-white/95 italic mb-6">
                {reviews[cur].text}
              </p>
              <div>
                <p className="text-sm font-semibold text-white">{reviews[cur].name}</p>
                <p className="text-[12px] text-white/65 mt-px">{reviews[cur].detail}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            className="w-11 h-11 rounded-full border border-white/[0.22] flex items-center justify-center
              text-white transition-all duration-[220ms] hover:bg-white/10 hover:border-white/45"
            onClick={() => go(cur - 1, -1)}
            aria-label="Depoimento anterior"
          >
            <ChevronLeft />
          </button>

          <div className="flex gap-1.5" role="tablist" aria-label="Navegar depoimentos">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`h-1.5 rounded-full border-0 cursor-pointer transition-all duration-[250ms]
                  ${i === cur ? 'bg-cream w-5' : 'bg-white/50 w-1.5 hover:bg-white/75'}`}
                role="tab"
                aria-label={`Depoimento ${i + 1}`}
                aria-selected={i === cur}
                onClick={() => go(i, i > cur ? 1 : -1)}
              />
            ))}
          </div>

          <button
            className="w-11 h-11 rounded-full border border-white/[0.22] flex items-center justify-center
              text-white transition-all duration-[220ms] hover:bg-white/10 hover:border-white/45"
            onClick={() => go(cur + 1, 1)}
            aria-label="Próximo depoimento"
          >
            <ChevronRight />
          </button>
        </div>

      </div>
    </section>
  )
}
