import { APPBARBER_URL, WHATSAPP_URL } from '../App'
import { InstagramIcon, WhatsAppIcon } from './icons'

const INSTAGRAM_URL = 'https://www.instagram.com/rosabarbearia'

const smooth = (href: string) => {
  const el = document.querySelector(href)
  if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 72, behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="bg-brand-dark pt-14 pb-7" role="contentinfo">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] lg:grid-cols-[2.5fr_1fr_1fr_1.5fr] gap-10 mb-10">

          {/* Brand */}
          <div>
            <a
              href="#inicio"
              className="flex items-center gap-2.5"
              onClick={e => { e.preventDefault(); smooth('#inicio') }}
              aria-label="Rosa Barbearia"
            >
              <img
                src="/logo.png"
                alt="Rosa Barbearia"
                className="w-[36px] h-[36px] rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-serif text-[17px] font-bold text-white leading-none">Rosa Barbearia</span>
                <span className="text-[9px] tracking-[2.5px] uppercase text-white/60 mt-0.5">Gravataí</span>
              </div>
            </a>
            <p className="mt-3.5 text-[13px] leading-[1.7] text-white/70 max-w-[240px]">
              Atendimento premium para homens que valorizam sua imagem, estilo e confiança.
            </p>
            <div className="flex gap-2.5 mt-[18px]">
              {[
                { href: INSTAGRAM_URL, label: 'Instagram', Icon: InstagramIcon },
                { href: WHATSAPP_URL,  label: 'WhatsApp',  Icon: WhatsAppIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${label} da Rosa Barbearia`}
                  className="w-[38px] h-[38px] rounded-sm border border-white/[0.30] flex items-center justify-center
                    text-white/80 hover:text-white hover:bg-white/[0.12] hover:border-white/50
                    transition-all duration-[220ms]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-white/60 mb-3.5">
              Navegação
            </p>
            <ul className="flex flex-col gap-2.5">
              {[['#inicio','Início'],['#servicos','Serviços'],['#equipe','Equipe'],['#localizacao','Localização']].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-white/75 hover:text-white transition-colors duration-200"
                    onClick={e => { e.preventDefault(); smooth(href) }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-white/60 mb-3.5">
              Contato
            </p>
            <ul className="flex flex-col gap-2.5">
              <li><a href={WHATSAPP_URL} target="_blank" rel="noopener" className="text-sm text-white/75 hover:text-white transition-colors duration-200">WhatsApp</a></li>
              <li><a href={APPBARBER_URL} target="_blank" rel="noopener" className="text-sm text-white/75 hover:text-white transition-colors duration-200">Agendar Online</a></li>
              <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="text-sm text-white/75 hover:text-white transition-colors duration-200">Instagram</a></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-white/60 mb-3.5">
              Horários
            </p>
            <ul className="flex flex-col gap-1.5">
              {[['Ter – Sex','09:00–13:00 | 14:00–20:00'],['Sábado','08:00–13:00 | 14:00–18:00'],['Dom / Seg','Fechado']].map(([day, time]) => (
                <li key={day} className="flex justify-between gap-3 text-[13px]">
                  <span className="text-white/65">{day}</span>
                  <span className="text-white font-medium">{time}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-7 border-t border-white/[0.15] flex flex-col md:flex-row gap-1.5 items-center md:justify-between text-center">
          <p className="text-[12px] text-white/55">© 2025 Rosa Barbearia. Todos os direitos reservados.</p>
          <p className="text-[12px] text-white/55">Av. Dorival Cândido Luz de Oliveira, 3387 – 2º piso · Gravataí – RS</p>
        </div>
      </div>
    </footer>
  )
}
