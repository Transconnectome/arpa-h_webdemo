import { useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import CountUp from '../components/CountUp'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface Props {
  isComplete: boolean
  selectedTask: string | null
}

const taskLabels: Record<string, string> = {
  'mci-ad': 'MCI → AD Conversion Probability',
  'mdd-dx': 'MDD Diagnosis Confidence',
  'ocd-dx': 'OCD Diagnosis Confidence',
  'treatment': 'Treatment Response Rate',
}

const taskResults: Record<string, { score: number; description: string }> = {
  'mci-ad': { score: 85, description: 'This subject shows a high probability of conversion from Mild Cognitive Impairment to Alzheimer\'s Disease within the next 36 months.' },
  'mdd-dx': { score: 92, description: 'The model identifies strong neural biomarkers consistent with Major Depressive Disorder in this subject\'s brain data.' },
  'ocd-dx': { score: 78, description: 'Brain activity patterns suggest moderate-to-high likelihood of Obsessive-Compulsive Disorder for this subject.' },
  'treatment': { score: 71, description: 'This subject is predicted to show a positive response to the recommended pharmacological treatment protocol.' },
}

const metrics = [
  { label: 'Accuracy', value: 91.2, color: '#2563EB' },
  { label: 'AUC', value: 94.7, color: '#10B981' },
  { label: 'Sensitivity', value: 88.5, color: '#F59E0B' },
  { label: 'Specificity', value: 93.1, color: '#8B5CF6' },
]

const barData = {
  labels: ['Accuracy', 'AUC', 'Sensitivity', 'Specificity', 'F1-Score', 'PPV'],
  datasets: [
    {
      label: 'Foundation Model (Ours)',
      data: [91.2, 94.7, 88.5, 93.1, 89.8, 87.3],
      backgroundColor: 'rgba(37, 99, 235, 0.8)',
      borderRadius: 6,
    },
    {
      label: 'Baseline (Hand-crafted)',
      data: [78.4, 82.1, 73.2, 81.5, 75.8, 71.9],
      backgroundColor: 'rgba(156, 163, 175, 0.5)',
      borderRadius: 6,
    },
  ],
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { usePointStyle: true, padding: 20, font: { size: 12 } },
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      min: 50,
      max: 100,
      grid: { color: 'rgba(0,0,0,0.05)' },
      ticks: { callback: (v: string | number) => `${v}%` },
    },
    x: {
      grid: { display: false },
    },
  },
}

export default function ResultsSection({ isComplete, selectedTask }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const shouldAnimate = isComplete && isInView

  const task = selectedTask || 'mci-ad'
  const result = taskResults[task] || taskResults['mci-ad']

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
          <p className="text-text-secondary text-lg mb-12 max-w-2xl">
            Prediction results and model performance metrics for the selected clinical task.
          </p>
        </motion.div>

        {/* Main result card + doughnut */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-border mb-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Doughnut chart */}
            <div className="relative w-48 h-48 shrink-0">
              {shouldAnimate && <Doughnut data={doughnutData} options={doughnutOptions} />}
              {!shouldAnimate && (
                <div className="w-full h-full rounded-full border-[12px] border-gray-200" />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-section-accent">
                    {shouldAnimate ? <CountUp end={result.score} decimals={0} /> : '--'}
                  </p>
                  <p className="text-text-secondary text-xs">Risk Score</p>
                </div>
              </div>
            </div>

            {/* Text result */}
            <div className="text-center md:text-left">
              <p className="text-text-secondary text-sm mb-2 font-mono">
                {taskLabels[task] || 'Prediction Result'}
              </p>
              {shouldAnimate ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-text-primary text-xl leading-relaxed"
                >
                  {result.description.split(`${result.score}%`).length > 1
                    ? <>
                        {result.description.split(`${result.score}%`)[0]}
                        <span className="font-bold text-section-accent">{result.score}%</span>
                        {result.description.split(`${result.score}%`)[1]}
                      </>
                    : result.description
                  }
                </motion.p>
              ) : (
                <p className="text-text-secondary/40 text-xl">
                  Results will appear here after processing is complete.
                </p>
              )}
              {shouldAnimate && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-text-secondary text-sm mt-4"
                >
                  95% Confidence Interval: {(result.score - 6.8).toFixed(1)}% — {(result.score + 6.8).toFixed(1)}%
                </motion.p>
              )}
            </div>
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

        {/* Comparison bar chart */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Foundation Model vs. Hand-crafted Features
          </h3>
          <div className="h-72">
            {shouldAnimate ? (
              <Bar data={barData} options={barOptions} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-secondary/30">
                <p className="font-mono text-sm">Chart data pending...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
