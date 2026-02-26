import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

export default function Scene4DRep() {
  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-[#E5E7EB] mb-6"
      >
        2. 4D Representation
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-lg text-[#9CA3AF] max-w-3xl leading-relaxed mb-10"
      >
        fMRI 데이터는{' '}
        <strong className="text-xl text-[#64b5f6]">
          공간 정보(3D)와 시간의 흐름(Time)
        </strong>
        을 모두 포함하는 거대한 4차원 형태 그대로 모델에 직접 입력됩니다.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.95)',
          padding: 24,
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        }}
      >
        <img
          src={`${BASE}swift-demo/4d_brain_cubes.png`}
          alt="4D Brain Representation"
          loading="lazy"
          className="block w-full max-w-2xl"
        />
      </motion.div>
    </div>
  )
}
