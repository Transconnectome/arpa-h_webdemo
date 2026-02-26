import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FlipCardProps {
  isFlipped: boolean
  back: ReactNode
  borderColor: string
  delay?: number
}

export default function FlipCard({ isFlipped, back, borderColor, delay = 0 }: FlipCardProps) {
  return (
    <div style={{ perspective: 1200, width: 320, height: 420, flexShrink: 0 }}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, delay, ease: [0.175, 0.885, 0.32, 1.275] }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl"
          style={{
            backfaceVisibility: 'hidden',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="text-center">
            <span className="text-5xl mb-4 block">🧠</span>
            <span className="text-[#9CA3AF] text-lg font-mono">Analyzing...</span>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-between p-5"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'rgba(255,255,255,0.05)',
            borderTop: `4px solid ${borderColor}`,
            border: '1px solid rgba(255,255,255,0.1)',
            borderTopWidth: 4,
            borderTopColor: borderColor,
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  )
}
