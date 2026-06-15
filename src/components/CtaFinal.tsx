import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { APPBARBER_URL, WHATSAPP_URL } from '../App'
import { CalendarIcon, WhatsAppIcon } from './icons'

export default function CtaFinal() {
  const { ref, inView } = useInView()

  return (
    <section className="bg-brand py-[100px] relative overflow-hidden text-center" aria-labelledby="cta-h">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
        <span
          className="font-serif font-bold text-white/[0.03] leading-none whitespace-nowrap select-none"
          style={{ fontSize: 'clamp(100px, 22vw, 240px)' }}
        >
          Rosa
        </span>
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as const }}
        >
          <span className="block text-[11px] font-semibold tracking-[3px] uppercase text-cream/65 mb-3.5">
            Pronto para começar?
          </span>
          <h2
            id="cta-h"
            className="font-serif font-bold text-white leading-[1.18] max-w-[520px] mx-auto mb-4"
            style={{ fontSize: 'clamp(28px, 5.5vw, 52px)' }}
          >
            Sua melhor versão começa<br />com <em className="italic text-cream">uma escolha.</em>
          </h2>
          <p className="text-base text-white/90 mb-10 leading-relaxed">
            Agende seu horário e viva a experiência Rosa Barbearia.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={APPBARBER_URL} target="_blank" rel="noopener" className="btn btn-cream">
              <CalendarIcon />
              Agendar Horário
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn btn-ghost-white">
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
