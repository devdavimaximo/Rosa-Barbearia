import { useRef, useEffect, useCallback } from 'react'

const items = [
  { value: '+1000',  label: 'Clientes atendidos' },
  { value: '★★★★★', label: '5.0 Google Reviews' },
  { value: '+7',     label: 'Anos Experiência' },
  { value: 'Online', label: 'Agendamento imediato' },
]

const SPEED  = 0.6  // px por frame a 60fps ≈ 36px/s
const COPIES = 4    // cópias no DOM; loopamos a cada 1/COPIES do scrollWidth

export default function Stats() {
  const trackRef  = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const setRef    = useRef(0)   // largura de UM conjunto de itens
  const rafRef    = useRef<number | null>(null)
  const drag      = useRef({ active: false, startX: 0, startOffset: 0 })

  /* ── translação direta no DOM para não passar pelo React ── */
  const applyTranslate = (x: number) => {
    if (trackRef.current) trackRef.current.style.transform = `translateX(${x}px)`
  }

  /* ── mede a largura de um conjunto de itens ── */
  const measure = useCallback(() => {
    if (trackRef.current) setRef.current = trackRef.current.scrollWidth / COPIES
  }, [])

  /* ── normaliza offset para o intervalo (-set, 0] ── */
  const normalize = (o: number) => {
    const s = setRef.current
    if (!s) return o
    let n = o % s
    if (n > 0) n -= s
    return n
  }

  const tick = useCallback(() => {
    offsetRef.current -= SPEED
    if (Math.abs(offsetRef.current) >= setRef.current) {
      offsetRef.current += setRef.current
    }
    applyTranslate(offsetRef.current)
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const startAnim = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const stopAnim = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  useEffect(() => {
    measure()
    // re-mede após fontes carregarem (Playfair/Inter mudam largura dos textos)
    document.fonts.ready.then(measure)
    startAnim()
    return stopAnim
  }, [startAnim, measure])

  /* ── drag ── */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
    stopAnim()
    drag.current = { active: true, startX: e.clientX, startOffset: offsetRef.current }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const newOffset = drag.current.startOffset + (e.clientX - drag.current.startX)
    offsetRef.current = newOffset
    applyTranslate(newOffset)
  }

  const onPointerUp = () => {
    if (!drag.current.active) return
    drag.current.active = false
    offsetRef.current = normalize(offsetRef.current)
    applyTranslate(offsetRef.current)
    startAnim()
  }

  /* ── render ── */
  const doubled = Array.from({ length: COPIES }, () => items).flat()

  return (
    <div
      className="bg-brand overflow-hidden select-none cursor-grab active:cursor-grabbing"
      role="region"
      aria-label="Números da Rosa Barbearia"
    >
      <div
        ref={trackRef}
        className="flex items-center will-change-transform"
        style={{ width: 'max-content', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            {/* Item */}
            <div className="px-10 py-5 text-center">
              <div className="font-serif text-[22px] font-bold text-cream leading-none mb-[3px]">
                {item.value}
              </div>
              <div className="text-[11px] text-white/55 tracking-wide whitespace-nowrap">
                {item.label}
              </div>
            </div>
            {/* Separador */}
            <span
              className="w-px h-6 bg-white/[0.18] shrink-0"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
