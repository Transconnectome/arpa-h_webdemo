import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface IsometricBlockProps {
  variant: 'base' | 'stage' | 'latent'
  children: ReactNode
  delay?: number
  active?: boolean
  className?: string
  id?: string
}

export default function IsometricBlock({
  variant,
  children,
  delay = 0,
  active = true,
  className = '',
  id,
}: IsometricBlockProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, transform: 'rotateX(60deg) rotateZ(-45deg) translateZ(-40px)' }}
      animate={
        active
          ? { opacity: 1, transform: 'rotateX(60deg) rotateZ(-45deg) translateZ(20px)' }
          : { opacity: 0, transform: 'rotateX(60deg) rotateZ(-45deg) translateZ(-40px)' }
      }
      transition={{
        duration: 1,
        delay,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className={`iso-block ${active ? 'active' : ''} iso-${variant} ${className}`}
    >
      <div className="iso-face top">{children}</div>
      <div className="iso-face left" />
      <div className="iso-face right" />
    </motion.div>
  )
}
