import { motion } from 'framer-motion'
import IsometricBlock from '../shared/IsometricBlock'

const blocks = [
  { id: 'patch', variant: 'base' as const, label: 'Patch Partition\n& Embed', delay: 0 },
  { id: 'st1', variant: 'stage' as const, label: 'Stage 1', sub: 'Abs. Pos. Embed', code: '4D Block x 2', delay: 0.4 },
  { id: 'st2', variant: 'stage' as const, label: 'Stage 2-3', sub: 'Patch Merging', code: '4D Block x Ls', delay: 0.8 },
  { id: 'st4', variant: 'stage' as const, label: 'Stage 4', sub: 'Patch Merging', code: 'Global Attn x 2', delay: 1.2 },
  { id: 'norm', variant: 'base' as const, label: 'Normalization\nLayer', delay: 1.6 },
]

export default function SceneBackbone() {
  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-[#E5E7EB] mb-4"
      >
        3. SwiFT Foundation Backbone
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center max-w-3xl text-lg leading-relaxed mb-10"
        style={{ color: 'rgba(255,255,255,0.85)' }}
      >
        <strong className="text-xl text-[#64b5f6] block mb-1">
          수만 명의 데이터로 완성된 뇌 신호의 '표준 분석 기준'
        </strong>
        대규모 데이터로 뇌 신호의 핵심을 잡아내는 방법을 이미 학습한 모델이
        <br />
        학습된 내용을 바탕으로 입력된 fMRI 데이터의 핵심 특징(Embedding)을 추출합니다.
      </motion.div>

      <div
        className="flex items-center justify-center gap-2"
        style={{ perspective: 1200, transform: 'scale(0.85)' }}
      >
        {blocks.map((b) => (
          <IsometricBlock key={b.id} variant={b.variant} delay={b.delay}>
            {b.variant === 'stage' ? (
              <>
                <strong className="text-sm font-extrabold text-[#00D4FF] mb-1">{b.label}</strong>
                <span className="text-xs text-[#9CA3AF]">{b.sub}</span>
                <span
                  className="text-xs font-mono mt-1 px-1.5 py-0.5 rounded"
                  style={{ background: 'rgba(0,212,255,0.15)', color: '#00D4FF' }}
                >
                  {b.code}
                </span>
              </>
            ) : (
              <span className="text-xs font-bold whitespace-pre-line">{b.label}</span>
            )}
          </IsometricBlock>
        ))}
      </div>
    </div>
  )
}
