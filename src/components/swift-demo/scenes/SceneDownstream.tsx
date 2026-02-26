import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MlpNetwork from '../shared/MlpNetwork'

export default function SceneDownstream() {
  const [morphDone, setMorphDone] = useState(false)
  const [showArrow, setShowArrow] = useState(false)
  const [showMlp, setShowMlp] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setMorphDone(true), 200)
    const t2 = setTimeout(() => setShowArrow(true), 1500)
    const t3 = setTimeout(() => setShowMlp(true), 2200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-[#E5E7EB] mb-4"
      >
        4. Downstream Fine-tuning Head
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center max-w-3xl text-lg leading-relaxed mb-10 text-[#9CA3AF]"
      >
        추출된 뇌의 핵심 임베딩(Latent Representation)을 바탕으로,
        <br />
        <strong className="text-xl text-[#64b5f6]">
          특정 참여자의 정상(HC) 여부와 경도인지장애(MCI) 여부를 정밀하게 감별
        </strong>
        해냅니다.
      </motion.div>

      <div className="flex items-center justify-center gap-8" style={{ transform: 'scale(0.9)' }}>
        {/* Latent Block */}
        <motion.div
          initial={{ opacity: 0, transform: 'rotateX(60deg) rotateZ(-45deg) translateZ(20px) translate3d(200px, -200px, 0) scale(0.9)' }}
          animate={
            morphDone
              ? { opacity: 1, transform: 'rotateX(60deg) rotateZ(-45deg) translateZ(20px)' }
              : undefined
          }
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="iso-block active iso-latent"
        >
          <div className="iso-face top">
            <span className="text-xs font-bold">Latent Representation</span>
          </div>
          <div className="iso-face left" />
          <div className="iso-face right" />
        </motion.div>

        {/* Arrow */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: showArrow ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl text-[#00D4FF]"
        >
          →
        </motion.span>

        {/* MLP Head */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showMlp ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <MlpNetwork active={showMlp} />
        </motion.div>
      </div>
    </div>
  )
}
