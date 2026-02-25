import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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

const metrics = [
  { label: 'Accuracy', value: 91.2, color: '#2563EB' },
  { label: 'AUC', value: 94.7, color: '#10B981' },
  { label: 'Sensitivity', value: 88.5, color: '#F59E0B' },
  { label: 'Specificity', value: 93.1, color: '#8B5CF6' },
]

const doughnutData = {
  labels: ['Conversion Risk', 'Remaining'],
  datasets: [
    {
      data: [85, 15],
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

const barData = {
  labels: ['Accuracy', 'AUC', 'Sensitivity', 'Specificity', 'F1-Score', 'PPV'],
  datasets: [
    {
      label: 'SWIFT (Ours)',
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

export default function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="min-h-screen flex items-center justify-center bg-section-bg py-24 px-6">
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-10 shadow-sm border border-border mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Doughnut chart */}
            <div className="relative w-48 h-48 shrink-0">
              {isInView && <Doughnut data={doughnutData} options={doughnutOptions} />}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-section-accent">
                    {isInView && <CountUp end={85} decimals={0} />}
                  </p>
                  <p className="text-text-secondary text-xs">Risk Score</p>
                </div>
              </div>
            </div>

            {/* Text result */}
            <div className="text-center md:text-left">
              <p className="text-text-secondary text-sm mb-2 font-mono">MCI → AD Conversion Prediction</p>
              <p className="text-text-primary text-xl leading-relaxed">
                This subject shows a <span className="font-bold text-section-accent">high probability (85%)</span> of
                conversion from Mild Cognitive Impairment to Alzheimer's Disease
                within the next 36 months.
              </p>
              <p className="text-text-secondary text-sm mt-4">
                95% Confidence Interval: 78.2% — 91.8%
              </p>
            </div>
          </div>
        </motion.div>

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
              <p className="text-3xl font-bold" style={{ color: m.color }}>
                {isInView && <CountUp end={m.value} />}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Comparison bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-border"
        >
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Foundation Model vs. Hand-crafted Features
          </h3>
          <div className="h-72">
            {isInView && <Bar data={barData} options={barOptions} />}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
