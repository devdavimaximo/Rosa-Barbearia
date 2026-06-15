import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
}

export default function FadeUp({ children, delay = 0, className }: Props) {
  const { ref, inView } = useInView()

  return (
    <motion.div
      // @ts-expect-error ref type mismatch with generic
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
