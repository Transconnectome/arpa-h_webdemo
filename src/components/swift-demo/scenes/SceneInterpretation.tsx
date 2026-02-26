import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

export default function SceneInterpretation() {
  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-[#E5E7EB] mb-4"
      >
        6. Interpretation
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center max-w-3xl text-lg leading-relaxed mb-8 text-[#9CA3AF]"
      >
        단순히 수치만 예측하는 것이 아니라 어떻게 예측했는지 시각적으로 해석합니다.
        <br />
        육안으로는 알 수 없는{' '}
        <strong className="text-xl text-[#64b5f6]">
          Default Mode Network의 미세한 비활성화
        </strong>
        를 모델이 스스로 캐치하여 판별의 핵심 근거로 삼았음을 볼 수 있습니다.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-4xl rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
      >
        <img
          src={`${BASE}swift-demo/surface_difference.png`}
          alt="Surface Difference Map"
          loading="lazy"
          className="w-full rounded-2xl"
        />
      </motion.div>
    </div>
  )
}
