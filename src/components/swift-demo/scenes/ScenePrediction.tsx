import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FlipCard from '../shared/FlipCard'
import CircularGauge from '../shared/CircularGauge'

export default function ScenePrediction() {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setFlipped(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-[#E5E7EB] mb-8"
      >
        5. Task Label / Prediction
      </motion.h2>

      <div className="flex items-center justify-center gap-8" style={{ transform: 'scale(0.85)' }}>
        {/* Card A - MCI */}
        <FlipCard
          isFlipped={flipped}
          delay={0}
          borderColor="#EF4444"
          back={
            <>
              <div className="text-center w-full">
                <span
                  className="inline-block px-5 py-2 rounded text-white font-bold text-sm mb-3"
                  style={{ background: '#EF4444' }}
                >
                  참여자 A
                </span>
                <br />
                <strong className="text-[#E5E7EB] text-lg">MCI 위험도 예측결과</strong>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <CircularGauge value={95} color="red" label="MCI 가능성 매우 높음" />
              </div>
              <div
                className="w-full text-center py-3 rounded-lg text-sm"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#9CA3AF',
                }}
              >
                실제 결과: <strong style={{ color: '#EF4444' }}>MCI (경도인지장애)</strong>
              </div>
            </>
          }
        />

        {/* Card B - HC */}
        <FlipCard
          isFlipped={flipped}
          delay={0.3}
          borderColor="#10B981"
          back={
            <>
              <div className="text-center w-full">
                <span
                  className="inline-block px-5 py-2 rounded text-white font-bold text-sm mb-3"
                  style={{ background: '#10B981' }}
                >
                  참여자 B
                </span>
                <br />
                <strong className="text-[#E5E7EB] text-lg">MCI 위험도 예측결과</strong>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <CircularGauge value={3} color="green" label="MCI 위험도 낮음" />
              </div>
              <div
                className="w-full text-center py-3 rounded-lg text-sm"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#9CA3AF',
                }}
              >
                실제 결과: <strong style={{ color: '#10B981' }}>HC (Normal)</strong>
              </div>
            </>
          }
        />
      </div>
    </div>
  )
}
