import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function About() {
  const { ref: refImg, inView: inImg } = useInView()
  const { ref: refTxt, inView: inTxt } = useInView()

  return (
    <section className="sec bg-[#F4F4F4]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <motion.div
            ref={refImg as React.RefObject<HTMLDivElement>}
            className="aspect-[4/3] rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -24 }}
            animate={inImg ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as const }}
          >
            <img
              src="/lugar.png"
              alt="Ambiente da Rosa Barbearia"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            ref={refTxt as React.RefObject<HTMLDivElement>}
            initial={{ opacity: 0, x: 24 }}
            animate={inTxt ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] as const }}
          >
            <span className="eyebrow !text-brand-dark">Sobre nós</span>
            <h2 className="h-display">
              Onde tradição<br />encontra{' '}
              <em className="italic text-brand">excelência.</em>
            </h2>
            <div className="flex flex-col gap-3.5 mt-5">
              <p className="body-md">A Rosa Barbearia nasceu com um propósito simples: oferecer um atendimento de alto nível para homens que valorizam sua imagem.</p>
              <p className="body-md">Cada detalhe foi pensado para proporcionar uma experiência confortável, profissional e personalizada.</p>
              <p className="body-md">Do primeiro atendimento ao resultado final, buscamos entregar mais do que um serviço: entregamos confiança.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
