import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { APPBARBER_URL } from '../App'
import { CalendarIcon } from './icons'

const members = [
  {
    name: 'Lucas Rosa',
    role: 'Barbeiro Especializado',
    bio: 'Com paixão pela profissão e atenção aos detalhes, Lucas busca entregar uma experiência personalizada para cada cliente, sempre acompanhando tendências e técnicas modernas.',
    photo: '/barbeirolucas.png',
    alt: 'Lucas Rosa, barbeiro da Rosa Barbearia',
  },
  {
    name: 'Thiago Kaiser',
    role: 'Barbeiro Especializado',
    bio: 'Comprometido com excelência e atendimento próximo, Thiago trabalha para garantir resultados alinhados ao estilo e à personalidade de cada cliente.',
    photo: '/barbeirothiago.png',
    alt: 'Thiago Kaiser, barbeiro da Rosa Barbearia',
  },
]

function TeamCard({ member, delay }: { member: typeof members[0]; delay: number }) {
  const { ref, inView } = useInView()
  return (
    <motion.article
      ref={ref as React.RefObject<HTMLElement>}
      className="border border-black/[0.07] rounded-lg overflow-hidden bg-white
        transition-shadow duration-[250ms]"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] as const }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.13), 0 4px 12px rgba(0,0,0,0.07)' }}
    >
      {/* Photo */}
      <div
        className="aspect-square relative flex items-end p-5 overflow-hidden"
        style={{ background: 'linear-gradient(155deg, #2A4339 0%, #3D574C 100%)' }}
      >
        <img
          src={member.photo}
          alt={member.alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <span className="text-[10px] tracking-[2px] uppercase text-white/40 relative">
          {member.name}
        </span>
      </div>

      {/* Body */}
      <div className="p-7">
        <h3 className="font-serif text-[22px] font-semibold text-[#1B1B1B] mb-1">
          {member.name}
        </h3>
        <p className="text-[11px] font-semibold tracking-[2px] uppercase text-brand mb-3.5">
          {member.role}
        </p>
        <p className="text-sm leading-[1.7] text-gray-500 mb-[22px]">
          {member.bio}
        </p>
        <a href={APPBARBER_URL} target="_blank" rel="noopener" className="btn btn-primary btn-full">
          <CalendarIcon />
          Agendar com {member.name.split(' ')[0]}
        </a>
      </div>
    </motion.article>
  )
}

export default function Team() {
  const { ref, inView } = useInView()

  return (
    <section className="sec bg-white" id="equipe">
      <div className="container">

        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="sec-head"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Profissionais</span>
          <h2 className="h-display">Quem cuida<br />do seu estilo.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((m, i) => (
            <TeamCard key={m.name} member={m} delay={i * 0.15} />
          ))}
        </div>

      </div>
    </section>
  )
}
