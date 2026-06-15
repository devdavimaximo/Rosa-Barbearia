import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { WHATSAPP_URL } from '../App'
import { MapPinIcon } from './icons'

const ease = [0.4, 0, 0.2, 1] as const

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
      style={{ background: 'rgba(61,87,76,0.08)' }}>
      <div className="w-[18px] h-[18px] [&_svg]:w-full [&_svg]:h-full">{children}</div>
    </div>
  )
}

export default function Location() {
  const { ref: refInfo, inView: inInfo } = useInView()
  const { ref: refMap,  inView: inMap  } = useInView()

  return (
    <section className="sec bg-white" id="localizacao">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-center">

          {/* Info */}
          <motion.div
            ref={refInfo as React.RefObject<HTMLDivElement>}
            initial={{ opacity: 0, x: -24 }}
            animate={inInfo ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease }}
          >
            <span className="eyebrow">Onde estamos</span>
            <h2 className="h-display">Estamos esperando<br />por você.</h2>

            <dl className="flex flex-col gap-5 mt-8">
              {/* Address */}
              <div className="flex gap-3.5">
                <IconBox>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#3D574C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </IconBox>
                <div>
                  <dt className="text-[11px] font-semibold tracking-[1px] uppercase text-gray-400 mb-0.5">Endereço</dt>
                  <dd className="text-sm leading-[1.55] text-[#1B1B1B]">
                    Av. Dorival Cândido Luz de Oliveira, 3387 – 2º piso<br />Gravataí, RS
                  </dd>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-3.5">
                <IconBox>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#3D574C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </IconBox>
                <div>
                  <dt className="text-[11px] font-semibold tracking-[1px] uppercase text-gray-400 mb-0.5">Horários</dt>
                  <dd className="text-sm leading-[1.7] text-[#1B1B1B]">
                    Ter – Sex: 09:00–13:00 | 14:00–20:00<br />Sábado: 08:00–13:00 | 14:00–18:00
                  </dd>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3.5">
                <IconBox>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#3D574C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </IconBox>
                <div>
                  <dt className="text-[11px] font-semibold tracking-[1px] uppercase text-gray-400 mb-0.5">Contato</dt>
                  <dd className="text-sm text-[#1B1B1B]">+55 51 9265-1639</dd>
                </div>
              </div>
            </dl>

            <div className="flex gap-3 mt-7 flex-wrap">
              <a
                href="https://maps.google.com/?q=Av.+Dorival+C%C3%A2ndido+Luz+de+Oliveira,+3387,+Gravataí,+RS"
                target="_blank" rel="noopener"
                className="btn btn-primary"
              >
                <MapPinIcon />
                Como Chegar
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn btn-outline">
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            ref={refMap as React.RefObject<HTMLDivElement>}
            className="rounded-lg overflow-hidden aspect-video bg-gray-200"
            initial={{ opacity: 0, x: 24 }}
            animate={inMap ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease }}
          >
            <iframe
              className="w-full h-full border-0 block"
              src="https://maps.google.com/maps?q=Av.+Dorival+Candido+Luz+de+Oliveira,+3387,+Gravataí,+RS,+Brasil&output=embed"
              loading="lazy"
              title="Localização Rosa Barbearia — Gravataí RS"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Mapa da Rosa Barbearia"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
