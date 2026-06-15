import { motion } from 'framer-motion'
import { APPBARBER_URL, WHATSAPP_URL } from '../App'
import { CalendarIcon, WhatsAppIcon } from './icons'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] as const },
})

export default function Hero() {
  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden
        min-h-svh pt-[calc(72px+44px)] pb-[88px]"
      id="inicio"
      aria-labelledby="hero-h1"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        role="img"
        aria-label="Ambiente premium da Rosa Barbearia"
        style={{
          background: `
            linear-gradient(165deg, rgba(18,30,24,0.82) 0%, rgba(42,67,57,0.62) 42%, rgba(18,30,24,0.90) 100%),
            url('/assets/hero.jpg') center / cover no-repeat`,
          backgroundColor: '#2A4339',
        }}
      >
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 65% 35%, rgba(252,239,207,0.06) 0%, transparent 55%)' }}
        />
      </div>

      <div className="container relative z-10">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-7 px-3.5 py-[7px] rounded-full
            border border-cream/[0.22]"
          style={{ background: 'rgba(252,239,207,0.10)', backdropFilter: 'blur(8px)' }}
          {...fadeUp(0.10)}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cream shrink-0" />
          <span className="text-[10px] font-semibold tracking-[2.5px] uppercase text-cream">
            Barbearia Premium &bull; Gravataí
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-h1"
          className="font-serif font-bold text-white mb-5 max-w-[640px]"
          style={{ fontSize: 'clamp(42px, 9.5vw, 82px)', lineHeight: 1.07 }}
          {...fadeUp(0.25)}
        >
          Sua melhor<br />versão <em className="italic text-cream">é aqui.</em>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-white/75 mb-10 max-w-[460px]"
          style={{ fontSize: 'clamp(15px, 2.2vw, 17px)', lineHeight: 1.75 }}
          {...fadeUp(0.40)}
        >
          Mais do que um corte, uma experiência pensada para quem valoriza sua imagem, seu estilo e sua confiança.
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex flex-wrap gap-3 mb-14" {...fadeUp(0.52)}>
          <a href={APPBARBER_URL} target="_blank" rel="noopener" className="btn btn-cream">
            <CalendarIcon />
            Agendar Horário
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn btn-ghost-white">
            <WhatsAppIcon />
            Falar no WhatsApp
          </a>
        </motion.div>

        {/* Quick facts */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0
            pt-6 border-t border-white/[0.22]"
          {...fadeUp(0.64)}
        >
          {[
            {
              text: 'Av. Dorival C. L. de Oliveira, 3387',
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              ),
            },
            {
              text: 'Atendimento personalizado',
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                </svg>
              ),
            },
            {
              text: 'Profissionais especializados',
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
                  <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                  <line x1="14.47" y1="14.48" x2="20" y2="20"/>
                  <line x1="8.12" y1="8.12" x2="12" y2="12"/>
                </svg>
              ),
            },
          ].map((f, i) => (
            <div key={f.text} className="flex items-center gap-2.5 sm:gap-0">
              {i > 0 && (
                <span className="hidden sm:block w-px h-3.5 bg-white/[0.18] mx-5 shrink-0" aria-hidden="true" />
              )}
              <span className="text-cream shrink-0">{f.icon}</span>
              <span className="text-[13px] text-white/90 leading-none sm:ml-2">{f.text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
