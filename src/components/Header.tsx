import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { APPBARBER_URL, WHATSAPP_URL } from '../App'

const NAV_LINKS = [
  { label: 'Início',      href: '#inicio' },
  { label: 'Serviços',    href: '#servicos' },
  { label: 'Equipe',      href: '#equipe' },
  { label: 'Localização', href: '#localizacao' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const smoothScroll = (href: string) => {
    const el = document.querySelector(href)
    if (!el) return
    window.scrollTo({ top: (el as HTMLElement).offsetTop - 72, behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      {/* ── Header ──────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[200] h-[72px] flex items-center
          transition-[background,box-shadow] duration-[250ms]
          ${scrolled ? 'bg-white/[0.92] backdrop-blur-lg shadow-[0_1px_0_rgba(0,0,0,0.07)]' : ''}`}
      >
        <div className="container">
          <div className="flex items-center justify-between w-full">

            {/* Logo */}
            <a
              href="#inicio"
              onClick={e => { e.preventDefault(); smoothScroll('#inicio') }}
              className="flex items-center gap-2.5"
              aria-label="Rosa Barbearia"
            >
              <img
                src="/logo.png"
                alt="Rosa Barbearia"
                className="w-[38px] h-[38px] rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col">
                <span className={`font-serif text-[17px] font-bold leading-none transition-colors duration-[250ms]
                  ${scrolled ? 'text-[#1B1B1B]' : 'text-white'}`}>
                  Rosa Barbearia
                </span>
                <span className={`text-[9px] tracking-[2.5px] uppercase mt-0.5 transition-colors duration-[250ms]
                  ${scrolled ? 'text-gray-500' : 'text-white/55'}`}>
                  Gravataí
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
              {NAV_LINKS.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={e => { e.preventDefault(); smoothScroll(l.href) }}
                  className={`nav-link ${scrolled ? 'nav-link-solid' : 'nav-link-hero'}`}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              <a
                href={APPBARBER_URL}
                target="_blank" rel="noopener"
                className="btn btn-primary btn-sm hidden lg:inline-flex"
                aria-label="Agendar horário"
              >
                Agendar Horário
              </a>

              {/* Hamburger */}
              <button
                className="flex flex-col gap-[5px] w-10 h-10 p-2 rounded-sm lg:hidden"
                aria-label={open ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}
              >
                <span className={`block h-[1.5px] rounded-sm origin-center transition-all duration-[250ms]
                  ${scrolled ? 'bg-[#1B1B1B]' : 'bg-white'}
                  ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
                <span className={`block h-[1.5px] rounded-sm transition-all duration-[250ms]
                  ${scrolled ? 'bg-[#1B1B1B]' : 'bg-white'}
                  ${open ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-[1.5px] rounded-sm origin-center transition-all duration-[250ms]
                  ${scrolled ? 'bg-[#1B1B1B]' : 'bg-white'}
                  ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile drawer ────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed top-[72px] left-0 right-0 z-[199] bg-white/[0.97] backdrop-blur-xl
              px-5 pt-5 pb-7 border-b border-black/[0.07] shadow-hero"
            initial={{ y: '-110%' }}
            animate={{ y: 0 }}
            exit={{ y: '-110%' }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            role="dialog" aria-modal="true" aria-label="Menu"
          >
            <ul className="flex flex-col mb-5">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block py-[13px] text-base font-medium text-[#1B1B1B]
                      border-b border-black/[0.07] hover:text-brand transition-colors duration-200"
                    onClick={e => { e.preventDefault(); smoothScroll(l.href) }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2.5">
              <a href={APPBARBER_URL} target="_blank" rel="noopener"
                className="btn btn-primary btn-full" onClick={() => setOpen(false)}>
                Agendar Horário
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener"
                className="btn btn-outline btn-full" onClick={() => setOpen(false)}>
                Falar no WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
