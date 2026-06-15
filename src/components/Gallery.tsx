import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const photos = [
  { src: '/corte.png',          alt: 'Corte de cabelo',     label: 'Corte',         tall: true  },
  { src: '/barba.png',          alt: 'Barba',               label: 'Barba',         tall: false },
  { src: '/ambiente.png',       alt: 'Ambiente',            label: 'Ambiente',      tall: false },
  { src: '/corte e barba.png',  alt: 'Corte e barba',       label: 'Corte e Barba', tall: false },
  { src: '/bastidores.png',     alt: 'Bastidores',          label: 'Bastidores',    tall: true  },
  { src: '/tratamento.png',     alt: 'Tratamento capilar',  label: 'Tratamento',    tall: false },
]

/* gradient backgrounds for placeholder state */
const gradients = [
  'linear-gradient(145deg,#1a2620 0%,#3D574C 100%)',
  'linear-gradient(145deg,#2A4339 0%,#4e6e61 100%)',
  'linear-gradient(145deg,#3D574C 0%,#2A4339 100%)',
  'linear-gradient(145deg,#4e6e61 0%,#1a2620 100%)',
  'linear-gradient(170deg,#2A4339 0%,#3D574C 100%)',
  'linear-gradient(145deg,#1a2620 0%,#4e6e61 100%)',
]

function GalItem({ photo, gradient, delay }: { photo: typeof photos[0]; gradient: string; delay: number }) {
  const { ref, inView } = useInView()
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`rounded-md overflow-hidden cursor-zoom-in ${photo.tall ? 'row-span-2' : ''}`}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      <div
        className={`relative w-full flex items-end p-3.5 overflow-hidden
          transition-transform duration-500 hover:scale-[1.03]
          ${photo.tall ? 'min-h-[336px]' : 'min-h-[160px]'}`}
        style={{ background: gradient }}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-[1.05]"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <span className="text-[10px] tracking-[2px] uppercase text-white/45 relative z-10">
          {photo.label}
        </span>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const { ref, inView } = useInView()

  return (
    <section className="sec bg-white">
      <div className="container">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="sec-head"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Galeria</span>
          <h2 className="h-display">Resultados que<br />falam por si.</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2">
          {photos.map((p, i) => (
            <GalItem key={p.label} photo={p} gradient={gradients[i]} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  )
}
