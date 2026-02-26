import { motion } from 'framer-motion'

const pillars = [
  {
    id: 'data',
    color: 'blue' as const,
    title: '60T',
    subtitle: 'Unlabeled 4D fMRI',
    desc: '(대규모 뇌 영상 DB)',
  },
  {
    id: 'compute',
    color: 'orange' as const,
    title: 'Aurora HPC',
    subtitle: 'Supercomputing Power',
    desc: '(압도적 연산력)',
  },
  {
    id: 'arch',
    color: 'green' as const,
    title: 'SwiFT 4D',
    subtitle: 'Spatio-Temporal Arch',
    desc: '(4D fMRI 특화 구조)',
  },
]

const pillarVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.3 + i * 0.3, ease: 'easeOut' as const },
  }),
}

export default function ScenePowerUp() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-4">
      <div className="flex items-end justify-center gap-16 md:gap-24 mb-12" style={{ transform: 'translateY(-20px)' }}>
        {pillars.map((p, i) => (
          <motion.div
            key={p.id}
            custom={i}
            variants={pillarVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center relative"
          >
            {/* Core pillar */}
            <div className={`pillar-core ${p.color}`} />
            {/* Glowing ring */}
            <div className={`pillar-rings ${p.color}`} />
            {/* Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.3, duration: 1 }}
              className="mt-6 text-center"
            >
              <strong
                className="block text-2xl font-mono font-extrabold mb-1"
                style={{
                  color: p.color === 'blue' ? '#a5d8ff' : p.color === 'orange' ? '#ffc078' : '#96f2d7',
                  textShadow: `0 0 15px ${
                    p.color === 'blue'
                      ? 'rgba(165,216,255,0.8)'
                      : p.color === 'orange'
                        ? 'rgba(255,192,120,0.8)'
                        : 'rgba(150,242,215,0.8)'
                  }`,
                }}
              >
                {p.title}
              </strong>
              <span className="text-white/80 text-sm leading-relaxed">
                {p.subtitle}
                <br />
                {p.desc}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="text-center max-w-3xl text-lg leading-loose"
        style={{ color: '#e3fafc', textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}
      >
        <strong style={{ color: '#4dabf7' }}>초대형 뇌 영상 데이터</strong>와{' '}
        <strong style={{ color: '#ffa94d' }}>슈퍼컴퓨팅 연산력</strong>의 조화.
        <br />
        이 압도적 기반 위에서 <strong style={{ color: '#63e6be' }}>4D 특화 구조의 SwiFT</strong>를 구축하여
        <br />
        비로소 <strong className="text-[#00D4FF]">'개인 수준의 예측'</strong>을 가능하게 했습니다.
      </motion.div>
    </div>
  )
}
