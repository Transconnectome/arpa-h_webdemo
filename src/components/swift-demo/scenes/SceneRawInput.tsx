import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

export default function SceneRawInput() {
  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-[#E5E7EB] mb-4"
      >
        1. Raw fMRI Input
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-8 max-w-3xl leading-relaxed"
      >
        <span className="text-lg text-[#9CA3AF]">
          육안으로는 두 사람의 뇌 기능을 구별하기 힘듭니다.
        </span>
        <br />
        <strong className="text-xl text-[#E5E7EB] block my-2">
          누가 정상(HC)이고, 누가 경도인지장애(MCI)일까요?
        </strong>
        <span
          className="text-lg font-black inline-block mt-4 px-4 py-3 rounded-lg"
          style={{
            color: '#64b5f6',
            textShadow: '0 4px 10px rgba(0,0,0,0.8)',
            background: 'rgba(0,0,0,0.3)',
          }}
        >
          SwiFT Foundation Model은 뇌의 기능적 신호에서 미세한 차이를 포착해 구별합니다.
        </span>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center gap-8 w-full justify-center">
        {/* Subject A */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative rounded-xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            maxWidth: 420,
            width: '100%',
            padding: 12,
          }}
        >
          <span
            className="absolute top-3 left-3 px-4 py-2 rounded text-white font-bold text-sm z-10"
            style={{ background: '#EF4444', boxShadow: '0 4px 10px rgba(0,0,0,0.4)' }}
          >
            참여자 A (??)
          </span>
          <img
            src={`${BASE}swift-demo/gard_sub-324_mci.gif`}
            alt="fMRI Subject A"
            loading="lazy"
            className="w-full rounded-lg"
            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
          />
        </motion.div>

        {/* Subject B */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative rounded-xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            maxWidth: 420,
            width: '100%',
            padding: 12,
          }}
        >
          <span
            className="absolute top-3 left-3 px-4 py-2 rounded text-white font-bold text-sm z-10"
            style={{ background: '#10B981', boxShadow: '0 4px 10px rgba(0,0,0,0.4)' }}
          >
            참여자 B (??)
          </span>
          <img
            src={`${BASE}swift-demo/gard_sub-24_hc.gif`}
            alt="fMRI Subject B"
            loading="lazy"
            className="w-full rounded-lg"
            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
          />
        </motion.div>
      </div>
    </div>
  )
}
