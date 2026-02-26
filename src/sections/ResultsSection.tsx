import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import CountUp from '../components/CountUp'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  isComplete: boolean
  selectedTask: string | null
}

interface TaskResult {
  score: number
  title: string
  description: string
  brainAge: { actual: number; estimated: number }
  brainAgeComment: string
}

const taskResults: Record<string, TaskResult> = {
  'hc-mci': {
    score: 74,
    title: '경도인지장애 위험도 분석',
    description: '이 참여자의 뇌 기능 영상 데이터를 분석한 결과, 현재 정상(HC) 범주이나 향후 36개월 내 경도인지장애(MCI)로 진행될 가능성이 높은 것으로 판단됩니다.',
    brainAge: { actual: 65, estimated: 70 },
    brainAgeComment: '실제 연령 대비 뇌 노화가 진행된 소견으로, 초기 인지 기능 저하 위험도 분석과 일치하는 결과입니다.',
  },
  'mdd-dx': {
    score: 92,
    title: '주요우울장애(MDD) 진단 분석',
    description: '뇌 활동 패턴에서 주요우울장애와 일치하는 강한 신경 바이오마커가 확인되었습니다. 전두엽-변연계 네트워크의 기능적 연결성 이상이 주요 근거입니다.',
    brainAge: { actual: 34, estimated: 39 },
    brainAgeComment: '우울증 관련 신경 변화가 뇌 연령 추정치에도 반영된 소견입니다.',
  },
  'ocd-dx': {
    score: 78,
    title: '강박장애(OCD) 진단 분석',
    description: '뇌 활동 패턴 분석 결과, 강박장애와 관련된 피질-선조체-시상 회로의 과활성화 소견이 확인되었습니다. 중등도 이상의 가능성이 시사됩니다.',
    brainAge: { actual: 28, estimated: 31 },
    brainAgeComment: '소폭의 뇌 연령 차이가 관찰되며, 만성적 불안 관련 신경 부담을 반영할 수 있습니다.',
  },
  'treatment': {
    score: 71,
    title: '치료 반응 예측 분석',
    description: '권장 약물 치료 프로토콜에 대해 긍정적 반응이 예측됩니다. 신경가소성 관련 지표가 양호하여 치료 효과를 기대할 수 있습니다.',
    brainAge: { actual: 52, estimated: 49 },
    brainAgeComment: '실제 연령보다 젊은 뇌 추정치는 양호한 신경가소성을 시사하며, 치료 반응에 긍정적 요인입니다.',
  },
}

const metrics = [
  { label: 'AUC', value: 70.4, color: '#2563EB' },
  { label: 'AUPRC', value: 67.0, color: '#10B981' },
  { label: 'Accuracy', value: 57.1, color: '#8B5CF6' },
]


function BrainAgeBar({ actual, estimated, animate }: { actual: number; estimated: number; animate: boolean }) {
  const diff = estimated - actual
  const isOlder = diff > 0
  const diffColor = isOlder ? '#EF4444' : '#10B981'

  // Bar/track positions
  const min = Math.min(actual, estimated) - 5
  const max = Math.max(actual, estimated) + 5.5
  const range = max - min
  const actualPos = ((actual - min) / range) * 100
  const estimatedPos = ((estimated - min) / range) * 100

  // Marker positions (slightly shifted from bar)
  const mMin = Math.min(actual, estimated) - 4.6
  const mMax = Math.max(actual, estimated) + 6.15
  const mRange = mMax - mMin
  const actualMarkerPos = ((actual - mMin) / mRange) * 100
  const estimatedMarkerPos = ((estimated - mMin) / mRange) * 100

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🧠</span>
        <span className="text-text-primary font-bold text-base">추정 뇌 나이 (Brain Age)</span>
      </div>

      {/* Number line */}
      <div className="relative h-16 mb-2 mx-4">
        {/* Track */}
        <div className="absolute top-6 left-0 right-0 h-1.5 bg-gray-200 rounded-full" />

        {/* Gap highlight between markers */}
        {animate && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
            className="absolute top-6 h-1.5 rounded-full"
            style={{
              left: `${Math.min(actualPos, estimatedPos)}%`,
              width: `${Math.abs(estimatedPos - actualPos)}%`,
              backgroundColor: diffColor,
              opacity: 0.3,
              transformOrigin: isOlder ? 'left' : 'right',
            }}
          />
        )}

        {/* Actual age marker */}
        {animate && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="absolute top-2.5"
            style={{ left: `${actualMarkerPos}%`, transform: 'translateX(-50%)' }}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs font-mono text-text-secondary mb-0.5">실제</span>
              <div className="w-5 h-5 rounded-full bg-gray-400 border-2 border-white shadow" />
              <span className="text-sm font-bold text-text-secondary mt-1">{actual}세</span>
            </div>
          </motion.div>
        )}

        {/* Estimated age marker */}
        {animate && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.4 }}
            className="absolute top-2.5"
            style={{ left: `${estimatedMarkerPos}%`, transform: 'translateX(-50%)' }}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs font-mono" style={{ color: diffColor }}>추정</span>
              <div className="w-5 h-5 rounded-full border-2 border-white shadow" style={{ backgroundColor: diffColor }} />
              <span className="text-sm font-bold mt-1" style={{ color: diffColor }}>{estimated}세</span>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  )
}

/** Canvas-based white background removal — renders brain surfaces on transparent bg */
function BrainCutout({ src, visible }: { src: string; visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  const processImage = useCallback(() => {
    if (!visible) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const d = imageData.data
      const threshold = 248
      for (let i = 0; i < d.length; i += 4) {
        const brightness = (d[i] + d[i + 1] + d[i + 2]) / 3
        if (brightness > threshold) {
          d[i + 3] = Math.max(0, Math.round(255 * (1 - (brightness - threshold) / (255 - threshold))))
        }
      }
      ctx.putImageData(imageData, 0, 0)
      setReady(true)
    }
    img.src = src
  }, [src, visible])

  useEffect(() => { processImage() }, [processImage])

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.6s ease' }}
    />
  )
}

export default function ResultsSection({ isComplete, selectedTask }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const shouldAnimate = isComplete && isInView

  const task = selectedTask || 'hc-mci'
  const result = taskResults[task] || taskResults['hc-mci']

  const doughnutData = {
    labels: ['Score', 'Remaining'],
    datasets: [
      {
        data: [result.score, 100 - result.score],
        backgroundColor: ['#2563EB', '#E5E7EB'],
        borderWidth: 0,
        cutout: '75%',
      },
    ],
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-section-bg py-24 px-6 relative">
      {/* Blur overlay when not complete */}
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            {/* Blur backdrop */}
            <div className="absolute inset-0 backdrop-blur-lg bg-section-bg/40" />

            {/* Lock message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative z-10 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white shadow-lg flex items-center justify-center">
                <span className="text-4xl">🔒</span>
              </div>
              <p className="text-text-primary font-bold text-xl mb-2">
                Results Locked
              </p>
              <p className="text-text-secondary max-w-sm">
                Complete the processing pipeline to unlock prediction results
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl w-full" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-section-accent font-mono text-sm tracking-widest uppercase mb-3">
            Step 05
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Results
          </h2>
          <p className="text-text-secondary text-lg mb-12 max-w-3xl">
            Prediction results and model performance metrics for the selected clinical task.
          </p>
        </motion.div>

        {/* Main result card: risk score (left) + brain age (right) */}
        <div className="bg-white rounded-2xl shadow-sm border border-border mb-4 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left: Doughnut + Description */}
            <div className="flex-1 p-8 flex flex-col items-center">
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-36 h-36 shrink-0">
                  {shouldAnimate && <Doughnut data={doughnutData} options={doughnutOptions} />}
                  {!shouldAnimate && (
                    <div className="w-full h-full rounded-full border-[12px] border-gray-200" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-section-accent">
                        {shouldAnimate ? <CountUp end={result.score} decimals={0} /> : '--'}
                      </p>
                      <p className="text-text-secondary text-[10px]">Risk Score</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-section-accent text-sm mb-2 font-bold">
                  {result.title}
                </p>
                {shouldAnimate ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-text-primary text-sm leading-relaxed"
                  >
                    {result.description}
                  </motion.p>
                ) : (
                  <p className="text-text-secondary/40 text-sm">
                    분석이 완료되면 결과가 여기에 표시됩니다.
                  </p>
                )}
              </div>
            </div>

            {/* Vertical divider */}
            <div className="hidden md:block w-px bg-border" />
            {/* Horizontal divider (mobile) */}
            <div className="md:hidden border-t border-border" />

            {/* Right: Brain Age */}
            <div className="flex-1 p-8 flex flex-col items-center">
              <div className="flex-1 w-full flex flex-col justify-center">
                <BrainAgeBar
                  actual={result.brainAge.actual}
                  estimated={result.brainAge.estimated}
                  animate={shouldAnimate}
                />
              </div>

              <div className="text-center mt-4">
                {shouldAnimate ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4, duration: 0.4 }}
                      className="mb-2"
                    >
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: (result.brainAge.estimated - result.brainAge.actual) > 0 ? '#EF4444' : '#10B981' }}
                      >
                        차이: {(result.brainAge.estimated - result.brainAge.actual) > 0 ? '+' : ''}{(result.brainAge.estimated - result.brainAge.actual).toFixed(1)}세 {(result.brainAge.estimated - result.brainAge.actual) > 0 ? '▲' : '▼'}
                      </span>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6 }}
                      className="text-text-primary text-sm leading-relaxed"
                    >
                      {result.brainAgeComment}
                    </motion.p>
                  </>
                ) : (
                  <p className="text-text-secondary/40 text-sm">
                    분석이 완료되면 결과가 여기에 표시됩니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-4 mb-2">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm border border-border"
            >
              <p className="text-text-secondary text-sm mb-1">{m.label}</p>
              <p className="text-3xl font-bold" style={{ color: shouldAnimate ? m.color : '#D1D5DB' }}>
                {shouldAnimate ? <CountUp end={m.value} /> : '--.-%'}
              </p>
            </motion.div>
          ))}
        </div>
        <p className="text-text-secondary/60 text-xs text-left mb-3">
          본 결과는 GARD 광주치매코호트 4,201명의 뇌 영상 데이터 분석에 기반합니다.
        </p>

        {/* Model Interpretation */}
        <div className="bg-slate-900 rounded-2xl p-8 shadow-sm overflow-hidden">
          <h3 className="text-lg font-bold text-white mb-1">
            AI가 주목한 뇌 영역
          </h3>
          <p className="text-slate-400 text-sm mb-5">
            AI가 판단에 가장 많이 참고한 뇌 영역을 색으로 보여줍니다.<br />
            붉은 영역일수록 정상군에서, 푸른 영역일수록 MCI에서 더 활성화된 부위입니다.
          </p>

          {shouldAnimate ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Brain cutout + colorbar — unified layout */}
              <div className="flex items-center gap-3">
                {/* Brain images (canvas, transparent bg, cropped to brain area only) */}
                <div className="flex-1 min-w-0">
                  <div className="overflow-hidden" style={{ height: '200px' }}>
                    <div style={{ width: '108%', marginTop: '-8%', marginLeft: '-1%' }}>
                      <BrainCutout
                        src={`${import.meta.env.BASE_URL}swift-demo/surface_difference.png`}
                        visible={shouldAnimate}
                      />
                    </div>
                  </div>
                  {/* View labels */}
                  <div className="flex justify-around px-4 -mt-10 mb-3">
                    {['Lateral L', 'Lateral R', 'Medial L', 'Medial R'].map((label) => (
                      <span key={label} className="text-xs font-mono text-slate-500">{label}</span>
                    ))}
                  </div>
                </div>

                {/* Colorbar — slim vertical gradient with scale */}
                <div className="flex flex-col items-center gap-1 shrink-0 self-start" style={{ marginTop: '-20px' }}>
                  <span className="text-xs font-mono text-slate-300 mb-1">활성 차이</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 rounded-full overflow-hidden" style={{ height: '140px' }}>
                      <div
                        className="w-full h-full"
                        style={{
                          background: 'linear-gradient(to bottom, #DC2626, #EF4444, #FCA5A5, #FFFFFF, #93C5FD, #3B82F6, #1D4ED8)',
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-between" style={{ height: '140px' }}>
                      <span className="text-[11px] font-mono text-slate-400 leading-none">+0.10</span>
                      <span className="text-[11px] font-mono text-slate-400 leading-none">0</span>
                      <span className="text-[11px] font-mono text-slate-400 leading-none">−0.10</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">(a.u.)</span>
                </div>
              </div>

              {/* Legend — compact, inline */}
              <div className="flex items-center justify-center gap-8 text-sm text-slate-400 pt-5 mt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span>정상군에서 더 활성 <span className="text-slate-500">(PCC, Precuneus)</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>MCI에서 더 활성 <span className="text-slate-500">(ACC, dlPFC)</span></span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-48 flex items-center justify-center text-slate-500">
              <p className="font-mono text-sm">Interpretation map pending...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
